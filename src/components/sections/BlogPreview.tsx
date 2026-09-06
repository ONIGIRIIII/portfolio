"use client";

import { motion } from "framer-motion";
import { blogCategories } from "@/content/placeholder-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CrosshairTag } from "@/components/ui/CrosshairTag";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { accentClasses } from "@/lib/colors";
import { sectionLinks } from "@/lib/site-config";

export function BlogPreview() {
  return (
    <section id="blog" aria-labelledby="blog-heading" className="mx-auto max-w-6xl px-6 py-24">
      <RevealOnScroll>
        <SectionHeading
          tag={blogCategories.tag}
          title={blogCategories.title}
          subtitle={blogCategories.subtitle}
          align="center"
          id="blog"
        />
      </RevealOnScroll>

      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex justify-center">
          <CrosshairTag>{blogCategories.centerLabel}</CrosshairTag>
        </div>

        <RevealOnScroll variants={staggerContainer()}>
          <div className="flex flex-col">
            {blogCategories.items.map((category) => {
              const c = accentClasses[category.color];
              return (
                <motion.div key={category.label} variants={fadeUp} className="relative flex gap-5 pb-6">
                  <div className="relative flex w-6 shrink-0 items-center justify-center self-stretch">
                    <div className="bg-line absolute left-1/2 top-0 h-full w-px" />
                    <span className={`border-bg relative z-10 h-2.5 w-2.5 rounded-full border-2 ${c.bg}`} />
                  </div>
                  <Panel href={category.href} interactive className="flex min-h-[160px] flex-1 flex-col justify-center gap-2 p-7">
                    <p className="font-serif text-2xl">{category.label}</p>
                    <p className="text-base text-fg/60">{category.blurb}</p>
                  </Panel>
                </motion.div>
              );
            })}
          </div>
        </RevealOnScroll>

        <div className="mt-2 flex justify-center">
          <a
            href={sectionLinks.blog}
            className="focus-visible:ring-accent focus-visible:ring-offset-bg font-mono text-sm text-fg/60 underline-offset-4 hover:text-fg hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
          >
            Read the full blog ↗
          </a>
        </div>
      </div>
    </section>
  );
}
