# Fractured Fate Review App

This folder contains a static, read-only review interface for local use and possible future GitHub Pages publishing.

The repository remains the source of truth. The app only reads generated JSON data and stores reader comments in browser `localStorage` until exported.

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

No npm install, backend, database, authentication, AI call, or Google Drive connection is required.

## What V0 Supports

- Book Reader with chapter navigation.
- Reader Mode by default, using prose-first display.
- Author Mode for repository browser and all generated layers.
- Repository browser for readable generated project files.
- Layer selector with graceful unavailable-layer handling.
- Persistent bottom comment box.
- Browser-local comment storage.
- Comment export as JSON, JSONL, or Markdown.
- Comment import from exported JSON.
- Clear local comments with confirmation.

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
