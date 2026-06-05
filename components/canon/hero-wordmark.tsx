"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "0123456789";
const TARGET = "A.KASYMZHANOV";

// Masthead "A.KASYMZHANO▼" with a digit-scramble → name reveal on load.
export function HeroWordmark({ size = "hero" }: { size?: "hero" | "header" }) {
  const [text, setText] = useState(TARGET);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(true);
      return;
    }

    let raf = 0;
    let frame = 0;
    const lockAt = TARGET.split("").map((_, i) => 8 + i * 3);
    const maxFrame = lockAt[lockAt.length - 1] + 2;

    const step = () => {
      frame++;
      let out = "";
      for (let i = 0; i < TARGET.length; i++) {
        const c = TARGET[i];
        if (c === "." || c === " ") {
          out += c;
        } else {
          out += frame >= lockAt[i] ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
      }
      setText(out);
      if (frame < maxFrame) {
        raf = requestAnimationFrame(step);
      } else {
        setDone(true);
      }
    };

    setText(TARGET.replace(/[A-Z]/g, () => GLYPHS[(Math.random() * 10) | 0]));
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const sizeCls =
    size === "header"
      ? "text-[19px] md:text-[25px] tracking-[0.12em]"
      : "text-[38px] sm:text-[56px] md:text-[74px] tracking-[0.04em]";
  const base = `font-mono font-bold uppercase leading-[0.95] text-[var(--color-text)] ${sizeCls} select-none`;

  if (!done) {
    return (
      <h1 aria-label="A. Kasymzhanov" className={`${base} tabular-nums`}>
        {text}
      </h1>
    );
  }

  return (
    <h1 aria-label="A. Kasymzhanov" className={`${base} inline-flex items-baseline`}>
      <span>A</span>
      {/* square dot = period */}
      <span
        aria-hidden
        className="inline-block w-[0.18em] h-[0.18em] bg-[var(--color-text)] ml-[0.05em] mr-[0.34em]"
      />
      <span>KASYMZHANO</span>
      {/* inverted filled triangle = V */}
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        className="inline-block w-[0.72em] h-[0.88em] ml-[0.04em] translate-y-[0.02em] fill-[var(--color-text)]"
      >
        <polygon points="0,0 12,0 6,12" />
      </svg>
    </h1>
  );
}
