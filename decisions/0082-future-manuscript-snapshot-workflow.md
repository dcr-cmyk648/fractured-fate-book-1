# Future Manuscript Snapshot Workflow

Date: 2026-06-30

## Status

Accepted future prose-phase workflow guidance.

## Decision

When prose work eventually opens, the repository should preserve durable record snapshots for:

- first/alpha chapter versions once the author accepts them as durable draft records;
- finalized beta rewrites once the author accepts them as durable rewrite records.

Later prose phases may also mark protected passages, lines, exchanges, or sections that should not change without explicit author permission.

Do not create snapshot directories, archived chapter copies, protected prose records, or manuscript edits now. This decision only establishes the future workflow requirement.

## Boundaries

Snapshots are historical records, not the live manuscript. Codex must not silently restore text from a snapshot, overwrite manual edits, or treat a snapshot as newer authority than the current manuscript on disk.

Protected status requires explicit author approval. Reader comments, scratchpad entries, candidate notes, or ordinary prose-preservation candidates do not by themselves create protected prose.

## Rationale

Future prose drafting and rewriting may produce versions worth preserving before later edits change them. Recording accepted alpha and beta states gives the author a stable reference point without locking the live manuscript or bypassing manual-edit protection.

## Applies To

- `AUTHORING.md`
- `REVISION_WORKFLOW.md`
- `feedback/webapp/tickets/2026-06-30-001/tickets.md`
