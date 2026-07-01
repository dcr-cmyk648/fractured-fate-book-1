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

  // Optional: Drive folder ID where direct app sync submissions should be written.
  // Leave blank to use folderId.
  submittedCommentsFolderId: "",

  // Direct app sync writes to the Sheet first. Leave this false unless the
  // deployed web app is confirmed to have Drive file-create permission.
  archiveDirectSyncFiles: false,

  // Optional: leave blank to create a new spreadsheet on first run.
  spreadsheetId: "",

  sheetName: "webapp-comments",

  // Optional setup helper input. Edit this in Apps Script, run
  // installReaderAccountsFromConfig(), then remove the plaintext codes here.
  // role is optional and defaults to "reader". Use role: "author" only for
  // trusted author codes; the role is stamped after code validation.
  readerAccounts: [
    // {
    //   reader_id: "reader-a",
    //   display_name: "Reader A",
    //   code: "PASTE_PRIVATE_READER_CODE_HERE",
    //   role: "reader",
    //   active: true
    // }
  ]
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
  "status",
  "commenter_role",
  "commenter_role_verified",
  "reader_id",
  "ticket_id",
  "ticket_title",
  "ticket_status",
  "ticket_type"
];

function doPost(e) {
  const payload = parsePostPayload_(e);
  if (payload && payload.action === "submit-comments") {
    return handleCommentSubmit_(payload);
  }
  return handleWebImport_(e);
}

function doGet(e) {
  if (e && e.parameter && e.parameter.action === "sync-status") {
    return handleSyncStatus_(e);
  }
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
  const spreadsheet = sheet.getParent();

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

function handleCommentSubmit_(payload) {
  try {
    const reader = validateReaderCode_(payload.reader_code);
    const exportPayload = payload.export_payload || {};
    const comments = extractComments_(exportPayload);
    const submitted = submitComments_(reader, exportPayload, comments, payload.submission_id);
    storeSyncStatus_(payload.submission_id, {
      ok: true,
      found: true,
      result: submitted
    });
    return jsonResponse_({
      ok: true,
      result: submitted
    });
  } catch (error) {
    if (payload && payload.submission_id) {
      storeSyncStatus_(payload.submission_id, {
        ok: false,
        found: true,
        error: error.message
      });
    }
    return jsonResponse_({
      ok: false,
      error: error.message
    });
  }
}

function submitComments_(reader, exportPayload, comments, submissionId) {
  const sheet = getOrCreateSheet_();
  ensureHeader_(sheet);
  const seenIds = getSeenCommentIds_(sheet);
  const importedAt = new Date().toISOString();
  const rows = [];
  const newComments = [];
  let duplicateCount = 0;

  for (const comment of comments) {
    if (!comment || !comment.id) continue;
    if (seenIds.has(comment.id)) {
      duplicateCount += 1;
      continue;
    }
    const stampedComment = stampVerifiedComment_(comment, reader);
    rows.push(commentToRow_(stampedComment, { getName: () => "direct-sync", getId: () => "" }, importedAt));
    seenIds.add(comment.id);
    newComments.push(stampedComment);
  }

  if (rows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, COMMENT_COLUMNS.length).setValues(rows);
  }

  let fileId = "";
  let fileName = "";
  let archiveError = "";
  if (newComments.length && CONFIG.archiveDirectSyncFiles) {
    try {
      const folder = DriveApp.getFolderById(CONFIG.submittedCommentsFolderId || CONFIG.folderId);
      fileName = submittedFileName_(reader);
      const storedPayload = {
        export_metadata: Object.assign({}, exportPayload.export_metadata || {}, {
          submitted_at: importedAt,
          submission_id: submissionId || "",
          submitted_by_reader_id: reader.reader_id,
          submitted_by_display_name: reader.display_name,
          submission_source: "review-app-direct-sync",
          comment_count: newComments.length
        }),
        comments: newComments
      };
      const blob = Utilities.newBlob(
        JSON.stringify(storedPayload, null, 2),
        "application/json",
        fileName
      );
      fileId = folder.createFile(blob).getId();
    } catch (error) {
      archiveError = error.message;
      fileName = "";
    }
  }

  return {
    reader: {
      reader_id: reader.reader_id,
      display_name: reader.display_name,
      role: reader.role
    },
    new_comments: newComments.length,
    duplicate_comments: duplicateCount,
    rows_written: rows.length,
    sheet_name: sheet.getName(),
    sheet_last_row: sheet.getLastRow(),
    submitted_file_id: fileId,
    submitted_file_name: fileName,
    archive_status: !newComments.length ? "ok" : (CONFIG.archiveDirectSyncFiles ? (fileId ? "ok" : "failed") : "disabled"),
    archive_error: archiveError
  };
}

function handleSyncStatus_(e) {
  const callback = e.parameter.callback || "callback";
  const submissionId = e.parameter.submission_id || "";
  if (!submissionId) {
    return jsonpResponse_(callback, {
      ok: false,
      found: false,
      error: "submission_id is required."
    });
  }

  const raw = PropertiesService.getScriptProperties().getProperty(`sync_status_${submissionId}`);
  if (!raw) {
    return jsonpResponse_(callback, {
      ok: true,
      found: false
    });
  }

  return jsonpResponse_(callback, JSON.parse(raw));
}

function storeSyncStatus_(submissionId, status) {
  if (!submissionId) return;
  PropertiesService.getScriptProperties().setProperty(
    `sync_status_${submissionId}`,
    JSON.stringify(Object.assign({}, status, {
      checked_at: new Date().toISOString()
    }))
  );
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

function parsePostPayload_(e) {
  if (!e) return null;

  if (e.parameter && e.parameter.action === "submit-comments") {
    let exportPayload = {};
    if (e.parameter.export_payload) {
      try {
        exportPayload = JSON.parse(e.parameter.export_payload);
      } catch (error) {
        throw new Error("Submitted export payload is not valid JSON.");
      }
    }
    return {
      action: e.parameter.action,
      submission_id: e.parameter.submission_id,
      reader_code: e.parameter.reader_code,
      export_payload: exportPayload
    };
  }

  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (error) {
      return null;
    }
  }

  return null;
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

function installReaderAccountsFromConfig() {
  const accounts = {};
  for (const account of CONFIG.readerAccounts || []) {
    if (!account.reader_id || !account.display_name || !account.code) {
      throw new Error("Every reader account needs reader_id, display_name, and code.");
    }
    accounts[account.reader_id] = {
      reader_id: account.reader_id,
      display_name: account.display_name,
      role: normalizedReaderRole_(account.role),
      token_hash: hashReaderCode_(account.code),
      active: account.active !== false
    };
  }
  PropertiesService.getScriptProperties().setProperty("reader_accounts_json", JSON.stringify(accounts));
  Logger.log("Installed %s reader account(s). Remove plaintext codes from CONFIG.readerAccounts after confirming setup.", Object.keys(accounts).length);
  return Object.keys(accounts);
}

function getReaderAccounts() {
  const raw = PropertiesService.getScriptProperties().getProperty("reader_accounts_json");
  return raw ? JSON.parse(raw) : {};
}

function validateReaderCode_(code) {
  if (!code) throw new Error("Reader code is required.");
  const tokenHash = hashReaderCode_(code);
  const accounts = getReaderAccounts();
  for (const readerId of Object.keys(accounts)) {
    const account = accounts[readerId];
    if (account && account.active !== false && account.token_hash === tokenHash) {
      return {
        reader_id: account.reader_id || readerId,
        display_name: account.display_name || readerId,
        role: normalizedReaderRole_(account.role)
      };
    }
  }
  throw new Error("Reader code is not valid.");
}

function normalizedReaderRole_(role) {
  return String(role || "reader").toLowerCase() === "author" ? "author" : "reader";
}

function stampVerifiedComment_(comment, reader) {
  return Object.assign({}, comment, {
    commenter_role: normalizedReaderRole_(reader.role),
    commenter_role_verified: true,
    reader_id: reader.reader_id || ""
  });
}

function hashReaderCode_(code) {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(code).trim(),
    Utilities.Charset.UTF_8
  );
  return bytes.map((byte) => {
    const value = byte < 0 ? byte + 256 : byte;
    return (`0${value.toString(16)}`).slice(-2);
  }).join("");
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonpResponse_(callback, payload) {
  const safeCallback = String(callback || "callback").replace(/[^\w$.]/g, "");
  return ContentService
    .createTextOutput(`${safeCallback}(${JSON.stringify(payload)});`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
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
  if (sheet.getMaxColumns() < COMMENT_COLUMNS.length) {
    sheet.insertColumnsAfter(
      sheet.getMaxColumns(),
      COMMENT_COLUMNS.length - sheet.getMaxColumns()
    );
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COMMENT_COLUMNS);
    sheet.setFrozenRows(1);
    return;
  }

  const existingWidth = Math.max(sheet.getLastColumn(), COMMENT_COLUMNS.length);
  const existing = sheet.getRange(1, 1, 1, existingWidth).getValues()[0].filter((value) => value !== "");
  const prefixMatches = existing.every((name, index) => COMMENT_COLUMNS[index] === name);
  if (!prefixMatches) {
    throw new Error("Sheet header does not match expected web-app comment schema.");
  }
  if (existing.length < COMMENT_COLUMNS.length) {
    const missing = COMMENT_COLUMNS.slice(existing.length);
    sheet.getRange(1, existing.length + 1, 1, missing.length).setValues([missing]);
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

function submittedFileName_(reader) {
  const safeName = String(reader.reader_id || "reader")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "reader";
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd-HHmmss");
  return `fractured-fate-submitted-comments-${safeName}-${stamp}.json`;
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
    ticket_id: comment.ticket_id || "",
    ticket_title: comment.ticket_title || "",
    ticket_status: comment.ticket_status || "",
    ticket_type: comment.ticket_type || "",
    selected_text: comment.selected_text || "",
    approximate_scroll_percent: comment.approximate_scroll_percent ?? "",
    comment_text: comment.comment_text || "",
    status: comment.status || "inbox",
    commenter_role: comment.commenter_role || "",
    commenter_role_verified: comment.commenter_role_verified === true ? "true" : "",
    reader_id: comment.reader_id || ""
  };

  return COMMENT_COLUMNS.map((column) => record[column]);
}
