// Filled corner ticks for framed controls (input / buttons) — the shared "tick-box" pattern.
// Offset by -1px so each tick overlaps the 1px border (same colour) — no seam/hairline.
export function CornerTicks({ size = 6 }: { size?: number }) {
  const px = `${size}px`;
  const base = "pointer-events-none absolute bg-[var(--color-text)]";
  const sq = { width: px, height: px };
  const off = "-1px";
  return (
    <>
      <span className={base} style={{ ...sq, top: off, left: off, clipPath: "polygon(0 0,100% 0,0 100%)" }} aria-hidden />
      <span className={base} style={{ ...sq, top: off, right: off, clipPath: "polygon(0 0,100% 0,100% 100%)" }} aria-hidden />
      <span className={base} style={{ ...sq, bottom: off, left: off, clipPath: "polygon(0 0,0 100%,100% 100%)" }} aria-hidden />
      <span className={base} style={{ ...sq, bottom: off, right: off, clipPath: "polygon(100% 0,100% 100%,0 100%)" }} aria-hidden />
    </>
  );
}
