@echo off
echo Starting TweetMe Frontend Development Server...
echo.

REM Setup local Node.js environment
set NODE_LOCAL_PATH=%~dp0node_local\node-v16.20.2-win-x64
set PATH=%NODE_LOCAL_PATH%;%NODE_LOCAL_PATH%\node_modules\npm\bin;%PATH%

echo Using local Node.js:
"%NODE_LOCAL_PATH%\node.exe" --version
"%NODE_LOCAL_PATH%\npm.cmd" --version
echo.

echo Starting development server...
echo Frontend will be available at: http://localhost:8080
echo Backend is running at: http://127.0.0.1:8000
echo.

call local-npm.cmd run build-dev