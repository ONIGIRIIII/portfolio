"use client";

import { motion } from "framer-motion";
import { skills } from "@/content/placeholder-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { DotMatrixBadge } from "@/components/ui/DotMatrixBadge";
import { skillIcons } from "@/components/ui/SkillIcons";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function SkillsGrid() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="mx-auto max-w-6xl px-6 py-24">
      <RevealOnScroll>
        <SectionHeading tag={skills.tag} title={skills.title} subtitle={skills.subtitle} id="skills" />
      </RevealOnScroll>

      <RevealOnScroll variants={staggerContainer()}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.items.map((skill) => {
            const Icon = skillIcons[skill.icon];
            return (
              <motion.div key={skill.title} variants={fadeUp}>
                <Panel interactive className="h-full p-6">
                  <DotMatrixBadge color={skill.color} icon={<Icon />} />
                  <p className="mt-4 font-serif text-lg">{skill.title}</p>
                  <p className="mt-1 text-sm text-fg/60">{skill.blurb}</p>
                </Panel>
              </motion.div>
            );
          })}
        </div>
      </RevealOnScroll>
    </section>
  );
}
