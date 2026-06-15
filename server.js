const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'data', 'leaderboard.db');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── INIT SQL.JS ───────────────────────────────────────────────────────────────
let db, SQL;

async function initDB() {
  const initSqlJs = require('sql.js');
  SQL = await initSqlJs();

  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

  if (fs.existsSync(DB_PATH)) {
    const buf = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buf);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS players (
      id      TEXT PRIMARY KEY,
      name    TEXT NOT NULL,
      points  INTEGER NOT NULL DEFAULT 0,
      guesses INTEGER NOT NULL DEFAULT 0,
      created INTEGER NOT NULL DEFAULT (strftime('%s','now'))
    )
  `);

  persist();
  console.log('✅ Database ready:', DB_PATH);
}

function persist() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function allPlayers() {
  const stmt = db.prepare('SELECT * FROM players ORDER BY points DESC, guesses DESC, name ASC');
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

// ── API ROUTES ────────────────────────────────────────────────────────────────

// GET all players
app.get('/api/players', (req, res) => {
  res.json(allPlayers());
});

// POST new player
app.post('/api/players', (req, res) => {
  const { id, name } = req.body;
  if (!id || !name?.trim()) return res.status(400).json({ error: 'id and name required' });
  try {
    db.run('INSERT INTO players (id, name, points, guesses) VALUES (?, ?, 0, 0)', [id, name.trim()]);
    persist();
    res.json({ ok: true, players: allPlayers() });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PATCH update player (name, points, guesses)
app.patch('/api/players/:id', (req, res) => {
  const { id } = req.params;
  const { name, points, guesses } = req.body;
  const fields = [];
  const vals   = [];
  if (name    !== undefined) { fields.push('name = ?');    vals.push(name.trim()); }
  if (points  !== undefined) { fields.push('points = ?');  vals.push(Math.max(0, points)); }
  if (guesses !== undefined) { fields.push('guesses = ?'); vals.push(Math.max(0, guesses)); }
  if (!fields.length) return res.status(400).json({ error: 'nothing to update' });
  vals.push(id);
  db.run(`UPDATE players SET ${fields.join(', ')} WHERE id = ?`, vals);
  persist();
  res.json({ ok: true, players: allPlayers() });
});

// DELETE player
app.delete('/api/players/:id', (req, res) => {
  db.run('DELETE FROM players WHERE id = ?', [req.params.id]);
  persist();
  res.json({ ok: true, players: allPlayers() });
});

// ── START ─────────────────────────────────────────────────────────────────────
initDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🏆 World Cup Leaderboard running!`);
    console.log(`   Local:   http://localhost:${PORT}`);
    console.log(`   Network: http://<YOUR_IP>:${PORT}  ← open this on your phone\n`);
  });
});
