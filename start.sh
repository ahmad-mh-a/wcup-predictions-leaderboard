#!/bin/bash
# ─────────────────────────────────────────────────────────
#  World Cup Predictor League — Start Script (Mac / Linux)
# ─────────────────────────────────────────────────────────
cd "$(dirname "$0")"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Detect local IP
IP=$(hostname -I 2>/dev/null | awk '{print $1}')
[ -z "$IP" ] && IP=$(ipconfig getifaddr en0 2>/dev/null)
[ -z "$IP" ] && IP="YOUR_LAPTOP_IP"

echo ""
echo "🏆  World Cup Predictor League"
echo "──────────────────────────────────"
echo "  💻  Laptop : http://localhost:3000"
echo "  📱  Phone  : http://$IP:3000"
echo ""
echo "  ✅  Make sure your phone is on the same WiFi!"
echo "  🛑  Press Ctrl+C to stop."
echo ""

node server.js
