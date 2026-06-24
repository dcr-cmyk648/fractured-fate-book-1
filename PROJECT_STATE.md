# Project State

Last updated: 2026-06-24

## Repository state

- Current branch: migration/drive-baseline
- Current migration phase: Phase 4 entity-by-entity review; repository stabilization checkpoint
- Current block: core-characters-and-major-organizations
- Active or paused entity ID: org-harbingers-syndicate
- Latest completed entity: org-high-clades
- Latest relevant commit: HEAD
- Latest relevant commit message: `review: checkpoint org-harbingers-syndicate packet`
- Working tree expected to be clean: no
- Remote synchronized: no

## Block status

- Current block: core-characters-and-major-organizations
- Block scope: approved core character records through Jalen and major organization records through High Clades; Harbingers/Syndicate packet is unapproved and paused
- Approved entities since last consistency review: char-harvick, char-selwin, char-jalen, org-rezin, org-archeon, org-drakhal, org-high-clades
- Last consistency review: first entity consistency checkpoint after Elric (`chore: record first entity consistency checkpoint`)
- Consistency review due: yes
- Remote synchronized: no

## Last completed work

The `org-high-clades` entity was approved by the author, stored, validated, and committed. The unapproved `org-harbingers-syndicate` review packet was checkpointed for durability without creating accepted canon.

## Current work

Repository stabilization checkpoint. Entity queue progression is paused.

## Next action

Finish stabilization: update workflow/control instructions, add and run the deterministic validator, run the first core-entity consistency review, commit, push the feature branch, and create a draft pull request if available.

## Awaiting author input

- Deferred until after stabilization: answer the targeted questions in `reviews/entities/organizations/org-harbingers-syndicate.md`.

## Known blockers or risks

- Comments have only been confirmed in `imports/raw/melissa-copy.docx`; `book-1-outline.docx` and `bullet-notes.docx` do not contain `word/comments.xml`.
- Local branch is ahead of `origin/migration/drive-baseline`; push is authorized during this checkpoint after the working tree is clean and validated.
- Niall's Heart/silver conduit/charge mechanics are not yet reviewed; see `CONSISTENCY_QUEUE.md`.
- Detailed Alara history belongs to later `char-alara` and `event-alara-death-war-memory` reviews.
- Kelyra's hereditary kinesis/Subversion terminology, trauma-blocked Shroud mechanics, Lirien spelling, and Lethira parentage need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Elric's Harbinger/Syndicate takeover, Ink Pact possession, fate-strand sight, Heart exposure, codex/aura persistence, and reality-fracture mechanics need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Harvick's prototypical Ink Pact, returning-weapon technology, and lightning revival mechanics need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Selwin's Dissolution, Shroud inability, crossbreed/heritage implications, final-series role, and Niall/Alara postpartum blame mechanics need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Jalen/Kelyra Concord role swap, Kelyra's Trial of Dominion fight, obsolete Jalen magic/leadership notes, and Concord chronology need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Alden is the prior name/gender version of Aldira from earlier drafting; old Alden references are suspect and need later reconciliation; see `CONSISTENCY_QUEUE.md`.
- Archeon's true kinesis/Ink/Shroud/martial/technology power stack, release-and-catch system, Low-to-High-Clade rise, and Elric/Serathis collaboration need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Drakhal's Evana/Caius/Vorren relationships, Kelyra/Vorren breeding-contract deal, High Clade political trap, and exact force-magic terminology need later consistency review; see `CONSISTENCY_QUEUE.md`.
- The Central Spire / central amphitheater blast-hole direction and remaining High Clade names/magic labels need later consistency review; see `CONSISTENCY_QUEUE.md`.

## Files to read for current task

- AGENTS.md
- README.md
- PROJECT_STATE.md
- WORKFLOW.md
- CONSISTENCY_QUEUE.md
- ENTITY_INDEX.md
- MIGRATION_STATUS.md
- decisions/index.md
- AUTHORING.md
- bible/characters/char-maya.md
- planning/candidates/characters/char-maya.md
- revision/prologue/maya-shroud-attack.md
- decisions/0001-maya-naeroth-heritage-and-appearance.md
- decisions/0002-naeroth-demi-human-worldbuilding.md
- decisions/0003-maya-shroud-and-prologue-revision-direction.md
- reviews/entities/characters/char-davian.md
- bible/characters/char-davian.md
- planning/candidates/characters/char-davian.md
- outline/arcs/thread-davian-identity-guilt.md
- decisions/0004-davian-heart-theft-agency-and-arc.md
- reviews/entities/characters/char-niall.md
- bible/characters/char-niall.md
- planning/candidates/characters/char-niall.md
- outline/arcs/thread-niall-grief-recovery.md
- decisions/0005-niall-grief-arc-and-lightning-conduits.md
- reviews/entities/characters/char-kelyra.md
- bible/characters/char-kelyra.md
- planning/candidates/characters/char-kelyra.md
- outline/arcs/thread-kelyra-archeon-recovery.md
- decisions/0006-kelyra-archeon-lineage-shroud-and-family.md
- reviews/entities/characters/char-elric.md
- bible/characters/char-elric.md
- planning/candidates/characters/char-elric.md
- outline/arcs/thread-elric-reality-skein.md
- decisions/0007-elric-rezin-remnant-and-reality-skein-role.md
- reviews/entities/characters/char-harvick.md
- bible/characters/char-harvick.md
- planning/candidates/characters/char-harvick.md
- decisions/0008-harvick-elric-ink-and-mentorship.md
- reviews/entities/organizations/org-rezin.md
- reviews/entities/organizations/org-archeon.md
- reviews/entities/organizations/org-drakhal.md
- reviews/entities/organizations/org-high-clades.md
- reviews/entities/organizations/org-harbingers-syndicate.md
- bible/organizations/org-rezin.md
- bible/organizations/org-archeon.md
- bible/organizations/org-drakhal.md
- bible/organizations/org-high-clades.md
- decisions/0011-rezin-clade-family-and-household-structure.md
- decisions/0012-archeon-high-clade-rise-and-training-system.md
- decisions/0013-drakhal-political-strategy-and-vorren-affiliation.md
- decisions/0014-high-clades-governance-and-central-amphitheater.md
