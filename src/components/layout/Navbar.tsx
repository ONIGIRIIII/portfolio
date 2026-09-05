"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, sectionLinks } from "@/lib/site-config";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const links = pathname === "/" ? navLinks : [{ label: "Home", href: sectionLinks.home }, ...navLinks];

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass !rounded-none border-x-0 border-t-0" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:grid md:grid-cols-[1fr_auto_1fr]" aria-label="Primary">
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
            className="glass focus-visible:ring-accent focus-visible:ring-offset-bg flex h-9 w-9 items-center justify-center !rounded-chip focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1">
              <span className="bg-fg h-px w-4" />
              <span className="bg-fg h-px w-4" />
            </div>
          </button>
        </div>

        <div className="hidden md:block" />

        <div className="hidden items-center justify-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-visible:ring-accent focus-visible:ring-offset-bg font-mono text-sm text-fg/70 transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
            >
              [{link.label}]
            </a>
          ))}
        </div>

        <div className="flex items-center justify-end">
          <ThemeToggle />
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="glass !rounded-none border-x-0 border-t-0 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="focus-visible:ring-accent focus-visible:ring-offset-bg rounded-md px-2 py-3 font-mono text-sm text-fg/80 hover:text-fg focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
                >
                  [{link.label}]
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
