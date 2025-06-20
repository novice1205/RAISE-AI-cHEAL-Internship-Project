import { FaSignOutAlt, FaBars } from "react-icons/fa";

const Navbar = ({ onToggleSidebar }) => {
  const handleLogout = () => {
    // TODO: clear auth token or session
    window.location.href = "/login";
  };

  return (
    <nav className="w-full bg-[#0f172a] text-white px-6 py-4 flex justify-between items-center border-b border-white/10 shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="text-[#089c9c] text-xl hover:text-white transition">
          <FaBars />
        </button>
        <h1 className="text-lg font-bold text-[#089c9c]">👩‍🏫 Teacher Dashboard</h1>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm bg-[#089c9c] hover:bg-[#0bbebe] px-4 py-2 rounded-xl font-semibold transition"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;