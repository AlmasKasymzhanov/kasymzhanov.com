"use client";

import Image from "next/image";
import { ReadTracker } from "@/components/read-tracker";
import { SiteHeader, SiteFooter, AuthorBlock } from "@/components/canon/site-chrome";
import { ArticleHeader } from "@/components/canon/article-header";
import { EngagementProvider } from "@/components/engagement/engagement-provider";
import { EngagementBar } from "@/components/engagement/engagement-bar";
import { Comments } from "@/components/engagement/comments";
import { useState } from "react";

/* MCP connector for Kaspi analytics (used in step 3) */
const CONNECTOR_URL = "https://redstat-backend-production.up.railway.app/mcp";

/* ───── Screenshot ───── */
function Shot({ src, alt, caption, w, h, maxWidth }: { src: string; alt: string; caption: React.ReactNode; w: number; h: number; maxWidth?: number }) {
  return (
    <figure
      className="my-6 border border-[var(--color-border)] rounded-[3px] overflow-hidden mx-auto bg-[var(--color-surface)]"
      style={maxWidth ? { maxWidth } : undefined}
    >
      <Image src={src} alt={alt} width={w} height={h} className="w-full h-auto" />
      <figcaption className={`font-mono text-[11px] text-[var(--color-dim)] px-4 py-2.5 ${maxWidth ? "text-center" : "text-left"}`}>{caption}</figcaption>
    </figure>
  );
}

/* ───── Step ───── */
function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-[13px] font-bold text-[var(--color-dim)] shrink-0">{String(n).padStart(2, "0")}</span>
        <h3 className="text-[16px] font-bold tracking-tight text-[var(--color-text)]">{title}</h3>
      </div>
      <div className="pl-[34px]">{children}</div>
    </div>
  );
}

/* ───── Copy field ───── */
function CopyField({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };
  return (
    <div className="group relative border border-[var(--color-border)] rounded-[3px] bg-[var(--color-surface)] pl-4 pr-12 py-3">
      <code className="font-mono text-[12px] text-[var(--color-text)] break-all select-all">{value}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy link"}
        title={copied ? "Copied" : "Copy"}
        className="absolute right-2 top-2 inline-flex items-center justify-center w-8 h-8 rounded-[3px] text-[var(--color-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
      >
        {copied ? (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
        )}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════ */

export default function KaspiMcpArticleEn() {
  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <ReadTracker slug="kaspi-mcp" />
        <SiteHeader />
        <EngagementProvider slug="kaspi-mcp">
        <article className="w-full max-w-[680px] mx-auto px-6 py-12 md:py-20">

        <ArticleHeader
          locale="en"
          kicker="Redstat + MCP"
          title={<>Lazy Arithmetic: Make AI Mine Gold Out of&nbsp;Kaspi While You Sip Your Coffee</>}
          subtitle="The guide from the Reel. Stand up an AI analyst for Kaspi — Kazakhstan's dominant marketplace — right on your phone: step by step, with screenshots, free."
          slug="kaspi-mcp"
          date="May 29, 2026"
          readMin={5}
          hero={{
            src: "/blog/kaspi-mcp/mcp.webp",
            alt: "Illustration for the Kaspi MCP connector guide",
            credit: "Illustration: Almas Kasymzhanov · Higgsfield AI",
          }}
        />

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── What happened ─── */}
        <div className="mb-12">
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Most sellers spend half a day hunting for a product and still end up guessing. I asked an AI and five minutes later had three ready-to-go niches to launch on Kaspi — with prices, the share of «unbranded» listings (open cards anyone can sell on), and a rough buy plan for a <span className="font-mono">₸5</span> million (~<span className="font-mono">$10K</span>) budget.
          </p>

          <Shot src="/blog/kaspi-mcp/result.png" alt="AI analyst's answer: top niches to launch on Kaspi this summer" caption="The actual chat answer, in full" w={855} h={1484} maxWidth={400} />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            No magic, no pricey dashboards. Through an MCP connector, Claude pulls data from Redstat (my marketplace-analytics service) and answers in plain words. All you need is a free Claude account and five minutes.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Step-by-step setup ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-8">How to set up your own analyst in 5 minutes</h2>

          <Step n={1} title="Open settings">
            <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
              Open Claude, click your account, and choose <strong className="text-[var(--color-text)]">Settings</strong>.
            </p>
            <Shot src="/blog/kaspi-mcp/01-settings.png" alt="Claude account menu → Settings" caption="Account menu → Settings" w={335} h={382} maxWidth={300} />
          </Step>

          <Step n={2} title="Open the connectors section">
            <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
              In the left menu, choose <strong className="text-[var(--color-text)]">Connectors</strong> and follow the <strong className="text-[var(--color-text)]">Customize</strong> link. That's where connectors are added and configured.
            </p>
            <Shot src="/blog/kaspi-mcp/02-connectors.png" alt="Settings → Connectors → Customize" caption="Settings → Connectors → the Customize link" w={1067} h={647} />
          </Step>

          <Step n={3} title="Add the connector and paste the link">
            <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-4">
              Click <strong className="text-[var(--color-text)]">«+»</strong> at the top and choose <strong className="text-[var(--color-text)]">«Add custom connector»</strong>. In the dialog, type a name (e.g. <strong className="text-[var(--color-text)]">«Kaspi»</strong>) and paste the connector link, then click Add:
            </p>
            <CopyField value={CONNECTOR_URL} />
            <Shot src="/blog/kaspi-mcp/03-add-connector.png" alt="Add custom connector: the Kaspi connector with its link and tools" caption="«+» → «Add custom connector». On the right, Kaspi connected with its tools" w={864} h={570} />
          </Step>

          <Step n={4} title="Sign in to Redstat (if prompted)">
            <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-3">
              From here, two things can happen:
            </p>
            <ul className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-3 list-disc pl-5 space-y-2">
              <li><strong className="text-[var(--color-text)]">The connector linked on its own.</strong> Great — skip to step 5.</li>
              <li><strong className="text-[var(--color-text)]">Claude asked you to go to Redstat.</strong> That's normal. A Redstat page opens. If you already have an account, just sign in; if not, register (easiest <strong className="text-[var(--color-text)]">via Google</strong>, one click).</li>
            </ul>
            <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
              Once you sign in, the connector links itself — no need to come back here.
            </p>
          </Step>

          <Step n={5} title="Grant permissions">
            <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
              On the right, open the dropdown next to each tool and choose <strong className="text-[var(--color-text)]">«Always allow»</strong> so Claude can reach the data without asking every time. Done — your analyst is connected.
            </p>
            <Shot src="/blog/kaspi-mcp/04-permissions.png" alt="Tool permissions → Always allow" caption="Tool permissions → «Always allow»" w={496} h={353} maxWidth={440} />
          </Step>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Asking questions ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Asking questions</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Open a <strong className="text-[var(--color-text)]">new chat</strong> and just describe what you want in plain words. For example:
          </p>
          <blockquote className="border-l-2 border-[var(--color-border)] pl-4 my-4 text-[15px] text-[var(--color-dim)] leading-[1.8] italic">
            Find the best niches to launch on Kaspi this summer, budget ₸5M. Where to go in with a brand, and where unbranded (open listings) works. Give me the average price and how many units I can buy.
          </blockquote>
          <blockquote className="border-l-2 border-[var(--color-border)] pl-4 my-4 text-[15px] text-[var(--color-dim)] leading-[1.8] italic">
            Break down the garden-hammock niche: price segments, unbranded share, top 3 listings, and competition.
          </blockquote>
          <blockquote className="border-l-2 border-[var(--color-border)] pl-4 my-4 text-[15px] text-[var(--color-dim)] leading-[1.8] italic">
            Analyze the reviews for this product and tell me what to improve in the listing and in the product itself.
          </blockquote>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Claude pulls the niche analytics itself, shows the segments, and suggests where a newcomer should enter. No manual spreadsheets.
          </p>
        </div>

        {/* ─── Engagement ─── */}
        <div className="mt-12 flex justify-end">
          <EngagementBar />
        </div>
        <Comments />
        </article>
        </EngagementProvider>

        <div className="flex-1" aria-hidden />
        <AuthorBlock variant="horizontal" locale="en" />
        <SiteFooter locale="en" />
      </div>
    </div>
  );
}
