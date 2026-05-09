import { ALBUMS, buildSongList } from "./data.js";
import { SongSort } from "./sort.js";

const els = {
  phaseSelect: document.getElementById("phase-select"),
  phaseSort: document.getElementById("phase-sort"),
  phaseResults: document.getElementById("phase-results"),
  albumGrid: document.getElementById("albumGrid"),
  selectAll: document.getElementById("selectAll"),
  startBtn: document.getElementById("startBtn"),
  battle: document.getElementById("battle"),
  progressBar: document.getElementById("progressBar"),
  progressPct: document.getElementById("progressPct"),
  leftCard: document.getElementById("leftCard"),
  rightCard: document.getElementById("rightCard"),
  tieBtn: document.getElementById("tieBtn"),
  undoBtn: document.getElementById("undoBtn"),
  restartSortBtn: document.getElementById("restartSortBtn"),
  podium: document.getElementById("podium"),
  resultsList: document.getElementById("resultsList"),
  resultsCard: document.getElementById("resultsCard"),
  viewToggle: document.querySelector("#phase-results .view-toggle"),
  sortToggle: document.getElementById("sortToggle"),
  rawTextBtn: document.getElementById("rawTextBtn"),
  restartBtn: document.getElementById("restartBtn"),
  rawDialog: document.getElementById("rawDialog"),
  rawText: document.getElementById("rawText"),
  copyBtn: document.getElementById("copyBtn"),
  closeDialogBtn: document.getElementById("closeDialogBtn"),
};

let sort = null;
let albumSort = "desc";

function showPhase(name) {
  els.phaseSelect.hidden = name !== "select";
  els.phaseSort.hidden = name !== "sort";
  els.phaseResults.hidden = name !== "results";
}

function escapeHTML(s) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

function renderAlbumGrid() {
  const prevChecked = new Map();
  for (const cb of els.albumGrid.querySelectorAll('input[name="album"]')) {
    prevChecked.set(cb.value, cb.checked);
  }

  els.albumGrid.replaceChildren();
  const list = albumSort === "desc" ? [...ALBUMS].reverse() : ALBUMS;

  for (const album of list) {
    const label = document.createElement("label");
    label.className = "album-card";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.name = "album";
    cb.value = album.id;
    cb.checked = prevChecked.has(album.id) ? prevChecked.get(album.id) : true;
    if (!cb.checked) label.classList.add("album-card--off");

    const img = document.createElement("img");
    img.src = album.cover;
    img.alt = album.title;
    img.loading = "lazy";

    const meta = document.createElement("div");
    meta.className = "album-card__meta";

    const title = document.createElement("span");
    title.className = "album-card__title";
    title.textContent = album.title;

    const year = document.createElement("span");
    year.className = "album-card__year";
    const songWord = album.songs.length === 1 ? "song" : "songs";
    year.textContent = `${album.year} · ${album.songs.length} ${songWord}`;

    meta.append(title, year);

    cb.addEventListener("change", () => {
      label.classList.toggle("album-card--off", !cb.checked);
    });

    label.append(cb, img, meta);
    els.albumGrid.appendChild(label);
  }
}

function setupSelectionPhase() {
  els.selectAll.addEventListener("change", () => {
    for (const cb of els.albumGrid.querySelectorAll('input[name="album"]')) {
      cb.checked = els.selectAll.checked;
      cb.closest(".album-card").classList.toggle("album-card--off", !cb.checked);
    }
  });

  els.sortToggle.addEventListener("click", (e) => {
    const btn = e.target.closest(".view-toggle__btn");
    if (!btn || btn.dataset.sort === albumSort) return;
    for (const b of els.sortToggle.querySelectorAll(".view-toggle__btn")) {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    }
    albumSort = btn.dataset.sort;
    renderAlbumGrid();
  });

  els.startBtn.addEventListener("click", startSorting);
}

function startSorting() {
  const selected = new Set(
    [...els.albumGrid.querySelectorAll('input[name="album"]:checked')].map(
      (c) => c.value
    )
  );
  if (selected.size === 0) {
    alert("Please pick at least one album.");
    return;
  }

  const songs = buildSongList(selected);
  if (songs.length < 2) {
    alert("Need at least two songs to sort. Pick more albums.");
    return;
  }

  sort = new SongSort(songs);
  showPhase("sort");
  renderComparison();
}

function cardContent(card, item) {
  card.replaceChildren();
  const img = document.createElement("img");
  img.src = item.album.cover;
  img.alt = item.album.title;
  img.className = "card__img";
  const text = document.createElement("div");
  text.className = "card__text";
  const title = document.createElement("span");
  title.className = "card__title";
  title.textContent = item.title;
  const album = document.createElement("span");
  album.className = "card__album";
  album.textContent = item.album.title;
  text.append(title, album);
  card.append(img, text);
}

function renderComparison() {
  if (sort.isDone()) {
    showResults();
    return;
  }
  cardContent(els.leftCard, sort.currentLeft());
  cardContent(els.rightCard, sort.currentRight());
  els.battle.textContent = sort.battle;
  els.progressBar.value = sort.progress();
  els.progressPct.textContent = sort.progress();
  els.undoBtn.disabled = sort.history.length === 0;
}

function setupSortPhase() {
  els.leftCard.addEventListener("click", () => {
    sort.choose(-1);
    renderComparison();
  });
  els.rightCard.addEventListener("click", () => {
    sort.choose(1);
    renderComparison();
  });
  els.tieBtn.addEventListener("click", () => {
    sort.choose(0);
    renderComparison();
  });
  els.undoBtn.addEventListener("click", () => {
    if (sort.undo()) renderComparison();
  });
  els.restartSortBtn.addEventListener("click", () => {
    if (confirm("Discard current sort and pick albums again?")) location.reload();
  });
}

function buildPodiumCard({ rank, item }, place) {
  const card = document.createElement("div");
  card.className = `podium-card podium-card--${place}`;

  const badge = document.createElement("span");
  badge.className = "podium-card__rank";
  badge.textContent = rank;

  const img = document.createElement("img");
  img.className = "podium-card__img";
  img.src = item.album.cover;
  img.alt = item.album.title;

  const title = document.createElement("span");
  title.className = "podium-card__title";
  title.textContent = item.title;

  const album = document.createElement("span");
  album.className = "podium-card__album";
  album.textContent = item.album.title;

  card.append(badge, img, title, album);
  return card;
}

function buildResultCell({ rank, item }) {
  const li = document.createElement("li");
  li.className = "result-cell";

  const rankEl = document.createElement("span");
  rankEl.className = "result-cell__rank";
  rankEl.textContent = rank;

  const img = document.createElement("img");
  img.className = "result-cell__img";
  img.src = item.album.cover;
  img.alt = "";
  img.loading = "lazy";

  const text = document.createElement("div");
  text.className = "result-cell__text";
  const title = document.createElement("span");
  title.className = "result-cell__title";
  title.textContent = item.title;
  const album = document.createElement("span");
  album.className = "result-cell__album";
  album.textContent = item.album.title;
  text.append(title, album);

  li.append(rankEl, img, text);
  return li;
}

function showResults() {
  const ranked = sort.results();

  els.podium.replaceChildren();
  ranked.slice(0, 3).forEach((entry, idx) => {
    els.podium.appendChild(buildPodiumCard(entry, idx + 1));
  });

  els.resultsList.replaceChildren();
  for (const entry of ranked.slice(3)) {
    els.resultsList.appendChild(buildResultCell(entry));
  }

  showPhase("results");
}

function setupResultsPhase() {
  els.viewToggle.addEventListener("click", (e) => {
    const btn = e.target.closest(".view-toggle__btn");
    if (!btn) return;
    for (const b of els.viewToggle.querySelectorAll(".view-toggle__btn")) {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    }
    els.resultsCard.dataset.view = btn.dataset.view;
  });

  els.rawTextBtn.addEventListener("click", () => {
    const ranked = sort.results();
    els.rawText.value = ranked
      .map(({ rank, item }) => `${rank}. ${item.title} — ${item.album.title}`)
      .join("\n");
    els.rawDialog.showModal();
  });
  els.copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(els.rawText.value);
      els.copyBtn.textContent = "Copied!";
      setTimeout(() => (els.copyBtn.textContent = "Copy"), 1500);
    } catch {
      els.rawText.select();
      document.execCommand("copy");
    }
  });
  els.closeDialogBtn.addEventListener("click", () => els.rawDialog.close());
  els.restartBtn.addEventListener("click", () => location.reload());
}

els.selectAll.checked = true;
renderAlbumGrid();
setupSelectionPhase();
setupSortPhase();
setupResultsPhase();
showPhase("select");
