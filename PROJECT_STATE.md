# Project State

Last updated: 2026-06-24

## Repository state

- Current branch: beta
- Current migration phase: Phase 4 entity-by-entity review; repository stabilization checkpoint complete
- Current block: core-magic-systems
- Active or paused entity ID: none
- Latest completed entity: loc-rezin-citadel
- Latest relevant commit: HEAD
- Latest relevant commit message: `bible: approve Rezin citadel location`
- Working tree expected to be clean: yes
- Remote synchronized: yes

## Block status

- Current block: core-magic-systems
- Block scope: core magic-system records beginning with Shroud
- Approved entities since last consistency review: magic-subversion, magic-fateweaving-skein, magic-zan-lattices, magic-antithesis, magic-codex-memory
- Last consistency review: reports/consistency/2026-06-24-ink-and-systems-block.md
- Consistency review due: no
- Remote synchronized: yes

## Last completed work

The `loc-rezin-citadel` entity was approved by the author. Durable files now record the Rezin citadel as a massive fortress-city complex, with the Registry below ground, Treasury high up, no elevators, contractors allowed to leave under search/Registry monitoring, old tunnels and Elric's chamber in the ancient layer, and the Rezin central spire distinct from the separate Presentation Spire.

## Current work

Finalizing `loc-rezin-citadel` approval. No entity is active until the approved Rezin citadel commit is validated, committed, and pushed.

## Next action

Validate the approved Rezin citadel changes, inspect the staged file list, commit, push, and then begin preparing the next queued entity, `loc-registry`.

## Awaiting author input

- None for `loc-rezin-citadel`; author approval was received on 2026-06-24.

## Known blockers or risks

- Comments have only been confirmed in `imports/raw/melissa-copy.docx`; `book-1-outline.docx` and `bullet-notes.docx` do not contain `word/comments.xml`.
- Local branch should remain synchronized with `origin/beta` during ongoing work.
- Niall's Heart/silver conduit/charge mechanics are not yet reviewed; see `CONSISTENCY_QUEUE.md`.
- Detailed Alara history belongs to later `char-alara` and `event-alara-death-war-memory` reviews.
- Kelyra's hereditary kinesis/Subversion terminology, future Shroud manifestation scene, Lirien spelling, and Lethira parentage need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Elric's Harbinger/Syndicate takeover, Ink Pact possession, fate-strand sight, Heart exposure, codex/aura persistence, and reality-fracture mechanics need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Harvick's prototypical Ink Pact, returning-weapon technology, and lightning revival mechanics need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Selwin's Dissolution, Shroud inability, crossbreed/heritage implications, final-series role, and Niall/Alara postpartum blame mechanics need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Jalen/Kelyra Concord role swap, Kelyra's Trial of Dominion fight, obsolete Jalen magic/leadership notes, and Concord chronology need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Alden is the prior name/gender version of Aldira from earlier drafting; old Alden references are suspect and need later reconciliation; see `CONSISTENCY_QUEUE.md`.
- Archeon's true kinesis/Ink/Shroud/martial/technology power stack, release-and-catch system, Low-to-High-Clade rise, and Elric/Serathis collaboration need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Drakhal's Evana/Caius/Vorren relationships, Kelyra/Vorren breeding-contract deal, High Clade political trap, and exact force-magic terminology need later consistency review; see `CONSISTENCY_QUEUE.md`.
- The Central Spire / central amphitheater blast-hole direction and remaining High Clade names/magic labels need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Antithesis transformation is no longer canon; later object/revision work must keep Antithesis as a knife and resolve the inside-citadel concealment helper note; see `CONSISTENCY_QUEUE.md`.
- Ink Pact healing is limited to deeper Pact cases; later character reviews must keep Davian/Karra/Vorren distinct from Kelyra; see `CONSISTENCY_QUEUE.md`.
- Kinesis/Shroud interaction, tremorsense/kinetic sensitivity, Archeon force-parting/diffusion candidates, and exact Antithesis/Zirene object mechanics remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.
- Elric's fate-sight source, Davian resurrection mechanics/cost, Heart/Ink/Skein mechanics, and exact Fateweaving/Convergence relationship remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.
- Exact Elric codex-bridge presence, Ink/codex persistence, Niall codex use, Harvick possible codex, and Alara-journal object history remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.
- Exact Rezin citadel map, Registry/Treasury access routes, old tunnel network, and Presentation Spire terminology remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.
- Zä number-system details, `Nizän` / `nïza`, archetypal zä, Skein-layer zä, exact Heart/Registry/Treasury power path, exact Zirene/Archeon/Antithesis device mechanics, and the Antithesis-to-Paradox object transition remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.

## Files to read for current task

- AGENTS.md
- README.md
- PROJECT_STATE.md
- WORKFLOW.md
- REVISION_WORKFLOW.md
- CONSISTENCY_QUEUE.md
- ENTITY_INDEX.md
- MIGRATION_STATUS.md
- decisions/index.md
- AUTHORING.md
- reviews/entities/magic/magic-zan-lattices.md
- reviews/entities/magic/magic-antithesis.md
- bible/magic/magic-antithesis.md
- planning/candidates/magic/magic-antithesis.md
- bible/organizations/org-archeon.md
- bible/magic/magic-ink-boons.md
- bible/magic/magic-subversion.md
- bible/magic/magic-zan-lattices.md
- outline/arcs/thread-elric-reality-skein.md
- decisions/0019-ink-pact-terminology-and-core-mechanics.md
- decisions/0020-kinesis-terminology-and-mechanics.md
- decisions/0022-zan-terminology-and-lattice-principles.md
- decisions/0023-antithesis-boundary-and-paradox-future-plan.md
- reviews/entities/magic/magic-codex-memory.md
- bible/magic/magic-codex-memory.md
- planning/candidates/magic/magic-codex-memory.md
- decisions/0024-auratic-codex-memory-mechanics.md
- reviews/entities/locations/loc-rezin-citadel.md
- bible/locations/loc-rezin-citadel.md
- planning/candidates/locations/loc-rezin-citadel.md
- decisions/0025-rezin-citadel-location-boundaries.md

## Later branch recommendation

Use `beta` as the ongoing working branch below GitHub `main`. When a block is ready, merge to `main` through a pull request; do not merge without explicit author approval.
