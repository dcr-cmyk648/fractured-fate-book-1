# Project State

Last updated: 2026-06-25

## Repository state

- Current branch: beta
- Current migration phase: Phase 4 entity-by-entity review; repository stabilization checkpoint complete
- Current block: important-locations
- Active or paused entity ID: loc-concord-manor
- Latest completed entity: loc-spire
- Latest relevant commit: HEAD
- Latest relevant commit message: `review: prepare Concord manor location packet`
- Working tree expected to be clean: yes
- Remote synchronized: yes

## Block status

- Current block: important-locations
- Block scope: important location records beginning with Rezin citadel sublocations
- Approved entities since last consistency review: magic-subversion, magic-fateweaving-skein, magic-zan-lattices, magic-antithesis, magic-codex-memory
- Last consistency review: reports/consistency/2026-06-24-ink-and-systems-block.md
- Consistency review due: no
- Remote synchronized: yes

## Last completed work

The author approved `loc-spire` on 2026-06-25. Durable files now record the Spire / Central Spire as the shared High Clade Presentation and central meeting location at the center of the Six Cities. It is an open-air amphitheater or arena built into the old High Clade war blast hole, not an intact tower. In-world characters commonly call it the Spire or Central Spire; `Presentation Spire` can be casual descriptive speech but is not official. The old rubble/remnants have been removed, Maya's Presentation happens in the open-air version, there are six High Clade citadels, and the Spire is one of the few places where the High Clades truly collaborate. The approval was committed and pushed.

## Current work

The `loc-concord-manor` review packet has been expanded into a source-backed author checkpoint and is awaiting author input. It gathers the Concord manor / hideout / abandoned-house material, proposes treating them as the same primary compound, and separates physical-location questions from Concord leadership and chronology issues.

## Next action

Present the `loc-concord-manor` checkpoint questions to the author. After substantive approval, create the accepted Concord manor durable files, update direct dependents, validate, commit, push, and then begin the next queued entity, `loc-archeon`.

## Awaiting author input

- `loc-concord-manor`: author needs to answer the checkpoint questions in `reviews/entities/locations/loc-concord-manor.md`, especially whether manor/hideout/abandoned house are the same compound, whether it is both family base and Concord operational base, and how to classify later compromise/damage.

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
- Antithesis transformation is no longer canon; later object/revision work must keep Antithesis as a knife and resolve the inside-citadel concealment helper note; see `CONSISTENCY_QUEUE.md`.
- Ink Pact healing is limited to deeper Pact cases; later character reviews must keep Davian/Karra/Vorren distinct from Kelyra; see `CONSISTENCY_QUEUE.md`.
- Kinesis/Shroud interaction, tremorsense/kinetic sensitivity, Archeon force-parting/diffusion candidates, and exact Antithesis/Zirene object mechanics remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.
- Elric's fate-sight source, Davian resurrection mechanics/cost, Heart/Ink/Skein mechanics, and exact Fateweaving/Convergence relationship remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.
- Exact Elric codex-bridge presence, Ink/codex persistence, Niall codex use, Harvick possible codex, and Alara-journal object history remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.
- Exact Rezin citadel map, Registry/Treasury access routes, old tunnel network, Registry map visual implementation, active-mode discharge geometry, exact Treasury sealed-entrance visual, and Spire amphitheater staging/approach remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.
- Zä number-system details, `Nizän` / `nïza`, archetypal zä, Skein-layer zä, exact Tzorrax Heart/Sphere object mechanics, exact Heart/Registry/Treasury power path beyond the accepted Treasury weightlessness function, exact Zirene/Archeon/Antithesis device mechanics, and the Antithesis-to-Paradox object transition remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.

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
