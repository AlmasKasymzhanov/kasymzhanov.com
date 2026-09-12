"use client";

import { useEffect, useRef, useState } from "react";
import { MaterialViews } from "@/components/engagement/material-views";

/** Estimates visible report prose; never invents a publication date. */
export function ResearchReadingTime() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [minutes, setMinutes] = useState<number>();
  useEffect(() => {
    const body = ref.current?.closest(".personal-report");
    if (!(body instanceof HTMLElement)) return;
    const words = body.innerText.match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
    setMinutes(Math.max(1, Math.ceil(words / 180)));
  }, []);
  return <p ref={ref} className="research-reading-time">{minutes ? `Около ${minutes} мин на чтение` : "Исследование"}<MaterialViews inline /></p>;
}
