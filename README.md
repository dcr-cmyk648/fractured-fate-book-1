# fractured-fate-book-1

Repository for the Book 1 migration, source import, normalization, review, and durable story-reference files.

## Governing Objective

The primary long-term product of this repository is a robust, detailed, internally consistent next-draft outline.

The story bible is simultaneously a source of truth, a creative-development workspace, and a context engine for the future outline and later prose work. Minimum sufficient canon is the floor; narrative usefulness determines the ceiling. The repository should explore freely, canonize selectively, and audit in proportion to consequence.

Current audit mode is over-checking: check more rather than less when an issue could affect plot, character, continuity, world logic, magic, chronology, emotional arc, setup/payoff, or the future outline. Queue meaningful uncertainty instead of silently assuming it away.

Intended sequence:

1. Complete story-bible review.
2. Run final story-bible consistency and dependency review.
3. Create the current-draft chapter map.
4. Track prose-preservation intent where wording-level reuse or avoidance may matter.
5. Create and review Chapter Architecture / Chapter Goal Cards.
6. Run whole-book architecture review.
7. Build a detailed next-draft outline.
8. Build the gap-to-ending future/unwritten sequence outline.
9. Run whole-book structural and consistency review.
10. Open prose work only later, by explicit author authorization.

If the repository only produces an excellent outline and never generates prose, that is still a successful outcome.

## Structure

- `imports/raw/` contains untouched archival DOCX exports from Google Docs.
- `imports/normalized/` will contain later normalized text exports when that phase is authorized.
- `reviews/entities/` will contain source-backed one-entity-at-a-time review packets.
- `bible/` will contain approved world, character, organization, location, magic, object, and terminology records.
- `chapter-architecture/` will contain future Chapter Goal Cards after the outline phase opens.
- `outline/` will contain planned narrative structure and arcs.
- `revision/` will contain proposed or accepted prose-change plans.
- `prose-preservation/` will later track wording-level preservation intent after chapter mapping opens.
- `planning/candidates/` will retain speculation, alternatives, and unresolved possibilities.
- `feedback/` contains reader feedback workflows. `feedback/webapp/` is the durable inbox, archive, normalization, synthesis, and ticket silo for exported static-review-app comments.
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
- [feedback/webapp/README.md](feedback/webapp/README.md) defines how exported web-app comments are imported, archived, normalized, synthesized, and routed.

## Resuming Work

A new Codex session should read [AGENTS.md](AGENTS.md) first, then follow the startup procedure there. The operational resume point is always [PROJECT_STATE.md](PROJECT_STATE.md); do not rely on prior conversation history as durable project memory.

## Validation

Run the deterministic project-state validator with:

```sh
python3 scripts/validate_project_state.py
```
