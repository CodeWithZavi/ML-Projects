@echo off
echo Starting React Frontend + Flask Server...
cd /d "%~dp0"
start "Flask API" cmd /k "cd /d "%~dp0..\server" && python server.py"
timeout /t 3 /nobreak >nul
start "React Dev" cmd /k "npm run dev"
echo React: http://localhost:5173
echo Flask: http://localhost:5000
