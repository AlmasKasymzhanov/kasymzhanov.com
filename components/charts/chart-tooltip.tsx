"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type TooltipRow = { label: string; value: string; color?: string };

export function useTooltipHover(onLeave: () => void) {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const keep = () => clearTimeout(timer.current);
  const leave = () => { keep(); timer.current = setTimeout(onLeave, 120); };
  useEffect(() => () => clearTimeout(timer.current), []);
  return { keep, leave };
}

export function ChartTooltipContent({ title, rows, note }: { title?: string; rows: TooltipRow[]; note?: string }) {
  return <>
    {title && <div className="chart-tooltip-title">{title}</div>}
    {rows.map((row, index) => <div className="chart-tooltip-row" key={`${row.label}-${index}`}>
      {row.color && <span className="chart-tooltip-swatch" style={{ background: row.color }} aria-hidden />}
      {row.label && <span className="chart-tooltip-label">{row.label}</span>}
      <span className="chart-tooltip-value">{row.value}</span>
    </div>)}
    {note && <div className="chart-tooltip-note">{note}</div>}
  </>;
}

/** A single theme-aware tooltip surface, outside chart clipping/scroll containers. */
export function ChartTooltipPortal({ anchor, children, id, onDismiss, onPointerEnter, onPointerLeave, align = 0.5 }: {
  anchor: Element | null; children: ReactNode; id?: string; align?: number;
  onDismiss?: () => void; onPointerEnter?: () => void; onPointerLeave?: () => void;
}) {
  const generatedId = useId();
  const tooltipId = id ?? generatedId;
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ left: 12, top: 12, visible: false });
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!anchor) return;
    const previous = anchor.getAttribute("aria-describedby");
    anchor.setAttribute("aria-describedby", [previous, tooltipId].filter(Boolean).join(" "));
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") onDismiss?.(); };
    document.addEventListener("keydown", escape);
    return () => {
      if (previous) anchor.setAttribute("aria-describedby", previous);
      else anchor.removeAttribute("aria-describedby");
      document.removeEventListener("keydown", escape);
    };
  }, [anchor, tooltipId, onDismiss]);
  useLayoutEffect(() => {
    if (!mounted || !anchor) return;
    const place = () => {
      if (!ref.current) return;
      // Portals leave report/article scopes; carry their chart palette with them.
      const theme = getComputedStyle(anchor);
      for (const name of Array.from(theme)) {
        if (name.startsWith("--")) ref.current.style.setProperty(name, theme.getPropertyValue(name));
      }
      const rect = anchor.getBoundingClientRect();
      const tip = ref.current.getBoundingClientRect();
      const margin = 12;
      const left = Math.max(margin, Math.min(rect.left + rect.width * align - tip.width / 2, window.innerWidth - tip.width - margin));
      const above = rect.top - tip.height - 10;
      const top = Math.max(margin, Math.min(above >= margin ? above : rect.bottom + 10, window.innerHeight - tip.height - margin));
      const hasContent = Boolean(ref.current.textContent?.trim());
      setPosition({ left, top, visible: hasContent && rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0 });
    };
    place();
    const observer = new ResizeObserver(place);
    if (ref.current) observer.observe(ref.current);
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => { observer.disconnect(); window.removeEventListener("scroll", place, true); window.removeEventListener("resize", place); };
  }, [anchor, mounted, align, children]);
  if (!mounted || !anchor) return null;
  return createPortal(<div ref={ref} id={tooltipId} role="tooltip" className="chart-tooltip-card"
    onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}
    style={{ left: position.left, top: position.top, visibility: position.visible ? "visible" : "hidden" }}>
    {children}
  </div>, document.body);
}

/** Data attributes opt individual custom diagram marks into the same interaction.
 * No values are inferred: a mark supplies rows or repeats its own visible labels. */
export function ChartTooltipScope({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pinned = useRef<Element | null>(null);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const cancelClose = () => clearTimeout(timer.current);
  const close = () => { cancelClose(); pinned.current = null; setAnchor(null); };
  const scheduleClose = () => { cancelClose(); if (!pinned.current) timer.current = setTimeout(() => setAnchor(null), 120); };
  const target = (node: EventTarget | null) => node instanceof Element ? node.closest<HTMLElement>("[data-chart-inspect]") : null;
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      const node = event.target as Element;
      if (node.closest?.(".chart-tooltip-card") || node.closest?.("[data-chart-inspect]")) return;
      pinned.current = null; setAnchor(null);
    };
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("pointerdown", outside); clearTimeout(timer.current); };
  }, []);
  let rows: TooltipRow[] = [];
  if (anchor?.dataset.chartRows) {
    try { rows = JSON.parse(anchor.dataset.chartRows) as TooltipRow[]; } catch { /* Visible content remains available. */ }
  }
  const visibleText = anchor?.innerText?.trim() ?? anchor?.textContent?.trim();
  return <div ref={root} className="chart-tooltip-scope min-w-0"
    onPointerOver={(event) => { if (event.pointerType !== "mouse") return; const next = target(event.target); if (next) { cancelClose(); pinned.current = null; setAnchor(next); } }}
    onPointerOut={(event) => { const next = target(event.relatedTarget); if (!next) scheduleClose(); }}
    onFocus={(event) => { const next = target(event.target); if (next) { cancelClose(); setAnchor(next); } }}
    onBlur={(event) => { if (!target(event.relatedTarget)) close(); }}
    onPointerUp={(event) => { if (event.pointerType === "mouse") return; const next = target(event.target); if (next) { pinned.current = pinned.current === next ? null : next; setAnchor(pinned.current as HTMLElement | null); } }}
    onKeyDown={(event) => { if (event.key === "Escape") close(); }}>
    {children}
    {anchor && <ChartTooltipPortal anchor={anchor} onDismiss={close} onPointerEnter={cancelClose} onPointerLeave={scheduleClose}>
      <ChartTooltipContent title={anchor.dataset.chartTitle} rows={rows.length ? rows : [{ label: "", value: visibleText ?? "" }]} />
    </ChartTooltipPortal>}
  </div>;
}
