export const siteConfig = {
  name: "Harshpreet Singh",
  role: "AI + Data Scientist",
  email: "singhharshpreet675@gmail.com",
} as const;

export const sectionLinks = {
  home: "/#top",
  about: "/#about",
  skills: "/#skills",
  certifications: "/#certifications",
  projects: "/projects",
  blog: "/blog",
} as const;

export const blogSectionLinks = {
  work: "/blog",
  projects: "/blog",
  class: "/blog",
} as const;

export const navLinks = [
  { label: "About", href: sectionLinks.about },
  { label: "Skills", href: sectionLinks.skills },
  { label: "Certifications", href: sectionLinks.certifications },
  { label: "Projects", href: sectionLinks.projects },
  { label: "Blog", href: sectionLinks.blog },
] as const;

export const socialLinks = {
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  email: `mailto:${siteConfig.email}`,
} as const;
