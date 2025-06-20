# 🧠 RAISE-AI: Risk Assessment and Interpretation for SLD Evaluation

RAISE-AI is an AI-powered web platform designed to **analyze handwriting**, **track eye movement**, and provide **gamified interventions** for early detection and support of children with **Specific Learning Disabilities (SLD)** such as dyslexia, dysgraphia, and more.

## 🚀 Features

- ✍️ **Handwriting Analysis** (YOLOv8-based)
  - Detects character-level issues (Reversed, Corrected, Normal)
  - Generates annotated image + downloadable PDF report
  - Preprocessing for real human handwriting

- 🎯 **Gamification Modules**
  - 🧠 Flashcards: Identify letters
  - 🔍 Pattern Recognition: Spot reversed characters
  - ✏️ Tracing Practice: Reinforce correct writing via canvas

- 👁 **Eye Tracking (Browser-based)**
  - Uses webcam + Mediapipe FaceMesh for line tracking
  - Real-time heatmap + deviation feedback

- 📊 **Analytics Dashboard**
  - Per-student progress visualization (Bar, Line, Pie charts)
  - Score trends and improvement patterns

- 🧾 **Reports Section**
  - PDF reports generation & download

- 🔐 **Auth & UI**
  - Login / Signup with dark theme
  - Animated sidebar & responsive layout

---

## 🖥️ Tech Stack

| Frontend | Backend | ML/NLP | Deployment |
|---------|---------|--------|-------------|
| React.js + Tailwind CSS | FastAPI | YOLOv8, OpenCV | Vercel / Localhost |
| Framer Motion | Python | Numpy, Mediapipe | (Backend deploy pending) |

---

## 🧱 Folder Structure

```

raise-ai/
├── backend/
│   ├── routes/
│   ├── yolo\_model/
│   ├── utils/
│   ├── reports/
│   └── main.py
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── index.css
│   └── App.jsx

````

---

## 🛠️ Installation

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
````

> Ensure `yolov8n.pt` is present in `yolo_model/`.

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> React dev server starts on `http://localhost:5173`

---

## 📷 Handwriting Upload Guidelines

✅ Use plain white paper
✅ Blue/Black pen only
✅ Characters should not be cursive
✅ One character per space, clearly written
✅ Image should be clear, good lighting
✅ Formats: JPG, PNG, WEBP

---

## 📌 TODO / Improvements

* [ ] Firebase/Clerk integration for Auth
* [ ] Connect real student DB
* [ ] Export analytics to PDF
* [ ] Multilingual character support
* [ ] Real-time LLM feedback using Hugging Face

---

## 🤝 Contributing

Pull requests are welcome! Open an issue first for any major changes.
