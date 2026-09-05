"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, projectsPage, type ProjectContentBlock } from "@/content/placeholder-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ParallaxItem } from "@/components/ui/ParallaxItem";
import { ProjectArt } from "@/components/ui/ProjectArt";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { accentClasses } from "@/lib/colors";

function ContentBlock({ block }: { block: ProjectContentBlock }) {
  if (block.type === "heading") {
    return <h4 className="font-mono text-xs uppercase tracking-widest text-fg/50">{block.text}</h4>;
  }
  if (block.type === "paragraph") {
    return <p className="text-sm leading-relaxed text-fg/70">{block.text}</p>;
  }
  if (block.type === "image") {
    return (
      <figure>
        <div className="bg-surface-alt flex h-64 items-center justify-center border border-line p-10">
          <ProjectArt variant={block.art} className="h-full w-full" />
        </div>
        <figcaption className="mt-2 text-center font-mono text-xs text-fg/40">{block.caption}</figcaption>
      </figure>
    );
  }
  if (block.type === "links") {
    return (
      <ul className="flex flex-col gap-2">
        {block.items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:ring-accent focus-visible:ring-offset-bg font-mono text-sm text-fg/70 underline-offset-4 hover:text-accent hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
            >
              {item.label} ↗
            </a>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="border-line shrink-0 overflow-hidden border">
      <div className="bg-surface-alt border-line flex items-center justify-between border-b px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-fg/40">{block.language}</span>
      </div>
      <pre className="bg-surface-alt overflow-x-auto p-4 text-xs leading-relaxed text-fg/80">
        <code className="font-mono">{block.code}</code>
      </pre>
    </div>
  );
}

export function ProjectsSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const openProject = useMemo(() => projects.items.find((p) => p.slug === openSlug) ?? null, [openSlug]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && projects.items.some((p) => p.slug === hash)) setOpenSlug(hash);
  }, []);

  useEffect(() => {
    const url = openSlug ? `#${openSlug}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [openSlug]);

  useEffect(() => {
    if (!openSlug) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenSlug(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openSlug]);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <RevealOnScroll>
        <SectionHeading tag={projectsPage.tag} title={projectsPage.title} subtitle={projectsPage.subtitle} id="projects" />
      </RevealOnScroll>

      <RevealOnScroll variants={staggerContainer()}>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {projects.items.map((project, i) => {
            const c = accentClasses[project.color];
            const total = projects.items.length;
            const remainder = total % 3;
            let colStart = "";
            if (remainder === 2 && i === total - 2) colStart = "lg:col-start-2";
            if (remainder === 1 && i === total - 1) colStart = "lg:col-start-3";
            return (
              <motion.div key={project.slug} variants={fadeUp} className={`lg:col-span-2 ${colStart}`}>
                <Panel interactive onClick={() => setOpenSlug(project.slug)} className="flex h-full flex-col">
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
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="flex items-baseline gap-3">
                        <span className={`h-2 w-2 shrink-0 rounded-full ${c.bg}`} />
                        <p className="font-serif text-2xl">{project.title}</p>
                      </div>
                      <span className="font-mono text-xs text-fg/40">{project.year}</span>
                    </div>
                    <p className="flex-1 pl-5 text-base text-fg/60">{project.blurb}</p>
                    <div className="flex flex-wrap gap-2 pl-5 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border-line !rounded-chip border px-2.5 py-1 font-mono text-[11px] text-fg/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pl-5 pt-2">
                      <span className={`font-mono text-xs underline-offset-4 group-hover:underline ${c.text}`}>
                        More information →
                      </span>
                    </div>
                  </div>
                </Panel>
              </motion.div>
            );
          })}
        </div>
      </RevealOnScroll>

      <AnimatePresence>
        {openProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6">
            <motion.div
              key="project-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-fg/40 backdrop-blur-sm"
              onClick={() => setOpenSlug(null)}
            />
            <motion.div
              key="project-modal"
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              transition={{ type: "spring", stiffness: 340, damping: 32 }}
              className="panel relative flex h-full w-full max-w-4xl flex-col overflow-hidden sm:h-[calc(100vh-3rem)]"
            >
              {(() => {
                const c = accentClasses[openProject.color];
                return (
                  <>
                    <div className="border-line flex items-start justify-between gap-4 border-b p-6 sm:p-8">
                      <div>
                        <span className={`font-mono text-[10px] uppercase tracking-widest ${c.text}`}>
                          {openProject.year}
                        </span>
                        <h3 className="mt-2 font-serif text-2xl leading-snug sm:text-3xl">{openProject.title}</h3>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {openProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="border-line !rounded-chip border px-2.5 py-1 font-mono text-[11px] text-fg/60"
                            >
                              {tag}
                            </span>
                          ))}
                          {"repoUrl" in openProject && openProject.repoUrl && (
                            <a
                              href={openProject.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`focus-visible:ring-accent focus-visible:ring-offset-bg !rounded-chip border border-line px-2.5 py-1 font-mono text-[11px] hover:bg-surface-alt focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none ${c.text}`}
                            >
                              View on GitHub ↗
                            </a>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpenSlug(null)}
                        aria-label="Close"
                        className="focus-visible:ring-accent focus-visible:ring-offset-bg shrink-0 text-fg/50 hover:text-fg focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex flex-col gap-6 overflow-y-auto p-6 sm:p-8">
                      {openProject.content.map((block, i) => (
                        <ContentBlock key={i} block={block} />
                      ))}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
