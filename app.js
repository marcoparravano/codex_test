(() => {
  "use strict";

  const DB_NAME = "rally-padel";
  const DB_VERSION = 1;
  const STORE_NAME = "app";
  const LOCAL_KEY = "rally-padel-backup";
  const PAGES = {
    overview: "Overview",
    players: "Players",
    teams: "Teams",
    groups: "Groups",
    schedule: "Schedule",
    bracket: "Knockout",
    settings: "Settings"
  };
  const seed = {
    tournament: {
      name: "Northside Open",
      venue: "Northside Padel Club",
      startDate: isoDay(2),
      endDate: isoDay(3),
      courts: 4,
      format: "Groups + knockout",
      groupCount: 2,
      description: "Two days of great padel, good people and even better rallies."
    },
    players: [
      { id: "p1", name: "Sofia Reyes", email: "sofia.r@example.com", phone: "+34 612 345 678", level: "Advanced" },
      { id: "p2", name: "Luca Moretti", email: "luca.m@example.com", phone: "", level: "Advanced" },
      { id: "p3", name: "Amara Okafor", email: "amara.o@example.com", phone: "", level: "Intermediate" },
      { id: "p4", name: "Theo Martin", email: "theo.m@example.com", phone: "", level: "Intermediate" },
      { id: "p5", name: "Elena Costa", email: "elena.c@example.com", phone: "", level: "Advanced" },
      { id: "p6", name: "Jules Bernard", email: "jules.b@example.com", phone: "", level: "Intermediate" },
      { id: "p7", name: "Nina Patel", email: "nina.p@example.com", phone: "", level: "Intermediate" },
      { id: "p8", name: "Mateo Silva", email: "mateo.s@example.com", phone: "", level: "Advanced" },
      { id: "p9", name: "Aisha Khan", email: "aisha.k@example.com", phone: "", level: "Beginner" },
      { id: "p10", name: "Oscar Lind", email: "oscar.l@example.com", phone: "", level: "Intermediate" },
      { id: "p11", name: "Mia Thompson", email: "mia.t@example.com", phone: "", level: "Intermediate" },
      { id: "p12", name: "Rafael Costa", email: "rafael.c@example.com", phone: "", level: "Advanced" },
      { id: "p13", name: "Chloe Dubois", email: "chloe.d@example.com", phone: "", level: "Intermediate" },
      { id: "p14", name: "Leo Fischer", email: "leo.f@example.com", phone: "", level: "Intermediate" },
      { id: "p15", name: "Zara Ali", email: "zara.a@example.com", phone: "", level: "Advanced" },
      { id: "p16", name: "Ben Carter", email: "ben.c@example.com", phone: "", level: "Intermediate" }
    ],
    teams: [
      { id: "t1", name: "Court Vision", players: ["p1", "p2"], groupId: "gA" },
      { id: "t2", name: "Drop Shot Duo", players: ["p3", "p4"], groupId: "gA" },
      { id: "t3", name: "The Lobbers", players: ["p5", "p6"], groupId: "gA" },
      { id: "t4", name: "Love All", players: ["p7", "p8"], groupId: "gA" },
      { id: "t5", name: "Smash Sisters", players: ["p9", "p10"], groupId: "gB" },
      { id: "t6", name: "Net Results", players: ["p11", "p12"], groupId: "gB" },
      { id: "t7", name: "Deuce Bags", players: ["p13", "p14"], groupId: "gB" },
      { id: "t8", name: "Racket Science", players: ["p15", "p16"], groupId: "gB" }
    ],
    groups: [
      { id: "gA", name: "Group A", teams: ["t1", "t2", "t3", "t4"] },
      { id: "gB", name: "Group B", teams: ["t5", "t6", "t7", "t8"] }
    ],
    matches: [
      { id: "m1", phase: "group", groupId: "gA", round: 1, teamA: "t1", teamB: "t2", date: isoDay(2), time: "09:00", court: "Court 1", sets: [[6, 3], [6, 4]], status: "completed" },
      { id: "m2", phase: "group", groupId: "gA", round: 1, teamA: "t3", teamB: "t4", date: isoDay(2), time: "09:00", court: "Court 2", sets: [[6, 7], [6, 4], [6, 3]], status: "completed" },
      { id: "m3", phase: "group", groupId: "gB", round: 1, teamA: "t5", teamB: "t6", date: isoDay(2), time: "10:00", court: "Court 1", sets: [], status: "scheduled" },
      { id: "m4", phase: "group", groupId: "gB", round: 1, teamA: "t7", teamB: "t8", date: isoDay(2), time: "10:00", court: "Court 2", sets: [], status: "scheduled" },
      { id: "m5", phase: "group", groupId: "gA", round: 2, teamA: "t1", teamB: "t3", date: isoDay(2), time: "11:00", court: "Court 1", sets: [], status: "scheduled" },
      { id: "m6", phase: "group", groupId: "gA", round: 2, teamA: "t2", teamB: "t4", date: isoDay(2), time: "11:00", court: "Court 2", sets: [], status: "scheduled" },
      { id: "m7", phase: "group", groupId: "gB", round: 2, teamA: "t5", teamB: "t7", date: isoDay(2), time: "12:00", court: "Court 1", sets: [], status: "scheduled" },
      { id: "m8", phase: "group", groupId: "gB", round: 2, teamA: "t6", teamB: "t8", date: isoDay(2), time: "12:00", court: "Court 2", sets: [], status: "scheduled" },
      { id: "m9", phase: "group", groupId: "gA", round: 3, teamA: "t1", teamB: "t4", date: isoDay(2), time: "13:00", court: "Court 1", sets: [], status: "scheduled" },
      { id: "m10", phase: "group", groupId: "gA", round: 3, teamA: "t2", teamB: "t3", date: isoDay(2), time: "13:00", court: "Court 2", sets: [], status: "scheduled" },
      { id: "m11", phase: "group", groupId: "gB", round: 3, teamA: "t5", teamB: "t8", date: isoDay(2), time: "14:00", court: "Court 1", sets: [], status: "scheduled" },
      { id: "m12", phase: "group", groupId: "gB", round: 3, teamA: "t6", teamB: "t7", date: isoDay(2), time: "14:00", court: "Court 2", sets: [], status: "scheduled" }
    ],
    page: "overview"
  };

  let state;
  let db;
  let saveTimer;
  let installPrompt;
  const app = document.getElementById("app");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  function isoDay(offset = 0) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().slice(0, 10);
  }

  function uid(prefix) {
    return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) {
        reject(new Error("This browser does not support local database storage."));
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("Could not open the local database."));
    });
  }

  function dbRequest(mode, operation) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, mode);
      const request = operation(transaction.objectStore(STORE_NAME));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("Could not access tournament data."));
      transaction.onabort = () => reject(transaction.error || new Error("The database transaction was interrupted."));
    });
  }

  async function persist() {
    if (!state) return;
    const snapshot = clone(state);
    let localBackupSaved = false;
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(snapshot));
      localBackupSaved = true;
    } catch (error) {
      console.error("The browser backup could not be updated:", error);
    }
    if (db) {
      try {
        await dbRequest("readwrite", store => store.put(snapshot, "state"));
      } catch (error) {
        console.error("Tournament data could not be saved to IndexedDB:", error);
        if (!localBackupSaved) toast("Could not save changes. Export a backup before leaving.");
        else toast("Saved a browser backup, but the local database could not be updated.");
      }
    }
    if (!localBackupSaved) toast(db ? "Local database saved; browser backup could not be updated." : "Could not save changes. Export a backup before leaving.");
    const stamp = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    document.getElementById("saved-at").textContent = `Saved at ${stamp}`;
  }

  function queueSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(persist, 140);
  }

  async function init() {
    try {
      db = await openDatabase();
      let saved = await dbRequest("readonly", store => store.get("state"));
      if (!saved) {
        try {
          saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || "null");
        } catch (error) {
          console.error("The local backup could not be read:", error);
        }
      }
      state = normalizeState(saved || clone(seed));
      await persist();
    } catch (error) {
      console.error("Local database is unavailable:", error);
      try {
        state = normalizeState(JSON.parse(localStorage.getItem(LOCAL_KEY) || "null") || clone(seed));
      } catch (fallbackError) {
        console.error("The local backup could not be loaded:", fallbackError);
        state = clone(seed);
      }
      toast("Using browser backup storage. Export a copy from Settings.");
    }
    render();
    setupInstallPrompt();
  }

  function normalizeState(value) {
    const initial = clone(seed);
    if (!value || typeof value !== "object") return initial;
    for (const key of ["tournament", "players", "teams", "groups", "matches"]) {
      if (value[key] !== undefined) initial[key] = value[key];
    }
    initial.page = PAGES[value.page] ? value.page : "overview";
    return initial;
  }

  function player(id) { return state.players.find(item => item.id === id); }
  function team(id) { return state.teams.find(item => item.id === id); }
  function group(id) { return state.groups.find(item => item.id === id); }
  function teamName(id) { return team(id)?.name || "TBD"; }
  function groupName(id) { return group(id)?.name || ""; }
  function teamPlayers(id) { return (team(id)?.players || []).map(playerId => player(playerId)?.name || "Player").join(" & "); }
  function initials(value) {
    return String(value || "").trim().split(/\s+/).slice(0, 2).map(part => part[0] || "").join("").toUpperCase() || "??";
  }
  function dayLabel(date, options = { weekday: "short", month: "short", day: "numeric" }) {
    if (!date) return "Date to be confirmed";
    return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, options);
  }
  function scoreText(match) {
    return (match.sets || []).map(set => `${set[0]}–${set[1]}`).join("  ");
  }
  function matchWinner(match) {
    if (!match) return null;
    if (match.status === "bye") return match.teamA || match.teamB || null;
    if (match.status !== "completed") return null;
    const wins = [0, 0];
    for (const set of match.sets || []) {
      if (set[0] > set[1]) wins[0]++;
      else if (set[1] > set[0]) wins[1]++;
    }
    return wins[0] === wins[1] ? null : (wins[0] > wins[1] ? match.teamA : match.teamB);
  }
  function groupStats(groupId) {
    const groupTeamIds = group(groupId)?.teams || [];
    const stats = new Map(groupTeamIds.map(id => [id, { id, played: 0, won: 0, lost: 0, setsFor: 0, setsAgainst: 0, gamesFor: 0, gamesAgainst: 0, points: 0 }]));
    for (const match of state.matches.filter(item => item.phase === "group" && item.groupId === groupId && item.status === "completed")) {
      const a = stats.get(match.teamA);
      const b = stats.get(match.teamB);
      if (!a || !b) continue;
      a.played++; b.played++;
      for (const [scoreA, scoreB] of match.sets || []) {
        a.gamesFor += scoreA; a.gamesAgainst += scoreB;
        b.gamesFor += scoreB; b.gamesAgainst += scoreA;
        if (scoreA > scoreB) { a.setsFor++; b.setsAgainst++; }
        else { b.setsFor++; a.setsAgainst++; }
      }
      const winner = matchWinner(match);
      if (winner === a.id) { a.won++; a.points += 3; b.lost++; }
      else if (winner === b.id) { b.won++; b.points += 3; a.lost++; }
    }
    return [...stats.values()].sort((a, b) => b.points - a.points || (b.setsFor - b.setsAgainst) - (a.setsFor - a.setsAgainst) || (b.gamesFor - b.gamesAgainst) - (a.gamesFor - a.gamesAgainst) || teamName(a.id).localeCompare(teamName(b.id)));
  }

  function setPage(page) {
    if (!PAGES[page]) return;
    state.page = page;
    queueSave();
    render();
  }

  function render() {
    const page = state.page || "overview";
    document.getElementById("page-breadcrumb").textContent = PAGES[page] || "Overview";
    document.querySelectorAll(".nav-item[data-page]").forEach(button => button.classList.toggle("active", button.dataset.page === page));
    document.getElementById("player-count").textContent = state.players.length;
    document.getElementById("team-count").textContent = state.teams.length;
    app.innerHTML = ({
      overview: renderOverview,
      players: renderPlayers,
      teams: renderTeams,
      groups: renderGroups,
      schedule: renderSchedule,
      bracket: renderBracket,
      settings: renderSettings
    }[page] || renderOverview)();
    if (installPrompt) {
      const button = document.getElementById("install-button");
      if (button) button.hidden = false;
    }
  }

  function heading(eyebrow, title, subtitle, actions = "") {
    return `<div class="page-heading"><div><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}</h1><p class="subheading">${esc(subtitle)}</p></div>${actions ? `<div class="heading-actions">${actions}</div>` : ""}</div>`;
  }

  function emptyState(icon, title, description, action = "") {
    return `<div class="empty-state"><span>${icon}</span><strong>${esc(title)}</strong><p>${esc(description)}</p>${action}</div>`;
  }

  function renderOverview() {
    const matches = state.matches.filter(match => match.phase === "group");
    const completed = matches.filter(match => match.status === "completed").length;
    const next = state.matches.filter(match => match.status !== "completed").sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)).slice(0, 4);
    const qualifiers = state.groups.reduce((total, item) => total + Math.min(2, (item.teams || []).length), 0);
    const nextMatches = next.length ? next.map(match => matchRow(match)).join("") : emptyState("✓", "All caught up", "There are no upcoming matches. Add teams and generate your group fixtures.");
    return `
      <section class="hero-card">
        <div class="hero-copy">
          <div class="hero-kicker">${esc(state.tournament.format || "Padel tournament")} · ${esc(dayLabel(state.tournament.startDate, { month: "long", day: "numeric" }))}</div>
          <h1>${esc(state.tournament.name)}</h1>
          <p>${esc(state.tournament.venue)} · ${esc(state.tournament.description || "A great day of padel awaits.")}</p>
          <div class="hero-actions"><button class="button button-light" data-page="schedule">View schedule <span>→</span></button><button class="button button-quiet" data-action="share">↗ Invite players</button></div>
        </div>
        <div class="hero-stats"><div class="hero-stat"><strong>${state.players.length}</strong><span>Players</span></div><div class="hero-stat"><strong>${state.teams.length}</strong><span>Teams</span></div><div class="hero-stat"><strong>${completed}<small style="font-size:13px;color:#c5d5c1">/${matches.length}</small></strong><span>Matches played</span></div></div>
      </section>
      <section class="stats-grid">
        ${statCard("Players registered", state.players.length, "♙", "Build your line-up")}
        ${statCard("Teams ready", state.teams.length, "♧", `${state.teams.filter(t => t.groupId).length} assigned to groups`)}
        ${statCard("Matches played", completed, "▤", `${matches.length - completed} still to play`)}
        ${statCard("Knockout spots", qualifiers, "⌘", "Top 2 from each group")}
      </section>
      <section class="content-grid">
        <div class="panel"><div class="panel-heading"><div><h2>Upcoming matches</h2><p>Your next fixtures at a glance</p></div><button class="text-button" data-page="schedule">Full schedule →</button></div><div class="match-list">${nextMatches}</div></div>
        <div class="panel"><div class="panel-heading"><div><h2>Quick actions</h2><p>Keep your tournament moving</p></div></div><div class="quick-list">
          ${quickAction("♙", "Add a player", "Grow your tournament line-up", "add-player", "players")}
          ${quickAction("♧", "Create a team", "Pair players up for the draw", "add-team", "teams")}
          ${quickAction("▦", "View group standings", "See who's on top", "", "groups")}
          ${quickAction("↗", "Invite your players", "Share the tournament details", "share")}
        </div></div>
      </section>`;
  }

  function statCard(label, value, icon, foot) {
    return `<div class="stat-card"><div class="stat-label">${esc(label)}<span class="stat-icon">${icon}</span></div><div class="stat-value">${value}<span class="stat-foot">${esc(foot)}</span></div></div>`;
  }

  function quickAction(icon, title, description, action, page) {
    return `<button class="quick-item" ${action ? `data-action="${action}"` : `data-page="${page}"`} style="width:100%;border-style:solid;text-align:left;cursor:pointer"><span class="quick-icon">${icon}</span><span class="quick-copy"><strong>${esc(title)}</strong><small>${esc(description)}</small></span><span class="quick-arrow">→</span></button>`;
  }

  function matchRow(match) {
    const winner = matchWinner(match);
    return `<div class="match-row">
      ${matchTeam(match.teamA, "left", winner === match.teamA)}
      <div class="match-score">${match.status === "completed" ? esc(scoreText(match)) : `<small>VS</small>`}<small>${esc(groupName(match.groupId) || match.roundLabel || "Group stage")}</small></div>
      ${matchTeam(match.teamB, "right", winner === match.teamB)}
      <div class="match-time"><span>${esc(match.time || "TBC")}</span><small>${esc(match.court || "Court TBC")}</small>${match.status === "completed" ? `<span class="badge">Final</span>` : `<button class="button button-quiet button-small" data-action="score" data-id="${esc(match.id)}">Add score</button>`}</div>
    </div>`;
  }

  function matchTeam(id, side, isWinner = false) {
    const name = teamName(id);
    const content = `<span class="team-monogram">${esc(initials(name))}</span><span class="team-copy"><strong${isWinner ? ' style="color:#346242"' : ""}>${esc(name)}</strong><small>${esc(id && team(id) ? teamPlayers(id) : "Team to be confirmed")}</small></span>`;
    return `<div class="match-team ${side}">${content}</div>`;
  }

  function renderPlayers() {
    const actions = `<button class="button button-quiet" data-action="share">↗ Invite players</button><button class="button" data-action="add-player">＋ Add player</button>`;
    const rows = state.players.map(item => `<tr><td><div class="person-cell"><span class="person-avatar">${esc(initials(item.name))}</span><span class="table-primary">${esc(item.name)}</span></div></td><td>${esc(item.email || "—")}</td><td>${esc(item.phone || "—")}</td><td><span class="badge ${item.level === "Beginner" ? "badge-pending" : ""}">${esc(item.level || "Unrated")}</span></td><td>${state.teams.some(t => t.players.includes(item.id)) ? `<span class="badge">In a team</span>` : `<span class="badge badge-empty">Unpaired</span>`}</td><td><div class="row-actions"><button class="icon-button" data-action="edit-player" data-id="${esc(item.id)}" aria-label="Edit ${esc(item.name)}">✎</button><button class="icon-button" data-action="remove-player" data-id="${esc(item.id)}" aria-label="Remove ${esc(item.name)}">×</button></div></td></tr>`).join("");
    return `${heading("TOURNAMENT ROSTER", "Players", `${state.players.length} registered player${state.players.length === 1 ? "" : "s"} · invite your community to join`, actions)}
      <div class="panel">${state.players.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Player</th><th>Email</th><th>Phone</th><th>Level</th><th>Team</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table></div>` : emptyState("♙", "Your roster starts here", "Add players or share an invite to start building the draw.", `<button class="button button-small" data-action="add-player">＋ Add player</button>`)}</div>`;
  }

  function renderTeams() {
    const actions = `<button class="button button-quiet" data-action="share">↗ Invite players</button><button class="button" data-action="add-team">＋ Create team</button>`;
    const rows = state.teams.map(item => `<tr><td><div class="team-cell"><span class="team-monogram">${esc(initials(item.name))}</span><span class="table-primary">${esc(item.name)}</span></div></td><td>${esc(teamPlayers(item.id))}</td><td>${item.groupId ? `<span class="badge">${esc(groupName(item.groupId))}</span>` : `<span class="badge badge-empty">Unassigned</span>`}</td><td><div class="row-actions"><button class="icon-button" data-action="edit-team" data-id="${esc(item.id)}" aria-label="Edit ${esc(item.name)}">✎</button><button class="icon-button" data-action="remove-team" data-id="${esc(item.id)}" aria-label="Remove ${esc(item.name)}">×</button></div></td></tr>`).join("");
    return `${heading("THE LINE-UP", "Teams", `${state.teams.length} team${state.teams.length === 1 ? "" : "s"} · each team pairs two players`, actions)}
      <div class="panel">${state.teams.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Team</th><th>Players</th><th>Group</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table></div>` : emptyState("♧", "Time to team up", "Pair two registered players to make a team.", `<button class="button button-small" data-action="add-team">＋ Create team</button>`)}</div>
      <p class="subheading" style="margin:13px 2px">Unpaired players can still be registered and added to a team later.</p>`;
  }

  function renderGroups() {
    const actions = `<button class="button button-quiet" data-action="auto-assign">⇄ Auto-assign teams</button><button class="button button-quiet" data-action="add-group">＋ Add group</button><button class="button" data-action="generate-groups">↻ Generate group matches</button>`;
    const cards = state.groups.map(item => groupCard(item)).join("");
    return `${heading("THE GROUP STAGE", "Groups & standings", "Round-robin results update the table automatically", actions)}
      <div class="group-grid">${cards || emptyState("▦", "No groups yet", "Create a group to start assigning teams.", `<button class="button button-small" data-action="add-group">＋ Add group</button>`)}</div>
      ${state.groups.length ? `<div class="panel" style="margin-top:15px"><div class="panel-heading"><div><h2>Group stage fixtures</h2><p>Every team plays each other once in their group</p></div><button class="text-button" data-page="schedule">View schedule →</button></div><div class="match-list">${state.matches.filter(m => m.phase === "group").slice(0, 5).map(matchRow).join("") || emptyState("▤", "No fixtures generated yet", "Generate round-robin matches to fill out your schedule.")}</div></div>` : ""}`;
  }

  function groupCard(item) {
    const stats = groupStats(item.id);
    const body = stats.length ? `<table class="standing-table"><thead><tr><th>#</th><th>Team</th><th>P</th><th>W</th><th>L</th><th>Pts</th></tr></thead><tbody>${stats.map((row, index) => `<tr><td class="standing-rank">${index + 1}</td><td><span class="standing-team"><span class="team-monogram">${esc(initials(teamName(row.id)))}</span>${esc(teamName(row.id))}</span></td><td>${row.played}</td><td>${row.won}</td><td>${row.lost}</td><td class="standing-points">${row.points}</td></tr>`).join("")}</tbody></table>` : emptyState("♧", "No teams assigned", "Assign teams from the Teams page to build standings.");
    return `<div class="panel group-card"><div class="group-title"><div><span class="group-letter">${esc(item.name.replace(/^Group\s*/i, "").slice(0, 2).toUpperCase())}</span><span><h3>${esc(item.name)}</h3><small>${(item.teams || []).length} teams · top 2 qualify</small></span></div><button class="icon-button" data-action="assign-group" data-id="${esc(item.id)}" aria-label="Assign teams to ${esc(item.name)}">＋</button></div>${body}</div>`;
  }

  function renderSchedule() {
    const actions = `<button class="button button-quiet" data-action="generate-groups">↻ Generate fixtures</button><button class="button" data-action="add-match">＋ Add match</button>`;
    const matches = [...state.matches].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
    const days = [...new Set(matches.map(match => match.date || ""))];
    const body = matches.length ? days.map(date => `<div><div class="schedule-day">${esc(dayLabel(date, { weekday: "long", month: "long", day: "numeric" }))}</div><div class="schedule-list">${matches.filter(match => (match.date || "") === date).map(match => scheduleCard(match)).join("")}</div></div>`).join("") : emptyState("▤", "No fixtures on the board", "Generate the round-robin schedule from your groups, or add a match manually.", `<button class="button button-small" data-action="generate-groups">Generate fixtures</button>`);
    return `${heading("PLAY TIMES & COURTS", "Match schedule", `${matches.length} fixture${matches.length === 1 ? "" : "s"} · tap any match to enter a score`, actions)}<div class="section-stack">${body}</div>`;
  }

  function scheduleCard(match) {
    const winner = matchWinner(match);
    return `<article class="schedule-card"><div class="schedule-clock">${esc(match.time || "TBC")}<small>${esc(groupName(match.groupId) || match.roundLabel || "Group stage")}</small></div><div class="schedule-teams"><div class="schedule-side"><span class="team-monogram">${esc(initials(teamName(match.teamA)))}</span><span${winner === match.teamA ? ' style="color:#346242"' : ""}>${esc(teamName(match.teamA))}</span>${match.status === "completed" ? `<small>${(match.sets || []).map(set => set[0]).join(" ")}</small>` : ""}</div><div class="schedule-side"><span class="team-monogram">${esc(initials(teamName(match.teamB)))}</span><span${winner === match.teamB ? ' style="color:#346242"' : ""}>${esc(teamName(match.teamB))}</span>${match.status === "completed" ? `<small>${(match.sets || []).map(set => set[1]).join(" ")}</small>` : ""}</div></div><div class="schedule-location">${esc(match.court || "Court TBC")}<small>${esc(match.status === "completed" ? scoreText(match) : "Best of 3 sets")}</small></div><div class="schedule-status">${match.status === "completed" ? `<button class="button button-quiet button-small" data-action="score" data-id="${esc(match.id)}">Edit score</button>` : `<button class="button button-quiet button-small" data-action="score" data-id="${esc(match.id)}">Enter score</button>`}</div></article>`;
  }

  function renderBracket() {
    const rounds = [...new Set(state.matches.filter(m => m.phase === "knockout").map(m => m.round))].sort((a, b) => a - b);
    const actions = `<button class="button button-quiet" data-action="share">↗ Share draw</button><button class="button" data-action="generate-bracket">✦ Generate bracket</button>`;
    let content = emptyState("⌘", "Your finals are waiting", "Generate a knockout draw once your groups have teams. The top two from every group qualify.", state.groups.length ? `<button class="button button-small" data-action="generate-bracket">Generate bracket</button>` : "");
    if (rounds.length) {
      const roundNames = roundLabels(rounds.length);
      content = `<div class="panel"><div class="bracket-scroll"><div class="bracket">${rounds.map((round, index) => `<div class="bracket-round"><h3>${esc(roundNames[index])}</h3>${state.matches.filter(m => m.phase === "knockout" && m.round === round).sort((a, b) => a.bracketIndex - b.bracketIndex).map(match => bracketMatch(match, round)).join("")}</div>`).join("")}</div></div></div>`;
    }
    return `${heading("THE ROAD TO THE FINAL", "Knockout bracket", "Top teams from each group go head-to-head", actions)}${content}`;
  }

  function roundLabels(count) {
    if (count === 1) return ["Final"];
    const labels = [];
    for (let i = count; i >= 1; i--) labels.push(i === 1 ? "Final" : i === 2 ? "Semi-finals" : i === 3 ? "Quarter-finals" : `Round of ${2 ** i}`);
    return labels;
  }

  function bracketMatch(match, round) {
    const winner = matchWinner(match);
    const side = id => `<div class="bracket-side${winner && winner === id ? " bracket-winner" : ""}"><span class="bracket-seed">•</span><span>${esc(id ? teamName(id) : "To be decided")}</span>${winner && id ? `<span class="bracket-score">${(match.sets || []).map(set => set[id === match.teamA ? 0 : 1]).join(" ")}</span>` : ""}</div>`;
    return `<div><div class="bracket-match">${side(match.teamA)}${side(match.teamB)}</div>${match.teamA && match.teamB && match.status !== "bye" ? `<div class="bracket-actions"><button class="text-button" data-action="score" data-id="${esc(match.id)}">${match.status === "completed" ? "Edit score" : "Enter score"}</button></div>` : round === 1 && match.status !== "bye" ? `<div class="bracket-actions"><button class="text-button" data-action="schedule-match" data-id="${esc(match.id)}">Schedule</button></div>` : ""}</div>`;
  }

  function renderSettings() {
    const tournament = state.tournament;
    return `${heading("MAKE IT YOURS", "Tournament settings", "Manage your event details and keep a safe copy of your data")}
      <div class="settings-grid"><div class="panel"><div class="panel-heading"><div><h2>Tournament details</h2><p>These details appear on your invite and dashboard</p></div></div>
        <form id="settings-form" class="settings-form">
          <div class="field full"><label for="t-name">Tournament name</label><input id="t-name" name="name" required maxlength="80" value="${esc(tournament.name)}"></div>
          <div class="field"><label for="t-venue">Venue</label><input id="t-venue" name="venue" required maxlength="100" value="${esc(tournament.venue)}"></div>
          <div class="field"><label for="t-format">Format</label><select id="t-format" name="format"><option${tournament.format === "Groups + knockout" ? " selected" : ""}>Groups + knockout</option><option${tournament.format === "Round robin" ? " selected" : ""}>Round robin</option><option${tournament.format === "Knockout" ? " selected" : ""}>Knockout</option></select></div>
          <div class="field"><label for="t-start">Start date</label><input id="t-start" name="startDate" type="date" value="${esc(tournament.startDate || "")}"></div>
          <div class="field"><label for="t-end">End date</label><input id="t-end" name="endDate" type="date" value="${esc(tournament.endDate || "")}"></div>
          <div class="field"><label for="t-courts">Available courts</label><input id="t-courts" name="courts" type="number" min="1" max="32" required value="${esc(tournament.courts || 4)}"></div>
          <div class="field"><label for="t-groups">Number of groups</label><input id="t-groups" name="groupCount" type="number" min="1" max="16" required value="${esc(tournament.groupCount || 2)}"></div>
          <div class="field full"><label for="t-description">Tournament description</label><textarea id="t-description" name="description" maxlength="220">${esc(tournament.description || "")}</textarea></div>
          <div class="settings-actions"><button class="button" type="submit">Save tournament details</button></div>
        </form></div>
        <div class="panel backup-card"><div class="panel-heading"><div><h2>Data & backups</h2><p>Your tournament stays yours</p></div></div>
          <p>Your tournament is saved on this device automatically as you work. Export a JSON backup to move it to another device or keep a copy somewhere safe.</p>
          <div class="notice">Auto-save runs after each change and when the app is closed. Your data stays in this browser and isn't uploaded to a server.</div>
          <div class="backup-actions"><button class="button button-quiet" data-action="export">↓ Export tournament backup</button><button class="button button-quiet" data-action="restore">↑ Restore from backup</button><button class="button button-quiet" data-action="install" id="install-button" hidden>＋ Install app</button></div>
          <p>Invite links open the tournament on this device. Use Export backup to share a portable copy of tournament data.</p>
        </div></div>`;
  }

  function modalForm(title, subtitle, fields, submitLabel, formId = "action-form") {
    modalContent.innerHTML = `<div class="modal-header"><div><h2>${esc(title)}</h2><p>${esc(subtitle)}</p></div><button type="button" class="modal-close" data-action="close-modal" aria-label="Close">×</button></div><form class="modal-form" id="${formId}"><div class="modal-fields">${fields}</div><div class="modal-footer"><button type="button" class="button button-quiet" data-action="close-modal">Cancel</button><button class="button" type="submit">${esc(submitLabel)}</button></div></form>`;
    modal.showModal();
  }

  function field(label, name, value = "", type = "text", options = {}) {
    const id = `field-${name}`;
    if (options.select) {
      const choices = options.select.map(option => `<option value="${esc(option.value)}"${String(option.value) === String(value) ? " selected" : ""}>${esc(option.label)}</option>`).join("");
      return `<div class="field ${options.full ? "full" : ""}"><label for="${id}">${esc(label)}</label><select id="${id}" name="${esc(name)}" ${options.required === false ? "" : "required"}>${choices}</select></div>`;
    }
    return `<div class="field ${options.full ? "full" : ""}"><label for="${id}">${esc(label)}</label><input id="${id}" name="${esc(name)}" type="${esc(type)}" value="${esc(value)}" ${options.required === false ? "" : "required"} ${options.extra || ""}></div>`;
  }

  function addPlayer(existing) {
    const item = existing || {};
    const fields = `${field("Full name", "name", item.name || "", "text", { full: true, extra: 'maxlength="70" autocomplete="name"' })}${field("Email address", "email", item.email || "", "email", { extra: 'autocomplete="email"' })}${field("Phone (optional)", "phone", item.phone || "", "tel", { required: false, extra: 'autocomplete="tel"' })}${field("Playing level", "level", item.level || "Intermediate", "text", { full: true, select: ["Beginner", "Intermediate", "Advanced"].map(value => ({ value, label: value })) })}`;
    modalForm(existing ? "Edit player" : "Add a player", existing ? "Update this player's registration details." : "Add a player to your tournament roster.", fields, existing ? "Save player" : "Add player");
    document.getElementById("action-form").addEventListener("submit", event => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(event.currentTarget).entries());
      if (existing) Object.assign(existing, values);
      else state.players.push({ id: uid("p"), ...values });
      commit(existing ? "Player details updated." : `${values.name} added to the roster.`, "players");
    });
  }

  function addTeam(existing) {
    const item = existing || {};
    const used = state.teams.filter(teamItem => teamItem.id !== item.id).flatMap(teamItem => teamItem.players);
    const available = state.players.filter(p => !used.includes(p.id) || (item.players || []).includes(p.id));
    if (!existing && available.length < 2) {
      toast("Add at least two unpaired players before creating a team.");
      return;
    }
    const playerChoices = [{ value: "", label: "Choose a player" }, ...available.map(p => ({ value: p.id, label: p.name }))];
    const groupChoices = [{ value: "", label: "Unassigned" }, ...state.groups.map(g => ({ value: g.id, label: g.name }))];
    const fields = `${field("Team name", "name", item.name || "", "text", { full: true, extra: 'maxlength="60"' })}${field("Player one", "playerA", item.players?.[0] || "", "text", { select: playerChoices })}${field("Player two", "playerB", item.players?.[1] || "", "text", { select: playerChoices })}${field("Assign to group", "groupId", item.groupId || "", "text", { full: true, select: groupChoices, required: false })}`;
    modalForm(existing ? "Edit team" : "Create a team", "A padel team is made up of two registered players.", fields, existing ? "Save team" : "Create team");
    document.getElementById("action-form").addEventListener("submit", event => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(event.currentTarget).entries());
      if (values.playerA === values.playerB) { toast("Choose two different players."); return; }
      const teamValue = { id: item.id || uid("t"), name: values.name, players: [values.playerA, values.playerB], groupId: values.groupId || null };
      const groupChanged = item.groupId !== teamValue.groupId || (!existing && Boolean(teamValue.groupId));
      if (existing) Object.assign(item, teamValue);
      else state.teams.push(teamValue);
      if (groupChanged) clearDrawMatches();
      syncGroups();
      commit(existing ? "Team updated." : `${values.name} is ready to play.`, "teams");
    });
  }

  function addGroup() {
    const next = String.fromCharCode(65 + state.groups.length);
    modalForm("Add a group", "Give this group a name. You can assign teams after creating it.", field("Group name", "name", `Group ${next}`, "text", { full: true, extra: 'maxlength="30"' }), "Create group");
    document.getElementById("action-form").addEventListener("submit", event => {
      event.preventDefault();
      const name = new FormData(event.currentTarget).get("name").trim();
      if (state.groups.some(item => item.name.toLowerCase() === name.toLowerCase())) { toast("A group with that name already exists."); return; }
      state.groups.push({ id: uid("g"), name, teams: [] });
      commit(`${name} created.`, "groups");
    });
  }

  function assignGroup(groupId) {
    const item = group(groupId);
    if (!item) return;
    const choices = state.teams.map(teamItem => `<label class="check-row"><input type="checkbox" name="team" value="${esc(teamItem.id)}" ${(item.teams || []).includes(teamItem.id) ? "checked" : ""}><span><strong>${esc(teamItem.name)}</strong><small>${esc(teamPlayers(teamItem.id))}</small></span></label>`).join("");
    modalContent.innerHTML = `<div class="modal-header"><div><h2>Assign teams</h2><p>Select the teams playing in ${esc(item.name)}.</p></div><button type="button" class="modal-close" data-action="close-modal">×</button></div><form class="modal-form" id="action-form">${choices || `<div class="notice">Create a team first, then come back to make your group draw.</div>`}<div class="modal-footer"><button type="button" class="button button-quiet" data-action="close-modal">Cancel</button><button class="button" type="submit">Save group</button></div></form>`;
    const style = document.createElement("style");
    style.textContent = ".check-row{display:flex;align-items:center;gap:10px;padding:10px;border:1px solid #e9ece6;border-radius:8px;font-size:11px}.check-row span{display:grid;gap:4px}.check-row small{color:#858b82;font-size:9px}";
    modalContent.appendChild(style);
    modal.showModal();
    document.getElementById("action-form").addEventListener("submit", event => {
      event.preventDefault();
      const selected = [...new FormData(event.currentTarget).getAll("team")];
      const current = [...item.teams].sort();
      const updated = [...selected].sort();
      if (current.join("|") !== updated.join("|")) clearDrawMatches();
      item.teams = selected;
      state.teams.forEach(teamItem => { if (teamItem.groupId === item.id && !selected.includes(teamItem.id)) teamItem.groupId = null; });
      selected.forEach(teamId => { const teamItem = team(teamId); if (teamItem) teamItem.groupId = item.id; });
      syncGroups();
      commit(`${item.name} assignments saved.`, "groups");
    });
  }

  function syncGroups() {
    state.groups.forEach(item => {
      item.teams = state.teams.filter(teamItem => teamItem.groupId === item.id).map(teamItem => teamItem.id);
    });
  }

  function clearDrawMatches() {
    state.matches = state.matches.filter(match => match.phase !== "group" && match.phase !== "knockout");
  }

  function autoAssignGroups() {
    if (!state.teams.length) { toast("Create at least one team before assigning groups."); return; }
    if (state.groups.some(item => item.teams.length) && !window.confirm("Replace the current group assignments and remove existing group fixtures?")) return;
    const count = Math.min(Math.max(1, Number(state.tournament.groupCount) || 2), state.teams.length);
    clearDrawMatches();
    state.groups = Array.from({ length: count }, (_, index) => ({ id: uid("g"), name: `Group ${index + 1}`, teams: [] }));
    state.teams.forEach((item, index) => {
      const target = state.groups[index % count];
      item.groupId = target.id;
      target.teams.push(item.id);
    });
    commit(`${state.teams.length} teams balanced across ${count} groups.`, "groups");
  }

  function generateGroups() {
    syncGroups();
    const eligible = state.groups.filter(item => item.teams.length > 1);
    if (!eligible.length) { toast("Add at least two teams to a group before generating fixtures."); return; }
    clearDrawMatches();
    let slot = 0;
    const courts = Math.max(1, Number(state.tournament.courts) || 1);
    for (const item of eligible) {
      for (let i = 0; i < item.teams.length; i++) {
        for (let j = i + 1; j < item.teams.length; j++) {
          const round = (i + j - 1) % Math.max(1, item.teams.length - 1) + 1;
          const timeSlot = Math.floor(slot / courts);
          const hour = 9 + timeSlot;
          const dateOffset = Math.floor(timeSlot / 9);
          const time = `${String(9 + (timeSlot % 9)).padStart(2, "0")}:00`;
          const baseDate = state.tournament.startDate || isoDay(1);
          const date = addDays(baseDate, dateOffset);
          state.matches.push({ id: uid("m"), phase: "group", groupId: item.id, round, teamA: item.teams[i], teamB: item.teams[j], date, time, court: `Court ${(slot % courts) + 1}`, sets: [], status: "scheduled" });
          slot++;
        }
      }
    }
    commit(`${state.matches.filter(match => match.phase === "group").length} group matches generated.`, "schedule");
  }

  function addDays(day, amount) {
    const date = new Date(`${day}T12:00:00`);
    date.setDate(date.getDate() + amount);
    return date.toISOString().slice(0, 10);
  }

  function addMatch(existing) {
    const item = existing || {};
    const teamChoices = [{ value: "", label: "Choose a team" }, ...state.teams.map(t => ({ value: t.id, label: t.name }))];
    if (state.teams.length < 2) { toast("Create at least two teams before scheduling a match."); return; }
    const groupChoices = [{ value: "", label: "Knockout / friendly" }, ...state.groups.map(g => ({ value: g.id, label: g.name }))];
    const fields = `${field("Team one", "teamA", item.teamA || "", "text", { select: teamChoices })}${field("Team two", "teamB", item.teamB || "", "text", { select: teamChoices })}${field("Date", "date", item.date || state.tournament.startDate || isoDay(1), "date")}${field("Time", "time", item.time || "09:00", "time")}${field("Court", "court", item.court || "Court 1", "text")}${field("Group (optional)", "groupId", item.groupId || "", "text", { select: groupChoices, required: false })}`;
    modalForm(existing ? "Schedule match" : "Add a match", "Choose the teams, court and start time.", fields, "Save match");
    document.getElementById("action-form").addEventListener("submit", event => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(event.currentTarget).entries());
      if (values.teamA === values.teamB) { toast("A team cannot play itself."); return; }
      const match = { ...item, id: item.id || uid("m"), phase: item.phase || "group", groupId: values.groupId || null, teamA: values.teamA, teamB: values.teamB, date: values.date, time: values.time, court: values.court, sets: item.sets || [], status: item.status || "scheduled" };
      if (existing) Object.assign(item, match);
      else state.matches.push(match);
      commit("Match scheduled.", "schedule");
    });
  }

  function scheduleExistingMatch(id) {
    const item = state.matches.find(match => match.id === id);
    if (item) addMatch(item);
  }

  function scoreMatch(id) {
    const match = state.matches.find(item => item.id === id);
    if (!match) return;
    const sets = match.sets || [];
    const rows = [0, 1, 2].map(index => `<div class="score-set"><span>Set ${index + 1}</span><input name="a${index}" type="number" min="0" max="99" value="${sets[index]?.[0] ?? ""}" aria-label="${esc(teamName(match.teamA))} set ${index + 1}"><span class="score-dash">–</span><input name="b${index}" type="number" min="0" max="99" value="${sets[index]?.[1] ?? ""}" aria-label="${esc(teamName(match.teamB))} set ${index + 1}"></div>`).join("");
    modalContent.innerHTML = `<div class="modal-header"><div><h2>Enter match score</h2><p>${esc(teamName(match.teamA))} vs ${esc(teamName(match.teamB))} · padel best of 3 sets</p></div><button type="button" class="modal-close" data-action="close-modal">×</button></div><form class="modal-form" id="action-form"><div class="score-head"><span>${esc(teamName(match.teamA))}</span><span></span><span>${esc(teamName(match.teamB))}</span></div><div class="score-sets">${rows}</div><div class="notice">Enter set scores from the winning team's perspective. A match is complete when a team wins two sets.</div><div class="modal-footer"><button type="button" class="button button-quiet" data-action="close-modal">Cancel</button><button class="button" type="submit">Save score</button></div></form>`;
    const style = document.createElement("style");
    style.textContent = ".score-head,.score-set{display:grid;grid-template-columns:1fr 22px 1fr;align-items:center;gap:8px;text-align:center}.score-head{color:#71796e;font-size:10px;font-weight:600}.score-sets{display:grid;gap:8px}.score-set{grid-template-columns:62px 1fr 18px 1fr}.score-set>span:first-child{color:#777e74;font-size:10px;text-align:left}.score-set input{width:100%;height:37px;border:1px solid #e4e8e1;border-radius:7px;text-align:center;font-size:13px}.score-dash{color:#a2a89f}";
    modalContent.appendChild(style);
    modal.showModal();
    document.getElementById("action-form").addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const result = [];
      for (let i = 0; i < 3; i++) {
        const a = data.get(`a${i}`), b = data.get(`b${i}`);
        if (a === "" && b === "") continue;
        if (a === "" || b === "" || !Number.isInteger(Number(a)) || !Number.isInteger(Number(b)) || Number(a) < 0 || Number(b) < 0 || Number(a) === Number(b)) {
          toast(`Set ${i + 1} needs two different non-negative scores.`);
          return;
        }
        result.push([Number(a), Number(b)]);
      }
      const winsA = result.filter(set => set[0] > set[1]).length;
      const winsB = result.filter(set => set[1] > set[0]).length;
      if (Math.max(winsA, winsB) < 2) { toast("Enter a score for a match winner: a team must win two sets."); return; }
      const completedIndex = result.findIndex((set, index) => result.slice(0, index + 1).filter(part => part[0] > part[1]).length >= 2 || result.slice(0, index + 1).filter(part => part[1] > part[0]).length >= 2);
      if (completedIndex !== result.length - 1) { toast("Remove any sets entered after a team has already won."); return; }
      match.sets = result;
      match.status = "completed";
      if (match.phase === "knockout") advanceWinner(match);
      else state.matches = state.matches.filter(item => item.phase !== "knockout");
      commit(`Score saved: ${scoreText(match)}.`, state.page);
    });
  }

  function advanceWinner(match) {
    const winner = matchWinner(match);
    if (!winner) return;
    const next = state.matches.find(item => item.phase === "knockout" && item.round === match.round + 1 && item.bracketIndex === Math.floor(match.bracketIndex / 2));
    if (next) {
      if (match.bracketIndex % 2 === 0) next.teamA = winner;
      else next.teamB = winner;
    }
  }

  function generateBracket() {
    const groupList = state.groups.filter(item => item.teams.length > 0);
    if (groupList.length < 2 || groupList.some(item => item.teams.length < 2)) {
      toast("Add at least two teams to each of at least two groups to generate a bracket.");
      return;
    }
    const qualifiers = [];
    groupList.forEach(item => groupStats(item.id).slice(0, 2).forEach((entry, rank) => qualifiers.push({ teamId: entry.id, groupId: item.id, rank: rank + 1 })));
    const unique = [...new Map(qualifiers.map(item => [item.teamId, item])).values()];
    if (unique.length < 2) { toast("At least two teams must qualify."); return; }
    state.matches = state.matches.filter(match => match.phase !== "knockout");
    const slots = 2 ** Math.ceil(Math.log2(unique.length));
    const seeded = [];
    const byGroup = new Map(groupList.map(item => [item.id, groupStats(item.id).slice(0, 2).map(entry => entry.id)]));
    for (let rank = 0; rank < 2; rank++) {
      let teams = groupList.map(item => byGroup.get(item.id)[rank]).filter(Boolean);
      if (rank === 1) teams = teams.slice().reverse();
      seeded.push(...teams);
    }
    const order = seedOrder(slots);
    const firstRound = Array(slots).fill(null);
    order.forEach((position, index) => { firstRound[position - 1] = seeded[index] || null; });
    const rounds = Math.log2(slots);
    for (let round = 1; round <= rounds; round++) {
      const count = slots / (2 ** round);
      for (let index = 0; index < count; index++) {
        const match = {
          id: uid("m"), phase: "knockout", groupId: null, round, bracketIndex: index,
          teamA: round === 1 ? firstRound[index * 2] : null,
          teamB: round === 1 ? firstRound[index * 2 + 1] : null,
          date: state.tournament.endDate || state.tournament.startDate || isoDay(2),
          time: `${String(10 + index).padStart(2, "0")}:00`,
          court: "Court 1", sets: [], status: "scheduled"
        };
        state.matches.push(match);
        if (round === 1 && Boolean(match.teamA) !== Boolean(match.teamB)) {
          match.status = "bye";
        }
      }
    }
    for (const match of state.matches.filter(item => item.phase === "knockout" && item.round === 1 && item.status === "bye")) {
      advanceWinner(match);
    }
    commit(`Knockout bracket generated with ${unique.length} qualifiers.`, "bracket");
  }

  function seedOrder(size) {
    if (size === 2) return [1, 2];
    const previous = seedOrder(size / 2);
    return previous.flatMap(seed => [seed, size + 1 - seed]);
  }

  function removePlayer(id) {
    const item = player(id);
    if (!item || !window.confirm(`Remove ${item.name} from the roster? Their team and team matches will also be removed.`)) return;
    const affected = state.teams.filter(t => t.players.includes(id)).map(t => t.id);
    state.players = state.players.filter(p => p.id !== id);
    removeTeams(affected);
    commit("Player and their team were removed.", "players");
  }

  function removeTeams(ids) {
    const removed = new Set(ids);
    state.teams = state.teams.filter(item => !removed.has(item.id));
    state.groups.forEach(item => { item.teams = item.teams.filter(id => !removed.has(id)); });
    state.matches = state.matches.filter(item => item.phase !== "knockout" && !removed.has(item.teamA) && !removed.has(item.teamB));
  }

  function removeTeam(id) {
    const item = team(id);
    if (!item || !window.confirm(`Remove ${item.name}? Its matches will also be removed.`)) return;
    removeTeams([id]);
    commit("Team removed.", state.page);
  }

  function exportBackup() {
    const payload = { app: "Rally Padel", schemaVersion: 1, exportedAt: new Date().toISOString(), data: state };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${(state.tournament.name || "rally-tournament").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-backup.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast("Tournament backup exported.");
  }

  function restoreBackup() {
    document.getElementById("restore-file").click();
  }

  async function importBackup(file) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const candidate = parsed.data || parsed;
      if (!candidate || !candidate.tournament || !Array.isArray(candidate.players) || !Array.isArray(candidate.teams) || !Array.isArray(candidate.groups) || !Array.isArray(candidate.matches)) {
        throw new Error("This file does not contain a valid Rally tournament backup.");
      }
      if (!window.confirm("Replace this device's current tournament with the backup?")) return;
      state = normalizeState(candidate);
      syncGroups();
      await persist();
      render();
      toast("Tournament backup restored.");
    } catch (error) {
      console.error("Could not restore tournament backup:", error);
      toast(error.message || "Could not read the selected backup.");
    } finally {
      document.getElementById("restore-file").value = "";
    }
  }

  async function shareInvite() {
    const url = new URL(window.location.href);
    const message = `${state.tournament.name} · ${state.tournament.venue} · ${dayLabel(state.tournament.startDate, { month: "long", day: "numeric" })}. Join us for some padel!`;
    try {
      if (navigator.share) {
        await navigator.share({ title: state.tournament.name, text: message, url: url.href });
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(`${message}\n${url.href}`);
        toast("Tournament invite copied to clipboard.");
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = `${message}\n${url.href}`;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        if (!copied) throw new Error("Clipboard access is not available.");
        toast("Tournament invite copied to clipboard.");
      }
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error("Could not share tournament invite:", error);
      toast("Unable to share. Try copying the page address.");
    }
  }

  function toast(message) {
    const element = document.createElement("div");
    element.className = "toast";
    element.textContent = message;
    document.getElementById("toast-region").appendChild(element);
    setTimeout(() => element.remove(), 3600);
  }

  function commit(message, page) {
    modal.close();
    if (page) state.page = page;
    queueSave();
    render();
    if (message) toast(message);
  }

  function setupInstallPrompt() {
    window.addEventListener("beforeinstallprompt", event => {
      event.preventDefault();
      installPrompt = event;
      const button = document.getElementById("install-button");
      if (button) button.hidden = false;
    });
    window.addEventListener("appinstalled", () => toast("Rally is installed on your device."));
  }

  async function installApp() {
    if (!installPrompt) { toast("Use your browser menu to add Rally to your home screen."); return; }
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
  }

  document.addEventListener("click", event => {
    const pageButton = event.target.closest("[data-page]");
    if (pageButton) {
      setPage(pageButton.dataset.page);
      document.getElementById("sidebar").classList.remove("open");
      return;
    }
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;
    const { action, id } = actionButton.dataset;
    if (action === "add-player") addPlayer();
    else if (action === "edit-player") addPlayer(player(id));
    else if (action === "remove-player") removePlayer(id);
    else if (action === "add-team") addTeam();
    else if (action === "edit-team") addTeam(team(id));
    else if (action === "remove-team") removeTeam(id);
    else if (action === "add-group") addGroup();
    else if (action === "assign-group") assignGroup(id);
    else if (action === "auto-assign") autoAssignGroups();
    else if (action === "generate-groups") generateGroups();
    else if (action === "add-match") addMatch();
    else if (action === "schedule-match") scheduleExistingMatch(id);
    else if (action === "score") scoreMatch(id);
    else if (action === "generate-bracket") generateBracket();
    else if (action === "share") shareInvite();
    else if (action === "export") exportBackup();
    else if (action === "restore") restoreBackup();
    else if (action === "install") installApp();
    else if (action === "close-modal") modal.close();
  });

  document.addEventListener("submit", event => {
    if (event.target.id !== "settings-form") return;
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.target).entries());
    if (values.endDate && values.startDate && values.endDate < values.startDate) {
      toast("The end date must be on or after the start date.");
      return;
    }
    state.tournament = { ...state.tournament, ...values, courts: Number(values.courts), groupCount: Number(values.groupCount) };
    commit("Tournament settings saved.", "settings");
  });

  document.getElementById("share-top").addEventListener("click", shareInvite);
  document.getElementById("mobile-menu").addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));
  document.getElementById("restore-file").addEventListener("change", event => importBackup(event.target.files[0]));
  modal.addEventListener("click", event => {
    if (event.target === modal) modal.close();
  });
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") persist(); });
  window.addEventListener("pagehide", () => { clearTimeout(saveTimer); persist(); });
  window.addEventListener("beforeunload", () => { clearTimeout(saveTimer); persist(); });
  window.addEventListener("online", () => toast("Back online. Your tournament is still saved on this device."));

  setupInstallPrompt();
  init();
})();
