import { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="text-center">
      <h2 className="text-3xl font-bold text-yellow-600 my-4">🧠 Flashcards</h2>

      {currentCard ? (
        <>
          <div className="border-2 border-yellow-400 p-12 text-6xl font-extrabold tracking-wider inline-block min-w-[240px] bg-white text-gray-800 shadow-md rounded-md">
            {currentCard.char}
          </div>

          <div className="mt-6 space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1}
              className="text-lg px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Type the character"
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded text-lg"
              onClick={handleCheck}
            >
              Check
            </button>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded text-lg"
              onClick={handleNext}
            >
              Next Card →
            </button>
          </div>

          {result && (
            <p className={`mt-4 text-xl font-semibold ${result.includes("✅") ? "text-green-600" : "text-red-500"}`}>
              {result}
            </p>
          )}
        </>
      ) : (
        <p className="text-gray-500 mt-4">Loading flashcards...</p>
      )}
    </div>
  );
};

export default Flashcards;
