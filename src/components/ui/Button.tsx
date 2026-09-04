"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { springHover } from "@/lib/motion";

interface ButtonProps {
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function Button({ variant = "primary", href, onClick, children, className = "" }: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "focus-visible:ring-accent focus-visible:ring-offset-bg inline-flex items-center justify-center gap-2 !rounded-chip px-6 py-3 font-mono text-sm tracking-tight transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none";

  const variantClass =
    variant === "primary"
      ? "neon-pulse bg-accent text-white hover:shadow-[0_0_24px_-4px_rgb(var(--color-accent)/0.6)]"
      : "border border-line text-fg hover:bg-surface-alt";

  const motionProps = reduceMotion
    ? {}
    : {
        style: { x: springX, y: springY },
        whileHover: { scale: 1.04 },
        whileTap: { scale: 0.96 },
        transition: springHover,
      };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${base} ${variantClass} ${className}`}
      {...motionProps}
    >
      {children}
    </Component>
  );
}
