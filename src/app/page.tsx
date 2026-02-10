"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Nama atau password salah");
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      const jabatan = data.user.jabatan.toLowerCase();
      
      if (jabatan === "admin" || jabatan === "keuchik") {
        router.push("/Admin-Dashboard");
      } else {
        router.push("/Admin-Dashboard");
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      style={{ fontFamily: "var(--font-poppins)" }} 
      className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-50 to-teal-50"
    >
      <Navbar />

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Side - Animated Illustration */}
        <motion.div 
          className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-400 relative overflow-hidden" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8 }}
        >
          {/* Floating elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/30 rounded-full"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white/20 rounded-full"
            animate={{
              y: [0, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Main illustration */}
          <motion.img
            src="/login-ilustrasii.png"
            alt="Login Illustration"
            className="max-w-md w-full relative z-10"
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Right Side - Form */}
        <div className="flex flex-1 items-center justify-center p-6">
          <motion.div
            className="w-full max-w-md bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-20 -right-20 w-40 h-40 bg-teal-300/20 rounded-full" 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: 0.4 }} 
            />
            <motion.div 
              className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-400/20 rounded-full" 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: 0.6 }} 
            />

            <motion.div 
              className="text-center mb-8 relative z-10" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.4 }}
            >
              <motion.h1 
                className="text-4xl font-bold text-gray-800" 
                initial={{ y: -20 }} 
                animate={{ y: 0 }} 
                transition={{ delay: 0.5 }}
              >
                Si-Keuchik
              </motion.h1>
              <motion.h2 
                className="text-lg font-semibold text-teal-600 mt-1" 
                initial={{ y: 20 }} 
                animate={{ y: 0 }} 
                transition={{ delay: 0.6 }}
              >
                Masuk Sebagai Admin
              </motion.h2>
            </motion.div>

            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              {/* Nama */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.7 }}
              >
                <label htmlFor="nama" className="text-sm font-medium text-teal-700 mb-1 block">
                  Nama
                </label>
                <div className="flex items-center bg-white/70 border border-gray-300 rounded-lg px-3 transition-all focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200">
                  <FiUser className="text-teal-600" />
                  <input 
                    type="text" 
                    id="nama" 
                    placeholder="Masukkan nama Anda" 
                    className="w-full px-3 py-2.5 bg-transparent focus:outline-none text-gray-700" 
                    value={nama} 
                    onChange={(e) => setNama(e.target.value)} 
                    required 
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.8 }}
              >
                <label htmlFor="password" className="text-sm font-medium text-teal-700 mb-1 block">
                  Password
                </label>
                <div className="flex items-center bg-white/70 border border-gray-300 rounded-lg px-3 transition-all focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200">
                  <FiLock className="text-teal-600" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 bg-transparent focus:outline-none text-gray-700"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="text-gray-500 hover:text-teal-600 transition-colors" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    exit={{ opacity: 0, height: 0 }} 
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-2.5 rounded-lg text-sm border border-red-200">
                      <FiAlertCircle className="flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-lg relative overflow-hidden transition-all"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(20, 184, 166, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                disabled={isSubmitting}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <motion.span 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }} 
                        className="inline-block"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                        </svg>
                      </motion.span>
                      Memproses...
                    </>
                  ) : (
                    "Masuk"
                  )}
                </span>
                {isSubmitting && (
                  <motion.span 
                    className="absolute bottom-0 left-0 h-1 bg-teal-700/40" 
                    initial={{ width: 0 }} 
                    animate={{ width: "100%" }} 
                    transition={{ duration: 1.5 }} 
                  />
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <motion.div 
              className="text-center mt-6 text-xs text-gray-500" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1 }}
            >
              © 2026 Si-Keuchik - Sistem Informasi Keuchikan
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}