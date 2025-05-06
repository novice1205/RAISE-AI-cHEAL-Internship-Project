import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import HandwritingPrediction from "./pages/HandwritingPrediction";
import AudioPrediction from "./pages/AudioPrediction";
import EyeTracking from "./pages/EyeTracking";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Gamify from "./pages/Gamify";
import Flashcards from "./pages/games/Flashcards";
import PatternRecognition from "./pages/games/PatternRecognition";
import TracingCanvas from "./pages/games/TracingCanvas";

import "./index.css";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="p-6 bg-white flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/handwriting" element={<HandwritingPrediction />} />
              <Route path="/audio" element={<AudioPrediction />} />
              <Route path="/eye-tracking" element={<EyeTracking />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/gamify" element={<Gamify />} />
              <Route path="/gamify/flashcards" element={<Flashcards />} />
              <Route path="/gamify/pattern-recognition" element={<PatternRecognition />} />
              <Route path="/gamify/tracing-practice" element={<TracingCanvas />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
