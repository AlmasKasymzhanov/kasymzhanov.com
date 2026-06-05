// Filled corner ticks for framed controls (input / buttons) — the shared "tick-box" pattern.
export function CornerTicks({ size = 6 }: { size?: number }) {
  const px = `${size}px`;
  const base = "pointer-events-none absolute bg-[var(--color-text)]";
  const sq = { width: px, height: px };
  return (
    <>
      <span className={`${base} top-0 left-0`} style={{ ...sq, clipPath: "polygon(0 0,100% 0,0 100%)" }} aria-hidden />
      <span className={`${base} top-0 right-0`} style={{ ...sq, clipPath: "polygon(0 0,100% 0,100% 100%)" }} aria-hidden />
      <span className={`${base} bottom-0 left-0`} style={{ ...sq, clipPath: "polygon(0 0,0 100%,100% 100%)" }} aria-hidden />
      <span className={`${base} bottom-0 right-0`} style={{ ...sq, clipPath: "polygon(100% 0,100% 100%,0 100%)" }} aria-hidden />
    </>
  );
}
