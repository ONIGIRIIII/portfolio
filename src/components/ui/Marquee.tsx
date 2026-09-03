import type { ReactNode } from "react";

interface MarqueeProps {
  items: ReactNode[];
  className?: string;
  reverse?: boolean;
  gap?: string;
}

export function Marquee({ items, className = "", reverse = false, gap = "gap-10" }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div
        className={`marquee-track group-hover:[animation-play-state:paused] flex w-max items-center pr-10 ${gap} ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {item}
          </div>
        ))}
      </div>
      <div className="from-bg pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r to-transparent" />
      <div className="from-bg pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l to-transparent" />
    </div>
  );
}
