const APP_VERSION = "review-interface-v0-sync-27";
const COMMENT_SYNC_ENDPOINT = "https://script.google.com/macros/s/AKfycbyoyiKDqVWZC07BHVmj-XRL3DRXAUYdYRqQpNI1bPi1sUD3ijzSQyTPHWzdnPm5022z/exec";
const STORAGE_KEYS = {
  commenter: "ffReview.commenterName",
  session: "ffReview.sessionId",
  comments: "ffReview.comments",
  bookmark: "ffReview.bookmark",
  mode: "ffReview.mode",
  view: "ffReview.view",
  chapter: "ffReview.chapterId",
  layer: "ffReview.layer",
  file: "ffReview.filePath",
  ticket: "ffReview.ticketId",
  scratchpadTab: "ffReview.scratchpadTab",
  scratchpadContentDraft: "ffReview.scratchpad.contentDraft",
  scratchpadTechDraft: "ffReview.scratchpad.techDraft",
  scroll: "ffReview.scrollPercent",
  lastExportAt: "ffReview.lastExport.generatedAt",
  lastExportCount: "ffReview.lastExport.commentCount",
  lastExportLatestCreatedAt: "ffReview.lastExport.latestCommentCreatedAt",
  lastExportFormat: "ffReview.lastExport.format",
  readerCode: "ffReview.readerCode",
  readerCodeValidatedAt: "ffReview.readerCode.validatedAt",
  readerCodeDisplayName: "ffReview.readerCode.displayName",
  readerCodeRole: "ffReview.readerCode.role",
  lastSyncAt: "ffReview.lastSync.generatedAt",
  lastSyncCount: "ffReview.lastSync.commentCount",
  lastSyncLatestCreatedAt: "ffReview.lastSync.latestCommentCreatedAt"
};

let appIndex = null;
let appContent = null;
let comments = [];
let currentView = "book-reader";
let currentMode = "reader";
let currentChapterId = null;
let currentLayer = "prose";
let currentFilePath = null;
let currentTicketId = null;
let currentScratchpadTab = "content";
let browserTreeOpen = false;
let readerControlsOpen = false;
let scrollSaveTimer = null;
let viewportResizeTimer = null;

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
  const commenter = $("commenterName")?.closest(".commenter");
  if (commenter) commenter.hidden = !name.trim();
  $("commenterName").textContent = name.trim() || "Unset";
}

function renderCommenterName() {
  const name = getCommenterName();
  const commenter = $("commenterName")?.closest(".commenter");
  if (commenter) commenter.hidden = !name;
  $("commenterName").textContent = name;
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
  renderScratchpadUi();
  renderExportStatus();
}

function loadBookmark() {
  try {
    const bookmark = JSON.parse(localStorage.getItem(STORAGE_KEYS.bookmark) || "null");
    return bookmark && typeof bookmark === "object" ? bookmark : null;
  } catch {
    return null;
  }
}

function bookmarkLabel(bookmark = loadBookmark()) {
  if (!bookmark) return "No bookmark";
  if (bookmark.chapter_title) return abbreviate(bookmark.chapter_title, 34);
  if (bookmark.current_file_path) return abbreviate(bookmark.current_file_path, 34);
  return "Saved place";
}

function renderBookmarkStatus() {
  $("resumeBookmarkBtn").title = bookmarkLabel();
}

function promptForBackupName() {
  const existing = getCommenterName();
  if (existing) return existing;
  const name = window.prompt("Enter commenter name for this backup export", "");
  if (name && name.trim()) {
    setCommenterName(name);
    return name.trim();
  }
  return "Reader";
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
  if (view === "repo-browser" && currentMode === "reader") view = "book-reader";
  if (view === "ticket-review" && currentMode === "reader") view = "book-reader";
  currentView = view;
  localStorage.setItem(STORAGE_KEYS.view, view);
  document.body.classList.toggle("view-reader", view === "book-reader");
  document.body.classList.toggle("view-browser", view === "repo-browser");
  document.body.classList.toggle("view-ticket-review", view === "ticket-review");
  document.body.classList.toggle("view-export", view === "export");
  document.body.classList.toggle("view-scratchpad", view === "scratchpad");
  $("bookReaderView").classList.toggle("active", view === "book-reader");
  $("repoBrowserView").classList.toggle("active", view === "repo-browser");
  $("ticketReviewView").classList.toggle("active", view === "ticket-review");
  $("exportView").classList.toggle("active", view === "export");
  $("scratchpadView").classList.toggle("active", view === "scratchpad");
  $("readerNavBtn").classList.toggle("active", view === "book-reader");
  $("browserNavBtn").classList.toggle("active", view === "repo-browser");
  $("ticketsNavBtn").classList.toggle("active", view === "ticket-review");
  $("scratchpadNavBtn").classList.toggle("active", view === "scratchpad");
  $("exportNavBtn").classList.toggle("active", view === "export");
  updateTargetDisplay();
  if (view === "book-reader") syncMobileReaderUi();
  if (view === "export") renderCommentList();
  if (view === "repo-browser") syncMobileBrowserUi();
  if (view === "ticket-review") renderTicketReview();
  if (view === "scratchpad") renderScratchpadUi();
}

function saveReaderState() {
  localStorage.setItem(STORAGE_KEYS.mode, currentMode);
  if (currentChapterId) localStorage.setItem(STORAGE_KEYS.chapter, currentChapterId);
  if (currentLayer) localStorage.setItem(STORAGE_KEYS.layer, currentLayer);
}

function setMode(mode) {
  if (mode === "author" && !hasVerifiedAuthorCode()) {
    currentMode = "reader";
    localStorage.setItem(STORAGE_KEYS.mode, "reader");
    setView("export");
    renderExportStatus();
    return;
  }
  currentMode = mode;
  localStorage.setItem(STORAGE_KEYS.mode, mode);
  document.body.classList.toggle("mode-reader", mode === "reader");
  document.body.classList.toggle("mode-author", mode === "author");
  $("browserNavBtn").disabled = mode === "reader";
  $("ticketsNavBtn").disabled = mode === "reader";
  $("modeStatus").textContent = mode === "reader"
    ? "Reader access active."
    : "Author access active.";
  if (mode === "reader" && currentLayer !== "prose") {
    currentLayer = "prose";
    localStorage.setItem(STORAGE_KEYS.layer, currentLayer);
  }
  if (mode === "reader" && (currentView === "repo-browser" || currentView === "ticket-review")) {
    setView("book-reader");
  }
  if (!appIndex) return;
  if (currentView === "book-reader") {
    renderLayerSelect();
    renderChapter();
  }
}

function hasVerifiedAuthorCode() {
  return Boolean(localStorage.getItem(STORAGE_KEYS.readerCodeValidatedAt)) &&
    localStorage.getItem(STORAGE_KEYS.readerCodeRole) === "author";
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
    const savedChapter = localStorage.getItem(STORAGE_KEYS.chapter);
    const savedLayer = localStorage.getItem(STORAGE_KEYS.layer);
    currentChapterId = (appIndex.chapters || []).some((chapter) => chapter.chapter_id === savedChapter)
      ? savedChapter
      : appIndex.chapters[0].chapter_id;
    if (savedLayer) currentLayer = savedLayer;
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
  $("layerControl").hidden = currentMode === "reader";
  select.innerHTML = "";
  if (!chapter) return;
  const visibleLayers = currentMode === "reader"
    ? chapter.available_layers.filter((layer) => layer.key === "prose")
    : chapter.available_layers.filter((layer) => layer.available);
  for (const layer of visibleLayers) {
    const option = document.createElement("option");
    option.value = layer.key;
    option.textContent = layer.label;
    select.appendChild(option);
  }
  const prose = chapter.available_layers.find((layer) => layer.key === "prose" && layer.available);
  if (!visibleLayers.some((layer) => layer.key === currentLayer && layer.available)) {
    const firstAvailable = visibleLayers.find((layer) => layer.available);
    currentLayer = prose ? "prose" : firstAvailable?.key || chapter.available_layers[0]?.key || "prose";
  }
  select.value = currentLayer;
  saveReaderState();
}

function normalizeProseText(text) {
  const lines = String(text || "").split("\n");
  const output = [];
  let pending = [];

  const flush = () => {
    if (!pending.length) return;
    output.push(pending.join(" ").replace(/\s+/g, " ").trim());
    pending = [];
  };

  for (const rawLine of lines) {
    const line = rawLine
      .replace(/<!--\s*comment-(?:start|end|ref):\d+\s*-->/g, "")
      .replace(/<!--\s*paragraph:[\s\S]*?-->/g, "")
      .replace(/<!--\s*[\s\S]*?-->/g, "")
      .trim();
    if (!line) {
      flush();
      output.push("");
      continue;
    }
    if (/^<!--.*-->$/.test(line)) continue;
    if (/^\[(?:comment|note|todo|anchor|bookmark)\b/i.test(line)) continue;
    if (/^#\s+/.test(line) && !/^##\s+/.test(line)) continue;
    if (/^##\s+/.test(line)) {
      flush();
      output.push(line);
      continue;
    }
    if (/^[-*_]{3,}$/.test(line)) {
      flush();
      output.push("---");
      continue;
    }
    pending.push(line);
  }
  flush();
  return output.join("\n");
}

function basicMarkdownToHtml(text, options = {}) {
  const raw = options.prose ? normalizeProseText(text) : normalizeRepositoryText(text);
  const source = String(raw || "");
  const lines = source.split("\n");
  const output = [];
  let inList = false;
  let inTable = false;
  const closeBlocks = () => {
    if (inList) {
      output.push("</ul>");
      inList = false;
    }
    if (inTable) {
      output.push("</tbody></table>");
      inTable = false;
    }
  };
  for (const [index, rawLine] of lines.entries()) {
    const line = rawLine.trimEnd();
    const sourceLine = index + 1;
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    const bullet = line.match(/^[-*]\s+(.+)$/);
    const tableCells = tableCellsFor(line);
    if (heading) {
      closeBlocks();
      const level = Math.min(heading[1].length, 4);
      output.push(`<h${level} data-source-line="${sourceLine}">${inlineMarkdown(heading[2])}</h${level}>`);
    } else if (tableCells) {
      if (inList) {
        output.push("</ul>");
        inList = false;
      }
      if (!inTable) {
        output.push("<table><tbody>");
        inTable = true;
      }
      output.push(`<tr data-source-line="${sourceLine}">${tableCells.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`);
    } else if (bullet) {
      if (inTable) {
        output.push("</tbody></table>");
        inTable = false;
      }
      if (!inList) {
        output.push("<ul>");
        inList = true;
      }
      output.push(`<li data-source-line="${sourceLine}">${inlineMarkdown(bullet[1])}</li>`);
    } else if (line.trim() === "---") {
      closeBlocks();
      output.push("<hr>");
    } else if (!line.trim()) {
      closeBlocks();
      output.push("");
    } else {
      closeBlocks();
      output.push(`<p data-source-line="${sourceLine}">${inlineMarkdown(line)}</p>`);
    }
  }
  closeBlocks();
  return output.join("\n");
}

function normalizeRepositoryText(text) {
  const raw = String(text || "").replace(/^---\n[\s\S]*?\n---\n?/, "");
  const lines = raw.split("\n");
  const output = [];
  for (const rawLine of lines) {
    const line = rawLine
      .replace(/<!--\s*paragraph:[\s\S]*?-->/g, "")
      .replace(/<!--\s*comment-(?:start|end|ref):\d+\s*-->/g, "")
      .replace(/<!--\s*[\s\S]*?-->/g, "")
      .trimEnd();
    if (/^<!--.*-->$/.test(line.trim())) continue;
    output.push(line);
  }
  return output.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function tableCellsFor(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) return null;
  if (/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(trimmed)) return null;
  const cells = trimmed.slice(1, -1).split("|").map((cell) => cell.trim());
  return cells.length > 1 ? cells : null;
}

function enhanceReadableTables(container) {
  if (!container) return;
  for (const table of container.querySelectorAll("table")) {
    const rows = Array.from(table.querySelectorAll("tr"));
    const headerCells = rows[0]?.querySelectorAll("td") || [];
    const hasHeader = headerCells.length > 1 && Array.from(headerCells).every((cell) => cell.textContent.trim());
    if (!hasHeader) continue;
    const labels = Array.from(headerCells).map((cell) => cell.textContent.trim());
    table.classList.add("responsive-table");
    rows.slice(1).forEach((row) => {
      Array.from(row.querySelectorAll("td")).forEach((cell, index) => {
        cell.dataset.label = labels[index] || "";
      });
    });
  }
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="inline-link">$1</span>');
}

function renderChapter() {
  const chapter = currentChapter();
  if (!chapter) return;
  const layer = chapter.available_layers.find((item) => item.key === currentLayer);
  $("chapterSelect").value = chapter.chapter_id;
  renderLayerSelect();
  const contentPanel = $("readerContent");
  contentPanel.classList.toggle("prose", currentLayer === "prose");
  contentPanel.classList.toggle("repo-readable", currentLayer !== "prose");
  contentPanel.classList.remove("code-like");
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
  contentPanel.innerHTML = currentLayer === "prose" ? basicMarkdownToHtml(text, { prose: true }) : basicMarkdownToHtml(text);
  enhanceReadableTables(contentPanel);
  saveReaderState();
  updateTargetDisplay();
  syncMobileReaderUi();
}

function scrollToPercent(percent) {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const clamped = Math.max(0, Math.min(Number(percent) || 0, 100));
  window.scrollTo({
    top: max > 0 ? Math.round((clamped / 100) * max) : 0,
    behavior: "smooth"
  });
}

function saveBookmark() {
  const ref = currentReference();
  const target = ref.chapter_title || ref.current_file_path || "current position";
  if (!window.confirm(`Save bookmark for ${target}?`)) return;
  const bookmark = {
    ...ref,
    saved_at: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.bookmark, JSON.stringify(bookmark));
  renderBookmarkStatus();
}

function resumeBookmark() {
  const bookmark = loadBookmark();
  if (!bookmark) {
    window.alert("No bookmark saved yet.");
    return;
  }
  if (!window.confirm(`Resume bookmark: ${bookmarkLabel(bookmark)}?`)) return;

  if (bookmark.view_mode === "repo-browser") {
    setMode("author");
    if (bookmark.current_file_path && appContent.files?.[bookmark.current_file_path]) {
      renderFile(bookmark.current_file_path);
    } else {
      setView("repo-browser");
    }
  } else {
    if (bookmark.current_layer && bookmark.current_layer !== "prose") {
      setMode("author");
    }
    setView("book-reader");
    if (bookmark.chapter_id && (appIndex.chapters || []).some((chapter) => chapter.chapter_id === bookmark.chapter_id)) {
      currentChapterId = bookmark.chapter_id;
    }
    currentLayer = bookmark.current_layer || "prose";
    renderLayerSelect();
    renderChapter();
  }

  window.setTimeout(() => scrollToPercent(bookmark.approximate_scroll_percent), 80);
}

function chapterStep(delta) {
  const chapters = appIndex.chapters || [];
  const index = chapters.findIndex((chapter) => chapter.chapter_id === currentChapterId);
  const next = chapters[index + delta];
  if (!next) return;
  currentChapterId = next.chapter_id;
  renderLayerSelect();
  renderChapter();
}

function renderTreeNode(node) {
  if (node.type === "file") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tree-file";
    button.textContent = node.display_name || node.name;
    button.title = node.path;
    button.dataset.path = node.path;
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
  syncMobileBrowserUi();
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
  setView("repo-browser");
  currentFilePath = path;
  localStorage.setItem(STORAGE_KEYS.file, path);
  currentLayer = "repository-file";
  $("filePath").textContent = `${file.display_name || path} · ${file.line_count} lines · ${path}`;
  $("fileBadge").textContent = file.category;
  $("fileBadge").className = `badge ${file.category.includes("candidate") ? "candidate" : file.category.includes("prose") ? "prose" : file.category.includes("review") ? "review" : ""}`;
  $("fileContent").classList.remove("code-like");
  $("fileContent").classList.add("repo-readable");
  $("fileContent").innerHTML = basicMarkdownToHtml(file.content);
  enhanceReadableTables($("fileContent"));
  document.querySelectorAll(".tree-file").forEach((button) => {
    button.classList.toggle("active", button.dataset.path === path);
  });
  $("browserSelectedFile").textContent = abbreviate(file.display_name || path, 64);
  if (isMobileLayout()) {
    setBrowserTreeOpen(false);
    $("fileViewer")?.scrollIntoView({ block: "start" });
  }
  updateTargetDisplay();
}

function ticketSortRank(ticket) {
  const statusRank = {
    proposed: 0,
    "needs-author-decision": 1,
    "accepted-for-workflow": 3,
    rejected: 4
  };
  const priorityRank = {
    blocking: 0,
    high: 1,
    medium: 2,
    low: 3
  };
  return [
    statusRank[ticket.status] ?? 2,
    priorityRank[ticket.priority] ?? 4,
    ticket.ticket_id || ""
  ];
}

function filteredTickets() {
  const filter = $("ticketStatusFilter")?.value || "current";
  const tickets = appIndex.tickets || [];
  return tickets
    .filter((ticket) => {
      if (filter === "all") return true;
      if (filter === "current") return !["accepted-for-workflow", "rejected", "superseded"].includes(ticket.status);
      return ticket.status === filter;
    })
    .sort((a, b) => {
      const ar = ticketSortRank(a);
      const br = ticketSortRank(b);
      return String(ar[0]).localeCompare(String(br[0])) ||
        String(ar[1]).localeCompare(String(br[1])) ||
        String(ar[2]).localeCompare(String(br[2]));
    });
}

function currentTicket() {
  return (appIndex.tickets || []).find((ticket) => ticket.ticket_id === currentTicketId) || null;
}

function ticketTitle(ticket) {
  return ticket ? `${ticket.ticket_id}: ${ticket.target || ticket.ticket_type || "Ticket"}` : "No ticket selected";
}

function renderTicketList() {
  const list = $("ticketList");
  if (!list) return;
  const tickets = filteredTickets();
  if (!tickets.length) {
    list.innerHTML = "<p>No tickets match this filter.</p>";
    return;
  }
  if (!tickets.some((ticket) => ticket.ticket_id === currentTicketId)) {
    currentTicketId = tickets[0].ticket_id;
    localStorage.setItem(STORAGE_KEYS.ticket, currentTicketId);
  }
  list.innerHTML = tickets.map((ticket) => `
    <button type="button" class="ticket-item ${ticket.ticket_id === currentTicketId ? "active" : ""}" data-ticket-id="${escapeHtml(ticket.ticket_id)}">
      <strong>${escapeHtml(ticket.ticket_id)}</strong>
      <span>${escapeHtml(ticket.target || "")}</span>
      <small>${escapeHtml(ticket.status || "")} · ${escapeHtml(ticket.priority || "")} · ${escapeHtml(ticket.ticket_type || "")}</small>
    </button>
  `).join("");
}

function renderTicketReview() {
  if (!$("ticketList")) return;
  renderTicketList();
  const ticket = currentTicket();
  const panel = $("ticketContent");
  if (!ticket) {
    $("ticketPath").textContent = "No ticket selected";
    $("ticketBadge").textContent = "";
    panel.innerHTML = "<p>No ticket selected.</p>";
    updateTargetDisplay();
    return;
  }
  localStorage.setItem(STORAGE_KEYS.ticket, ticket.ticket_id);
  currentLayer = "ticket-review";
  currentFilePath = ticket.source_file || "feedback/webapp/tickets/index.md";
  $("ticketPath").textContent = `${ticket.ticket_id} · ${ticket.source_file || "ticket index"}`;
  $("ticketBadge").textContent = `${ticket.status} · ${ticket.priority}`;
  $("ticketBadge").className = `badge ${ticket.status === "proposed" ? "review" : ""}`;
  const text = ticket.source_file && appContent.files?.[ticket.source_file]
    ? appContent.files[ticket.source_file].content
    : `# ${ticket.ticket_id}\n\n${ticket.summary || ticket.target || "No detail available."}\n`;
  panel.innerHTML = basicMarkdownToHtml(text);
  enhanceReadableTables(panel);
  updateTargetDisplay();
}

function approximateScrollPercent() {
  if (currentView === "book-reader" || currentView === "repo-browser" || currentView === "ticket-review") {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    return Math.round((window.scrollY / max) * 100);
  }
  const activeContent = currentView === "repo-browser" ? $("fileContent") : $("readerContent");
  const max = activeContent.scrollHeight - activeContent.clientHeight;
  if (max <= 0) return 0;
  return Math.round((activeContent.scrollTop / max) * 100);
}

function currentHeading() {
  if (currentView === "scratchpad") {
    return currentScratchpadTab === "technical-processing" ? "Technical / Processing" : "Content";
  }
  if (currentView === "ticket-review") {
    const ticket = currentTicket();
    return ticket ? ticketTitle(ticket) : "Ticket Review";
  }
  if (currentView === "repo-browser" && currentFilePath) {
    return visibleContentAnchor("fileContent") || appContent.files?.[currentFilePath]?.headings?.[0]?.text || null;
  }
  const chapter = currentChapter();
  const visible = visibleContentAnchor("readerContent");
  return visible ? `${chapter?.display_title || "Chapter"} · ${visible}` : chapter?.display_title || null;
}

function visibleContentAnchor(containerId) {
  const container = $(containerId);
  if (!container) return null;
  const viewportTop = 0;
  const viewportBottom = window.innerHeight || document.documentElement.clientHeight;
  const candidates = Array.from(container.querySelectorAll("h1,h2,h3,h4,p,li"));
  for (const node of candidates) {
    const rect = node.getBoundingClientRect();
    if (rect.bottom < viewportTop + 72 || rect.top > viewportBottom - 72) continue;
    const text = node.textContent?.replace(/\s+/g, " ").trim();
    if (text && text.length > 8) return abbreviate(text, 96);
  }
  return null;
}

function visibleSourceLineRange(chapter) {
  if (currentView === "repo-browser") {
    return visibleRenderedLineRange("fileContent");
  }
  if (currentView === "book-reader" && currentLayer !== "prose") {
    return visibleRenderedLineRange("readerContent");
  }
  const start = Number(chapter?.source_line_start);
  const end = Number(chapter?.source_line_end);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) {
    return {
      source_line_start: chapter?.source_line_start || null,
      source_line_end: chapter?.source_line_end || null
    };
  }
  const total = end - start + 1;
  const center = start + Math.round((approximateScrollPercent() / 100) * total);
  const windowSize = Math.max(8, Math.round(total * 0.08));
  return {
    source_line_start: Math.max(start, center - windowSize),
    source_line_end: Math.min(end, center + windowSize)
  };
}

function visibleRenderedLineRange(containerId) {
  const container = $(containerId);
  if (!container) return {};
  const viewportTop = 0;
  const viewportBottom = window.innerHeight || document.documentElement.clientHeight;
  const visibleLines = Array.from(container.querySelectorAll("[data-source-line]"))
    .filter((node) => {
      const rect = node.getBoundingClientRect();
      return rect.bottom >= viewportTop + 72 && rect.top <= viewportBottom - 72;
    })
    .map((node) => Number(node.dataset.sourceLine))
    .filter(Number.isFinite);
  if (!visibleLines.length) return {};
  return {
    source_line_start: Math.min(...visibleLines),
    source_line_end: Math.max(...visibleLines)
  };
}

function selectedText() {
  const text = window.getSelection()?.toString() || "";
  return text.trim().slice(0, 4000);
}

function abbreviate(value, max = 120) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}

function currentReference() {
  const chapter = currentView === "book-reader" ? currentChapter() : null;
  const meta = appIndex.metadata || {};
  if (currentView === "ticket-review") {
    const ticket = currentTicket();
    return {
      repo_commit: meta.commit_hash || null,
      repo_branch: meta.branch || null,
      app_version: APP_VERSION,
      view_mode: "ticket-review",
      current_layer: "ticket-review",
      current_file_path: ticket?.source_file || "feedback/webapp/tickets/index.md",
      chapter_id: null,
      chapter_title: null,
      source_line_start: visibleRenderedLineRange("ticketContent").source_line_start || null,
      source_line_end: visibleRenderedLineRange("ticketContent").source_line_end || null,
      current_heading: currentHeading(),
      ticket_id: ticket?.ticket_id || null,
      ticket_title: ticket ? ticketTitle(ticket) : null,
      ticket_status: ticket?.status || null,
      ticket_type: ticket?.ticket_type || null,
      selected_text: selectedText(),
      approximate_scroll_percent: approximateScrollPercent()
    };
  }
  if (currentView === "scratchpad") {
    return {
      repo_commit: meta.commit_hash || null,
      repo_branch: meta.branch || null,
      app_version: APP_VERSION,
      view_mode: "scratchpad",
      current_layer: "scratchpad",
      scratchpad_type: currentScratchpadTab,
      current_file_path: null,
      chapter_id: null,
      chapter_title: null,
      source_line_start: null,
      source_line_end: null,
      current_heading: currentHeading(),
      selected_text: null,
      approximate_scroll_percent: null
    };
  }
  const visibleLines = currentView === "book-reader" || currentView === "repo-browser"
    ? visibleSourceLineRange(chapter)
    : {};
  return {
    repo_commit: meta.commit_hash || null,
    repo_branch: meta.branch || null,
    app_version: APP_VERSION,
    view_mode: currentView,
    current_layer: currentLayer,
    current_file_path: currentFilePath,
    chapter_id: chapter?.chapter_id || null,
    chapter_title: chapter?.display_title || null,
    source_line_start: visibleLines.source_line_start || chapter?.source_line_start || null,
    source_line_end: visibleLines.source_line_end || chapter?.source_line_end || null,
    current_heading: currentHeading(),
    selected_text: selectedText(),
    approximate_scroll_percent: approximateScrollPercent()
  };
}

function updateTargetDisplay() {
  const ref = currentReference();
  const target = ref.view_mode === "scratchpad"
    ? `Scratchpad · ${ref.current_heading}`
    : ref.view_mode === "ticket-review"
    ? `Ticket · ${ref.ticket_id || ref.current_heading}`
    : ref.chapter_title
    ? `${ref.chapter_title} · ${ref.current_layer}`
    : ref.current_file_path || "No target";
  $("commentTarget").textContent = target;
  $("mobileCommentTarget").textContent = abbreviate(target, 72);
  if ($("referenceDetails")) renderReferenceDetails(ref);
}

function renderReferenceDetails(ref = currentReference()) {
  let details = $("referenceDetails");
  if (!details) {
    const card = document.createElement("div");
    card.id = "referenceCard";
    card.className = "reference-card";
    card.setAttribute("aria-label", "Current comment reference");
    details = document.createElement("dl");
    details.id = "referenceDetails";
    card.appendChild(details);
    $("commentBox").appendChild(card);
  }
  const file = ref.current_file_path || "";
  const lines = ref.source_line_start
    ? `${ref.source_line_start}-${ref.source_line_end || "?"}`
    : "";
  const rows = [
    ["View", ref.view_mode],
    ["Layer", ref.current_layer],
    ["Chapter", ref.chapter_title || ref.chapter_id || ""],
    ["Ticket", ref.ticket_id || ""],
    ["Status", ref.ticket_status || ""],
    ["File", file],
    ["Lines", lines],
    ["Heading", ref.current_heading || ""],
    ["Scroll", `${ref.approximate_scroll_percent ?? 0}%`],
    ["Selected", ref.selected_text ? abbreviate(ref.selected_text, 140) : ""]
  ].filter(([, value]) => value);
  details.innerHTML = rows
    .map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd title="${escapeHtml(value)}">${escapeHtml(abbreviate(value))}</dd>`)
    .join("");
}

function renderCommentCount() {
  const count = comments.length;
  $("commentCount").textContent = String(count);
}

function submitComment() {
  const text = $("commentText").value.trim();
  if (!text) return;
  const record = {
    id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    created_at: new Date().toISOString(),
    ...commentIdentityFields(),
    ...currentReference(),
    comment_text: text,
    status: "inbox"
  };
  comments.push(record);
  $("commentText").value = "";
  saveComments();
}

function scratchpadDraftKey(tab = currentScratchpadTab) {
  return tab === "technical-processing"
    ? STORAGE_KEYS.scratchpadTechDraft
    : STORAGE_KEYS.scratchpadContentDraft;
}

function scratchpadClassification(tab = currentScratchpadTab) {
  return tab === "technical-processing" ? "scratchpad-technical" : "scratchpad-content";
}

function scratchpadLabel(tab = currentScratchpadTab) {
  return tab === "technical-processing" ? "Technical / Processing" : "Content";
}

function scratchpadHelp(tab = currentScratchpadTab) {
  if (tab === "technical-processing") {
    return "App bugs, broken navigation, missing content, export problems, data-processing issues, workflow issues, Codex-processing notes, and UI improvement ideas.";
  }
  return "Story ideas, future beats, scene ideas, lore thoughts, character thoughts, outline ideas, prose fragments, and questions to resolve later.";
}

function setScratchpadTab(tab) {
  localStorage.setItem(scratchpadDraftKey(currentScratchpadTab), $("scratchpadText")?.value || "");
  currentScratchpadTab = tab === "technical-processing" ? "technical-processing" : "content";
  localStorage.setItem(STORAGE_KEYS.scratchpadTab, currentScratchpadTab);
  renderScratchpadUi();
  updateTargetDisplay();
}

function submitScratchpad() {
  const text = $("scratchpadText").value.trim();
  if (!text) return;
  const record = {
    id: `scratchpad-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    created_at: new Date().toISOString(),
    ...commentIdentityFields(),
    ...currentReference(),
    scratchpad_type: currentScratchpadTab,
    comment_text: text,
    status: "inbox",
    initial_classification: scratchpadClassification()
  };
  comments.push(record);
  $("scratchpadText").value = "";
  localStorage.removeItem(scratchpadDraftKey());
  saveComments();
}

function renderScratchpadUi() {
  if (!$("scratchpadText")) return;
  $("scratchContentTab").classList.toggle("active", currentScratchpadTab === "content");
  $("scratchTechTab").classList.toggle("active", currentScratchpadTab === "technical-processing");
  $("scratchpadTypeLabel").textContent = scratchpadLabel();
  $("scratchpadTypeHelp").textContent = scratchpadHelp();
  const draft = localStorage.getItem(scratchpadDraftKey()) || "";
  if ($("scratchpadText").value !== draft && document.activeElement !== $("scratchpadText")) {
    $("scratchpadText").value = draft;
  }
  const tabEntries = comments.filter((comment) =>
    comment.view_mode === "scratchpad" && comment.scratchpad_type === currentScratchpadTab
  );
  $("scratchpadCount").textContent = `${tabEntries.length} saved entr${tabEntries.length === 1 ? "y" : "ies"}`;
  $("scratchpadRecent").innerHTML = tabEntries.length
    ? tabEntries.slice().reverse().slice(0, 6).map((entry) => `<article class="comment-card scratchpad-entry">
        <strong>${escapeHtml(scratchpadLabel(entry.scratchpad_type))}</strong>
        <div class="content-meta">
          <span>${escapeHtml(entry.commenter_name || "")} · ${escapeHtml(entry.created_at || "")}</span>
          <span>${escapeHtml(entry.initial_classification || scratchpadClassification(entry.scratchpad_type))}</span>
        </div>
        <p>${escapeHtml(entry.comment_text || "")}</p>
      </article>`).join("")
    : "<p>No saved entries for this scratchpad tab yet.</p>";
}

function exportMetadata() {
  const identity = localVerifiedRole();
  return {
    exported_at: new Date().toISOString(),
    app_version: APP_VERSION,
    commenter_name: getCommenterName() || "Reader",
    commenter_role: identity.commenter_role,
    commenter_role_verified: identity.commenter_role_verified,
    reviewer_session_id: getSessionId(),
    repo_branch: appIndex.metadata?.branch || null,
    repo_commit: appIndex.metadata?.commit_hash || null,
    comment_count: comments.length
  };
}

function latestCommentCreatedAt(records = comments) {
  return records
    .map((comment) => comment.created_at)
    .filter(Boolean)
    .sort()
    .at(-1) || null;
}

function commentsForExport() {
  const scope = $("exportScopeSelect")?.value || "all";
  if (scope !== "since-last") return comments.slice();
  const lastLatest = localStorage.getItem(STORAGE_KEYS.lastSyncLatestCreatedAt) ||
    localStorage.getItem(STORAGE_KEYS.lastExportLatestCreatedAt);
  if (!lastLatest) return comments.slice();
  return comments.filter((comment) => (comment.created_at || "") > lastLatest);
}

function exportPayload(records = commentsForExport()) {
  return {
    export_metadata: {
      ...exportMetadata(),
      comment_count: records.length,
      export_scope: $("exportScopeSelect")?.value || "all",
      total_local_comment_count: comments.length
    },
    comments: records
  };
}

function markExportGenerated(format, records) {
  const now = new Date().toISOString();
  localStorage.setItem(STORAGE_KEYS.lastExportAt, now);
  localStorage.setItem(STORAGE_KEYS.lastExportCount, String(comments.length));
  localStorage.setItem(STORAGE_KEYS.lastExportLatestCreatedAt, latestCommentCreatedAt(comments) || "");
  localStorage.setItem(STORAGE_KEYS.lastExportFormat, format);
  renderExportStatus();
}

function getReaderCode() {
  return localStorage.getItem(STORAGE_KEYS.readerCode) || "";
}

function localVerifiedRole() {
  const validatedAt = localStorage.getItem(STORAGE_KEYS.readerCodeValidatedAt);
  const role = localStorage.getItem(STORAGE_KEYS.readerCodeRole);
  if (!validatedAt || !["author", "reader"].includes(role)) {
    return {
      commenter_role: "unverified",
      commenter_role_verified: false,
      reader_id: null
    };
  }
  return {
    commenter_role: role,
    commenter_role_verified: true,
    reader_id: null
  };
}

function commentIdentityFields() {
  return {
    commenter_name: getCommenterName() || "Reader",
    reviewer_session_id: getSessionId(),
    ...localVerifiedRole()
  };
}

async function saveReaderCode() {
  const code = $("readerCodeInput").value.trim();
  if (!code) {
    window.alert("Enter a reader code before saving.");
    return;
  }
  localStorage.setItem(STORAGE_KEYS.readerCode, code);
  localStorage.removeItem(STORAGE_KEYS.readerCodeValidatedAt);
  localStorage.removeItem(STORAGE_KEYS.readerCodeDisplayName);
  localStorage.removeItem(STORAGE_KEYS.readerCodeRole);
  localStorage.removeItem(STORAGE_KEYS.commenter);
  renderCommenterName();
  $("readerCodeInput").value = "";
  renderExportStatus();
  await syncComments({ allowEmpty: true, validationOnly: !commentsForExport().length });
}

function markSyncGenerated(result, records) {
  const now = new Date().toISOString();
  localStorage.setItem(STORAGE_KEYS.lastSyncAt, now);
  localStorage.setItem(STORAGE_KEYS.lastSyncCount, String(comments.length));
  localStorage.setItem(STORAGE_KEYS.lastSyncLatestCreatedAt, latestCommentCreatedAt(comments) || "");
  if (result?.reader?.display_name) {
    localStorage.setItem(STORAGE_KEYS.readerCodeDisplayName, result.reader.display_name);
    setCommenterName(result.reader.display_name);
  }
  if (result?.reader?.role) {
    localStorage.setItem(STORAGE_KEYS.readerCodeRole, result.reader.role === "author" ? "author" : "reader");
  }
  localStorage.setItem(STORAGE_KEYS.readerCodeValidatedAt, now);
  setMode(hasVerifiedAuthorCode() ? "author" : "reader");
  renderExportStatus();
}

function markSyncSubmitted() {
  const now = new Date().toISOString();
  localStorage.setItem(STORAGE_KEYS.lastSyncAt, now);
  localStorage.setItem(STORAGE_KEYS.lastSyncCount, String(comments.length));
  renderExportStatus();
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function jsonpRequest(url, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    const callbackName = `ffSyncStatus_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const requestUrl = new URL(url);
    requestUrl.searchParams.set("callback", callbackName);

    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Sync status check timed out."));
    }, timeoutMs);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = (payload) => {
      cleanup();
      resolve(payload);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Sync status check failed."));
    };
    script.src = requestUrl.toString();
    document.body.appendChild(script);
  });
}

async function waitForSyncConfirmation(submissionId) {
  const statusUrl = new URL(COMMENT_SYNC_ENDPOINT);
  statusUrl.searchParams.set("action", "sync-status");
  statusUrl.searchParams.set("submission_id", submissionId);

  for (let attempt = 0; attempt < 8; attempt += 1) {
    await sleep(attempt === 0 ? 900 : 1400);
    const status = await jsonpRequest(statusUrl.toString());
    if (status?.ok && status?.found) return status.result;
    if (status?.ok === false) throw new Error(status.error || "Sync status check failed.");
  }
  return null;
}

function syncConfirmationMessage(confirmation, options = {}) {
  const role = confirmation?.reader?.role || "reader";
  const displayName = confirmation?.reader?.display_name || "reader";
  const accepted = confirmation?.new_comments || 0;
  const duplicates = confirmation?.duplicate_comments || 0;
  const rowCount = confirmation?.sheet_last_row || 0;
  const lines = [];

  lines.push(`Code confirmed for ${displayName}.`);
  lines.push(role === "author" ? "Access: Author." : "Access: Reader.");

  if (options.validationOnly) {
    lines.push("No comments were submitted because there were no local entries to sync.");
  } else {
    lines.push(`${accepted} new ${accepted === 1 ? "entry was" : "entries were"} submitted.`);
    if (duplicates) lines.push(`${duplicates} duplicate ${duplicates === 1 ? "entry was" : "entries were"} skipped.`);
  }

  if (rowCount) lines.push(`Inbox sheet now has ${rowCount} ${rowCount === 1 ? "row" : "rows"}.`);
  if (confirmation?.archive_status === "failed") {
    lines.push("Drive archive file was not created, but the Sheet received the submission.");
  } else if (confirmation?.archive_status === "disabled") {
    lines.push("Drive archive file creation is disabled; the Sheet is the sync inbox.");
  }

  return lines.join("\n");
}

async function syncComments(options = {}) {
  const readerCode = getReaderCode();
  if (!readerCode) {
    setView("export");
    window.alert("Enter and save your private reader code before syncing.");
    return;
  }
  const records = commentsForExport();
  if (!records.length && !options.allowEmpty) {
    window.alert("No comments or scratchpad entries to sync for the selected scope.");
    return;
  }
  if (!COMMENT_SYNC_ENDPOINT) {
    window.alert("Comment sync is not configured. Use Download Backup JSON instead.");
    return;
  }
  setSyncButtonsBusy(true);
  try {
    const submissionId = `submission-${crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
    const form = new URLSearchParams();
    form.set("action", "submit-comments");
    form.set("submission_id", submissionId);
    form.set("reader_code", readerCode);
    form.set("export_payload", JSON.stringify(exportPayload(records)));
    await fetch(COMMENT_SYNC_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      body: form
    });
    const confirmation = await waitForSyncConfirmation(submissionId);
    if (confirmation) {
      markSyncGenerated(confirmation, records);
      window.alert(syncConfirmationMessage(confirmation, options));
    } else {
      markSyncSubmitted();
      window.alert("Sync request submitted, but confirmation was not available yet. Check the Drive folder or use Download Backup JSON if needed.");
    }
  } catch (error) {
    window.alert(`Sync failed: ${error.message}. Use Download Backup JSON instead.`);
  } finally {
    setSyncButtonsBusy(false);
  }
}

function setSyncButtonsBusy(isBusy) {
  const syncButton = $("syncCommentsBtn");
  const quickButton = $("quickExportBtn");
  const syncLabel = `Sync (${entriesSinceLastSync()})`;
  if (syncButton) {
    syncButton.disabled = isBusy;
    syncButton.textContent = isBusy ? "Syncing..." : syncLabel;
    syncButton.classList.toggle("is-syncing", isBusy);
  }
  if ($("saveReaderCodeBtn")) {
    $("saveReaderCodeBtn").disabled = isBusy;
    $("saveReaderCodeBtn").textContent = isBusy ? "Validating..." : "Save and Validate Code";
  }
  if (quickButton) {
    quickButton.disabled = isBusy;
    quickButton.textContent = isBusy ? "Syncing..." : syncLabel;
    quickButton.classList.toggle("is-syncing", isBusy);
  }
}

function formatExportTimestamp(value) {
  if (!value) return "Never";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
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
  const commenterName = getCommenterName() || promptForBackupName();
  const name = slugName(commenterName);
  const records = commentsForExport();
  download(
    `fractured-fate-comments-${name}-${timestampForFile()}.json`,
    "application/json",
    JSON.stringify(exportPayload(records), null, 2)
  );
  markExportGenerated("json", records);
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

function entriesSinceLastExport() {
  const lastLatest = localStorage.getItem(STORAGE_KEYS.lastExportLatestCreatedAt);
  if (!lastLatest) return comments.length;
  return comments.filter((comment) => (comment.created_at || "") > lastLatest).length;
}

function entriesSinceLastSync() {
  const lastLatest = localStorage.getItem(STORAGE_KEYS.lastSyncLatestCreatedAt);
  if (!lastLatest) return comments.length;
  return comments.filter((comment) => (comment.created_at || "") > lastLatest).length;
}

function renderExportStatus() {
  if (!$("lastExportStatus")) return;
  const lastAt = localStorage.getItem(STORAGE_KEYS.lastExportAt);
  const lastSyncAt = localStorage.getItem(STORAGE_KEYS.lastSyncAt);
  const validatedAt = localStorage.getItem(STORAGE_KEYS.readerCodeValidatedAt);
  const readerDisplayName = localStorage.getItem(STORAGE_KEYS.readerCodeDisplayName);
  const readerRole = localStorage.getItem(STORAGE_KEYS.readerCodeRole);
  const readerCode = getReaderCode();
  $("readerCodeStatus").textContent = readerCode
    ? `Reader code: ${validatedAt ? `Validated${readerDisplayName ? ` for ${readerDisplayName}` : ""}${readerRole ? ` · ${readerRole}` : ""}` : "Saved, not yet validated"}`
    : "Reader code: Not saved";
  $("lastSyncStatus").textContent = `Last sync: ${formatExportTimestamp(lastSyncAt)}`;
  $("commentsSinceSync").textContent = `Entries since last sync: ${entriesSinceLastSync()}`;
  $("lastExportStatus").textContent = `Last export generated: ${formatExportTimestamp(lastAt)}`;
  $("commentsSinceExport").textContent = `Entries since last export: ${entriesSinceLastExport()}`;
  $("totalCommentStatus").textContent = `Total local entries: ${comments.length}`;
  $("appVersionStatus").textContent = `App version: ${APP_VERSION}`;
  const syncLabel = `Sync (${entriesSinceLastSync()})`;
  if ($("quickExportBtn")) $("quickExportBtn").textContent = syncLabel;
  if ($("syncCommentsBtn")) $("syncCommentsBtn").textContent = syncLabel;
}

async function reloadApp() {
  if ("caches" in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
  }
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) await registration.update();
  }
  const url = new URL(window.location.href);
  url.searchParams.set("reload", Date.now().toString());
  window.location.href = url.toString();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`sw.js?v=${encodeURIComponent(APP_VERSION)}`)
      .then((registration) => registration.update())
      .catch(() => {});
  });
}

function isMobileLayout() {
  return window.matchMedia("(max-width: 820px)").matches;
}

function updateViewportMetrics() {
  const height = window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight;
  document.documentElement.style.setProperty("--app-vvh", `${Math.round(height)}px`);
}

function handleViewportResize() {
  updateViewportMetrics();
  window.clearTimeout(viewportResizeTimer);
  viewportResizeTimer = window.setTimeout(() => {
    if (isMobileLayout()) {
      readerControlsOpen = false;
      browserTreeOpen = false;
      setReaderControlsOpen(false);
      setBrowserTreeOpen(false);
      setCommentDrawer(false);
    }
    syncMobileCommentUi();
    syncMobileReaderUi();
    syncMobileBrowserUi();
    updateTargetDisplay();
  }, 120);
}

function setCommentDrawer(open) {
  const box = $("commentBox");
  const toggle = $("commentDrawerToggle");
  box.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
}

function setReaderControlsOpen(open) {
  readerControlsOpen = open;
  const sidebar = document.querySelector(".reader-sidebar");
  const toggle = $("readerControlsToggle");
  if (!sidebar || !toggle) return;
  sidebar.classList.toggle("is-reader-controls-open", open);
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
}

function syncMobileReaderUi() {
  const chapter = currentChapter();
  const layer = currentLayer === "prose" ? "Prose" : currentLayer;
  const target = chapter ? `${chapter.display_title} · ${layer}` : "Select chapter";
  $("mobileReaderTarget").textContent = abbreviate(target, 72);
  if (isMobileLayout()) {
    setReaderControlsOpen(readerControlsOpen);
  } else {
    const sidebar = document.querySelector(".reader-sidebar");
    const toggle = $("readerControlsToggle");
    sidebar?.classList.add("is-reader-controls-open");
    toggle?.setAttribute("aria-expanded", "true");
  }
}

function syncMobileCommentUi() {
  if (isMobileLayout()) {
    setCommentDrawer(false);
  } else {
    setCommentDrawer(true);
  }
}

function setBrowserTreeOpen(open) {
  browserTreeOpen = open;
  const sidebar = document.querySelector(".browser-sidebar");
  const toggle = $("browserTreeToggle");
  if (!sidebar || !toggle) return;
  sidebar.classList.toggle("is-tree-open", open);
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
}

function syncMobileBrowserUi() {
  const selected = currentFilePath || "Select a file";
  $("browserSelectedFile").textContent = abbreviate(selected, 64);
  if (isMobileLayout()) {
    setBrowserTreeOpen(browserTreeOpen);
  } else {
    const sidebar = document.querySelector(".browser-sidebar");
    const toggle = $("browserTreeToggle");
    sidebar?.classList.add("is-tree-open");
    toggle?.setAttribute("aria-expanded", "true");
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
      const label = comment.view_mode === "scratchpad"
        ? `Scratchpad: ${scratchpadLabel(comment.scratchpad_type)}`
        : comment.view_mode === "ticket-review"
        ? `Ticket: ${comment.ticket_id || comment.current_heading || "ticket"}`
        : target;
      const role = comment.commenter_role_verified
        ? `${comment.commenter_role || "verified"} verified`
        : (comment.commenter_role || "unverified");
      return `<article class="comment-card">
        <strong>${escapeHtml(label)}</strong>
        <div class="content-meta">
          <span>${escapeHtml(comment.commenter_name)} · ${escapeHtml(comment.created_at)}</span>
          <span>${escapeHtml(comment.current_layer || "")} · ${escapeHtml(role)}</span>
        </div>
        <p>${escapeHtml(comment.comment_text)}</p>
      </article>`;
    })
    .join("");
}

function wireEvents() {
  updateViewportMetrics();
  $("readerNavBtn").addEventListener("click", () => setView("book-reader"));
  $("browserNavBtn").addEventListener("click", () => setView("repo-browser"));
  $("ticketsNavBtn").addEventListener("click", () => setView("ticket-review"));
  $("scratchpadNavBtn").addEventListener("click", () => setView("scratchpad"));
  $("exportNavBtn").addEventListener("click", () => setView("export"));
  $("chapterSelect").addEventListener("change", (event) => {
    currentChapterId = event.target.value;
    renderLayerSelect();
    renderChapter();
    if (isMobileLayout()) setReaderControlsOpen(false);
  });
  $("layerSelect").addEventListener("change", (event) => {
    currentLayer = event.target.value;
    localStorage.setItem(STORAGE_KEYS.layer, currentLayer);
    renderChapter();
    if (isMobileLayout()) setReaderControlsOpen(false);
  });
  $("prevChapterBtn").addEventListener("click", () => {
    chapterStep(-1);
    if (isMobileLayout()) setReaderControlsOpen(false);
  });
  $("nextChapterBtn").addEventListener("click", () => {
    chapterStep(1);
    if (isMobileLayout()) setReaderControlsOpen(false);
  });
  $("readerControlsToggle").addEventListener("click", () => {
    setReaderControlsOpen($("readerControlsToggle").getAttribute("aria-expanded") !== "true");
  });
  $("saveBookmarkBtn").addEventListener("click", saveBookmark);
  $("resumeBookmarkBtn").addEventListener("click", resumeBookmark);
  $("debugReferenceBtn").addEventListener("click", () => {
    const card = $("referenceCard");
    if (card) {
      card.remove();
    } else {
      renderReferenceDetails();
    }
  });
  $("submitCommentBtn").addEventListener("click", submitComment);
  $("quickExportBtn").addEventListener("click", () => {
    if (getReaderCode()) syncComments();
    else setView("export");
  });
  $("saveReaderCodeBtn").addEventListener("click", () => saveReaderCode());
  $("syncCommentsBtn").addEventListener("click", syncComments);
  $("reloadAppBtn").addEventListener("click", reloadApp);
  $("exportJsonBtn").addEventListener("click", exportJson);
  $("importCommentsInput").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importJsonFile(file);
    event.target.value = "";
  });
  $("clearCommentsBtn").addEventListener("click", clearComments);
  $("scratchContentTab").addEventListener("click", () => setScratchpadTab("content"));
  $("scratchTechTab").addEventListener("click", () => setScratchpadTab("technical-processing"));
  $("submitScratchpadBtn").addEventListener("click", submitScratchpad);
  $("scratchpadText").addEventListener("input", (event) => {
    localStorage.setItem(scratchpadDraftKey(), event.target.value);
  });
  $("commentDrawerToggle").addEventListener("click", () => {
    setCommentDrawer(!$("commentBox").classList.contains("is-open"));
  });
  $("browserTreeToggle").addEventListener("click", () => {
    setBrowserTreeOpen($("browserTreeToggle").getAttribute("aria-expanded") !== "true");
  });
  $("fileTree").addEventListener("click", (event) => {
    const button = event.target.closest(".tree-file");
    if (button?.dataset.path) {
      renderFile(button.dataset.path);
    }
  });
  $("ticketStatusFilter").addEventListener("change", renderTicketReview);
  $("ticketList").addEventListener("click", (event) => {
    const button = event.target.closest(".ticket-item");
    if (!button?.dataset.ticketId) return;
    currentTicketId = button.dataset.ticketId;
    localStorage.setItem(STORAGE_KEYS.ticket, currentTicketId);
    renderTicketReview();
    if (isMobileLayout()) $("ticketContent")?.scrollIntoView({ block: "start" });
  });
  document.addEventListener("selectionchange", updateTargetDisplay);
  window.addEventListener("scroll", () => {
    updateTargetDisplay();
    window.clearTimeout(scrollSaveTimer);
    scrollSaveTimer = window.setTimeout(() => {
      localStorage.setItem(STORAGE_KEYS.scroll, String(approximateScrollPercent()));
    }, 150);
  }, { passive: true });
  window.addEventListener("resize", handleViewportResize, { passive: true });
  window.addEventListener("orientationchange", handleViewportResize, { passive: true });
  window.visualViewport?.addEventListener("resize", handleViewportResize, { passive: true });
}

async function init() {
  registerServiceWorker();
  renderCommenterName();
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
  currentScratchpadTab = localStorage.getItem(STORAGE_KEYS.scratchpadTab) === "technical-processing"
    ? "technical-processing"
    : "content";
  setMode(hasVerifiedAuthorCode() ? "author" : "reader");
  renderChapters();
  renderFileTree();
  const savedView = localStorage.getItem(STORAGE_KEYS.view);
  const savedFile = localStorage.getItem(STORAGE_KEYS.file);
  const savedTicket = localStorage.getItem(STORAGE_KEYS.ticket);
  if (savedTicket && (appIndex.tickets || []).some((ticket) => ticket.ticket_id === savedTicket)) {
    currentTicketId = savedTicket;
  }
  if (savedView === "export") {
    setView("export");
  } else if (savedView === "scratchpad") {
    setView("scratchpad");
  } else if (currentMode === "author" && savedView === "ticket-review") {
    setView("ticket-review");
  } else if (currentMode === "author" && savedView === "repo-browser" && savedFile && appContent.files?.[savedFile]) {
    renderFile(savedFile);
  } else {
    setView("book-reader");
  }
  syncMobileReaderUi();
  syncMobileCommentUi();
  renderBookmarkStatus();
  renderCommentCount();
  renderCommentList();
  renderScratchpadUi();
  renderExportStatus();
  const savedScroll = Number(localStorage.getItem(STORAGE_KEYS.scroll));
  if (Number.isFinite(savedScroll) && savedScroll > 0) {
    window.setTimeout(() => scrollToPercent(savedScroll), 120);
  }
}

init();
