# Harshpreet Singh — Portfolio

Personal portfolio site for Harshpreet Singh (Data & Business Analyst, UBC Math student, Apera AI co-op). Built with Next.js App Router, styled around a serif/mono editorial look with a red/orange accent system and an interactive ASCII-art canvas background.

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

- `/` (`src/app/page.tsx`) — Hero → About → Skills → Certifications → Projects → Blog preview, all as scroll sections on one page.
- `/blog` (`src/app/blog/page.tsx` → `BlogSection.tsx`) — standalone blog page. Left sidebar filters posts by category (**All / Work Blogs / Project Blogs / Class Blogs**); posts render as opaque `.panel` cards, newest-first, each with an inline expanding **"Read more"** toggle. Nav's `[Blog]` link and the homepage's Blog preview both route here (`sectionLinks.blog = "/blog"`).

## Content & config

- `src/content/placeholder-data.ts` — all page copy: `hero`, `about`, `skills`, `projects`, `certifications` (real, resume-sourced), and `blogCategories` + `blogPosts` (blog categories are real; individual post bodies are placeholder writing, `slug`/`title`/`excerpt`/`date`/`category`/`content[]` per post).
- `src/lib/site-config.ts` — `siteConfig`, `sectionLinks` (homepage anchors are `/#section` so they resolve correctly from `/blog` too; `blog` points at the real `/blog` route), `navLinks`, `socialLinks`.
- `src/lib/colors.ts` — `accentClasses`: 5 named colors (`accent`/`blue`/`teal`/`amber`/`violet`), each `{ text, bg, border, glow }`, used for consistent per-item color coding across Skills/Projects/Certifications/Blog.
- `resume/` — the actual resume PDF used as source material. **Gitignored intentionally** (contains more personal info than what's published on the site) — stays local only.

## Design system notes

- Fonts: **Fraunces** (serif, headings), **Space Mono** (mono, labels/nav/tags), **Inter** (sans, body).
- Theme tokens live in `src/app/globals.css` as raw RGB channel vars (`--color-bg: 18 18 18`) mapped through `@theme inline`; `.dark` overrides via `next-themes`' `class` attribute. Light = off-white + red accent; dark = neutral charcoal + orange accent (deliberately no color-tinted dark palette — tried aubergine/plum, user rejected it).
- `.panel` utility = the site's standard frosted card (`border + backdrop-blur + bg-surface/72%`). `.blueprint-grid` utility = graph-paper texture, used sparingly (Projects thumbnails, Footer) — **not** used on `/blog` (removed per feedback, it cluttered the post list).
- `AsciiField.tsx` — single global instance mounted in `layout.tsx` as a fixed full-viewport `-z-10` canvas background. Its mouse/click/touch listeners are attached to `window`, not the canvas element — the canvas sits behind all page content, so listening on itself would only catch the rare pixel where it's topmost. This is a load-bearing detail; don't "simplify" it back to canvas-level listeners.
- Framer Motion gotchas: `useTransform` can't interpolate raw CSS-var color strings (`rgb(var(--color-accent))`) — resolve via `getComputedStyle` first if you need to animate a themed color. Prefer `scale` over animating `width`/`height` for layout-affecting motion (except deliberate accordion-style height animation, e.g. the Blog "Read more" expand, which is fine).

## Known state / not yet done

- Content is a mix of real (resume-derived: About/Skills/Projects/Certifications) and placeholder (blog post bodies — written to sound plausible, meant to be replaced with real writing later).
- No per-post blog routes yet — posts expand inline on `/blog` rather than linking to individual pages.
- Not yet deployed (no Vercel project connected as of this writing).
- Git: initialized this session, pushed to `github.com/ONIGIRIIII/portfolio` (public, `main` branch, single squashed-history commit — author/committer is Harshpreet Singh only, no AI co-author trailer).
