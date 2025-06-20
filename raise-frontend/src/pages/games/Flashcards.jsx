import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const Flashcards = () => {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("http://127.0.0.1:8000/gamify/flashcards");
        const shuffled = shuffleArray(res.data.game_data || []);
        setCards(shuffled);
      } catch (error) {
        console.error("Failed to load game data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCheck = () => {
    if (!cards.length) return;
    const correctChar = cards[index].char.toUpperCase();
    setResult(input.toUpperCase() === correctChar ? "✅ Correct!" : "❌ Try Again");
  };

  const handleNext = () => {
    setInput("");
    setResult("");
    setIndex((prev) => (prev + 1) % cards.length);
  };

  const currentCard = cards[index];

  return (
    <motion.div
      className="text-center space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold text-[#0dfcf0]">🧠 Flashcards Game</h2>
      <p className="text-gray-400 mb-4">Guess the correct character</p>

      {currentCard ? (
        <>
          <motion.div
            className="p-14 text-6xl font-extrabold bg-white text-gray-900 inline-block rounded-xl shadow-lg border-4 border-[#0dfcf0] min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring" }}
          >
            {currentCard.char}
          </motion.div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1}
              className="text-lg px-4 py-2 rounded bg-[#1e293b] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#0dfcf0]"
              placeholder="Enter character"
            />
            <button
              onClick={handleCheck}
              className="bg-[#089c9c] hover:bg-[#0dfcf0] text-white px-6 py-2 rounded font-semibold transition"
            >
              Check
            </button>
            <button
              onClick={handleNext}
              className="bg-white text-[#089c9c] hover:bg-gray-100 px-6 py-2 rounded font-semibold transition"
            >
              Next →
            </button>
          </div>

          {result && (
            <motion.p
              className={`text-xl font-semibold mt-4 ${
                result.includes("✅") ? "text-green-400" : "text-red-500"
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {result}
            </motion.p>
          )}
        </>
      ) : (
        <p className="text-gray-500">Loading flashcards...</p>
      )}
    </motion.div>
  );
};

export default Flashcards;
