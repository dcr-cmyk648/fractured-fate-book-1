# Revision Workflow

This file owns the future chapter, scene, future-sequence, and next-draft-outline process.

It is not active yet. Do not begin chapter review, scene review, future-sequence outlining, or next-draft outline construction until the story-bible completion gate in `WORKFLOW.md` has passed and the author clearly approves opening the outline phase.

## Story-Bible-First Sequence

The project proceeds in this order:

1. Complete the story-bible review phase.
2. Run a full story-bible consistency and dependency review.
3. Receive author approval to open the outline phase.
4. Map and review the current prose chapter by chapter and, when needed, scene by scene.
5. Build the next-draft outline, including unwritten future chapters.
6. Complete whole-book structural and consistency reviews.
7. Open prose work only after explicit later authorization under `AUTHORING.md`.

Do not begin chapter outlining while the initial story-bible inventory is incomplete.

## Opening Outline Work

After the story-bible completion gate passes, Codex must present a concise story-bible completion report containing:

- approved entities
- deliberately deferred entities
- unresolved but explicitly accepted uncertainties
- remaining consistency risks
- validator results
- recommended outline-readiness status

Then stop for clear author approval to open chapter work. The author does not need to use an exact phrase, but the authorization must clearly approve moving from story-bible review into chapter outlining.

## Chapter and Scene Review

After the outline phase is opened, review the current prose chapter by chapter and, when needed, scene by scene.

Chapter and scene review is read-only with respect to manuscript prose. It may map, summarize, classify, compare, and identify revision needs, but it must not rewrite prose.

For each review unit, preserve enough provenance for another session to locate the source material. Record unresolved issues in existing control files rather than creating competing tracking systems.

## Outline Discoveries

Chapter analysis may reveal facts, mechanics, identities, relationships, chronology, organizations, locations, objects, or plot assumptions that were missing or incorrectly resolved during the story-bible pass.

Classify each discovery as nonblocking or blocking.

### Nonblocking Discovery

Use when the chapter can still be accurately summarized and structurally discussed without resolving the issue immediately.

For a nonblocking discovery:

- add or reopen the appropriate entity in `ENTITY_INDEX.md`
- add a concise item to `CONSISTENCY_QUEUE.md`
- mark the affected chapter or future sequence `needs-revisit` if appropriate
- continue the current chapter review
- resolve the item at the next logical consistency checkpoint

Do not interrupt the author for minor naming, metadata, link, or nonessential details.

### Blocking Discovery

Use when continuing the chapter outline would require Codex to:

- invent a fact
- choose between incompatible canon versions
- assume unresolved magic mechanics
- assume an unresolved character motive or relationship state
- place an event in an uncertain chronology
- rely on unclear organization, location, or object behavior
- make a structural decision whose consequences depend on unresolved canon

For a blocking discovery:

1. Stop substantive work on the current chapter or future sequence.
2. Preserve the partial review packet.
3. Mark its status `paused-for-story-bible-resolution`.
4. Record the exact blocking question and affected files in `PROJECT_STATE.md`.
5. Add or reopen the relevant item in `ENTITY_INDEX.md`.
6. Add one concise linked entry in `CONSISTENCY_QUEUE.md`.
7. Resolve the story-bible item using the existing entity-review workflow.
8. Present one substantive author checkpoint for that issue.
9. After approval, update the owner and dependent files, run the impact scan, validate, commit locally, clear or update the consistency item, and automatically resume the paused chapter or sequence.
10. Do not require separate permission to resume the paused outline work.

Routine steps after substantive approval do not need extra author turns: adding the blocker to indexes, marking the chapter paused, updating dependency links, validating, committing approved work, resuming the paused chapter, or preparing the next review unit.

## New Entities During Outline Work

When outline work discovers a genuinely new entity:

- assign it a stable ID
- add it to `ENTITY_INDEX.md`
- record `discovered_during` with the chapter, scene, or future-sequence ID
- create a normal entity review packet
- do not store accepted facts until reviewed
- return automatically to the paused outline unit after resolution

Do not create a separate competing inventory system for outline discoveries.

## Existing Entity Corrections

When chapter work contradicts an approved entity:

- do not silently change the approved record
- distinguish whether the prose reflects current canon, an obsolete draft version, intentional unreliable POV, a planned next-draft change, or a genuine unresolved contradiction
- reopen the entity as `needs-revisit` when author judgment is required
- preserve the prior review packet as historical evidence
- create a new decision record when the accepted meaning changes

## Control Files During Outline Work

Use existing files rather than creating unnecessary new tracking systems.

`ENTITY_INDEX.md` owns entity existence, entity status, stable IDs, accepted/review/candidate paths, newly discovered entities, and `needs-revisit` state.

`CONSISTENCY_QUEUE.md` owns cross-file conflicts, outline discoveries affecting multiple files, blocking and nonblocking consistency issues, setup/payoff, chronology, knowledge-state, and ability conflicts. Add fields or columns as needed for triggering chapter/scene/sequence, blocking yes/no, paused review unit, and resolution status.

`PROJECT_STATE.md` records immediate operational state. When outline work is paused, record the paused chapter, scene, or future sequence; blocking entity or issue ID; exact question; current files; and next automatic action after resolution. Do not duplicate the full entity or chapter inventory there.

## Consistency Checkpoints

Use three levels:

- Per-unit impact check: after every approved entity, chapter, scene, future sequence, or structural decision, check direct dependencies, update unambiguous linked summaries and metadata, queue uncertain conflicts, and do not add a separate author checkpoint for routine propagation.
- Block-level review: run after logical groups of entities, chapters, scenes, future sequences, or major plotline work. Include newly discovered story-bible issues and present only substantive unresolved decisions to the author.
- Whole-book review: run after the complete initial story bible, after the current draft has been fully mapped, after the future gap-to-ending outline exists, after the next-draft structure is complete, before prose work begins, and after any broad retcon.

## Future and Unwritten Chapters

The same blocking-story-bible mechanism applies to future chapters and unwritten sequences.

Codex may outline future material after the outline phase is opened, but it must not:

- assume missing worldbuilding
- invent unresolved mechanics
- treat candidate events as accepted
- continue past a blocking canon issue

Future sequences remain outline material and must not be described as events already present in the manuscript.

## Prose Gate

No chapter, scene, or future-outline workflow authorizes prose generation.

The outline phase remains read-only with respect to manuscript prose.

Prose work begins only after:

- the story bible is sufficiently complete
- the next-draft outline is sufficiently complete
- applicable consistency reviews pass
- the author explicitly opens prose work under `AUTHORING.md`
