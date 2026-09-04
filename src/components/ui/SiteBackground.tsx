"use client";

import { useEffect, useRef } from "react";
import { AsciiField } from "./AsciiField";

export function SiteBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      const el = ref.current;
      if (!el) return;
      const t = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight * 0.85)));
      el.style.opacity = String(t);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="fixed inset-0 -z-10">
      <AsciiField className="h-full w-full" cell={20} intensity={0.85} />
    </div>
  );
}
