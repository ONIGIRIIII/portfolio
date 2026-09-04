# Harshpreet Singh — Portfolio

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

- `/` (`src/app/page.tsx`) — Hero → About → Skills → Certifications → Projects → Blog preview, all as scroll sections on one page. `SectionDots` (fixed left rail, homepage-only, `IntersectionObserver`-driven) shows scroll position across About/Skills/Certifications/Projects/Blog.
- `/blog` (`src/app/blog/page.tsx` → `BlogSection.tsx`) — standalone blog page. Left sidebar filters posts by category (**All / Work Blogs / Project Blogs / Class Blogs**); posts render as opaque `.panel` cards, newest-first, each with a **"Click to read more →"** button that opens the full post in a centered modal (large `.panel` dialog, Escape/backdrop-click to close) rendering mixed `paragraph`/`image`/`code` content blocks. Nav's `[Blog]` link and the homepage's Blog preview both route here (`sectionLinks.blog = "/blog"`).

## Content & config

- `src/content/placeholder-data.ts` — all page copy: `hero`, `about`, `skills`, `projects`, `certifications` (real, resume-sourced), and `blogCategories` + `blogPosts` (blog categories are real; individual post bodies are placeholder writing, `slug`/`title`/`excerpt`/`date`/`category`/`content[]` per post).
- `src/lib/site-config.ts` — `siteConfig`, `sectionLinks` (homepage anchors are `/#section` so they resolve correctly from `/blog` too; `blog` points at the real `/blog` route), `navLinks`, `socialLinks`.
- `src/lib/colors.ts` — `accentClasses`: 5 named colors (`accent`/`blue`/`teal`/`amber`/`violet`), each `{ text, bg, border, glow }`, used for consistent per-item color coding across Skills/Projects/Certifications/Blog.
- `resume/` — the actual resume PDF used as source material. **Gitignored intentionally** (contains more personal info than what's published on the site) — stays local only.

## Design system notes

- Fonts: **JetBrains Mono** doubles as both `--font-mono` and `--font-serif` (i.e. every "serif" heading class actually renders monospace — deliberate, matches the terminal/HUD aesthetic), **Inter** (sans, body). Fraunces/Space Mono were tried earlier and removed.
- Theme tokens live in `src/app/globals.css` as raw RGB channel vars (`--color-bg: 18 18 18`) mapped through `@theme inline`; `.dark` overrides via `next-themes`' `class` attribute. Light = off-white + red accent; dark = neutral charcoal + orange accent (deliberately no color-tinted dark palette — tried aubergine/plum, user rejected it).
- `.panel` utility = the site's standard frosted card (`border + backdrop-blur + bg-surface/72%`). `.blueprint-grid` utility = graph-paper texture, used for image placeholders (Projects thumbnails, Footer, blog post content-block images).
- `CornerFrame` (`src/components/ui/CornerFrame.tsx`) — small absolutely-positioned corner-bracket decoration, reused across Hero and the Skills/Projects/Certifications sections for a consistent "framed" look.
- `SiteBackground.tsx` — mounted once in `layout.tsx`, wraps `AsciiField.tsx` as a fixed full-viewport `-z-10` canvas background whose opacity fades in with scroll (0 at the very top of the page, full by ~85% of one viewport height scrolled). Its mouse/click/touch listeners are attached to `window`, not the canvas element — the canvas sits behind all page content, so listening on itself would only catch the rare pixel where it's topmost. This is a load-bearing detail; don't "simplify" it back to canvas-level listeners.
- `GlassCursor.tsx` — mounted once in `layout.tsx`; tracks the pointer and writes `--mx`/`--my` CSS vars used by `.panel`/`.glass`'s hover sheen (a soft "flashlight" highlight that follows the cursor over glass surfaces).
- `AsciiNameSlot.tsx` (Hero only) — the site owner's name rendered as two independently-scrolling canvas rows (first name / last name), each built by rasterizing text to an offscreen mask canvas and sampling it into a coarse character grid (`RAMP = " .:-+*#%@"`), reusing the same technique as `AsciiField`. Cycles English → Hindi (Devanagari) → Punjabi (Gurmukhi) variants (`hero.nameVariants` in `placeholder-data.ts`). Font size/grid resolution are both derived from measured `actualBoundingBoxAscent/Descent` (not a fixed Latin-shaped ratio) so non-Latin conjuncts/matras don't clip and glyphs stay legible at any size. On mount both rows hold static on the English name for ~3s, then drift continuously in opposite directions; mouse-proximity hover glow, no click interaction. Font stack includes `"Nirmala UI"`/Noto/Kohinoor fallbacks specifically for correct Devanagari/Gurmukhi shaping.
- `Marquee.tsx` — generic infinite-scroll strip (duplicates its `items` list, animates `translateX` 0 → -50% via the shared `.marquee-track` keyframe). This only loops seamlessly if one copy of the content is wider than its container — if a short item list ever needs to fill a wide row (e.g. Hero's tech-stack strip after the hero content column was widened), pass a pre-repeated list (see `Hero.tsx`), don't rely on `Marquee` doubling alone.
- Framer Motion gotchas: `useTransform` can't interpolate raw CSS-var color strings (`rgb(var(--color-accent))`) — resolve via `getComputedStyle` first if you need to animate a themed color. Prefer `scale` over animating `width`/`height` for layout-affecting motion.

## Known state / not yet done

- Content is a mix of real (resume-derived: About/Skills/Projects/Certifications) and placeholder (blog post bodies — written to sound plausible, meant to be replaced with real writing later).
- No per-post blog routes yet — posts open in a modal on `/blog` rather than linking to individual pages.
- Not yet deployed (no Vercel project connected as of this writing).
- Hero name transliterations (`hero.nameVariants` in `placeholder-data.ts`): Hindi/Punjabi are standard spellings; the fact that the ASCII rendering is Latin/Devanagari/Gurmukhi only (no Japanese/Korean/Chinese) reflects an explicit ask to drop those after the phonetic transliterations were tried and removed.
- Git: pushed to `github.com/ONIGIRIIII/portfolio` (public, `main` branch). Commits from this point on include a `Co-Authored-By: Claude` trailer.
