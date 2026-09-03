import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { BlogPreview } from "@/components/sections/BlogPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <SkillsGrid />
      <CertificationsSection />
      <ProjectsPreview />
      <BlogPreview />
    </>
  );
}
