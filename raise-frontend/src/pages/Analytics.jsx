import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const students = ["Student A", "Student B", "Student C"];
const chartTypes = ["Bar", "Line", "Pie"];

const demoData = {
  "Student A": [
    { name: "Week 1", risk: 80 },
    { name: "Week 2", risk: 70 },
    { name: "Week 3", risk: 60 },
  ],
  "Student B": [
    { name: "Week 1", risk: 55 },
    { name: "Week 2", risk: 45 },
    { name: "Week 3", risk: 30 },
  ],
  "Student C": [
    { name: "Week 1", risk: 20 },
    { name: "Week 2", risk: 25 },
    { name: "Week 3", risk: 22 },
  ],
};

const COLORS = ["#facc15", "#fcd34d", "#fde68a"];

const Analytics = () => {
  const [selectedStudent, setSelectedStudent] = useState("Student A");
  const [chartType, setChartType] = useState("Bar");

  const data = demoData[selectedStudent];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-yellow-600">Analytics</h2>

      <div className="flex gap-4">
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="border p-2 rounded"
        >
          {students.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border p-2 rounded"
        >
          {chartTypes.map((t, i) => (
            <option key={i} value={t}>{t} Chart</option>
          ))}
        </select>
      </div>

      <div className="bg-yellow-100 p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={300}>
          {chartType === "Bar" && (
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="risk" fill="#facc15" />
            </BarChart>
          )}

          {chartType === "Line" && (
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="risk" stroke="#facc15" strokeWidth={2} />
            </LineChart>
          )}

          {chartType === "Pie" && (
            <PieChart>
              <Pie
                data={data}
                dataKey="risk"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;