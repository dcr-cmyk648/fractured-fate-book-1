# fractured-fate-book-1

Repository for the Book 1 migration, source import, normalization, review, and durable story-reference files.

## Governing Objective

The primary long-term product of this repository is a robust, detailed, internally consistent path to the next complete draft.

The story bible is simultaneously a source of truth, a creative-development workspace, and a context engine for the future outline and later prose work. Minimum sufficient canon is the floor; narrative usefulness determines the ceiling. The repository should explore freely, canonize selectively, and audit in proportion to consequence.

Current audit mode is over-checking: check more rather than less when an issue could affect plot, character, continuity, world logic, magic, chronology, emotional arc, setup/payoff, or the future outline. Queue meaningful uncertainty instead of silently assuming it away.

Intended sequence:

1. Complete story-bible review.
2. Run final story-bible consistency and dependency review.
3. Create the current-draft chapter map.
4. Track prose-preservation intent where wording-level reuse or avoidance may matter.
5. Pull and process web-app comments, route tickets, and run consistency/validation when current mapping catches up.
6. Build alpha-continuation architecture for the unwritten remainder of Book 1.
7. Draft remaining alpha chapters only after explicit author authorization.
8. After the alpha draft is complete, return to the beginning for beta-draft Chapter Architecture / Chapter Goal Cards, whole-book re-outline, and rewrite.
9. Run whole-book structural and consistency review before and during the beta pass as needed.

If the author later changes the goal back to outline-only, producing an excellent outline remains a successful outcome. The current path is alpha completion first, then beta redrafting.

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
- `feedback/` contains reader feedback and source-intake workflows. `feedback/webapp/` is the durable inbox, archive, normalization, synthesis, and ticket silo for exported static-review-app comments. `feedback/source-intake/` stores proposed tickets and summaries from non-definitive supplemental source documents.
- `docs/` contains the static read-only review app. In Author Mode, its Author Scratchpad captures quick content and technical notes as comment-like inbox records for later export and processing.
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
