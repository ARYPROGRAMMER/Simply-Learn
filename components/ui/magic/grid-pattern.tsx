"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GridPatternProps {
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
  strokeDasharray?: string;
}

export function GridPattern({
  width = 40,
  height = 40,
  className,
  maxOpacity = 0.5,
  strokeDasharray = "0",
  ...props
}: GridPatternProps & React.SVGProps<SVGSVGElement>) {
  const id = `grid-pattern-${Math.random().toString(36).substring(7)}`;

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <path
            d={`M${height} 0L0 0 0 ${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill={`url(#${id})`} />
      <motion.rect
        width="100%"
        height="100%"
        strokeWidth="0"
        fill={`url(#${id})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: maxOpacity }}
        transition={{ duration: 2 }}
      />
    </svg>
  );
}
