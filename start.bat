@echo off
REM ─────────────────────────────────────────────────────────
REM  World Cup Predictor League — Start Script (Windows)
REM ─────────────────────────────────────────────────────────
cd /d "%~dp0"

IF NOT EXIST "node_modules" (
  echo Installing dependencies...
  npm install
)

echo.
echo 🏆  World Cup Predictor League
echo ──────────────────────────────────
echo   💻  Laptop : http://localhost:3000
echo   📱  Phone  : Check your IP with "ipconfig" and open http://YOUR_IP:3000
echo.
echo   Make sure your phone is on the same WiFi!
echo   Press Ctrl+C to stop.
echo.

node server.js
pause
