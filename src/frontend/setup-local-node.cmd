@echo off
REM Setup local Node.js environment for this project
set NODE_LOCAL_PATH=%~dp0node_local\node-v16.20.2-win-x64
set PATH=%NODE_LOCAL_PATH%;%NODE_LOCAL_PATH%\node_modules\npm\bin;%PATH%
set NPM_CONFIG_PREFIX=%NODE_LOCAL_PATH%\node_modules\npm

echo Using local Node.js v16.20.2
echo Node.js path: %NODE_LOCAL_PATH%
echo.

REM Verify installation
"%NODE_LOCAL_PATH%\node.exe" --version
"%NODE_LOCAL_PATH%\npm.cmd" --version

echo.
echo Local Node.js environment is ready!
echo Use 'local-npm.cmd' to run npm commands
echo Use 'local-node.cmd' to run node commands
echo.