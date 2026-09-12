"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconlyDocument, IconlyFolder, IconlyFolderOpen } from "@/components/iconly-icons";
import { personalHomePath, type PersonalLocale } from "@/lib/personal-locale";

type ActiveSection = "about" | "project-redstat" | "project-10b" | "project-prooftotal" | "articles" | null;

type TreeFile = {
  label: string;
  href: string;
  external?: boolean;
  sectionId?: ActiveSection;
};

type TreeFolder = {
  id: string;
  label: string;
  files: TreeFile[];
  routePrefixes?: string[];
};

function useActiveSection() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("about");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const hashSection = window.location.hash.slice(1);
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

      if (
        atPageEnd &&
        (hashSection === "project-redstat" || hashSection === "project-10b" || hashSection === "project-prooftotal")
      ) {
        setActiveSection(hashSection);
        return;
      }

      const marker = Math.min(420, window.innerHeight * 0.5);
      let next: ActiveSection = "about";

      for (const id of ["project-redstat", "project-10b", "project-prooftotal", "articles"] as const) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) next = id;
      }

      setActiveSection((current) => (current === next ? current : next));
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  return activeSection;
}

function FileRow({
  file,
  activeSection,
  pathname,
  nested = false,
}: {
  file: TreeFile;
  activeSection: ActiveSection;
  pathname: string;
  nested?: boolean;
}) {
  const route = file.href.split("#")[0];
  const active = (route === pathname && file.sectionId === activeSection) || (!file.sectionId && route === pathname);
  const className = `group flex min-h-8 items-center gap-2 rounded-[3px] leading-5 no-underline transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--personal-rail-focus)] ${nested ? "pl-[25px] pr-1 text-[13px]" : "px-1 text-[14px]"} ${active ? "font-medium text-[var(--personal-rail-text)]" : "font-normal text-[var(--personal-rail-muted)] hover:text-[var(--personal-rail-text)]"}`;

  const content = (
    <>
      <IconlyDocument size={nested ? 15 : 17} className="shrink-0" />
      <span className="truncate">{file.label}</span>
    </>
  );

  if (file.external) {
    return (
      <a href={file.href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={file.href} aria-current={active ? "location" : undefined} className={className}>
      {content}
    </Link>
  );
}

function FolderIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative size-[18px] shrink-0">
      <IconlyFolder
        className={`absolute inset-0 transition-[opacity,scale,filter] duration-150 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${open ? "scale-25 opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0"}`}
      />
      <IconlyFolderOpen
        className={`absolute inset-0 transition-[opacity,scale,filter] duration-150 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${open ? "scale-100 opacity-100 blur-0" : "scale-25 opacity-0 blur-[4px]"}`}
      />
    </span>
  );
}

function FolderRow({
  folder,
  activeSection,
  pathname,
  defaultOpen = false,
}: {
  folder: TreeFolder;
  activeSection: ActiveSection;
  pathname: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const childrenId = `personal-tree-${folder.id}`;
  const containsActiveSection = folder.routePrefixes?.some((prefix) => pathname.startsWith(prefix)) || folder.files.some(
    (file) => (file.href.split("#")[0] === pathname && file.sectionId === activeSection) || (!file.sectionId && file.href.split("#")[0] === pathname),
  );

  useEffect(() => {
    if (containsActiveSection) setOpen(true);
  }, [containsActiveSection]);

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={childrenId}
        onClick={() => setOpen((value) => !value)}
        className={`group flex min-h-8 w-full cursor-pointer items-center gap-2 rounded-[3px] px-1 text-left text-[14px] leading-5 transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--personal-rail-focus)] active:scale-[0.96] motion-reduce:transition-none ${open ? "font-medium text-[var(--personal-rail-text)]" : "font-normal text-[var(--personal-rail-muted)] hover:text-[var(--personal-rail-text)]"}`}
      >
        <FolderIcon open={open} />
        <span className="truncate">{folder.label}/</span>
      </button>

      <div
        id={childrenId}
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={`grid transition-[grid-template-rows,opacity] duration-150 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <ul className="relative pb-1 before:pointer-events-none before:absolute before:bottom-2 before:left-[10px] before:top-0 before:w-px before:bg-[var(--personal-rail-border)] before:opacity-70 before:content-['']">
            {folder.files.map((file) => (
              <li key={file.label}>
                <FileRow file={file} activeSection={activeSection} pathname={pathname} nested />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export function PersonalNavTree({ locale }: { locale: PersonalLocale }) {
  const [rootOpen, setRootOpen] = useState(true);
  const pathname = usePathname();
  const homePath = personalHomePath(locale);
  const observedActiveSection = useActiveSection();
  const activeSection = pathname === homePath ? observedActiveSection : null;
  const rootChildrenId = "personal-tree-root";
  const blogHref = locale === "en" ? "/en/latest" : "/latest";
  const mcpHref = locale === "en" ? "/en/blog/kaspi-mcp" : "/blog/kaspi-mcp";
  const navLabel = locale === "en" ? "Site files" : locale === "kz" ? "Сайт файлдары" : "Файлы сайта";
  const labels = locale === "en"
    ? { profile: "profile.md", projects: "projects", articles: "articles", latest: "latest.md", all: "all-articles.md", research: "research", report: "kaspi-top-30.md", tools: "tools", analytics: "analytics.tsx", publications: "publications.md" }
    : { profile: "обо-мне.md", projects: "проекты", articles: "статьи", latest: "последние.md", all: "все-статьи.md", research: "исследования", report: "30-ниш-kaspi.md", tools: "инструменты", analytics: "аналитика.tsx", publications: "публикации.md" };

  const folders: TreeFolder[] = [
    {
      id: "projects",
      label: labels.projects,
      files: [
        { label: "redstat.tsx", href: `${homePath}#project-redstat`, sectionId: "project-redstat" },
        { label: "10b.tsx", href: `${homePath}#project-10b`, sectionId: "project-10b" },
        { label: "prooftotal.tsx", href: `${homePath}#project-prooftotal`, sectionId: "project-prooftotal" },
      ],
    },
    {
      id: "articles",
      label: labels.articles,
      routePrefixes: ["/blog/", "/en/blog/"],
      files: [
        { label: labels.latest, href: `${homePath}#articles`, sectionId: "articles" },
        { label: labels.all, href: blogHref },
      ],
    },
    {
      id: "research",
      label: labels.research,
      routePrefixes: ["/reports/"],
      files: [{ label: labels.report, href: "/reports/kaspi-top-30-june-2026" }],
    },
    {
      id: "tools",
      label: labels.tools,
      routePrefixes: ["/tools/", "/web-analyzer"],
      files: [
        { label: "kaspi-mcp.md", href: mcpHref },
        { label: labels.analytics, href: "/analytics" },
      ],
    },
  ];

  return (
    <nav aria-label={navLabel}>
      <button
        type="button"
        aria-expanded={rootOpen}
        aria-controls={rootChildrenId}
        onClick={() => setRootOpen((value) => !value)}
        className="group flex min-h-8 w-full cursor-pointer items-center gap-2 rounded-[3px] px-1 text-left text-[15px] font-medium leading-5 text-[var(--personal-rail-text)] transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-[var(--personal-text)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--personal-rail-focus)] active:scale-[0.98] motion-reduce:transition-none"
      >
        <FolderIcon open={rootOpen} />
        <span className="truncate">kasymzhanov.com</span>
      </button>

      <div
        id={rootChildrenId}
        aria-hidden={!rootOpen}
        inert={!rootOpen ? true : undefined}
        className={`grid transition-[grid-template-rows,opacity] duration-150 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${rootOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <ul className="relative ml-[9px] space-y-0.5 border-l border-[var(--personal-rail-border)] pb-1 pl-[13px] pt-1">
            <li>
              <FileRow
                file={{ label: labels.profile, href: `${homePath}#about`, sectionId: "about" }}
                activeSection={activeSection}
                pathname={pathname}
              />
            </li>

            {folders.map((folder) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                activeSection={activeSection}
                pathname={pathname}
                defaultOpen={folder.id === "projects"}
              />
            ))}

            <li>
              <FileRow
                file={{ label: labels.publications, href: blogHref }}
                activeSection={activeSection}
                pathname={pathname}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
