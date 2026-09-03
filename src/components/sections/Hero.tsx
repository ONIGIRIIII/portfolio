"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { hero } from "@/content/placeholder-data";
import { fadeUp } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { DotBadge } from "@/components/ui/DotBadge";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { Marquee } from "@/components/ui/Marquee";

const nameWords = hero.name.split(" ");

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: 0.15 } },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section ref={sectionRef} id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_60%_55%_at_50%_42%,rgb(var(--color-bg)/0.85),transparent_70%)]"
      />

      <CornerFrame className="pointer-events-none absolute inset-6 sm:inset-10" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center py-16 text-center">
        <motion.div initial="hidden" animate="visible" variants={container} className="flex flex-col items-center gap-5">
          <motion.div variants={fadeUp}>
            <DotBadge>{hero.kicker}</DotBadge>
          </motion.div>

          <h1 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl">
            {nameWords.map((word, i) => (
              <span key={i} className="mr-3 inline-block overflow-hidden pb-1 align-top last:mr-0">
                <motion.span variants={wordVariant} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p variants={fadeUp} className="font-serif text-xl italic text-accent sm:text-2xl">
            {hero.role}
          </motion.p>

          <motion.p variants={fadeUp} className="max-w-lg text-balance text-fg/70">
            {hero.subhead}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Button>
            <Button variant="secondary" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="mt-16 w-full border-t border-line pt-6"
        >
          <Marquee
            items={hero.stack.map((tech) => (
              <span key={tech} className="font-mono text-sm tracking-wide text-fg/40">
                {tech} <span className="text-fg/20">/</span>
              </span>
            ))}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest text-fg/35">SCROLL</span>
        <motion.svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M7 0v16M1 11l6 6 6-6" stroke="currentColor" strokeWidth="1.3" className="text-fg/35" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
