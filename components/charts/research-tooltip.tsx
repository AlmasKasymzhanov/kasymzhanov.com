"use client";

import { useEffect, useRef, useState } from "react";
import { ChartTooltipContent, ChartTooltipPortal } from "./chart-tooltip";

export type ResearchTooltipProps = {
  active?: boolean; label?: string | number; title?: string; unit?: string;
  payload?: ReadonlyArray<{ value?: number | string | null; name?: string; color?: string }>;
};

export function ResearchTooltip({ active, payload, label, title, unit = "" }: ResearchTooltipProps) {
  const [anchor, setAnchor] = useState<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const last = useRef({ payload, label });
  useEffect(() => {
    if (active) { last.current = { payload, label }; setShown(true); }
    else if (!hovered) { const timer = setTimeout(() => setShown(false), 120); return () => clearTimeout(timer); }
  }, [active, hovered, payload, label]);
  useEffect(() => setDismissed(false), [label, active]);
  const points = active ? payload : last.current.payload;
  const heading = active ? label : last.current.label;
  return <>
    <span ref={setAnchor} aria-hidden style={{ display: "block", width: 1, height: 1 }} />
    {shown && !dismissed && points?.length ? <ChartTooltipPortal anchor={anchor}
      onDismiss={() => setDismissed(true)} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
    <ChartTooltipContent title={heading == null ? undefined : String(heading)} rows={points
      .filter(point => point.value != null)
      .map(point => ({ label: title || point.name || "", color: point.color,
        value: unit === "×" ? `×${point.value}` : `${typeof point.value === "number" ? point.value.toLocaleString("ru-RU", { maximumFractionDigits: 20 }) : point.value}${unit ? ` ${unit}` : ""}` }))} />
    </ChartTooltipPortal> : null}
  </>;
}
