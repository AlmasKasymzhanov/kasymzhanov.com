import type { ReactNode } from "react";

// Monochrome monospace data table on thin rules.
export function MonoTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: ReactNode[][];
  caption?: ReactNode;
}) {
  return (
    <figure className="my-8 font-mono">
      <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="border-y border-[var(--color-border)]">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={`py-2 px-3 text-[11px] uppercase tracking-wider font-medium text-[var(--color-dim)] whitespace-nowrap ${
                    i === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={ri !== rows.length - 1 ? "border-b border-[var(--color-border)]/40" : ""}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`py-2 px-3 whitespace-nowrap ${
                      ci === 0
                        ? "text-left text-[var(--color-text)]"
                        : "text-right text-[var(--color-dim)]"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="text-[11px] text-[var(--color-dim)] mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
