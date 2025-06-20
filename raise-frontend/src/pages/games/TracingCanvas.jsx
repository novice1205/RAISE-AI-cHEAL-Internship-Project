import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const shuffleArray = (array) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const TracingCanvas = () => {
  const [chars, setChars] = useState([]);
  const [index, setIndex] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    axios.post("http://127.0.0.1:8000/gamify/tracing").then((res) => {
      const shuffled = shuffleArray(res.data.game_data || []);
      setChars(shuffled);
    });
  }, []);

  const charToTrace = chars[index]?.char;

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvas.isDrawing = true;
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    if (!canvas.isDrawing) return;
    const ctx = canvas.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const endDrawing = () => {
    canvasRef.current.isDrawing = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (showGrid) drawGrid();
  };

  const nextChar = () => {
    setIndex((prev) => (prev + 1) % chars.length);
    clearCanvas();
  };

  const drawGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const size = 50;

    ctx.strokeStyle = "#2f3e51";
    ctx.lineWidth = 0.5;

    for (let x = size; x < canvas.width; x += size) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = size; y < canvas.height; y += size) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      if (showGrid) drawGrid();
    }
  }, [showGrid]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold text-[#0dfcf0] my-6">✏️ Tracing Practice</h2>
      <p className="mb-6 text-gray-400 text-lg">
        Trace the character using your stylus, finger, or mouse.
      </p>

      <div className="inline-block relative border-2 border-[#0dfcf0] shadow-xl rounded-xl overflow-hidden">
        <div className="absolute text-[12rem] text-[#0a0f1b] opacity-10 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 select-none">
          {charToTrace}
        </div>

        <canvas
          ref={canvasRef}
          width={350}
          height={350}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          className="bg-white z-20 rounded"
        />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={clearCanvas}
          className="bg-white text-[#0a0f1b] px-6 py-2 rounded font-semibold hover:bg-[#0dfcf0] hover:text-white transition"
        >
          🧹 Clear
        </button>
        <button
          onClick={nextChar}
          className="bg-[#089c9c] hover:bg-[#0dfcf0] text-white px-6 py-2 rounded font-semibold transition"
        >
          ➡️ Next Character
        </button>
        <button
          onClick={() => {
            setShowGrid(!showGrid);
            clearCanvas();
          }}
          className="bg-[#1f2937] border border-[#0dfcf0] hover:bg-[#0dfcf0]/10 text-white px-6 py-2 rounded font-semibold transition"
        >
          {showGrid ? "🔲 Hide Grid" : "🔳 Show Grid"}
        </button>
      </div>
    </motion.div>
  );
};

export default TracingCanvas;