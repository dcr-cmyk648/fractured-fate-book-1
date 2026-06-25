# AGENTS.md

Permanent operating instructions for Codex in this repository.

## Durable Memory

The repository files, not the current Codex conversation, are the durable memory of the project. Anything needed to resume work must be stored in repository files and linked from `README.md`, `PROJECT_STATE.md`, `ENTITY_INDEX.md`, `WORKFLOW.md`, `CONSISTENCY_QUEUE.md`, `MIGRATION_STATUS.md`, or `decisions/index.md`.

Never rely on statements such as "as discussed earlier" unless the discussion was concretely recorded in the repository.

## Startup Procedure

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

## Migration Safeguards

- Do not build a Google Drive importer unless explicitly authorized.
- Do not convert DOCX files to Markdown until the normalization phase is explicitly authorized.
- Do not edit, rewrite, reorganize, split, or normalize document content during raw import.
- Do not install packages unless explicitly authorized.
- Do not commit unless the author has explicitly authorized the work or the streamlined entity workflow in `WORKFLOW.md` authorizes an automatic local commit after substantive approval.
- Treat files in `imports/raw/` as untouched archival source material.
- Keep Phase 0 and all phase gates in `MIGRATION_STATUS.md` intact.
- Do not advance beyond the currently authorized migration phase.

## Entity Review Rules

- Work on only one entity at a time unless the author explicitly authorizes a batch.
- There must normally be no more than one entity marked `in-review` in `ENTITY_INDEX.md`.
- Do not start reviewing entities until the normalized source documents exist and the author authorizes the inventory/review phase.
- Do not create accepted canon during inventory.
- Use one meaningful author checkpoint per entity or other review unit. The author should review substantive content decisions, not routine repository mechanics.
- When a review packet reaches a checkpoint, print a useful summary and the concrete author questions in the Codex conversation/terminal. Do not require the author to open the packet file unless they want provenance detail, full audit context, or have significant concerns.
- Do not require exact approval phrases. Treat clear statements such as "looks good," "approved," "go ahead," "that works," "commit it," "continue," "yes, use that," or "add that to the file" as approval when substantive questions have been resolved.
- Do not interpret casual agreement as final entity approval when meaningful questions remain. Ask only about the remaining substantive ambiguity.
- After substantive approval, automatically apply the already-approved entity content, create the previously proposed durable files, update indexes and project-state files, run validation, inspect the staged file list, commit the approved entity locally, and begin preparing the next queued entity.
- After an approved entity has been committed, automatically begin the next queued entity unless the author requests a different entity, the queue is unclear, the working tree contains unexpected changes, or a blocker requires author input.
- When finishing or checkpointing an entity, continue directly to the next queued entity whenever no real author decision is needed for the current entity. Do not stop merely because a routine checkpoint, source-gathering checkpoint, or durability checkpoint was reached.
- Do not ask for separate authorization for routine repository mechanics such as updating `ENTITY_INDEX.md`, `PROJECT_STATE.md`, `MIGRATION_STATUS.md`, decision indexes, validation, or the local commit associated with approved work.
- Do not push, merge, tag, delete source material, install dependencies, rewrite Git history, or modify manuscript prose without separate explicit permission.
- During automatic finalization after substantive approval, run lightweight cross-file consistency checks as described in `WORKFLOW.md`.
- Automatically update straightforward dependent summaries, links, metadata, and references in the same commit when they do not change the meaning of approved content.
- Do not modify manuscript prose, archival imports, feedback, historical review packets, or old decisions as part of consistency propagation.
- Record non-straightforward dependent issues in `CONSISTENCY_QUEUE.md` and mark affected entities `needs-revisit` in `ENTITY_INDEX.md` when appropriate.
- Do not add routine author checkpoints for dependency searches, unambiguous dependent updates, queue entries, `needs-revisit` marking, validation, local commits, or block-level consistency review.
- Stop for author input only when consistency work requires choosing between conflicting canon versions, making a new creative decision, changing the meaning of an approved entity, a broad retcon, manuscript prose changes, or overwriting manual edits.

## Story-Bible-First Gate

The project must proceed story-bible first. Do not begin chapter review, chapter outlining, scene review, future-sequence outlining, or next-draft outline construction while the initial story-bible inventory remains incomplete.

Required order:

1. Complete the story-bible review phase.
2. Run a full story-bible consistency and dependency review.
3. Receive author approval to open the outline phase.
4. Map and review the current prose chapter by chapter and, when needed, scene by scene.
5. Build the next-draft outline, including unwritten future chapters.
6. Complete whole-book structural and consistency reviews.
7. Open prose work only after explicit later authorization under `AUTHORING.md`.

The initial story-bible phase is complete only when every entity in approved project scope is `approved`, `deferred` by author, or `superseded`. Before chapter work opens, there should normally be no entity marked `discovered`, `queued`, `in-review`, `awaiting-author`, or `needs-revisit`; any exception must be explicitly documented and approved by the author.

Before opening outline/chapter work, all direct contradictions and broad retcons affecting approved records must be resolved or explicitly deferred, all completed entity blocks must have passed consistency review, cross-file links and dependencies must validate, the final story-bible consistency report must be reviewed, the working tree must be clean, and the active branch must be synchronized according to repository policy.

Do not open chapter work automatically after the last entity. Present a concise story-bible completion report and wait for clear author approval to move from story-bible review into chapter outlining.

Codex must distinguish:

- `present-canon`: true in the story's current world state at the latest manuscript cutoff
- `backstory-canon`: accepted event or fact that occurred before the current manuscript state
- `accepted-future-plan`: author-approved event, arc, revelation, or intended change that has not yet occurred in the manuscript
- `candidate`: possibility, alternative, "what if," unresolved idea, or proposal that has not been accepted
- `contradiction`: incompatible versions requiring later resolution
- `historical-record`: review packets, old decisions, source imports, feedback, or other records that remain unchanged even when later canon supersedes them

Feedback is not canon. Planning material is not automatically canon. Speculation and alternatives must remain clearly labeled.

Route material by lifecycle:

- `present-canon` and `backstory-canon` belong primarily in `bible/`.
- `accepted-future-plan` belongs primarily in `outline/`, `revision/`, or an accepted plot/thread file.
- `candidate` belongs in `planning/candidates/`.
- `contradiction` belongs in the review packet and, when cross-file, `CONSISTENCY_QUEUE.md`.
- `historical-record` remains where it is and is not rewritten to match newer decisions.

A current intention may be `present-canon` while its eventual execution is an `accepted-future-plan`. Accepted bible files may link to accepted future-plan files, but should not duplicate the entire future plot sequence.

## Control File Ownership

- `ENTITY_INDEX.md` is the sole authority for entity ID, type, queue order, status, review packet path, accepted file path, candidate file path, and last-reviewed date.
- `PROJECT_STATE.md` contains immediate operational handoff only: branch, phase, block, active or paused entity ID, last completed action, exact next action, files needed for the immediate task, expected working-tree cleanliness, remote sync state, consistency-review due state, and blockers requiring author input.
- `MIGRATION_STATUS.md` contains phase-level progress and phase gates only. Do not duplicate detailed entity queue state there.
- `CONSISTENCY_QUEUE.md` contains unresolved cross-file consistency matters only. During future outline work, it also owns blocking and nonblocking outline discoveries that affect multiple files, including setup/payoff, chronology, knowledge-state, and ability conflicts; add columns as needed for triggering chapter/scene/sequence, blocking yes/no, paused review unit, and resolution status.
- `REVISION_WORKFLOW.md` owns the detailed future chapter, scene, future-sequence, and next-draft-outline process. It remains gated until the story bible is complete and the author opens outline work.
- `decisions/index.md` indexes explicit author decisions only.
- Do not embed a literal hash for the same commit that contains `PROJECT_STATE.md`; use stable wording such as `latest relevant commit: HEAD` and report actual hashes from Git commands.

## Consistency Rules

Use a hybrid consistency model:

- Level 1: after each approved change, identify the primary owner file for each changed fact, search direct dependent accepted files and links, and update straightforward dependent summaries, links, metadata, and references in the same commit.
- Level 2: at the end of each logical block, run a fuller consistency review before beginning the next block.
- Logical blocks normally end when all principal characters are reviewed, a major entity category is completed, work moves from one entity type to another, five approved entities have accumulated since the last review, or the author asks to finish/check the block.
- Maintain `CONSISTENCY_QUEUE.md` as a compact system-managed queue for issues that may require later checking or judgment.
- Do not fill `CONSISTENCY_QUEUE.md` with every relationship; add only items that may require consistency review, conflict resolution, or dependent-file updates.
- Manual-edit protection applies to all consistency work: reload affected files from disk, inspect Git changes, preserve author edits, and never restore removed text from earlier generated drafts.

Block-level consistency review becomes due when five entities have been approved since the last review, work changes to a different major entity category, a `broad-retcon` or `direct-contradiction` item affects multiple approved files, the author requests a consistency review, or the current logical block is complete.

## GitHub Sync Rules

- Approved entity work is committed locally after substantive approval.
- After each successful approved-entity commit, push the current feature branch automatically.
- Never force-push.
- If the remote has diverged, stop and report rather than resolving automatically.
- Do not push uncommitted work.
- A review packet may receive a clearly labeled checkpoint commit when necessary for cross-computer durability, but it must remain unapproved.
- `main` must never receive automatic direct commits from Codex.

## Authoring Rules

For authoring collaboration style, scene work, prose drafting, revision, and critique, Codex must follow `AUTHORING.md`. For future chapter, scene, future-sequence, and next-draft outline workflow after the story-bible gate opens, Codex must follow `REVISION_WORKFLOW.md`.

- The author remains the primary author and controls plot, character decisions, scene purpose, POV, pacing, canon, and whether prose should be drafted at all.
- Prose generation is opt-in. Codex may draft or polish prose only when the author clearly requests it, such as "draft this," "write this section," "turn these beats into prose," "rewrite this passage," or "polish this."
- When prose is requested from detailed beats or an existing passage, Codex must stay within the supplied material, preserve the requested POV and scene boundary, and stop where the author's material stops.
- Requests to outline, review, analyze, organize, continue planning, or work on a chapter do not by themselves authorize prose drafting.
- Requests to outline, review, analyze, organize, continue planning, or work on a chapter also do not bypass the story-bible-first gate.
- Unless the author explicitly says to edit files directly, Codex must preview new or revised prose in the conversation before applying it to manuscript files.
- Historical writing-thread transcripts are evidence of collaboration style only. They are not authoritative canon sources and must not be imported into the bible, manuscript, outline, or decisions merely because they appeared there.

## Required Session Handoff

Before ending a substantial work session, Codex must update `PROJECT_STATE.md` so another session can resume. The handoff must record:

- exact phase
- exact entity
- last completed action
- whether author feedback is pending
- exact next action
- relevant file paths
- known blockers
- whether changes are committed
- latest relevant commit if available

Codex must update persistent project-state files before ending a work session when it has changed workflow state, entity state, phase state, or review artifacts.

If work is interrupted during an entity review:

- leave the entity marked `in-review` or `awaiting-author` as appropriate
- preserve the partial review packet
- record the resume point in `PROJECT_STATE.md`
- do not mark the entity approved

## Manual-Edit Protection

- Files on disk are authoritative after the author manually edits them.
- Codex must reload changed files before further work.
- Codex must never restore removed language merely because it appeared in an earlier generated draft.
- Codex must show manuscript diffs before any authorized manuscript application.
