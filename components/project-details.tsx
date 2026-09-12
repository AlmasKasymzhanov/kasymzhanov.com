"use client";

import { useState, type ReactNode } from "react";
import { IconlyArrowUpRight, IconlyChevronDown } from "@/components/iconly-icons";

export function ProjectDetails({
  id, name, disciplines, href, newTabLabel, detailsLabel, visitLabel, logo, children,
}: {
  id: string;
  name: string;
  disciplines: string;
  href?: string;
  newTabLabel: string;
  detailsLabel: string;
  visitLabel: string;
  logo: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const detailsId = `${id}-details`;
  const nameClassName = "flex min-h-11 shrink-0 items-center gap-3 rounded-[3px] text-[16px] font-normal tracking-[-0.01em] text-[var(--personal-text)] sm:text-[17px]";

  return (
    <div>
      <div className="grid min-h-[52px] grid-cols-[minmax(0,1fr)] items-center gap-x-1 py-1 sm:grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name}${newTabLabel}`}
              className={`group ${nameClassName} no-underline transition-colors duration-[120ms] hover:text-[var(--personal-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--personal-text)] motion-reduce:transition-none`}
            >
              {logo}
              <span>{name}</span>
            </a>
          ) : (
            <span className={nameClassName}>{logo}<span>{name}</span></span>
          )}
          <span className="inline-flex shrink-0 items-center">
            <button
              type="button"
              aria-label={`${detailsLabel}: ${name}`}
              aria-expanded={open}
              aria-controls={detailsId}
              onClick={() => setOpen((current) => !current)}
              className={`flex size-11 cursor-pointer items-center rounded-[3px] pl-1.5 transition-colors duration-[120ms] hover:text-[var(--personal-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--personal-text)] motion-reduce:transition-none ${open ? "text-[var(--personal-text)]" : "text-[var(--personal-muted)]"}`}
            >
              <IconlyChevronDown className={`transition-transform duration-[150ms] ease-out motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
            </button>
          </span>
        </div>
        <span className="col-start-1 row-start-2 pl-11 text-[12px] leading-5 text-[var(--personal-muted)] sm:col-start-2 sm:row-start-1 sm:justify-self-end sm:pl-2 sm:text-right sm:text-[14px]">
          {disciplines}
        </span>
      </div>
      <div
        id={detailsId}
        hidden={!open}
        className="pb-5 pl-11 pt-2 text-[14px] font-normal leading-[1.65] text-[var(--personal-muted)] sm:pr-11"
      >
        {children}
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${visitLabel} ${new URL(href).hostname}${newTabLabel}`}
            className="mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-[3px] text-[var(--personal-muted)] underline decoration-[var(--personal-border)] underline-offset-4 transition-colors duration-[120ms] hover:text-[var(--personal-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--personal-text)] sm:no-underline motion-reduce:transition-none"
          >
            <span>{visitLabel} {new URL(href).hostname}</span>
            <IconlyArrowUpRight />
          </a>
        )}
      </div>
    </div>
  );
}
