# Harshpreet Singh Portfolio

Personal portfolio site for Harshpreet Singh (Data & Business Analyst, UBC Math student, Apera AI co-op). Built with Next.js App Router, styled around a monospace editorial look with a red/orange accent system, an interactive ASCII-art canvas background, and an animated ASCII rendering of the site owner's name in the hero.

Live repo: https://github.com/ONIGIRIIII/portfolio

## Stack

- **Next.js 16** (App Router, TypeScript, `src/` dir)
- **Tailwind CSS v4** — CSS-first config via `@theme`/`@custom-variant` in `src/app/globals.css`, no `tailwind.config.ts`
- **Framer Motion** for animation
- **next-themes** for light/dark mode (`class` strategy)

```bash
npm run dev      # start dev server (falls back to next free port if 3000 is taken)
npx tsc --noEmit # type-check
```

> `AGENTS.md` at the repo root is auto-written by `next dev` (see `node_modules/next/dist/server/lib/generate-agent-files.js`) — don't hand-edit it, it regenerates.

## Site structure

- `/` (`src/app/page.tsx`) — Hero → About → Skills → Certifications → Projects → Blog preview, all as scroll sections on one page. `SectionDots` (fixed left rail, homepage-only, `IntersectionObserver`-driven) shows scroll position across About/Skills/Certifications/Projects/Blog. `BackgroundHint` (fixed top-right, homepage-only) fades in once scrolled past the hero, nudging visitors to hover/click the interactive background.
- `/blog` (`src/app/blog/page.tsx` → `BlogSection.tsx`) — standalone blog page. Left sidebar filters posts by category (**All / Work Blogs / Project Blogs / Class Blogs**); posts render as opaque `.panel` cards, newest-first, each with a **"Click to read more →"** button that opens the full post in a centered modal (large `.panel` dialog, Escape/backdrop-click to close) rendering mixed `paragraph`/`image`/`code` content blocks. **All placeholder posts are currently block-commented out** in `placeholder-data.ts` (`blogPosts = []`) — the section renders a "First post coming soon." empty state instead until real posts are written back in. Nav's `[Blog]` link and the homepage's Blog preview both route here (`sectionLinks.blog = "/blog"`).
- `/resume` (`src/app/resume/page.tsx` → `ResumeSection.tsx`) — dedicated resume page: embeds `public/resume.pdf` inline via `<object>` (with a plain-link fallback for browsers that can't render it), plus a "Download PDF" button (`download` attr, added as a `Button` prop) and an "Open in new tab" link. The Hero's Resume CTA and a `[Resume]` nav link both point here — previously the CTA linked straight to `/resume.pdf`, which 404'd because `public/` didn't have the file at all.
- `/projects` (`src/app/projects/page.tsx` → `ProjectsSection.tsx`) — case studies, same modal-on-click pattern as Blog.

## Content & config

- `src/content/placeholder-data.ts` — all page copy: `hero`, `about`, `skills`, `projects`, `certifications` (real, resume-sourced, several with real verification links — see below), and `blogCategories` + `blogPosts` (blog categories are real; `blogPosts` itself is currently emptied out, see Site structure above).
- `src/lib/site-config.ts` — `siteConfig`, `sectionLinks` (homepage anchors are `/#section` so they resolve correctly from `/blog` and `/resume` too; `blog`/`resume` point at their real routes), `navLinks` (About/Skills/Certifications/Projects/Blog/Resume), `socialLinks` (real GitHub/LinkedIn URLs, wired up from placeholders this session).
- `src/lib/colors.ts` — `accentClasses`: 5 named colors (`accent`/`blue`/`teal`/`amber`/`violet`), each `{ text, bg, border, glow }`, used for consistent per-item color coding across Skills/Projects/Certifications/Blog.
- `resume/` — the actual resume PDF used as source material (also copied to `public/resume.pdf` so it's servable — see `/resume` above). **Gitignored intentionally** (the source copy, not the public one — contains more personal info than what's published on the site) — stays local only.
- Certification credential links: `certifications.items[].link` holds real verification URLs (Coursera cert page, DataCamp statement-of-accomplishment pages ×3, LeetCode profile, LinkedIn cert-details page for the AWS Skill Builder badge) extracted directly from the `/URI` hyperlink annotations embedded in `resume.pdf` — **don't guess/fabricate credential URLs**; if a cert needs a link and none exists in the resume's embedded annotations, ask rather than invent one. "Introduction to Generative AI" intentionally has no `link` — none was found.

## Design system notes

- Fonts: **JetBrains Mono** doubles as both `--font-mono` and `--font-serif` (i.e. every "serif" heading class actually renders monospace — deliberate, matches the terminal/HUD aesthetic), **Inter** (sans, body). Fraunces/Space Mono were tried earlier and removed.
- Theme tokens live in `src/app/globals.css` as raw RGB channel vars (`--color-bg: 18 18 18`) mapped through `@theme inline`; `.dark` overrides via `next-themes`' `class` attribute. Light = off-white + red accent; dark = neutral charcoal + orange accent (deliberately no color-tinted dark palette — tried aubergine/plum, user rejected it).
- **Site-wide scale**: `html { font-size: 78%; }` in `globals.css` scales every rem-based size (text, padding, gaps, radii, `max-w-*`) down uniformly in one place — this is the mechanism for "make everything a bit smaller" requests, not per-component edits. **Any new fixed-pixel sizing on a panel/card will NOT scale with this** and will look progressively oversized as this value gets tuned further — size new components in `rem`, not `px`, unless the size is deliberately meant to stay constant (see the two exceptions below).
- Two deliberate exceptions to the rem-scaling rule: the hero name's canvas height (`h-[281px]` in `Hero.tsx`) and the PDF viewer's height (`85vh` in `ResumeSection.tsx`) are intentionally fixed/viewport-based, not rem — the hero name in particular was explicitly locked to a constant pixel size on request ("even if the screen is smaller, the animation is still this big"), reverting an earlier attempt at responsive `clamp()`-based sizing.
- `.panel` utility = the site's standard frosted card (`border + backdrop-blur + bg-surface/72%`). `.blueprint-grid` utility = graph-paper texture, used for image placeholders (Projects thumbnails, Footer, blog post content-block images).
- `CornerFrame` (`src/components/ui/CornerFrame.tsx`) — small absolutely-positioned corner-bracket decoration, reused across Hero and the Skills/Projects/Certifications sections for a consistent "framed" look.
- `SiteBackground.tsx` — mounted once in `layout.tsx`, wraps `AsciiField.tsx` as a fixed full-viewport `-z-10` canvas background whose opacity fades in with scroll (0 at the very top of the page, full by ~85% of one viewport height scrolled). Its mouse/click/touch listeners are attached to `window`, not the canvas element — the canvas sits behind all page content, so listening on itself would only catch the rare pixel where it's topmost. This is a load-bearing detail; don't "simplify" it back to canvas-level listeners. Redraws are throttled to 24fps internally (a real ambient-CPU-cost issue, not premature optimization — see Performance notes below).
- ~~`GlassCursor.tsx`~~ — **removed**. It tracked the pointer to drive a `.panel`/`.glass` hover "flashlight" sheen; the sheen was removed for looking wrong in light mode, which made the tracker dead code, so it was deleted along with its `layout.tsx` mount rather than left running for nothing.
- `AsciiNameSlot.tsx` (Hero only) — the site owner's name rendered as two independently-scrolling canvas rows (first name / last name), each built by rasterizing text to an offscreen mask canvas and sampling it into a coarse character grid (`RAMP = " .:-+*#%@"`), reusing the same technique as `AsciiField`. Cycles English → Hindi (Devanagari) → Punjabi (Gurmukhi) variants (`hero.nameVariants` in `placeholder-data.ts`). Font size/grid resolution are both derived from measured `actualBoundingBoxAscent/Descent` (not a fixed Latin-shaped ratio) so non-Latin conjuncts/matras don't clip and glyphs stay legible at any size. On mount both rows hold static on the English name for ~3s, then drift continuously in opposite directions (`DRIFT_SPEED`, tuned faster than the original for a more fluid feel); hovering a row pauses its own drift (`IntersectionObserver`-independent — driven by live mouse position) and resumes on mouse-leave. The `/` separator between name variants is **not** sampled from the real font glyph — it landed at a different sub-cell offset after every word (word widths vary a lot across languages), so the same character rendered a different thickness/shape each time. It's now a fixed, grid-snapped diagonal shape built directly from `row.cellW`/`row.cellH`, identical at every occurrence. Font stack includes `"Nirmala UI"`/Noto/Kohinoor fallbacks specifically for correct Devanagari/Gurmukhi shaping.
- `Marquee.tsx` — generic infinite-scroll strip (duplicates its `items` list, animates `translateX` 0 → -50% via the shared `.marquee-track` keyframe). This only loops seamlessly if one copy of the content is wider than its container — if a short item list ever needs to fill a wide row (e.g. Hero's tech-stack strip after the hero content column was widened), pass a pre-repeated list (see `Hero.tsx`), don't rely on `Marquee` doubling alone.
- Framer Motion gotchas: `useTransform` can't interpolate raw CSS-var color strings (`rgb(var(--color-accent))`) — resolve via `getComputedStyle` first if you need to animate a themed color. Prefer `scale` over animating `width`/`height` for layout-affecting motion.

## Performance notes

Both `AsciiField` and `AsciiNameSlot` run continuous `requestAnimationFrame` loops for as long as their canvas is mounted — a few things fixed this session that are easy to accidentally regress:

- **Don't call `getComputedStyle` inside the per-frame draw function.** Both components used to read `--color-fg`/`--color-accent` fresh every frame, forcing a synchronous style recalc 60×/sec indefinitely. Colors are now read once and cached, refreshed only via a `MutationObserver` watching the `<html>` element's `class` attribute (i.e. on an actual theme toggle).
- **`AsciiField`'s redraw is throttled to 24fps** via a time-gated check inside `draw()` (real frames still get scheduled every `requestAnimationFrame` tick, but the expensive per-cell work only runs when ≥1000/24 ms have elapsed since the last real draw). It's a slow ambient shimmer — no visible difference at 24fps vs. 60fps, but a large ongoing CPU saving.
- **`AsciiNameSlot` pauses its `requestAnimationFrame` loop via `IntersectionObserver`** when scrolled off-screen (e.g. past the hero), instead of continuing to animate invisibly for the rest of the session. Resumes on scroll-back.
- The hover-glow/enlarge radius in `AsciiNameSlot` is derived from `row.cellH` (`row.cellH * 9`), not a fixed pixel value — keeps the effect proportionate to the text size at any screen width instead of looking oversized once the name renders smaller.

## Known state / not yet done

- Content is a mix of real (resume-derived: About/Skills/Projects/Certifications) and placeholder (blog post bodies — written to sound plausible, currently commented out entirely; meant to be uncommented/replaced with real writing later).
- No per-post blog routes yet — posts would open in a modal on `/blog` rather than linking to individual pages, once real posts exist again.
- Deployment: walked through the Vercel import steps (GitHub-connected auto-deploy on every push to `main`), but not confirmed as actually connected/live as of this writing — verify at vercel.com/dashboard before assuming a push is reflected anywhere.
- Hero name transliterations (`hero.nameVariants` in `placeholder-data.ts`): Hindi/Punjabi are standard spellings; the fact that the ASCII rendering is Latin/Devanagari/Gurmukhi only (no Japanese/Korean/Chinese) reflects an explicit ask to drop those after the phonetic transliterations were tried and removed.
- Git: pushed to `github.com/ONIGIRIIII/portfolio` (public, `main` branch). Commits from this point on include a `Co-Authored-By: Claude` trailer.
