"use client";

import { motion } from "framer-motion";
import { projects } from "@/content/placeholder-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ParallaxItem } from "@/components/ui/ParallaxItem";
import { ProjectArt } from "@/components/ui/ProjectArt";
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
          {projects.items.slice(0, 3).map((project) => (
            <motion.div key={project.title} variants={fadeUp}>
              <Panel href={project.href} interactive className="flex h-full flex-col">
                <div className="p-4">
                  <div className="h-40 overflow-hidden">
                    <ParallaxItem strength={12}>
                      <div className="bg-surface-alt flex h-40 items-center justify-center p-7">
                        <ProjectArt variant={project.art} className="h-full w-full" />
                      </div>
                    </ParallaxItem>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 border-t border-line p-7">
                  <p className="font-serif text-2xl">{project.title}</p>
                  <p className="flex-1 text-base text-fg/60">{project.blurb}</p>
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
