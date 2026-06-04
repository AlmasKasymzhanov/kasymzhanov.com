// Bracketed mono metadata: [ 25 МАР 2026 · РАЗБОР · 7 МИН ]
export function MetaLabel({
  items,
  className = "",
}: {
  items: (string | false | null | undefined)[];
  className?: string;
}) {
  const parts = items.filter(Boolean) as string[];
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] ${className}`}
    >
      [ {parts.join("  ·  ")} ]
    </p>
  );
}
