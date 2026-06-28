#!/usr/bin/env python3
"""Import exported static-review-app comments into a normalized inbox.

This script is intentionally deterministic and local-only. It does not call
Google Drive, OpenAI, GitHub, or any network API.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import shutil
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
WEBAPP_DIR = ROOT / "feedback" / "webapp"
INCOMING_DIR = WEBAPP_DIR / "incoming"
RAW_DIR = WEBAPP_DIR / "raw"
NORMALIZED_DIR = WEBAPP_DIR / "normalized"
BATCHES_DIR = WEBAPP_DIR / "batches"
PROCESSED_DIR = WEBAPP_DIR / "processed"

ACCEPTED_SUFFIXES = {".json", ".jsonl", ".md"}
APP_VERSION = "webapp-comment-import-v1"

RAW_FIELDS = [
    "id",
    "created_at",
    "commenter_name",
    "repo_commit",
    "repo_branch",
    "app_version",
    "view_mode",
    "current_layer",
    "current_file_path",
    "chapter_id",
    "chapter_title",
    "source_line_start",
    "source_line_end",
    "current_heading",
    "selected_text",
    "approximate_scroll_percent",
    "comment_text",
    "status",
]

CONTENT_HASH_FIELDS = [
    "commenter_name",
    "created_at",
    "current_file_path",
    "chapter_id",
    "current_layer",
    "selected_text",
    "comment_text",
]

ANCHOR_HASH_FIELDS = [
    "current_file_path",
    "chapter_id",
    "current_layer",
    "source_line_start",
    "source_line_end",
    "current_heading",
    "selected_text",
    "approximate_scroll_percent",
]


def stable_hash(value: Any) -> str:
    payload = json.dumps(value, sort_keys=True, ensure_ascii=False, separators=(",", ":"))
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def read_json(path: Path) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    rejected: list[dict[str, Any]] = []
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:  # noqa: BLE001 - report malformed input without crashing
        return [], [rejected_record(path, None, f"invalid JSON: {exc}")]

    if isinstance(data, dict) and isinstance(data.get("comments"), list):
        records = data["comments"]
    elif isinstance(data, list):
        records = data
    else:
        return [], [rejected_record(path, data, "JSON must be a comment list or contain a comments array")]

    comments: list[dict[str, Any]] = []
    for idx, record in enumerate(records, start=1):
        if isinstance(record, dict):
            comments.append(record)
        else:
            rejected.append(rejected_record(path, record, f"comment {idx} is not an object"))
    return comments, rejected


def read_jsonl(path: Path) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    comments: list[dict[str, Any]] = []
    rejected: list[dict[str, Any]] = []
    for idx, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
        if not line.strip():
            continue
        try:
            record = json.loads(line)
        except Exception as exc:  # noqa: BLE001
            rejected.append(rejected_record(path, line, f"line {idx} invalid JSON: {exc}"))
            continue
        if isinstance(record, dict):
            comments.append(record)
        else:
            rejected.append(rejected_record(path, record, f"line {idx} is not an object"))
    return comments, rejected


def read_markdown(path: Path) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    text = path.read_text(encoding="utf-8", errors="replace")
    return [], [rejected_record(path, {"markdown_preview": text[:2000]}, "Markdown export requires manual review")]


def rejected_record(path: Path, payload: Any, reason: str) -> dict[str, Any]:
    return {
        "source_export_file": path.name,
        "reason": reason,
        "raw_record": payload,
    }


def load_incoming_files() -> list[Path]:
    if not INCOMING_DIR.exists():
        return []
    return sorted(
        path
        for path in INCOMING_DIR.iterdir()
        if path.is_file() and path.suffix.lower() in ACCEPTED_SUFFIXES
    )


def next_batch_id(today: dt.date | None = None) -> str:
    today = today or dt.datetime.now().date()
    prefix = today.isoformat()
    max_seen = 0
    if BATCHES_DIR.exists():
        for path in BATCHES_DIR.iterdir():
            if not path.is_dir() or not path.name.startswith(prefix + "-"):
                continue
            suffix = path.name.rsplit("-", 1)[-1]
            if suffix.isdigit():
                max_seen = max(max_seen, int(suffix))
    return f"{prefix}-{max_seen + 1:03d}"


def parse_file(path: Path) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    suffix = path.suffix.lower()
    if suffix == ".json":
        return read_json(path)
    if suffix == ".jsonl":
        return read_jsonl(path)
    if suffix == ".md":
        return read_markdown(path)
    return [], [rejected_record(path, None, f"unsupported file type: {suffix}")]


def normalize_comment(record: dict[str, Any], source_file: str, batch_id: str) -> dict[str, Any] | None:
    comment_text = as_text(record.get("comment_text"))
    if not comment_text.strip():
        return None

    normalized: dict[str, Any] = {field: record.get(field) for field in RAW_FIELDS}
    normalized["comment_text"] = comment_text
    normalized["status"] = as_text(record.get("status") or "inbox")
    normalized["import_batch_id"] = batch_id
    normalized["source_export_file"] = source_file
    normalized["content_hash"] = stable_hash({field: normalized.get(field) for field in CONTENT_HASH_FIELDS})
    normalized["anchor_hash"] = stable_hash({field: normalized.get(field) for field in ANCHOR_HASH_FIELDS})
    normalized["normalized_id"] = "wc-" + normalized["content_hash"][:16]
    likely_type, likely_id = likely_target(normalized)
    normalized["likely_target_type"] = likely_type
    normalized["likely_target_id"] = likely_id
    normalized["initial_classification"] = classify_comment(normalized)
    normalized["processing_status"] = "imported"
    normalized["imported_at"] = dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")
    normalized["importer_version"] = APP_VERSION
    return normalized


def as_text(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, str):
        return value
    return str(value)


def likely_target(comment: dict[str, Any]) -> tuple[str, str]:
    chapter_id = as_text(comment.get("chapter_id")).strip()
    current_file_path = as_text(comment.get("current_file_path")).strip()
    view_mode = as_text(comment.get("view_mode")).lower()
    comment_text = as_text(comment.get("comment_text")).lower()
    if chapter_id:
        return "chapter", chapter_id
    if current_file_path:
        return "file", current_file_path
    if "app" in view_mode or any(word in comment_text for word in ["app", "ui", "button", "export"]):
        return "app", "review-app"
    return "unknown", ""


def classify_comment(comment: dict[str, Any]) -> str:
    text = " ".join(
        [
            as_text(comment.get("comment_text")),
            as_text(comment.get("selected_text")),
            as_text(comment.get("current_layer")),
            as_text(comment.get("current_file_path")),
        ]
    ).lower()

    if any(phrase in text for phrase in ["keep this", "keep this line", "near quote", "preserve this", "this image works", "echo this later", "love this wording", "reuse this"]):
        return "prose-preservation-candidate"
    if any(word in text for word in ["typo", "grammar", "punctuation", "sentence", "wording", "line edit", "line-edit"]):
        return "line-edit"
    if any(phrase in text for phrase in ["confused", "unclear", "i don't understand", "i dont understand", "who is", "where are we", "why did"]):
        return "reader-confusion"
    if any(word in text for word in ["contradiction", "contradicts", "timeline", "chronology", "already happened", "knowledge", "power", "ability", "magic conflict"]):
        return "continuity-question"
    if any(phrase in text for phrase in ["story bible", "worldbuilding", "canon", "clade", "shroud", "zän", "zan", "ink pact", "registry", "heart"]):
        return "story-bible-question"
    if any(phrase in text for phrase in ["chapter goal", "chapter purpose", "pacing", "setup", "payoff", "scene should", "chapter should"]):
        return "chapter-architecture-note"
    if any(word in text for word in ["app", "ui", "display", "export", "navigation", "missing", "broken", "button", "layer", "browser"]):
        return "app-bug"
    if any(word in text for word in ["liked", "love", "great", "works", "reaction"]):
        return "general-reaction"
    return "unclear"


def load_existing_hashes(master_path: Path) -> set[str]:
    hashes: set[str] = set()
    if not master_path.exists():
        return hashes
    for line in master_path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        try:
            record = json.loads(line)
        except json.JSONDecodeError:
            continue
        content_hash = record.get("content_hash")
        if isinstance(content_hash, str):
            hashes.add(content_hash)
    return hashes


def write_jsonl(path: Path, records: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        for record in records:
            handle.write(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n")


def append_jsonl(path: Path, records: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as handle:
        for record in records:
            handle.write(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n")


def copy_raw(files: list[Path], raw_batch_dir: Path) -> None:
    raw_batch_dir.mkdir(parents=True, exist_ok=True)
    for path in files:
        shutil.copy2(path, raw_batch_dir / path.name)


def move_processed(files: list[Path], processed_batch_dir: Path) -> list[str]:
    processed_batch_dir.mkdir(parents=True, exist_ok=True)
    notes: list[str] = []
    for path in files:
        destination = unique_destination(processed_batch_dir / path.name)
        try:
            shutil.move(str(path), destination)
            notes.append(f"moved {path.name} to processed/{processed_batch_dir.name}/{destination.name}")
        except Exception as exc:  # noqa: BLE001
            shutil.copy2(path, destination)
            notes.append(f"copied {path.name} to processed/{processed_batch_dir.name}/{destination.name} after move failed: {exc}")
    return notes


def unique_destination(path: Path) -> Path:
    if not path.exists():
        return path
    stem = path.stem
    suffix = path.suffix
    for idx in range(2, 1000):
        candidate = path.with_name(f"{stem}-{idx}{suffix}")
        if not candidate.exists():
            return candidate
    raise RuntimeError(f"could not find unique destination for {path}")


def write_manifest(path: Path, manifest: dict[str, Any]) -> None:
    lines: list[str] = []
    for key, value in manifest.items():
        if isinstance(value, list):
            lines.append(f"{key}:")
            for item in value:
                lines.append(f"  - {json.dumps(item, ensure_ascii=False)}")
        else:
            lines.append(f"{key}: {json.dumps(value, ensure_ascii=False)}")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_report(path: Path, manifest: dict[str, Any], move_notes: list[str]) -> None:
    lines = [
        f"# Web-App Comment Import Report: {manifest['batch_id']}",
        "",
        f"- Imported at: {manifest['imported_at']}",
        f"- Source files: {manifest['source_file_count']}",
        f"- Parsed records: {manifest['parsed_records']}",
        f"- Imported new comments: {manifest['imported_count']}",
        f"- Duplicates: {manifest['duplicate_count']}",
        f"- Rejected records: {manifest['rejected_count']}",
        "",
        "## Source Files",
        "",
    ]
    if manifest["source_files"]:
        lines.extend(f"- `{name}`" for name in manifest["source_files"])
    else:
        lines.append("- None")
    lines.extend(["", "## Processing Notes", ""])
    if move_notes:
        lines.extend(f"- {note}" for note in move_notes)
    else:
        lines.append("- No processed-file movement was needed.")
    lines.extend(
        [
            "",
            "## Next Step",
            "",
            f"To synthesize this batch later, ask Codex: `Process web-app comment batch {manifest['batch_id']} into synthesis and proposed tickets.`",
            "",
            "This import report does not approve any comment, ticket, canon change, prose-preservation record, or manuscript edit.",
        ]
    )
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def update_comments_index(master_path: Path) -> None:
    records: list[dict[str, Any]] = []
    if master_path.exists():
        for line in master_path.read_text(encoding="utf-8").splitlines():
            if not line.strip():
                continue
            try:
                records.append(json.loads(line))
            except json.JSONDecodeError:
                continue

    by_batch = Counter(as_text(record.get("import_batch_id")) for record in records)
    by_commenter = Counter(as_text(record.get("commenter_name")) or "unknown" for record in records)
    by_target = Counter(as_text(record.get("likely_target_id")) or "unknown" for record in records)
    by_classification = Counter(as_text(record.get("initial_classification")) or "unclear" for record in records)

    duplicate_count = count_jsonl_records(BATCHES_DIR, "duplicates.jsonl")
    rejected_count = count_jsonl_records(BATCHES_DIR, "rejected-records.jsonl")

    lines = [
        "# Web-App Comments Index",
        "",
        "Web-app comments are inbox material. They are not canon, accepted revisions, manuscript-edit authorization, or prose-preservation approval.",
        "",
        f"- Total normalized comments: {len(records)}",
        f"- Duplicate records archived: {duplicate_count}",
        f"- Rejected/unparsed records archived: {rejected_count}",
        "",
        "## Batches",
        "",
    ]
    lines.extend(counter_table(by_batch, "Batch", "Comments"))
    lines.extend(["", "## Commenters", ""])
    lines.extend(counter_table(by_commenter, "Commenter", "Comments"))
    lines.extend(["", "## Comments by Target", ""])
    lines.extend(counter_table(by_target, "Target", "Comments"))
    lines.extend(["", "## Comments by Classification", ""])
    lines.extend(counter_table(by_classification, "Classification", "Comments"))
    lines.append("")
    (NORMALIZED_DIR / "comments-index.md").write_text("\n".join(lines), encoding="utf-8")


def count_jsonl_records(root: Path, filename: str) -> int:
    total = 0
    if not root.exists():
        return total
    for path in root.glob(f"*/{filename}"):
        total += sum(1 for line in path.read_text(encoding="utf-8").splitlines() if line.strip())
    return total


def counter_table(counter: Counter[str], first_header: str, second_header: str) -> list[str]:
    lines = [f"| {first_header} | {second_header} |", "|---|---:|"]
    if not counter:
        lines.append("| _None yet_ | 0 |")
        return lines
    for key, count in sorted(counter.items(), key=lambda item: (-item[1], item[0])):
        lines.append(f"| `{key}` | {count} |")
    return lines


def run_import() -> int:
    incoming_files = load_incoming_files()
    if not incoming_files:
        NORMALIZED_DIR.mkdir(parents=True, exist_ok=True)
        master_path = NORMALIZED_DIR / "comments.jsonl"
        master_path.touch(exist_ok=True)
        update_comments_index(master_path)
        print("No incoming web-app comment files found.")
        return 0

    batch_id = next_batch_id()
    batch_dir = BATCHES_DIR / batch_id
    raw_batch_dir = RAW_DIR / batch_id
    processed_batch_dir = PROCESSED_DIR / batch_id
    batch_dir.mkdir(parents=True, exist_ok=False)
    copy_raw(incoming_files, raw_batch_dir)

    parsed_records: list[tuple[dict[str, Any], str]] = []
    rejected: list[dict[str, Any]] = []
    for path in incoming_files:
        comments, file_rejected = parse_file(path)
        parsed_records.extend((comment, path.name) for comment in comments)
        rejected.extend(file_rejected)

    master_path = NORMALIZED_DIR / "comments.jsonl"
    existing_hashes = load_existing_hashes(master_path)
    seen_this_batch: set[str] = set()
    imported: list[dict[str, Any]] = []
    duplicates: list[dict[str, Any]] = []

    for record, source_file in parsed_records:
        normalized = normalize_comment(record, source_file, batch_id)
        if normalized is None:
            rejected.append(rejected_record(Path(source_file), record, "missing comment_text"))
            continue
        content_hash = normalized["content_hash"]
        if content_hash in existing_hashes or content_hash in seen_this_batch:
            duplicate = dict(normalized)
            duplicate["processing_status"] = "duplicate"
            duplicates.append(duplicate)
            continue
        seen_this_batch.add(content_hash)
        imported.append(normalized)

    write_jsonl(batch_dir / "normalized-comments.jsonl", imported)
    write_jsonl(batch_dir / "duplicates.jsonl", duplicates)
    write_jsonl(batch_dir / "rejected-records.jsonl", rejected)
    append_jsonl(master_path, imported)
    move_notes = move_processed(incoming_files, processed_batch_dir)

    manifest = {
        "batch_id": batch_id,
        "imported_at": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "importer_version": APP_VERSION,
        "source_file_count": len(incoming_files),
        "source_files": [path.name for path in incoming_files],
        "parsed_records": len(parsed_records),
        "imported_count": len(imported),
        "duplicate_count": len(duplicates),
        "rejected_count": len(rejected),
        "raw_archive": str(raw_batch_dir.relative_to(ROOT)),
        "processed_archive": str(processed_batch_dir.relative_to(ROOT)),
        "normalized_batch": str((batch_dir / "normalized-comments.jsonl").relative_to(ROOT)),
        "master_normalized": str(master_path.relative_to(ROOT)),
    }
    write_manifest(batch_dir / "manifest.yml", manifest)
    write_report(batch_dir / "import-report.md", manifest, move_notes)
    update_comments_index(master_path)

    print(f"Imported web-app comment batch {batch_id}")
    print(f"  source files: {len(incoming_files)}")
    print(f"  parsed records: {len(parsed_records)}")
    print(f"  imported: {len(imported)}")
    print(f"  duplicates: {len(duplicates)}")
    print(f"  rejected: {len(rejected)}")
    print(f"  report: {batch_dir / 'import-report.md'}")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Import exported web-app comments into feedback/webapp.")
    parser.parse_args()
    return run_import()


if __name__ == "__main__":
    raise SystemExit(main())
