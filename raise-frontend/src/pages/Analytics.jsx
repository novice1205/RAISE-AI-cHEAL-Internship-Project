import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { motion } from "framer-motion";

const students = ["Sara M", "Karthik S", "Ananya R"];
const chartTypes = ["Bar", "Line", "Pie"];

const demoData = {
  "Sara M": [
    { name: "Week 1", risk: 80 },
    { name: "Week 2", risk: 70 },
    { name: "Week 3", risk: 60 },
  ],
  "Karthik S": [
    { name: "Week 1", risk: 55 },
    { name: "Week 2", risk: 45 },
    { name: "Week 3", risk: 30 },
  ],
  "Ananya R": [
    { name: "Week 1", risk: 20 },
    { name: "Week 2", risk: 25 },
    { name: "Week 3", risk: 22 },
  ],
};

const COLORS = ["#0dfcf0", "#089c9c", "#0f172a"];

const Analytics = () => {
  const [selectedStudent, setSelectedStudent] = useState("Sara M");
  const [chartType, setChartType] = useState("Bar");
  const data = demoData[selectedStudent];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-[#0f172a] p-6 rounded-xl shadow border border-white/10">
        <h2 className="text-4xl font-bold text-white">📈 Analytics</h2>
        <p className="text-gray-300 mt-2 text-lg">
          Visualize student risk trend and progress over time
        </p>

        <div className="flex gap-4 mt-4">
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="bg-[#1e293b] text-white border border-white/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#089c9c]"
          >
            {students.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="bg-[#1e293b] text-white border border-white/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#089c9c]"
          >
            {chartTypes.map((t, i) => (
              <option key={i} value={t}>{t} Chart</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-[#1e293b] p-6 rounded-xl border border-white/10 shadow">
        <ResponsiveContainer width="100%" height={300}>
          {chartType === "Bar" && (
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="risk" fill="#0dfcf0" />
            </BarChart>
          )}
          {chartType === "Line" && (
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Line type="monotone" dataKey="risk" stroke="#0dfcf0" strokeWidth={3} />
            </LineChart>
          )}
          {chartType === "Pie" && (
            <PieChart>
              <Pie data={data} dataKey="risk" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Analytics;