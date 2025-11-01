@echo off
REM Frontend setup and startup script for Windows

echo Setting up TweetMe Frontend...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed. Please install Node.js 16+ and try again.
    pause
    exit /b 1
)

REM Install dependencies
echo Installing Node.js dependencies...
npm install

REM Start development server
echo.
echo Starting React development server...
echo Frontend will be available at http://localhost:8080
echo.
echo Note: Make sure the Django backend is running on http://localhost:8000
echo.
npm run build-client