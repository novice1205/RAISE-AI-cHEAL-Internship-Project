import { Link, useLocation } from "react-router-dom";
import {
  FaHome, FaPenFancy, FaGamepad,
  FaEye, FaChartBar, FaFileAlt
} from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = ({ collapsed }) => {
  const { pathname } = useLocation();

  const links = [
    { icon: <FaHome />, text: "Dashboard", path: "/dashboard" },
    { icon: <FaPenFancy />, text: "Handwriting", path: "/handwriting" },
    { icon: <FaGamepad />, text: "Gamify", path: "/gamify" },
    { icon: <FaEye />, text: "Eye Tracking", path: "/eye-tracking" },
    { icon: <FaChartBar />, text: "Analytics", path: "/analytics" },
    { icon: <FaFileAlt />, text: "Reports", path: "/reports" },
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-[#0a0f1b] text-white p-4 flex flex-col border-r border-white/10 shadow-lg"
    >
      <div className="text-[#089c9c] font-extrabold text-xl mb-10 text-center">
        {collapsed ? "R" : "👨‍💻 RAISE-AI"}
      </div>
      <div className="space-y-3">
        {links.map(({ icon, text, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              pathname === path
                ? "bg-[#089c9c]/90 text-white"
                : "text-gray-300 hover:bg-[#089c9c]/40 hover:text-white"
            }`}
          >
            <span className="text-lg">{icon}</span>
            {!collapsed && <span>{text}</span>}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
