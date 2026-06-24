# Core Entity Consistency Review

Date: 2026-06-24

Block: `core-characters-and-major-organizations`

Scope:

- Approved character records through `char-jalen`
- Approved organization records through `org-high-clades`, with `org-drakhal` specifically included
- Related decision records through `decisions/0014-high-clades-governance-and-central-amphitheater.md`
- Direct accepted-file links
- Pending items in `CONSISTENCY_QUEUE.md`
- Entities currently marked `needs-revisit`
- Directly affected outline and candidate files

Excluded:

- `reviews/entities/organizations/org-harbingers-syndicate.md` is an unapproved checkpoint packet and was not used for canon conclusions.
- `imports/raw/` and `imports/normalized/` were not modified.
- Manuscript prose was not reviewed for rewrite or modified.

## Summary

The approved core files are broadly consistent. The major unresolved problems are already correctly represented as `needs-revisit` entities or `CONSISTENCY_QUEUE.md` items:

- Kelyra/Jalen Concord role swap
- Alden/Aldira name and gender change
- Ink/Shroud/Subversion/Archeon dependency mechanics
- Elric/Harbingers/Syndicate takeover mechanics
- Central Spire / Central Amphitheater location revision
- remaining High Clade names and old magic labels

No substantive canon choice was resolved automatically.

## Findings

| ID | Issue | Classification | Action |
|---|---|---|---|
| CR-001 | `thread-niall-grief-recovery`, `thread-davian-identity-guilt`, `thread-elric-reality-skein`, and `thread-kelyra-archeon-recovery` were marked `needs-revisit` in `ENTITY_INDEX.md`, but their review packet paths did not exist. | fixed-automatically | Added explicit placeholder review packets. They do not create canon; they only make the recorded paths durable until full thread review. |
| CR-002 | `PROJECT_STATE.md` stored a literal commit hash and repeated entity/status information better owned by `ENTITY_INDEX.md`. | fixed-automatically | Rewrote `PROJECT_STATE.md` as concise operational state with block tracking and `latest relevant commit: HEAD`. |
| CR-003 | `MIGRATION_STATUS.md` repeated detailed entity status. | fixed-automatically | Reduced Phase 4 to phase-level progress and moved detailed queue authority back to `ENTITY_INDEX.md`. |
| CR-004 | Accepted future-plan material appears in bible files for Elric, Davian, Niall, Maya, Kelyra, Harvick, Archeon, Drakhal, and High Clades. | still-consistent | The future material is concise, linked, and generally marked as intended arc, exact execution, or canonical uncertainty. It does not duplicate full future plot sequences. Later files should use the new lifecycle categories more explicitly. |
| CR-005 | Davian's Heart theft agency and Elric's manipulation could conflict if either is overstated. | still-consistent | `char-davian` preserves Davian's agency; `char-elric` stores Elric as hidden manipulator. Both currently coexist without erasing Davian's choice. |
| CR-006 | Niall killing retreating enemies could be framed morally inconsistently across future files. | deferred-to-entity-review | `char-niall` already uses neutral event language. `CQ-0002` remains sufficient for later mercenary / battle ethics review. |
| CR-007 | Kelyra/Jalen role swap conflicts with older manuscript and outline references to Jalen's seat, magic, leadership, and Trial of Dominion role. | deferred-to-entity-review | `char-jalen`, `char-kelyra`, `decisions/0010`, `CQ-0013`, and `CQ-0014` already flag this. No additional automatic fix is safe. |
| CR-008 | Alden is the older name/gender version of Aldira, while source and older review material still contain Alden references. | deferred-to-entity-review | `org-rezin`, `ENTITY_INDEX.md`, and `CQ-0015` already flag this. No manuscript or historical review packet edits were made. |
| CR-009 | Archeon power stack, Kelyra Subversion terminology, Davian inherited ability, and Shroud/Ink mechanics overlap across several files. | deferred-to-entity-review | `org-archeon`, `char-kelyra`, `char-davian`, and `CQ-0004`/`CQ-0016` defer exact mechanics to magic and technology reviews. |
| CR-010 | Elric's Harbinger/Syndicate takeover is accepted in `char-elric`, but organization history and Ink possession mechanics remain unreviewed. | deferred-to-entity-review | `CQ-0006` remains sufficient. The unapproved Harbingers/Syndicate packet is checkpointed but excluded from canon conclusions. |
| CR-011 | Drakhal/Vorren/Archeon/Harbingers coordination affects multiple approved files but is not fully settled. | deferred-to-entity-review | `org-drakhal`, `org-archeon`, `CQ-0018`, and the paused Harbingers/Syndicate packet preserve the issue. No accepted expansion was made. |
| CR-012 | Central Spire is now accepted as a historical term for a central amphitheater built into a blast hole, but current normalized manuscript uses older Spire imagery. | deferred-to-entity-review | `org-high-clades` and `CQ-0019` defer the prose/location cleanup to `loc-spire` and later manuscript revision. |
| CR-013 | Nyctaris, Cryndor, and Lyranth are canonical High Clades but not yet reviewed. | deferred-to-entity-review | `org-high-clades` names them and `CQ-0020` queues later review. No separate entity rows were created in this pass. |
| CR-014 | Some pending queue items are broad-retcon or direct-contradiction severity and affect multiple files. | needs-author-decision later | They remain queued because resolving them would require creative or mechanics decisions. No automatic resolution was attempted. |
| CR-015 | Old review packets, source imports, decisions, and feedback may contain superseded facts. | historical-record-no-change | Historical records were not rewritten. Superseding decisions are recorded in accepted files, decisions, and queue items. |

## Automatic Fixes Made

- Added placeholder review packets for four `needs-revisit` thread entities:
  - `reviews/entities/threads/thread-niall-grief-recovery.md`
  - `reviews/entities/threads/thread-davian-identity-guilt.md`
  - `reviews/entities/threads/thread-elric-reality-skein.md`
  - `reviews/entities/threads/thread-kelyra-archeon-recovery.md`
- Simplified `PROJECT_STATE.md` ownership and added block tracking.
- Reduced `MIGRATION_STATUS.md` entity duplication.
- Added workflow rules for lifecycle classification, control-file ownership, validator use, and remote sync.

## Entities Marked Needs-Revisit

Existing `needs-revisit` statuses remain appropriate:

- `char-kelyra`
- `thread-niall-grief-recovery`
- `thread-davian-identity-guilt`
- `thread-elric-reality-skein`
- `thread-kelyra-archeon-recovery`

No additional accepted entity was marked `needs-revisit` by this review.

## Substantive Issues Requiring Later Author Decision

- Exact Jalen/Kelyra Concord chronology and how older Jalen-seat references should be rewritten.
- Exact Ink Pact / Ink Boon mechanics, possession mechanics, depletion, transfer, and control.
- Exact Subversion / Archeon kinesis / Shroud interaction.
- Exact Drakhal / Vorren / Harbingers / Archeon coordination.
- Whether Central Spire remains common terminology in dialogue/narration after the amphitheater/blast-hole revision.
- Leadership, powers, and political roles for Nyctaris, Cryndor, and Lyranth.

## Validation

Run:

```sh
python3 scripts/validate_project_state.py
```

Validator result before this report was written: pass.
