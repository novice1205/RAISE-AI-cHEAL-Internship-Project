import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PatternRecognition = () => {
  const [charData, setCharData] = useState([]);
  const [clicked, setClicked] = useState({});
  const [score, setScore] = useState(0);
  const [reversedCount, setReversedCount] = useState(0);

  useEffect(() => {
    axios.post("http://127.0.0.1:8000/gamify/pattern").then((res) => {
      const data = res.data.pattern_data || [];
      setCharData(data);
      setReversedCount(data.filter((c) => c.label === "Reversed").length);
    });
  }, []);

  const handleClick = (idx) => {
    if (clicked[idx] !== undefined) return;
    const isReversed = charData[idx].label === "Reversed";
    const updated = { ...clicked, [idx]: isReversed ? "correct" : "wrong" };
    setClicked(updated);
    setScore((prev) => prev + (isReversed ? 2 : -1));
  };

  const correctClicks = Object.values(clicked).filter((v) => v === "correct").length;

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold text-[#0dfcf0] mb-3">🔍 Pattern Recognition</h2>
      <p className="text-gray-400 mb-6">
        Click on the characters that are written incorrectly (flipped or malformed).
      </p>

      {/* Score Panel */}
      <div className="inline-block px-6 py-3 bg-[#0dfcf0]/10 text-[#0dfcf0] font-semibold border border-[#0dfcf0]/30 rounded-full shadow-sm text-lg mb-8">
        🎯 Score: <span className="font-bold">{score}</span>
      </div>

      {/* Character Grid */}
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {charData.map((item, idx) => (
          <motion.div
            key={idx}
            onClick={() => handleClick(idx)}
            whileTap={{ scale: 0.9 }}
            className={`w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-md border transition duration-200 select-none cursor-pointer
              ${
                clicked[idx] === "correct"
                  ? "bg-green-400/20 border-green-500 text-green-300"
                  : clicked[idx] === "wrong"
                  ? "bg-red-400/20 border-red-500 text-red-300"
                  : "bg-white text-[#0a0f1b] border-[#0dfcf0] hover:bg-[#0dfcf0]/10 hover:text-white"
              }
            `}
          >
            <span className={item.label === "Reversed" ? "transform scale-x-[-1]" : ""}>
              {item.char}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Final Score Summary */}
      {correctClicks === reversedCount && reversedCount > 0 && (
        <motion.div
          className="mt-10 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white max-w-md mx-auto text-left space-y-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-xl font-bold text-[#0dfcf0]">✅ All reversed characters identified!</h4>
          <p>🎯 Final Score: <span className="text-[#0dfcf0] font-semibold">{score}</span></p>
          <p>✔️ Correct Selections: <span className="text-green-400">{correctClicks}</span></p>
          <p>❌ Incorrect Selections: <span className="text-red-400">{Object.values(clicked).filter((v) => v === "wrong").length}</span></p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PatternRecognition;