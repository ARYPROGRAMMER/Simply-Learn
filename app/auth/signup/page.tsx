"use client";

import Link from "next/link";
import { Code2, ArrowLeft } from "lucide-react";
import { AuthForm } from "@/components/auth";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center p-4 sm:p-6">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-violet-600/25 rounded-full blur-[180px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-[30%] right-[15%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]"
        />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Back to home */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-linear-to-r from-violet-600 to-fuchsia-600 rounded-xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-linear-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-2.5 rounded-xl shadow-lg shadow-violet-500/30">
                <Code2 className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            <span className="text-2xl font-bold text-gradient">
              Simply Learn
            </span>
          </Link>
        </div>

        {/* Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative bg-zinc-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/40"
        >
          {/* Gradient border glow */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-violet-600/10 via-fuchsia-600/10 to-violet-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="relative">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black mb-2">Create your account</h1>
              <p className="text-zinc-400">
                Start your coding journey today
              </p>
            </div>

            <AuthForm mode="signup" redirectTo="/dashboard" />

            <div className="mt-8 text-center text-sm">
              <span className="text-zinc-400">Already have an account?</span>{" "}
              <Link
                href="/auth/login"
                className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
