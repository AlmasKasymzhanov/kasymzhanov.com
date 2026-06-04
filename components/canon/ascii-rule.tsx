// ASCII divider — fills the width with mono glyphs, clipped at the edges.
export function AsciiRule({
  variant = "line",
  className = "",
}: {
  variant?: "line" | "dots" | "dash";
  className?: string;
}) {
  const ch = variant === "dots" ? "· " : variant === "dash" ? "┄" : "─";
  return (
    <div
      aria-hidden
      className={`font-mono text-[13px] leading-none text-[var(--color-border)] overflow-hidden whitespace-nowrap select-none my-10 ${className}`}
    >
      {ch.repeat(500)}
    </div>
  );
}
