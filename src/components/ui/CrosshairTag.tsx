import type { ReactNode } from "react";

const plus =
  "absolute text-[9px] leading-none text-fg/40 select-none";

export function CrosshairTag({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex items-center">
      <span className={`${plus} -left-3 -top-2.5`}>+</span>
      <span className={`${plus} -right-3 -top-2.5`}>+</span>
      <span className={`${plus} -bottom-2.5 -left-3`}>+</span>
      <span className={`${plus} -bottom-2.5 -right-3`}>+</span>
      <span className="bg-fg text-bg inline-block rounded-sm px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest">
        {children}
      </span>
    </span>
  );
}
