/** Quantitative encodings. Domains are explicit and never depend on row order. */
export type HeatScale = { min?: number; max: number; center?: number; curve?: "linear" | "sqrt" };
export const finiteValue = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
export function heatEncoding(value: number | null | undefined, scale: HeatScale) {
  if (!finiteValue(value) || !finiteValue(scale.max)) return null;
  const min = scale.min ?? 0;
  if (scale.max <= min) return null;
  const center = scale.center;
  const diverging = finiteValue(center) && center > min && center < scale.max;
  const lower = diverging && value < center;
  const denominator = diverging ? (lower ? center - min : scale.max - center) : scale.max - min;
  const distance = diverging ? Math.abs(value - center) : value - min;
  const fraction = Math.max(0, Math.min(1, distance / denominator));
  const intensity = scale.curve === "sqrt" && !diverging ? Math.sqrt(fraction) : fraction;
  const color = diverging ? (lower ? "var(--chart-below)" : "var(--chart-above)") : "var(--chart-accent)";
  return { intensity, color, backgroundColor: `color-mix(in srgb, ${color} ${Number((intensity * 32).toFixed(2))}%, var(--personal-paper))` };
}

export function barFraction(value: number | null | undefined, max: number) {
  return finiteValue(value) && finiteValue(max) && max > 0 ? Math.max(0, Math.min(1, value / max)) : null;
}

export function sparklinePoints(values: readonly (number | null | undefined)[], width = 116, height = 32) {
  const finite = values.filter(finiteValue);
  if (!finite.length) return [];
  const min = Math.min(0, ...finite), max = Math.max(0, ...finite), span = max - min || 1;
  return values.map((value, index) => finiteValue(value) ? {
    x: 3 + index / Math.max(1, values.length - 1) * (width - 6),
    y: 3 + (max - value) / span * (height - 6), value,
  } : null);
}
