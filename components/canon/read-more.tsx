// "Читать подробнее" with a play-triangle that vertically rolls on hover.
// Reproduces the Spade "Read more" interaction. Put a `group` on the parent (e.g. the card link).
const TRI = "M2.0326 15.6442L0 13.5799L0 2.0643L2.0326 0L21.48 7.27606L21.48 8.36816L2.0326 15.6442Z";

function Tri() {
  return (
    <svg viewBox="0 0 22 16" className="h-full w-full fill-[var(--color-text)]" aria-hidden>
      <path d={TRI} />
    </svg>
  );
}

export function ReadMore({ label = "Читать подробнее" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[14px] font-bold text-[var(--color-text)]">
      <span className="relative inline-block h-[11px] w-[15px] overflow-hidden shrink-0">
        <span className="absolute inset-0 grid place-items-center transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0">
          <Tri />
        </span>
        <span className="absolute inset-0 grid place-items-center translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <Tri />
        </span>
      </span>
      {label}
    </span>
  );
}
