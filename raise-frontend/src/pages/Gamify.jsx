import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBrain, FaSearch, FaPenFancy } from "react-icons/fa";

const Gamify = () => {
  const navigate = useNavigate();

  const games = [
    {
      title: "🧠 Flashcards",
      description: "Test memory by identifying corrected vs reversed characters.",
      icon: <FaBrain className="text-3xl text-[#089c9c]" />,
      route: "/gamify/flashcards",
    },
    {
      title: "🔍 Pattern Recognition",
      description: "Spot miswritten letters among a group of characters.",
      icon: <FaSearch className="text-3xl text-[#089c9c]" />,
      route: "/gamify/pattern-recognition",
    },
    {
      title: "✏️ Tracing Practice",
      description: "Trace over reversed characters to reinforce proper writing.",
      icon: <FaPenFancy className="text-3xl text-[#089c9c]" />,
      route: "/gamify/tracing-practice",
    },
  ];

  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-[#0f172a] p-6 rounded-xl border border-white/10 shadow-md">
        <h2 className="text-4xl font-bold text-white flex items-center gap-3">
          🎮 Gamification Zone
        </h2>
        <p className="text-gray-300 mt-2 text-lg">
          Interactive practice to help improve handwriting skills
        </p>

        {/* Stats Badges */}
        <div className="flex flex-wrap gap-4 mt-4">
          <span className="bg-[#089c9c]/10 text-[#0dfcf0] font-medium px-4 py-2 rounded-full shadow border border-[#0dfcf0]/30">
            🥇 Beginner Badge
          </span>
          <span className="bg-[#089c9c]/10 text-[#0dfcf0] font-medium px-4 py-2 rounded-full shadow border border-[#0dfcf0]/30">
            🔥 3-Day Streak
          </span>
          <span className="bg-[#089c9c]/10 text-[#0dfcf0] font-medium px-4 py-2 rounded-full shadow border border-[#0dfcf0]/30">
            ⭐ Accuracy: 82%
          </span>
        </div>
      </div>

      {/* Game Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        {games.map((game, index) => (
          <motion.div
            key={index}
            onClick={() => navigate(game.route)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="cursor-pointer bg-white/5 text-white rounded-xl p-6 border border-white/10 shadow-md hover:shadow-lg hover:bg-[#0f1f2e] transition-all"
          >
            <div className="mb-4">{game.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#0dfcf0]">{game.title}</h3>
            <p className="text-sm text-gray-300">{game.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Gamify;
