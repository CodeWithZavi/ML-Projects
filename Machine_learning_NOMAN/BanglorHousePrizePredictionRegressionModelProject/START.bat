@echo off
echo Starting Bangalore House Price Prediction Server...
cd /d "%~dp0server"
start "Bangalore Server" cmd /k "D:\ML-Project-main\.venv\Scripts\python.exe server.py"
timeout /t 3 /nobreak >nul
start "" "%~dp0clint\app.html"
echo Server started! Opening browser...
