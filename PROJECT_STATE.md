# Project State

Last updated: 2026-06-28

## Repository state

- Current branch: beta
- Current migration phase: Phase 6 current-draft chapter map
- Current block: current-draft-map
- Active or paused entity ID: none
- Latest completed entity: thread-elric-reality-skein
- Latest relevant commit: HEAD
- Latest relevant commit message: `workflow: prioritize lower-level tickets before outline work`
- Working tree expected to be clean: yes, after the ticket-priority workflow update is pushed
- Remote synchronized: yes

## Block status

- Current block: current-draft-map
- Block scope: descriptive current-draft chapter mapping under `REVISION_WORKFLOW.md`
- Approved current-draft maps since last chapter-map consistency review: 4
- Last consistency review: reports/consistency/2026-06-27-current-draft-map-through-ch24.md
- Last chapter-map consistency review: reports/consistency/2026-06-27-current-draft-map-through-ch24.md
- Consistency review due: no; next significant current-draft map review due after five more approved maps or sooner if a broad issue appears
- Remote synchronized: yes

## Last completed work

The story-bible completion gate was approved by the author. Current-draft chapter mapping has been opened under `REVISION_WORKFLOW.md`.

## Current work

The current checkpoint is ticket-queue review. New lower-level tickets created from `imports/raw/Lore (running addended version).txt` and web-app comment batch `2026-06-28-001` should be reviewed before returning to higher-level current-draft chapter mapping when they could affect story bible, basic lore, character, magic, terminology, location, object, chronology, or consistency decisions. No accepted canon, manuscript prose, or chapter-map state has been changed.

## Next action

Present the prioritized lower-level ticket checkpoint from `feedback/source-intake/lore-running-addended-version-2026-06-28/tickets.md` and `feedback/webapp/tickets/2026-06-28-001/tickets.md`. After author answers are stored and any approved lower-level routing is complete, resume by preparing the `d1-ch-29` current-draft map packet.

## Awaiting author input

Author review of the first lower-level ticket checkpoint.

## Workflow policy note

- Unapproved review-packet commits are optional, not automatic. While the author is actively present in the same Codex session, keep an unapproved review packet in the working tree until the author checkpoint. Create and push an unapproved checkpoint only when durability matters: session ending, author switching computers or threads, likely context compaction/interruption, costly source-gathering, or explicit author request. Checkpoints must not create accepted bible files or mark the entity approved.
- When waiting for author input, print the useful terminal summary and required author questions last so the author can audit them without opening packet files.
- For current-draft chapter-map packets, the in-thread presentation must include a concise chapter summary, a short list of key divergences, and the main chapter goals before the required approval question.
- Do not stop on an opened entity or source-gathering stub. If author input is needed, the repository must contain a concrete author-review packet, approval packet, or phase-gate packet with the information needed to respond.
- Prose Preservation Notes are future chapter/outline planning artifacts only. Do not create them during the current story-bible entity phase unless the author has explicitly identified a specific prose-preservation issue.
- Web-app comments are inbox material. Importing and normalizing exported comments does not make them canon, accepted revisions, manuscript-edit instructions, story-bible decisions, or prose-preservation approvals. Use `python3 scripts/import_webapp_comments.py` after placing exported files in `feedback/webapp/incoming/`, then synthesize a batch only when explicitly asked.

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
- revision/current-draft-map/index.md
- imports/normalized/melissa-copy.md
- feedback/webapp/README.md
- feedback/webapp/PROCESS_BATCH_PROMPT.md
- feedback/webapp/schemas/comment.schema.md
- feedback/webapp/schemas/ticket.schema.md
- scripts/import_webapp_comments.py
- feedback/source-intake/index.md
- feedback/source-intake/lore-running-addended-version-2026-06-28/source-summary.md
- feedback/source-intake/lore-running-addended-version-2026-06-28/tickets.md
- feedback/webapp/batches/2026-06-28-001/import-report.md
- feedback/webapp/synthesis/2026-06-28-001-synthesis.md
- feedback/webapp/tickets/2026-06-28-001/tickets.md
- reports/consistency/2026-06-27-current-draft-map-through-ch24.md
- REVISION_WORKFLOW.md
- MIGRATION_STATUS.md
- CONSISTENCY_QUEUE.md

## Later branch recommendation

Use `beta` as the ongoing working branch below GitHub `main`. When a block is ready, merge to `main` through a pull request; do not merge without explicit author approval.
