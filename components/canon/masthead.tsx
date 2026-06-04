import Link from "next/link";

// The media wordmark: A▪ KASYMZHANO▼
// — classic "A" + square-dot period, and a filled inverted triangle for the final "V"
// (the triangle = delta / downturn, and doubles as the standalone brand mark).
export function Masthead({ back = false }: { back?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="A. Kasymzhanov — на главную"
      className="inline-flex items-baseline font-mono text-[13px] md:text-[14px] font-bold tracking-[0.16em] uppercase text-[var(--color-text)] no-underline hover:opacity-70 transition-opacity"
    >
      {back && <span className="mr-2 font-normal not-italic">←</span>}
      <span>A</span>
      {/* square dot = period */}
      <span
        aria-hidden
        className="inline-block w-[0.16em] h-[0.16em] bg-[var(--color-text)] ml-[0.05em] mr-[0.42em]"
      />
      <span>Kasymzhano</span>
      {/* inverted filled triangle = V */}
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        className="inline-block w-[0.66em] h-[0.8em] ml-[0.06em] translate-y-[0.04em] fill-[var(--color-text)]"
      >
        <polygon points="0,0 12,0 6,12" />
      </svg>
    </Link>
  );
}
