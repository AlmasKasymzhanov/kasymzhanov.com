// Inline ASCII sparkline — renders a number series as ▁▂▃▄▅▆▇█.
const BARS = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];

export function Sparkline({
  data,
  delta,
  className = "",
}: {
  data: number[];
  delta?: string;
  className?: string;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const spark = data
    .map((v) => BARS[Math.round(((v - min) / range) * (BARS.length - 1))])
    .join("");

  return (
    <span className={`font-mono inline-flex items-center gap-2 ${className}`}>
      <span className="text-[var(--color-text)] text-[15px] tracking-[0.05em]">{spark}</span>
      {delta && <span className="text-[var(--color-dim)] text-[12px]">{delta}</span>}
    </span>
  );
}
