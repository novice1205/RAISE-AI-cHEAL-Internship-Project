import { useEffect, useRef, useState } from "react";
import axios from "axios";

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

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
    ctx.strokeStyle = "#1C1C1C";
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

    ctx.strokeStyle = "#e5e7eb"; // light gray
    ctx.lineWidth = 0.8;

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
    <div className="text-center">
      <h2 className="text-3xl font-bold text-yellow-600 my-4">✏️ Tracing Practice</h2>
      <p className="mb-4 text-lg">Trace the character using your stylus or touchpad:</p>

      <div className="inline-block relative border-2 border-yellow-400 shadow-lg rounded">
        <div className="absolute text-[12rem] text-gray-300 opacity-30 select-none pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
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
          className="bg-white z-20"
        />
      </div>

      <div className="mt-6 space-x-4">
        <button
          onClick={clearCanvas}
          className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded"
        >
          Clear
        </button>
        <button
          onClick={nextChar}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded text-lg"
        >
          Next Character →
        </button>
        <button
          onClick={() => {
            setShowGrid(!showGrid);
            clearCanvas(); // re-draw with or without grid
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-lg"
        >
          {showGrid ? "Hide Grid" : "Show Grid"}
        </button>
      </div>
    </div>
  );
};

export default TracingCanvas;