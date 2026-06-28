# Web-App Comment Ticket Schema

Tickets are proposed actionable work items derived from web-app comments. They are not automatically approved.

Each ticket should include:

- `ticket_id`
- `source: webapp-comments`
- `batch_id`
- `status: proposed`
- `priority: low|medium|high|blocking`
- `ticket_type`
- `title`
- `summary`
- `rationale`
- `source_comment_ids`
- `normalized_comment_ids`
- `commenters`
- `target_files`
- `target_chapter_ids`
- `target_layer`
- `relevant_selected_text`
- `proposed_destination`
- `blocking: yes|no|unknown`
- `requires_author_decision: yes|no`
- `created_at`
- `related_consistency_queue_ids`
- `related_prose_preservation_ids`
- `related_entity_ids`

Allowed ticket types:

- `feedback-response`
- `prose-preservation`
- `chapter-architecture`
- `revision-suggestion`
- `continuity-check`
- `story-bible-review`
- `consistency-queue`
- `candidate-idea`
- `reader-confusion`
- `style-line-edit`
- `app-bug`

Tickets must preserve provenance from the source comments: source comment ID, normalized comment ID, batch ID, commenter, timestamp, target file/chapter/layer, selected text or anchor, and exported repo commit if available.

Reader comments do not override approved canon, approve exact prose reuse, authorize manuscript edits, or create durable revisions. Repeated comments increase salience but do not decide the fix.
