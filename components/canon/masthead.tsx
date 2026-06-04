import Link from "next/link";

// The media wordmark — author-name masthead. Mono, uppercase, tracked.
export function Masthead({ back = false }: { back?: boolean }) {
  return (
    <Link
      href="/"
      className="font-mono text-[12px] md:text-[13px] font-bold tracking-[0.22em] uppercase text-[var(--color-text)] hover:opacity-70 transition-opacity no-underline"
    >
      {back ? "← " : ""}A. Kasymzhanov
    </Link>
  );
}
