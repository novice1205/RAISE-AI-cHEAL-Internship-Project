import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const barData = [
  { name: "Jan", Progress: 60 },
  { name: "Feb", Progress: 70 },
  { name: "Mar", Progress: 80 },
  { name: "Apr", Progress: 90 },
  { name: "May", Progress: 75 },
];

const lineData = [
  { name: "Week 1", avg: 65 },
  { name: "Week 2", avg: 72 },
  { name: "Week 3", avg: 78 },
  { name: "Week 4", avg: 84 },
];

const studentList = [
  { name: "Ananya R", risk: "Low", id: "ST001" },
  { name: "Karthik S", risk: "Medium", id: "ST002" },
  { name: "Sara M", risk: "High", id: "ST003" },
];

const Home = () => {
  const [tab, setTab] = useState("reports");

  return (
    <div className="p-6 text-white bg-[#0a0f1b] min-h-screen space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-4xl font-bold text-[#089c9c]">Welcome to RAISE-AI Dashboard</h1>
        <p className="text-sm text-gray-400 mt-2 md:mt-0">Insight-driven teaching experience</p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <button className="bg-[#089c9c] px-4 py-2 rounded-xl text-white hover:bg-[#0bbebe]">➕ Add Student</button>
        <button className="bg-white text-[#089c9c] px-4 py-2 rounded-xl hover:bg-[#e0fafa]">🔍 Review Students</button>
        <button className="bg-[#1b1f2a] px-4 py-2 rounded-xl hover:bg-[#2a2f3d]">📥 Download Report</button>
      </div>

      {/* Risk Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#089c9c]/30 to-[#0bd]/20 p-6 rounded-2xl shadow-md">
          <p className="text-sm text-white/70">🧒 Total Students</p>
          <p className="text-4xl font-extrabold text-[#0dfcf0] mt-1">45</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/30 to-red-400/10 p-6 rounded-2xl shadow-md">
          <p className="text-sm text-white/70">🔥 High Risk</p>
          <p className="text-4xl font-extrabold text-red-400 mt-1">12</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-400/30 to-yellow-300/10 p-6 rounded-2xl shadow-md">
          <p className="text-sm text-white/70">⚠️ Moderate Risk</p>
          <p className="text-4xl font-extrabold text-yellow-300 mt-1">7</p>
        </div>
        <div className="bg-gradient-to-br from-green-400/30 to-green-300/10 p-6 rounded-2xl shadow-md">
          <p className="text-sm text-white/70">✅ Low Risk</p>
          <p className="text-4xl font-extrabold text-green-300 mt-1">26</p>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#132030] p-6 rounded-xl border border-white/10 shadow">
        <h3 className="text-lg font-bold mb-3">🧠 AI Summary</h3>
        <p className="text-gray-300">
          In the last 4 weeks, average student engagement increased by <span className="text-[#0dfcf0] font-semibold">22%</span>. However, <span className="text-red-400 font-semibold">3 new high-risk cases</span> have been flagged for immediate review.
        </p>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#089c9c]/10 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-white mb-4">📊 Monthly Student Progress</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData} barSize={30}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ background: "#1e293b", border: "none", color: "white" }} />
              <Bar dataKey="Progress" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0dfcf0" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#089c9c" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#089c9c]/10 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-white mb-4">📈 Avg Weekly Improvement</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ background: "#1e293b", border: "none", color: "white" }} />
              <Line type="monotone" dataKey="avg" stroke="#0dfcf0" strokeWidth={3} dot={{ fill: "#0dfcf0" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student Directory */}
      <div className="bg-[#1e293b] p-6 rounded-xl shadow border border-white/10">
        <h3 className="text-lg font-bold mb-4">🗃️ Student Directory</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {studentList.map((student) => (
            <div
              key={student.id}
              className="bg-[#0f172a] p-4 rounded-xl border border-white/10 hover:shadow-lg transition"
            >
              <h4 className="text-md font-semibold text-white">{student.name}</h4>
              <p className="text-sm text-gray-400">ID: {student.id}</p>
              <p
                className={`text-sm font-bold mt-2 ${
                  student.risk === "High"
                    ? "text-red-400"
                    : student.risk === "Medium"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                Risk: {student.risk}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-[#0f172a] p-6 rounded-xl shadow border border-white/10">
        <div className="flex gap-4 mb-4">
          {["reports", "flags", "logs"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                tab === t
                  ? "bg-[#089c9c] text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="text-gray-300">
          {tab === "reports" && <p>📄 You have 8 reports generated in the past week.</p>}
          {tab === "flags" && <p>⚠️ 3 new red flags raised by AI based on writing irregularities.</p>}
          {tab === "logs" && <p>🕓 Activity logs show student logins and test completions.</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;