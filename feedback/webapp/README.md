# Web App Feedback Workflow

The review app is a read-only interface for gathering portable comments. It does not upload to Google Drive, call Codex, call an AI model, write repository files, or treat comments as canon.

Intended path:

1. Reader opens the local app or a future GitHub Pages version.
2. Reader enters a commenter name.
3. Reader reads prose in Reader Mode or, if authorized, uses Author Mode for repository files and other layers.
4. Reader submits comments using the fixed bottom comment box.
5. Reader exports comments as JSON, JSONL, or Markdown.
6. Reader sends the exported comments file to the author.
7. Author uploads the comments file to Google Drive or places it in a repository feedback import location.
8. Codex later reads the exported file and converts comments into feedback records, consistency queue items, revision suggestions, chapter architecture issues, or story-bible review items according to the existing workflow.

Comment exports are inbox material. They require author/Codex review before any repository or story changes happen.

Suggested local run commands:

```sh
python3 scripts/build_review_app_data.py
python3 -m http.server 8787 -d docs
```

Then open:

```text
http://localhost:8787
```
