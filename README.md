
# 🗂️ Automatic Waste Segregation System (AWSS)

## 📄 Project Description

AWSS is an AI-powered waste classification platform designed to automate the segregation of household or industrial waste into biodegradable and non-biodegradable categories, followed by deeper classification into recyclable types like paper, plastic, metal, and glass. This is accomplished through a three-layer deep learning pipeline hosted on scalable microservices.

The project addresses the inefficiencies and inaccuracies of manual waste segregation processes in recycling plants, smart cities, and sustainability-driven enterprises. By automating classification, AWSS ensures faster processing, improved recycling accuracy, and minimized human involvement in hazardous waste handling.

---

## 🚀 Features

- ♻️ **Three-Layer Waste Classification**
  - Layer 1: Biodegradable vs. Non-Biodegradable
  - Layer 2: Paper vs. Organic / Recyclable vs. Non-Recyclable
  - Layer 3: Plastic vs. Metal vs. Glass

- ⚡ **Real-time Image Classification via Web Interface**
- 🌐 **Microservices Architecture** with Docker support
- 📦 **FastAPI ML APIs** deployed as standalone services
- 📊 **Interactive Dashboard** (planned)
- 🧪 **Trained ML models using PyTorch & TensorFlow**
- 🛡️ **Cross-platform start and stop scripts (Windows/macOS/Linux)**
- ☁️ **Deployable on Render and Vercel**

---

## 🛠️ Tech Stack

**Frontend**
- Vite + React + TypeScript
- Axios, TailwindCSS

**Backend**
- Node.js + Express
- MongoDB

**Machine Learning**
- PyTorch (Layer 1)
- TensorFlow + Keras (Layer 2 & 3)
- FastAPI (for ML API servers)

**DevOps / Tools**
- Render, Vercel
- Python Virtual Environments
- PowerShell / Bash scripts

---

## 📁 Folder Structure

```
AWSS_Reworked/
├── backend/                 # Node.js + Express backend server
│   ├── config/
│   ├── middleware/
│   ├── models/
│   └── routes/
├── frontend/                # Vite React TypeScript frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       ├── pages/
│       └── services/
├── ml_services/
│   ├── layer1_server/       # PyTorch-based Layer 1 API
│   ├── layer2bio_server/    # TensorFlow: Paper vs Organic
│   ├── layer2non_server/    # TensorFlow: Recyclable vs Non-Recyclable
│   └── layer3_server/       # TensorFlow: Plastic vs Metal vs Glass
├── start-all.sh
└── start-all.bat
```

---

## 📥 Installation

### Prerequisites

- Node.js ≥ 16.x
- Python ≥ 3.9
- pip, Git

### Clone the Repository

```bash
git clone https://github.com/F16Samuel/AWSS_Reworked.git
cd AWSS_Reworked
```

### Start All Services (Windows)

```cmd
start-all.bat
```

### Start All Services (macOS/Linux)

```bash
chmod +x start-all.sh
./start-all.sh
```

---
## 🧱 MongoDB Setup

Ensure MongoDB is installed and running **locally on port `27017`** before starting the project.

- ✅ **Install MongoDB**: https://www.mongodb.com/try/download/community
- ✅ **Start it manually**:
    - On Windows: Launch "MongoDB Compass" or run `mongod` from terminal
    - On macOS/Linux: Run `mongod` in terminal
- 💡 Logs and classification data will be stored automatically in the local database

---

## 📎 Usage

1. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```
2. Upload a waste image via the homepage.
3. The image is classified by the FastAPI ML services.
4. Results include:
   - Waste category (Plastic, Paper, Metal, etc.)
   - Classification confidence
   - Historical logs (In MongoDB Server)

---

## 👥 Contributors

| Name          | Role                                                  | Links                                       |
| ------------- | ----------------------------------------------------- | ------------------------------------------- |
| Samar Verma   | Research Lead, ML & Fullstack Developer               | [GitHub](https://github.com/F16Samuel)      |
| Shauviq Mishra| Project Lead & Fullstack Developer                    | [GitHub](https://github.com/Shauviq)        |
| Aanan Chopra  | Artificial Intelligence and Machine Learning Engineer | [GitHub](https://github.com/AananChopra)    |

---

## 📜 License

**All rights reserved.**
This code is owned by **Samar Verma**.
You may **not use, copy, modify, or distribute** this code or any part of it **without explicit permission** from the owner.

For collaboration or usage inquiries, contact the project owner directly.
