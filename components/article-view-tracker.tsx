"use client";

import { useEffect, useRef } from "react";

/** Count a visible article visit, never a link preview or a local development visit. */
export function ArticleViewTracker({ slug }: { slug: string }) {
  const recordedSlug = useRef<string | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" ||
        ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname)) return;

    function recordView() {
      if (document.visibilityState !== "visible" || recordedSlug.current === slug) return;
      recordedSlug.current = slug;
      void fetch("/api/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
        keepalive: true,
      }).catch(() => {});
    }

    recordView();
    document.addEventListener("visibilitychange", recordView);
    return () => document.removeEventListener("visibilitychange", recordView);
  }, [slug]);

  return null;
}
