import { useState } from "react";
import axios from "axios";

const HandwritingPrediction = () => {
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [insights, setInsights] = useState(null);
  const [reportURL, setReportURL] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [annotatedImgUrl, setAnnotatedImgUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await axios.post("http://127.0.0.1:8000/analyze-handwriting", formData);
      setInsights(res.data.analysis);
      setSuggestions(res.data.suggestions || []);
      setReportURL(res.data.report_url);
      setAnnotatedImgUrl(res.data.annotated_img_url);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-yellow-600">✍️ Handwriting Analysis</h2>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
        >
          Analyze
        </button>
      </form>

      {loading && (
        <p className="text-yellow-500 font-semibold mt-4">⏳ Analysing handwriting...</p>
      )}

      {previewURL && (
        <div className="mt-4">
          <h3 className="font-semibold">🖼 Uploaded Image:</h3>
          <img src={previewURL} alt="Uploaded" className="w-[400px] border border-gray-300" />
        </div>
      )}

      {annotatedImgUrl && annotatedImgUrl !== "" && (
        <div className="mt-4">
          <h3 className="font-semibold">📌 Detected Output:</h3>
          <img
            src={`http://127.0.0.1:8000${annotatedImgUrl}`}
            alt="Analyzed"
            className="w-[400px] border border-gray-300"
          />
        </div>
      )}

      {insights && (
        <div className="mt-4 bg-yellow-50 p-4 rounded shadow">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            🔍 <span className="text-yellow-600">Total Characters Detected:</span>{" "}
            {insights.total_detected}
          </p>

          <div className="mt-2">
            <p className="text-md font-semibold mb-1 text-gray-800">🧮 Character Counts:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm ml-4">
              {Object.entries(insights.label_counts).map(([label, count]) => (
                <div
                  key={label}
                  className="px-3 py-1 bg-yellow-100 border border-yellow-300 rounded text-center text-gray-800 font-medium"
                >
                  {label}: {count}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {suggestions && suggestions.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold text-yellow-600">💡 Suggestions</h3>
          <ul className="list-disc ml-6">
            {suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      {reportURL && (
        <a
          href={`http://127.0.0.1:8000${reportURL}`}
          download
          className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          target="_blank"
        >
          📄 Download PDF Report
        </a>
      )}
    </div>
  );
};

export default HandwritingPrediction;