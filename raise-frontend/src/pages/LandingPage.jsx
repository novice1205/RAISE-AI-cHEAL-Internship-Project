import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1b] text-white flex flex-col relative overflow-hidden">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-10"/>

      {/* Blurred Glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-15%] left-[-15%] w-[400px] h-[400px] bg-[#089c9c]/30 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-[#089c9c]/20 rounded-full blur-[200px] animate-ping" />
      </div>

      {/* Header */}
      <motion.header
        className="px-8 py-6 flex justify-between items-center backdrop-blur-md bg-white/5 border-b border-white/10 shadow-sm z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#089c9c] tracking-tight">RAISE-AI</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-md text-sm font-semibold bg-white text-[#089c9c] hover:scale-105 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-md text-sm font-semibold bg-[#089c9c] text-white hover:bg-[#0cb6b6] transition"
          >
            Signup
          </Link>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="flex-1 text-center px-6 flex flex-col justify-center items-center relative z-10 pt-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="max-w-5xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#0bd] to-[#0aefb8] bg-clip-text text-transparent"
          >
            Empowering Every Learner with AI
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            RAISE-AI detects learning difficulties using handwriting, audio, and visual cues – giving students a brighter, more supported future.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link
              to="/login"
              className="px-8 py-3 rounded-md text-lg font-bold text-white bg-gradient-to-r from-[#0bd] to-[#0aefb8] shadow-xl hover:scale-105 transition"
            >
              Get Started →
            </Link>
          </motion.div>
        </motion.div>

        {/* Illustration */}
        <motion.img
          src="/analysis2.svg"
          alt="AI Learning Illustration"
          className="w-[50%] md:w-[25%] mt-12 rounded-lg shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />
      </main>

      {/* Features Section */}
      <motion.section
        className="py-20 px-6 bg-[#0f172a] text-center space-y-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-4xl font-bold text-white">Why Choose RAISE-AI?</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-left">
          {[
            {
              title: "📊 Intelligent Analysis",
              desc: "Multimodal data processing across handwriting, audio, and eye-tracking for accurate detection.",
            },
            {
              title: "🧠 Personalized Support",
              desc: "Tailored feedback, reports, and gamified modules to encourage improvement at each child’s pace.",
            },
            {
              title: "📈 Insights for Educators",
              desc: "Monitor student progress, generate detailed reports, and plan interventions with confidence.",
            },
          ].map(({ title, desc }) => (
            <motion.div
              key={title}
              className="bg-[#1e293b] p-6 rounded-xl shadow border border-white/10 hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
              <p className="text-gray-300 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-6 bg-[#0a0f1b] text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to revolutionize how you support learning?
        </h4>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          Join hundreds of schools and psychologists using RAISE-AI to make early detection and intervention simple.
        </p>
        <Link
          to="/signup"
          className="bg-[#089c9c] hover:bg-[#0bc5c5] text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:scale-105 transition"
        >
          Create Your Account
        </Link>
      </motion.section>

      {/* Footer */}
      <footer className="py-5 text-center text-sm text-gray-400 border-t border-white/10 bg-white/5 backdrop-blur-md">
        © 2025 <span className="text-[#089c9c] font-semibold">RAISE-AI</span>. Empowering the future.
      </footer>
    </div>
  );
};

export default LandingPage;