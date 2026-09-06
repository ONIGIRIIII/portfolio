"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

const RESUME_PDF_URL = "/resume.pdf";

export function ResumeSection() {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <RevealOnScroll>
        <SectionHeading
          tag="Resume"
          title={`${siteConfig.name}'s Resume`}
          subtitle="View it inline below, or grab the PDF directly."
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="mb-6 flex flex-wrap items-center gap-6">
          <Button variant="primary" href={RESUME_PDF_URL} download>
            Download PDF
          </Button>
          <a
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:ring-accent focus-visible:ring-offset-bg font-mono text-sm text-fg/70 underline-offset-4 hover:text-accent hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none"
          >
            Open in new tab ↗
          </a>
        </div>

        <div className="panel overflow-hidden" style={{ height: "85vh" }}>
          <object data={RESUME_PDF_URL} type="application/pdf" className="h-full w-full">
            <p className="p-6 text-sm text-fg/70">
              Your browser can&apos;t display the PDF inline.{" "}
              <a href={RESUME_PDF_URL} className="text-accent underline-offset-4 hover:underline">
                Download it here
              </a>
              .
            </p>
          </object>
        </div>
      </RevealOnScroll>
    </section>
  );
}
