import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0a0f1b] flex items-center justify-center relative overflow-hidden text-white">
      {/* Glowing background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-15%] left-[-15%] w-[400px] h-[400px] bg-[#089c9c]/30 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-[#089c9c]/20 rounded-full blur-[200px] animate-ping" />
      </div>

      <div className="flex w-full max-w-6xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-lg">
        {/* Left Form Section */}
        <motion.div
          className="w-full md:w-1/2 p-10"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-[#0dfcf0]">Login to RAISE-AI</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#1e293b] border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#089c9c]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1e293b] border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#089c9c]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-[#089c9c] to-[#0bd] rounded-md font-semibold text-white shadow-md hover:scale-105 transition"
            >
              Login →
            </button>
            <p className="mt-4 text-sm text-gray-300 text-center">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-[#0dfcf0] hover:underline cursor-pointer font-medium"
              >
                Sign up
              </span>
            </p>

          </form>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          className="hidden md:flex w-1/2 items-center justify-center bg-[#0f172a]"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="analysis.svg"
            alt="Login Visual"
            className="w-4/5 animate-fadeInUp"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
