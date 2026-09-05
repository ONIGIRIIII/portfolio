import type { Metadata } from "next";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Projects · ${siteConfig.name}`,
  description: `Case studies on the pipelines, tools, and analyses ${siteConfig.name} has built.`,
};

export default function ProjectsPage() {
  return <ProjectsSection />;
}
