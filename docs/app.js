const APP_VERSION = "review-interface-v0";
const STORAGE_KEYS = {
  commenter: "ffReview.commenterName",
  session: "ffReview.sessionId",
  comments: "ffReview.comments"
};

let appIndex = null;
let appContent = null;
let comments = [];
let currentView = "book-reader";
let currentMode = "reader";
let currentChapterId = null;
let currentLayer = "prose";
let currentFilePath = null;

const $ = (id) => document.getElementById(id);

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugName(value) {
  return String(value || "reader")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "reader";
}

function timestampForFile() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
}

function getCommenterName() {
  return localStorage.getItem(STORAGE_KEYS.commenter) || "";
}

function setCommenterName(name) {
  localStorage.setItem(STORAGE_KEYS.commenter, name.trim());
  $("commenterName").textContent = name.trim() || "Unset";
}

function getSessionId() {
  let id = localStorage.getItem(STORAGE_KEYS.session);
  if (!id) {
    id = `session-${crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36)}`;
    localStorage.setItem(STORAGE_KEYS.session, id);
  }
  return id;
}

function loadComments() {
  try {
    comments = JSON.parse(localStorage.getItem(STORAGE_KEYS.comments) || "[]");
    if (!Array.isArray(comments)) comments = [];
  } catch {
    comments = [];
  }
}

function saveComments() {
  localStorage.setItem(STORAGE_KEYS.comments, JSON.stringify(comments));
  renderCommentCount();
  renderCommentList();
}

function promptForName(force = false) {
  const existing = getCommenterName();
  if (existing && !force) {
    setCommenterName(existing);
    return;
  }
  const name = window.prompt("Enter commenter name", existing || "");
  if (name && name.trim()) {
    setCommenterName(name);
  } else if (!existing) {
    setCommenterName("Reader");
  }
}

async function loadData() {
  const [indexResponse, contentResponse] = await Promise.all([
    fetch("data/app-index.json"),
    fetch("data/content.json")
  ]);
  if (!indexResponse.ok || !contentResponse.ok) {
    throw new Error("Could not load generated app data. Run scripts/build_review_app_data.py first.");
  }
  appIndex = await indexResponse.json();
  appContent = await contentResponse.json();
}

function setView(view) {
  currentView = view;
  $("bookReaderView").classList.toggle("active", view === "book-reader");
  $("repoBrowserView").classList.toggle("active", view === "repo-browser");
  $("exportView").classList.toggle("active", view === "export");
  $("readerNavBtn").classList.toggle("active", view === "book-reader");
  $("browserNavBtn").classList.toggle("active", view === "repo-browser");
  $("exportNavBtn").classList.toggle("active", view === "export");
  updateTargetDisplay();
  if (view === "export") renderCommentList();
}

function setMode(mode) {
  currentMode = mode;
  $("readerModeBtn").classList.toggle("active", mode === "reader");
  $("authorModeBtn").classList.toggle("active", mode === "author");
  $("browserNavBtn").disabled = mode === "reader";
  if (mode === "reader" && currentView === "repo-browser") {
    setView("book-reader");
  }
}

function renderMetadata() {
  const meta = appIndex.metadata || {};
  const commit = meta.commit_hash ? meta.commit_hash.slice(0, 7) : "unknown";
  $("repoMeta").textContent = `Branch ${meta.branch || "unknown"} · Commit ${commit}`;
  if (appIndex.warnings?.length) {
    $("warningsPanel").classList.remove("hidden");
    $("warningsPanel").innerHTML = appIndex.warnings.map(escapeHtml).join("<br>");
  }
}

function renderChapters() {
  const select = $("chapterSelect");
  select.innerHTML = "";
  for (const chapter of appIndex.chapters || []) {
    const option = document.createElement("option");
    option.value = chapter.chapter_id;
    option.textContent = chapter.display_title;
    select.appendChild(option);
  }
  if (appIndex.chapters?.length) {
    currentChapterId = appIndex.chapters[0].chapter_id;
    select.value = currentChapterId;
    renderLayerSelect();
    renderChapter();
  } else {
    $("readerContent").innerHTML = `<p>No chapters are available. Run the data generator and check docs/data/app-index.json warnings.</p>`;
  }
}

function currentChapter() {
  return (appIndex.chapters || []).find((chapter) => chapter.chapter_id === currentChapterId);
}

function renderLayerSelect() {
  const chapter = currentChapter();
  const select = $("layerSelect");
  select.innerHTML = "";
  if (!chapter) return;
  for (const layer of chapter.available_layers) {
    const option = document.createElement("option");
    option.value = layer.key;
    option.textContent = layer.available ? layer.label : `${layer.label} (unavailable)`;
    select.appendChild(option);
  }
  const prose = chapter.available_layers.find((layer) => layer.key === "prose" && layer.available);
  if (!chapter.available_layers.some((layer) => layer.key === currentLayer && layer.available)) {
    currentLayer = prose ? "prose" : chapter.available_layers[0]?.key || "prose";
  }
  select.value = currentLayer;
}

function basicMarkdownToHtml(text) {
  const lines = String(text || "").split("\n");
  const output = [];
  let inList = false;
  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (heading) {
      if (inList) {
        output.push("</ul>");
        inList = false;
      }
      const level = Math.min(heading[1].length, 4);
      output.push(`<h${level}>${escapeHtml(heading[2])}</h${level}>`);
    } else if (bullet) {
      if (!inList) {
        output.push("<ul>");
        inList = true;
      }
      output.push(`<li>${escapeHtml(bullet[1])}</li>`);
    } else if (!line.trim()) {
      if (inList) {
        output.push("</ul>");
        inList = false;
      }
      output.push("");
    } else {
      if (inList) {
        output.push("</ul>");
        inList = false;
      }
      output.push(`<p>${escapeHtml(line)}</p>`);
    }
  }
  if (inList) output.push("</ul>");
  return output.join("\n");
}

function renderChapter() {
  const chapter = currentChapter();
  if (!chapter) return;
  const layer = chapter.available_layers.find((item) => item.key === currentLayer);
  $("chapterSelect").value = chapter.chapter_id;
  renderLayerSelect();
  const contentPanel = $("readerContent");
  contentPanel.classList.toggle("prose", currentLayer === "prose");
  contentPanel.classList.toggle("code-like", currentLayer !== "prose");
  $("readerPath").textContent = chapter.source_file || "";
  $("readerLines").textContent = `Lines ${chapter.source_line_start || "?"}-${chapter.source_line_end || "?"}`;

  if (!layer?.available) {
    contentPanel.innerHTML = `<p>This layer is not available for ${escapeHtml(chapter.display_title)}.</p>`;
    currentFilePath = chapter.source_file;
    updateTargetDisplay();
    return;
  }

  let text = "";
  if (currentLayer === "prose") {
    text = appContent.chapters?.[chapter.chapter_id]?.prose?.content || "";
    currentFilePath = chapter.source_file;
  } else if (layer.source_file && appContent.files?.[layer.source_file]) {
    text = appContent.files[layer.source_file].content || "";
    currentFilePath = layer.source_file;
  }
  contentPanel.innerHTML = currentLayer === "prose" ? basicMarkdownToHtml(text) : renderLines(text, 1);
  updateTargetDisplay();
}

function chapterStep(delta) {
  const chapters = appIndex.chapters || [];
  const index = chapters.findIndex((chapter) => chapter.chapter_id === currentChapterId);
  const next = chapters[index + delta];
  if (!next) return;
  currentChapterId = next.chapter_id;
  currentLayer = "prose";
  renderLayerSelect();
  renderChapter();
}

function renderTreeNode(node) {
  if (node.type === "file") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tree-file";
    button.textContent = node.name;
    button.title = node.path;
    button.dataset.path = node.path;
    button.addEventListener("click", () => renderFile(node.path));
    return button;
  }
  const details = document.createElement("details");
  details.className = "tree-folder";
  if (!node.name) details.open = true;
  const summary = document.createElement("summary");
  summary.textContent = node.name || "Repository";
  details.appendChild(summary);
  const children = document.createElement("div");
  children.className = "tree-children";
  for (const child of node.children || []) {
    children.appendChild(renderTreeNode(child));
  }
  details.appendChild(children);
  return details;
}

function renderFileTree() {
  $("fileTree").innerHTML = "";
  $("fileTree").appendChild(renderTreeNode(appIndex.file_tree));
}

function renderLines(text, startLine = 1) {
  return String(text || "")
    .split("\n")
    .map((line, index) => {
      const number = startLine + index;
      return `<div class="line"><span class="line-number">${number}</span><span class="line-text">${escapeHtml(line)}</span></div>`;
    })
    .join("");
}

function renderFile(path) {
  const file = appContent.files?.[path];
  if (!file) return;
  currentFilePath = path;
  currentLayer = "repository-file";
  $("filePath").textContent = `${path} · ${file.line_count} lines`;
  $("fileBadge").textContent = file.category;
  $("fileBadge").className = `badge ${file.category.includes("candidate") ? "candidate" : file.category.includes("prose") ? "prose" : file.category.includes("review") ? "review" : ""}`;
  $("fileContent").innerHTML = renderLines(file.content, 1);
  document.querySelectorAll(".tree-file").forEach((button) => {
    button.classList.toggle("active", button.dataset.path === path);
  });
  updateTargetDisplay();
}

function approximateScrollPercent() {
  const activeContent = currentView === "repo-browser" ? $("fileContent") : $("readerContent");
  const max = activeContent.scrollHeight - activeContent.clientHeight;
  if (max <= 0) return 0;
  return Math.round((activeContent.scrollTop / max) * 100);
}

function currentHeading() {
  if (currentView === "repo-browser" && currentFilePath) {
    const file = appContent.files?.[currentFilePath];
    return file?.headings?.[0]?.text || null;
  }
  const chapter = currentChapter();
  return chapter?.display_title || null;
}

function selectedText() {
  const text = window.getSelection()?.toString() || "";
  return text.trim().slice(0, 4000);
}

function currentReference() {
  const chapter = currentView === "book-reader" ? currentChapter() : null;
  const meta = appIndex.metadata || {};
  return {
    repo_commit: meta.commit_hash || null,
    repo_branch: meta.branch || null,
    app_version: APP_VERSION,
    view_mode: currentView,
    current_layer: currentLayer,
    current_file_path: currentFilePath,
    chapter_id: chapter?.chapter_id || null,
    chapter_title: chapter?.display_title || null,
    source_line_start: chapter?.source_line_start || null,
    source_line_end: chapter?.source_line_end || null,
    current_heading: currentHeading(),
    selected_text: selectedText(),
    approximate_scroll_percent: approximateScrollPercent()
  };
}

function updateTargetDisplay() {
  const ref = currentReference();
  const target = ref.chapter_title
    ? `${ref.chapter_title} · ${ref.current_layer}`
    : ref.current_file_path || "No target";
  $("commentTarget").textContent = target;
}

function renderCommentCount() {
  const count = comments.length;
  $("commentCount").textContent = `${count} comment${count === 1 ? "" : "s"}`;
}

function submitComment() {
  const text = $("commentText").value.trim();
  if (!text) return;
  const commenter = getCommenterName() || "Reader";
  const record = {
    id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    created_at: new Date().toISOString(),
    commenter_name: commenter,
    reviewer_session_id: getSessionId(),
    ...currentReference(),
    comment_text: text,
    status: "inbox"
  };
  comments.push(record);
  $("commentText").value = "";
  saveComments();
}

function exportMetadata() {
  return {
    exported_at: new Date().toISOString(),
    app_version: APP_VERSION,
    commenter_name: getCommenterName() || "Reader",
    reviewer_session_id: getSessionId(),
    repo_branch: appIndex.metadata?.branch || null,
    repo_commit: appIndex.metadata?.commit_hash || null,
    comment_count: comments.length
  };
}

function exportPayload() {
  return {
    export_metadata: exportMetadata(),
    comments
  };
}

function download(filename, mimeType, body) {
  const blob = new Blob([body], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportJson() {
  const name = slugName(getCommenterName());
  download(
    `fractured-fate-comments-${name}-${timestampForFile()}.json`,
    "application/json",
    JSON.stringify(exportPayload(), null, 2)
  );
}

function exportJsonl() {
  const name = slugName(getCommenterName());
  const body = comments.map((comment) => JSON.stringify(comment)).join("\n") + (comments.length ? "\n" : "");
  download(
    `fractured-fate-comments-${name}-${timestampForFile()}.jsonl`,
    "application/x-ndjson",
    body
  );
}

function markdownGroupKey(comment) {
  return comment.chapter_title || comment.current_file_path || "Unanchored";
}

function exportMarkdown() {
  const name = slugName(getCommenterName());
  const groups = new Map();
  for (const comment of comments) {
    const key = markdownGroupKey(comment);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(comment);
  }
  const lines = [
    "# Fractured Fate Comments",
    "",
    `- Exported at: ${exportMetadata().exported_at}`,
    `- Commenter: ${getCommenterName() || "Reader"}`,
    `- Repo branch: ${appIndex.metadata?.branch || "unknown"}`,
    `- Repo commit: ${appIndex.metadata?.commit_hash || "unknown"}`,
    `- Comment count: ${comments.length}`,
    ""
  ];
  for (const [key, group] of groups) {
    lines.push(`## ${key}`, "");
    for (const comment of group) {
      lines.push(`### ${comment.created_at}`);
      lines.push("");
      lines.push(`- Layer: ${comment.current_layer || ""}`);
      lines.push(`- File: ${comment.current_file_path || ""}`);
      if (comment.chapter_id) lines.push(`- Chapter ID: ${comment.chapter_id}`);
      if (comment.source_line_start) lines.push(`- Lines: ${comment.source_line_start}-${comment.source_line_end}`);
      if (comment.approximate_scroll_percent !== null) lines.push(`- Scroll: ${comment.approximate_scroll_percent}%`);
      if (comment.selected_text) {
        lines.push("- Selected text:");
        lines.push("");
        lines.push("> " + comment.selected_text.replace(/\n/g, "\n> "));
        lines.push("");
      }
      lines.push(comment.comment_text);
      lines.push("");
    }
  }
  download(
    `fractured-fate-comments-${name}-${timestampForFile()}.md`,
    "text/markdown",
    lines.join("\n")
  );
}

function importJsonFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      const imported = Array.isArray(parsed) ? parsed : parsed.comments;
      if (!Array.isArray(imported)) throw new Error("No comments array found.");
      const existing = new Set(comments.map((comment) => comment.id));
      for (const comment of imported) {
        if (comment?.id && !existing.has(comment.id)) {
          comments.push(comment);
          existing.add(comment.id);
        }
      }
      saveComments();
      window.alert(`Imported ${imported.length} comments. Duplicate IDs were skipped.`);
    } catch (error) {
      window.alert(`Import failed: ${error.message}`);
    }
  };
  reader.readAsText(file);
}

function clearComments() {
  if (!comments.length) return;
  if (window.confirm("Clear all comments stored in this browser? Export first if you need to keep them.")) {
    comments = [];
    saveComments();
  }
}

function renderCommentList() {
  const list = $("commentList");
  if (!list) return;
  if (!comments.length) {
    list.innerHTML = "<p>No local comments yet.</p>";
    return;
  }
  list.innerHTML = comments
    .slice()
    .reverse()
    .map((comment) => {
      const target = comment.chapter_title || comment.current_file_path || "No target";
      return `<article class="comment-card">
        <strong>${escapeHtml(target)}</strong>
        <div class="content-meta">
          <span>${escapeHtml(comment.commenter_name)} · ${escapeHtml(comment.created_at)}</span>
          <span>${escapeHtml(comment.current_layer || "")}</span>
        </div>
        <p>${escapeHtml(comment.comment_text)}</p>
      </article>`;
    })
    .join("");
}

function wireEvents() {
  $("changeNameBtn").addEventListener("click", () => promptForName(true));
  $("readerNavBtn").addEventListener("click", () => setView("book-reader"));
  $("browserNavBtn").addEventListener("click", () => setView("repo-browser"));
  $("exportNavBtn").addEventListener("click", () => setView("export"));
  $("readerModeBtn").addEventListener("click", () => setMode("reader"));
  $("authorModeBtn").addEventListener("click", () => setMode("author"));
  $("chapterSelect").addEventListener("change", (event) => {
    currentChapterId = event.target.value;
    currentLayer = "prose";
    renderLayerSelect();
    renderChapter();
  });
  $("layerSelect").addEventListener("change", (event) => {
    currentLayer = event.target.value;
    renderChapter();
  });
  $("prevChapterBtn").addEventListener("click", () => chapterStep(-1));
  $("nextChapterBtn").addEventListener("click", () => chapterStep(1));
  $("submitCommentBtn").addEventListener("click", submitComment);
  $("quickExportBtn").addEventListener("click", () => setView("export"));
  $("exportJsonBtn").addEventListener("click", exportJson);
  $("exportJsonlBtn").addEventListener("click", exportJsonl);
  $("exportMarkdownBtn").addEventListener("click", exportMarkdown);
  $("clearCommentsBtn").addEventListener("click", clearComments);
  $("importFileInput").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importJsonFile(file);
    event.target.value = "";
  });
  document.addEventListener("selectionchange", updateTargetDisplay);
}

async function init() {
  promptForName();
  getSessionId();
  loadComments();
  wireEvents();
  try {
    await loadData();
  } catch (error) {
    $("warningsPanel").classList.remove("hidden");
    $("warningsPanel").textContent = error.message;
    return;
  }
  renderMetadata();
  renderChapters();
  renderFileTree();
  setMode("reader");
  setView("book-reader");
  renderCommentCount();
  renderCommentList();
}

init();
