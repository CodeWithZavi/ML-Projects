@echo off
echo Starting Celebrity Face Recognition Server...
cd /d "%~dp0server"
start "Celebrity Recognition Server" cmd /k "D:\ML-Project-main\.venv\Scripts\python.exe server.py"
timeout /t 3 /nobreak >nul
start "" "%~dp0clint\app.html"
echo Server started! Opening browser...
