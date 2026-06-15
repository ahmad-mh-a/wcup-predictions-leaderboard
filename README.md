# 🏆 World Cup Predictor League

A sleek, mobile-first leaderboard for tracking World Cup prediction scores with friends. Supports Arabic and English, works offline and on your local network.

![World Cup Predictor League](https://img.shields.io/badge/World_Cup-Predictor_League-gold?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIgZmlsbD0iI2Y1YzUxOCIvPjwvc3ZnPg==)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## ✨ Features

- 🌐 **Bilingual** — Full Arabic (RTL) and English (LTR) support, switch instantly
- 📶 **Dual mode** — Works offline (localStorage) and online (SQLite server, synced across devices)
- 📱 **Mobile-first** — Designed for phone use; open from any device on your WiFi
- 🏅 **Smart ranking** — Tied scores share the same rank (1, 2, 2, 4...)
- ✏️ **Easy editing** — Tap numbers directly to type, or use +/− buttons
- 📸 **Screenshot** — Generates a beautiful 2000×2000 PNG of the full leaderboard
- 🔄 **Silent sync** — Background refresh every 15s, no page flash or scroll reset
- 💾 **Persistent** — SQLite database file on your laptop, survives restarts

---

## 🚀 Quick Start

### Option A — Offline (no server, single device)

Just open `public/index.html` directly in your browser. Data is saved in the browser's `localStorage`.

> Works great for personal use on one device. No Node.js required.

---

### Option B — Network server (all devices synced)

Requires [Node.js 18+](https://nodejs.org).

**1. Install dependencies** (once):
```bash
npm install
```

**2. Start the server:**

| OS | Command |
|----|---------|
| Mac / Linux | `bash start.sh` |
| Windows | Double-click `start.bat` |
| Any | `npm start` |

**3. Open in your browser:**

| Device | URL |
|--------|-----|
| Laptop | http://localhost:3000 |
| Phone / Tablet | `http://YOUR_LAPTOP_IP:3000` |

> Your phone and laptop must be on the **same WiFi network**.  
> The start script prints your laptop's IP address automatically.

---

## 📁 Project Structure

```
worldcup-predictor-league/
├── public/
│   └── index.html      ← The entire app (single file)
├── server.js           ← Express + SQLite server
├── start.sh            ← Start script (Mac/Linux)
├── start.bat           ← Start script (Windows)
├── package.json
├── .gitignore
└── README.md
```

> **`data/`** folder is created automatically when the server first runs. It holds the SQLite database and is excluded from git.

---

## 🗄️ How Data is Stored

| Mode | Storage | Shared across devices? |
|------|---------|----------------------|
| Offline (file://) | Browser localStorage | ❌ No |
| Online (server) | `data/leaderboard.db` (SQLite) | ✅ Yes |

The app auto-detects which mode to use. A banner at the top tells you which mode is active.

---

## 🏆 Ranking Rules

Players are sorted by:
1. **Points** (higher = better)
2. **Guesses** (more = better, as a tiebreaker)
3. **Name** (alphabetical, Arabic/English aware)

Ties are handled correctly — two players with the same points AND guesses share the same rank number, and the next rank skips accordingly (e.g. 1, 2, 2, 4).

---

## 📸 Screenshot Feature

Tap the **📸 Screenshot** button to generate a 2000×2000 PNG image of the full leaderboard — perfect for sharing on WhatsApp or Instagram. The image respects the current language direction (LTR for English, RTL for Arabic).

---

## 🛠️ Requirements

- **Offline mode**: Any modern browser (Chrome, Safari, Firefox)
- **Server mode**: Node.js 18 or higher

---

## 📄 License

MIT — free to use and modify for personal use.
