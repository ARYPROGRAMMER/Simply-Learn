"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function HomeClient({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// Animation wrapper components
export function FadeInUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GlowOrb({
  color = "violet",
  size = 700,
  blur = 150,
  className = "",
}: {
  color?: "violet" | "fuchsia" | "cyan" | "amber";
  size?: number;
  blur?: number;
  className?: string;
}) {
  const colorMap = {
    violet: "rgba(139, 92, 246, 0.25)",
    fuchsia: "rgba(217, 70, 239, 0.2)",
    cyan: "rgba(6, 182, 212, 0.15)",
    amber: "rgba(251, 191, 36, 0.15)",
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

export function FloatingCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
}

export function PricingCard({
  children,
  featured = false,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  featured?: boolean;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -8,
        scale: featured ? 1.02 : 1.01,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
}

export function TestimonialCard({
  children,
  className = "",
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <GlowOrb
        color="violet"
        size={800}
        blur={180}
        className="top-[-20%] left-[-10%]"
      />
      <GlowOrb
        color="fuchsia"
        size={600}
        blur={150}
        className="bottom-[-10%] right-[-10%]"
      />
      <GlowOrb
        color="cyan"
        size={500}
        blur={120}
        className="top-[30%] right-[15%]"
      />
      <GlowOrb
        color="violet"
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
