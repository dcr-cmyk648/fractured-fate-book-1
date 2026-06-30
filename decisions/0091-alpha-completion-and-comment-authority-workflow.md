# Alpha Completion and Comment Authority Workflow

Date: 2026-06-30

Status: accepted workflow direction

## Decision

After current-draft mapping catches up to the latest existing prose or working fragment, the repository workflow should support finishing the current alpha draft before returning for a full beta-draft re-outline and rewrite pass.

The alpha-completion path is:

1. Pull/process web-app comments and route tickets.
2. Run a consistency/validation pass and identify blockers.
3. Resolve or explicitly defer tickets and consistency issues that would block alpha continuation.
4. Build alpha-continuation architecture for the remaining unwritten Book 1 material, deciding chapter/sequence purpose before detailed scene outlines.
5. Build enough detailed outline for the next unwritten alpha unit to support bounded drafting.
6. Draft alpha prose only after explicit author authorization under `AUTHORING.md`.
7. Preserve accepted alpha chapter snapshots.
8. After alpha completion, return to the beginning for beta-draft Chapter Architecture / Chapter Goal Cards, whole-book re-outline, beta rewrite, and whole-book structural/consistency reviews.

Comment authority is also clarified:

- Author-origin web-app comments and scratchpad entries may be treated as stronger steering input than outside-reader comments.
- They still enter the repository as inbox material and require routing.
- If the author separately approves the same direction in the Codex thread or another checkpoint, route it as accepted direction.
- Otherwise, synthesize the comment into a ticket and present a proposed disposition before applying it globally.
- Outside-reader comments should be treated as feedback, not instruction, and synthesized with pros, cons, likely causes, and possible responses.

## Related Ticket

- `WC-2026-06-30-009`

## Related Files

- `WORKFLOW.md`
- `REVISION_WORKFLOW.md`
- `AGENTS.md`
- `feedback/webapp/README.md`
