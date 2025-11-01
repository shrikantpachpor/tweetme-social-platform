@echo off
REM Use local Node.js installation
set NODE_LOCAL_PATH=%~dp0node_local\node-v16.20.2-win-x64
"%NODE_LOCAL_PATH%\node.exe" %*