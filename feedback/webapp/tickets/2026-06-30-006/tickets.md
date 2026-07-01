# Proposed Web-App Comment Tickets: 2026-06-30-006

Status: proposed for author review.

Tickets are not canon, accepted revisions, manuscript-edit authorization, or prose-preservation approval.

| Ticket ID | Status | Priority | Type | Target | Requires author decision |
|---|---|---|---|---|---|
| `WC-2026-06-30-013` | accepted-for-workflow | high | app-bug | mobile comment box / keyboard viewport | no |
| `WC-2026-06-30-014` | proposed | medium | revision-suggestion | early chapters; `d1-ch-01`; beta rewrite style guidance | yes |

## WC-2026-06-30-013: Mobile Keyboard Obscures Comment Entry

- Ticket ID: `WC-2026-06-30-013`
- Source: webapp-comments
- Batch ID: `2026-06-30-006`
- Status: accepted-for-workflow
- Priority: high
- Ticket type: app-bug
- Source comment IDs: `comment-1782864955713-hsteq0`
- Normalized comment IDs: `wc-d71003a9b3376fc1`
- Commenter: `DustinR`
- Commenter role: `reader`
- Commenter role verified: yes
- Target files: `docs/app.js`; `docs/styles.css`; `docs/index.html` if needed
- Target chapter IDs: none
- Target layer: comment UI
- Relevant selected text: none
- Proposed destination: app maintenance
- Blocking: no
- Requires author decision: no
- Created at: 2026-06-30
- Related consistency queue IDs: none
- Related prose preservation IDs: none
- Related entity IDs: none

Summary: Mobile comment entry still has a keyboard/viewport problem; when typing, the user cannot see the comment text.

Rationale: The app is intended to collect mobile feedback through comments and scratchpad entries. If the keyboard hides the textarea, mobile comment collection is unreliable even if sync works.

Disposition: app update applied in `review-interface-v0-sync-28`.

## WC-2026-06-30-014: Early Chapters Need Later Style/Voice Review

- Ticket ID: `WC-2026-06-30-014`
- Source: webapp-comments
- Batch ID: `2026-06-30-006`
- Status: proposed
- Priority: medium
- Ticket type: revision-suggestion
- Source comment IDs: `comment-1782864955713-hsteq0`
- Normalized comment IDs: `wc-d71003a9b3376fc1`
- Commenter: `DustinR`
- Commenter role: `reader`
- Commenter role verified: yes
- Target files: `imports/normalized/melissa-copy.md`; future beta rewrite files
- Target chapter IDs: `d1-ch-01`; likely early chapters more broadly
- Target layer: prose
- Relevant selected text: none
- Proposed destination: beta rewrite style guidance / future prose revision
- Blocking: no
- Requires author decision: yes
- Created at: 2026-06-30
- Related consistency queue IDs: none
- Related prose preservation IDs: none
- Related entity IDs: none

Summary: Early chapters may have a more generic or "AI voice" quality than later chapters, which may have improved because they had more author direction.

Rationale: This is useful beta-rewrite guidance, especially for the early-book pass, but it does not authorize immediate manuscript prose changes. It should be retained as a style concern to check against Chapter 1 and nearby early chapters when the rewrite/prose phase opens.

Recommended disposition: accept as future revision guidance and review early chapters for generic phrasing, over-smoothed sentence texture, and insufficient author-specific direction during the beta rewrite.

Required author question:

1. Should `WC-2026-06-30-014` be accepted as future beta-rewrite style guidance for early chapters?
