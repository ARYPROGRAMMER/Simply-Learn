"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { AuthForm } from "@/components/auth";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6">

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
          <Link href="/" className="inline-flex items-center justify-center">
            <Image
              src="/logo-white.svg"
              alt="Simply Learn"
              width={180}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative bg-black border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50 overflow-hidden"
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
          
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
                className="text-white hover:text-zinc-300 font-semibold transition-colors"
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
