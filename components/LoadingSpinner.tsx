"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  isFullScreen?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: { spinner: 16, ring: 2 },
  md: { spinner: 24, ring: 2.5 },
  lg: { spinner: 32, ring: 3 },
};

const textSizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

function LoadingSpinner({
  text,
  size = "md",
  isFullScreen = false,
  className,
}: LoadingSpinnerProps) {
  const { spinner, ring } = sizeStyles[size];
  
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        isFullScreen && "min-h-screen p-8 bg-background",
        className,
      )}
    >
      <div className="relative" style={{ width: spinner, height: spinner }}>
        {/* Outer glow */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="absolute inset-0 rounded-full bg-violet-500/20 blur-md"
          style={{ transform: "scale(1.5)" }}
        />
        
        {/* Spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            border: `${ring}px solid transparent`,
            borderTopColor: "rgb(139 92 246)",
            borderRightColor: "rgb(192 132 252)",
          }}
        />
        
        {/* Inner dot */}
        <motion.div
          animate={{ scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div 
            className="rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500"
            style={{ width: spinner * 0.3, height: spinner * 0.3 }}
          />
        </motion.div>
      </div>
      
      {text && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            "text-zinc-400 font-medium tracking-tight",
            textSizeStyles[size],
          )}
        >
          {text}
        </motion.span>
      )}
    </div>
  );
}

export default LoadingSpinner;
