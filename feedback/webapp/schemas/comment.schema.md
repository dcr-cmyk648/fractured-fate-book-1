# Web-App Comment Schema

Web-app comments are inbox material. They are not canon, accepted revisions, manuscript-edit authorization, story-bible decisions, or prose-preservation approvals.

## Raw Fields

A raw app comment may include:

- `id`
- `created_at`
- `commenter_name`
- `commenter_role`
- `commenter_role_verified`
- `reader_id`
- `reviewer_session_id`
- `repo_commit`
- `repo_branch`
- `app_version`
- `view_mode`
- `current_layer`
- `scratchpad_type`
- `current_file_path`
- `chapter_id`
- `chapter_title`
- `source_line_start`
- `source_line_end`
- `current_heading`
- `ticket_id`
- `ticket_title`
- `ticket_status`
- `ticket_type`
- `selected_text`
- `approximate_scroll_percent`
- `comment_text`
- `status`
- `initial_classification`

If exact line data is unavailable, preserve the best available anchor: file path, chapter ID, heading, selected text, or scroll percent.

Scratchpad entries intentionally do not require a file or chapter anchor. For scratchpad records:

- `view_mode`: `scratchpad`
- `current_layer`: `author-scratchpad`
- `scratchpad_type`: `content` or `technical-processing`
- `current_heading`: `Content` or `Technical / Processing`
- `initial_classification`: `scratchpad-content` or `scratchpad-technical`

## Commenter Role

`commenter_role` distinguishes author-origin and outside-reader-origin material when that distinction is available. Allowed normalized values are:

- `author`
- `reader`
- `unverified`

`commenter_role_verified` should be true only when a private reader code has been validated by the configured Apps Script sync endpoint. The local importer preserves verified role fields from synced/archived records, but it does not infer author status from `commenter_name`, `reader_id`, device/session identifiers, or familiar wording.

A record is author-origin only when `commenter_role: author` and `commenter_role_verified: true`. A verified `reader` record remains outside-reader feedback. It may increase salience and produce tickets, but it does not authorize accepted canon, outline direction, prose edits, prose-preservation approval, or global creative/revision guidance.

Manual JSON/JSONL/Markdown exports without a verified role are treated as `unverified` for synthesis. They remain inbox material and do not bypass ticketing, approval, or prose/canon gates.

Ticket-review comments may use `view_mode: ticket-review`, `current_layer: ticket-review`, and ticket metadata. These fields anchor a comment to a proposed ticket. They do not approve, reject, or apply that ticket.

## Derived Normalization Fields

`scripts/import_webapp_comments.py` adds:

- `normalized_id`
- `import_batch_id`
- `source_export_file`
- `content_hash`
- `anchor_hash`
- `likely_target_type`
- `likely_target_id`
- `initial_classification`
- `commenter_role`
- `commenter_role_verified`
- `processing_status`
- `imported_at`
- `importer_version`

## Initial Classifications

The importer may assign only lightweight deterministic classifications:

- `prose-feedback`
- `reader-confusion`
- `line-edit`
- `continuity-question`
- `story-bible-question`
- `chapter-architecture-note`
- `prose-preservation-candidate`
- `scratchpad-content`
- `scratchpad-technical`
- `app-bug`
- `general-reaction`
- `unclear`

These classifications are triage hints only. Codex performs synthesis later, and the author approves routing before comments affect durable book files.

`scratchpad-content` may later route to note inbox items, story-bible review, candidate ideas, future sequence notes, chapter architecture, prose-preservation tickets, revision suggestions, or consistency queue items. `scratchpad-technical` may later route to app bugs, data-processing tickets, workflow tickets, export/import issues, or repository maintenance tasks.

## Deduplication

Deduplication uses a stable `content_hash` from:

- `commenter_name`
- `created_at`
- `current_file_path`
- `chapter_id`
- `current_layer`
- `ticket_id`
- `selected_text`
- `comment_text`

Duplicate records are archived in the batch directory rather than discarded silently.
