import type { ReactNode } from "react";
import { accentClasses, type AccentColor } from "@/lib/colors";

export function DotMatrixBadge({ color, icon }: { color: AccentColor; icon: ReactNode }) {
  const c = accentClasses[color];

  return (
    <div className={`relative flex h-14 w-14 items-center justify-center rounded-xl border border-line ${c.glow}`}>
      <span className={c.text}>{icon}</span>
    </div>
  );
}
