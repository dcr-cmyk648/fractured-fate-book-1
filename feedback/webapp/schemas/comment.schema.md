# Web-App Comment Schema

Web-app comments are inbox material. They are not canon, accepted revisions, manuscript-edit authorization, story-bible decisions, or prose-preservation approvals.

## Raw Fields

A raw app comment may include:

- `id`
- `created_at`
- `commenter_name`
- `repo_commit`
- `repo_branch`
- `app_version`
- `view_mode`
- `current_layer`
- `current_file_path`
- `chapter_id`
- `chapter_title`
- `source_line_start`
- `source_line_end`
- `current_heading`
- `selected_text`
- `approximate_scroll_percent`
- `comment_text`
- `status`

If exact line data is unavailable, preserve the best available anchor: file path, chapter ID, heading, selected text, or scroll percent.

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
- `app-bug`
- `general-reaction`
- `unclear`

These classifications are triage hints only. Codex performs synthesis later, and the author approves routing before comments affect durable book files.

## Deduplication

Deduplication uses a stable `content_hash` from:

- `commenter_name`
- `created_at`
- `current_file_path`
- `chapter_id`
- `current_layer`
- `selected_text`
- `comment_text`

Duplicate records are archived in the batch directory rather than discarded silently.
