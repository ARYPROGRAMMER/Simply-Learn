"use client";

import { motion } from "framer-motion";

// Glow orb background element
export function GlowOrb({
  color = "gray",
  size = 700,
  blur = 150,
  className = "",
}: {
  color?: "gray" | "white" | "zinc" | "amber";
  size?: number;
  blur?: number;
  className?: string;
}) {
  const colorMap = {
    gray: "rgba(161, 161, 170, 0.1)",
    white: "rgba(255, 255, 255, 0.08)",
    zinc: "rgba(113, 113, 122, 0.12)",
    amber: "rgba(251, 191, 36, 0.1)",
  };

  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: colorMap[color],
        filter: `blur(${blur}px)`,
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );
}

// Animated background with glow orbs
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <GlowOrb
        color="white"
        size={800}
        blur={180}
        className="top-[-20%] left-[-10%]"
      />
      <GlowOrb
        color="gray"
        size={600}
        blur={150}
        className="bottom-[-10%] right-[-10%]"
      />
      <GlowOrb
        color="zinc"
        size={500}
        blur={120}
        className="top-[30%] right-[15%]"
      />
      <GlowOrb
        color="white"
        size={350}
        blur={100}
        className="bottom-[30%] left-[10%]"
      />
      
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
