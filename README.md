# Testinova  
AI‑Assisted Multi‑Role Test Generation Platform

Testinova is a web‑based AI‑powered platform that automatically generates software test cases from natural language requirements. It supports Developers, QA Engineers, and Undergraduate Students through role‑based dashboards, intelligent test generation, NLP‑driven requirement analysis, and a rule‑based scoring engine that evaluates test quality.

---

## 🚀 Features

### 🔹 AI‑Powered Test Generation
Generate unit, integration, UI, and workflow tests using GPT‑4o‑mini.

### 🔹 Role‑Based Dashboards
- **Students** → learning concepts, explanations.
- **Developers** → unit/integration test generation + quality scoring  
- **QA Engineers** → UI/workflow test generation + coverage insights  

### 🔹 NLP Requirement Analysis
Extracts:
- Entities  
- Actions  
- Conditions  
- Subjects & objects  
- Test type hints  
- Complexity estimation  

### 🔹 Rule‑Based Scoring Engine
Evaluates:
- Assertion strength  
- Test diversity  
- Framework structure  
- Code length  
- UI interactions  
- Coverage estimation  

### 🔹 Test History 
View and filter previously generated tests.

---




## 🔧 Getting Started

Prerequisites:
- Node.js (v16+ recommended) and `npm`
- Python 3.10+ and `pip`
- MySQL (or Docker) for the backend database

Quick install and run (three services):

1) AI service (FastAPI)

```bash
cd ai-service
python -m venv .venv
source .venv/Scripts/activate   # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
# run using uvicorn
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Environment variables for AI service:
- `OPENAI_API_KEY` (used by `ai-service/services/openai_client.py`)

2) Backend (Node / Express)

```bash
cd backend
npm install
# create a .env with DB and JWT values, then:
npm start
```

Required backend env vars (see `backend/config/db.js` and auth files):
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`
- `JWT_SECRET`

3) Frontend (Vite + React)

```bash
cd frontend
npm install
npm run dev
```
## 🖼️ Screenshots

### QA Engineer Dashboard
![QA Engineer Dashboard](images/qa-dashboard.png)

### Developer Dashboard
![Developer Dashboard](images/developer-dashboard.png)

### Developer Test Generation Output
![Developer Test Generation Output](images/developer-output.png)

### Developer Quality Reports
![Developer Quality Reports](images/developer-quality-reports.png)

### QA Coverage Reports
![QA Coverage Reports](images/qa-coverage-reports.png)

### Student Learning Concepts
![Student Learning Concepts](images/student-learning.png)

## 📁 Project Structure (high level)
- `ai-service/` — NLP & test generation API (FastAPI + spaCy + OpenAI calls)
- `backend/` — Express API, database models, controllers for tests and users
- `frontend/` — React + Vite UI with role‑based dashboards and reporting

## Contributing
- If you'd like help adding automated tests or CI config, open an issue or submit a PR describing the test targets.

---

