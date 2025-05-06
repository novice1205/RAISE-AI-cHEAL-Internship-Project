import { useNavigate } from "react-router-dom";

const Gamify = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-yellow-400 text-white p-6 rounded">
        <h2 className="text-3xl font-bold">🎮 Gamification Zone</h2>
        <p className="text-lg mt-2">Interactive practice to help improve handwriting skills</p>
        
        {/* Badges */}
        <div className="flex gap-4 mt-4">
          <span className="bg-white text-yellow-500 font-semibold px-4 py-2 rounded-full shadow">🏅 Beginner</span>
          <span className="bg-white text-yellow-500 font-semibold px-4 py-2 rounded-full shadow">🔥 Streak: 3 Days</span>
          <span className="bg-white text-yellow-500 font-semibold px-4 py-2 rounded-full shadow">⭐ Accuracy: 82%</span>
        </div>
      </div>

      {/* Game Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          onClick={() => navigate("/gamify/flashcards")}
          className="cursor-pointer bg-white border border-yellow-400 hover:bg-yellow-50 p-6 rounded transition"
        >
          <h3 className="text-xl font-bold text-yellow-600 mb-2">🧠 Flashcards</h3>
          <p>Test memory by identifying corrected vs reversed characters.</p>
        </div>

        <div
          onClick={() => navigate("/gamify/pattern-recognition")}
          className="cursor-pointer bg-white border border-yellow-400 hover:bg-yellow-50 p-6 rounded transition"
        >
          <h3 className="text-xl font-bold text-yellow-600 mb-2">🔍 Pattern Recognition</h3>
          <p>Spot miswritten letters among a group of characters.</p>
        </div>

        <div
          onClick={() => navigate("/gamify/tracing-practice")}
          className="cursor-pointer bg-white border border-yellow-400 hover:bg-yellow-50 p-6 rounded transition"
        >
          <h3 className="text-xl font-bold text-yellow-600 mb-2">✏️ Tracing Practice</h3>
          <p>Trace over reversed characters to reinforce proper writing.</p>
        </div>
      </div>
    </div>
  );
};

export default Gamify;
