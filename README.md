# VOXCOACH — AI-Powered Public Speaking Coach
> *"Learn. Speak. Improve."*

VOXCOACH is a full-stack web application designed to help speakers, students, and professionals elevate their communication skills. Unlike basic chatbots, VoxCoach measures real vocal acoustics (pitch variability, speaking pace, silence/pause distributions, filler-word frequency) and evaluates speech structure and reasoning through structured LLM critiques.

---

## 🏗️ Architecture & Technology Stack

- **Frontend**: React 18/19 (TypeScript), Vite, Tailwind CSS, Lucide Icons, Recharts.
- **Audio Capture & Analysis**: Web Audio API (`AudioContext`, `AnalyserNode`), HTML5 Canvas 60 FPS visualizer, low-latency client-side YIN/Autocorrelation pitch detection.
- **Backend**: Node.js, Express.js (TypeScript), Multer, Zod schema validation, Helmet security.
- **AI Service**: Google Gemini API (`@google/genai`) for structured topic generation, content critique, and knowledge exploration.
- **Persistence**: MongoDB (Mongoose ODM) with an automatic embedded local file store fallback for immediate zero-config developer onboarding.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# In the root directory (voxcoach):
npm.cmd run install:all
```

### 2. Configure Environment (Optional)
If you have a Google Gemini API Key or MongoDB URI, configure `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/voxcoach
GEMINI_API_KEY=your_gemini_api_key_here
```
*(If left blank, the server automatically defaults to the zero-dependency embedded database and realistic mock coaching service).*

### 3. Run Development Servers
```bash
# Starts both Backend (Port 5000) and Frontend (Port 5173) concurrently:
npm.cmd run dev
```

Visit **`http://localhost:5173`** in your browser.
