import { useEffect, useState } from "react";
import axios from "axios";

const PatternRecognition = () => {
  const [charData, setCharData] = useState([]);
  const [clicked, setClicked] = useState({}); // { index: "correct" | "wrong" }

  useEffect(() => {
    axios.post("http://127.0.0.1:8000/gamify/pattern").then((res) => {
      setCharData(res.data.pattern_data || []);
    });
  }, []);

  const handleClick = (idx) => {
    const isReversed = charData[idx].label === "Reversed";
    setClicked((prev) => ({ ...prev, [idx]: isReversed ? "correct" : "wrong" }));
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-yellow-600 mb-2">🔍 Pattern Recognition</h2>
      <p className="mb-4 text-gray-600">Click on the characters that are written incorrectly (flipped or malformed).</p>
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {charData.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(idx)}
            className={`w-16 h-16 border border-yellow-500 flex items-center justify-center text-2xl font-semibold rounded cursor-pointer transition
              ${
                clicked[idx] === "correct"
                  ? "bg-green-100 border-green-500"
                  : clicked[idx] === "wrong"
                  ? "bg-red-100 border-red-500"
                  : "bg-white hover:bg-yellow-50"
              }`}
          >
            <span
              className={item.label === "Reversed" ? "transform scale-x-[-1]" : ""}
            >
              {item.char}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatternRecognition;
