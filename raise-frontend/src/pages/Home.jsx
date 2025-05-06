const Home = () => {
  return (
    <div className="text-yellow-700 space-y-4">
      <h1 className="text-3xl font-bold">Welcome to RAISE-AI Teacher Dashboard</h1>
      <p>Use the sidebar to navigate through predictions, analytics, and reports.</p>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="p-4 bg-yellow-100 rounded shadow">📝 Total Students Screened: <strong>45</strong></div>
        <div className="p-4 bg-yellow-100 rounded shadow">📊 High Risk Cases Identified: <strong>12</strong></div>
      </div>
    </div>
  );
};

export default Home;