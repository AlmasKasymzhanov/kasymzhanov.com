"use client";

/**
 * DuelChart — a head-to-head "duel" graphic (FT/Bloomberg comparison card,
 * not in the registry yet). Two competitors face off across N parameters from
 * a central spine: each row diverges left/right, the bar length encoding the
 * magnitude (normalised within the row) and the single warm accent
 * (--brock-accent) marking the "worse" side. Numbers in Hack mono
 * (tabular-nums); the neutral side stays graphite (--brock-neutral). No
 * rainbow, no table — the centre spine + diverging bars + verdict tally read
 * as a designed chart, not a grid.
 *
 * Heterogeneous by design: rows with a numeric `n` on both sides draw
 * proportional diverging bars; text-only rows (financing, anchor client…)
 * render as a labelled face-off with the worse side in accent. Both share the
 * same two-column / centre-spine grammar so the chart stays coherent.
 *
 * Zero-dependency, theme-token driven, mobile-first (the two columns hold on
 * narrow widths; the spine and bars scale down with the container).
 */

export type DuelSideValue = {
  /** Value text shown (number, range, or short phrase). */
  value: string;
  /**
   * Numeric magnitude used to size this side's diverging bar. Omit on both
   * sides for a text-only face-off row (no bars drawn).
   */
  n?: number;
  /** When true this side is the "worse" one and takes the red accent. */
  worse?: boolean;
};

export type DuelRow = {
  /** Parameter being compared (centred row label). */
  param: string;
  left: DuelSideValue;
  right: DuelSideValue;
};

function SideValue({ side, align }: { side: DuelSideValue; align: "left" | "right" }) {
  return (
    <div
      className={[
        "font-mono text-[12.5px] leading-snug tabular-nums",
        align === "right" ? "text-right" : "text-left",
        side.worse
          ? "font-bold text-[var(--brock-accent)]"
          : "text-[var(--color-text)]",
      ].join(" ")}
    >
      {side.value}
    </div>
  );
}

function SideBar({
  pct,
  worse,
  align,
}: {
  pct: number;
  worse?: boolean;
  align: "left" | "right";
}) {
  return (
    <div className="mt-1.5 h-[7px] w-full">
      <div
        className={[
          "h-full rounded-[1px]",
          align === "right" ? "ml-auto" : "mr-auto",
        ].join(" ")}
        style={{
          width: `${Math.max(pct, pct > 0 ? 3 : 0)}%`,
          background: worse ? "var(--brock-accent)" : "var(--brock-neutral)",
        }}
      />
    </div>
  );
}

export function DuelChart({
  rows,
  leftLabel,
  rightLabel,
  leftTag,
  rightTag,
  /** Which side is the article's subject — its losses drive the verdict tally. */
  verdictSide = "right",
}: {
  rows: readonly DuelRow[];
  leftLabel: string;
  rightLabel: string;
  leftTag?: string;
  rightTag?: string;
  verdictSide?: "left" | "right";
}) {
  const subjectLabel = verdictSide === "right" ? rightLabel : leftLabel;
  const losses = rows.filter((r) =>
    verdictSide === "right" ? r.right.worse : r.left.worse,
  ).length;

  return (
    <div className="w-full font-mono">
      {/* Competitor zones — neutral side left, accent (subject) side right. */}
      <div className="grid grid-cols-2 items-end gap-0">
        <div className="border-r border-[var(--color-border)] pr-3 text-right">
          <div className="text-[14px] font-bold tracking-tight text-[var(--color-text)]">
            {leftLabel}
          </div>
          {leftTag ? (
            <div className="mt-0.5 text-[10px] uppercase tracking-wider text-[var(--color-dim)]">
              {leftTag}
            </div>
          ) : null}
        </div>
        <div className="pl-3 text-left">
          <div className="text-[14px] font-bold tracking-tight text-[var(--brock-accent)]">
            {rightLabel}
          </div>
          {rightTag ? (
            <div className="mt-0.5 text-[10px] uppercase tracking-wider text-[var(--color-dim)]">
              {rightTag}
            </div>
          ) : null}
        </div>
      </div>

      {/* Rows — each diverges from the centre spine. */}
      <div className="mt-4 space-y-4">
        {rows.map((row) => {
          const numeric = row.left.n != null && row.right.n != null;
          const rowMax = Math.max(row.left.n ?? 0, row.right.n ?? 0) || 1;
          const lPct = numeric ? ((row.left.n ?? 0) / rowMax) * 100 : 0;
          const rPct = numeric ? ((row.right.n ?? 0) / rowMax) * 100 : 0;
          return (
            <div key={row.param}>
              <div className="text-center text-[10px] uppercase tracking-wider text-[var(--color-dim)]">
                {row.param}
              </div>
              <div className="mt-1 grid grid-cols-2 gap-0">
                <div className="border-r border-[var(--color-border)] pr-3">
                  <SideValue side={row.left} align="right" />
                  {numeric ? (
                    <SideBar pct={lPct} worse={row.left.worse} align="right" />
                  ) : null}
                </div>
                <div className="pl-3">
                  <SideValue side={row.right} align="left" />
                  {numeric ? (
                    <SideBar pct={rPct} worse={row.right.worse} align="left" />
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verdict tally. */}
      <div className="mt-5 border-t border-[var(--color-border)] pt-2.5 text-center text-[11px] text-[var(--color-dim)]">
        {subjectLabel} уступает по{" "}
        <span className="font-bold tabular-nums text-[var(--brock-accent)]">
          {losses}
        </span>{" "}
        из {rows.length} параметров
      </div>
    </div>
  );
}
