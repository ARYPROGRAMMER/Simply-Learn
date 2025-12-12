"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedGradientBorderProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
}

export function AnimatedGradientBorder({
  children,
  className,
  containerClassName,
  borderClassName,
}: AnimatedGradientBorderProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      <motion.div
        className={cn(
          "absolute -inset-[1px] rounded-xl bg-linear-to-r from-violet-600 via-pink-600 to-violet-600 opacity-75 blur-sm",
          borderClassName
        )}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />
      <div
        className={cn(
          "relative rounded-xl bg-zinc-900 backdrop-blur-xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
