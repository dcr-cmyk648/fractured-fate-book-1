# Proposed Web-App Comment Tickets: 2026-06-29-001

Tickets are proposed work items derived from web-app comments. They are not canon, accepted revisions, manuscript-edit authorization, or prose-preservation approval.

| Ticket ID | Status | Priority | Type | Target | Requires author decision |
|---|---|---|---|---|---|
| WC-2026-06-29-001 | accepted-for-workflow | medium | revision-suggestion | future chapter maps / prose phase guidance | no |
| WC-2026-06-29-002 | accepted-for-workflow | medium | app-bug | `docs/index.html`; `docs/app.js`; `docs/README.md` | no |
| WC-2026-06-29-003 | accepted-for-workflow | medium | app-bug | review app reader-code comment sync | no |
| WC-2026-06-29-004 | accepted-for-workflow | high | chapter-architecture | Kelyra/Davian/Maya, Sorevin succession, Maya public role, Presentation fallout | no |

## WC-2026-06-29-001: Subtle Character-Natural Worldbuilding

- Source: webapp-comments
- Batch ID: `2026-06-29-001`
- Status: accepted-for-workflow
- Priority: medium
- Ticket type: revision-suggestion
- Source comment IDs: `scratchpad-1782670811946-3rhhwk`
- Normalized comment IDs: `wc-13d00f2d9dfdf49e`
- Commenter: DustinR
- Target file: none; applies to future chapter mapping, chapter architecture, outline, and prose phase guidance
- Target layer: author-scratchpad
- Proposed destination: future chapter architecture / prose-preservation and later prose guidance
- Blocking: no
- Requires author decision: no

Summary: Worldbuilding and thematic exposition should be filtered through what the POV character would naturally notice, think, normalize, or resist, especially for moral or social material. Avoid over-explaining concepts the character is already used to.

Rationale: This can improve future chapter maps and prose work by keeping exposition character-grounded and avoiding reader-facing moral overstatement.

Disposition: Accepted for workflow. Stored in `AUTHORING.md` as prose-phase guidance: social, political, moral, and cultural worldbuilding should be filtered through the POV character's natural perception rather than presented as reader-facing moral explanation.

## WC-2026-06-29-002: Simplify Comment Export UI

- Source: webapp-comments
- Batch ID: `2026-06-29-001`
- Status: accepted-for-workflow
- Priority: medium
- Ticket type: app-bug
- Source comment IDs: `scratchpad-1782684109981-2az67j`; `scratchpad-1782684162653-7lex5s`
- Normalized comment IDs: `wc-a97928a4f8626914`; `wc-9b8aa34812019a05`
- Commenter: DustinR
- Target files: `docs/index.html`; `docs/app.js`; `docs/README.md`
- Target layer: app UI
- Proposed destination: implemented app update
- Blocking: no
- Requires author decision: no

Summary: The export view should use one clear `Export Comments` button and should display last-export information in a readable format.

Disposition: Applied. The visible export action now exports JSON only, and the last-export timestamp is formatted as a readable local date/time.

Rationale: This reduces UI confusion while preserving the existing JSON intake workflow.

## WC-2026-06-29-003: Evaluate Reader Accounts and Drive-Backed Persistence

- Source: webapp-comments
- Batch ID: `2026-06-29-001`
- Status: accepted-for-workflow
- Priority: medium
- Ticket type: app-bug
- Source comment IDs: `scratchpad-1782756260074-ci0uw1`; `scratchpad-1782757000096-36uk5k`
- Normalized comment IDs: `wc-eec024d29a11c1b9`; `wc-9e186665cfbb0ec7`
- Commenter: DustinR
- Target files: `docs/index.html`; `docs/app.js`; `feedback/webapp/import-webapp-comments.gs`; `docs/README.md`; `feedback/webapp/README.md`
- Target layer: technical-processing
- Proposed destination: implemented app update and Apps Script update
- Blocking: no
- Requires author decision: no

Summary: Consider hardcoded reader accounts and automated comment transfer or Drive-backed persistence for beta readers. The main goals are cross-device persistence and less manual export/upload work, not high-security authentication.

Rationale: This would change the current static/localStorage/manual-export architecture and may require Apps Script, Drive permissions, or another storage layer. It should be designed deliberately before implementation.

Disposition: Accepted by author on 2026-06-29 as a submit-only reader-code sync design. Implemented a V1 path where the static app stores a private reader code locally, submits comment exports to Apps Script with `action: submit-comments`, and keeps backup JSON download available. Apps Script now validates reader codes from private Script Properties, writes submitted comments to the tracking Sheet, and archives new submitted JSON files in Drive for later Codex import.

## WC-2026-06-29-004: Route Content Scratchpad Story and Lore Notes

- Source: webapp-comments
- Batch ID: `2026-06-29-001`
- Status: accepted-for-workflow
- Priority: high
- Ticket type: chapter-architecture
- Source comment IDs: `scratchpad-1782670833833-xjex54`
- Normalized comment IDs: `wc-2a115febc9c7a43b`
- Commenter: DustinR
- Target files: future Kelyra/Davian/Maya outline material; Sorevin/Low Clade story-bible material; Presentation chapter architecture
- Target layer: author-scratchpad
- Proposed destination: accepted owner files updated; candidate files retained as provenance
- Blocking: no for Chapter 31; potentially relevant before final next-draft outline
- Requires author decision: no

Summary: Preserve these content notes for later routing:

- Kelyra may later challenge Davian's hope of joining Maya "in the light" after years in the shadows, setting up her later-book antagonism toward Maya.
- Maya had some administrative familiarity before Presentation, but her role becomes newly public-facing afterward.
- Sorevin had no children capable of forming Shrouds or being Presented; Maya may misunderstand succession and contract-handler replacement after Sorevin's death, with Niall explaining proxy Low Clade mechanics.
- Niall may warn Maya after Presentation that she does not understand the political ramifications of what she did.

Rationale: These notes affect character arcs, Clade/proxy governance, and chapter-level purpose. They should be available to future lower-level review before higher-level outline decisions depend on them.

Disposition: Accepted by author on 2026-06-29. Stored as accepted direction in `outline/arcs/thread-maya-davian-romance.md`, `outline/arcs/thread-kelyra-archeon-recovery.md`, `bible/locations/loc-sorevin-redbridge.md`, and `bible/events/event-maya-presentation.md`; decision record `decisions/0075-webapp-scratchpad-story-directions.md`.
