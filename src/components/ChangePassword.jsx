import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const particles = Array.from({ length: 15 });
  const API_BASE = "https://os-project-server.vercel.app";

  const handleSendOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
      setMessage(res.data.message || "OTP sent to your email");
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to send OTP");
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_BASE}/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });
      setMessage(res.data.message || "Password reset successfully");
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      {/* Background Glow Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.05) 0%, transparent 20%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Floating Particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.2 + Math.random() * 0.5,
            scale: 0.5 + Math.random(),
          }}
          animate={{ y: [null, -100], opacity: [null, 0] }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Forgot Password Card */}
      <motion.div
        className="bg-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-md w-96 z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>

        {message && (
          <div className="mb-4 p-3 text-sm text-white bg-indigo-500 rounded-lg text-center">
            {message}
          </div>
        )}

        {step === 1 && (
          <>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </motion.button>
          </>
        )}

        {step === 2 && (
          <>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 mb-6 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold shadow-lg"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </motion.button>
          </>
        )}

        <p className="text-gray-300 text-sm text-center mt-4">
          <button
            className="text-purple-400 hover:underline"
            onClick={() => navigate("/")}
          >
            ← Back to Login
          </button>
        </p>
      </motion.div>
    </div>
  );
}
