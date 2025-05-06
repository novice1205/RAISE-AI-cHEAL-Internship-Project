import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const students = [
  { name: "Student A", score: "High Risk", recommendation: "Needs immediate intervention" },
  { name: "Student B", score: "Moderate Risk", recommendation: "Monitoring required" },
  { name: "Student C", score: "Low Risk", recommendation: "Normal follow-up" },
];

const Reports = () => {
  const [selectedStudent, setSelectedStudent] = useState(students[0].name);

  const generatePDF = (data, filename) => {
    const doc = new jsPDF();
    doc.text("RAISE-AI Progress Report", 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [["Student", "Assessment", "Recommendation"]],
      body: data.map(s => [s.name, s.score, s.recommendation])
    });
    doc.save(filename);
  };

  const handleSingleDownload = () => {
    const student = students.find(s => s.name === selectedStudent);
    if (student) {
      generatePDF([student], `${student.name}_Report.pdf`);
    }
  };

  const handleBulkDownload = () => {
    generatePDF(students, `All_Students_Report.pdf`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-yellow-600">Generate Student Reports</h2>
      <div className="flex items-center gap-4">
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="border p-2 rounded"
        >
          {students.map((s, idx) => (
            <option key={idx} value={s.name}>{s.name}</option>
          ))}
        </select>
        <button onClick={handleSingleDownload} className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500">
          Download Selected Report
        </button>
        <button onClick={handleBulkDownload} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Download Bulk Report
        </button>
      </div>
    </div>
  );
};

export default Reports;