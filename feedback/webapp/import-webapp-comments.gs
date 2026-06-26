/**
 * Fractured Fate web-app comment importer.
 *
 * Paste this file into Google Apps Script, set CONFIG.folderId to the Drive
 * folder containing exported JSON comment files, then run importNewComments().
 *
 * The script reads every JSON file in the folder, deduplicates comments by
 * comment id, and appends new comments to a Google Sheet.
 */

const CONFIG = {
  // Required: Drive folder ID containing fractured-fate-comments-*.json files.
  folderId: "PASTE_GOOGLE_DRIVE_FOLDER_ID_HERE",

  // Optional: leave blank to create a new spreadsheet on first run.
  spreadsheetId: "",

  sheetName: "webapp-comments"
};

const COMMENT_COLUMNS = [
  "imported_at",
  "source_file_name",
  "source_file_id",
  "id",
  "created_at",
  "commenter_name",
  "reviewer_session_id",
  "repo_branch",
  "repo_commit",
  "app_version",
  "view_mode",
  "current_layer",
  "current_file_path",
  "chapter_id",
  "chapter_title",
  "source_line_start",
  "source_line_end",
  "current_heading",
  "selected_text",
  "approximate_scroll_percent",
  "comment_text",
  "status"
];

function doPost(e) {
  return handleWebImport_(e);
}

function doGet(e) {
  return handleWebImport_(e);
}

function setImportToken() {
  const token = Utilities.getUuid() + "-" + Utilities.getUuid();
  PropertiesService.getScriptProperties().setProperty("import_token", token);
  Logger.log("Import token created. Save this now: %s", token);
  return token;
}

function rotateImportToken() {
  return setImportToken();
}

function importNewComments() {
  const folder = DriveApp.getFolderById(CONFIG.folderId);
  const sheet = getOrCreateSheet_();
  ensureHeader_(sheet);

  const seenIds = getSeenCommentIds_(sheet);
  const files = folder.getFiles();
  const importedAt = new Date().toISOString();
  const rows = [];
  const processedFiles = [];

  while (files.hasNext()) {
    const file = files.next();
    if (!isJsonCommentExport_(file)) continue;

    const parsed = parseJsonFile_(file);
    const comments = extractComments_(parsed);
    let newCount = 0;

    for (const comment of comments) {
      if (!comment || !comment.id || seenIds.has(comment.id)) continue;
      rows.push(commentToRow_(comment, file, importedAt));
      seenIds.add(comment.id);
      newCount += 1;
    }

    processedFiles.push({
      name: file.getName(),
      id: file.getId(),
      newCount,
      totalCount: comments.length
    });
  }

  if (rows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, COMMENT_COLUMNS.length).setValues(rows);
  }

  PropertiesService.getScriptProperties().setProperty(
    "last_import_summary",
    JSON.stringify({
      imported_at: importedAt,
      new_comments: rows.length,
      processed_files: processedFiles
    })
  );

  Logger.log("Imported %s new comments from %s JSON files.", rows.length, processedFiles.length);
  return {
    new_comments: rows.length,
    processed_files: processedFiles
  };
}

function handleWebImport_(e) {
  try {
    assertAuthorized_(e);
    const result = importNewComments();
    return jsonResponse_({
      ok: true,
      result
    });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: error.message
    });
  }
}

function assertAuthorized_(e) {
  const expected = PropertiesService.getScriptProperties().getProperty("import_token");
  if (!expected) {
    throw new Error("Import token is not configured. Run setImportToken() first.");
  }

  const provided = e && e.parameter && e.parameter.token;
  if (!provided || provided !== expected) {
    throw new Error("Unauthorized import request.");
  }
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function resetImportedCommentMemory() {
  const sheet = getOrCreateSheet_();
  sheet.clear();
  ensureHeader_(sheet);
  PropertiesService.getScriptProperties().deleteProperty("last_import_summary");
  Logger.log("Cleared imported comment sheet and importer summary.");
}

function getLastImportSummary() {
  const value = PropertiesService.getScriptProperties().getProperty("last_import_summary");
  return value ? JSON.parse(value) : null;
}

function getOrCreateSheet_() {
  let spreadsheet;
  if (CONFIG.spreadsheetId) {
    spreadsheet = SpreadsheetApp.openById(CONFIG.spreadsheetId);
  } else {
    const props = PropertiesService.getScriptProperties();
    const existingId = props.getProperty("comments_spreadsheet_id");
    if (existingId) {
      spreadsheet = SpreadsheetApp.openById(existingId);
    } else {
      spreadsheet = SpreadsheetApp.create("Fractured Fate Webapp Comments Inbox");
      props.setProperty("comments_spreadsheet_id", spreadsheet.getId());
    }
  }

  let sheet = spreadsheet.getSheetByName(CONFIG.sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(CONFIG.sheetName);
  return sheet;
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COMMENT_COLUMNS);
    sheet.setFrozenRows(1);
    return;
  }

  const existing = sheet.getRange(1, 1, 1, COMMENT_COLUMNS.length).getValues()[0];
  const mismatch = COMMENT_COLUMNS.some((name, index) => existing[index] !== name);
  if (mismatch) {
    throw new Error("Sheet header does not match expected web-app comment schema.");
  }
}

function getSeenCommentIds_(sheet) {
  const seen = new Set();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return seen;

  const idColumn = COMMENT_COLUMNS.indexOf("id") + 1;
  const values = sheet.getRange(2, idColumn, lastRow - 1, 1).getValues();
  for (const [id] of values) {
    if (id) seen.add(String(id));
  }
  return seen;
}

function isJsonCommentExport_(file) {
  const name = file.getName();
  const mime = file.getMimeType();
  return name.toLowerCase().endsWith(".json") ||
    mime === MimeType.JSON ||
    mime === "application/json";
}

function parseJsonFile_(file) {
  try {
    return JSON.parse(file.getBlob().getDataAsString("UTF-8"));
  } catch (error) {
    throw new Error(`Could not parse JSON file ${file.getName()}: ${error.message}`);
  }
}

function extractComments_(parsed) {
  if (Array.isArray(parsed)) return parsed;
  if (parsed && Array.isArray(parsed.comments)) return parsed.comments;
  return [];
}

function commentToRow_(comment, file, importedAt) {
  const record = {
    imported_at: importedAt,
    source_file_name: file.getName(),
    source_file_id: file.getId(),
    id: comment.id || "",
    created_at: comment.created_at || "",
    commenter_name: comment.commenter_name || "",
    reviewer_session_id: comment.reviewer_session_id || "",
    repo_branch: comment.repo_branch || "",
    repo_commit: comment.repo_commit || "",
    app_version: comment.app_version || "",
    view_mode: comment.view_mode || "",
    current_layer: comment.current_layer || "",
    current_file_path: comment.current_file_path || "",
    chapter_id: comment.chapter_id || "",
    chapter_title: comment.chapter_title || "",
    source_line_start: comment.source_line_start || "",
    source_line_end: comment.source_line_end || "",
    current_heading: comment.current_heading || "",
    selected_text: comment.selected_text || "",
    approximate_scroll_percent: comment.approximate_scroll_percent ?? "",
    comment_text: comment.comment_text || "",
    status: comment.status || "inbox"
  };

  return COMMENT_COLUMNS.map((column) => record[column]);
}
