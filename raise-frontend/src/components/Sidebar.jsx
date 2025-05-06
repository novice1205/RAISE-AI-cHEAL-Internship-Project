import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-yellow-400 text-white flex flex-col p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-6">RAISE-AI</h2>
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/handwriting" className="hover:underline">Handwriting Analysis</Link>
      <Link to="/gamify" className="hover:underline">Gamify Handwriting</Link>
      <Link to="/audio" className="hover:underline">Audio Prediction</Link>
      <Link to="/eye-tracking" className="hover:underline">Eye Tracking</Link>
      <Link to="/analytics" className="hover:underline">Analytics</Link>
      <Link to="/reports" className="hover:underline">Reports</Link>
    </div>
  );
};

export default Sidebar;