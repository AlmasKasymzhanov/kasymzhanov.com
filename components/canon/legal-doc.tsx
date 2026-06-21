import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { SiteHeader, SiteFooter, AuthorBlock } from "@/components/canon/site-chrome";

/*
 * Canon renderer for legal documents (privacy policy, public offer).
 * Brings the bilingual markdown into the publication's enterprise look:
 * site chrome + frame + mono typography, editorial headings, bordered tables,
 * accent-barred callouts for quotes, monochrome inline links. The document
 * title and "last updated" line are lifted out of the markdown into a proper
 * masthead; flag emojis are stripped to keep the page monochrome.
 */

const srcLink =
  "text-[var(--color-text)] underline decoration-dotted decoration-[var(--color-dim)] underline-offset-2 hover:decoration-[var(--color-text)] transition-colors";

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-14 mb-6 text-[22px] md:text-[26px] font-bold tracking-tight text-[var(--color-text)] leading-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 mb-4 text-[17px] md:text-[18px] font-bold tracking-tight text-[var(--color-text)]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-5 text-[15px] text-[var(--color-dim)] leading-[1.8]">{children}</p>
  ),
  a: ({ href, children, id }) => {
    // Empty in-text anchor used purely as a scroll target (e.g. the EN section).
    if (id && !children) return <span id={id} className="block scroll-mt-24" aria-hidden />;
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
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--color-text)]">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="my-5 space-y-2 text-[15px] text-[var(--color-dim)] leading-[1.8] list-disc pl-5 marker:text-[var(--color-border)]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-5 space-y-2 text-[15px] text-[var(--color-dim)] leading-[1.8] list-decimal pl-5 marker:text-[var(--color-dim)]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-[var(--color-brand)] pl-5 py-1 text-[14px] italic text-[var(--color-dim)] leading-[1.7]">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-[var(--color-border)]" />,
  table: ({ children }) => (
    <div className="my-6 border border-[var(--color-border)] rounded-[3px] overflow-hidden">
      <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "thin" }}>
        <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
          {children}
        </table>
      </div>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[var(--color-surface)]">{children}</thead>,
  th: ({ children }) => (
    <th className="py-2.5 px-4 text-left align-top font-mono font-medium text-[11px] uppercase tracking-wider text-[var(--color-dim)] border-b border-[var(--color-border)] whitespace-nowrap">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-2.5 px-4 align-top text-[13px] text-[var(--color-dim)] border-b border-[var(--color-border)]/40 leading-relaxed">
      {children}
    </td>
  ),
};

export type LegalDocProps = {
  md: string;
  kicker: string;
  /** id of the anchor that begins the English section, e.g. "terms-english" */
  enAnchor: string;
};

export function LegalDoc({ md, kicker, enAnchor }: LegalDocProps) {
  // Strip flag emojis (regional indicators) to keep the page monochrome.
  const clean = md.replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "").replace(/[ \t]{2,}/g, " ");

  const titleLine = clean.match(/^#\s+(.+)$/m)?.[1] ?? "";
  const [titleRu, titleEn] = titleLine.split(" / ").map((s) => s.trim());

  const upd = clean.match(/Последнее обновление:\s*(.+?)\s*\/\s*Last updated:\s*([^*\n]+)/);
  const updatedRu = upd?.[1]?.trim();
  const updatedEn = upd?.[2]?.trim();

  // Body starts at the first H2; drop the redundant RU language heading
  // (the page masthead already shows the title).
  const h2idx = clean.indexOf("\n## ");
  let body = h2idx >= 0 ? clean.slice(h2idx + 1) : clean;
  body = body.replace(/^##\s+.+\n/, "");

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <SiteHeader />

        <main className="w-full max-w-[820px] mx-auto px-6 py-12 md:py-16">
          <header className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-brand)] mb-4">
              {kicker}
            </p>
            <h1 className="text-[28px] md:text-[38px] font-bold tracking-tight text-[var(--color-text)] leading-[1.12] mb-5">
              {titleRu}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 justify-between">
              {updatedRu && (
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)]">
                  [ Обновлено {updatedRu} ]
                </p>
              )}
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="px-2 py-0.5 rounded-[3px] bg-[var(--color-brand)] text-[var(--color-bg)] font-medium">
                  RU
                </span>
                <a
                  href={`#${enAnchor}`}
                  className="px-2 py-0.5 rounded-[3px] border border-[var(--color-border)] text-[var(--color-dim)] hover:text-[var(--color-text)] hover:border-[var(--color-dim)] transition-colors"
                >
                  EN
                </a>
              </div>
            </div>
            {titleEn && (
              <p className="mt-3 text-[12px] text-[var(--color-dim)]/80">
                {titleEn}
                {updatedEn ? ` · last updated ${updatedEn}` : ""} —{" "}
                <a href={`#${enAnchor}`} className={srcLink}>
                  jump to English
                </a>
              </p>
            )}
          </header>

          <hr className="border-[var(--color-border)] mb-10" />

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownComponents}
          >
            {body}
          </ReactMarkdown>
        </main>

        <div className="flex-1" aria-hidden />
        <AuthorBlock variant="horizontal" />
        <SiteFooter />
      </div>
    </div>
  );
}
