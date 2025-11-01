@echo off
echo ================================
echo TweetMe Frontend Development Setup
echo ================================
echo.

REM Setup local Node.js environment
call setup-local-node.cmd

echo Installing project dependencies...
call local-npm.cmd install --legacy-peer-deps

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: npm install failed. Trying alternative approach...
    call local-npm.cmd cache clean --force
    call local-npm.cmd install --legacy-peer-deps --force
)

echo.
echo ================================
echo Installation Complete!
echo ================================
echo.
echo To start development server:
echo   npm-dev.cmd
echo.
echo To build for production:
echo   call local-npm.cmd run build-client
echo.
pause