"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { contentSlug } from "@/lib/content-identity";

export function MaterialViews({ slug, inline = false }: { slug?: string; inline?: boolean }) {
  const pathname = usePathname() ?? "/";
  const key = slug ?? contentSlug(pathname);
  const en = pathname.startsWith("/en/");
  const [result, setResult] = useState<{ key: string; count: number } | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    void fetch(`/api/views?slug=${encodeURIComponent(key)}`, { signal: controller.signal })
      .then(async response => response.ok ? response.json() : null)
      .then(data => {
        if (data && Number.isSafeInteger(data.count) && data.count >= 0) setResult({ key, count: data.count });
      }).catch(() => {});
    return () => controller.abort();
  }, [key]);
  if (!result || result.key !== key) return null;
  const n = result.count;
  const word = en ? (n === 1 ? "view" : "views") : n % 10 === 1 && n % 100 !== 11 ? "просмотр" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? "просмотра" : "просмотров";
  return <span className="reading-view-count" data-material-views>
    {inline && <span aria-hidden className="reading-metadata-dot">·</span>}
    {n.toLocaleString(en ? "en-US" : "ru-RU")} {word}
  </span>;
}
