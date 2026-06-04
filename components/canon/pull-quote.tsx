import type { ReactNode } from "react";

// Editorial pull-quote — mono, hairline left rule.
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-[var(--color-text)] pl-5 font-mono text-[16px] md:text-[17px] leading-[1.6] text-[var(--color-text)]">
      {children}
    </blockquote>
  );
}
