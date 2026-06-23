# Entity Index

Master inventory and processing queue for characters, organizations, Clades, locations, cultures, magic concepts, objects, artifacts, technologies, historical events, narrative threads, and terminology requiring dedicated reference.

Allowed statuses:

- `discovered`: detected in source material but not yet placed in the queue
- `queued`: ready for review
- `in-review`: Codex is currently assembling or revising its review packet
- `awaiting-author`: review packet has been presented and requires author input
- `approved`: accepted material has been written to durable files
- `needs-revisit`: previously approved but new material or a contradiction requires another review
- `deferred`: intentionally postponed

There must normally be no more than one entity marked `in-review`.

## Review Queue

| Order | ID | Type | Name | Status | Review packet | Accepted file | Candidate file | Last reviewed |
|---:|---|---|---|---|---|---|---|---|

## Default Review Order

1. Principal characters
2. Major organizations
3. Core magic systems
4. Important locations
5. Major objects
6. Cultures and world systems
7. Secondary characters
8. Narrative threads and remaining entities

The author may reorder the queue at any point.
