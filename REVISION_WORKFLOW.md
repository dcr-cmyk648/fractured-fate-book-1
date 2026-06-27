# Revision Workflow

This file owns the future chapter, scene, future-sequence, and next-draft-outline process.

It is not active yet. Do not begin chapter review, scene review, future-sequence outlining, or next-draft outline construction until the story-bible completion gate in `WORKFLOW.md` has passed and the author clearly approves opening the outline phase.

## Story-Bible-First Sequence

The project proceeds in this order:

1. Complete the story-bible review phase.
2. Run final story-bible consistency and dependency review.
3. Create the current-draft chapter map.
4. Track prose-preservation intent where wording-level reuse or avoidance may matter.
5. Run the Chapter Architecture Pass and create Chapter Goal Cards.
6. Run whole-book architecture review.
7. Build the detailed next-draft outline.
8. Build the gap-to-ending future/unwritten sequence outline.
9. Run whole-book structural and consistency review.
10. Open prose work only later, by explicit author authorization.

The primary long-term product of this repository is a robust, detailed, internally consistent next-draft outline. If the repository only produces an excellent outline and never generates prose, that is still a successful outcome.

Do not begin chapter outlining while the initial story-bible inventory is incomplete.

## Opening Outline Work

After the story-bible complete-enough gate in `WORKFLOW.md` passes, Codex must present a concise story-bible completion report containing:

- approved entities
- deliberately deferred entities
- outline-ready entities and entities outline-ready with documented uncertainties
- unresolved but explicitly accepted uncertainties
- remaining consistency risks
- story-opportunity findings from completed block reviews
- validator results
- recommended outline-readiness status

Then stop for clear author approval to open chapter work. The author does not need to use an exact phrase, but the authorization must clearly approve moving from story-bible review into chapter outlining.

Do not begin chapter/scene extraction until the author explicitly opens the outline phase. Outline work does not authorize prose drafting.

## Current-Draft Chapter Map

After the outline phase is opened, first map the current prose chapter by chapter and, when needed, scene by scene.

The current-draft chapter map is descriptive. It answers: "What is actually written now?"

For each current chapter, eventually identify:

- source chapter ID
- current chapter number/title
- POV
- scene divisions
- actual events
- starting state
- ending state
- character knowledge
- reader knowledge
- relationship movement
- magic/worldbuilding introduced
- plotline participation
- thread/theme participation
- setup/payoff already present
- obvious problems or omissions
- relevant notes and comments
- possible Prose Preservation Notes, when wording-level material may matter later

Chapter and scene mapping is read-only with respect to manuscript prose. It may map, summarize, classify, compare, and identify revision needs, but it must not rewrite prose. Do not treat future plans or notes as though they are already in the prose.

For each review unit, preserve enough provenance for another session to locate the source material. Record unresolved issues in existing control files rather than creating competing tracking systems.

When a current-draft map packet is awaiting author review, print a concise but substantive audit summary and the required decisions directly in the Codex thread. The author should not need to open the map file unless they want full provenance or have concerns. A future app view may also surface these packets, but the Codex thread remains the required review surface until that exists.

### Current-Draft Map Consistency Cadence

During current-draft chapter mapping, run a significant chapter-map consistency review at least every five approved chapter summaries, and sooner when a broad contradiction, major terminology change, important magic/ability question, chronology issue, or author request makes it useful.

The review should check approved chapter maps against the accepted story bible, prior approved chapter maps, decision records, relevant comments, and `CONSISTENCY_QUEUE.md`. It should also check for repeated divergences such as stale terminology, obsolete mechanics, current-versus-future confusion, character knowledge errors, setup/payoff drift, and chapter-purpose overlap.

Track the cadence in `PROJECT_STATE.md` using current-draft chapter-map counts, not story-bible entity counts. When five approved maps have accumulated since the last chapter-map consistency review, mark consistency review due and run it before preparing another substantive chapter packet unless the author explicitly pauses or redirects.

## Prose Preservation Notes

Prose Preservation Notes are future planning/reference artifacts for tracking wording-level preservation intent. They are not the same as general strong material to preserve.

- `Strong existing material to preserve` means preserve the scene function, beat, image, dynamic, turn, dialogue role, or structural value.
- `Prose Preservation Notes` means the wording-level material itself may be worth preserving, near-quoting, adapting, echoing, or deliberately avoiding.

Do not create Prose Preservation Notes during the current story-bible entity phase unless the author has explicitly identified a specific prose-preservation issue. Create them later during current-draft chapter mapping, scene-level review, Chapter Goal Cards, feedback import, detailed outline work, or authorized prose preparation.

Allowed preservation levels:

- `function-only`: preserve what the scene or passage does, not the wording.
- `beat-level-reuse`: preserve the event sequence, emotional turn, reversal, realization, or interaction pattern; wording can change freely.
- `image-or-metaphor-reuse`: preserve a specific image, metaphor, sensory detail, symbol, recurring phrase, or motif; wording can be adapted.
- `dialogue-near-quote`: keep dialogue substantially similar, preserving intent, rhythm, subtext, or punch; small edits are allowed.
- `exact-or-near-exact-prose`: reuse the wording, sentence, paragraph, or exchange unless there is a strong later reason not to.
- `do-not-reuse-prose`: the underlying scene function, beat, or idea may remain useful, but the current wording should be replaced.
- `needs-author-decision`: Codex suspects wording may be worth preserving, but the author should decide.

Allowed statuses:

- `candidate`
- `approved-for-reuse`
- `approved-near-quote`
- `approved-exact-quote`
- `used-in-outline`
- `used-in-prose`
- `rejected`
- `superseded`
- `needs-author-decision`

Candidate preservation notes do not approve exact or near-exact reuse. Exact or near-exact reuse requires author approval unless the author explicitly marked it that way in feedback or notes.

When the phase opens, store records under a future directory such as:

```text
prose-preservation/
├── index.md
├── current-draft/
│   ├── d1-ch-01.md
│   └── d1-ch-02.md
└── future-use/
    └── approved-reuse.md
```

Do not create these files before the outline/chapter phase opens.

Chapter-level packets may include:

```markdown
## Prose Preservation Notes

| ID | Source | Type | Preserve level | Reference / short excerpt | Reason | Intended next-draft use | Status |
|---|---|---|---|---|---|---|---|
```

Use stable IDs such as `pp-d1-ch37-001`, `pp-d1-ch37-sc02-003`, or `pp-future-seq-004-001`.

Avoid copying large blocks of manuscript text. Each note should store a stable preservation ID, source draft ID, source file path, chapter ID, scene ID if available, line range if available, heading if available, a short excerpt only when exact wording matters, preservation level, reason for preservation, intended next-draft use, status, related Chapter Goal Card or future sequence if known, related comment/feedback ID if relevant, and related decision ID if author-approved. The manuscript remains the canonical source for the full text.

During current-draft mapping, identify possible candidates for distinctive lines, strong dialogue exchanges, recurring images or motifs, emotionally precise formulations, technically useful magic descriptions, vivid sensory descriptions, character voice, compact explanations, prose rhythms worth preserving, passages explicitly praised, and passages explicitly marked as not worth reusing. Do not over-preserve; mark a passage only if preserving it could plausibly improve the next draft.

## Chapter Architecture Pass

After current-draft chapter mapping, create Chapter Goal Cards. This stage treats each chapter, future chapter, or major sequence as a story unit before detailing its scenes. The core question is: "What is this chapter or sequence supposed to accomplish for the book?"

Do not collapse the Chapter Architecture Pass into the detailed next-draft outline. Do not skip it unless the author explicitly says to.

Default to chapter-purpose-first architecture. For each chapter or major sequence, make the overarching purpose decisions from the aggregate events of the full unit before making piece-by-piece decisions about the detailed scene outline. The first architecture pass should decide the chapter's job in the book, the major plot/character/relationship/worldbuilding movement, and whether the current material should be retained, compressed, expanded, moved, merged, split, replaced, or removed. Detailed scene-level outlining comes after the chapter-level purpose is clear, except where a scene-level issue is genuinely blocking the chapter-purpose decision.

Use files such as:

- `chapter-architecture/current-draft/d1-ch-XX.md`
- `chapter-architecture/next-draft/d2-ch-XX.md`
- `chapter-architecture/future/future-seq-XXX.md`

Do not create these files before the outline phase is explicitly opened.

Each Chapter Goal Card should answer what the chapter or sequence is for. Use sections as relevant:

- `Identity`: chapter or sequence ID, current-draft source ID, tentative next-draft ID, POV, status, and source mapping.
- `Working role`: one to three sentences describing the unit's job in the book.
- `Plot goals`: what external events change.
- `Character goals`: how relevant characters change, choose, fail, learn, avoid, or become pressured.
- `Relationship goals`: movement in trust, attraction, rivalry, loyalty, misunderstanding, dependency, conflict, or intimacy.
- `Worldbuilding goals`: what the reader should understand about society, politics, class, culture, geography, technology, zán, Clades, underworld systems, or institutions.
- `Magic / technology goals`: what the reader should learn, infer, or experience about magic, Shrouds, zán, Ink, Fateweaving, Kinesis, Convergence, Archeon techniques, artifacts, or constraints.
- `Information-flow goals`: what the reader learns, what each character learns, what remains hidden, what misinformation persists, and what questions are created or answered.
- `Setup / payoff goals`: what is planted, reinforced, paid off, delayed, or must be remembered later.
- `Thematic / motif goals`: what questions, images, motifs, or thematic tensions the unit develops.
- `Pacing function`: pressure, aftermath, reveal, bridge, decompression, romance escalation, betrayal setup, action, political maneuvering, technical/magic explanation, emotional confrontation, transition, or another explicit function.
- `Strong existing material to preserve`: current-draft scene functions, beats, dialogue roles, images, turns, or dynamics worth carrying forward without requiring exact prose preservation.
- `Prose Preservation Use`: which current-draft material should be reused only functionally, which beats/images/dialogue should be reused or echoed, which exact or near-exact lines are candidates for the next draft, which prose should be deliberately replaced, and which preservation notes remain unresolved. Link to preservation IDs instead of quoting large chunks.
- `Problems to solve`: structural problems such as redundant function, unclear motivation, weak transition, missing reaction, missing consequence, absent setup, missing payoff, wrong POV, underused character, too much exposition, insufficient worldbuilding, pacing issue, continuity issue, or unresolved story-bible dependency.
- `Notes to integrate`: relevant outline notes, Bullet notes, feedback, candidate material, decision records, consistency queue items, and story-bible links, with disposition for every materially relevant note.
- `Dependencies`: required story-bible, plotline, thread, and prior/later chapter dependencies.
- `Open questions`: only questions that affect chapter purpose, structure, or the future outline.
- `Consistency concerns`: classify conflicts as blocking, nonblocking, queue for block review, resolved, or needs story-bible revisit.
- `Proposed next-draft role`: retained, revised, compressed, expanded, moved, merged, split, replaced, removed, candidate, accepted direction, structurally approved, or needs-revisit.
- `Book improvement unlocked`: why this card improves the book. If no meaningful improvement is identifiable, recommend compression, merging, or deferral.

The author is willing to spend extra review time here when useful. Prepare 1-3 Chapter Goal Cards at a time for ordinary chapters, only 1 at a time for complex or pivotal chapters, and allow scene-level cards inside a chapter when multiple functions or conflicts need separate handling.

Use scene-level goal cards when a chapter contains multiple POVs, major scene functions are unclear, the chapter may be split or merged, a scene carries major setup/payoff, a scene has significant worldbuilding or magic implications, a scene has a serious consistency issue, or the author requests it.

## Future and Unwritten Sequence Cards

The Chapter Architecture Pass must support unwritten chapters and future sequences. Create future sequence cards when current prose has not reached the event, notes clearly imply a needed future beat, a plotline requires a missing sequence, an arc has a known destination but no written chapter, the endgame needs structural planning, or setup/payoff analysis shows a missing bridge.

Future sequence IDs should be stable but not final chapter numbers, for example `future-seq-001` and `future-seq-002`.

A future sequence card should include likely POV, prerequisites, required starting state, required ending state, major beats, character movement, relationship movement, plotline movement, worldbuilding/magic requirements, setup required earlier, payoff delivered, unresolved story-bible dependencies, open questions, and confidence/status.

Do not describe future sequences as already present in the current prose. Do not generate prose for future sequences.

## Detailed Next-Draft Outline Use

Detailed next-draft outline files may reference Prose Preservation Notes without duplicating manuscript text. Use compact references such as:

- preserve function from `pp-d1-ch12-002`
- near-quote dialogue from `pp-d1-ch27-004`
- reuse image from `pp-d1-ch31-001`
- do not reuse current wording from `pp-d1-ch08-003`

This supports later prose work without turning outline files into copied manuscript passages.

## Feedback and Review-App Imports

Reader and author comments may imply prose-preservation work. Later feedback imports should recognize comments such as "keep this line," "near quote this," "preserve this image," "keep the emotional beat but rewrite the prose," "this exchange works," "this paragraph is confusing; do not reuse," "this should come back later," "echo this phrase in the ending," or "preserve this as a motif."

When Codex imports comments later, route them into Prose Preservation Notes, revision notes, or `CONSISTENCY_QUEUE.md` as appropriate. Comments remain inbox material until processed. A reader comment does not automatically approve exact prose reuse.

## Chapter Architecture Consistency Checks

Every Chapter Goal Card should trigger a lightweight consistency check before approval.

Check against approved character, organization, magic, location, object, and culture files; decision records; plotline and thread indexes when they exist; existing chapter maps; prior approved Chapter Goal Cards; future sequence cards; `CONSISTENCY_QUEUE.md`; relevant candidate files; and the current manuscript summary.

If approving the card would require choosing or inventing unresolved canon, treat the issue as blocking. Examples include unclear magic mechanics needed for the chapter purpose, uncertain character motive, unresolved relationship state, uncertain chronology, contradictory organization behavior, missing object or location constraint, impossible knowledge state, or setup/payoff contradiction.

For a blocking issue:

1. pause the Chapter Goal Card
2. preserve the partial card
3. create or reopen the relevant story-bible or plotline item
4. add a consistency-queue item
5. resolve the blocking issue through the existing review workflow
6. after approval, automatically return to the paused card

If the card can still be discussed and approved without resolving the issue now, treat the issue as nonblocking. Add it to `CONSISTENCY_QUEUE.md`, mark the card or entity `needs-revisit` if appropriate, continue, and revisit at the next block or whole-book checkpoint.

## Story-Opportunity Review

All block-level consistency reviews should include story-opportunity review, not just error detection.

Check whether two chapters perform the same function, a useful supporting character is underused, a secondary character could make exposition more vivid, a worldbuilding explanation can be moved into conflict or relationship, a planned chapter is missing a character goal, a chapter is all plot and no emotional movement, a chapter is all psychology and no external change, a magic-system development needs earlier setup, a political development needs clearer causal pressure, there is a better witness or POV for an event, a setup/payoff chain is too weak, a theme or motif is introduced and abandoned, a developed trait fails to affect a decision, an approved story-bible detail creates a new scene opportunity, or a detailed element imposes obligations without improving the book.

Queue or report opportunities that may materially improve the outline. Do not force every opportunity into the outline.

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
- run impact scans when later approved changes affect prior outline material

Do not interrupt the author for minor naming, metadata, link, or nonessential details.

Nonblocking discoveries should preserve candidate or flavor material without reopening story-bible work merely because a detail is interesting. Reopen or create a story-bible item only when the discovery has narrative, structural, continuity, or outline value.

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

Use the adaptive-depth rules in `WORKFLOW.md` when reopening or creating a story-bible item during outline work. Brief, grouped, or deferred handling is preferred when the issue does not need a full independent review.

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

Chapter mapping, Chapter Goal Cards, detailed outlining, feedback import, and consistency checks may also discover new repository-level items that are not strictly new story-bible entities: plotline records, thread records, chapter-architecture issues, future-sequence needs, prose-preservation candidates, feedback records, queue items, or stale accepted records. Route each item to its owning repository file or queue, mark blocking items before continuing, and do not treat the current chapter packet as permission to silently accept or discard the new material.

Consistency checks should be especially alert for these discoveries. If a newly discovered item could affect plot, character motivation, continuity, magic/world logic, chronology, setup/payoff, chapter purpose, or the future outline, preserve it and review or queue it before moving past the relevant checkpoint.

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

`CONSISTENCY_QUEUE.md` owns cross-file conflicts, outline discoveries affecting multiple files, blocking and nonblocking consistency issues, setup/payoff, chronology, knowledge-state, ability conflicts, chapter goal conflicts, scene function duplication, continuity drift, unclear ownership, stale accepted records, and worldbuilding implications not yet reviewed. Use or add fields for blocking yes/no/unknown and review stage, including `entity-review`, `block-review`, `chapter-architecture`, `current-draft-map`, `future-outline`, `next-draft-outline`, `prose-phase`, and `whole-book-review`.

`PROJECT_STATE.md` records immediate operational state. When outline work is paused, record the paused chapter, scene, or future sequence; blocking entity or issue ID; exact question; current files; and next automatic action after resolution. Do not duplicate the full entity or chapter inventory there.

## Consistency Checkpoints

Use three levels:

- Per-unit impact check: after every approved entity, chapter, scene, future sequence, or structural decision, check direct dependencies, update unambiguous linked summaries and metadata, queue uncertain conflicts, and do not add a separate author checkpoint for routine propagation.
- Block-level review: run after logical groups of entities, chapters, scenes, future sequences, or major plotline work. For current-draft chapter mapping, a significant consistency review is required at least every five approved chapter summaries. Include newly discovered story-bible issues and present only substantive unresolved decisions to the author.
- Whole-book review: run after the complete initial story bible, after the current draft has been fully mapped, after the future gap-to-ending outline exists, after the next-draft structure is complete, before prose work begins, and after any broad retcon.

Every major phase and meaningful block should re-check prior accepted documents for conflicts created by later decisions. Check earlier approved files against newer decisions, candidate files for material that should now be promoted/rejected/obsolete, related consistency-queue items, current/future status, renamed terms, unresolved contradiction markers, setup/payoff obligations, character knowledge states, magic and ability constraints, chronology, location feasibility, and whether later changes invalidate earlier chapter goals.

Prose-preservation checks should also verify that preservation notes are not orphaned; approved-near-quote or approved-exact-quote items are not lost during outlining; `do-not-reuse-prose` items are not accidentally treated as keepers; exact/near-exact reuse still fits changed canon and chapter structure; preserved lines still make sense after later story-bible or outline changes; preserved imagery or motifs are not duplicated awkwardly; notes linked to removed or merged chapters are remapped or marked `superseded`; and feedback-derived preservation notes are not silently ignored. When in doubt, queue the issue in `CONSISTENCY_QUEUE.md`.

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

Story-bible work, chapter mapping, Chapter Goal Cards, detailed outlines, future sequence planning, missing transitions, and "continue" do not authorize prose drafting or manuscript edits.

Prose Preservation Notes do not authorize Codex to rewrite the manuscript, apply preserved text into manuscript files, generate replacement prose, edit existing prose, quote large passages into outline files, or convert chapter goals into prose.

Prose work begins only after:

- the story bible is sufficiently complete
- the next-draft outline is sufficiently complete
- applicable consistency reviews pass
- the author explicitly opens prose work under `AUTHORING.md`

When prose work is eventually opened, manual edits on disk remain authoritative. Codex must not restore a removed line merely because it appears in a Prose Preservation Note. Before using a preservation note in actual prose work, reload the current manuscript file from disk, check whether the source text still exists, check whether the author has removed or changed it, treat author-edited text as newer authority, and ask before restoring text that has been manually removed.
