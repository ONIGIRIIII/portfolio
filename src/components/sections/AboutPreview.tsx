import { about } from "@/content/placeholder-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { StatConnector } from "@/components/ui/StatConnector";
import { Panel } from "@/components/ui/Panel";

export function AboutPreview() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-6xl px-6 py-24">
      <RevealOnScroll>
        <SectionHeading tag={about.tag} title={about.title} subtitle={about.subtitle} id="about" />
      </RevealOnScroll>

      <RevealOnScroll>
        <Panel className="grid grid-cols-1 gap-12 rounded-glass p-8 sm:p-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="font-serif text-2xl leading-snug text-balance sm:text-3xl">{about.blurb}</p>
          </div>

          <div className="lg:col-span-2">
            <StatConnector stats={about.stats} />
          </div>
        </Panel>
      </RevealOnScroll>
    </section>
  );
}
