import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Play, Tag, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TIER_STYLES } from "@/lib/constants";
import type { Tier, Category } from "@/lib/xano/types";

interface CourseHeroProps {
  title?: string | null;
  description?: string | null;
  tier?: Tier | null;
  thumbnail?: { asset?: { _id?: string; url?: string } | null } | null;
  category?: { _id?: string; title?: string | null } | null;
  moduleCount?: number | null;
  lessonCount?: number | null;
}

export function CourseHero({
  title,
  description,
  tier,
  thumbnail,
  category,
  moduleCount,
  lessonCount,
}: CourseHeroProps) {
  const displayTier = tier ?? "free";
  const styles = TIER_STYLES[displayTier];
  const imageUrl = thumbnail?.asset?.url;

  return (
    <div className="mb-12">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to dashboard
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Thumbnail */}
        <div
          className={`relative w-full lg:w-96 h-56 lg:h-60 rounded-2xl bg-linear-to-br ${styles.gradient} flex items-center justify-center overflow-hidden shrink-0 shadow-2xl shadow-zinc-500/10`}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title ?? "Course thumbnail"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="text-7xl opacity-50">📚</div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </div>

        {/* Course Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className={`${styles.text} ${styles.border} bg-transparent font-semibold px-3 py-1`}>
              {typeof displayTier === 'string' ? displayTier.toUpperCase() : "FREE"}
            </Badge>
            {category?.title && typeof category.title === 'string' && (
              <Badge
                variant="outline"
                className="border-zinc-700 text-zinc-400 px-3 py-1"
              >
                <Tag className="w-3 h-3 mr-1.5" />
                {category.title}
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-white leading-tight">
            {typeof title === 'string' ? title : "Untitled Course"}
          </h1>

          {description && typeof description === 'string' && (
            <p className="text-lg text-zinc-400 mb-8 leading-relaxed max-w-2xl">
              {description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/60 border border-zinc-700/50">
              <BookOpen className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-300">{moduleCount ?? 0} modules</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/60 border border-zinc-700/50">
              <Play className="w-4 h-4 text-emerald-400" />
              <span className="text-zinc-300">{lessonCount ?? 0} lessons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

