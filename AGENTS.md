# AGENTS.md

Permanent operating instructions for Codex in this repository.

## Durable Memory

The repository files, not the current Codex conversation, are the durable memory of the project. Anything needed to resume work must be stored in repository files and linked from `README.md`, `PROJECT_STATE.md`, `ENTITY_INDEX.md`, `WORKFLOW.md`, `MIGRATION_STATUS.md`, or `decisions/index.md`.

Never rely on statements such as "as discussed earlier" unless the discussion was concretely recorded in the repository.

## Startup Procedure

Before doing book work, Codex must:

1. Read `AGENTS.md`.
2. Read `README.md`.
3. Read `PROJECT_STATE.md`.
4. Read `WORKFLOW.md`.
5. Read `ENTITY_INDEX.md`.
6. Read `MIGRATION_STATUS.md` if migration is not complete.
7. Read the files listed under "Files to read for current task" in `PROJECT_STATE.md`.
8. Run `pwd`.
9. Run `git status --short --branch`.
10. Compare the actual Git state with `PROJECT_STATE.md`.
11. Report any discrepancy before modifying files.
12. State the current phase, current entity, and the one task it intends to perform.
13. Do not broaden the task without author permission.

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
- Do not require exact approval phrases. Treat clear statements such as "looks good," "approved," "go ahead," "that works," "commit it," "continue," "yes, use that," or "add that to the file" as approval when substantive questions have been resolved.
- Do not interpret casual agreement as final entity approval when meaningful questions remain. Ask only about the remaining substantive ambiguity.
- After substantive approval, automatically apply the already-approved entity content, create the previously proposed durable files, update indexes and project-state files, run validation, inspect the staged file list, commit the approved entity locally, and begin preparing the next queued entity.
- After an approved entity has been committed, automatically begin the next queued entity unless the author requests a different entity, the queue is unclear, the working tree contains unexpected changes, or a blocker requires author input.
- Do not ask for separate authorization for routine repository mechanics such as updating `ENTITY_INDEX.md`, `PROJECT_STATE.md`, `MIGRATION_STATUS.md`, decision indexes, validation, or the local commit associated with approved work.
- Do not push, merge, tag, delete source material, install dependencies, rewrite Git history, or modify manuscript prose without separate explicit permission.

Codex must distinguish:

- accepted facts
- manuscript facts
- planned material
- speculative ideas
- contradictions
- reader feedback

Feedback is not canon. Planning material is not automatically canon. Speculation and alternatives must remain clearly labeled.

## Authoring Rules

For outlining, scene work, prose drafting, revision, and critique, Codex must follow `AUTHORING.md`.

- The author remains the primary author and controls plot, character decisions, scene purpose, POV, pacing, canon, and whether prose should be drafted at all.
- Prose generation is opt-in. Codex may draft or polish prose only when the author clearly requests it, such as "draft this," "write this section," "turn these beats into prose," "rewrite this passage," or "polish this."
- When prose is requested from detailed beats or an existing passage, Codex must stay within the supplied material, preserve the requested POV and scene boundary, and stop where the author's material stops.
- Requests to outline, review, analyze, organize, continue planning, or work on a chapter do not by themselves authorize prose drafting.
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
