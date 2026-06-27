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

Status: completed and committed

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

Status: in progress

Current phase notes:

- Core-character block is complete.
- Major-organization review is complete through the current approved organization queue; core magic-system review is in progress.
- First core-entity consistency review has been completed.
- The Ink/systems block-level consistency review was completed after `magic-ink-boons`.
- Kinesis (`magic-subversion`) has been approved after the Ink/systems consistency review.
- Detailed entity queue status lives only in `ENTITY_INDEX.md`.
- Story-bible review must be complete enough before any chapter review, chapter outlining, future-sequence outlining, or next-draft outline construction begins.
- Complete enough means every entity in the approved initial inventory is `approved`, `deferred`, or `superseded`; every entity needed for the outline is outline-ready or outline-ready with documented uncertainties; any `needs-revisit` item that would materially affect the outline is resolved or explicitly deferred by the author; block-level consistency and opportunity reviews have been run for completed entity categories; no known unresolved issue prevents understanding the book's causal structure; remaining uncertainties are preserved as candidates, queue items, or explicit deferred issues; and the author approves opening the outline phase.
- Complete enough does not freeze the story bible forever. Later blocking chapter/scene discoveries can reopen or create story-bible items, and nonblocking discoveries should be queued without interrupting chapter review.
- Adaptive review depth applies going forward: deep, standard, brief/grouped, or deferred review depth should match narrative leverage, continuity risk, and outline usefulness. Previously approved files remain valid and do not need immediate retroactive metadata backfills.
- The cultures-and-world-systems consistency and opportunity review was completed after the number-system / zän script review.
- Current audit mode is over-checking: meaningful uncertainty that could affect plot, character, continuity, world logic, magic, chronology, emotional arc, setup/payoff, or the future outline should be checked, preserved, and queued rather than silently assumed away.

Gate:

- Work on one entity at a time.
- Create source-backed review packets.
- Stop for author review.
- Do not write accepted bible files until explicit entity approval.
- Do not begin chapter review or chapter outlining during Phase 4.

Observed entity-review notes:

- Approved entity records are stored under `bible/`, with retained alternatives under `planning/candidates/`, review audit trails under `reviews/entities/`, and explicit decisions under `decisions/`.
- Cross-file issues requiring later review are tracked in `CONSISTENCY_QUEUE.md`.
- Current queue, statuses, and file paths live only in `ENTITY_INDEX.md`.

## Phase 5: Approved Durable Records

Status: in progress as entities are approved

Gate:

- Store approved entity information in `bible/`, `outline/`, `revision/`, `planning/candidates/`, `decisions/`, `feedback/`, and `reviews/entities/` as appropriate.
- Update `ENTITY_INDEX.md` and `PROJECT_STATE.md`.
- Stop before committing unless commit authorization has been given.
- The initial story-bible phase is complete enough when every entity in approved project scope is `approved`, `deferred` by author, or `superseded`; every entity needed for the outline is outline-ready or outline-ready with documented uncertainties; and any outline-material `needs-revisit` item is resolved or explicitly deferred.
- All direct contradictions and broad retcons affecting approved records that would materially affect the outline must be resolved or explicitly deferred.
- All completed entity blocks must have passed consistency and story-opportunity review.
- Cross-file links and dependencies must validate, the final story-bible consistency report must be reviewed, the working tree must be clean, and the active branch must be synchronized.
- After the completion gate passes, present a story-bible completion report and wait for clear author approval before opening outline/chapter work.

## Phase 5.5: Full Story-Bible Consistency Review

Status: not started

Gate:

- Run after the initial story-bible inventory reaches the completion gate.
- Review approved records, deferred/superseded entities, direct dependencies, pending consistency queue items, broad retcons, and cross-file links.
- Produce the final story-bible consistency report.
- Do not open outline/chapter work until the author reviews the report and clearly approves opening the outline phase.

## Phase 6: Current-Draft Chapter Map

Status: not started

Gate:

- Begin only after the story-bible completion gate, final story-bible consistency review, stable chapter source IDs or chapter files, and clear author approval to open the outline/chapter phase.
- Map what is actually written now: chapter/source ID, POV, scene divisions, actual events, starting and ending states, character knowledge, reader knowledge, relationship movement, worldbuilding/magic introduced, plotline/thread participation, setup/payoff, problems or omissions, and relevant notes/comments.
- Identify candidate Prose Preservation Notes only when wording-level reuse or avoidance could plausibly improve the next draft.
- Preserve source provenance.
- Do not rewrite, split, or draft prose unless a separate authorized manuscript-preparation workflow permits it.

## Phase 7: Chapter Architecture Pass / Chapter Goal Cards

Status: not started

Gate:

- Begin after the current-draft chapter map.
- Create Chapter Goal Cards for current-draft chapters, next-draft chapter candidates, and future/unwritten sequences as needed.
- Treat each chapter or sequence as a story unit before detailed scene outlining.
- Link to Prose Preservation Notes where a chapter should reuse only function, reuse or echo a beat/image/dialogue exchange, near-quote a line, preserve exact prose with author approval, or deliberately avoid current wording.
- Run lightweight consistency checks against approved story-bible files, decision records, current chapter maps, prior cards, candidate files, and `CONSISTENCY_QUEUE.md`.
- Pause and reopen story-bible or plotline work for blocking issues; queue nonblocking issues.
- Do not generate or modify manuscript prose.

## Phase 8: Detailed Next-Draft Outline and Future Sequence Outline

Status: not started

Gate:

- Begin after Chapter Architecture / Chapter Goal Cards and whole-book architecture review.
- Build the detailed next-draft outline.
- Build the gap-to-ending future/unwritten sequence outline with stable future sequence IDs.
- Integrate relevant notes, feedback, candidates, decisions, plotlines, arcs, Chapter Goal Cards, Prose Preservation Notes, and consistency queue items.
- Do not generate or modify manuscript prose.

## Phase 9: Whole-Book Structural and Consistency Review

Status: not started

Gate:

- Run after the current draft has been mapped, Chapter Goal Cards have been reviewed, the future gap-to-ending outline exists, and the next-draft structure is complete.
- Check structure, continuity, setup/payoff, chronology, knowledge states, abilities, relationships, world logic, current/future status, and story opportunities across the whole project.
- Check that approved or unresolved Prose Preservation Notes are mapped, rejected, superseded, or queued rather than silently lost.
- Resolve or explicitly defer blocking issues before prose work can open.

## Phase 10: Bullet Notes Inbox

Status: not started

Gate:

- Convert Bullet notes into a controlled inbox when useful for the opened outline phase.
- Preserve unresolved, speculative, and discarded ideas without treating them as accepted canon.

## Phase 11: Local Editing, Assembly, Export, and Reference Validation

Status: not started

Gate:

- Add safe local manual-edit and Git synchronization procedures as needed.
- Add manuscript assembly and export tooling only after explicit authorization.
- Do not install dependencies without explicit authorization.
- Add continuity and reference validation once the durable reference structure is stable.
- Validation tools must not rewrite manuscript prose.
- Whole-book reviews run after the complete initial story bible, after the current draft has been fully mapped, after the future gap-to-ending outline exists, after the next-draft structure is complete, before prose work begins, and after any broad retcon.

## Future Tooling Ideas

Later, consider adding deterministic source indexes to reduce repeated scanning:

- `reports/source-index/chapters.json`
- `reports/source-index/entities.json`
- `reports/source-index/aliases.json`
- `reports/source-index/notes.json`

Do not build these now. Their purpose would be to speed up chapter/entity lookup without replacing source-backed review.

## Permanent Authoring Gate

- Entity review and repository setup do not authorize manuscript drafting.
- Chapter review, scene review, current-draft mapping, Chapter Goal Cards, detailed outlines, future sequence planning, and future-outline work do not authorize manuscript drafting.
- New prose remains opt-in under `AUTHORING.md`.
- The authoring workspace must be deliberately opened by the author before prose drafting begins.
- Manual edits to local manuscript files remain authoritative and must never be overwritten by generated text.
