"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, ArrowRight, Trophy, Target, Zap } from "lucide-react";
import { Header } from "@/components/Header";
import { CourseList } from "@/components/courses";
import { AnimatedBackground } from "../home-client";

import type { Course } from "@/lib/xano/types";

interface DashboardClientProps {
  firstName: string;
  userTier: string;
  transformedCourses: Course[];
  userId: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function DashboardClient({
  firstName,
  userTier,
  transformedCourses,
  userId,
}: DashboardClientProps) {
  return (
    <div className="min-h-screen bg-background text-white overflow-hidden">
      <AnimatedBackground />

      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-12 py-12 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"
            />
            <span className="text-sm text-zinc-400">Good to see you!</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            Welcome back, <span className="text-gradient">{firstName}</span>! 👋
          </h1>
          <p className="text-lg text-zinc-400">
            Continue your learning journey or explore new courses
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-5 mb-14"
        >
          <motion.div variants={itemVariants}>
            <Link
              href="/dashboard/courses"
              className="group block h-full p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-500/20 hover:border-zinc-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="w-14 h-14 rounded-2xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30"
                >
                  <BookOpen className="w-6 h-6 text-white" />
                </motion.div>
                <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-white group-hover:text-gradient transition-all">
                Browse Courses
              </h3>
              <p className="text-zinc-400 text-sm">
                Explore our full catalog of courses
              </p>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href="/dashboard/courses"
              className="group block h-full p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-500/20 hover:border-zinc-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  whileHover={{ rotate: -5, scale: 1.05 }}
                  className="w-14 h-14 rounded-2xl bg-linear-to-br from-zinc-600 to-zinc-700 flex items-center justify-center shadow-lg shadow-zinc-500/30"
                >
                  <Target className="w-6 h-6 text-white" />
                </motion.div>
                <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-white group-hover:text-zinc-300 transition-all">
                Track Progress
              </h3>
              <p className="text-zinc-400 text-sm">See how far you&apos;ve come</p>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            {userTier !== "ultra" ? (
              <Link
                href="/pricing"
                className="group block h-full p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    className="w-14 h-14 rounded-2xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30"
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                  <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-1 text-white group-hover:text-amber-400 transition-all">
                  Upgrade to Ultra
                </h3>
                <p className="text-zinc-400 text-sm">
                  Get AI Tutor and exclusive content
                </p>
              </Link>
            ) : (
              <div className="h-full p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-emerald-500/20">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                    className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                  >
                    <Trophy className="w-6 h-6 text-white" />
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400"
                  >
                    ACTIVE
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold mb-1 text-white">Ultra Member</h3>
                <p className="text-zinc-400 text-sm">
                  You have full access to everything
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Your Courses</h2>
              <p className="text-zinc-400 mt-1">Pick up where you left off</p>
            </div>
            <Link
              href="/dashboard/courses"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/5 text-zinc-300 hover:text-white hover:border-zinc-500/30 text-sm font-medium transition-all hover:-translate-y-0.5"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <CourseList
            courses={transformedCourses}
          />
        </motion.div>
      </main>
    </div>
  );
}
