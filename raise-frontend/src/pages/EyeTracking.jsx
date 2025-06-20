// EyeTrackingWithInsights.jsx
import { useEffect, useRef, useState } from "react";
import { FaceMesh, FACEMESH_TESSELATION } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors } from "@mediapipe/drawing_utils";
import { motion } from "framer-motion";

const sentencesList = [
  "Every avid reader reads every day.",
  "The quick brown fox jumps over the lazy dog.",
  "A big black bug bit a big black bear.",
  "Was it a car or a cat I saw?",
  "She sells seashells by the seashore.",
  "Fred fed Ted bread and Ted fed Fred bread."
];

const EyeTracking = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  const [tracking, setTracking] = useState(false);
  const [trail, setTrail] = useState([]);
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [warning, setWarning] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [liveConsistency, setLiveConsistency] = useState(0);
  const [liveBacktrack, setLiveBacktrack] = useState(0);
  const [liveDeviation, setLiveDeviation] = useState(0);


  const maxTrailLength = 200;
  const bandTolerance = 40;
  const readingLineY = 360;

  useEffect(() => {
    let driftInterval;
    if (tracking) {
      const faceMesh = new FaceMesh({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      faceMesh.onResults((results) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

        if (results.multiFaceLandmarks.length > 0) {
          const landmarks = results.multiFaceLandmarks[0];
          const left = landmarks[468];
          const right = landmarks[473];
          const x = ((left.x + right.x) / 2) * canvas.width;
          const y = ((left.y + right.y) / 2) * canvas.height;

          setTrail((prev) => {
            const smoothed = prev.length > 0 ? {
              x: (prev[prev.length - 1].x + x) / 2,
              y: (prev[prev.length - 1].y + y) / 2,
            } : { x, y };
            const updated = [...prev, smoothed];
            const limited = updated.length > maxTrailLength ? updated.slice(-maxTrailLength) : updated;

            // Update live stats
            const withinBand = limited.filter(pt => Math.abs(pt.y - readingLineY) <= bandTolerance).length;
            const leftward = limited.filter((pt, i) => i > 0 && pt.x < limited[i - 1].x).length;
            const total = limited.length;
            const avgDev = limited.reduce((acc, pt) => acc + Math.abs(pt.y - readingLineY), 0) / total;

            setLiveConsistency(((withinBand / total) * 100).toFixed(1));
            setLiveBacktrack(((leftward / total) * 100).toFixed(1));
            setLiveDeviation(avgDev.toFixed(1));

            return limited;
          });


          ctx.beginPath();
          ctx.moveTo(0, readingLineY);
          ctx.lineTo(canvas.width, readingLineY);
          ctx.strokeStyle = "#ffd700";
          ctx.setLineDash([8, 5]);
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.beginPath();
          ctx.arc(x, y, 6, 0, 2 * Math.PI);
          ctx.fillStyle = "#ff4d4f";
          ctx.fill();

          for (let i = 1; i < trail.length; i++) {
            ctx.beginPath();
            ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
            ctx.lineTo(trail[i].x, trail[i].y);
            ctx.strokeStyle = "#0dfcf0";
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

          drawConnectors(ctx, landmarks, FACEMESH_TESSELATION, {
            color: "#00FF00",
            lineWidth: 0.3,
          });
        }
      });

      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });

      camera.start();
      cameraRef.current = camera;

      driftInterval = setInterval(() => {
        const latest = trail[trail.length - 1];
        if (latest) {
          const deviation = Math.abs(latest.y - readingLineY);
          setWarning(deviation > bandTolerance ? "⚠️ Eye deviated from reading line." : "");
        }
      }, 1000);
    }

    return () => clearInterval(driftInterval);
  }, [tracking, trail]);

  const startTracking = () => {
    setTrail([]);
    setShowResults(false);
    setTracking(true);
  };

  const stopTracking = () => {
    if (cameraRef.current) cameraRef.current.stop();
    setTracking(false);
    setWarning("");
  };

  const analyzeTrail = () => {
    if (trail.length < 5) return;
    const withinBand = trail.filter(pt => Math.abs(pt.y - readingLineY) <= bandTolerance).length;
    const leftward = trail.filter((pt, i) => i > 0 && pt.x < trail[i - 1].x).length;
    const total = trail.length;
    const avgDev = trail.reduce((acc, pt) => acc + Math.abs(pt.y - readingLineY), 0) / total;
    const verdict = (withinBand / total) > 0.60 && leftward / total < 0.45
      ? "🟢 Excellent tracking"
      : (withinBand / total > 0.45 ? "🟡 Inconsistent reading" : "🔴 Erratic gaze pattern");

    setResults({
      withinPercent: ((withinBand / total) * 100).toFixed(1),
      avgDeviation: avgDev.toFixed(1),
      leftBacktrack: ((leftward / total) * 100).toFixed(1),
      verdict
    });
    stopTracking();
    setShowResults(true);
  };

  return (
    <motion.div className="space-y-6">
      {!showTracking ? (
        <div className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl shadow text-white space-y-6">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-[#0dfcf0] flex items-center gap-2">📘 Consent & Instructions</h3>
            <p className="text-white text-[15px]">
              Please review the following before beginning the Eye Tracking assessment.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-3">
            <h4 className="text-xl font-semibold text-[#0f172a] mb-2">📋 How to Use?</h4>
            <ul className="text-gray-700 text-sm list-disc pl-6 space-y-2">
              <li>Ensure your face is clearly visible to the webcam with proper lighting.</li>
              <li>Click <strong>Start</strong> to begin the test and read the displayed sentence from left to right.</li>
              <li>Click <strong>End Reading</strong> when you're done to view performance insights.</li>
              <li>This test is intended for learning support, not medical diagnosis.</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-3">
            <h4 className="text-xl font-semibold text-[#0f172a] mb-2">📊 How Scores Are Evaluated</h4>
            <ul className="text-gray-700 text-sm list-disc pl-6 space-y-2">
              <li><strong>Line Consistency:</strong> % of time your eyes stayed near the reading line.</li>
              <li><strong>Average Deviation:</strong> How far your gaze drifted from the expected line.</li>
              <li><strong>Backtrack Rate:</strong> % of time your gaze moved backward (indicates confusion).</li>
              <li><strong>Verdict:</strong> Combines all above to classify the reading as 🟢 Excellent, 🟡 Inconsistent, or 🔴 Erratic.</li>
            </ul>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <input
              type="checkbox"
              className="accent-[#089c9c] w-5 h-5"
              id="consent-checkbox"
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <label htmlFor="consent-checkbox" className="text-sm text-white select-none">
              I have read and agree to the instructions and consent terms.
            </label>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setShowTracking(true)}
              disabled={!accepted}
              className={`px-6 py-2 rounded-md font-semibold transition-all shadow ${accepted
                ? "bg-[#089c9c] text-white hover:bg-[#0dfcf0]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              ✅ Continue to Tracking
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] p-6 rounded-xl text-white shadow-md">
            <h2 className="text-3xl font-bold">👁️ Eye Tracking & Reading Analysis</h2>
            <p className="text-gray-300">Follow the sentence smoothly from left to right.</p>
            <div className="flex flex-wrap gap-4 mt-4">
              {!tracking ? (
                <button onClick={startTracking} className="bg-[#089c9c] px-5 py-2 rounded font-semibold shadow">
                  ▶️ Start
                </button>
              ) : (
                <button onClick={analyzeTrail} className="bg-red-500 px-5 py-2 rounded font-semibold shadow">
                  ⏹ End Reading
                </button>
              )}
              <button
                onClick={() => {
                  setSentenceIdx((i) => (i + 1) % sentencesList.length);
                  setTrail([]);
                  setShowResults(false);
                }}
                className="bg-indigo-600 px-5 py-2 rounded font-semibold shadow"
              >
                🔁 New Sentence
              </button>
            </div>
            {warning && (
              <p className="text-yellow-400 mt-3 font-medium animate-pulse">{warning}</p>
            )}
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-200">
            <p className="text-sm text-gray-500 mb-2">
              📌 Please read the following sentence aloud while smoothly tracking it with your eyes from left to right.
            </p>
            <p className="text-2xl font-semibold text-gray-800">📖 {sentencesList[sentenceIdx]}</p>
          </div>

          {tracking && (
            <div className="bg-gray-100 text-center text-sm text-gray-700 p-4 rounded-lg shadow max-w-2xl mx-auto border border-dashed border-gray-300">
              <p className="mb-1 font-medium text-gray-800">🧪 <span className="underline">Live Reading Metrics</span></p>
              <div className="flex justify-around text-xs md:text-sm">
                <div><strong>Line Consistency:</strong> {liveConsistency}%</div>
                <div><strong>Backtrack Rate:</strong> {liveBacktrack}%</div>
                <div><strong>Y Deviation:</strong> {liveDeviation}px</div>
              </div>
            </div>
          )}


          <div className="relative w-full max-w-2xl mx-auto aspect-video border border-gray-300 rounded-xl overflow-hidden shadow-md">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="absolute w-full h-full object-cover z-10 rounded-xl"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
            />
          </div>

          {showResults && results && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border-t-4 border-[#089c9c] p-6 rounded-xl shadow-xl max-w-xl mx-auto"
            >
              <h3 className="text-2xl font-bold mb-3 text-[#0f172a]">📊 Performance Summary</h3>
              <ul className="text-gray-800 space-y-1">
                <li><strong>✅ Line Consistency:</strong> {results.withinPercent}%</li>
                <li><strong>📐 Avg Deviation:</strong> {results.avgDeviation}px</li>
                <li><strong>↩️ Backtrack Rate:</strong> {results.leftBacktrack}%</li>
                <li className="text-lg font-bold mt-2">{results.verdict}</li>
              </ul>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default EyeTracking;
