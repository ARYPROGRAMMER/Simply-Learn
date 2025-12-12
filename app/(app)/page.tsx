import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { CourseCard } from "@/components/courses";
import {
  ArrowRight,
  Play,
  Code2,
  Rocket,
  Crown,
  CheckCircle2,
  LayoutDashboard,
} from "lucide-react";
import { getFeaturedCourses, getPlatformStats } from "@/lib/xano/client";
import { getServerUser } from "@/lib/xano/server-auth";

export default async function Home() {
  const [courses, stats, user] = await Promise.all([
    getFeaturedCourses().catch(() => []),
    getPlatformStats().catch(() => ({ course_count: 0, lesson_count: 0 })),
    getServerUser(),
  ]);

  const isSignedIn = !!user;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-white/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-amber-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 lg:px-12 pt-24 pb-32 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
              <span className="block text-white">Learn to code.</span>
              <span className="block text-zinc-600">Build the future.</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-xl mb-10 leading-relaxed">
              Master modern development with structured courses, hands-on projects, and expert guidance.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {isSignedIn ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="btn-shiny bg-white text-black hover:bg-zinc-100 px-8 py-6 text-lg font-semibold rounded-xl shadow-xl shadow-white/10 hover:shadow-white/20 transition-all duration-300"
                  >
                    <LayoutDashboard className="mr-2 w-5 h-5" />
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="btn-shiny bg-white text-black hover:bg-zinc-100 px-8 py-6 text-lg font-semibold rounded-xl shadow-xl shadow-white/10 hover:shadow-white/20 transition-all duration-300"
                  >
                    <Play className="mr-2 w-5 h-5" />
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-16 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">{stats.course_count}+</span>
                <span>Courses</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">{stats.lesson_count}+</span>
                <span>Lessons</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses - Only show if there are courses */}
        {courses.length > 0 && (
          <section id="courses" className="px-6 lg:px-12 py-24 max-w-6xl mx-auto border-t border-white/5">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Courses</h2>
                <p className="text-zinc-500">Start your learning journey</p>
              </div>
              {isSignedIn && (
                <Link
                  href="/dashboard/courses"
                  className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  slug={course.slug}
                  description={course.description}
                  tier={course.tier}
                  image_url={course.image_url}
                  moduleCount={course.module_count || 0}
                  lessonCount={course.lesson_count || 0}
                />
              ))}
            </div>
          </section>
        )}

        {/* Pricing Section */}
        <section className="px-6 lg:px-12 py-24 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Path</h2>
              <p className="text-zinc-400">Start free, upgrade when you're ready</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Free Tier */}
              <div className="group p-6 rounded-2xl bg-black border border-white/10 hover:border-white/20 transition-all duration-300 card-hover">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-white/20 transition-colors">
                  <Code2 className="w-6 h-6 text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold mb-1">Free</h3>
                <p className="text-zinc-500 text-sm mb-6">Get started with basics</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-white/40" />
                    Access to free courses
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-white/40" />
                    Community support
                  </li>
                </ul>
                <Link href="/auth/signup">
                  <Button className="w-full btn-shiny border-white/20 hover:border-white/40 hover:bg-white/5" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Pro Tier */}
              <div className="group p-6 rounded-2xl bg-black border border-white/20 hover:border-white/40 transition-all duration-300 relative card-hover">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-black text-xs font-bold shadow-lg shadow-white/20">
                  ⚡ Popular
                </div>
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-lg shadow-white/10">
                  <Rocket className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-1">Pro</h3>
                <p className="text-zinc-500 text-sm mb-6">For serious learners</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-white/60" />
                    Everything in Free
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-white/60" />
                    Access to Pro courses
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-white/60" />
                    Priority support
                  </li>
                </ul>
                <Link href={isSignedIn ? "/pricing" : "/auth/login?redirect=/pricing"}>
                  <Button className="w-full btn-shiny bg-white text-black hover:bg-zinc-100 font-semibold shadow-lg shadow-white/10 hover:shadow-white/20">
                    Upgrade to Pro
                  </Button>
                </Link>
              </div>

              {/* Ultra Tier */}
              <div className="group p-6 rounded-2xl bg-black border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 card-hover glow-gold">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
                  <Crown className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-1">Ultra</h3>
                <p className="text-zinc-500 text-sm mb-6">The complete experience</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-500/60" />
                    Everything in Pro
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-500/60" />
                    AI Tutor access
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-500/60" />
                    1-on-1 mentorship
                  </li>
                </ul>
                <Link href={isSignedIn ? "/pricing" : "/auth/login?redirect=/pricing"}>
                  <Button className="w-full btn-shiny bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30">
                    Go Ultra
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 lg:px-12 py-8 border-t border-white/5 bg-black/80 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <Image
              src="/logo-white.svg"
              alt="Simply Learn"
              width={120}
              height={20}
              className="h-5 w-auto opacity-50 hover:opacity-70 transition-opacity"
            />
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <span>© {new Date().getFullYear()}</span>
              <Link href="/pricing" className="hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
