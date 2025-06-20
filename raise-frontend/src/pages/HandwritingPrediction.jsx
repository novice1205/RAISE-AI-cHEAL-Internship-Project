import { useState, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import { FaCamera, FaCloudUploadAlt } from "react-icons/fa";

const HandwritingPrediction = () => {
  const [accepted, setAccepted] = useState(false);
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [reportURL, setReportURL] = useState("");
  const [annotatedImgUrl, setAnnotatedImgUrl] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [inputType, setInputType] = useState(""); // "real" or "synthetic"
  const webcamRef = useRef();
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImage(file);
  };

  const handleImage = (file) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewURL(reader.result);
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleImage(file);
  };

  const captureFromCamera = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "captured.png", { type: "image/png" });
        handleImage(file);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("image_type", inputType === "real" ? "custom" : "synthetic");

    try {
      const res = await axios.post("http://127.0.0.1:8000/analyze-handwriting/", formData);
      setInsights(res.data.analysis);
      setSuggestions(res.data.suggestions || []);
      setReportURL(res.data.report_url);
      setAnnotatedImgUrl(res.data.annotated_img_url);
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#089c9c]">✍️ Handwriting Analysis</h2>

      {!canProceed && (
        <div className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl shadow text-white space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-[#0dfcf0] mb-1">📋 Terms & Conditions</h3>
            <p className="text-sm text-gray-400">Please review the guidelines before proceeding.</p>
          </div>

          <ul className="list-disc ml-6 text-sm text-gray-300 space-y-1">
            <li>Use clear, well-lit handwriting on plain white paper.</li>
            <li>Use only blue or black pens.</li>
            <li>Prefer disconnected letters (avoid cursive).</li>
            <li>Supported formats: JPG, PNG, WebP</li>
          </ul>

          <div>
            <h4 className="font-semibold text-sm mb-2">✅ Ideal Samples:</h4>
            <div className="flex flex-wrap gap-3">
              <img src="val_0054.png" alt="sample2" className="w-48 h-48 object-cover rounded border border-white/10 shadow" />
              <img src="val_0056.png" alt="sample3" className="w-48 h-48 object-cover rounded border border-white/10 shadow" />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="accept-terms"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="w-5 h-5 accent-[#0dfcf0] rounded-md border border-white/20 cursor-pointer transition-all duration-200"
            />
            <label htmlFor="accept-terms" className="text-sm text-gray-200 leading-tight cursor-pointer">
              I have read and agree to the above guidelines.
            </label>
          </div>

          {accepted && (
            <div className="bg-[#1e293b] p-4 mt-4 rounded text-white">
              <h4 className="text-sm font-semibold mb-2 text-[#0dfcf0]">🎯 Select Input Type</h4>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setInputType("real");
                    alert("✅ Selected: Custom (Real Handwriting). Preprocessing will be applied.");
                  }}
                  className={`px-4 py-2 rounded text-sm font-medium transition ${inputType === "real"
                    ? "bg-[#0dfcf0] text-black"
                    : "bg-gray-700 text-white"
                    }`}
                >
                  ✍️ Custom (Real Handwriting)
                </button>
                <button
                  onClick={() => {
                    setInputType("synthetic");
                    alert("⚙️ Selected: Synthetic. No preprocessing will be applied.");
                  }}
                  className={`px-4 py-2 rounded text-sm font-medium transition ${inputType === "synthetic"
                    ? "bg-[#0dfcf0] text-black"
                    : "bg-gray-700 text-white"
                    }`}
                >
                  🤖 Synthetic
                </button>
              </div>
            </div>
          )}

          <button
            disabled={!accepted || !inputType}
            onClick={() => setCanProceed(true)}
            className={`w-full mt-4 px-4 py-2 rounded text-sm font-medium ${accepted && inputType
                ? "bg-[#089c9c] text-white hover:bg-[#0dfcf0]"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
              } transition`}
          >
            Continue →
          </button>
        </div>
      )}

      {canProceed && (
        <>
          {/* Upload */}
          <div
            className="border-2 border-dashed border-[#0dfcf0]/40 rounded-xl p-6 text-center cursor-pointer bg-[#0f172a] hover:bg-[#1a273a] transition"
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <FaCloudUploadAlt className="mx-auto text-4xl text-[#0dfcf0]" />
            <p className="mt-2 text-sm text-gray-400">Drag & drop or click to browse handwriting image</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-4 text-gray-400">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="mx-4 text-sm uppercase text-white/50 font-semibold">or</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* Camera */}
          <div className="text-center">
            {!showCamera ? (
              <button
                onClick={() => setShowCamera(true)}
                className="px-5 py-2 bg-[#089c9c] text-white rounded hover:bg-[#0dfcf0] transition"
              >
                📸 Use Camera
              </button>
            ) : (
              <>
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/png"
                  className="mt-4 rounded-lg border border-white/10"
                  width={320}
                />
                <button
                  onClick={captureFromCamera}
                  className="mt-2 px-4 py-2 bg-[#089c9c] text-white rounded hover:bg-[#0dfcf0] transition flex items-center gap-2"
                >
                  <FaCamera /> Capture
                </button>
              </>
            )}
          </div>

          {image && (
            <button
              onClick={handleSubmit}
              className="mt-4 bg-gradient-to-r from-[#089c9c] to-[#0dfcf0] px-6 py-2 rounded text-white font-semibold hover:scale-105 transition"
            >
              🔍 Analyze Handwriting
            </button>
          )}

          {loading && <p className="text-yellow-400 font-semibold">⏳ Analyzing handwriting...</p>}

          {previewURL && (
            <div className="mt-4">
              <h3 className="font-semibold text-white mb-2">🖼 Uploaded:</h3>
              <img src={previewURL} alt="Preview" className="w-[400px] border rounded shadow" />
            </div>
          )}

          {annotatedImgUrl && (
            <div>
              <h3 className="font-semibold text-white mb-2">📌 Annotated:</h3>
              <img
                src={`http://127.0.0.1:8000${annotatedImgUrl}`}
                alt="Analyzed"
                className="w-[400px] border rounded"
              />
            </div>
          )}

          {insights && (
            <div className="bg-white/10 p-4 rounded-xl text-white mt-4">
              <p className="text-lg font-bold text-[#0dfcf0]">🔍 Characters: {insights.total_detected}</p>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {Object.entries(insights.label_counts).map(([label, count]) => (
                  <div key={label} className="bg-[#089c9c]/20 px-3 py-2 rounded text-sm">
                    {label}: {count}
                  </div>
                ))}
              </div>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="bg-[#1e293b] p-4 rounded text-white mt-4">
              <h3 className="font-bold text-[#0dfcf0] mb-2">💡 Suggestions</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {suggestions.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {reportURL && (
            <a
              href={`http://127.0.0.1:8000${reportURL}`}
              download
              className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
              target="_blank"
            >
              📄 Download PDF Report
            </a>
          )}
        </>
      )}
    </div>
  );
};

export default HandwritingPrediction;
