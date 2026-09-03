"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion";

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variants?: Variants;
}

export function RevealOnScroll({ children, delay = 0, className = "", variants }: RevealOnScrollProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      custom={delay}
      viewport={{ once: true, margin: "-80px" }}
      variants={variants ?? fadeUp}
    >
      {children}
    </motion.div>
  );
}
