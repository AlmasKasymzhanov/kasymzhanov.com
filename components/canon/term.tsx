"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/*
 * Canon tooltip primitives.
 * Desktop — opens on hover/focus; mobile — opens on tap, closes on tap-outside.
 * The popover is interactive: a short close-delay + hover bridge keeps it open
 * while the pointer travels onto it, so links inside the tip stay clickable.
 * Monochrome only (no accent): a dotted underline marks an explainable term,
 * a small superscript marks a footnote. Popover is fixed-positioned and
 * viewport-clamped so it never clips inside the narrow article column.
 */

function useTip() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const popRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);

  const cancelClose = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);
  const openNow = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);
  const closeSoon = useCallback(() => {
    cancelClose();
    timer.current = setTimeout(() => setOpen(false), 140);
  }, [cancelClose]);
  const toggle = useCallback(() => {
    cancelClose();
    setOpen((o) => !o);
  }, [cancelClose]);

  // Touch: handle the tap on pointerdown and preventDefault, which suppresses
  // the synthesized mouseenter→click cascade that otherwise opened-then-toggled
  // the tip closed on the same tap (so it only appeared on the SECOND tap).
  // Mouse keeps hover (mouseenter) + click; keyboard keeps focus/blur.
  const touched = useRef(false);
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse") {
        touched.current = true;
        e.preventDefault();
        toggle();
      }
    },
    [toggle],
  );
  const onClick = useCallback(() => {
    if (touched.current) {
      touched.current = false; // swallow the synthetic click that may follow a touch
      return;
    }
    toggle();
  }, [toggle]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  const place = useCallback(() => {
    const t = triggerRef.current;
    if (!t) return;
    const r = t.getBoundingClientRect();
    const margin = 12;
    const maxW = Math.min(300, window.innerWidth - margin * 2);
    let left = r.left + r.width / 2 - maxW / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - margin - maxW));
    setPos({ top: r.bottom + 8, left, width: maxW });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    place();
    const onMove = () => place();
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return;
      if (popRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return { open, triggerRef, popRef, pos, openNow, closeSoon, cancelClose, onClick, onPointerDown };
}

function Popover({
  popRef,
  pos,
  onMouseEnter,
  onMouseLeave,
  children,
}: {
  popRef: React.RefObject<HTMLSpanElement | null>;
  pos: { top: number; left: number; width: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}) {
  return (
    <span
      ref={popRef}
      role="tooltip"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width, zIndex: 60, whiteSpace: "normal" }}
      className="block font-mono text-[12px] leading-[1.55] text-[var(--color-dim)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[3px] p-3 shadow-lg [overflow-wrap:anywhere]"
    >
      {children}
    </span>
  );
}

/**
 * Inline term with a dotted underline; shows `tip` on hover/tap. `tip` may contain links.
 * `accent` paints the trigger in the brand accent (blue in light, mint in dark) — used
 * sparingly for a meaningful brand mention, per the source/credit canon.
 */
export function Term({
  children,
  tip,
  accent = false,
  focusable = true,
}: {
  children: React.ReactNode;
  tip: React.ReactNode;
  accent?: boolean;
  /** Set false inside aria-hidden hosts (e.g. chart label gutters) so we don't
   *  put a focusable node in a hidden subtree — hover/tap still work. */
  focusable?: boolean;
}) {
  const { open, triggerRef, popRef, pos, openNow, closeSoon, cancelClose, onClick, onPointerDown } = useTip();
  return (
    <span className="relative inline">
      <span
        ref={triggerRef}
        tabIndex={focusable ? 0 : undefined}
        role="button"
        aria-expanded={open}
        onPointerDown={onPointerDown}
        onClick={onClick}
        onMouseEnter={openNow}
        onMouseLeave={closeSoon}
        onFocus={openNow}
        onBlur={closeSoon}
        className={
          // Body usage paints a dotted text-decoration (it follows line wraps).
          // Chart-gutter labels (focusable=false) render NO decoration here: the
          // trigger overflows the chart's truncating overflow:hidden column, and
          // iOS Safari won't paint a decoration/border on the clipped-away part
          // of an overflowing inline. The visible dotted affordance is drawn by
          // the chart on the clip box itself (LabelColumn, labelInteractive).
          !focusable
            ? "cursor-help"
            : accent
              ? "cursor-help text-[var(--color-brand)] underline decoration-dotted decoration-[var(--color-brand)]/50 underline-offset-[3px] hover:decoration-[var(--color-brand)] transition-colors"
              : "cursor-help underline decoration-dotted decoration-[var(--color-dim)] underline-offset-[3px] hover:decoration-[var(--color-text)] transition-colors"
        }
      >
        {children}
      </span>
      {open && pos && (
        <Popover popRef={popRef} pos={pos} onMouseEnter={cancelClose} onMouseLeave={closeSoon}>
          {tip}
        </Popover>
      )}
    </span>
  );
}

/** Footnote marker — small superscript number; shows `tip` on hover/tap. */
export function Fn({ n, tip }: { n: number; tip: React.ReactNode }) {
  const { open, triggerRef, popRef, pos, openNow, closeSoon, cancelClose, onClick, onPointerDown } = useTip();
  return (
    <span className="relative inline">
      <span
        id={`fnref-${n}`}
        ref={triggerRef}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={`Сноска ${n}`}
        onPointerDown={onPointerDown}
        onClick={onClick}
        onMouseEnter={openNow}
        onMouseLeave={closeSoon}
        onFocus={openNow}
        onBlur={closeSoon}
        className="cursor-help align-super text-[10px] text-[var(--color-dim)] hover:text-[var(--color-text)] transition-colors"
      >
        {n}
      </span>
      {open && pos && (
        <Popover popRef={popRef} pos={pos} onMouseEnter={cancelClose} onMouseLeave={closeSoon}>
          {tip}
        </Popover>
      )}
    </span>
  );
}
