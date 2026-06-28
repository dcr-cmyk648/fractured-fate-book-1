# Workflow

This file defines the persistent migration and entity-review process. A new Codex session must be able to continue from repository files without relying on conversation history.

For authoring collaboration style, scene construction, prose drafting, local revision, critique, and manuscript application work, follow `AUTHORING.md`. `AUTHORING.md` supersedes any blanket implication that Codex must never generate prose: prose is allowed only when the author clearly opts in and within the boundaries defined there.

For future chapter, scene, future-sequence, and next-draft outline workflow after the story-bible gate opens, follow `REVISION_WORKFLOW.md`. `REVISION_WORKFLOW.md` does not authorize chapter work until the story-bible completion gate below has passed and the author clearly approves opening the outline phase.

## Governing Objective

The primary long-term product of this repository is a robust, detailed, internally consistent next-draft outline.

The intended sequence is:

1. Complete story-bible review.
2. Run final story-bible consistency and dependency review.
3. Create the current-draft chapter map.
4. Track prose-preservation intent during chapter mapping, Chapter Goal Cards, feedback import, and later outline work.
5. Create and review Chapter Architecture / Chapter Goal Cards.
6. Run whole-book architecture review.
7. Build a detailed next-draft outline.
8. Build the gap-to-ending future/unwritten sequence outline.
9. Run whole-book structural and consistency review.
10. Open prose work only later, by explicit author authorization.

If the repository only produces an excellent outline and never generates prose, that is still a successful outcome.

## Startup

Before doing book work, Codex must:

1. Read `AGENTS.md`.
2. Read `README.md`.
3. Read `PROJECT_STATE.md`.
4. Read `WORKFLOW.md`.
5. Read `ENTITY_INDEX.md`.
6. Read `CONSISTENCY_QUEUE.md` if it exists.
7. Read `MIGRATION_STATUS.md` if migration is not complete.
8. Read the files listed under "Files to read for current task" in `PROJECT_STATE.md`.
9. Run `pwd`.
10. Run `git status --short --branch`.
11. Compare the actual Git state with `PROJECT_STATE.md`.
12. Report any discrepancy before modifying files.
13. State the current phase, current entity, and the one task it intends to perform.
14. Do not broaden the task without author permission.

## Migration Phases

`MIGRATION_STATUS.md` is the record of migration phases and gates. `PROJECT_STATE.md` records immediate operational state. Do not duplicate large amounts of phase detail between them.

Phase 0 is the raw source import and verification step. Raw DOCX files in `imports/raw/` are archival source material and must remain untouched.

Phase 1 creates durable control files and the persistent review workflow. Entity inventory and review must not begin until the required normalized sources exist and the author authorizes that phase.

Authoring work is separate from migration work. The existence of `AUTHORING.md` does not authorize Codex to draft manuscript prose, alter imported prose, turn outlines into prose, start entity review, skip migration gates, or classify speculative notes as canon.

## Governing Sequence

This repository uses a story-bible-first workflow. This supersedes any prior implication that story-bible review, chapter review, chapter outlining, future-sequence planning, or next-draft outline construction should happen in parallel, in alternating blocks, or interleaved before the initial story-bible inventory is complete.

Proceed in this order:

1. Complete the story-bible review phase.
2. Run a full story-bible consistency and dependency review.
3. Receive author approval to open the outline phase.
4. Map and review the current prose chapter by chapter and, when needed, scene by scene.
5. Track prose-preservation intent as a future chapter/outline artifact, without duplicating manuscript passages.
6. Run the Chapter Architecture Pass and create Chapter Goal Cards.
7. Run whole-book architecture review.
8. Build the detailed next-draft outline.
9. Build the gap-to-ending future/unwritten sequence outline.
10. Complete whole-book structural and consistency reviews.
11. Open prose work only after explicit later authorization under `AUTHORING.md`.

Do not begin chapter outlining while the initial story-bible inventory is incomplete.

## Minimum Sufficient Canon

The story-bible phase should settle only the amount of canon needed to:

- understand the story
- avoid major contradictions
- support character and plot decisions
- build the future chapter/scene outline
- prepare later prose work

Minimum sufficient canon is the floor. Narrative usefulness determines the ceiling. Explore freely, canonize selectively, and audit in proportion to consequence.

The story bible has three equal purposes:

1. source of truth
2. creative-development workspace
3. context engine for the future outline and later prose work

The goal is not to minimize the story bible. The goal is also not to create an encyclopedia merely because the repository can store one. A detailed review is valuable when it helps discover, choose, clarify, or preserve something that can make the book better.

Codex should not try to exhaustively define every detail of every entity during the initial story-bible phase.

Details that should usually be preserved as candidates unless they affect the outline include:

- exact room dimensions
- exact device manufacturing history
- exact minor terminology variants
- exhaustive lists of every object or subcomponent
- distant cosmology that does not affect Book 1 structure
- minor cultural practices that are not needed for current plot, character, or world logic

When in doubt, ask: "Does this decision materially affect the story bible, outline, continuity, or future prose?" If not, preserve it as candidate material and move on.

Do not equate "not required for canon" with "not worth discussing." Exploratory discussion is useful when it may reveal narrative leverage. Do not equate "discussed" with "must become canon."

## Audit Mode: Over-Checking

Current audit mode: over-checking.

The project should err on the side of over-checking and queuing issues for author review when the issue could affect plot, character, continuity, world logic, magic, chronology, emotional arc, setup/payoff, or the future outline.

This does not mean interrupting the author for every small issue. It means:

- check more rather than less
- preserve suspect material rather than discarding it
- queue unresolved issues rather than silently deciding them
- mark affected files or entities `needs-revisit` when later work may conflict with earlier material
- group author-facing decisions into meaningful checkpoints when possible
- avoid silent propagation of uncertain changes
- prefer "document and queue" over "assume and move on"

When the choice is between possibly under-auditing a meaningful issue and adding a queue item for later review, choose the queue item. If this becomes too burdensome, the author will explicitly ask to reduce the checking level.

In over-checking mode, gather more source coverage for major reviews, search for indirect relevant notes as well as exact names, queue more possible issues rather than fewer, run consistency checks at shorter intervals, present grouped unresolved issues more often, mark `needs-revisit` more readily, preserve suspect material, explicitly identify what has not been checked, and prefer one extra checkpoint over silent drift.

Over-checking applies to story-bible entity reviews, chapter architecture, current-draft maps, future outlines, next-draft outlines, consistency reviews, and the later prose phase if opened. It does not authorize prose generation or manuscript changes.

## Author-Facing Checkpoints Under Over-Checking

The low-friction workflow remains, but the threshold for queuing possible issues is lower and grouped unresolved issues should surface more often.

Do not ask for author approval for every mechanical update. Do ask for author judgment when a decision changes meaning, a conflict affects the future outline, a detail could affect character motivation, a worldbuilding rule affects chapter structure, current prose and intended canon differ, a later decision may invalidate prior approved material, a note seems important but its destination is unclear, or Codex would otherwise have to invent or assume.

Prefer grouped checkpoints, such as unresolved issues from a chapter architecture batch, story-bible conflicts that block the next outline section, or opportunities and contradictions from a block review.

## Web-App Comment Intake and Batch Review

Web-app comments are inbox material. They are not canon, accepted revisions, instructions to alter manuscript prose, automatic story-bible decisions, or automatic prose-preservation approvals.

Comments from the static review app must be imported, normalized, archived, synthesized, and converted into reviewable tickets or queue items before affecting durable book files. Reader comments may reveal problems, opportunities, or tickets, but they do not bypass existing approval workflows. Multiple readers saying the same thing increases salience but does not automatically decide the fix.

Author Scratchpad entries from the static app are part of this same inbox flow. They replace the old Bullet notes capture habit for quick local capture, but they do not create a separate notes database or bypass approval. `scratchpad-content` records may later route to story-bible review, candidate ideas, future sequence notes, chapter architecture, prose-preservation tickets, revision suggestions, or consistency queue items. `scratchpad-technical` records may later route to app bugs, data-processing tickets, workflow tickets, export/import issues, or repository maintenance tasks.

The durable repository-side silo is `feedback/webapp/`:

- `incoming/`: manual drop zone for exported `.json`, `.jsonl`, or `.md` app comment files.
- `raw/`: immutable archive of imported source files, grouped by batch.
- `normalized/`: deduplicated normalized comment records and comment index.
- `batches/`: one directory per import batch with manifest, normalized comments, report, duplicates, and rejected records.
- `synthesis/`: batch-level Codex analysis reports.
- `tickets/`: proposed actionable work items generated from batches.
- `processed/`: successfully imported source files after archival/import confirmation.
- `schemas/`: expected comment and ticket shapes.

Comment import is mechanical and may be run without a creative author checkpoint:

1. Place exported app comment files in `feedback/webapp/incoming/`.
2. Run `python3 scripts/import_webapp_comments.py`.
3. The script copies raw files to `feedback/webapp/raw/<batch-id>/`, writes normalized JSONL under `feedback/webapp/batches/<batch-id>/`, appends deduplicated records to `feedback/webapp/normalized/comments.jsonl`, updates `feedback/webapp/normalized/comments-index.md`, and moves source files to `feedback/webapp/processed/<batch-id>/`.
4. The script may assign only lightweight deterministic classifications such as `prose-preservation-candidate`, `line-edit`, `reader-confusion`, `continuity-question`, `story-bible-question`, `chapter-architecture-note`, `app-bug`, `general-reaction`, or `unclear`.
   Scratchpad records may also classify as `scratchpad-content` or `scratchpad-technical`.
5. The script must not make substantive creative decisions, edit prose, modify canon, call Google Drive APIs, call OpenAI APIs, or create GitHub Issues.

After import, use a Web-App Comment Batch Review process:

1. Codex reads the normalized batch, import report, comment index, relevant target files, relevant story-bible files, and relevant workflow files.
2. Codex groups comments by chapter, file, layer, selected text, issue type, repeated concern, commenter, story-bible entity, and consistency impact.
3. Codex creates `feedback/webapp/synthesis/<batch-id>-synthesis.md`.
4. Codex proposes tickets under `feedback/webapp/tickets/<batch-id>/`.
5. Codex presents one author checkpoint for the batch, not one checkpoint per raw comment.
6. After author approval, Codex marks approved tickets as `accepted-for-workflow`, rejected tickets as `rejected`, and uncertain tickets as `proposed` or `needs-author-decision`.
7. Only after approval should tickets be routed into the appropriate workflow, `CONSISTENCY_QUEUE.md`, chapter architecture, story-bible review, revision suggestions, app maintenance, or future prose-preservation records.

Batch checkpoints should summarize import count, duplicates, rejected records, top repeated concerns, high-priority tickets, blocking tickets, prose-preservation candidates, continuity/story-bible risks, app bugs, suggested routing, and grouped questions requiring author judgment.

Ticket routing:

- Route contradictions, possible contradictions, chronology problems, ability/magic conflicts, knowledge-state problems, current-versus-future confusion, and prior document conflicts to `CONSISTENCY_QUEUE.md` only after approval, except for clearly blocking contradictions that would otherwise be lost.
- Route "keep this line," "near-quote this," "preserve this image," "this exchange works," "do not reuse this prose," and "echo this later" comments to prose-preservation tickets unless the prose-preservation workflow is open or the author explicitly authorizes record creation.
- Route chapter function, pacing, setup/payoff, reader-confusion-about-purpose, and worldbuilding/plotline-development comments to chapter architecture tickets. If chapter architecture has not begun, mark them `pending-outline-phase`.
- Route unclear worldbuilding, character motivation, magic-system uncertainty, organization/location/object detail, or entity ownership issues to story-bible review tickets.
- Route local chapter changes, possible cuts, possible expansions, prose clarity, and reader confusion in the current draft to revision-suggestion tickets. Do not edit prose.
- Route missing chapter, broken navigation, wrong layer, export problem, or UI problem comments to app-maintenance tickets.

Every synthesis item and ticket must preserve source comment ID, normalized comment ID, batch ID, commenter, timestamp, target file/chapter/layer, selected text or anchor if available, and exported repo commit if available. Do not summarize a comment in a way that loses its target or strengthens an ambiguous comment beyond what it says.

When new tickets are created during another workflow, process lower-level dependencies before higher-level work. Prioritize story-bible, basic lore, character, magic, terminology, location, object, chronology, and consistency tickets before chapter-architecture, current-draft-map, future-outline, next-draft-outline, prose-preservation, or prose-phase tickets that depend on them. If a higher-level ticket can proceed safely without the lower-level decision, keep it queued; otherwise pause the higher-level unit until the lower-level ticket is approved, rejected, or explicitly deferred.

The repository does not depend on Google Drive APIs for this workflow. If the author uses a local Google Drive-synced folder, copy exported files from that folder into `feedback/webapp/incoming/` before running the import script. Do not read arbitrary Google Drive folders unless the author explicitly provides a local path and authorizes it.

## Book-Improvement Test

Before deepening an entity or asking the author to settle another detail, Codex should ask whether the work could plausibly do at least one of the following:

- change what a character wants, chooses, notices, fears, misunderstands, or avoids
- make a relationship or conflict more specific
- enable or improve a scene
- enable a reveal, setup, payoff, reversal, or plot turn
- clarify a causal constraint
- clarify how magic, technology, politics, geography, culture, or chronology limits events
- give a recurring character a more distinctive voice, competence, bias, or behavioral pattern
- help determine who should perform a narrative function in the outline
- prevent a likely continuity, chronology, knowledge-state, or ability error
- sharpen a theme or motif that appears in the book
- create reader-visible texture that strengthens the setting or emotional experience
- distinguish two entities that would otherwise feel interchangeable
- reveal a useful contradiction or story opportunity

When the answer is yes, further development may be worthwhile.

When the answer is no, Codex should normally stop deepening the entity, preserve interesting material as optional candidate/flavor, avoid asking the author to settle it, and move on.

## Adaptive Review Depth

Codex should assign each entity a provisional review depth automatically. Do not create an extra author checkpoint merely to approve the depth.

Allowed review depths:

- `deep`: entities with major causal, emotional, thematic, structural, or continuity importance, such as principal characters, major antagonists, foundational magic systems, central organizations, major plot objects, central plotlines, and entities whose contradictions affect many approved files.
- `standard`: recurring supporting characters, important locations, recurring technologies, secondary organizations, and entities that perform meaningful scene functions.
- `brief` or `grouped`: incidental characters, ordinary objects, one-scene places, minor institutions, and entities whose value is primarily functional.
- `deferred`: entities with no current narrative leverage, no meaningful continuity risk, and no foreseeable role in the outline.

A deep review may examine psychology, history, relationships, goals, knowledge states, abilities and limitations, role in existing prose, future arc, scene opportunities, thematic meaning, continuity dependencies, and setup/payoff obligations.

A standard review should establish enough to make the entity distinct, reusable, internally coherent, useful in the outline, and safe for later prose work.

A brief or grouped review should store identity, function, relevant appearances, important constraints, and any distinctive detail needed for continuity.

A deferred entity should preserve the source pointer or candidate note without spending author-review time unless later work makes it relevant.

Review depth is provisional. Codex may automatically deepen an entity when source gathering reveals recurring appearances, distinctive relationships, useful scene functions, hidden causal importance, knowledge-state implications, setup/payoff potential, thematic leverage, contradictions affecting other files, or strong author interest. Codex may automatically shorten or group a review when the entity has little source material, duplicates another entity's function, has no meaningful book improvement, contains only flavor, or can be represented safely as a subsection of another owner file.

Treat author statements such as "go deeper," "flesh this person out," "let's think more about this," "keep this brief," "defer this," or "group these together" as direct depth instructions without creating a new formal approval gate.

Do not assume a detailed profile requires a major independent subplot.

## No Automatic Entity Explosion

A detailed review must not automatically create full independent reviews for every newly mentioned person, object, place, habit, or historical event.

When a review reveals a possible new entity, classify it as:

- independently useful
- better grouped under an existing entity
- candidate only
- deferred
- genuinely blocking and requiring a new review

Create a new queued entity only when it has enough narrative, structural, or continuity value to justify separate ownership. Do not create an exhaustive family tree, object inventory, geography catalog, or terminology catalog unless the book or outline benefits from it.

## Information Layers

Use existing accepted and candidate files rather than creating a large new directory hierarchy. Each sufficiently developed entity should distinguish three layers when useful.

### Canon Core

Canon core contains facts that other files may rely upon as accepted truth: identity, current role, accepted history, abilities and limitations, relationships, organization membership, chronology, current knowledge, accepted future direction, and stable goals or behavioral patterns when explicitly approved. Canon core receives the strongest dependency and consistency treatment.

### Developmental Profile

Developmental profile contains author-approved interpretive material that helps with outlining and later prose but should not be treated exactly like immutable physical fact. Examples include psychological formulation, internal contradictions, likely responses under pressure, social dynamics, biased perceptions, narrative functions, thematic relevance, what another POV character misunderstands, possible forms of growth, and scene-use guidance.

Clearly label developmental or interpretive guidance. Do not propagate a developmental interpretation through the repository as though it were a hard historical fact.

### Candidate and Flavor Bank

Candidate and flavor bank material includes possibilities, alternatives, optional texture, scene seeds, habits, hobbies, anecdotes, jokes, visual details, dialogue seeds, and unresolved backstory. These belong primarily in `planning/candidates/`. They remain available for later outlining and prose without creating strong consistency obligations. Do not promote them merely because they are attractive or detailed.

## Consequence-Weighted Consistency

Not every detail should trigger the same amount of repository work. Codex should classify accepted material by consequence without requiring the author to classify each detail manually, but the current over-checking mode requires a cautious bias.

### Structural

Structural material affects plot events, chronology, current versus future event status, character identity, motive, knowledge state, relationship state, organization membership or hierarchy, magic mechanics, abilities and limitations, object mechanics, location constraints, setup/payoff, theme or motif when it affects a chapter goal, and information revealed or concealed from the reader.

For structural material, run immediate impact scans, check direct dependent files, update unambiguous dependents, queue uncertain ripple effects, mark affected entities `needs-revisit` when appropriate, and do not wait for the next block if the conflict could mislead ongoing work.

### Continuity

Continuity material affects appearance, voice, recurring habits, occupation, stable behavior, social role, ordinary personal history, repeated interpersonal dynamic, repeated scene function, competence, common possessions, or stable social presentation.

For continuity material, update the owning entity, check direct references when practical, queue anything that may affect later chapter summaries or prose, and include it in the next block-level consistency review.

### Flavor

Flavor is optional texture with no current causal consequence.

For flavor material, preserve it in the candidate/flavor bank when it may help later prose or characterization. Do not discard interesting material merely because it is not canon. Do not perform broad dependency propagation unless the flavor becomes structurally or continuity relevant.

## Periodic Consistency Against Prior Documents

Every major phase and every meaningful block of work should include consistency checks against prior accepted documents. Codex should periodically re-check earlier files for conflicts created by later decisions.

This applies to story-bible entity blocks, major character blocks, organization blocks, magic-system blocks, location blocks, object blocks, culture/worldbuilding blocks, chapter architecture batches, current-draft chapter summary batches, future/unwritten sequence batches, whole-book outline milestones, and prose work if opened later.

At each block-level checkpoint, check:

- new approved material against earlier approved files
- earlier approved files against newer decisions
- candidate files for material that should now be promoted, rejected, or marked obsolete
- consistency queue items related to the block
- affected decision records and indexes
- affected chapter/future-outline files once they exist
- current versus future status
- known renamed terms
- unresolved contradiction markers
- setup/payoff obligations
- character knowledge states
- magic and ability constraints
- chronology and location feasibility
- whether later changes make earlier chapter goals invalid

Do not rewrite historical review packets or old decision records merely to match newer canon. When older accepted files are stale, update them if the fix is straightforward and already approved in substance. Otherwise mark the relevant entity or file `needs-revisit`, add a concise consistency-queue item, and link to the decision or later change that caused the issue.

## Chapter Architecture Pass

The Chapter Architecture Pass is a formal future stage after the initial story-bible pass is complete enough, the final story-bible consistency review has been run, manuscript chapter files or stable current-draft source IDs exist, and the author explicitly opens the outline phase. It occurs after the current-draft chapter map and before detailed scene-by-scene next-draft outlining.

Its purpose is to treat each chapter, future chapter, or major sequence as a story unit before detailing scenes. The core question is: "What is this chapter or sequence supposed to accomplish for the book?"

Do not collapse the Chapter Architecture Pass into the detailed outline. Do not skip it unless the author explicitly says to.

Chapter Goal Cards should eventually live under paths such as:

- `chapter-architecture/current-draft/d1-ch-XX.md`
- `chapter-architecture/next-draft/d2-ch-XX.md`
- `chapter-architecture/future/future-seq-XXX.md`

Do not create Chapter Goal Cards before the outline phase is explicitly opened.

## Prose Preservation Notes

Prose Preservation Notes are future chapter/outline artifacts for tracking wording-level preservation intent. They are not the same as the Chapter Goal Card section `Strong existing material to preserve`.

- Strong existing material means preserve the scene function, beat, image, dynamic, turn, dialogue role, or structural value.
- Prose Preservation Notes mean the wording-level material itself may be worth preserving, near-quoting, adapting, echoing, or deliberately avoiding.

Create Prose Preservation Notes later during current-draft chapter mapping, scene-level review, Chapter Goal Cards, feedback import, detailed outline work, or authorized prose preparation. Do not create them during the current story-bible entity phase unless the author has explicitly identified a specific prose-preservation issue.

Preservation levels are:

- `function-only`
- `beat-level-reuse`
- `image-or-metaphor-reuse`
- `dialogue-near-quote`
- `exact-or-near-exact-prose`
- `do-not-reuse-prose`
- `needs-author-decision`

Preservation statuses are:

- `candidate`
- `approved-for-reuse`
- `approved-near-quote`
- `approved-exact-quote`
- `used-in-outline`
- `used-in-prose`
- `rejected`
- `superseded`
- `needs-author-decision`

Candidate preservation notes do not approve exact or near-exact reuse. Exact or near-exact reuse requires author approval unless the author explicitly marks it that way in feedback or notes.

When the phase opens, store records under a future `prose-preservation/` directory, with an index and chapter-level files such as `prose-preservation/current-draft/d1-ch-01.md`. Do not create those files now.

Prose Preservation Notes should avoid copying large passages. Store stable ID, source draft ID, source file path, chapter ID, scene ID if available, line range if available, heading if available, a short excerpt only when exact wording matters, preservation level, reason, intended next-draft use, status, related Chapter Goal Card or future sequence if known, related feedback/comment ID if any, and related decision ID if author-approved. The manuscript remains the canonical source for the full text.

Detailed next-draft outlines may reference preservation IDs, for example `near-quote dialogue from pp-d1-ch27-004` or `do not reuse current wording from pp-d1-ch08-003`, without duplicating manuscript passages.

## Story-Bible Complete-Enough Gate

The initial story-bible phase is complete enough to move into chapter/scene outline work when every entity in the approved initial inventory has one of these statuses:

- `approved`
- `deferred` by author
- `superseded`

Also require:

- every entity needed for the outline is marked outline-ready or outline-ready with documented uncertainties
- any `needs-revisit` item that would materially affect the outline has been resolved or explicitly deferred by the author
- block-level consistency and opportunity reviews have been run for completed entity categories
- no known unresolved issue prevents understanding the book's causal structure
- remaining uncertainties are preserved as candidates, queue items, or explicit deferred issues
- cross-file links and dependencies validate
- the final story-bible consistency report has been reviewed
- the working tree is clean
- the active branch is synchronized according to repository policy
- the author approves opening the outline phase

This does not mean the story bible is frozen forever.

During later chapter/scene outline work:

- blocking discoveries can reopen or create story-bible items
- nonblocking discoveries should be queued without interrupting the chapter review
- a later change should trigger impact scans and consistency queue items rather than silently contradicting earlier material

`Complete` means the current known story-bible inventory has been reviewed. It does not mean the story bible can never gain a new item later.

Do not open chapter work automatically after the last entity. First present a concise story-bible completion report containing:

- approved entities
- deliberately deferred entities
- unresolved but explicitly accepted uncertainties
- remaining consistency risks
- validator results
- recommended outline-readiness status

Then wait for clear author approval to open chapter work. Do not require an exact phrase, but the authorization must clearly approve moving from story-bible review into chapter outlining.

## Entity Inventory

After the three source documents have been normalized, create an entity inventory before creating the story bible.

Identify candidate entities such as:

- characters
- organizations and Clades
- locations
- cultures or peoples
- magic systems and abilities
- important objects and artifacts
- technologies
- historical events
- narrative threads
- terminology requiring a dedicated reference

Assign stable IDs, such as:

- `char-maya`
- `char-davian`
- `char-niall`
- `org-rezin`
- `org-archeon`
- `loc-rezin-citadel`
- `magic-shroud`
- `magic-subversion`
- `object-seraph-heart`
- `thread-maya-davian-romance`

Do not assume every detected name deserves its own file. Group trivial or incidental entities when appropriate, but report the proposed grouping.

Create the inventory and proposed review order only. Do not write accepted canon during inventory. After creating the inventory, show it to the author and stop.

Default review order:

1. Principal characters
2. Major organizations
3. Core magic systems
4. Important locations
5. Major objects
6. Cultures and world systems
7. Secondary characters
8. Narrative threads and remaining entities

## One-Entity-at-a-Time Review Loop

The author should review substantive content decisions, not routine repository mechanics. Use one meaningful author checkpoint per entity or other review unit.

When a review packet reaches a checkpoint, print a useful summary and the concrete author questions in the Codex conversation/terminal. The final thing printed before waiting for author input must be the concrete numbered questions, so the author can audit and answer them without scrolling past later status text. The author should not have to open the packet file unless they want provenance detail, full audit context, or have significant concerns.

Do not stop merely because an entity has been opened, a source-gathering stub exists, or a routine checkpoint has been reached. If Codex is going to wait for author input, the repository must already contain a specific author-review packet, approval packet, or phase-gate packet with the information the author needs to respond. The exception is a major phase checkpoint that explicitly requires author signoff before new work can begin.

If the author leaves and returns, they should have a concrete packet to review rather than needing to ask Codex to generate one.

For ordinary entity reviews, Codex should normally present no more than 3-5 substantive author questions. Exceptions are allowed for foundational systems or broad retcons, such as core magic systems, major character identity or arc changes, organization-wide structural changes, broad chronology or cosmology decisions, and contradictions affecting multiple approved files.

For ordinary reviews, prefer this hierarchy:

1. Identify the entity.
2. Resolve the most important conflict.
3. Decide what is accepted now versus candidate/deferred.
4. Resolve one consequential relationship, ability, or future-plan issue if needed.
5. Queue the rest.

Do not ask the author about every potentially interesting detail. If a detail can safely be preserved as candidate material without blocking the outline, do that.

Optional development prompts may be shown separately from required decisions. Label them clearly as `Required decisions` and `Optional deeper exploration`. The author should be able to answer required questions quickly without being forced to resolve every interesting possibility. If the author begins brainstorming an optional issue, engage with it and preserve useful results.

Do not require separate authorization for starting the next queued entity, applying already-approved entity content, creating previously proposed durable files, updating `ENTITY_INDEX.md`, `PROJECT_STATE.md`, `MIGRATION_STATUS.md`, `CONSISTENCY_QUEUE.md`, decision indexes, running validation, running a due consistency review, or making the local Git commit associated with approved work.

Do not merge, tag, delete source or archival material, install dependencies, rewrite Git history, force-push, or modify manuscript prose without separate explicit permission.

Approved entity work is committed locally after substantive approval. After each successful approved-entity commit, push the current branch automatically. If the remote has diverged, stop and report. Do not push uncommitted work.

Branch policy:

- Story-bible, outline, review, decision, feedback-processing, consistency-report, and other text/documentation updates may go directly to `main` after validation so reader-facing app data can stay current.
- App/interface changes, scripts that affect publishing behavior, automation, and operational changes that need beta testing should continue on `beta` or a feature branch until tested.
- Never force-push.
- If a text/documentation batch is developed on `beta`, it may be merged or fast-forwarded to `main` after validation when no app/operational changes are mixed in.
- Do not commit directly to `main` for app/interface or operational changes unless the author explicitly asks for that specific change to go there.

Unapproved review-packet commits are optional, not automatic. While the author is actively present in the same Codex session, keep an unapproved review packet in the working tree until the author checkpoint. After approval, commit the approved entity normally. Do not create a separate unapproved packet commit unless durability actually matters.

Create and push an unapproved checkpoint only when the session is ending, the author is switching computers or threads, context compaction or interruption is likely, the packet required substantial source-gathering and would be costly to recreate, or the author explicitly requests a checkpoint.

Checkpoint commits must be clearly labeled, for example `review: checkpoint Spire location packet` or `review: prepare Spire location packet`. They must not create accepted bible files or mark the entity approved.

## Control File Ownership

- `ENTITY_INDEX.md` is the sole authority for entity ID, entity type, queue order, entity status, review packet path, accepted file path, candidate file path, and last-reviewed date.
- `PROJECT_STATE.md` contains immediate operational handoff information only: current branch, current phase, current block, active or paused entity ID, last completed action, exact next action, files needed for the immediate task, expected working-tree cleanliness, remote sync state, consistency-review due state, and unresolved blockers requiring author input.
- `MIGRATION_STATUS.md` contains phase-level progress and phase gates only.
- `CONSISTENCY_QUEUE.md` contains unresolved cross-file consistency matters only. It is the default holding area for direct contradictions, possible contradictions, stale accepted records, later changes that may affect earlier files, unclear ownership, unresolved note disposition, setup/payoff gaps, character knowledge problems, current/future event confusion, outline dependencies, missing story-bible entities discovered later, chapter goal conflicts, scene function duplication, continuity drift, prose-preservation orphaning or conflicts, and worldbuilding implications not yet reviewed. During future outline work, it also owns blocking and nonblocking outline discoveries that affect multiple files, including setup/payoff, chronology, knowledge-state, ability conflicts, and prose-preservation issues.
- `REVISION_WORKFLOW.md` owns the detailed future chapter, scene, future-sequence, and next-draft-outline process after the story-bible completion gate opens.
- `decisions/index.md` indexes explicit author decisions only.

Do not repeat the full approved or queued entity list outside `ENTITY_INDEX.md`.

Do not embed a literal hash for the same commit that contains `PROJECT_STATE.md`; use stable wording such as `latest relevant commit: HEAD` and report actual hashes from Git commands.

## Information Lifecycle and Routing

Every substantive statement considered during review must be classified as one of:

- `present-canon`: true in the story's current world state at the latest manuscript cutoff
- `backstory-canon`: accepted event or fact that occurred before the current manuscript state
- `accepted-future-plan`: author-approved event, arc, revelation, or intended change that has not yet occurred in the manuscript
- `candidate`: possibility, alternative, "what if," unresolved idea, or proposal that has not been accepted
- `contradiction`: incompatible versions requiring later resolution
- `historical-record`: review packet, old decision, source import, feedback item, or other record that should remain unchanged even when later canon supersedes it

Routing policy:

- `present-canon` and `backstory-canon` belong primarily in `bible/`.
- `accepted-future-plan` belongs primarily in `outline/`, `revision/`, or an accepted plot/thread file.
- `candidate` belongs in `planning/candidates/`.
- `contradiction` belongs in the review packet and, when cross-file, `CONSISTENCY_QUEUE.md`.
- `historical-record` remains where it is and is not rewritten to match newer decisions.

A current intention may be `present-canon` while its eventual execution is an `accepted-future-plan`. Accepted bible files may link to accepted future-plan files, but should not duplicate the entire future plot sequence.

### Step 1: Begin One Entity

After the prior entity has been approved and committed, automatically select the next queued entity from `ENTITY_INDEX.md` unless:

- the author explicitly requests a different entity
- the queue is unclear
- the working tree contains unexpected changes
- a blocker requires author input

Update:

- its status to `in-review`
- `PROJECT_STATE.md` with the entity ID
- `PROJECT_STATE.md` with the source files that must be examined

Do not begin a second entity.

Do not ask the author for permission merely to begin the next queued entity.

### Step 2: Gather Source-Backed Material

Search all relevant available sources, including:

- normalized manuscript
- normalized Book 1 outline
- normalized Bullet notes
- chapter manuscript files, when available
- chapter outlines
- revision files
- planning candidates
- feedback
- previously approved entity files
- decision records

Gather information into categories:

1. Explicitly present in manuscript prose
2. Explicitly stated in outline or planning
3. Present only in Bullet notes
4. Present only in comments or feedback
5. Already accepted through a decision
6. Speculative language or alternatives
7. Contradictions
8. Possible obsolete material
9. Important omissions or unanswered questions

Preserve provenance for every substantive claim. Provenance should normally include:

- source file
- relevant heading or chapter
- note ID when available
- comment ID when available
- enough context to relocate the source

Do not claim that a summarized statement is a direct quotation. Use short quotations only when exact wording matters.

### Step 3: Create a Review Packet

Create a review packet under a suitable path, for example:

- `reviews/entities/characters/char-maya.md`
- `reviews/entities/organizations/org-rezin.md`
- `reviews/entities/magic/magic-shroud.md`

Do not force every section into every packet. For deep and standard reviews, include relevant sections from this adaptive structure:

- `Review depth`: `deep`, `standard`, `brief`, `grouped`, or `deferred`, with a concise reason.
- `Why this entity matters`: actual or potential value to the book.
- `Source-backed information`: manuscript-established, planning-established, bullet notes, feedback, existing decisions, contradictions, candidates, and historical/obsolete material.
- `Current narrative functions`: plot, emotional, relationship, exposition, observer/witness, thematic, comic-relief, clue/misdirection, or social-world function.
- `Relationships and conflicts that create story`: dynamics that may generate scenes, decisions, misunderstandings, tension, or change.
- `Potential outline or scene uses`: credible uses without treating them as accepted future events.
- `Continuity constraints`: what later chapters and prose must not contradict.
- `Questions that could materially improve the book`: high-leverage author questions.
- `Details worth preserving but not resolving`: candidate/flavor routing.
- `What does not need to be defined now`: attractive but currently low-value areas.
- `Proposed canon core`: concise accepted proposal.
- `Proposed developmental profile`: clearly labeled interpretive guidance.
- `Proposed candidate/flavor bank`: unresolved or optional material.
- `Book improvements unlocked by this review`: concrete value produced.
- `Outline readiness`: `outline-ready`, `outline-ready with documented uncertainties`, `not outline-ready because of a blocking issue`, or `deferred`.
- `Proposed file changes`: exact destinations.

Newly created or next-touched review and accepted files should include metadata when practical:

```yaml
review_depth: deep|standard|brief|grouped|deferred
outline_ready: yes|yes-with-uncertainties|no|deferred
```

Do not retroactively rewrite every approved file merely to add these fields. Add them when a file is next substantively touched, a needs-revisit item is resolved, or a block review naturally updates it.

The older packet template below remains acceptable for brief or legacy reviews, but should be adapted to the entity's actual usefulness:

```markdown
---
id: char-maya
entity_type: character
display_name: Maya Rezin
review_status: awaiting-author
source_scope:
  - imports/normalized/melissa-copy.md
  - imports/normalized/book-1-outline.md
  - imports/normalized/bullet-notes.md
last_updated: YYYY-MM-DD
---

# Entity Review: Maya Rezin

## Proposed identity

Basic name, aliases, titles, and classification.

## Manuscript-established information

Only information actually present in the current prose.

Each item must include provenance.

## Planning-established information

Information stated in outlines, revision plans, or arc documents.

Do not automatically label this canon.

## Bullet-note material

Relevant raw or proposed ideas from the note inbox.

## Existing decisions

Links to explicit decision records.

## Existing feedback

Relevant Melissa or other reader feedback.

Feedback is not canon.

## Consistent information

Material that appears stable across relevant sources.

## Contradictions and version conflicts

For each conflict, show:

- version A
- version B
- source of each
- likely consequence
- whether one appears newer
- do not choose a winner without author approval

## Speculative or alternative material

Include "what if," "maybe," "consider," questions, alternatives, and apparently abandoned possibilities.

## Proposed accepted record

Codex's proposed concise version of what should be stored as accepted.

Clearly label it as a proposal.

Divide proposed accepted material into:

- `present-canon`
- `backstory-canon`
- `accepted-future-plan`

## Proposed planning or arc record

Material that belongs in an outline, revision file, or accepted plot/thread file rather than the story bible. Classify it as `accepted-future-plan` only when the author has already approved it; otherwise classify it as `candidate`.

## Proposed candidate record

Material that should remain speculative.

## Contradictions to preserve

Material that should remain unresolved in the review packet and, when cross-file, `CONSISTENCY_QUEUE.md`.

## Questions for the author

Ask only concrete questions that affect storage or interpretation.

Prefer grouped choices such as:

1. Accept version A
2. Accept version B
3. Retain both as unresolved
4. Supply a different version

## Proposed file changes

List the exact files Codex would create or modify after approval.
```

An entity is ready for the future outline when the repository can answer, at the depth appropriate to that entity:

- Who or what is it?
- What does it want or do?
- How does it behave or function under relevant conditions?
- What is it capable of?
- What are its important limitations?
- What does it know at important points, when applicable?
- How does it relate to major characters, organizations, places, objects, and systems?
- What narrative jobs can it perform?
- What must future chapters not contradict?
- What remains intentionally unresolved?

The entity does not need a fully simulated life or exhaustive history.

### Step 4: Present the Review

Show the author a useful summary of the review packet in the Codex conversation. Do not merely say the packet exists.

Present:

- proposed accepted information
- important contradictions
- speculative or deferred material worth preserving
- concrete questions requiring author judgment
- proposed file destinations

Then stop only if the questions require real author judgment before the current entity can be finalized.

When real author judgment is needed, set the entity status to `awaiting-author`. Do not write proposed facts into accepted bible files yet, and do not move to another entity until the author answers. Do this only after the packet contains the proposed material, source-backed summary, and concrete author questions needed for the author to respond.

If the review packet does not contain real author questions and only records routine source-gathering status, durable checkpoint state, or unambiguous dependent updates, do not stop at the checkpoint. Continue directly to the next queued entity once validation, commit, push, and handoff state are complete.

Avoid presenting routine provenance detail in the conversation when it is already preserved in the review packet.

### Step 5: Incorporate Author Feedback

When the author provides feedback:

1. Restate the concrete decisions understood.
2. Update the review packet.
3. Preserve rejected alternatives in planning/candidates when they may remain useful, unless the author explicitly instructs deletion.
4. Create decision records for important choices.
5. Show any remaining substantive ambiguity.
6. Stop again only if further author judgment is needed.

Do not require an exact approval phrase. Treat clear statements such as "looks good," "approved," "go ahead," "that works," "commit it," "continue," "yes, use that," or "add that to the file" as approval when all substantive questions have been resolved.

When the author gives corrections and then says something equivalent to "looks good," treat that as approval of the corrected entity. Do not force the author to repeat approval using a special formula.

Do not ask the author to approve decision-record wording separately unless the wording changes the substance of the decision.

If genuine substantive ambiguity remains, ask only about that ambiguity.

### Step 6: Store Approved Information Concretely

After substantive approval, automatically write accepted information into the appropriate durable files.

Examples:

- `bible/characters/char-maya.md`
- `bible/organizations/org-rezin.md`
- `bible/magic/magic-shroud.md`
- `bible/locations/loc-rezin-citadel.md`
- `outline/arcs/maya.md`
- `planning/candidates/characters/char-maya.md`
- `decisions/NNNN-short-decision-name.md`

Do not force all material into one file.

Use this division:

- `bible/`: accepted world or character information
- `outline/`: planned narrative structure and arcs
- `revision/`: proposed or accepted changes to existing prose
- `planning/candidates/`: retained speculation and alternatives
- `decisions/`: explicit author decisions and rationale
- `feedback/`: reader feedback
- `reviews/entities/`: review evidence and audit trail

During this same finalization pass, run the Level 1 lightweight consistency check described below and include straightforward dependent updates in the same commit.

An accepted entity file should begin with metadata such as:

```yaml
---
id: char-maya
entity_type: character
display_name: Maya Rezin
status: approved
last_reviewed: YYYY-MM-DD
review_packet: reviews/entities/characters/char-maya.md
---
```

Accepted entity files must:

- contain only approved material
- distinguish current manuscript state from intended future state when they differ
- link to relevant arcs, decisions, and candidate files
- avoid duplicating large passages from other files
- contain enough context for Codex to use them later
- preserve provenance for facts where provenance is important

For characters, consider sections such as:

- Identity and titles
- Physical description
- Background
- Personality and psychological patterns
- Motivations and values
- Abilities
- Important relationships
- Current manuscript state
- Intended arc links
- Knowledge and secrets
- Canonical uncertainties
- Related files
- Provenance

Use only relevant sections. Do not create empty boilerplate sections.

For organizations, consider:

- Identity
- Leadership
- Membership
- Goals
- Resources
- Internal structure
- Beliefs or culture
- Relationships and conflicts
- Current manuscript state
- Intended changes
- Related files
- Provenance

Adapt the structure for other entity types.

### Step 7: Finish the Entity

After storing approved information:

1. Set the entity status to `approved` in `ENTITY_INDEX.md`.
2. Add links to the review packet, accepted file, candidate file if one exists, and relevant decision records.
3. Run Level 1 lightweight consistency checks.
4. Automatically update straightforward dependent summaries, links, metadata, and references.
5. Record non-straightforward dependent issues in `CONSISTENCY_QUEUE.md` and mark relevant entities `needs-revisit` when appropriate.
6. Update `PROJECT_STATE.md`.
7. Identify the next queued entity or whether a block-level consistency review is due.
8. Run relevant validation.
9. Inspect the staged file list and stop if any unexpected file is staged.
10. Commit the approved entity locally using an appropriate commit message.
11. Push the current branch normally without force. If the remote has diverged, stop and report.
12. Leave the working tree clean.
13. Run any due block-level consistency review automatically before preparing the next queued entity.
14. If the next entity reaches a checkpoint with real author questions, print a reasonable terminal summary of the proposed accepted information and important conflicts, then print the concrete numbered questions as the final output before waiting so the author can answer without opening the packet file.
15. Continue directly through routine checkpoints that do not require real author judgment.
16. Stop only when the next entity review or block-level consistency checkpoint has substantive author questions, or when another documented exception requires author input.

Prefer one approved entity per commit, unless the author explicitly authorizes a small related batch.

Suggested commit messages:

- `bible: approve Maya character record`
- `bible: approve Rezin organization record`
- `bible: approve Shroud magic record`

After finalizing an entity, report concisely:

- entity approved and committed
- commit hash
- important files created or changed
- any deferred issue
- which entity is now being reviewed

Do not narrate every Git command or every routine control-file update unless something unexpected occurs.

## Cross-File Consistency

Use a hybrid consistency model. The goal is to keep accepted files coherent without adding routine author approval burden.

### Level 1: Lightweight Check After Each Approved Change

During automatic finalization for an approved entity or other approved review unit:

1. Identify the primary owner file for each changed fact.
2. Search for direct dependent accepted files and links.
3. Automatically update straightforward dependent summaries, links, metadata, and references in the same commit.
4. Do not ask for separate author approval for routine dependent updates.
5. Do not modify manuscript prose through this process.
6. Do not rewrite historical review packets, old decisions, archival imports, or feedback.

Straightforward dependent updates include:

- fixing or adding links to newly created accepted files, candidate files, decisions, or arc files
- updating metadata fields such as `last_reviewed`, `related_files`, `review_packet`, or `candidate_file`
- updating concise summaries that merely reflect an already-approved fact without changing meaning
- correcting stale entity IDs, file paths, or indexes

When a dependent change is not straightforward:

- do not guess
- record it in `CONSISTENCY_QUEUE.md`
- mark the relevant entity `needs-revisit` in `ENTITY_INDEX.md` when appropriate
- continue the normal workflow unless the unresolved conflict makes the current approved record unsafe

`CONSISTENCY_QUEUE.md` is a system-managed root file. The author should not normally need to edit it. Use this compact table:

```markdown
| ID | Triggering change | Affected entity/file | Issue | Severity | Status | Blocking | Review stage |
|---|---|---|---|---|---|---|---|
```

Allowed severity:

- `link-only`
- `minor-summary`
- `possible-conflict`
- `direct-contradiction`
- `broad-retcon`

Allowed status:

- `pending-block-review`
- `resolved-automatically`
- `needs-author-decision`
- `deferred`
- `resolved`

Allowed blocking values:

- `yes`
- `no`
- `unknown`

Allowed review stage values:

- `entity-review`
- `block-review`
- `chapter-architecture`
- `current-draft-map`
- `future-outline`
- `next-draft-outline`
- `prose-phase`
- `whole-book-review`

Do not fill the queue with trivial nonissues or every relationship. Add items that may require later checking or judgment. When unsure whether something meaningful matters, queue it.

### Block-Level Consistency Review

Run a fuller consistency review automatically at the end of a logical block.

A block-level consistency review becomes due when:

- all principal characters are reviewed
- a major entity category is completed
- work moves from one entity type to another
- five approved entities have accumulated since the last review
- a `broad-retcon` or `direct-contradiction` item affects multiple approved files
- the author says "finish this block," "check consistency," or equivalent

Before beginning the next block:

1. Read all accepted files created or changed in the completed block.
2. Read their direct owner and dependent files.
3. Review pending items in `CONSISTENCY_QUEUE.md`.
4. Check for contradictory accepted facts, duplicated mechanics with divergent wording, ability/magic-rule inconsistencies, organization membership or leadership conflicts, relationship inconsistencies, stale summaries, broken links or entity IDs, decisions not reflected in current accepted files, current/future status confusion, renamed terms, unresolved contradiction markers, setup/payoff obligations, character knowledge states, chronology and location feasibility, and whether later changes make earlier chapter goals invalid once chapter architecture exists.
5. Include a story-opportunity section that asks whether two entities or chapters perform the same narrative function, a useful supporting character disappears without reason, exposition could be delivered through conflict or character competence, a character should witness or complicate an event, a developed trait fails to affect any scene or decision, the block revealed stronger setup/payoff, an underused class/political/cultural/magical contrast exists, a secondary character could make a chapter more specific, a planned chapter is missing character or external movement, a magic or political development needs earlier setup, a minor entity carries more leverage than its current depth suggests, or detailed material imposes obligations without producing story value.
6. Automatically fix purely mechanical, metadata, linkage, routing, or unambiguous issues.
7. Present the author only with substantive unresolved conflicts or creative opportunities as one grouped checkpoint, not many interruptions.

Use one concise author checkpoint for the entire block.

After the author responds:

- apply the approved resolutions
- update dependent files
- update `CONSISTENCY_QUEUE.md` and entity statuses
- validate
- commit locally
- push the current feature branch normally without force
- proceed into the next block automatically

Do not stop merely to ask permission to run dependency searches, update links or metadata, update an unambiguous dependent summary, add an item to `CONSISTENCY_QUEUE.md`, mark an entity `needs-revisit`, run the block review, commit routine approved consistency fixes, push routine approved consistency fixes, or begin the next block after the review is resolved.

Stop for author input only when consistency work requires choosing between conflicting canon versions, making a new creative decision, changing the meaning of an approved entity, a broad retcon, manuscript prose changes, or overwriting manual edits.

### Exceptions Requiring a Separate Stop

Stop and request explicit author approval before:

- modifying manuscript prose
- replacing or deleting manually edited prose
- deleting source or archival material
- resolving a major contradiction the author has not addressed
- making a broad retcon across multiple approved entities
- committing changes outside the approved review scope
- force-pushing or pushing a diverged branch
- merging branches
- tagging a release or milestone
- rewriting Git history
- installing dependencies
- performing destructive operations

## Manual-Edit Protection

- Files on disk are authoritative after the author manually edits them.
- Codex must reload changed files before further work.
- Codex must never restore removed language merely because it appeared in an earlier generated draft.
- Codex must show manuscript diffs before any authorized manuscript application.
- Before consistency work, reload affected files from disk, inspect Git changes, preserve author edits, and never use consistency propagation as authorization to alter manuscript prose.

## Desired Interaction Rhythm

The normal rhythm is:

1. Codex presents an entity review.
2. The author answers questions, corrects details, or approves.
3. Codex applies approved content, validates, commits, and presents the next entity review.

Extra turns should occur only when there is a genuine unresolved creative or canonical decision.

## Handoff

Before ending a substantial work session, update `PROJECT_STATE.md` with:

- exact phase
- exact entity
- last completed action
- whether author feedback is pending
- exact next action
- relevant file paths
- known blockers
- whether changes are committed
- latest relevant commit if available

Do not put essential state only in the conversation.

## Branch and Milestone Policy

After a logical block:

1. Run the block consistency review.
2. Resolve substantive author decisions.
3. Validate.
4. Commit.
5. Push normally without force.
6. Open or update a pull request into `main`.
7. Do not merge without explicit author approval.

Do not rename or merge the current branch unless explicitly authorized.

After `migration/drive-baseline` is eventually merged, the recommended next branch should reflect the next work block, for example `bible/core-magic-review`.
