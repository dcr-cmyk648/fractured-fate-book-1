# Project State

Last updated: 2026-06-27

## Repository state

- Current branch: beta
- Current migration phase: Phase 4 entity-by-entity review; repository stabilization checkpoint complete
- Current block: narrative-threads
- Active or paused entity ID: thread-kelyra-archeon-recovery
- Latest completed entity: thread-demi-human-mercenary-forces
- Latest relevant commit: HEAD
- Latest relevant commit message: `review: prepare demi-human mercenary thread packet`
- Working tree expected to be clean: no; `thread-kelyra-archeon-recovery` review packet is awaiting author review
- Remote synchronized: yes

## Block status

- Current block: narrative-threads
- Block scope: Kelyra Archeon trauma and family-protection arc
- Approved entities since last consistency review: 1
- Last consistency review: reports/consistency/2026-06-27-convergence-magic-block.md
- Consistency review due: no
- Remote synchronized: yes

## Last completed work

The narrative-thread/event block consistency review was run, committed, pushed to `beta`, merged to `main`, and the static app data was regenerated and pushed to `main`. `beta` was fast-forwarded to match `main`.

## Current work

`thread-demi-human-mercenary-forces` was approved, committed, and pushed. `thread-kelyra-archeon-recovery` has been opened with a deep review packet to resolve its needs-revisit status.

## Next action

Resolve the author decisions in `reviews/entities/threads/thread-kelyra-archeon-recovery.md`, then finalize the revised accepted arc record, candidate file, decision record, indexes, validation, commit, push, and automatic progression according to `WORKFLOW.md`.

## Awaiting author input

Awaiting author answers for `thread-kelyra-archeon-recovery`.

## Workflow policy note

- Unapproved review-packet commits are optional, not automatic. While the author is actively present in the same Codex session, keep an unapproved review packet in the working tree until the author checkpoint. Create and push an unapproved checkpoint only when durability matters: session ending, author switching computers or threads, likely context compaction/interruption, costly source-gathering, or explicit author request. Checkpoints must not create accepted bible files or mark the entity approved.
- When waiting for author input, print the useful terminal summary and required author questions last so the author can audit them without opening packet files.
- Do not stop on an opened entity or source-gathering stub. If author input is needed, the repository must contain a concrete author-review packet, approval packet, or phase-gate packet with the information needed to respond.
- Prose Preservation Notes are future chapter/outline planning artifacts only. Do not create them during the current story-bible entity phase unless the author has explicitly identified a specific prose-preservation issue.

## Known blockers or risks

- Comments have only been confirmed in `imports/raw/melissa-copy.docx`; `book-1-outline.docx` and `bullet-notes.docx` do not contain `word/comments.xml`.
- Local branch should remain synchronized with `origin/beta` during ongoing work.
- Niall's Heart/silver conduit/charge mechanics are not yet reviewed; see `CONSISTENCY_QUEUE.md`.
- Exact Alara apparent-death choreography, higher-plane state, and remaining cosmology mechanics remain deferred for later Fateweaving/Skein, endgame, and chapter review.
- Kelyra's hereditary kinesis/Subversion terminology, future Shroud manifestation scene, Lirien spelling, and Lethira parentage need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Elric's Harbinger/Syndicate takeover, Ink Pact possession, fate-strand sight, Heart exposure, codex/aura persistence, `A Cord of Six Strands` reveal staging, and reality-fracture mechanics need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Vorren's exact Heart-use mechanics, deeper Ink Pact delivery, mask/underground role, Kelyra breeding-contract knowledge/consent, Drakhal magic taxonomy, and exact Caius/Evana relationship history remain unresolved; see `planning/candidates/characters/char-vorren.md`.
- Harvick's prototypical Ink Pact, returning-weapon technology, and lightning revival mechanics need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Serathis's exact age/generation count, own escape/takeover details, final fight choreography, returning-dagger/bracer mechanics, exact Elric knowledge, remaining Presented Archeon magus, current-heir resentment, and post-Serathis Archeon succession remain unresolved; see `planning/candidates/characters/char-serathis.md`.
- Drakhal's Evana/Caius/Vorren relationships, Kelyra/Vorren breeding-contract deal, High Clade political trap, and exact force-magic terminology need later consistency review; see `CONSISTENCY_QUEUE.md`.
- Caius's exact force-magic terminology, Caius/Vorren abuse history, letter/visit/fight choreography, Darius-name cleanup, and post-Book-1 role remain unresolved; see `planning/candidates/characters/char-caius-drakhal.md`.
- Tanelle's exact background/training, root-chewing habit, Antithesis recognition, post-Heart-theft fate, and later Maya/Davian observer use remain unresolved; see `planning/candidates/characters/char-tanelle.md`.
- Marek's exact background, suspicion level toward Davian/Arrek, compensation terms, worker relationships, and post-Heart-theft fate remain unresolved; see `planning/candidates/characters/char-marek.md`.
- Zirene's exact social status, workshop security, backstory, old-book provenance, post-Book-1 role, and low-level mechanics for her major devices remain unresolved; see `planning/candidates/characters/char-zirene.md`.
- Karra's exact Sorevin rescue, Harbinger contact, evacuation lie to Davian's siblings, and possible later-book role remain unresolved; see `planning/candidates/characters/char-karra.md`.
- Arrek's exact home route, cousins, aura-capture mechanics, murder choreography, and any future restitution/consequence remain unresolved; see `planning/candidates/characters/char-arrek.md`.
- Stale Jalen-centered Arrek murder pressure/fieldwork references are superseded by Kelyra-centered routing; see `CONSISTENCY_QUEUE.md` and `reports/consistency/2026-06-26-secondary-characters-block-2.md`.
- Selina's exact Vorren death-event choreography, Antithesis return path, Nizän mask modification timing, and when Davian learns the truth remain unresolved; see `planning/candidates/characters/char-selina.md`.
- Kael's exact age, sibling dynamic with Lirien, knowledge state, evacuation scene, and possible later-book role remain unresolved; see `planning/candidates/characters/char-kael.md`.
- Antithesis transformation is no longer canon; later revision work must keep Antithesis as a dagger and preserve Alra's accepted concealment role; see `CONSISTENCY_QUEUE.md`.
- Ink Pact healing is limited to deeper Pact cases; later character reviews must keep Davian/Karra/Vorren distinct from Kelyra; see `CONSISTENCY_QUEUE.md`.
- Skein-layer zan, exact Heart/Registry/Treasury power path beyond the accepted Treasury weightlessness function, exact Zirene/Archeon device mechanics, and the exact Paradox forging scene remain unresolved candidates; see `CONSISTENCY_QUEUE.md`.

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
- reviews/entities/threads/thread-demi-human-mercenary-forces.md
- reviews/entities/threads/thread-kelyra-archeon-recovery.md
- bible/characters/char-kelyra.md
- bible/characters/char-serathis.md
- bible/organizations/org-archeon.md
- bible/events/event-harbinger-raid.md
- bible/cultures/culture-demi-human-peoples.md
- bible/characters/char-niall.md
- outline/arcs/thread-high-clade-politics.md
- bible/events/event-maya-presentation.md
- CONSISTENCY_QUEUE.md
- reports/consistency/2026-06-26-secondary-characters-block.md
- reviews/entities/characters/char-marek.md
- bible/characters/char-marek.md
- planning/candidates/characters/char-marek.md
- decisions/0050-marek-supervisor-role-and-davian-tutoring.md
- decisions/0051-zan-spelling-convention-correction.md
- reviews/entities/characters/char-zirene.md
- bible/characters/char-zirene.md
- planning/candidates/characters/char-zirene.md
- decisions/0052-zirene-technical-neutrality-and-device-boundaries.md
- reviews/entities/characters/char-karra.md
- bible/characters/char-karra.md
- planning/candidates/characters/char-karra.md
- decisions/0053-karra-concord-challenge-and-evacuation-role.md
- reviews/entities/characters/char-arrek.md
- bible/characters/char-arrek.md
- planning/candidates/characters/char-arrek.md
- decisions/0054-arrek-identity-murder-and-debt-family-context.md
- reports/consistency/2026-06-26-secondary-characters-block-2.md
- reports/consistency/2026-06-26-secondary-characters-block-final.md
- reviews/entities/threads/thread-maya-davian-romance.md
- reviews/entities/characters/char-selina.md
- bible/characters/char-selina.md
- planning/candidates/characters/char-selina.md
- decisions/0055-selina-death-family-myth-and-object-links.md
- reviews/entities/characters/char-kael.md
- bible/characters/char-kael.md
- planning/candidates/characters/char-kael.md
- decisions/0056-kael-brief-role-and-davian-selwin-mirror.md
- bible/characters/char-tanelle.md
- planning/candidates/characters/char-tanelle.md
- reviews/entities/characters/char-tanelle.md
- bible/characters/char-caius-drakhal.md
- planning/candidates/characters/char-caius-drakhal.md
- reviews/entities/characters/char-caius-drakhal.md
- bible/characters/char-aldira.md
- bible/characters/char-erynn.md
- bible/characters/char-alara.md
- bible/characters/char-serathis.md
- bible/characters/char-vorren.md

## Later branch recommendation

Use `beta` as the ongoing working branch below GitHub `main`. When a block is ready, merge to `main` through a pull request; do not merge without explicit author approval.
