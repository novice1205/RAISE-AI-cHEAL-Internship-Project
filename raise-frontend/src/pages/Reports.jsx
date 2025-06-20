import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { motion } from "framer-motion";


// Student data
const students = [
  {
    name: "Sara M",
    score: "High Risk",
    scoreColor: "#ef4444",
    recommendation: "Needs immediate intervention",
    remarks: "Consistently high-risk trend. Immediate parent-teacher intervention recommended.",
    image: "/studentA.jpg",
    trend: [
      ["Week", "Risk Level"],
      ["Week 1", 80],
      ["Week 2", 70],
      ["Week 3", 60],
    ]
  },
  {
    name: "Karthik S",
    score: "Moderate Risk",
    scoreColor: "#facc15",
    recommendation: "Monitoring required",
    remarks: "Fluctuating trend, keep a close watch and regular feedback.",
    image: "/studentB.jpg",
    trend: [
      ["Week", "Risk Level"],
      ["Week 1", 55],
      ["Week 2", 45],
      ["Week 3", 30],
    ]
  },
  {
    name: "Ananya R",
    score: "Low Risk",
    scoreColor: "#22c55e",
    recommendation: "Normal follow-up",
    remarks: "Stable and healthy learning behavior. Keep it up!",
    image: "/studentC.jpg",
    trend: [
      ["Week", "Risk Level"],
      ["Week 1", 20],
      ["Week 2", 25],
      ["Week 3", 22],
    ]
  }
];

// Gamification scores
const gameScores = {
  "Sara M": {
    "Flashcards": 68,
    "Pattern Recognition": 72,
    "Tracing Practice": 58
  },
  "Karthik S": {
    "Flashcards": 78,
    "Pattern Recognition": 83,
    "Tracing Practice": 80
  },
  "Ananya R": {
    "Flashcards": 92,
    "Pattern Recognition": 89,
    "Tracing Practice": 94
  }
};

const Reports = () => {
  const [selectedStudent, setSelectedStudent] = useState(students[0].name);

  const generatePDF = (data, filename) => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    data.forEach((student, idx) => {
      if (idx > 0) doc.addPage();

      // Header
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, pageWidth, 20, "F");
      doc.setTextColor(255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("RAISE-AI | Progress Report", 14, 13);

      // Student Info
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0);
      doc.setFillColor(240);
      doc.roundedRect(14, 25, 180, 14, 3, 3, "F");
      doc.setTextColor(33);
      doc.text(`Name: ${student.name}`, 20, 35);

      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`Risk Category:`, 20, 45);
      doc.setTextColor(student.scoreColor);
      doc.setFont("helvetica", "bold");
      doc.text(student.score, 65, 45);
      doc.setFont("helvetica", "normal");

      // Weekly Risk Trend Table
      autoTable(doc, {
        startY: 55,
        head: [student.trend[0]],
        body: student.trend.slice(1),
        theme: "grid",
        headStyles: {
          fillColor: [55, 65, 81],
          textColor: 255,
          fontSize: 11,
          font: "helvetica",
          fontStyle: "bold",
        },
        styles: {
          fontSize: 10,
          halign: 'center',
          valign: 'middle',
          font: "helvetica",
        },
      });

      // Gamification Scores Table
      const scores = gameScores[student.name];
      const gameData = Object.entries(scores).map(([game, score]) => [game, `${score}%`]);

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Game", "Score"]],
        body: gameData,
        theme: "grid",
        headStyles: {
          fillColor: [55, 65, 81],
          textColor: 255,
          fontSize: 11,
          font: "helvetica",
          fontStyle: "bold",
        },
        styles: {
          fontSize: 10,
          halign: 'center',
          valign: 'middle',
          font: "helvetica",
        },
      });

      // Risk Meter Bar
      const risk = parseInt(student.trend.at(-1)[1]);
      const riskColor = risk > 60 ? "#ef4444" : risk > 30 ? "#facc15" : "#22c55e";
      const meterY = doc.lastAutoTable.finalY + 15;

      doc.setTextColor(0);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Risk Meter:", 14, meterY);

      doc.setFillColor("#e5e7eb");
      doc.rect(14, meterY + 5, 100, 8, "F");

      doc.setFillColor(riskColor);
      doc.rect(14, meterY + 5, (risk / 100) * 100, 8, "F");

      // Remarks
      const remarksY = meterY + 20;
      doc.setTextColor(0);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Remarks:", 14, remarksY);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80);
      doc.text(doc.splitTextToSize(student.remarks, 180), 14, remarksY + 6);

      // Recommendations
      const recY = remarksY + 20 + doc.getTextDimensions(student.remarks).h;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text("Recommendation:", 14, recY);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 102, 255);
      doc.text(doc.splitTextToSize(student.recommendation, 180), 14, recY + 6);

      // Footer
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(150);
      doc.text("Generated by RAISE-AI | Empowering Learning Through Insights", 14, 290);
    });

    doc.save(filename);
  };


  const handleSingleDownload = () => {
    const student = students.find(s => s.name === selectedStudent);
    if (student) generatePDF([student], `${student.name}_Report.pdf`);
  };

  const handleBulkDownload = () => {
    generatePDF(students, `All_Students_Report.pdf`);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-[#0f172a] p-6 rounded-xl border border-white/10 shadow-md">
        <h2 className="text-4xl font-bold text-white">📄 Reports</h2>
        <p className="text-gray-300 mt-2 text-lg">
          Generate clean and detailed PDF reports with all game scores, analytics and insights.
        </p>

        <div className="flex flex-wrap gap-4 mt-6">
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="bg-[#1e293b] text-white border border-white/20 rounded px-4 py-2"
          >
            {students.map((s, idx) => (
              <option key={idx} value={s.name}>{s.name}</option>
            ))}
          </select>

          <button
            onClick={handleSingleDownload}
            className="bg-[#089c9c] text-white px-5 py-2 rounded hover:bg-[#0dfcf0] transition"
          >
            📥 Download Report
          </button>

          <button
            onClick={handleBulkDownload}
            className="bg-[#0dfcf0] text-black px-5 py-2 rounded hover:bg-[#089c9c] transition"
          >
            📦 Download All
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Reports;