@echo off
echo Starting Pakistan Celebrity Recognition Server...
cd /d "%~dp0server"
start "Pakistan Celebrity Server" cmd /k "D:\ML-Project-main\.venv\Scripts\python.exe server.py"
timeout /t 3 /nobreak >nul
start "" "%~dp0clint\app.html"
echo Server started! Opening browser...
