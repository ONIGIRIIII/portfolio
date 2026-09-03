import { navLinks, sectionLinks, siteConfig, socialLinks } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line py-16">
      <div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.4] [mask-image:linear-gradient(to_bottom,transparent,black_60%)]"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <a href={sectionLinks.home} className="font-serif text-lg tracking-tight">
            {siteConfig.name}
          </a>

          <nav aria-label="Footer" className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="focus-visible:ring-accent focus-visible:ring-offset-bg font-mono text-sm text-fg/70 transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
              >
                [{link.label}]
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            <a
              href={socialLinks.github}
              aria-label="GitHub"
              className="glass focus-visible:ring-accent focus-visible:ring-offset-bg flex h-9 w-9 items-center justify-center !rounded-chip focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.22-3.37-1.22-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .28.18.6.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
              </svg>
            </a>
            <a
              href={socialLinks.linkedin}
              aria-label="LinkedIn"
              className="glass focus-visible:ring-accent focus-visible:ring-offset-bg flex h-9 w-9 items-center justify-center !rounded-chip focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.25 8.75h3.5V21h-3.5V8.75Zm6.25 0h3.36v1.68h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.34V21H17v-5.4c0-1.29-.02-2.94-1.79-2.94-1.8 0-2.08 1.4-2.08 2.85V21H9.5V8.75Z" />
              </svg>
            </a>
            <a
              href={socialLinks.email}
              aria-label="Email"
              className="glass focus-visible:ring-accent focus-visible:ring-offset-bg flex h-9 w-9 items-center justify-center !rounded-chip focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <p className="font-mono text-xs text-fg/50">
          © {year} {siteConfig.name} — built with Next.js
        </p>
      </div>
    </footer>
  );
}
