"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function DotBadge({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <span className="glass !rounded-chip inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] tracking-wide text-fg/80">
      <motion.span
        className="bg-accent h-1 w-1 rounded-full"
        animate={reduceMotion ? undefined : { scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {children}
    </span>
  );
}
