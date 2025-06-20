import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import HandwritingPrediction from "./pages/HandwritingPrediction";
import EyeTracking from "./pages/EyeTracking";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Gamify from "./pages/Gamify";
import Flashcards from "./pages/games/Flashcards";
import PatternRecognition from "./pages/games/PatternRecognition";
import TracingCanvas from "./pages/games/TracingCanvas";
import "./index.css";

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar onToggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="p-6 bg-[#0a0f1b] min-h-screen text-white overflow-auto">
          {children} {/* ✅ Render the passed-in route component */}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Public Routes (No Layout) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Dashboard Routes (With Sidebar + Navbar) */}
        <Route
          path="/dashboard"
          element={<DashboardLayout><Home /></DashboardLayout>}
        />
        <Route
          path="/handwriting"
          element={<DashboardLayout><HandwritingPrediction /></DashboardLayout>}
        />
        <Route
          path="/eye-tracking"
          element={<DashboardLayout><EyeTracking /></DashboardLayout>}
        />
        <Route
          path="/analytics"
          element={<DashboardLayout><Analytics /></DashboardLayout>}
        />
        <Route
          path="/reports"
          element={<DashboardLayout><Reports /></DashboardLayout>}
        />
        <Route
          path="/gamify"
          element={<DashboardLayout><Gamify /></DashboardLayout>}
        />
        <Route
          path="/gamify/flashcards"
          element={<DashboardLayout><Flashcards /></DashboardLayout>}
        />
        <Route
          path="/gamify/pattern-recognition"
          element={<DashboardLayout><PatternRecognition /></DashboardLayout>}
        />
        <Route
          path="/gamify/tracing-practice"
          element={<DashboardLayout><TracingCanvas /></DashboardLayout>}
        />
        
      </Routes>
    </Router>
  );
}

export default App;