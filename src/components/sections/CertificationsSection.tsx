"use client";

import { certifications } from "@/content/placeholder-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Marquee } from "@/components/ui/Marquee";
import { accentClasses, type AccentColor } from "@/lib/colors";

type Cert = {
  name: string;
  issuer: string;
  color: AccentColor;
  status?: string;
};

function CertChip({ item }: { item: Cert }) {
  const c = accentClasses[item.color];

  return (
    <div className="panel relative flex h-36 w-72 flex-col gap-1.5 overflow-hidden px-6 py-5">
      <span className={`absolute inset-y-0 left-0 w-1 ${c.bg}`} />
      <span className="font-mono text-xs uppercase tracking-widest text-fg/40">{item.issuer}</span>
      <span className="line-clamp-2 font-serif text-lg leading-snug">{item.name}</span>
      <span className="mt-auto">
        {item.status && (
          <span className={`inline-block w-fit border px-2 py-0.5 font-mono text-[10px] ${c.border} ${c.text}`}>
            {item.status}
          </span>
        )}
      </span>
    </div>
  );
}

export function CertificationsSection() {
  const half = Math.ceil(certifications.items.length / 2);
  const rowOne = certifications.items.slice(0, half);
  const rowTwo = certifications.items.slice(half);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <RevealOnScroll>
        <SectionHeading
          tag={certifications.tag}
          title={certifications.title}
          subtitle={certifications.subtitle}
          id="certifications"
        />
      </RevealOnScroll>

      <RevealOnScroll className="flex flex-col gap-4">
        <Marquee items={rowOne.map((item, i) => <CertChip key={i} item={item} />)} gap="gap-4" />
        <Marquee items={rowTwo.map((item, i) => <CertChip key={i} item={item} />)} gap="gap-4" reverse />
      </RevealOnScroll>
    </section>
  );
}
