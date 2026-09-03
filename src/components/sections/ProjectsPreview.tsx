"use client";

import { motion } from "framer-motion";
import { projects } from "@/content/placeholder-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ParallaxItem } from "@/components/ui/ParallaxItem";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function ProjectsPreview() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="mx-auto max-w-6xl px-6 py-24">
      <RevealOnScroll>
        <SectionHeading
          tag={projects.tag}
          title={projects.title}
          subtitle={projects.subtitle}
          action={projects.cta}
          id="projects"
        />
      </RevealOnScroll>

      <RevealOnScroll variants={staggerContainer()}>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((project) => (
            <motion.div key={project.title} variants={fadeUp}>
              <Panel href={project.href} interactive className="flex h-full flex-col">
                <div className="p-4">
                  <CornerFrame className="h-40 overflow-hidden">
                    <ParallaxItem strength={16} className="h-full">
                      <div className="blueprint-grid flex h-56 items-center justify-center opacity-60">
                        <span className="font-mono text-xs tracking-widest text-fg/40">IMG</span>
                      </div>
                    </ParallaxItem>
                  </CornerFrame>
                </div>
                <div className="flex flex-1 flex-col gap-3 border-t border-line p-6">
                  <p className="font-serif text-xl">{project.title}</p>
                  <p className="flex-1 text-sm text-fg/60">{project.blurb}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border-line !rounded-chip border px-2.5 py-1 font-mono text-[11px] text-fg/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Panel>
            </motion.div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
