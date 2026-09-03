"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { blogCategories, blogPosts, type BlogPostCategory } from "@/content/placeholder-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { accentClasses } from "@/lib/colors";

type Filter = "all" | BlogPostCategory;

const categoryMeta = Object.fromEntries(
  blogCategories.items.map((item) => [item.key, { label: item.label, color: item.color }])
) as Record<BlogPostCategory, { label: string; color: (typeof blogCategories.items)[number]["color"] }>;

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const posts = useMemo(() => {
    const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
    return filter === "all" ? sorted : sorted.filter((post) => post.category === filter);
  }, [filter]);

  return (
    <section id="blog" aria-labelledby="blog-heading" className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <RevealOnScroll>
        <SectionHeading tag={blogCategories.tag} title={blogCategories.title} subtitle={blogCategories.subtitle} id="blog" />
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr]">
        <div className="flex flex-col gap-1 md:border-r md:border-line md:pr-6">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-fg/40">Categories</p>

          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`focus-visible:ring-accent focus-visible:ring-offset-bg flex items-center gap-3 px-2 py-2.5 text-left transition-colors hover:bg-surface-alt focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none ${filter === "all" ? "bg-surface-alt" : ""}`}
          >
            <span className="bg-fg h-2 w-2 shrink-0 rounded-full" />
            <span className="font-serif text-sm text-fg/80">All</span>
          </button>

          {blogCategories.items.map((cat) => {
            const c = accentClasses[cat.color];
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setFilter(cat.key)}
                className={`focus-visible:ring-accent focus-visible:ring-offset-bg flex items-center gap-3 px-2 py-2.5 text-left transition-colors hover:bg-surface-alt focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none ${filter === cat.key ? "bg-surface-alt" : ""}`}
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${c.bg}`} />
                <span className="font-serif text-sm text-fg/80">{cat.label}</span>
              </button>
            );
          })}
        </div>

        <RevealOnScroll key={filter} variants={staggerContainer()}>
          <div className="flex flex-col gap-4">
            {posts.map((post) => {
              const meta = categoryMeta[post.category];
              const c = accentClasses[meta.color];
              const isOpen = openSlug === post.slug;

              return (
                <motion.article key={post.slug} variants={fadeUp} className="panel p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div className="flex items-baseline gap-3">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${c.bg}`} />
                      <p className="font-serif text-lg">{post.title}</p>
                    </div>
                    <span className="font-mono text-xs text-fg/40">{formatDate(post.date)}</span>
                  </div>

                  <p className="mt-2 pl-5 text-sm text-fg/60">{post.excerpt}</p>

                  <div className="mt-4 flex items-center justify-between pl-5">
                    <span className={`font-mono text-[10px] uppercase tracking-widest ${c.text}`}>{meta.label}</span>
                    <button
                      type="button"
                      onClick={() => setOpenSlug(isOpen ? null : post.slug)}
                      aria-expanded={isOpen}
                      className="focus-visible:ring-accent focus-visible:ring-offset-bg font-mono text-xs text-fg/70 underline-offset-4 hover:text-fg hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
                    >
                      {isOpen ? "Read less ↑" : "Read more ↓"}
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-line mt-4 flex flex-col gap-3 border-t pl-5 pt-4 text-sm text-fg/70">
                          {post.content.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
