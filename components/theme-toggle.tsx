"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(t: Theme) {
  document.documentElement.classList.toggle("light", t === "light");
}

function SunIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9998 2.25C12.414 2.25 12.7498 2.58579 12.7498 3V4.3719C12.7498 4.78612 12.414 5.1219 11.9998 5.1219C11.5856 5.1219 11.2498 4.78612 11.2498 4.3719V3C11.2498 2.58579 11.5856 2.25 11.9998 2.25ZM18.8939 5.10549C19.1868 5.39839 19.1868 5.87326 18.8939 6.16616L17.9239 7.13622C17.631 7.42911 17.1561 7.42911 16.8632 7.13622C16.5703 6.84332 16.5703 6.36845 16.8632 6.07556L17.8333 5.10549C18.1262 4.8126 18.601 4.8126 18.8939 5.10549ZM5.83472 6.60636C5.83472 6.19215 6.17051 5.85636 6.58472 5.85636H6.60612C7.02033 5.85636 7.35612 6.19215 7.35612 6.60636C7.35612 7.02058 7.02033 7.35636 6.60612 7.35636H6.58472C6.17051 7.35636 5.83472 7.02058 5.83472 6.60636ZM3.33203 12.0001C3.33203 11.5859 3.66782 11.2501 4.08203 11.2501H4.37166C4.78587 11.2501 5.12166 11.5859 5.12166 12.0001C5.12166 12.4143 4.78587 12.7501 4.37166 12.7501H4.08203C3.66782 12.7501 3.33203 12.4143 3.33203 12.0001ZM18.8779 12.0001C18.8779 11.5859 19.2136 11.2501 19.6279 11.2501H20.9998C21.414 11.2501 21.7498 11.5859 21.7498 12.0001C21.7498 12.4143 21.414 12.7501 20.9998 12.7501H19.6279C19.2136 12.7501 18.8779 12.4143 18.8779 12.0001ZM7.13715 16.8642C7.42966 17.1574 7.42903 17.6323 7.13575 17.9248L6.75717 18.3024C6.46389 18.5949 5.98902 18.5943 5.69651 18.301C5.40401 18.0077 5.40464 17.5328 5.69792 17.2403L6.07649 16.8628C6.36977 16.5703 6.84465 16.5709 7.13715 16.8642ZM16.8683 16.8585C17.1639 16.5684 17.6388 16.5729 17.9289 16.8685L18.6769 17.6308C18.967 17.9265 18.9625 18.4013 18.6668 18.6914C18.3712 18.9815 17.8963 18.977 17.6062 18.6814L16.8582 17.9191C16.5681 17.6234 16.5726 17.1486 16.8683 16.8585ZM11.9998 18.8781C12.414 18.8781 12.7498 19.2139 12.7498 19.6281L12.7498 20.3402C12.7498 20.7544 12.4141 21.0902 11.9999 21.0902C11.5856 21.0902 11.2498 20.7544 11.2498 20.3402L11.2498 19.6281C11.2498 19.2139 11.5856 18.8781 11.9998 18.8781Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.0002 8.55469C10.0969 8.55469 8.55469 10.0976 8.55469 12.0002C8.55469 13.9038 10.097 15.4466 12.0002 15.4466C13.9034 15.4466 15.4457 13.9038 15.4457 12.0002C15.4457 10.0976 13.9035 8.55469 12.0002 8.55469ZM7.05469 12.0002C7.05469 9.26941 9.26821 7.05469 12.0002 7.05469C14.7322 7.05469 16.9457 9.26941 16.9457 12.0002C16.9457 14.7318 14.7323 16.9466 12.0002 16.9466C9.2681 16.9466 7.05469 14.7318 7.05469 12.0002Z" fill="currentColor" />
    </svg>
  );
}

function MoonIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12.1827 21.7423C6.71269 21.7423 2.25269 17.2923 2.25269 11.8123C2.25269 7.40231 5.21269 3.48233 9.44269 2.27233C9.73269 2.19233 10.1027 2.31232 10.2927 2.54232C10.4927 2.79232 10.5327 3.14234 10.3727 3.43234C8.84269 6.32234 9.38269 9.96231 11.7127 12.2823C14.0327 14.6023 17.6727 15.1523 20.5627 13.6123C20.8327 13.4723 21.2227 13.5123 21.4527 13.7023C21.6827 13.8923 21.8027 14.2623 21.7227 14.5523C20.5127 18.7923 16.5827 21.7523 12.1827 21.7523V21.7423ZM8.41269 4.28231C5.61269 5.69231 3.75269 8.60232 3.75269 11.8223C3.75269 16.4723 7.53269 20.2523 12.1827 20.2523C15.4027 20.2523 18.3127 18.3923 19.7227 15.5823C16.5827 16.5523 13.0427 15.7323 10.6627 13.3423C8.28269 10.9623 7.45269 7.42231 8.42269 4.28231H8.41269Z" fill="currentColor" />
    </svg>
  );
}

const OPTIONS: { value: Theme; Icon: ({ size }: { size?: number }) => React.ReactElement; label: string }[] = [
  { value: "light", Icon: SunIcon, label: "Светлая тема" },
  { value: "dark", Icon: MoonIcon, label: "Тёмная тема" },
];

// Segmented theme switch — styled after 10b.kz (active = raised bg pill, blue focus ring).
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const initial: Theme = saved === "dark" ? "dark" : "light";
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const choose = (t: Theme) => {
    setTheme(t);
    localStorage.setItem("theme", t);
    applyTheme(t);
  };

  if (!mounted) {
    return (
      <div
        className="h-[34px] w-[66px] rounded-full border border-[var(--color-border)] bg-[var(--color-text)]/5"
        aria-hidden
      />
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Тема оформления"
      className="inline-flex items-center gap-0.5 rounded-full border border-[var(--color-border)] p-0.5 bg-[var(--color-text)]/5"
    >
      {OPTIONS.map(({ value, Icon, label }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            onClick={() => choose(value)}
            className={`flex size-7 items-center justify-center rounded-full transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-brand)]/60 ${
              active
                ? "bg-[var(--color-bg)] text-[var(--color-text)] shadow-sm"
                : "text-[var(--color-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-text)]/8"
            }`}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
}
