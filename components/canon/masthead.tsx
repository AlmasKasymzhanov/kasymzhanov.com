import Link from "next/link";

// The media wordmark: A▪ KASYMZHANO▼
// — classic "A" + square-dot period, and a filled inverted triangle for the final "V"
// (the triangle = delta / downturn, and doubles as the standalone brand mark).
export function Masthead({
  back = false,
  size = "sm",
  surnameOnly = false,
}: {
  back?: boolean;
  size?: "sm" | "lg" | "xl";
  surnameOnly?: boolean;
}) {
  const sizeCls =
    size === "xl"
      ? "text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] tracking-[0.06em]"
      : size === "lg"
        ? "text-[20px] md:text-[28px] tracking-[0.12em]"
        : "text-[13px] md:text-[14px] tracking-[0.16em]";
  return (
    <Link
      href="/"
      aria-label="A. Kasymzhanov — на главную"
      className={`inline-flex items-baseline font-mono ${sizeCls} font-bold uppercase text-[var(--color-text)] no-underline hover:opacity-70 transition-opacity`}
    >
      {back && <span className="mr-2 font-normal not-italic">←</span>}
      {!surnameOnly && (
        <>
          <span>A</span>
          {/* square dot = period */}
          <span
            aria-hidden
            className="inline-block w-[0.18em] h-[0.18em] bg-[var(--color-text)] ml-[0.05em] mr-[0.42em]"
          />
        </>
      )}
      <span>Kasymzhano</span>
      {/* inverted filled triangle = V */}
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        className="inline-block w-[0.72em] h-[0.86em] ml-[0.06em] translate-y-[0.02em] fill-[var(--color-text)]"
      >
        <polygon points="0,0 12,0 6,12" />
      </svg>
    </Link>
  );
}
