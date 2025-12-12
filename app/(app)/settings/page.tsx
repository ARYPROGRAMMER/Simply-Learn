"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, User, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Header } from "@/components/Header";
import { useAuth } from "@/lib/xano/auth-context";

export default function SettingsPage() {
  const { user, updateProfile, isAuthenticated, isLoading: authLoading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    avatar_url: user?.avatar_url || "",
  });

  // Update form when user loads
  useState(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        avatar_url: user.avatar_url || "",
      });
    }
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center gap-4">
        <p className="text-white">Please sign in to access settings.</p>
        <Button asChild>
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await updateProfile({
        first_name: formData.first_name || undefined,
        last_name: formData.last_name || undefined,
        avatar_url: formData.avatar_url || undefined,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const initials = `${formData.first_name?.[0] || ""}${formData.last_name?.[0] || ""}`.toUpperCase() || user.email[0].toUpperCase();

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <Header />

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-zinc-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-zinc-500/10 rounded-full blur-[80px]" />
      </div>

      <main className="relative z-10 max-w-2xl mx-auto px-4 py-24">
        {/* Back button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
            <p className="text-zinc-400 mt-2">
              Update your profile information and avatar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Section */}
            <div className="p-6 rounded-2xl bg-black border border-white/10">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Profile Picture
              </h2>
              
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 border-2 border-white/20">
                  <AvatarImage src={formData.avatar_url || undefined} alt="Avatar preview" />
                  <AvatarFallback className="bg-zinc-700 text-white text-2xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div>
                    <Label htmlFor="avatar_url" className="text-zinc-300">
                      Avatar URL
                    </Label>
                    <Input
                      id="avatar_url"
                      type="url"
                      placeholder="https://example.com/avatar.jpg"
                      value={formData.avatar_url}
                      onChange={(e) =>
                        setFormData({ ...formData, avatar_url: e.target.value })
                      }
                      className="mt-1.5 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                    <p className="text-xs text-zinc-500 mt-1.5">
                      Enter a URL to an image (JPG, PNG, GIF). You can use services like{" "}
                      <a 
                        href="https://imgur.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white underline"
                      >
                        Imgur
                      </a>{" "}
                      or{" "}
                      <a 
                        href="https://gravatar.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white underline"
                      >
                        Gravatar
                      </a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Info Section */}
            <div className="p-6 rounded-2xl bg-black border border-white/10">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="first_name" className="text-zinc-300">
                    First Name
                  </Label>
                  <Input
                    id="first_name"
                    type="text"
                    placeholder="John"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                    className="mt-1.5 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                </div>

                <div>
                  <Label htmlFor="last_name" className="text-zinc-300">
                    Last Name
                  </Label>
                  <Input
                    id="last_name"
                    type="text"
                    placeholder="Doe"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                    className="mt-1.5 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label className="text-zinc-300">Email</Label>
                <Input
                  type="email"
                  value={user.email}
                  disabled
                  className="mt-1.5 bg-zinc-900/50 border-zinc-800 text-zinc-500 cursor-not-allowed"
                />
                <p className="text-xs text-zinc-500 mt-1.5">
                  Email cannot be changed
                </p>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                Profile updated successfully!
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={saving}
                className="bg-white text-black hover:bg-zinc-200 px-6"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
