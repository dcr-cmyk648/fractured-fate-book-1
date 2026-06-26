# Web App Feedback Workflow

The review app is a read-only interface for gathering portable comments. It does not upload to Google Drive, call Codex, call an AI model, write repository files, or treat comments as canon.

Intended path:

1. Reader opens the local app or a future GitHub Pages version.
2. Reader enters a commenter name.
3. Reader reads prose in Reader Mode or, if authorized, uses Author Mode for repository files and other layers.
4. Reader submits comments using the fixed bottom comment box.
5. Reader exports comments as JSON.
6. Reader sends the exported comments file to the author.
7. Author uploads the comments file to Google Drive or places it in a repository feedback import location.
8. Codex later reads the exported file and converts comments into feedback records, consistency queue items, revision suggestions, chapter architecture issues, or story-bible review items according to the existing workflow.

Comment exports are inbox material. They require author/Codex review before any repository or story changes happen.

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
