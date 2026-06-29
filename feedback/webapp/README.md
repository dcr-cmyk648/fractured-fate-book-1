# Web-App Feedback Workflow

The review app is a read-only interface for gathering portable comments. It does not upload to Google Drive, call Codex, call an AI model, write repository files, or treat comments as canon.

Web-app comments are inbox material.

They are not canon. They are not accepted revisions. They are not instructions to alter manuscript prose. They are not automatic story-bible decisions. They are not automatic prose-preservation approvals.

Comments must be imported, normalized, archived, synthesized, and converted into reviewable tickets or queue items before affecting durable book files.

Intended path:

1. Reader opens the local app or a future GitHub Pages version.
2. Reader enters a commenter name.
3. Reader reads prose in Reader Mode or, if authorized, uses Author Mode for repository files and other layers.
4. Reader submits comments using the fixed comment box, or the author captures contextless notes in Author Scratchpad.
5. Reader or author exports comments and scratchpad entries.
6. If comment sync is configured, reader enters a private reader code and clicks `Sync Comments`; Apps Script validates the code and writes submitted JSON to Google Drive.
7. If sync is not configured or fails, reader downloads backup JSON and sends the exported comments file to the author.
8. Author manually copies exported/submitted comment files into `feedback/webapp/incoming/` or authorizes Codex to pull the files from Drive.
9. Codex or the author runs the local import command.
10. Codex later synthesizes the normalized batch into proposed tickets for author review.

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

## Author Scratchpad Entries

The static app's Author Scratchpad replaces the old Bullet notes capture habit for quick notes. It does not create a separate notes database. Scratchpad entries are stored in the same browser `localStorage` collection as comments and export inside the same comment files.

Scratchpad entries use:

- `view_mode: scratchpad`
- `current_layer: author-scratchpad`
- `scratchpad_type: content` or `technical-processing`
- `initial_classification: scratchpad-content` or `scratchpad-technical`

`scratchpad-content` may later become a note inbox item, story-bible review item, candidate idea, future sequence note, chapter architecture issue, prose-preservation candidate, revision suggestion, or consistency-queue item.

`scratchpad-technical` may later become an app bug ticket, data-processing ticket, workflow ticket, export/import issue, or repository maintenance task.

Scratchpad entries remain inbox material until processed. They are not canon, accepted revisions, approved prose-preservation records, or instructions to edit manuscript prose.

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
- Scratchpad-content tickets: author-captured story, lore, character, outline, prose-preservation, revision, or consistency ideas pending routing.
- Scratchpad-technical tickets: author-captured app, workflow, data-processing, export/import, or repository-maintenance issues pending routing.

Reader comments do not override approved canon, approve exact prose reuse, authorize manuscript edits, or create durable revisions. Repeated comments increase salience but do not decide the fix.

## Google Apps Script Importer

`import-webapp-comments.gs` is a standalone Google Apps Script for pulling new comments from a Google Drive folder into a Google Sheet and for accepting submit-only comment sync from the static review app.

Use:

1. Open Google Apps Script.
2. Create a new script project.
3. Paste in `feedback/webapp/import-webapp-comments.gs`.
4. Set `CONFIG.folderId` to the Drive folder ID that contains exported `fractured-fate-comments-*.json` files.
5. Optionally set `CONFIG.spreadsheetId` to an existing Google Sheet. If left blank, the script creates `Fractured Fate Webapp Comments Inbox` on first run.
6. Run `importNewComments`.
7. Approve the requested Drive and Sheets permissions.

The importer deduplicates by exported comment `id`, so rerunning it only appends new comments. It does not modify the exported JSON files, call Codex, upload anything elsewhere, or treat comments as canon.

## Optional Submit-Only Comment Sync

The static app can submit comments directly to Apps Script when a reader has a private reader code.

Security model:

- No reader code, account list, token hash, or private Sheet ID belongs in GitHub.
- The public app may contain the Apps Script web app URL.
- The reader code is a bearer invite code stored in that reader's browser `localStorage`.
- Apps Script validates the reader code against private Script Properties.
- Sync is submit-only. The endpoint writes comments; it does not return prior comments or cross-device history.

Setup:

1. Paste the current `feedback/webapp/import-webapp-comments.gs` into Apps Script.
2. Preserve or set `CONFIG.folderId` to the Drive folder that should receive submitted comment JSON files.
3. Optionally set `CONFIG.submittedCommentsFolderId` if submitted files should go to a separate folder.
4. Add reader accounts temporarily under `CONFIG.readerAccounts`, for example:

```js
readerAccounts: [
  {
    reader_id: "reader-a",
    display_name: "Reader A",
    code: "long-private-random-code",
    active: true
  }
]
```

5. Run `installReaderAccountsFromConfig()` in Apps Script.
6. Confirm the execution log says the accounts were installed.
7. Remove plaintext `code` values from `CONFIG.readerAccounts` in Apps Script after installation.
8. Deploy a new web app version.
9. Give each reader their private code.

When the app calls the endpoint with `action: submit-comments`, Apps Script:

- validates the reader code
- deduplicates by comment `id` using the private Sheet
- appends new rows to the private Sheet
- writes a compatible submitted JSON file to Drive
- returns the accepted and duplicate counts

If sync fails, the reader should use `Download Backup JSON`.

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
