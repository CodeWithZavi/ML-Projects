@echo off
echo Starting Heart Disease Prediction (PCA) Server...
cd /d "%~dp0server"
start "Heart Disease Server" cmd /k "D:\ML-Project-main\.venv\Scripts\python.exe server.py"
timeout /t 3 /nobreak >nul
start "" "%~dp0clint\app.html"
echo Server started! Opening browser...
