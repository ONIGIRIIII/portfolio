"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { springHover } from "@/lib/motion";

interface PanelProps {
  href?: string;
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

export function Panel({ href, interactive = false, className = "", children }: PanelProps) {
  const reduceMotion = useReducedMotion();
  const Component = href ? motion.a : motion.div;

  const hoverProps =
    interactive && !reduceMotion
      ? {
          whileHover: { y: -4 },
          transition: springHover,
        }
      : {};

  return (
    <Component
      href={href}
      className={`panel focus-visible:ring-accent focus-visible:ring-offset-bg group block transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none ${interactive ? "hover:border-accent" : ""} ${className}`}
      {...hoverProps}
    >
      {children}
    </Component>
  );
}
