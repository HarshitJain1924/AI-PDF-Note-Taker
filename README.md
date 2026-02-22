# 🚀 AI PDF Note Taker

AI PDF Viewer & Chat Application

A web-based application that allows users to upload PDF documents, ask questions from the document content, and generate smart notes in real time using AI.

Developed as part of **CSE435 – Industry Evaluation Project**.

---

# 📌 Problem Statement

Students and professionals spend significant time:

* Reading long PDF documents
* Searching manually for information
* Creating notes separately
* Switching between multiple tools

This reduces productivity and makes document understanding slow.

---

# 💡 Solution

AI PDF Note Taker enables users to:

* Upload PDF documents
* Ask questions directly from the document
* Get contextual answers
* Automatically generate notes
* Save notes in real time

The system uses a Retrieval-Augmented Generation (RAG) approach to ensure answers are based only on the uploaded document.

---

# 🏗️ System Workflow

1. User uploads PDF
2. Text extracted from document
3. Text divided into chunks
4. Embeddings generated
5. Stored in vector database
6. User asks question
7. Relevant chunks retrieved
8. AI generates contextual answer
9. Notes saved in real time

---

# 🧠 Key Features

* PDF upload & viewing
* AI-based document Q&A
* Context-aware responses
* Real-time note saving
* Secure authentication
* Vector-based semantic search
* Fully deployed web app

---

# 🛠️ Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS
* ShadCN UI

### Backend & Database

* Convex (serverless backend + database)

### AI Integration

* Google Gemini API
* LangChain
* Vector embeddings & similarity search

### Authentication

* Clerk

### Deployment

* Vercel

---

# 🧱 Project Architecture

Frontend (Next.js) → Backend (Convex) →
AI Layer (LangChain + Gemini) → Vector Storage → Response → Notes Storage

The system follows a **RAG-based architecture** for accurate document-based responses.

---

# ⚙️ Development Workflow

Project built in phases:

1. UI development
2. Backend integration
3. AI integration (RAG pipeline)
4. Database & notes system
5. Testing & deployment

Version control:

* Git & GitHub used
* Feature-based commits
* Public repository with documentation

---

# 📊 Results

* Response time: ~2–3 seconds
* Contextual accuracy: ~85–90%
* Handles multiple user sessions
* Fully deployed and functional

---

# 📂 GitHub Repository

[https://github.com/HarshitJain1924/ai-pdf-note-taker](https://github.com/HarshitJain1924/ai-pdf-note-taker)

Includes:

* Complete source code
* README documentation
* Architecture
* Meaningful commit history

---

# 🎓 Learning Outcomes

* Full-stack web development
* AI integration in web apps
* Retrieval-Augmented Generation (RAG)
* Vector embeddings & similarity search
* Deployment & version control

---

# 🔮 Future Improvements

* Multi-PDF chat
* Voice assistant
* Mobile app
* Team collaboration
* Advanced summarization

---

# 👨‍💻 Author

Harshit Jain
B.Tech CSE – Lovely Professional University
