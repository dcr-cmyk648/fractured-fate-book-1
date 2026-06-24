#!/usr/bin/env python3
"""Validate repository control-state invariants for the book migration."""

from __future__ import annotations

import hashlib
import os
import re
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ACTIVE_STATUSES = {"in-review", "awaiting-author"}
REVIEWED_STATUSES = {"in-review", "awaiting-author", "approved", "needs-revisit"}
APPROVED_STATUSES = {"approved", "needs-revisit"}

RAW_BASELINE = {
    "imports/raw/melissa-copy.docx": "0887a699a7da9e00d886231981770f40fd7b4f53593bcfc7a76cabbf63de0b2f",
    "imports/raw/book-1-outline.docx": "5b5b1576d0e4a78821d5924eb9c9cc079c5344c4d5296562e2d3ee92f9dee386",
    "imports/raw/bullet-notes.docx": "e3c3b66d8f6de958b32934739f6aa74a7b995cd7dfefd9f4a2e818677cfa36f0",
}


class Validator:
    def __init__(self) -> None:
        self.failures: list[str] = []

    def check(self, condition: bool, message: str) -> None:
        if condition:
            print(f"PASS: {message}")
        else:
            print(f"FAIL: {message}")
            self.failures.append(message)


def read_text(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def git_output(args: list[str]) -> str:
    return subprocess.check_output(["git", *args], cwd=ROOT, text=True)


def parse_entity_index() -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    in_table = False
    for line in read_text("ENTITY_INDEX.md").splitlines():
        if line.startswith("| Order | ID |"):
            in_table = True
            continue
        if not in_table:
            continue
        if line.startswith("|---"):
            continue
        if not line.startswith("|"):
            if rows:
                break
            continue
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if len(cells) < 9:
            continue
        rows.append(
            {
                "order": cells[0],
                "id": cells[1],
                "type": cells[2],
                "name": cells[3],
                "status": cells[4].strip("`"),
                "review": cells[5],
                "accepted": cells[6],
                "candidate": cells[7],
                "last_reviewed": cells[8],
            }
        )
    return rows


def clean_path(value: str) -> str:
    value = value.strip()
    if not value:
        return ""
    match = re.search(r"\(([^)]+)\)", value)
    if match:
        value = match.group(1)
    return value.strip("` ")


def path_exists(value: str) -> bool:
    path = clean_path(value)
    return not path or (ROOT / path).exists()


def active_entity_from_project_state(text: str) -> str:
    for pattern in (
        r"^- Active or paused entity ID:\s*(.+)$",
        r"^- Current entity under review:\s*(.+)$",
    ):
        match = re.search(pattern, text, flags=re.MULTILINE)
        if match:
            value = match.group(1).strip()
            return "" if value.lower() in {"none", "n/a"} else value
    return ""


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def check_markdown_links(v: Validator, files: list[Path]) -> None:
    missing: list[str] = []
    link_re = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
    for file_path in files:
        text = file_path.read_text(encoding="utf-8")
        for target_raw in link_re.findall(text):
            if "://" in target_raw or target_raw.startswith("#"):
                continue
            target = target_raw.split("#", 1)[0]
            if not target:
                continue
            resolved = (file_path.parent / target).resolve()
            try:
                resolved.relative_to(ROOT)
            except ValueError:
                continue
            if not resolved.exists():
                missing.append(f"{file_path.relative_to(ROOT)} -> {target_raw}")
    v.check(not missing, "referenced decision files and accepted-file links exist where practical")
    for item in missing:
        print(f"  missing link: {item}")


def main() -> int:
    os.chdir(ROOT)
    v = Validator()

    rows = parse_entity_index()
    ids = [row["id"] for row in rows]
    v.check(len(ids) == len(set(ids)), "entity IDs in ENTITY_INDEX.md are unique")

    active_rows = [row for row in rows if row["status"] in ACTIVE_STATUSES]
    v.check(len(active_rows) <= 1, "there is no more than one active entity")

    project_state = read_text("PROJECT_STATE.md")
    active_id = active_entity_from_project_state(project_state)
    index_active_id = active_rows[0]["id"] if active_rows else ""
    v.check(active_id == index_active_id, "PROJECT_STATE active entity matches ENTITY_INDEX.md")

    missing_accepted = [
        row for row in rows if row["status"] in APPROVED_STATUSES and not path_exists(row["accepted"])
    ]
    v.check(not missing_accepted, "every approved entity has an existing accepted-file path")
    for row in missing_accepted:
        print(f"  missing accepted file: {row['id']} -> {row['accepted']}")

    missing_reviews = [
        row for row in rows if row["status"] in REVIEWED_STATUSES and not path_exists(row["review"])
    ]
    v.check(not missing_reviews, "every reviewed entity has an existing review packet path")
    for row in missing_reviews:
        print(f"  missing review packet: {row['id']} -> {row['review']}")

    invalid_review_packets = [
        row for row in rows if row["status"] in APPROVED_STATUSES and not clean_path(row["review"])
    ]
    v.check(not invalid_review_packets, "every accepted or needs-revisit entity has a valid review packet")

    v.check(
        not any(row["status"] == "approved" and row["status"] in ACTIVE_STATUSES for row in rows),
        "no entity is simultaneously approved and marked active",
    )

    link_files = sorted((ROOT / "decisions").glob("*.md")) + sorted((ROOT / "bible").glob("**/*.md"))
    check_markdown_links(v, link_files)

    migration = read_text("MIGRATION_STATUS.md")
    detailed_mentions = re.findall(
        r"`(?:char|org|magic|loc|object|thread|event|culture|group|terminology)-[^`]+`",
        migration,
    )
    v.check(
        len(detailed_mentions) <= 5,
        "MIGRATION_STATUS.md does not contain a second detailed entity-status inventory",
    )

    raw_issues: list[str] = []
    for rel_path, expected_hash in RAW_BASELINE.items():
        path = ROOT / rel_path
        if not path.exists():
            raw_issues.append(f"{rel_path} missing")
        elif sha256(path) != expected_hash:
            raw_issues.append(f"{rel_path} checksum mismatch")
    v.check(not raw_issues, "raw imports remain present and unchanged according to baseline")
    for issue in raw_issues:
        print(f"  raw import issue: {issue}")

    status = git_output(["status", "--porcelain", "-uall"])
    manuscript_changes = [
        line
        for line in status.splitlines()
        if re.search(r"(^.. manuscript/|^.. chapters/|^.. book/|\.scriv|\.docx$)", line)
        and "imports/raw/" not in line
    ]
    v.check(
        not manuscript_changes,
        "no manuscript file is modified in the working tree during review/consistency work",
    )
    for line in manuscript_changes:
        print(f"  manuscript change: {line}")

    literal_latest_hash = re.search(
        r"^- Latest relevant commit:\s*[0-9a-f]{7,40}\b",
        project_state,
        flags=re.MULTILINE,
    )
    v.check(
        literal_latest_hash is None,
        "PROJECT_STATE.md does not contain a self-referential literal latest commit hash",
    )

    if v.failures:
        print(f"\nValidation failed with {len(v.failures)} issue(s).")
        return 1
    print("\nValidation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
