import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteBackground } from "@/components/ui/SiteBackground";
import { GlassCursor } from "@/components/ui/GlassCursor";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — Portfolio`,
  description: `${siteConfig.role} — projects, skills, and writing from ${siteConfig.name}.`,
  openGraph: {
    title: `${siteConfig.name} — Portfolio`,
    description: `${siteConfig.role} — projects, skills, and writing from ${siteConfig.name}.`,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg flex min-h-screen flex-col">
        <ThemeProvider>
          <SiteBackground />
          <GlassCursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
