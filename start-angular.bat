@ECHO OFF
TITLE Angular Web Server

call npm install
start ng serve --host 0.0.0.0 --port 8080