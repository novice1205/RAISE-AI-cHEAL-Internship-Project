import { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;
    try{
        const formData = new FormData();
        formData.append("file", image);

        const res = await axios.post("http://127.0.0.1:8000/predict", formData);
        console.log("Prediction Successful",res.data.result);
        setResult(res.data.result);
    }catch(error){
        console.log("Error",error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Predict</button>
      {result && <p className="mt-4 font-semibold text-lg">Result: {result}</p>}
    </form>
  );
}