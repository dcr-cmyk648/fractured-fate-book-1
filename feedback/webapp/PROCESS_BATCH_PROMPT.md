# Process Web-App Comment Batch Prompt

Use this prompt when a normalized web-app comment batch is ready for Codex synthesis.

```text
Process web-app comment batch <batch-id>.

Read:
- feedback/webapp/batches/<batch-id>/normalized-comments.jsonl
- feedback/webapp/batches/<batch-id>/import-report.md
- feedback/webapp/normalized/comments-index.md
- feedback/webapp/schemas/comment.schema.md
- feedback/webapp/schemas/ticket.schema.md
- relevant target files referenced by the comments
- relevant story-bible files
- relevant outline/revision/consistency/prose-preservation workflow files

Create:
- feedback/webapp/synthesis/<batch-id>-synthesis.md
- proposed tickets under feedback/webapp/tickets/<batch-id>/

Do not edit manuscript prose.
Do not modify accepted canon.
Do not apply ticket resolutions.
Do not create prose-preservation records unless explicitly authorized.
Do not add to CONSISTENCY_QUEUE.md unless explicitly authorized during this batch review, except for clearly blocking contradictions that would otherwise be lost.

Present one batch-level author checkpoint with:
- import count
- duplicates
- rejected records
- top repeated concerns
- high-priority tickets
- blocking tickets
- prose-preservation candidates
- continuity/story-bible risks
- app bugs
- suggested routing
- grouped questions requiring author judgment
```
