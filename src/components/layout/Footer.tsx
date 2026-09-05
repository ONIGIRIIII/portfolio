import { navLinks, sectionLinks, siteConfig, socialLinks } from "@/lib/site-config";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/SocialIcons";

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
              <GithubIcon />
            </a>
            <a
              href={socialLinks.linkedin}
              aria-label="LinkedIn"
              className="glass focus-visible:ring-accent focus-visible:ring-offset-bg flex h-9 w-9 items-center justify-center !rounded-chip focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
            >
              <LinkedinIcon />
            </a>
            <a
              href={socialLinks.email}
              aria-label="Email"
              className="glass focus-visible:ring-accent focus-visible:ring-offset-bg flex h-9 w-9 items-center justify-center !rounded-chip focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
            >
              <MailIcon />
            </a>
          </div>
        </div>

        <p className="font-mono text-xs text-fg/50">
          © {year} {siteConfig.name} · built with Next.js
        </p>
      </div>
    </footer>
  );
}
