"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { localeFromPathname, bcp47, dict } from "@/lib/i18n";

export function ViewCounter({ slug, track = true }: { slug: string; track?: boolean }) {
  const locale = localeFromPathname(usePathname() ?? "/");
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    if (track) {
      fetch("/api/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })
        .then((r) => r.json())
        .then((d) => setViews(d.count))
        .catch(() => {});
    } else {
      fetch(`/api/views?slug=${slug}`)
        .then((r) => r.json())
        .then((d) => setViews(d.count))
        .catch(() => {});
    }
  }, [slug, track]);

  if (views === null) return null;

  return (
    <span className="font-mono text-[11px] text-[var(--color-dim)]/60 tabular-nums">
      {views.toLocaleString(bcp47[locale])} {dict[locale].engage.viewsLabel}
    </span>
  );
}
