@echo off
title Book Bank Mobile Server
cd /d "%~dp0"
echo ========================================================
echo    Starting Book Bank Server for Mobile Phone Access...
echo ========================================================
echo.
where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    node serve_mobile.js
) else (
    where python >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        echo [Using Python HTTP Server]
        python -m http.server 8080 --bind 0.0.0.0
    ) else (
        echo Error: Neither Node.js nor Python was found on this system.
        pause
    )
)
pause
