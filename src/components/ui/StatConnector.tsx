"use client";

import { motion } from "framer-motion";

interface Stat {
  label: string;
  value: string;
}

export function StatConnector({ stats }: { stats: Stat[] }) {
  return (
    <div className="relative flex flex-col">
      {stats.map((stat, i) => (
        <div key={stat.label} className="relative flex items-center gap-4 py-3">
          <div className="relative flex w-6 shrink-0 justify-center self-stretch">
            <div className="bg-line absolute left-1/2 top-0 h-full w-px" />
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 300, damping: 20 }}
              className="border-accent bg-bg relative z-10 mt-3 h-2.5 w-2.5 rounded-full border-2"
            />
          </div>
          <div className="flex flex-1 items-baseline justify-between gap-4 border-b border-line pb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-fg/50">{stat.label}</span>
            <span className="font-serif text-2xl">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
