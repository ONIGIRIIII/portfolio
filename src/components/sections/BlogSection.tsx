"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { blogCategories, blogPosts, type BlogContentBlock, type BlogPostCategory } from "@/content/placeholder-data";
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

function ContentBlock({ block }: { block: BlogContentBlock }) {
  if (block.type === "paragraph") {
    return <p className="text-sm leading-relaxed text-fg/70">{block.text}</p>;
  }
  if (block.type === "image") {
    return (
      <figure>
        <div className="blueprint-grid flex h-64 items-center justify-center border border-line opacity-70">
          <span className="font-mono text-xs tracking-widest text-fg/40">IMG</span>
        </div>
        <figcaption className="mt-2 text-center font-mono text-xs text-fg/40">{block.caption}</figcaption>
      </figure>
    );
  }
  return (
    <div className="border-line overflow-hidden border">
      <div className="bg-surface-alt border-line flex items-center justify-between border-b px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-fg/40">{block.language}</span>
      </div>
      <pre className="bg-surface-alt overflow-x-auto p-4 text-xs leading-relaxed text-fg/80">
        <code className="font-mono">{block.code}</code>
      </pre>
    </div>
  );
}

export function BlogSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const posts = useMemo(() => {
    const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
    return filter === "all" ? sorted : sorted.filter((post) => post.category === filter);
  }, [filter]);

  const openPost = useMemo(() => blogPosts.find((post) => post.slug === openSlug) ?? null, [openSlug]);

  useEffect(() => {
    if (!openSlug) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenSlug(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openSlug]);

  return (
    <section id="blog" aria-labelledby="blog-heading" className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <RevealOnScroll>
        <SectionHeading tag={blogCategories.tag} title={blogCategories.title} subtitle={blogCategories.subtitle} id="blog" />
      </RevealOnScroll>

      {blogPosts.length === 0 ? (
        <RevealOnScroll>
          <div className="panel flex flex-col items-center gap-3 px-8 py-20 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-fg/40">status://empty</span>
            <p className="font-serif text-2xl">First post coming soon.</p>
            <p className="max-w-sm text-sm text-fg/60">
              Nothing published yet. Check back soon for write-ups on projects, coursework, and co-op lessons.
            </p>
          </div>
        </RevealOnScroll>
      ) : (
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
                      onClick={() => setOpenSlug(post.slug)}
                      className="focus-visible:ring-accent focus-visible:ring-offset-bg font-mono text-xs text-fg/70 underline-offset-4 hover:text-fg hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
                    >
                      Click to read more →
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
      )}

      <AnimatePresence>
        {openPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6">
            <motion.div
              key="blog-post-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-fg/40 backdrop-blur-sm"
              onClick={() => setOpenSlug(null)}
            />
            <motion.div
              key="blog-post-modal"
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              transition={{ type: "spring", stiffness: 340, damping: 32 }}
              className="panel relative flex h-full w-full max-w-4xl flex-col overflow-hidden sm:h-[calc(100vh-3rem)]"
            >
              {(() => {
                const meta = categoryMeta[openPost.category];
                const c = accentClasses[meta.color];
                return (
                  <>
                    <div className="border-line flex items-start justify-between gap-4 border-b p-6 sm:p-8">
                      <div>
                        <span className={`font-mono text-[10px] uppercase tracking-widest ${c.text}`}>{meta.label}</span>
                        <h3 className="mt-2 font-serif text-2xl leading-snug sm:text-3xl">{openPost.title}</h3>
                        <p className="mt-2 font-mono text-xs text-fg/40">{formatDate(openPost.date)}</p>
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
                      {openPost.content.map((block, i) => (
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
