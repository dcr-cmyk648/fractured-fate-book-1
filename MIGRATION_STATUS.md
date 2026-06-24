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

Status: completed and committed

Gate:

- Authorized separately by the author.
- Normalize the three source documents into text/Markdown according to an approved method.
- Preserve provenance and comments where possible.
- Do not rewrite or reinterpret content during normalization.

Observed normalization summary from 2026-06-23:

- Generated `imports/normalized/melissa-copy.md` from `imports/raw/melissa-copy.docx`.
  - 7,585 DOCX paragraphs scanned.
  - 7,136 non-empty text blocks emitted.
  - Chapter 1 through Chapter 37 detected.
- Generated `imports/normalized/book-1-outline.md` from `imports/raw/book-1-outline.docx`.
  - 3,763 DOCX paragraphs scanned.
  - 3,027 non-empty text blocks emitted.
  - Expected markers detected: `Ch37`, `Prior scene edits`, `Overarching changes`, `Major edits`.
- Generated `imports/normalized/bullet-notes.md` from `imports/raw/bullet-notes.docx`.
  - 164 DOCX paragraphs scanned.
  - 95 non-empty text blocks emitted.
  - Expected markers detected: `Future Scenes`, `Prior Scene Edits`, `Daily to do`, `Planning`.
- Generated `imports/normalized/melissa-copy.comments.md`.
  - 113 comments extracted from `word/comments.xml`.
  - All extracted comments have derived anchors in the normalized manuscript.
- Generated `imports/normalized/README.md` describing the normalization method and generated files.
- Raw DOCX SHA-256 checksums still match the Phase 0 baseline after normalization.

## Phase 3: Entity Inventory

Status: completed and committed; awaiting authorization to begin entity review

Gate:

- Requires completed normalized sources.
- Create inventory and proposed review order only.
- Do not write accepted canon.
- Show inventory to the author and stop.

Observed inventory summary from 2026-06-23:

- Created proposed entity queue in `ENTITY_INDEX.md`.
- No entity review packets were created.
- No accepted bible, outline arc, revision, feedback, or candidate files were created.
- No entity is marked `in-review`.
- Inventory was visually reviewed by the author and committed.

## Phase 4: Entity-by-Entity Review

Status: in progress; `char-maya`, `char-davian`, `char-niall`, `char-elric`, `char-harvick`, `char-selwin`, `char-jalen`, `org-rezin`, and `org-archeon` approved; `char-kelyra` marked needs-revisit for Concord role-swap chronology; `char-alden` deferred as an obsolete Aldira name pending cleanup

Gate:

- Work on one entity at a time.
- Create source-backed review packets.
- Stop for author review.
- Do not write accepted bible files until explicit entity approval.

Observed entity-review summary from 2026-06-23:

- `char-maya` was reviewed, approved, and stored in `bible/characters/char-maya.md`.
- Candidate Maya material was stored in `planning/candidates/characters/char-maya.md`.
- Approved prologue revision direction was stored in `revision/prologue/maya-shroud-attack.md`.
- Broader demi-human worldbuilding items were opened for separate review in `ENTITY_INDEX.md`.
- `char-davian` was reviewed, approved, and stored in `bible/characters/char-davian.md`.
- Candidate Davian material was stored in `planning/candidates/characters/char-davian.md`.
- Davian's approved broad arc seed was stored in `outline/arcs/thread-davian-identity-guilt.md`.
- `char-niall` was reviewed, approved, and stored in `bible/characters/char-niall.md`.
- Candidate Niall material was stored in `planning/candidates/characters/char-niall.md`.
- Niall's approved broad grief/recovery arc seed was stored in `outline/arcs/thread-niall-grief-recovery.md`.
- Follow-up consistency items for Niall's silver conduits and mercenary moral framing were recorded in `CONSISTENCY_QUEUE.md`.
- `char-kelyra` was reviewed, approved, and stored in `bible/characters/char-kelyra.md`.
- Candidate Kelyra material was stored in `planning/candidates/characters/char-kelyra.md`.
- Kelyra's approved broad Archeon trauma/family-protection arc seed was stored in `outline/arcs/thread-kelyra-archeon-recovery.md`.
- Follow-up consistency items for Kelyra's magic terminology, trauma-blocked Shroud, Lirien spelling, and Lethira parentage were recorded in `CONSISTENCY_QUEUE.md`.
- `char-elric` was reviewed, approved, and stored in `bible/characters/char-elric.md`.
- Candidate Elric material was stored in `planning/candidates/characters/char-elric.md`.
- Elric's approved broad reality/Skein endgame arc seed was stored in `outline/arcs/thread-elric-reality-skein.md`.
- Follow-up consistency items for Elric's Harbinger/Syndicate takeover, Ink Pact possession, fate-strand sight, Heart exposure, codex/aura persistence, and reality-fracture mechanics were recorded in `CONSISTENCY_QUEUE.md`.
- Block-level consistency checkpoint after five approved entities found no broken Markdown links and no immediate substantive conflict requiring author input. Pending cross-file issues were deferred to their owning entity reviews in `CONSISTENCY_QUEUE.md`.

## Phase 5: Approved Durable Records

Status: not started

Gate:

- Store approved entity information in `bible/`, `outline/`, `revision/`, `planning/candidates/`, `decisions/`, `feedback/`, and `reviews/entities/` as appropriate.
- Update `ENTITY_INDEX.md` and `PROJECT_STATE.md`.
- Stop before committing unless commit authorization has been given.
