import { CrosshairTag } from "./CrosshairTag";

interface SectionHeadingProps {
  tag: string;
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
  id?: string;
  align?: "left" | "center";
}

export function SectionHeading({ tag, title, subtitle, action, id, align = "left" }: SectionHeadingProps) {
  const headingId = id ? `${id}-heading` : undefined;
  const centered = align === "center";

  return (
    <div className={`mb-14 flex flex-col gap-4 ${centered ? "items-center text-center" : "items-start"}`}>
      <CrosshairTag>{tag}</CrosshairTag>
      <div className={`flex w-full items-end justify-between gap-6 ${centered ? "justify-center" : ""}`}>
        <h2 id={headingId} className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          {title}
        </h2>
        {action && !centered && (
          <a
            href={action.href}
            className="focus-visible:ring-accent focus-visible:ring-offset-bg hidden font-mono text-sm text-fg/60 underline-offset-4 hover:text-fg hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none sm:inline-block"
          >
            {action.label} ↗
          </a>
        )}
      </div>
      {subtitle && (
        <p className={`max-w-xl text-balance text-fg/60 ${centered ? "mx-auto" : ""}`}>{subtitle}</p>
      )}
    </div>
  );
}
