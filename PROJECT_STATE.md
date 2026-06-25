# Project State

Last updated: 2026-06-25

## Repository state

- Current branch: beta
- Current migration phase: Phase 4 entity-by-entity review; repository stabilization checkpoint complete
- Current block: major-objects
- Active or paused entity ID: none
- Latest completed entity: object-haloes
- Latest relevant commit: HEAD
- Latest relevant commit message: `bible: approve Alara journal object`
- Working tree expected to be clean: no; approved `object-haloes` changes are being finalized
- Remote synchronized: yes

## Block status

- Current block: major-objects
- Block scope: important object records beginning with the Heart / Seraph Heart
- Approved entities since last consistency review: 1
- Last consistency review: reports/consistency/2026-06-25-major-objects-block.md
- Consistency review due: no
- Remote synchronized: yes

## Last completed work

`object-haloes` was approved by the author. Haloes are the main coin currency: coins with a precious-metal center, cheaper-metal halo, center zan marking value from 1 to 6, and activatable authenticity check. Values are base 6: 6 copper = 1 silver, 6 silver = 1 gold; a 6-gold Moon equals 36 silver / one 36-day month of normal low-level wages. Minting is controlled by an unspecified High Clade other than Archeon, Drakhal, or Rezin, with Low Clade proxy day-to-day management.

## Current work

`object-haloes` approval is being finalized. Accepted object, candidate, and decision files have been drafted, direct dependencies updated, and validation/commit/push remain.

## Next action

Validate approved `object-haloes` changes, inspect the staged file list, commit and push. Then open the next queued entity, `culture-clade-hierarchy`, unless author direction changes.

## Awaiting author input

- None.

## Workflow policy note

- Unapproved review-packet commits are optional, not automatic. While the author is actively present in the same Codex session, keep an unapproved review packet in the working tree until the author checkpoint. Create and push an unapproved checkpoint only when durability matters: session ending, author switching computers or threads, likely context compaction/interruption, costly source-gathering, or explicit author request. Checkpoints must not create accepted bible files or mark an entity approved.

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
- The Spire / central amphitheater blast-hole direction is approved, but exact map/staging/revision details and remaining High Clade names/magic labels need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Antithesis transformation is no longer canon; later revision work must keep Antithesis as a dagger and preserve Alra's accepted concealment role; see `CONSISTENCY_QUEUE.md`.
- Ink Pact healing is limited to deeper Pact cases; later character reviews must keep Davian/Karra/Vorren distinct from Kelyra; see `CONSISTENCY_QUEUE.md`.
- Kinesis/Shroud interaction, tremorsense/kinetic sensitivity, Archeon force-parting/diffusion candidates, and exact low-level Antithesis/Zirene device circuitry remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.
- Elric's fate-sight source is now accepted as at least partly Heart-exposure linked; remaining source mix, Davian resurrection mechanics/cost, Heart/Ink/Skein mechanics, and exact Fateweaving/Convergence relationship remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.
- Exact Elric codex-bridge presence, Ink/codex persistence, Niall codex use, Harvick codex implications, and Alara-journal object history remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.
- Exact Rezin citadel map, Registry/Treasury access routes, old tunnel network, Registry map visual implementation, active-mode discharge geometry, exact Treasury sealed-entrance visual, and Spire amphitheater staging/approach remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.
- Zä number-system details, `Nizän` / `nïza`, archetypal zä, Skein-layer zä, exact Heart/Registry/Treasury power path beyond the accepted Treasury weightlessness function, exact Zirene/Archeon device mechanics, and the exact Paradox forging scene remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.
- Project-wide `zan` singular / `za` plural versus current `zä` / `zän` terminology needs later author decision before broad replacement; see `CONSISTENCY_QUEUE.md`.

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
- reviews/entities/objects/object-haloes.md
- reviews/entities/locations/loc-rezin-citadel.md
- bible/locations/loc-rezin-citadel.md
- planning/candidates/locations/loc-rezin-citadel.md
- decisions/0025-rezin-citadel-location-boundaries.md
- reviews/entities/locations/loc-registry.md
- bible/locations/loc-registry.md
- planning/candidates/locations/loc-registry.md
- decisions/0026-registry-chamber-placement-and-interface.md
- reviews/entities/locations/loc-treasury.md
- bible/locations/loc-treasury.md
- planning/candidates/locations/loc-treasury.md
- decisions/0027-treasury-placement-and-containment-function.md
- reviews/entities/locations/loc-spire.md
- bible/locations/loc-spire.md
- planning/candidates/locations/loc-spire.md
- decisions/0028-spire-name-and-central-amphitheater-form.md
- reviews/entities/locations/loc-concord-manor.md
- bible/locations/loc-concord-manor.md
- planning/candidates/locations/loc-concord-manor.md
- decisions/0029-concord-manor-identity-and-collapse.md
- reviews/entities/locations/loc-archeon.md
- bible/locations/loc-archeon.md
- planning/candidates/locations/loc-archeon.md
- decisions/0030-archeon-citadel-subterranean-complex-and-final-tower.md
- reviews/entities/locations/loc-sorevin-redbridge.md
- bible/locations/loc-sorevin-redbridge.md
- planning/candidates/locations/loc-sorevin-redbridge.md
- decisions/0031-sorevin-manor-and-redbridge-candidate.md
- reports/consistency/2026-06-25-important-locations-block-final.md
- reviews/entities/objects/object-seraph-heart.md
- bible/objects/object-seraph-heart.md
- planning/candidates/objects/object-seraph-heart.md
- decisions/0032-heart-name-containment-and-skein-links.md
- reviews/entities/objects/object-antithesis.md
- bible/objects/object-antithesis.md
- decisions/0033-antithesis-dagger-schema-sink-and-concealment.md
- reviews/entities/objects/object-paradox.md
- bible/objects/object-paradox.md
- planning/candidates/objects/object-paradox.md
- decisions/0034-paradox-name-maker-form-and-symbolism.md
- reviews/entities/objects/object-davian-mask.md
- reviews/entities/objects/object-alara-journal.md
- bible/magic/magic-codex-memory.md
- planning/candidates/magic/magic-codex-memory.md
- decisions/0024-auratic-codex-memory-mechanics.md
- bible/characters/char-maya.md
- bible/characters/char-niall.md
- bible/characters/char-elric.md
- bible/magic/magic-fateweaving-skein.md
- bible/locations/loc-rezin-citadel.md
- bible/magic/magic-antithesis.md
- bible/magic/magic-subversion.md
- bible/magic/magic-zan-lattices.md
- bible/characters/char-davian.md
- bible/characters/char-kelyra.md
- bible/locations/loc-treasury.md
- planning/candidates/locations/loc-treasury.md
- bible/locations/loc-registry.md
- bible/objects/object-seraph-heart.md
- planning/candidates/objects/object-seraph-heart.md
- bible/organizations/org-archeon.md
- planning/candidates/organizations/org-archeon.md
- decisions/0012-archeon-high-clade-rise-and-training-system.md
- bible/organizations/org-concord.md
- bible/characters/char-kelyra.md
- bible/characters/char-jalen.md
- planning/candidates/organizations/org-concord.md
- bible/organizations/org-high-clades.md
- planning/candidates/organizations/org-high-clades.md
- decisions/0014-high-clades-governance-and-central-amphitheater.md
- bible/organizations/org-registry.md
- bible/magic/magic-zan-lattices.md
- imports/normalized/melissa-copy.md
- imports/normalized/book-1-outline.md
- imports/normalized/melissa-copy.comments.md

## Later branch recommendation

Use `beta` as the ongoing working branch below GitHub `main`. When a block is ready, merge to `main` through a pull request; do not merge without explicit author approval.
