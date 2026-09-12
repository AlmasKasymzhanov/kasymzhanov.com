import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { PersonalFooter } from "@/components/personal-footer";
import { PersonalSidebar } from "@/components/personal-sidebar";

const srcLink =
  "text-[var(--personal-text)] no-underline  transition-colors hover:text-[var(--personal-muted)] ";

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mb-5 mt-16 scroll-mt-8 text-[23px] font-normal leading-[1.2] tracking-[-0.018em] text-[var(--personal-text)] sm:text-[26px]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-4 mt-10 text-[17px] font-normal leading-[1.35] tracking-[-0.01em] text-[var(--personal-text)] sm:text-[18px]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 text-pretty text-[17px] leading-[1.75] text-[var(--personal-muted)] sm:text-[18px]">
      {children}
    </p>
  ),
  a: ({ href, children, id }) => {
    if (id && !children) return <span id={id} className="block scroll-mt-8" aria-hidden />;
    const url = href ?? "#";
    if (url.startsWith("/")) {
      return (
        <Link href={url} id={id} className={srcLink}>
          {children}
        </Link>
      );
    }
    const internalHash = url.startsWith("#");
    return (
      <a
        href={url}
        id={id}
        className={srcLink}
        {...(internalHash ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  },
  strong: ({ children }) => <strong className="font-medium text-[var(--personal-text)]">{children}</strong>,
  ul: ({ children }) => (
    <ul className="my-5 list-disc space-y-2 ps-5 text-[17px] leading-[1.75] text-[var(--personal-muted)] marker:text-[var(--personal-border)] sm:text-[18px]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-5 list-decimal space-y-2 ps-5 text-[17px] leading-[1.75] text-[var(--personal-muted)] marker:text-[var(--personal-muted)] sm:text-[18px]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="ps-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-7 border-s-2 border-[var(--personal-border)] py-0.5 ps-5 text-[14px] leading-[1.7] text-[var(--personal-muted)]">
      {children}
    </blockquote>
  ),
  hr: () => null,
  table: ({ children }) => (
    <div className="my-7 overflow-hidden rounded-[10px] border border-[var(--personal-border)]">
      <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "thin" }}>
        <table className="w-full min-w-[580px] text-[13px]" style={{ borderCollapse: "collapse" }}>
          {children}
        </table>
      </div>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[var(--personal-rail-hover)]">{children}</thead>,
  th: ({ children }) => (
    <th className="whitespace-nowrap border-b border-[var(--personal-border)] px-4 py-2.5 text-start align-top font-sans text-[13px] font-normal text-[var(--personal-muted)]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-[var(--personal-border)]/50 px-4 py-2.5 align-top text-[13px] leading-relaxed text-[var(--personal-muted)]">
      {children}
    </td>
  ),
};

export type LegalDocProps = {
  md: string;
  kicker: string;
  enAnchor: string;
};

export function LegalDoc({ md, kicker, enAnchor }: LegalDocProps) {
  const clean = md.replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "").replace(/[ \t]{2,}/g, " ");
  const titleLine = clean.match(/^#\s+(.+)$/m)?.[1] ?? "";
  const [titleRu, titleEn] = titleLine.split(" / ").map((value) => value.trim());
  const updated = clean.match(/Последнее обновление:\s*(.+?)\s*\/\s*Last updated:\s*([^*\n]+)/);
  const updatedRu = updated?.[1]?.trim();
  const updatedEn = updated?.[2]?.trim();
  const firstSectionIndex = clean.indexOf("\n## ");
  let body = firstSectionIndex >= 0 ? clean.slice(firstSectionIndex + 1) : clean;
  body = body.replace(/^##\s+.+\n/, "");

  return (
    <div className="personal-site min-h-screen overflow-x-clip bg-[var(--personal-paper)] text-[var(--personal-text)]">
      <a href="#main-content" className="skip-link">К документу</a>

      <div className="mx-auto grid min-h-screen min-w-0 w-full max-w-[1440px] lg:grid-cols-[228px_minmax(0,1fr)]">
        <PersonalSidebar locale="ru" />

        <main id="main-content" className="min-w-0 w-full bg-[var(--personal-paper)] px-5 pb-10 pt-10 sm:px-9 md:px-12 md:pb-14 md:pt-14 xl:px-20 xl:pt-16">
          <div className="max-w-[720px] xl:ml-16">
            <header className="pb-8">
              <p className="mb-5 font-mono text-[11px] leading-5 text-[var(--personal-muted)]">{kicker}</p>
              <h1 className="max-w-[660px] text-balance font-heading text-[32px] font-normal leading-[1.08] tracking-[-0.025em] sm:text-[38px] md:text-[40px]">
                {titleRu}
              </h1>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
                {updatedRu && (
                  <p className="font-mono text-[10px] leading-4 text-[var(--personal-muted)]">
                    Обновлено {updatedRu}
                  </p>
                )}
                <nav aria-label="Язык документа" className="flex items-center gap-1 font-mono text-[10px]">
                  <span className="grid size-7 place-items-center font-normal text-[var(--personal-text)] ">RU</span>
                  <a
                    href={`#${enAnchor}`}
                    className="grid size-7 place-items-center rounded-[3px] text-[var(--personal-muted)] transition-colors hover:bg-[var(--personal-rail-hover)] hover:text-[var(--personal-text)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--personal-text)]"
                  >
                    EN
                  </a>
                </nav>
              </div>

              {titleEn && (
                <p className="mt-4 text-[12px] leading-5 text-[var(--personal-muted)]">
                  {titleEn}{updatedEn ? ` · last updated ${updatedEn}` : ""} ·{" "}
                  <a href={`#${enAnchor}`} className={srcLink}>jump to English</a>
                </p>
              )}
            </header>

            <div className="personal-document pt-2">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                {body}
              </ReactMarkdown>
            </div>

            <div className="mt-16">
              <PersonalFooter locale="ru" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
