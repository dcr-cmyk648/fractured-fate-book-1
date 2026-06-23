# Migration Status

This file records migration phases and phase gates. `PROJECT_STATE.md` records the immediate working state and resume point.

## Phase 0: Raw Source Import

Status: completed

Gate:

- Three Google Docs are manually downloaded as Microsoft Word DOCX files.
- Files are placed in `imports/raw/` with exact filenames:
  - `melissa-copy.docx`
  - `book-1-outline.docx`
  - `bullet-notes.docx`
- Files are treated as untouched archival source material.
- Verification is read-only:
  - confirm all three exist
  - run `file`
  - run `unzip -t`
  - report file sizes
  - calculate SHA-256 checksums with `shasum -a 256`
  - check for `word/comments.xml`
  - perform basic completeness checks
  - do not extract files into the repository

Observed verification summary from 2026-06-23:

- `melissa-copy.docx`: present, 1,056,325 bytes, valid DOCX package, contains `word/comments.xml`, Chapter 1 and Chapter 37 detected.
  - SHA-256: `0887a699a7da9e00d886231981770f40fd7b4f53593bcfc7a76cabbf63de0b2f`
- `book-1-outline.docx`: present, 2,615,614 bytes, valid DOCX package, no `word/comments.xml`, expected section markers detected.
  - SHA-256: `5b5b1576d0e4a78821d5924eb9c9cc079c5344c4d5296562e2d3ee92f9dee386`
- `bullet-notes.docx`: present, 15,394 bytes, valid DOCX package, no `word/comments.xml`, expected section markers detected.
  - SHA-256: `e3c3b66d8f6de958b32934739f6aa74a7b995cd7dfefd9f4a2e818677cfa36f0`

## Phase 1: Control Files and Workflow

Status: completed

Gate:

- Create `README.md`.
- Create `AGENTS.md`.
- Create `PROJECT_STATE.md`.
- Create `ENTITY_INDEX.md`.
- Create `WORKFLOW.md`.
- Create `decisions/index.md`.
- Preserve the one-entity-at-a-time workflow.
- Do not begin entity inventory or review.
- Do not commit until the author explicitly approves.

## Phase 2: Source Normalization

Status: not started

Gate:

- Authorized separately by the author.
- Normalize the three source documents into text/Markdown according to an approved method.
- Preserve provenance and comments where possible.
- Do not rewrite or reinterpret content during normalization.

## Phase 3: Entity Inventory

Status: not started

Gate:

- Requires completed normalized sources.
- Create inventory and proposed review order only.
- Do not write accepted canon.
- Show inventory to the author and stop.

## Phase 4: Entity-by-Entity Review

Status: not started

Gate:

- Work on one entity at a time.
- Create source-backed review packets.
- Stop for author review.
- Do not write accepted bible files until explicit entity approval.

## Phase 5: Approved Durable Records

Status: not started

Gate:

- Store approved entity information in `bible/`, `outline/`, `revision/`, `planning/candidates/`, `decisions/`, `feedback/`, and `reviews/entities/` as appropriate.
- Update `ENTITY_INDEX.md` and `PROJECT_STATE.md`.
- Stop before committing unless commit authorization has been given.
