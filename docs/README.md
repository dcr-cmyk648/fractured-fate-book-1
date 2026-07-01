# Fractured Fate Review App

This folder contains a static, read-only review interface for local use and possible future GitHub Pages publishing.

The repository remains the source of truth. The app only reads generated JSON data and stores reader comments in browser `localStorage` until synced or exported.

## Local Use

From the repository root:

```sh
python3 scripts/build_review_app_data.py
python3 -m http.server 8787 -d docs
```

Then open:

```text
http://localhost:8787
```

No npm install, backend, database, authentication, or AI call is required. Comment sync uses a Google Apps Script web app when configured; backup JSON export still works without it.

## What V0 Supports

- Book Reader with chapter navigation.
- Reader Mode by default, using prose-first display.
- Author Mode for repository browser and all generated layers.
- Scratchpad for reader or author notes, with `Content` and `Technical / Processing` tabs.
- Ticket Review in Author Mode, with current ticket browsing and ticket-anchored comments.
- Repository browser for readable generated project files.
- Layer selector with graceful unavailable-layer handling.
- Persistent comment box: right-side rail on desktop, collapsible drawer on mobile.
- Browser-local comment storage.
- Optional comment sync through the private Apps Script endpoint when a reader code is saved.
- Backup comment and scratchpad export as JSON.
- Last-export tracking with an option to export all entries or entries created since the last export.
- Clear local comments with confirmation.

## Scratchpad

The app includes a `Scratchpad` tab for quick capture. Use `Content` for story ideas, future beats, scene ideas, lore thoughts, character thoughts, outline ideas, prose fragments, questions, and anything that used to go into the Bullet notes Google Doc. Use `Technical / Processing` for app bugs, broken navigation, export/import problems, data-processing issues, workflow issues, Codex-processing notes, and UI ideas.

Scratchpad drafts autosave locally until submitted. Clicking `Save to Inbox` creates a comment-like inbox record in browser `localStorage`. Scratchpad entries export with ordinary comments and are not canon, accepted revisions, manuscript edits, or approved prose-preservation records.

## Comment Sync

The Comment Sync page supports a submit-only sync path for beta readers with private reader codes.

- The app stores the reader code only in that browser's `localStorage`.
- The static app does not contain reader secrets or account lists.
- Sync sends comments and scratchpad entries to the configured Apps Script endpoint.
- Apps Script validates the reader code privately and writes submitted comments to Google Drive / Sheets for later Codex import.
- A code configured as `role: "author"` in Apps Script is stamped as verified author input during sync. Other verified reader codes are treated as provisional outside-reader feedback.
- Author Mode is available only after the saved code has been validated as `role: "author"` by a successful sync confirmation. This is a UI gate, not cryptographic protection for published repository data.
- `Download Backup JSON` remains available if sync fails or a reader does not have a code.

Sync is submit-only. The app does not read prior comments back from Google Drive and does not provide cross-device comment history.

## Ticket Review

Author Mode includes `Ticket Review`, which lists generated web-app tickets from `feedback/webapp/tickets/index.md` and source-intake tickets from `feedback/source-intake/*/tickets.md`. Selecting a ticket changes the persistent comment target to that ticket, so comments submitted from the comment box export with `view_mode: ticket-review` and ticket metadata.

Ticket Review does not approve, reject, or apply tickets. It only provides a readable interface for author feedback that later returns through the normal comment intake workflow.

## Mobile Install

The app includes web-app metadata for mobile home-screen use.

On iPhone or iPad:

1. Open the GitHub Pages URL in Safari.
2. Tap the Share button.
3. Choose `Add to Home Screen`.
4. Accept the suggested name or rename it.
5. Open it from the new home-screen icon.

Reader Mode is the intended mobile default. The comment drawer stays collapsed until opened, and the detailed `Currently Seeing` reference is collapsed by default on small screens.

## Source and Data

Run `scripts/build_review_app_data.py` to regenerate:

- `docs/data/app-index.json`
- `docs/data/content.json`

The generator scans readable repository text from approved project areas such as `bible/`, `reviews/`, `planning/candidates/`, `outline/`, `revision/`, `decisions/`, `feedback/`, and `imports/normalized/`.

It does not scan `imports/raw/`, DOCX files, binary files, `.git/`, or app source files under `docs/`.

## GitHub Pages Note

The `docs/` folder is intended to be publishable through GitHub Pages later.

Warning: publishing this app may expose generated story files, outlines, candidates, spoilers, and private notes depending on what the generator includes. Review generated `docs/data/` before publishing.

Do not configure repository Pages settings from this app.

## Safety Rules

The app must not edit manuscript files, story-bible files, outline files, repository files, or generated source files. Comments are inbox material only and are not canon, accepted revisions, or repository changes.
