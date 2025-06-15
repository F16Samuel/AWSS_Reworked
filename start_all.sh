#!/bin/bash

# Get the script's directory (root of the project)
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[*] Ensure MongoDB is running locally on port 27017 before starting the app."

# === Start Frontend (Vite) ===
(
  cd "$ROOT_DIR/frontend"
  npm install
  npm run dev
) &

# === Start Backend (Node.js + Express) ===
(
  cd "$ROOT_DIR/backend"
  npm install
  node server.js
) &

# === Start ML Server: Layer 1 ===
(
  cd "$ROOT_DIR/ml_services/layer1_server"
  pip install -r requirements.txt
  uvicorn main:app --host 0.0.0.0 --port 8001 --reload
) &

# === Start ML Server: Layer 2 Bio ===
(
  cd "$ROOT_DIR/ml_services/layer2bio_server"
  pip install -r requirements.txt
  uvicorn main:app --host 0.0.0.0 --port 8002 --reload
) &

# === Start ML Server: Layer 2 Non-Bio ===
(
  cd "$ROOT_DIR/ml_services/layer2non_server"
  pip install -r requirements.txt
  uvicorn main:app --host 0.0.0.0 --port 8003 --reload
) &

# === Start ML Server: Layer 3 ===
(
  cd "$ROOT_DIR/ml_services/layer3_server"
  pip install -r requirements.txt
  uvicorn main:app --host 0.0.0.0 --port 8004 --reload
) &

wait
