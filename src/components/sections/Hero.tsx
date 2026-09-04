"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { hero } from "@/content/placeholder-data";
import { fadeUp } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { DotBadge } from "@/components/ui/DotBadge";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { Marquee } from "@/components/ui/Marquee";
import { AsciiNameSlot } from "@/components/ui/AsciiNameSlot";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: 0.15 } },
  };

  return (
    <section ref={sectionRef} id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 lg:pl-12 lg:pr-6">
      <CornerFrame className="pointer-events-none absolute inset-6 sm:inset-10" />

      <div className="pointer-events-none absolute left-8 top-24 hidden font-mono text-[10px] uppercase tracking-widest text-accent/60 sm:left-12 sm:block">
        SYS://ONLINE
      </div>
      <div className="pointer-events-none absolute right-8 top-24 hidden font-mono text-[10px] uppercase tracking-widest text-accent-blue/60 sm:right-12 sm:block">
        NET.STATUS::SECURE
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1700px] py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
        >
          <motion.div variants={fadeUp}>
            <DotBadge>{hero.kicker}</DotBadge>
          </motion.div>

          <motion.div variants={fadeUp} className="w-full">
            <h1 className="sr-only">{hero.name}</h1>
            <AsciiNameSlot
              firsts={hero.nameVariants.map((variant) => variant[0])}
              lasts={hero.nameVariants.map((variant) => variant[1])}
              className="h-[180px] w-full sm:h-[220px] md:h-[280px] lg:h-[350px]"
            />
          </motion.div>

          <motion.p variants={fadeUp} className="font-serif text-xl italic text-accent sm:text-2xl">
            {hero.role}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 pt-2 lg:justify-start">
            <Button variant="primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Button>
            <Button variant="primary" href={hero.secondaryCta.href}>
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
            items={[...hero.stack, ...hero.stack, ...hero.stack].map((tech, i) => (
              <span key={`${tech}-${i}`} className="font-mono text-sm tracking-wide text-fg/40">
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
