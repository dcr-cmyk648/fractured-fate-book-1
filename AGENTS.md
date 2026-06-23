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
- Do not commit anything until explicitly authorized.
- Treat files in `imports/raw/` as untouched archival source material.
- Keep Phase 0 and all phase gates in `MIGRATION_STATUS.md` intact.
- Do not advance beyond the currently authorized migration phase.

## Entity Review Rules

- Work on only one entity at a time unless the author explicitly authorizes a batch.
- There must normally be no more than one entity marked `in-review` in `ENTITY_INDEX.md`.
- Do not start reviewing entities until the normalized source documents exist and the author authorizes the inventory/review phase.
- Do not create accepted canon during inventory.
- Do not write proposed facts into accepted bible files until the author approves the entity with `APPROVE ENTITY <entity-id>`.
- Do not interpret casual agreement as final entity approval when meaningful questions remain.
- Do not begin the next entity until the author explicitly says `START NEXT ENTITY` or names a specific entity.

Codex must distinguish:

- accepted facts
- manuscript facts
- planned material
- speculative ideas
- contradictions
- reader feedback

Feedback is not canon. Planning material is not automatically canon. Speculation and alternatives must remain clearly labeled.

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
