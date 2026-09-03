import type { ReactNode } from "react";

const bracket = "absolute h-5 w-5 border-fg/30";

export function CornerFrame({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span className={`${bracket} left-0 top-0 border-l border-t`} />
      <span className={`${bracket} right-0 top-0 border-r border-t`} />
      <span className={`${bracket} bottom-0 left-0 border-b border-l`} />
      <span className={`${bracket} bottom-0 right-0 border-b border-r`} />
      {children}
    </div>
  );
}
