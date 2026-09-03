const base = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ChartIcon() {
  return (
    <svg {...base} className="h-5 w-5">
      <path d="M4 20V10M12 20V4M20 20v-7" />
    </svg>
  );
}

export function CodeIcon() {
  return (
    <svg {...base} className="h-5 w-5">
      <path d="M8 6 2 12l6 6M16 6l6 6-6 6" />
    </svg>
  );
}

export function CloudIcon() {
  return (
    <svg {...base} className="h-5 w-5">
      <path d="M6.5 18a4 4 0 0 1-.5-7.97A5 5 0 0 1 15.6 8.5 4.5 4.5 0 0 1 15 18h-8.5Z" />
    </svg>
  );
}

export function LayersIcon() {
  return (
    <svg {...base} className="h-5 w-5">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  );
}

export function ServerIcon() {
  return (
    <svg {...base} className="h-5 w-5">
      <rect x="4" y="4" width="16" height="6" rx="1.2" />
      <rect x="4" y="14" width="16" height="6" rx="1.2" />
      <path d="M7.5 7h.01M7.5 17h.01" strokeWidth="2.4" />
    </svg>
  );
}

export function GitBranchIcon() {
  return (
    <svg {...base} className="h-5 w-5">
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 8v8M6 12c0-2.5 2-3 4-3h6" />
    </svg>
  );
}

export const skillIcons = {
  chart: ChartIcon,
  code: CodeIcon,
  cloud: CloudIcon,
  layers: LayersIcon,
  server: ServerIcon,
  git: GitBranchIcon,
} as const;

export type SkillIconName = keyof typeof skillIcons;
