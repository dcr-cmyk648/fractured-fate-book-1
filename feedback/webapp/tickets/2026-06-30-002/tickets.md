# Proposed Web-App Comment Tickets: 2026-06-30-002

Tickets are proposed work items derived from web-app comments. They are not canon, accepted revisions, manuscript-edit authorization, prose-preservation approval, app changes, or workflow changes until approved/routed through the appropriate workflow.

| Ticket ID | Status | Priority | Type | Target | Requires author decision |
|---|---|---|---|---|---|
| WC-2026-06-30-009 | accepted-for-workflow | high | workflow | web-app comment authority / intake workflow | yes |
| WC-2026-06-30-010 | accepted-for-workflow | medium | app-bug | review-app comment anchoring | no |
| WC-2026-06-30-011 | accepted-for-workflow | low | app-bug | mobile pull-up sync button status | no |

## WC-2026-06-30-009: Define Author vs Reader Comment Authority

- Source: webapp-comments
- Batch ID: `2026-06-30-002`
- Status: accepted-for-workflow
- Priority: high
- Ticket type: workflow
- Source comment IDs: `scratchpad-1782834634390-xzs6v0`
- Normalized comment IDs: `wc-8bb5620696b502e3`
- Commenter: DustinR
- Target files: `WORKFLOW.md`; `REVISION_WORKFLOW.md`; `feedback/webapp/README.md`; possibly `PROJECT_STATE.md`
- Target chapter IDs: none
- Target layer: author-scratchpad
- Relevant selected text: none
- Proposed destination: workflow documentation / comment intake policy
- Blocking: unknown; likely yes before processing outside-reader comments at scale
- Requires author decision: yes
- Created at: 2026-06-30
- Related consistency queue IDs: none
- Related prose preservation IDs: none
- Related entity IDs: none

Summary: The workflow should distinguish author-origin comments from outside-reader comments. Comments from the author can be treated as stronger steering input, while comments from others should be treated as speculative feedback requiring pros/cons and author review.

Rationale: This affects how Codex synthesizes future beta-reader feedback and prevents non-author comments from being treated as author-approved direction.

Disposition: Accepted and applied during the immediate workflow/pathway clarification pass. `WORKFLOW.md`, `REVISION_WORKFLOW.md`, and `AGENTS.md` now distinguish author-origin comments from outside-reader comments while preserving the rule that no web-app comment directly changes durable book files without appropriate approval. The app/comment intake path now preserves server-verified `commenter_role` data when Apps Script validates a private reader code; manual exports remain unverified. See decision record `decisions/0091-alpha-completion-and-comment-authority-workflow.md`.

## WC-2026-06-30-010: Improve General Scene/Region Anchoring for Comments

- Source: webapp-comments
- Batch ID: `2026-06-30-002`
- Status: accepted-for-workflow
- Priority: medium
- Ticket type: app-bug
- Source comment IDs: `scratchpad-1782835204674-6gp88o`
- Normalized comment IDs: `wc-04a9da2a8a056708`
- Commenter: DustinR
- Target files: `docs/app.js`; `docs/styles.css`; possibly `scripts/build_review_app_data.py`
- Target chapter IDs: all book-reader chapters
- Target layer: review app
- Relevant selected text: none
- Proposed destination: app-maintenance queue
- Blocking: no for current book work; useful before large-scale beta-reader feedback
- Requires author decision: no
- Created at: 2026-06-30
- Related consistency queue IDs: none
- Related prose preservation IDs: none
- Related entity IDs: none

Summary: Comment metadata should capture at least the general part of the chapter or scene visible when the comment is made. It does not need line-perfect anchoring, but later processing should be able to identify something like "the scene where they fight in the Trial."

Rationale: Current anchoring by chapter/file/scroll percent is useful but may be insufficient for later synthesis, especially if many beta readers comment on long chapters.

Disposition: Accepted and applied in the review app. Comments now capture a visible content anchor when possible and approximate the visible source-line region for book-reader comments instead of recording only the whole chapter range. This remains approximate, not line-perfect inline annotation.

## WC-2026-06-30-011: Match Pull-Up Sync Button Status Behavior

- Source: webapp-comments
- Batch ID: `2026-06-30-002`
- Status: accepted-for-workflow
- Priority: low
- Ticket type: app-bug
- Source comment IDs: `scratchpad-1782835255140-7tbzg5`
- Normalized comment IDs: `wc-5ee0e019437da9f3`
- Commenter: DustinR
- Target files: `docs/app.js`; `docs/styles.css`
- Target chapter IDs: none
- Target layer: review app
- Relevant selected text: none
- Proposed destination: app-maintenance queue
- Blocking: no
- Requires author decision: no
- Created at: 2026-06-30
- Related consistency queue IDs: none
- Related prose preservation IDs: none
- Related entity IDs: none

Summary: When syncing comments from the mobile/comment pull-up dialog, the button should show the same `syncing` feedback behavior as the comments/export page.

Rationale: This is a small usability consistency issue. It helps readers understand that sync is actively running.

Disposition: Accepted and applied in the review app. The fixed/pull-up comment action and the full export-page sync button now share the same disabled `Syncing...` state while direct sync is in progress.
