"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function GlassCard({
  children,
  className,
  containerClassName,
}: GlassCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(120, 119, 198, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
