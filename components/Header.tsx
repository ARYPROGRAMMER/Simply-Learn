"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  BookOpen,
  Menu,
  GraduationCap,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/xano/auth-context";
import { UserButton } from "@/components/auth";
import { motion } from "framer-motion";

export function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAuth();

  const isTeacher = user?.role === "teacher";

  const loggedInLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
    ...(isTeacher
      ? [{ href: "/teacher", label: "Teach", icon: GraduationCap }]
      : []),
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src="/logo-white.svg"
                alt="Simply Learn"
                width={140}
                height={24}
                className="h-6 w-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation - Centered */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2 bg-zinc-900 px-1.5 py-1 rounded-lg border border-white/5">
              {loggedInLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                      pathname === link.href
                        ? "text-white bg-white/10"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <link.icon className="w-3.5 h-3.5" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
            ) : isAuthenticated ? (
              <UserButton />
            ) : (
              <Link href="/auth/login">
                <Button
                  size="sm"
                  className="bg-white text-black hover:bg-zinc-200 font-medium px-4 h-8 text-sm"
                >
                  <LogIn className="w-3.5 h-3.5 mr-1.5" />
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu - Only for authenticated users */}
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-white hover:bg-white/5 h-8 w-8"
                  >
                    <Menu className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-zinc-900 border-white/10"
                >
                  {loggedInLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-zinc-300 hover:text-white text-sm"
                      >
                        <link.icon className="w-3.5 h-3.5" />
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
