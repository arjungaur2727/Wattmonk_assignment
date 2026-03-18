# Solar Intelligence Assistant

A full-stack, retrieval-augmented generation (RAG) chatbot for Wattmonk that answers questions about NEC electrical codes, Wattmonk services, and general solar energy topics. Built with FastAPI, FAISS, and Google Gemini.

---

## Overview

The system classifies each incoming query by intent, retrieves the most relevant document chunks from a local FAISS vector database, and injects them as context into a Gemini prompt. Responses are grounded in the retrieved knowledge rather than relying solely on the model's training data.

**Three knowledge domains:**
- Wattmonk services — proposals, plan sets, PTO, Zippy tool, PE reviews
- NEC code — Articles 690, 705, 250, 230, 310, 300
- General solar — system design, terminology, best practices

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend API | FastAPI (Python) |
| Language Model | Google Gemini 1.5 Flash |
| Embeddings | sentence-transformers/all-MiniLM-L6-v2 (local) |
| Vector Database | FAISS (faiss-cpu) |
| Frontend | React 18 + Vite |
| Styling | Custom CSS (no framework) |

---

## Project Structure

```
test_assignment/
├── backend/
│   ├── main.py                    # FastAPI application, /api/chat endpoint
│   ├── requirements.txt
│   └── rag/
│       ├── embedder.py            # Text embedding via sentence-transformers
│       ├── indexer.py             # Builds FAISS indices from data/ files
│       ├── retriever.py           # Similarity search, returns top-k chunks
│       ├── intent_classifier.py   # Keyword-based query routing
│       └── gemini_client.py       # Gemini API integration with RAG prompt
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── api/chat.js            # Axios client
│       └── components/
│           ├── Navbar.jsx
│           ├── Hero.jsx
│           ├── ChatInterface.jsx
│           ├── Features.jsx
│           └── Footer.jsx
├── data/
│   ├── wattmonk_info.txt          # Wattmonk knowledge base
│   └── nec_info.txt               # NEC solar-relevant articles
├── embeddings/                    # Generated FAISS indices (auto-created)
├── .env.example
└── README.md
```

---

## Setup

### Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- A Google Gemini API key — obtain one free at [aistudio.google.com](https://aistudio.google.com)

### 1. Configure environment

```bash
# Copy the example and add your key
copy .env.example .env
```

Edit `.env`:
```
GEMINI_API_KEY=your_key_here
```

### 2. Install backend dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Build the FAISS vector indices

Run once, or whenever the data files change:

```bash
cd backend
python rag/indexer.py
```

This reads `data/wattmonk_info.txt` and `data/nec_info.txt`, generates embeddings, and writes four files to `embeddings/`.

### 4. Start the backend

```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

### 5. Install frontend dependencies

```bash
cd frontend
npm install
```

### 6. Start the frontend

```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## API Reference

### POST /api/chat

Send a message and receive a grounded response.

**Request body:**
```json
{
  "message": "What does NEC Article 690 cover?",
  "history": [
    { "role": "user", "content": "Previous question" },
    { "role": "assistant", "content": "Previous answer" }
  ]
}
```

**Response:**
```json
{
  "answer": "NEC Article 690 covers photovoltaic systems...",
  "source": "NEC Code",
  "confidence": 0.82,
  "intent": "NEC"
}
```

### GET /api/health

Returns backend status and index load state.

---

## RAG Pipeline

```
User query
    |
    v
Intent Classifier  (keyword matching -> NEC / WATTMONK / GENERAL)
    |
    v
FAISS Retriever    (cosine similarity, top-3 chunks)
    |
    v
Context Injection  (chunks prepended to Gemini prompt)
    |
    v
Gemini 1.5 Flash   (generates grounded answer)
    |
    v
Response           (answer + source label)
```

### Scoring

Confidence is derived from the average L2 similarity distance of the retrieved chunks, normalized to a 0–1 range.

---

## Features

- Multi-domain intent classification with automatic routing
- Local embeddings — no external embedding API calls or costs
- Conversation memory — last 5 turns passed to Gemini as chat history
- Source attribution on every response (NEC Code / Wattmonk / General Knowledge)
- Hot reload on both backend (uvicorn) and frontend (Vite) during development

---

## Notes

- The FAISS indices must be built before the backend will serve requests. If `embeddings/` is empty, run the indexer first.
- The `.env` file is excluded from version control and must be created manually from `.env.example`.
- NEC data included is a curated sample relevant to solar PV. For production use, replace with the full NEC text corpus.
