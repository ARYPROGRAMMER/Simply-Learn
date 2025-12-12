import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { Plus, BookOpen, Video, BarChart3, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, getTeacherCourses } from "@/lib/xano/client";

export default async function TeacherDashboardPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("xano_auth_token")?.value;

  if (!authToken) {
    redirect("/auth/login");
  }

  let user;
  let courses: Awaited<ReturnType<typeof getTeacherCourses>> = [];

  try {
    user = await getCurrentUser(authToken);
    
    // Check if user is a teacher
    if (user.role !== "teacher" && user.role !== "admin") {
      redirect("/dashboard");
    }

    courses = await getTeacherCourses(authToken);
  } catch (error) {
    redirect("/auth/login");
  }

  const totalLessons = courses.reduce((sum, course) => sum + (course.lesson_count || 0), 0);
  const totalModules = courses.reduce((sum, course) => sum + (course.module_count || 0), 0);

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-violet-400" />
              <span className="text-sm text-violet-400 font-medium">Teacher Portal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user.first_name || "Teacher"}!</h1>
            <p className="text-zinc-400">
              Manage your courses, modules, and lessons
            </p>
          </div>
          <Link href="/teacher/courses/new">
            <Button className="mt-4 md:mt-0 bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:scale-105">
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-700/50 backdrop-blur-sm hover:border-violet-500/30 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-violet-400" />
              </div>
              <div>
                <p className="text-3xl font-bold">{courses.length}</p>
                <p className="text-zinc-400 text-sm">Total Courses</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-700/50 backdrop-blur-sm hover:border-amber-500/30 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <p className="text-3xl font-bold">{totalLessons}</p>
                <p className="text-zinc-400 text-sm">Total Lessons</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <p className="text-3xl font-bold">{totalModules}</p>
                <p className="text-zinc-400 text-sm">Total Modules</p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="bg-zinc-900/60 border border-zinc-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="p-6 border-b border-zinc-700/50 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Courses</h2>
            <span className="text-sm text-zinc-500">{courses.length} courses</span>
          </div>

          {courses.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-20 h-20 rounded-2xl bg-zinc-800/60 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-zinc-500" />
              </div>
              <h3 className="text-xl font-medium text-zinc-300 mb-2">No courses yet</h3>
              <p className="text-zinc-500 mb-6 max-w-sm mx-auto">Create your first course to start sharing your knowledge with students</p>
              <Link href="/teacher/courses/new">
                <Button className="bg-violet-600 hover:bg-violet-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Course
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-zinc-700/50">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/teacher/courses/${course.id}`}
                  className="flex items-center justify-between p-5 hover:bg-zinc-800/40 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-zinc-800 flex items-center justify-center overflow-hidden ring-1 ring-zinc-700/50 group-hover:ring-violet-500/30 transition-all">
                      {course.image_url ? (
                        <img
                          src={course.image_url}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <BookOpen className="w-6 h-6 text-zinc-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-white group-hover:text-violet-300 transition-colors">{course.title}</h3>
                      <p className="text-sm text-zinc-500 mt-1">
                        {course.module_count || 0} modules • {course.lesson_count || 0} lessons
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        course.tier === "free"
                          ? "bg-zinc-800 text-zinc-300"
                          : course.tier === "pro"
                          ? "bg-violet-500/20 text-violet-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {course.tier?.toUpperCase() || "FREE"}
                    </span>
                    {course.featured && (
                      <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                        Featured
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
