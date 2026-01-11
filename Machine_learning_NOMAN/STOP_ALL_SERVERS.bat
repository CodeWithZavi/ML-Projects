@echo off
echo Stopping all Python servers...
taskkill /F /IM python.exe 2>nul
if %errorlevel% equ 0 (
    echo All servers stopped successfully!
) else (
    echo No servers were running.
)
pause
