import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const particles = Array.from({ length: 20 }); // 🌟 more particles for animation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://os-project-server.vercel.app/auth/existinguser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await res.json();
      const token = data.token;

      if (!token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("token", token);

      let decoded;
      try {
        decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
      } catch (err) {
        throw new Error("Invalid token format");
      }

      navigate("/dashboard", { state: { user: decoded } });
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
      {/* 🔥 Animated Background Glow */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.08) 0%, transparent 25%), radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.08) 0%, transparent 25%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 25%)",
          backgroundSize: "200% 200%",
          zIndex: 0,
        }}
      />

      {/* 🌟 Floating Particles */}
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
          animate={{
            y: [null, -150],
            opacity: [null, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
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

      {/* 💎 Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 z-10"
      >
        <h2 className="text-3xl font-bold text-cyan-400 text-center mb-6 drop-shadow-lg">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-cyan-300 font-medium mb-1">
              Username
            </label>
            <div className="flex items-center bg-black/30 rounded-lg px-3 border border-transparent focus-within:border-cyan-400 transition">
              <FaUser className="text-cyan-300 opacity-80 mr-2" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full bg-transparent text-white placeholder-gray-400 py-2 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-pink-300 font-medium mb-1">
              Password
            </label>
            <div className="flex items-center bg-black/30 rounded-lg px-3 border border-transparent focus-within:border-pink-400 transition">
              <FaLock className="text-pink-300 opacity-80 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent text-white placeholder-gray-400 py-2 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Links */}
          <div className="flex justify-between text-sm text-gray-300">
            <Link to="/change-password" className="hover:text-cyan-400 transition">
              Forgot password?
            </Link>
            <Link to="/register" className="hover:text-pink-400 transition">
              Don’t have an account? Register now!
            </Link>
          </div>

          {/* Sign In Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(34,211,238,0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-2 rounded-lg shadow-lg font-semibold transition-all"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
