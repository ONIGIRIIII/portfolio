import type { Metadata } from "next";
import { BlogSection } from "@/components/sections/BlogSection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Writing · ${siteConfig.name}`,
  description: `Notes, project write-ups, and certifications from ${siteConfig.name}.`,
};

export default function BlogPage() {
  return <BlogSection />;
}
