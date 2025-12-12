"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
}

export function GradientText({
  children,
  className,
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: `${colors.length * 100}% 100%`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <motion.span
      className={cn(
        "animate-gradient bg-clip-text text-transparent",
        className
      )}
      style={gradientStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.span>
  );
}
