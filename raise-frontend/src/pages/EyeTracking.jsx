import { useEffect, useRef, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

const EyeTracking = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [tracking, setTracking] = useState(false);
  const cameraRef = useRef(null);

  const startTracking = () => {
    if (videoRef.current && canvasRef.current) {
      const faceMesh = new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((results) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

        if (results.multiFaceLandmarks) {
          for (const landmarks of results.multiFaceLandmarks) {
            for (const point of landmarks) {
              const x = point.x * canvas.width;
              const y = point.y * canvas.height;
              ctx.beginPath();
              ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
              ctx.fillStyle = "#facc15";
              ctx.fill();
            }
          }
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
      setTracking(true);
    }
  };

  const stopTracking = () => {
    if (cameraRef.current) {
      cameraRef.current.stop();
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    setTracking(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-yellow-600">Eye Tracking (MediaPipe)</h2>
      <p className="text-yellow-700">
        Click Start to activate your camera and run fast, real-time face and eye detection using MediaPipe.
      </p>

      <div className="flex gap-4">
        {!tracking ? (
          <button
            onClick={startTracking}
            className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          >
            ▶️ Start Tracking
          </button>
        ) : (
          <button
            onClick={stopTracking}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            ⏹ Stop Tracking
          </button>
        )}
      </div>

      <div className="relative max-w-xl mt-4">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute rounded w-full border-4 border-yellow-300"
          style={{ zIndex: 1 }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 rounded"
          style={{ zIndex: 2 }}
        />
      </div>
    </div>
  );
};

export default EyeTracking;