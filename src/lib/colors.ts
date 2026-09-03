export type AccentColor = "accent" | "blue" | "teal" | "amber" | "violet";

export const accentClasses: Record<AccentColor, { text: string; bg: string; border: string; glow: string }> = {
  accent: {
    text: "text-accent",
    bg: "bg-accent",
    border: "border-accent",
    glow: "shadow-[0_0_28px_-6px_rgb(var(--color-accent)/0.6)]",
  },
  blue: {
    text: "text-accent-blue",
    bg: "bg-accent-blue",
    border: "border-accent-blue",
    glow: "shadow-[0_0_28px_-6px_rgb(var(--accent-blue)/0.6)]",
  },
  teal: {
    text: "text-accent-teal",
    bg: "bg-accent-teal",
    border: "border-accent-teal",
    glow: "shadow-[0_0_28px_-6px_rgb(var(--accent-teal)/0.6)]",
  },
  amber: {
    text: "text-accent-amber",
    bg: "bg-accent-amber",
    border: "border-accent-amber",
    glow: "shadow-[0_0_28px_-6px_rgb(var(--accent-amber)/0.6)]",
  },
  violet: {
    text: "text-accent-violet",
    bg: "bg-accent-violet",
    border: "border-accent-violet",
    glow: "shadow-[0_0_28px_-6px_rgb(var(--accent-violet)/0.6)]",
  },
};
