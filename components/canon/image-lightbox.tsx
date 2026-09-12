"use client";
import { IconlyChevronLeft, IconlyChevronRight } from "@/components/iconly-icons";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
};

export function ImageLightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: readonly LightboxItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [imageFailed, setImageFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const item = items[index];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setZoom(1);
    setImageFailed(false);
  }, [index]);

  useEffect(() => {
    if (!mounted) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowLeft" && items.length > 1) {
        event.preventDefault();
        onIndexChange((index - 1 + items.length) % items.length);
      } else if (event.key === "ArrowRight" && items.length > 1) {
        event.preventDefault();
        onIndexChange((index + 1) % items.length);
      } else if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])",
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [index, items.length, mounted, onClose, onIndexChange]);

  if (!item || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-2 text-white backdrop-blur-[2px] sm:p-6"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Просмотр изображения"
        className="flex max-h-[calc(100dvh-1rem)] w-full max-w-[1200px] flex-col overflow-hidden rounded-[4px] border border-white/20 bg-black shadow-2xl sm:max-h-[calc(100dvh-3rem)]"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <div className="flex min-h-14 shrink-0 items-center justify-between gap-3 border-b border-white/20 px-3 sm:px-5">
          <p className="min-w-0 truncate font-mono text-[11px] text-white/70">
            {items.length > 1 ? `${index + 1} / ${items.length}` : "Оригинал"}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoom((value) => Math.max(1, value - 0.5))}
              disabled={zoom <= 1 || imageFailed}
              className="grid size-9 place-items-center rounded border border-white/30 text-lg disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Уменьшить"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => setZoom((value) => Math.min(3, value + 0.5))}
              disabled={zoom >= 3 || imageFailed}
              className="grid size-9 place-items-center rounded border border-white/30 text-lg disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Увеличить"
            >
              +
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="grid size-9 place-items-center rounded border border-white/30 text-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Закрыть"
            >
              ×
            </button>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => onIndexChange((index - 1 + items.length) % items.length)}
              className="absolute left-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/75 text-2xl shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-4 sm:size-11"
              aria-label="Предыдущее изображение"
            >
              <IconlyChevronLeft size={17} className="reading-inline-icon" />
            </button>
          )}

          <div className="flex min-h-0 w-full touch-pan-x touch-pan-y items-center justify-center overflow-auto px-14 py-3 sm:px-20 sm:py-6">
            {imageFailed ? (
              <div className="flex min-h-40 max-w-sm flex-col items-center justify-center gap-3 text-center">
                <p className="text-[13px] leading-relaxed text-white/75">Изображение не загрузилось.</p>
                <button
                  type="button"
                  onClick={() => {
                    setImageFailed(false);
                    setRetry((value) => value + 1);
                  }}
                  className="rounded border border-white/30 px-3 py-2 text-[12px] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Повторить
                </button>
              </div>
            ) : (
              /* Plain img intentionally bypasses optimization: the evidence lightbox
                 must display the archived original pixels. */
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${item.src}-${retry}`}
                src={item.src}
                alt={item.alt}
                draggable={false}
                onError={() => setImageFailed(true)}
                className="block h-auto select-none object-contain"
                style={{
                  width: zoom === 1 ? "auto" : `${zoom * 100}%`,
                  maxWidth: zoom === 1 ? "100%" : "none",
                  maxHeight: zoom === 1 ? "calc(100dvh - 11rem)" : "none",
                }}
              />
            )}
          </div>

          {items.length > 1 && (
            <button
              type="button"
              onClick={() => onIndexChange((index + 1) % items.length)}
              className="absolute right-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/75 text-2xl shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4 sm:size-11"
              aria-label="Следующее изображение"
            >
              <IconlyChevronRight size={17} className="reading-inline-icon" />
            </button>
          )}
        </div>

        {item.caption && (
          <p className="max-h-20 shrink-0 overflow-y-auto border-t border-white/20 px-4 py-3 text-center text-[12px] leading-relaxed text-white/75">
            {item.caption}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}
