"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SECTIONS = ["about", "skills", "certifications", "projects", "blog"];

export function SectionDots() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));

    const hero = document.getElementById("top");
    function onScroll() {
      setVisible(hero ? window.scrollY > hero.getBoundingClientRect().height * 0.6 : window.scrollY > 200);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      className={`fixed left-16 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 transition-opacity duration-500 lg:flex ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {SECTIONS.map((id, i) => {
        const active = activeId === id;
        return (
          <button
            key={id}
            onClick={() => goTo(id)}
            aria-label={`Go to section ${i + 1}`}
            aria-current={active}
            className="focus-visible:ring-accent focus-visible:ring-offset-bg flex h-9 w-9 items-center justify-center focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
          >
            <motion.span
              className={`flex items-center justify-center overflow-hidden rounded-full transition-colors duration-200 ${
                active ? "bg-accent" : "bg-fg/30"
              }`}
              animate={{ width: active ? 36 : 12, height: active ? 36 : 12 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
            >
              <AnimatePresence>
                {active && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, delay: 0.1 }}
                    className="font-mono text-sm text-white"
                  >
                    {i + 1}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}
