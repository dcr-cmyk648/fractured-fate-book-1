# fractured-fate-book-1

Repository for the Book 1 migration, source import, normalization, review, and durable story-reference files.

## Structure

- `imports/raw/` contains untouched archival DOCX exports from Google Docs.
- `imports/normalized/` will contain later normalized text exports when that phase is authorized.
- `reviews/entities/` will contain source-backed one-entity-at-a-time review packets.
- `bible/` will contain approved world, character, organization, location, magic, object, and terminology records.
- `outline/` will contain planned narrative structure and arcs.
- `revision/` will contain proposed or accepted prose-change plans.
- `planning/candidates/` will retain speculation, alternatives, and unresolved possibilities.
- `feedback/` will contain reader feedback when extracted or recorded.
- `decisions/` records explicit author decisions.
- `reports/consistency/` contains block-level consistency-review reports.
- `scripts/` contains repository validation and maintenance scripts.

## Control Files

- [AGENTS.md](AGENTS.md) contains permanent Codex operating rules.
- [PROJECT_STATE.md](PROJECT_STATE.md) is the definitive handoff file for resuming work.
- [ENTITY_INDEX.md](ENTITY_INDEX.md) is the master entity inventory and processing queue.
- [WORKFLOW.md](WORKFLOW.md) defines the persistent migration and entity-review workflow.
- [REVISION_WORKFLOW.md](REVISION_WORKFLOW.md) defines the future chapter, scene, future-sequence, and next-draft outline workflow after the story-bible gate opens.
- [AUTHORING.md](AUTHORING.md) defines the future outlining, prose, revision, and critique collaboration workflow.
- [CONSISTENCY_QUEUE.md](CONSISTENCY_QUEUE.md) tracks cross-file consistency issues that may need later checking or author judgment.
- [MIGRATION_STATUS.md](MIGRATION_STATUS.md) records migration phases and gates.
- [decisions/index.md](decisions/index.md) indexes explicit author decisions.

## Resuming Work

A new Codex session should read [AGENTS.md](AGENTS.md) first, then follow the startup procedure there. The operational resume point is always [PROJECT_STATE.md](PROJECT_STATE.md); do not rely on prior conversation history as durable project memory.

## Validation

Run the deterministic project-state validator with:

```sh
python3 scripts/validate_project_state.py
```
