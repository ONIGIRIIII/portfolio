import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { SectionDots } from "@/components/ui/SectionDots";
import { BackgroundHint } from "@/components/ui/BackgroundHint";

export default function Home() {
  return (
    <>
      <SectionDots />
      <BackgroundHint />
      <Hero />
      <AboutPreview />
      <SkillsGrid />
      <CertificationsSection />
      <ProjectsPreview />
      <BlogPreview />
    </>
  );
}
