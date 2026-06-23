# Normalized Imports

Generated from `imports/raw/` DOCX files during Phase 2 source normalization.

Rules:

- Raw DOCX files remain the archival source of truth.
- These Markdown files are for search, provenance, review, and later entity inventory.
- Paragraph order is preserved from `word/document.xml`.
- Text is extracted from WordprocessingML without editorial rewriting.
- Markdown heading levels are mechanical mappings from DOCX paragraph styles, not story-structure decisions.
- Comment sidecars preserve comments when the source DOCX contains `word/comments.xml`.

Generated files:

- `melissa-copy.md` from `imports/raw/melissa-copy.docx`: 7585 paragraphs, 7136 non-empty text blocks, 113 comments detected.
- `book-1-outline.md` from `imports/raw/book-1-outline.docx`: 3763 paragraphs, 3027 non-empty text blocks, 0 comments detected.
- `bullet-notes.md` from `imports/raw/bullet-notes.docx`: 164 paragraphs, 95 non-empty text blocks, 0 comments detected.
- `melissa-copy.comments.md`: extracted comments and derived anchors for `melissa-copy.docx`.
