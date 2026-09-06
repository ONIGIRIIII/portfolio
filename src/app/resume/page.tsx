import type { Metadata } from "next";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Resume · ${siteConfig.name}`,
  description: `${siteConfig.name}'s resume: ${siteConfig.role}.`,
};

export default function ResumePage() {
  return <ResumeSection />;
}
