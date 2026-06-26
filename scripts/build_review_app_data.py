#!/usr/bin/env python3
"""Build static data for the Fractured Fate review app.

The app is read-only. This script copies readable repository text into JSON
files under docs/data so the browser can navigate it without a backend.
"""

from __future__ import annotations

import json
import os
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "docs" / "data"
APP_VERSION = "review-interface-v0"

INCLUDE_ROOTS = [
    "manuscript",
    "summaries",
    "chapter-architecture",
    "outline",
    "revision",
    "bible",
    "planning/candidates",
    "reviews",
    "decisions",
    "feedback",
    "notes",
    "imports/normalized",
]

TEXT_SUFFIXES = {
    ".md",
    ".txt",
    ".json",
    ".jsonl",
    ".yaml",
    ".yml",
    ".csv",
}

LAYER_DEFINITIONS = [
    ("prose", "Prose"),
    ("current_summary", "Current Summary"),
    ("chapter_goal_card", "Chapter Goal Card"),
    ("revision_notes", "Revision Notes"),
    ("next_draft_outline", "Next-Draft Outline"),
    ("future_sequence", "Future Sequence"),
    ("candidate_notes", "Candidate/Notes"),
    ("related_comments", "Comments"),
]


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def run_git(args: list[str]) -> str | None:
    try:
        result = subprocess.run(
            ["git", *args],
            cwd=ROOT,
            check=True,
            text=True,
            capture_output=True,
        )
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None
    return result.stdout.strip() or None


def git_metadata() -> dict[str, Any]:
    return {
        "branch": run_git(["branch", "--show-current"]),
        "commit_hash": run_git(["rev-parse", "HEAD"]),
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "app_version": APP_VERSION,
    }


def is_probably_binary(path: Path) -> bool:
    try:
        sample = path.read_bytes()[:4096]
    except OSError:
        return True
    return b"\x00" in sample


def should_include(path: Path) -> bool:
    if not path.is_file():
        return False
    relative = rel(path)
    parts = set(path.relative_to(ROOT).parts)
    if ".git" in parts or "node_modules" in parts or "__pycache__" in parts:
        return False
    if relative.startswith("imports/raw/"):
        return False
    if relative.startswith("docs/") and not relative.startswith("docs/data/"):
        return False
    if path.suffix.lower() == ".docx":
        return False
    if path.suffix.lower() not in TEXT_SUFFIXES:
        return False
    if is_probably_binary(path):
        return False
    return any(relative == root or relative.startswith(f"{root}/") for root in INCLUDE_ROOTS)


def category_for(path: str) -> str:
    if path.startswith("imports/normalized/"):
        return "import/normalized"
    if path.startswith("planning/candidates/"):
        return "candidate"
    if path.startswith("reviews/"):
        return "review packet"
    if path.startswith("bible/"):
        return "bible"
    if path.startswith("outline/"):
        return "outline"
    if path.startswith("revision/"):
        return "revision"
    if path.startswith("decisions/"):
        return "decision"
    if path.startswith("feedback/"):
        return "feedback"
    if path.startswith("manuscript/"):
        return "prose"
    if path.startswith("chapter-architecture/"):
        return "chapter architecture"
    if path.startswith("summaries/"):
        return "summary"
    if path.startswith("notes/"):
        return "notes"
    return path.split("/", 1)[0]


def detect_headings(text: str) -> list[dict[str, Any]]:
    headings: list[dict[str, Any]] = []
    for idx, line in enumerate(text.splitlines(), start=1):
        match = re.match(r"^(#{1,6})\s+(.+?)\s*$", line)
        if match:
            headings.append(
                {
                    "line": idx,
                    "level": len(match.group(1)),
                    "text": match.group(2).strip(),
                }
            )
    return headings


def scan_files(metadata: dict[str, Any]) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    files: list[dict[str, Any]] = []
    content: dict[str, Any] = {}
    for path in sorted(ROOT.rglob("*")):
        if not should_include(path):
            continue
        relative = rel(path)
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            text = path.read_text(encoding="utf-8", errors="replace")
        lines = text.splitlines()
        headings = detect_headings(text)
        record = {
            "path": relative,
            "category": category_for(relative),
            "line_count": len(lines),
            "headings": headings,
            "last_generated_commit_hash": metadata["commit_hash"],
        }
        files.append(record)
        content[relative] = {
            **record,
            "content": text,
        }
    return files, content


def build_tree(files: list[dict[str, Any]]) -> dict[str, Any]:
    root: dict[str, Any] = {"name": "", "type": "folder", "children": {}}
    for item in files:
        parts = item["path"].split("/")
        node = root
        for part in parts[:-1]:
            node = node["children"].setdefault(
                part, {"name": part, "type": "folder", "children": {}}
            )
        node["children"][parts[-1]] = {
            "name": parts[-1],
            "type": "file",
            "path": item["path"],
            "category": item["category"],
            "line_count": item["line_count"],
        }

    def normalize(node: dict[str, Any]) -> dict[str, Any]:
        if node["type"] == "file":
            return node
        children = [normalize(child) for _, child in sorted(node["children"].items())]
        return {"name": node["name"], "type": "folder", "children": children}

    return normalize(root)


def chapter_id_for(title: str) -> str:
    if title.lower() == "prologue":
        return "d1-prologue"
    match = re.search(r"chapter\s+(\d+)", title, re.IGNORECASE)
    if match:
        return f"d1-ch-{int(match.group(1)):02d}"
    safe = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return f"d1-{safe or 'chapter'}"


def find_layer_file(chapter_id: str, layer: str) -> str | None:
    candidates: dict[str, list[str]] = {
        "current_summary": [
            f"summaries/current-draft/{chapter_id}.md",
            f"summaries/{chapter_id}.md",
        ],
        "chapter_goal_card": [
            f"chapter-architecture/current-draft/{chapter_id}.md",
            f"chapter-architecture/next-draft/{chapter_id}.md",
        ],
        "revision_notes": [
            f"revision/chapters/{chapter_id}.md",
            f"revision/{chapter_id}.md",
        ],
        "next_draft_outline": [
            f"outline/next-draft/{chapter_id}.md",
            f"outline/chapters/{chapter_id}.md",
        ],
        "future_sequence": [
            f"chapter-architecture/future/{chapter_id}.md",
            f"outline/future/{chapter_id}.md",
        ],
        "candidate_notes": [
            f"planning/candidates/chapters/{chapter_id}.md",
            f"notes/{chapter_id}.md",
        ],
        "related_comments": [
            "imports/normalized/melissa-copy.comments.md",
        ],
    }
    for relative in candidates.get(layer, []):
        if (ROOT / relative).exists():
            return relative
    return None


def available_layers(chapter_id: str, prose_available: bool) -> list[dict[str, Any]]:
    layers: list[dict[str, Any]] = []
    for key, label in LAYER_DEFINITIONS:
        if key == "prose":
            layers.append({"key": key, "label": label, "available": prose_available})
            continue
        source = find_layer_file(chapter_id, key)
        layers.append(
            {
                "key": key,
                "label": label,
                "available": source is not None,
                "source_file": source,
            }
        )
    return layers


def read_file_lines(path: Path) -> list[str]:
    try:
        return path.read_text(encoding="utf-8").splitlines()
    except UnicodeDecodeError:
        return path.read_text(encoding="utf-8", errors="replace").splitlines()


def chapters_from_manuscript_folder() -> tuple[list[dict[str, Any]], dict[str, Any]]:
    chapters_dir = ROOT / "manuscript" / "chapters"
    if not chapters_dir.exists():
        return [], {}
    chapters: list[dict[str, Any]] = []
    content: dict[str, Any] = {}
    for idx, path in enumerate(sorted(chapters_dir.glob("*.md")), start=1):
        relative = rel(path)
        text = path.read_text(encoding="utf-8")
        title = path.stem.replace("-", " ").title()
        chapter_id = f"d1-ch-{idx:02d}"
        chapter = {
            "chapter_id": chapter_id,
            "display_title": title,
            "source_file": relative,
            "source_line_start": 1,
            "source_line_end": len(text.splitlines()),
            "available_layers": available_layers(chapter_id, True),
        }
        chapters.append(chapter)
        content[chapter_id] = {"prose": {"content": text, **chapter}}
    return chapters, content


def chapters_from_normalized_manuscript() -> tuple[list[dict[str, Any]], dict[str, Any], str | None]:
    path = ROOT / "imports" / "normalized" / "melissa-copy.md"
    if not path.exists():
        return [], {}, "No manuscript chapter files or normalized Melissa copy were found."

    lines = read_file_lines(path)
    start_index = 0
    for idx, line in enumerate(lines):
        if re.match(r"^#\s+.*Chapters\s*$", line.strip(), re.IGNORECASE):
            start_index = idx
            break

    summary_index = len(lines)
    for idx, line in enumerate(lines):
        if idx > start_index and line.strip().lower().startswith("# chapter summaries"):
            summary_index = idx
            break

    heading_pattern = re.compile(r"^##\s+(Prologue|Chapter\s+\d+)\s*$", re.IGNORECASE)
    starts: list[tuple[int, str]] = []
    for idx in range(start_index, summary_index):
        match = heading_pattern.match(lines[idx].strip())
        if match:
            starts.append((idx, match.group(1).title()))

    chapters: list[dict[str, Any]] = []
    content: dict[str, Any] = {}
    for pos, (start, title) in enumerate(starts):
        end = (starts[pos + 1][0] - 1) if pos + 1 < len(starts) else summary_index - 1
        chapter_id = chapter_id_for(title)
        chapter_lines = lines[start : end + 1]
        chapter = {
            "chapter_id": chapter_id,
            "display_title": title,
            "source_file": rel(path),
            "source_line_start": start + 1,
            "source_line_end": end + 1,
            "available_layers": available_layers(chapter_id, True),
        }
        chapters.append(chapter)
        content[chapter_id] = {
            "prose": {
                **chapter,
                "content": "\n".join(chapter_lines).strip() + "\n",
            }
        }

    warning = None
    if not chapters:
        warning = "Normalized manuscript exists, but no chapter headings were detected."
    return chapters, content, warning


def build_chapters() -> tuple[list[dict[str, Any]], dict[str, Any], list[str]]:
    chapters, content = chapters_from_manuscript_folder()
    if chapters:
        return chapters, content, []
    chapters, content, warning = chapters_from_normalized_manuscript()
    warnings = [warning] if warning else []
    return chapters, content, warnings


def main() -> None:
    metadata = git_metadata()
    files, file_content = scan_files(metadata)
    chapters, chapter_content, warnings = build_chapters()

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    app_index = {
        "metadata": metadata,
        "warnings": warnings,
        "files": files,
        "file_tree": build_tree(files),
        "chapters": chapters,
        "layer_definitions": [
            {"key": key, "label": label} for key, label in LAYER_DEFINITIONS
        ],
    }
    content = {
        "metadata": metadata,
        "files": file_content,
        "chapters": chapter_content,
    }

    (DATA_DIR / "app-index.json").write_text(
        json.dumps(app_index, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    (DATA_DIR / "content.json").write_text(
        json.dumps(content, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {rel(DATA_DIR / 'app-index.json')}")
    print(f"Wrote {rel(DATA_DIR / 'content.json')}")
    print(f"Indexed {len(files)} files and {len(chapters)} chapters")


if __name__ == "__main__":
    os.chdir(ROOT)
    main()
