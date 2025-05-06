import { useEffect, useState, useRef } from "react";

const prompts = [
  "The quick brown fox jumps over the lazy dog.",
  "She sells seashells by the seashore.",
  "Reading is fun and helps you learn new things.",
  "The boy ran across the field to catch his kite.",
  "My school bag is full of colorful books.",
];

const AudioPrediction = () => {
  const [prompt, setPrompt] = useState("");
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const chunks = useRef([]);

  useEffect(() => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(randomPrompt);
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
    chunks.current = [];

    recorder.ondataavailable = (e) => chunks.current.push(e.data);

    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      setAudioUrl(URL.createObjectURL(blob));
      setPrediction(null); // Reset prediction
    };
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handlePrediction = () => {
    setPrediction("Analyzing...");
    setTimeout(() => {
      setPrediction("Prediction: Normal pronunciation with slight pacing issues. Confidence: 88%");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-yellow-600">Audio Prediction</h2>

      <div className="bg-yellow-100 p-4 rounded shadow">
        <p className="text-lg font-medium text-yellow-800">Please read the following sentence aloud:</p>
        <blockquote className="italic text-yellow-700 mt-2 border-l-4 pl-4 border-yellow-500">
          {prompt}
        </blockquote>
      </div>

      <div className="flex gap-4">
        {!recording ? (
          <button
            onClick={startRecording}
            className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          >
            🎙 Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            ⏹ Stop Recording
          </button>
        )}
      </div>

      {audioUrl && (
        <>
          <div className="mt-4">
            <p className="text-yellow-700 font-semibold">Preview your recording:</p>
            <audio controls src={audioUrl} className="mt-2 border-2 border-yellow-300 rounded" />
          </div>

          <button
            onClick={handlePrediction}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            🔍 Predict
          </button>
        </>
      )}

      {prediction && (
        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded shadow">
          <strong>Result:</strong> {prediction}
        </div>
      )}
    </div>
  );
};

export default AudioPrediction;