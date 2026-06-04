import Link from "next/link";

// The media wordmark — author-name masthead. Mono, uppercase, tracked.
export function Masthead({ back = false }: { back?: boolean }) {
  return (
    <Link
      href="/"
      className="font-pixel text-[14px] md:text-[15px] tracking-[0.16em] uppercase text-[var(--color-text)] hover:opacity-70 transition-opacity no-underline"
    >
      {back ? "← " : ""}A. Kasymzhanov
    </Link>
  );
}
