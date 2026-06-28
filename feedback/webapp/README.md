# Web-App Feedback Workflow

The review app is a read-only interface for gathering portable comments. It does not upload to Google Drive, call Codex, call an AI model, write repository files, or treat comments as canon.

Web-app comments are inbox material.

They are not canon. They are not accepted revisions. They are not instructions to alter manuscript prose. They are not automatic story-bible decisions. They are not automatic prose-preservation approvals.

Comments must be imported, normalized, archived, synthesized, and converted into reviewable tickets or queue items before affecting durable book files.

Intended path:

1. Reader opens the local app or a future GitHub Pages version.
2. Reader enters a commenter name.
3. Reader reads prose in Reader Mode or, if authorized, uses Author Mode for repository files and other layers.
4. Reader submits comments using the fixed bottom comment box.
5. Reader exports comments as JSON.
6. Reader sends the exported comments file to the author.
7. Author manually copies the exported comments file into `feedback/webapp/incoming/`.
8. Codex or the author runs the local import command.
9. Codex later synthesizes the normalized batch into proposed tickets for author review.

If the author is using a local Google Drive-synced folder, copy exported files from that folder into `feedback/webapp/incoming/` before running the import script. The repository workflow does not depend on Google Drive APIs.

## Repository Silo

```text
feedback/webapp/
├── README.md
├── incoming/
├── raw/
├── normalized/
├── batches/
├── synthesis/
├── tickets/
├── processed/
└── schemas/
```

- `incoming/`: manual drop zone for exported `.json`, `.jsonl`, or `.md` app comment files.
- `raw/`: immutable archive of imported source files, grouped by batch. Never edit archived raw files.
- `normalized/`: deduplicated normalized comment records and the comment index.
- `batches/`: one directory per import batch, such as `2026-06-27-001/`.
- `synthesis/`: batch-level Codex analysis reports.
- `tickets/`: proposed actionable work items generated from comment batches.
- `processed/`: successfully imported source files moved here after archival/import confirmation.
- `schemas/`: expected comment and ticket shapes.

Each batch may contain:

- `manifest.yml`
- `normalized-comments.jsonl`
- `import-report.md`
- `duplicates.jsonl`
- `rejected-records.jsonl`

## Local Import

Place exported app comment files in:

```text
feedback/webapp/incoming/
```

Accepted file types:

- `.json`
- `.jsonl`
- `.md`

Run:

```sh
python3 scripts/import_webapp_comments.py
```

Then review:

```text
feedback/webapp/batches/<batch-id>/import-report.md
```

The importer:

- copies raw incoming files to `feedback/webapp/raw/<batch-id>/`
- normalizes parsed comments into `feedback/webapp/batches/<batch-id>/normalized-comments.jsonl`
- writes duplicates to `feedback/webapp/batches/<batch-id>/duplicates.jsonl`
- writes malformed or manual-review records to `feedback/webapp/batches/<batch-id>/rejected-records.jsonl`
- appends deduplicated comments to `feedback/webapp/normalized/comments.jsonl`
- updates `feedback/webapp/normalized/comments-index.md`
- moves imported source files to `feedback/webapp/processed/<batch-id>/`

The importer uses only Python standard library code. It does not call Google Drive APIs, OpenAI APIs, GitHub APIs, or any network service. It performs only lightweight deterministic classification.

## Later Batch Synthesis

After import, ask Codex:

```text
Process web-app comment batch <batch-id> into synthesis and proposed tickets.
```

Use the reusable prompt in:

```text
feedback/webapp/PROCESS_BATCH_PROMPT.md
```

Codex should create:

- `feedback/webapp/synthesis/<batch-id>-synthesis.md`
- proposed tickets under `feedback/webapp/tickets/<batch-id>/`

The author reviews one batch-level checkpoint, not every raw comment individually.

The checkpoint should summarize:

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

Tickets are still proposed work only. Do not apply tickets automatically to manuscript, bible, outline, chapter architecture, prose preservation, or `CONSISTENCY_QUEUE.md` unless the author explicitly approves that routing.

## Ticket Routing

- `CONSISTENCY_QUEUE.md`: contradictions, possible contradictions, chronology problems, ability/magic conflicts, knowledge-state problems, current-versus-future confusion, and prior document conflicts.
- Prose-preservation tickets: keep this line, near-quote this, preserve this image, this exchange works, do not reuse this prose, echo this later.
- Chapter-architecture tickets: chapter function, pacing, scene purpose, setup/payoff, reader confusion about chapter purpose, worldbuilding or plotline development.
- Story-bible-review tickets: unclear worldbuilding, character motivation, magic-system uncertainty, organization/location/object detail, or entity ownership.
- Revision-suggestion tickets: local chapter changes, possible cuts, possible expansions, prose clarity, or current-draft reader confusion.
- App-maintenance tickets: missing chapter, broken navigation, wrong layer, export problem, UI problem.

Reader comments do not override approved canon, approve exact prose reuse, authorize manuscript edits, or create durable revisions. Repeated comments increase salience but do not decide the fix.

## Google Apps Script Importer

`import-webapp-comments.gs` is a standalone Google Apps Script for pulling new comments from a Google Drive folder into a Google Sheet.

Use:

1. Open Google Apps Script.
2. Create a new script project.
3. Paste in `feedback/webapp/import-webapp-comments.gs`.
4. Set `CONFIG.folderId` to the Drive folder ID that contains exported `fractured-fate-comments-*.json` files.
5. Optionally set `CONFIG.spreadsheetId` to an existing Google Sheet. If left blank, the script creates `Fractured Fate Webapp Comments Inbox` on first run.
6. Run `importNewComments`.
7. Approve the requested Drive and Sheets permissions.

The importer deduplicates by exported comment `id`, so rerunning it only appends new comments. It does not modify the exported JSON files, call Codex, upload anything elsewhere, or treat comments as canon.

Utility functions:

- `getLastImportSummary()` returns the most recent import summary.
- `resetImportedCommentMemory()` clears the destination sheet and importer summary. Use carefully.

## Optional Web App Trigger

Use this when Codex or another external tool should trigger imports on demand.

Setup:

1. In Apps Script, run `setImportToken()`.
2. Copy the token from the execution log and store it somewhere private.
3. Click `Deploy` -> `New deployment`.
4. Select deployment type `Web app`.
5. Set `Execute as` to `Me`.
6. Set `Who has access` to `Anyone with the link`.
7. Deploy and copy the Web app URL.

Trigger manually from a shell:

```sh
curl -X POST 'WEB_APP_URL?token=YOUR_TOKEN'
```

The response is JSON with `ok: true` and the import summary, or `ok: false` and an error message.

To rotate access, run `rotateImportToken()`, save the new token, and stop using the old one.

Security note: do not share the token. Anyone with both the Web app URL and token can run the importer as the script owner.

## Optional Scheduled Import

If you do not need on-demand triggering, use an Apps Script time-driven trigger instead:

1. Open `Triggers`.
2. Add a trigger for `importNewComments`.
3. Choose a time-driven schedule.

This does not require Web app deployment or a token.

Suggested local run commands:

```sh
python3 scripts/build_review_app_data.py
python3 -m http.server 8787 -d docs
```

Then open:

```text
http://localhost:8787
```
