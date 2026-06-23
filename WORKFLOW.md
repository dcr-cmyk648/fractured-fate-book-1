# Workflow

This file defines the persistent migration and entity-review process. A new Codex session must be able to continue from repository files without relying on conversation history.

## Startup

Before doing book work, Codex must:

1. Read `AGENTS.md`.
2. Read `README.md`.
3. Read `PROJECT_STATE.md`.
4. Read `WORKFLOW.md`.
5. Read `ENTITY_INDEX.md`.
6. Read `MIGRATION_STATUS.md` if migration is not complete.
7. Read the files listed under "Files to read for current task" in `PROJECT_STATE.md`.
8. Run `pwd`.
9. Run `git status --short --branch`.
10. Compare the actual Git state with `PROJECT_STATE.md`.
11. Report any discrepancy before modifying files.
12. State the current phase, current entity, and the one task it intends to perform.
13. Do not broaden the task without author permission.

## Migration Phases

`MIGRATION_STATUS.md` is the record of migration phases and gates. `PROJECT_STATE.md` records immediate operational state. Do not duplicate large amounts of phase detail between them.

Phase 0 is the raw source import and verification step. Raw DOCX files in `imports/raw/` are archival source material and must remain untouched.

Phase 1 creates durable control files and the persistent review workflow. Entity inventory and review must not begin until the required normalized sources exist and the author authorizes that phase.

## Entity Inventory

After the three source documents have been normalized, create an entity inventory before creating the story bible.

Identify candidate entities such as:

- characters
- organizations and Clades
- locations
- cultures or peoples
- magic systems and abilities
- important objects and artifacts
- technologies
- historical events
- narrative threads
- terminology requiring a dedicated reference

Assign stable IDs, such as:

- `char-maya`
- `char-davian`
- `char-niall`
- `org-rezin`
- `org-archeon`
- `loc-rezin-citadel`
- `magic-shroud`
- `magic-subversion`
- `object-seraph-heart`
- `thread-maya-davian-romance`

Do not assume every detected name deserves its own file. Group trivial or incidental entities when appropriate, but report the proposed grouping.

Create the inventory and proposed review order only. Do not write accepted canon during inventory. After creating the inventory, show it to the author and stop.

Default review order:

1. Principal characters
2. Major organizations
3. Core magic systems
4. Important locations
5. Major objects
6. Cultures and world systems
7. Secondary characters
8. Narrative threads and remaining entities

## One-Entity-at-a-Time Review Loop

### Step 1: Begin One Entity

Select only the next approved entity from `ENTITY_INDEX.md`.

Update:

- its status to `in-review`
- `PROJECT_STATE.md` with the entity ID
- `PROJECT_STATE.md` with the source files that must be examined

Do not begin a second entity.

### Step 2: Gather Source-Backed Material

Search all relevant available sources, including:

- normalized manuscript
- normalized Book 1 outline
- normalized Bullet notes
- chapter manuscript files, when available
- chapter outlines
- revision files
- planning candidates
- feedback
- previously approved entity files
- decision records

Gather information into categories:

1. Explicitly present in manuscript prose
2. Explicitly stated in outline or planning
3. Present only in Bullet notes
4. Present only in comments or feedback
5. Already accepted through a decision
6. Speculative language or alternatives
7. Contradictions
8. Possible obsolete material
9. Important omissions or unanswered questions

Preserve provenance for every substantive claim. Provenance should normally include:

- source file
- relevant heading or chapter
- note ID when available
- comment ID when available
- enough context to relocate the source

Do not claim that a summarized statement is a direct quotation. Use short quotations only when exact wording matters.

### Step 3: Create a Review Packet

Create a review packet under a suitable path, for example:

- `reviews/entities/characters/char-maya.md`
- `reviews/entities/organizations/org-rezin.md`
- `reviews/entities/magic/magic-shroud.md`

Use this structure:

```markdown
---
id: char-maya
entity_type: character
display_name: Maya Rezin
review_status: awaiting-author
source_scope:
  - imports/normalized/melissa-copy.md
  - imports/normalized/book-1-outline.md
  - imports/normalized/bullet-notes.md
last_updated: YYYY-MM-DD
---

# Entity Review: Maya Rezin

## Proposed identity

Basic name, aliases, titles, and classification.

## Manuscript-established information

Only information actually present in the current prose.

Each item must include provenance.

## Planning-established information

Information stated in outlines, revision plans, or arc documents.

Do not automatically label this canon.

## Bullet-note material

Relevant raw or proposed ideas from the note inbox.

## Existing decisions

Links to explicit decision records.

## Existing feedback

Relevant Melissa or other reader feedback.

Feedback is not canon.

## Consistent information

Material that appears stable across relevant sources.

## Contradictions and version conflicts

For each conflict, show:

- version A
- version B
- source of each
- likely consequence
- whether one appears newer
- do not choose a winner without author approval

## Speculative or alternative material

Include "what if," "maybe," "consider," questions, alternatives, and apparently abandoned possibilities.

## Proposed accepted record

Codex's proposed concise version of what should be stored as accepted.

Clearly label it as a proposal.

## Proposed planning or arc record

Material that belongs in an outline or arc rather than the story bible.

## Proposed candidate record

Material that should remain speculative.

## Questions for the author

Ask only concrete questions that affect storage or interpretation.

Prefer grouped choices such as:

1. Accept version A
2. Accept version B
3. Retain both as unresolved
4. Supply a different version

## Proposed file changes

List the exact files Codex would create or modify after approval.
```

### Step 4: Present the Review

Show the author a useful summary of the review packet in the Codex conversation. Do not merely say the packet exists.

Present:

- proposed accepted facts
- important contradictions
- speculative ideas worth preserving
- targeted questions
- proposed destinations

Then stop.

Set the entity status to `awaiting-author`. Do not write proposed facts into accepted bible files yet. Do not move to another entity.

### Step 5: Incorporate Author Feedback

When the author provides feedback:

1. Restate the concrete decisions understood.
2. Update the review packet.
3. Preserve rejected alternatives in planning/candidates when they may remain useful, unless the author explicitly instructs deletion.
4. Create decision records for important choices.
5. Show any remaining ambiguity.
6. Stop again if further author judgment is needed.

Continue until the author explicitly approves the entity with `APPROVE ENTITY <entity-id>`.

### Step 6: Store Approved Information Concretely

After approval, write accepted information into the appropriate durable files.

Examples:

- `bible/characters/char-maya.md`
- `bible/organizations/org-rezin.md`
- `bible/magic/magic-shroud.md`
- `bible/locations/loc-rezin-citadel.md`
- `outline/arcs/maya.md`
- `planning/candidates/characters/char-maya.md`
- `decisions/NNNN-short-decision-name.md`

Do not force all material into one file.

Use this division:

- `bible/`: accepted world or character information
- `outline/`: planned narrative structure and arcs
- `revision/`: proposed or accepted changes to existing prose
- `planning/candidates/`: retained speculation and alternatives
- `decisions/`: explicit author decisions and rationale
- `feedback/`: reader feedback
- `reviews/entities/`: review evidence and audit trail

An accepted entity file should begin with metadata such as:

```yaml
---
id: char-maya
entity_type: character
display_name: Maya Rezin
status: approved
last_reviewed: YYYY-MM-DD
review_packet: reviews/entities/characters/char-maya.md
---
```

Accepted entity files must:

- contain only approved material
- distinguish current manuscript state from intended future state when they differ
- link to relevant arcs, decisions, and candidate files
- avoid duplicating large passages from other files
- contain enough context for Codex to use them later
- preserve provenance for facts where provenance is important

For characters, consider sections such as:

- Identity and titles
- Physical description
- Background
- Personality and psychological patterns
- Motivations and values
- Abilities
- Important relationships
- Current manuscript state
- Intended arc links
- Knowledge and secrets
- Canonical uncertainties
- Related files
- Provenance

Use only relevant sections. Do not create empty boilerplate sections.

For organizations, consider:

- Identity
- Leadership
- Membership
- Goals
- Resources
- Internal structure
- Beliefs or culture
- Relationships and conflicts
- Current manuscript state
- Intended changes
- Related files
- Provenance

Adapt the structure for other entity types.

### Step 7: Finish the Entity

After storing approved information:

1. Set the entity status to `approved` in `ENTITY_INDEX.md`.
2. Add links to the review packet, accepted file, candidate file if one exists, and relevant decision records.
3. Update `PROJECT_STATE.md`.
4. Identify the next queued entity, but do not begin it.
5. Run relevant validation.
6. Show changed files, concise diff summary, unresolved matters, `git status --short`, and proposed commit message.
7. Stop before committing.

Prefer one approved entity per commit, unless the author explicitly authorizes a small related batch.

Suggested commit messages:

- `bible: approve Maya character record`
- `bible: approve Rezin organization record`
- `bible: approve Shroud magic record`

After the author authorizes the commit, commit it and update `PROJECT_STATE.md` with the commit hash if appropriate.

## Handoff

Before ending a substantial work session, update `PROJECT_STATE.md` with:

- exact phase
- exact entity
- last completed action
- whether author feedback is pending
- exact next action
- relevant file paths
- known blockers
- whether changes are committed
- latest relevant commit if available

Do not put essential state only in the conversation.
