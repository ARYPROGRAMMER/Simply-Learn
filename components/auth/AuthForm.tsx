"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/lib/xano/auth-context";
import { Loader2, GraduationCap, BookOpen, Mail, Lock, User } from "lucide-react";
import { motion } from "framer-motion";

interface AuthFormProps {
  mode: "login" | "signup";
  onSuccess?: () => void;
  redirectTo?: string;
}

export function AuthForm({ mode, onSuccess, redirectTo = "/dashboard" }: AuthFormProps) {
  const { login, signup } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "student" as "student" | "teacher",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (mode === "login") {
        await login(formData.email, formData.password);
      } else {
        await signup(
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName,
          formData.role
        );
      }

      // Set cookie for server-side auth
      document.cookie = `xano_auth_token=${localStorage.getItem("xano_auth_token")}; path=/; max-age=${60 * 60 * 24 * 7}`;

      onSuccess?.();
      
      // Redirect teachers to teacher dashboard
      const redirectPath = formData.role === "teacher" && mode === "signup" ? "/teacher" : redirectTo;
      router.push(redirectPath);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm backdrop-blur-sm"
        >
          {error}
        </motion.div>
      )}

      {mode === "signup" && (
        <>
          {/* Role Selection */}
          <div className="space-y-3">
            <Label className="text-zinc-200 font-medium">I want to...</Label>
            <RadioGroup
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value as "student" | "teacher" })
              }
              className="grid grid-cols-2 gap-4"
            >
              <motion.label
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.role === "student"
                    ? "border-violet-500/50 bg-violet-500/10 ring-1 ring-violet-500/30"
                    : "border-white/10 hover:border-white/20 bg-white/5"
                }`}
              >
                <RadioGroupItem value="student" id="student" className="sr-only" />
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData.role === "student" ? "bg-violet-500/20" : "bg-white/5"}`}>
                  <BookOpen className={`w-5 h-5 ${formData.role === "student" ? "text-violet-400" : "text-zinc-400"}`} />
                </div>
                <div>
                  <p className={`font-medium ${formData.role === "student" ? "text-white" : "text-zinc-300"}`}>
                    Learn
                  </p>
                  <p className={`text-xs ${formData.role === "student" ? "text-violet-300/70" : "text-zinc-500"}`}>Take courses</p>
                </div>
              </motion.label>
              <motion.label
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.role === "teacher"
                    ? "border-amber-500/50 bg-amber-500/10 ring-1 ring-amber-500/30"
                    : "border-white/10 hover:border-white/20 bg-white/5"
                }`}
              >
                <RadioGroupItem value="teacher" id="teacher" className="sr-only" />
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData.role === "teacher" ? "bg-amber-500/20" : "bg-white/5"}`}>
                  <GraduationCap className={`w-5 h-5 ${formData.role === "teacher" ? "text-amber-400" : "text-zinc-400"}`} />
                </div>
                <div>
                  <p className={`font-medium ${formData.role === "teacher" ? "text-white" : "text-zinc-300"}`}>
                    Teach
                  </p>
                  <p className={`text-xs ${formData.role === "teacher" ? "text-amber-300/70" : "text-zinc-500"}`}>Create courses</p>
                </div>
              </motion.label>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-zinc-300 font-medium text-sm">
                First Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl h-12"
                  placeholder="John"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-zinc-300 font-medium text-sm">
                Last Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl h-12"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-zinc-300 font-medium text-sm">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl h-12"
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-zinc-300 font-medium text-sm">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl h-12"
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Button
          type="submit"
          className="w-full h-12 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 transition-all"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {mode === "login" ? "Signing in..." : "Creating account..."}
            </>
          ) : mode === "login" ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}
