"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef } from "react";

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  particleSize?: number;
}

export function ParticleField({
  className,
  particleCount = 50,
  particleColor = "rgba(255, 255, 255, 0.3)",
  particleSize = 2,
}: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    speed: 0.1 + Math.random() * 0.3,
    size: particleSize * (0.5 + Math.random() * 0.5),
  }));

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          initialX={particle.x}
          initialY={particle.y}
          speed={particle.speed}
          size={particle.size}
          color={particleColor}
        />
      ))}
    </div>
  );
}

interface ParticleProps {
  initialX: number;
  initialY: number;
  speed: number;
  size: number;
  color: string;
}

function Particle({ initialX, initialY, speed, size, color }: ParticleProps) {
  const y = useMotionValue(initialY);

  useAnimationFrame((t) => {
    const newY = (initialY + t * speed * 0.01) % 100;
    y.set(newY);
  });

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${initialX}%`,
        top: y.get(),
        width: size,
        height: size,
        backgroundColor: color,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: Math.random() }}
    />
  );
}
