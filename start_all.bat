@echo off
setlocal

REM Get the directory of the script
SET ROOT=%~dp0

REM === Reminder to Start MongoDB ===
echo [*] Make sure MongoDB is running locally on port 27017
echo     You can start it manually or via MongoDB Compass / service

REM === Start Frontend (Vite) ===
start cmd /k "cd /d %ROOT%frontend && npm install && npm run dev"

REM === Start Backend (Node.js + Express) ===
start cmd /k "cd /d %ROOT%backend && npm install && node server.js"

REM === Start ML Server: Layer 1 ===
start cmd /k "cd /d %ROOT%ml_services\layer1_server && pip install -r requirements.txt && uvicorn main:app --host 0.0.0.0 --port 8001 --reload"

REM === Start ML Server: Layer 2 Bio ===
start cmd /k "cd /d %ROOT%ml_services\layer2bio_server && pip install -r requirements.txt && uvicorn main:app --host 0.0.0.0 --port 8002 --reload"

REM === Start ML Server: Layer 2 Non-Bio ===
start cmd /k "cd /d %ROOT%ml_services\layer2non_server && pip install -r requirements.txt && uvicorn main:app --host 0.0.0.0 --port 8003 --reload"

REM === Start ML Server: Layer 3 ===
start cmd /k "cd /d %ROOT%ml_services\layer3_server && pip install -r requirements.txt && uvicorn main:app --host 0.0.0.0 --port 8004 --reload"
