"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export function GlassCursor() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    function apply() {
      frame = 0;
      if (!pending) return;
      const { x, y } = pending;
      document.querySelectorAll<HTMLElement>(".glass, .panel").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const mx = ((x - rect.left) / rect.width) * 100;
        const my = ((y - rect.top) / rect.height) * 100;
        el.style.setProperty("--mx", `${mx}%`);
        el.style.setProperty("--my", `${my}%`);
      });
    }

    function onMove(e: PointerEvent) {
      pending = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(apply);
    }

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return null;
}
