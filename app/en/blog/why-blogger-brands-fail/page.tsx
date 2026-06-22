"use client";

import Image from "next/image";
import { ReadTracker } from "@/components/read-tracker";
import { SiteHeader, SiteFooter, AuthorBlock } from "@/components/canon/site-chrome";
import { ArticleHeader } from "@/components/canon/article-header";
import { EngagementProvider } from "@/components/engagement/engagement-provider";
import { EngagementBar } from "@/components/engagement/engagement-bar";
import { Comments } from "@/components/engagement/comments";
import { ColumnChart } from "@/components/charts/column-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { DataTable } from "@/components/charts/data-table";

const BROCK_LINK = (
  <a href="https://brockui.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Brock UI</a>
);

const REDSTAT = (
  <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">redstat.kz</a>
);

/* Article palette (scoped here — NOT in globals.css). Decline = a clean,
   confident red, the deliberate Tailwind-500 counterpart to the growth green;
   context series = graphite. One bright value for both themes (FT canon). */
const LICK_RED = "#ef4444";
const NEUTRAL = "var(--brock-neutral)";

function RevenueChart() {
  return (
    <figure className="my-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[3px] p-5">
      <ColumnChart
        height={240}
        barRadius={2}
        accent={LICK_RED}
        header={{ title: "Every month worse than the last", subtitle: "Lick Beauty revenue, all SKUs · −92% from peak in six months" }}
        slots={{ tooltip: () => null }}
        data={[
          { label: "Aug 2025", value: 43.6, color: NEUTRAL },
          { label: "Dec 2025", value: 16.0, color: NEUTRAL },
          { label: "Jan 2026", value: 6.3, color: NEUTRAL },
          { label: "Feb 2026", value: 3.3, color: LICK_RED },
        ]}
        dataLabels={{
          show: true,
          format: (v) => v.toLocaleString("en-US", { maximumFractionDigits: 1 }),
        }}
        formatValue={(v) => `₸${v.toLocaleString("en-US", { maximumFractionDigits: 1 })}M`}
        yAxisFormat={(v) => `₸${v.toLocaleString("en-US", { maximumFractionDigits: 1 })}M`}
        yAxis={{ max: 55 }}
        caption="* September–November 2025: no data"
      />
      <figcaption className="font-mono text-[11px] text-[var(--color-dim)] mt-4">
        Source: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2">redstat.kz</a>
        <span className="text-[var(--color-border)] mx-1.5">·</span>Charts: {BROCK_LINK}
      </figcaption>
    </figure>
  );
}

/* ───── Niche MoM change — diverging BarChart (niche vs Lick) ───── */
const pctFmt = (v: number) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v)}%`;

function NicheChangeChart() {
  return (
    <figure className="my-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[3px] p-5">
      <BarChart
        accent={LICK_RED}
        barRadius={2}
        labelWidth={132}
        barThickness={22}
        gap={10}
        header={{ title: "February dipped for everyone. Lick — twice as hard", subtitle: "Revenue change, Jan → Feb 2026" }}
        slots={{ tooltip: () => null }}
        data={[
          { label: "Lick / LICK", value: -48, color: LICK_RED },
          { label: "Sen Sulu (leader)", value: -18, color: NEUTRAL },
          { label: "LUXVISAGE", value: -14, color: NEUTRAL },
          { label: "Romand", value: -6, color: NEUTRAL },
          { label: "Maybelline", value: -2, color: NEUTRAL },
          { label: "Vivienne Sabo", value: 7, color: NEUTRAL },
        ]}
        dataLabels={{ show: true, format: pctFmt }}
        formatValue={pctFmt}
        xAxis={{ hideTicks: true }}
      />
      <figcaption className="font-mono text-[11px] text-[var(--color-dim)] mt-4">
        Source: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2">redstat.kz</a>
        <span className="text-[var(--color-border)] mx-1.5">·</span>Charts: {BROCK_LINK}
      </figcaption>
    </figure>
  );
}

/* ───── PUSY Revenue Chart ───── */
const PUSY_GREEN = "#22c55e";
const fmtRub = (v: number) =>
  v >= 1000
    ? `₽${(v / 1000).toLocaleString("en-US", { maximumFractionDigits: 2 })}bn`
    : `₽${v}M`;

function PusyRevenueChart() {
  return (
    <figure className="my-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[3px] p-5">
      <LineChart
        height={240}
        accent={PUSY_GREEN}
        curve="linear"
        markers="auto"
        lastValueDot
        directLabels
        xScale="point"
        header={{ title: "Revenue up 18× in three years", subtitle: "PUSY · Drozh Beauty LLC · 2022 → 2024" }}
        x={["2022", "2023", "2024"]}
        data={[{ name: "PUSY", data: [176, 1540, 3250], color: PUSY_GREEN, emphasis: true }]}
        formatValue={fmtRub}
        yAxisFormat={(v) =>
          v >= 1000
            ? `₽${(v / 1000).toLocaleString("en-US", { maximumFractionDigits: 1 })}bn`
            : `₽${v}M`
        }
      />
      <figcaption className="font-mono text-[11px] text-[var(--color-dim)] mt-4">
        Source: <a href="https://spark-interfax.ru" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2">SPARK-Interfax</a>
        <span className="text-[var(--color-border)] mx-1.5">·</span>Charts: {BROCK_LINK}
      </figcaption>
    </figure>
  );
}

/* ═══════════════════════════════════════════════════ */
export default function LiqBeautyArticleEn() {
  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <ReadTracker slug="why-blogger-brands-fail" />
        <SiteHeader />
        <EngagementProvider slug="why-blogger-brands-fail">
        <article className="w-full max-w-[680px] mx-auto px-6 py-12 md:py-20">

        <ArticleHeader
          locale="en"
          kicker="Anatomy of a Launch"
          title={<>Lick&nbsp;Beauty: Seven Million Followers vs. 420&nbsp;Tenge</>}
          subtitle={
            <>
              Data doesn&apos;t watch your Stories. <span className="font-mono">7</span> million followers and a <span className="font-mono">₸5,990</span> (~<span className="font-mono">$13</span>) lip gloss - against a Chinese knockoff at <span className="font-mono">₸420</span> (under <span className="font-mono">$1</span>) that outsells it seventeen to one. This isn&apos;t bad luck. It&apos;s a model. From here on, only the numbers.
            </>
          }
          slug="why-blogger-brands-fail"
          date="March 25, 2026"
          readMin={7}
          hero={{
            src: "/blog/why-blogger-brands-fail/likbeauty.webp",
            alt: "Illustration for the Lick Beauty story",
            credit: "Illustration: Almas Kasymzhanov · Higgsfield AI",
          }}
        />

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Intro ─── */}
        <div className="mb-12">
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            There&apos;s a moment anyone who works with marketplace data knows. You open the analytics dashboard, type in the name of a brand all of Kazakh Instagram was buzzing about last summer - and you see a chart shaped like the cardiogram of a patient they stopped treating. A peak, then a long, smooth, hopeless slide down.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            That&apos;s exactly what I saw when I typed «Lick Beauty» into Redstat.
          </p>

          <RevenueChart />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            August 2025 - <span className="font-mono">₸43.6</span> million. December - <span className="font-mono">₸16</span>. January - <span className="font-mono">₸6.3</span>. February - <span className="font-mono">₸3.3</span>. Down ninety-two percent from the peak. Every month worse than the one before. Without a single exception.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            The data, it should be said, doesn&apos;t care how many followers you have. It doesn&apos;t watch Stories. It follows no one. It doesn&apos;t double-tap. It just counts. And what it counted is worth a long, honest conversation.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Not about specific people - about a model. A model that lands on the same result over and over. In Almaty, in Moscow, in Los Angeles. With creators who have seven million followers and creators who have ten. One model - one outcome.
          </p>

          <div className="flex flex-col gap-4 my-8">
            <div className="border border-[var(--color-border)] rounded-[3px] overflow-hidden">
              <Image src="/blog/why-blogger-brands-fail/lick-beauty.webp" alt="Lick beauty on Redstat — revenue and units, February 2026" width={1200} height={800} className="w-full h-auto" />
              <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">Screenshot: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">redstat.kz</a> <span className="text-[var(--color-border)] mx-1.5">·</span> brand «Lick beauty» <span className="text-[var(--color-border)] mx-1.5">·</span> February 2026</p>
            </div>
            <div className="border border-[var(--color-border)] rounded-[3px] overflow-hidden">
              <Image src="/blog/why-blogger-brands-fail/lick.webp" alt="LICK on Redstat — revenue and units, February 2026" width={1200} height={800} className="w-full h-auto" />
              <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">Screenshot: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">redstat.kz</a> <span className="text-[var(--color-border)] mx-1.5">·</span> brand «LICK» <span className="text-[var(--color-border)] mx-1.5">·</span> February 2026</p>
            </div>
          </div>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Behind the launch ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Behind a beautiful launch</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            For those out of the loop - and I suspect there aren&apos;t many - let me explain. Arman Yusupov and Karina Oksukpaeva are arguably the most recognizable couple in Kazakh Instagram. He has around two million followers. She has around five. They created Yuframe, a team that started shooting vines back in 2015 and became a cultural phenomenon long before Kazakhstan learned to say the word «influencer» without a smirk. Serial entrepreneurs - the production studio 2ANY1, the «Potok» project, a franchise business across several cities.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            People who know how to make things. That&apos;s worth pinning down up front, so that later, when the hard numbers come, no one thinks I&apos;m out to expose hacks. Hacks don&apos;t pull seven million followers.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            In July 2025 they launched a cosmetics brand. The Cherry 01 lip gloss. Price: <span className="font-mono">₸4,499</span>. The company, StartUp Studio, was registered in Almaty in November 2024 under Yusupov and his friend Rustem Zhali. Manufacturing: China - which, to be clear, is completely standard practice: it&apos;s how PUSY does it, and VOIS, and half of what sits on the shelves of Golden Apple, the region&apos;s big beauty retailer.
          </p>
          <div className="my-8 border border-[var(--color-border)] rounded-[3px] overflow-hidden max-w-[520px] mx-auto">
            <Image src="/blog/why-blogger-brands-fail/lick-insta.webp" alt="Lick Beauty launch post on Instagram — «How we created LICK?»" width={1200} height={1200} className="w-full h-auto" />
            <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">Lick Beauty launch post <span className="text-[var(--color-border)] mx-1.5">·</span> Instagram <a href="https://www.instagram.com/yusupov21/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">@yusupov21</a></p>
          </div>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-6">
            In December they added three shades - Twinkle, Cocoa, and Marshmallow at <span className="font-mono">₸5,990</span>. And here&apos;s what happened next.
          </p>

          <DataTable
            columns={[
              { header: "Period" },
              { header: "Event", align: "left", mono: false },
              { header: "Revenue", align: "right" },
              { header: "Units", align: "right" },
            ]}
            rows={[
              ["Aug 2025", "Cherry 01 launch", "₸43.6M", "7,241"],
              ["Dec 2025", "Three new SKUs", "₸16M", "2,638"],
              ["Jan 2026", "Decline", "₸6.3M", "1,124"],
              ["Feb 2026", "More of the same", "₸3.3M", "596"],
            ]}
            highlightRow={3}
            accent={LICK_RED}
            source={REDSTAT}
          />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Launch - spike - slide. Second launch - smaller spike - bigger slide. That&apos;s not a glitch. That&apos;s a pattern.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            In August, <span className="font-mono">7,241</span> people bought the gloss. In February - all four products combined - <span className="font-mono">596</span>.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Of course, seven million followers isn&apos;t seven million buyers. The audience is scattered: some outside Kazakhstan, some men, some who simply never see the Stories. Reach for big creators usually runs <span className="font-mono">5–15%</span> of the base. Say the real target is <span className="font-mono">250,000–350,000</span> people. Buyers: <span className="font-mono">596</span>. Even by the kindest estimate - under <span className="font-mono">0.2%</span>. Against an influencer-marketing norm of <span className="font-mono">1–3%</span>.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Seasonality ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">February&apos;s fault? Let&apos;s ask the competitors</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-6">
            When I showed these numbers to colleagues, the first reaction was predictable: «February&apos;s short, the holidays are over, everyone&apos;s down.» A fair hypothesis. Reasonable. And completely testable - because we have data on more than just Lick Beauty.
          </p>

          <NicheChangeChart />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            The niche dipped <span className="font-mono">2–18%</span>. Lick - <span className="font-mono">48%</span>. Seasonality explains a third at most. The other thirty points aren&apos;t February. They&apos;re something else.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── 420 tenge ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Four hundred twenty tenge</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Now - the fact that may have been the whole reason to sit down and write this.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            On Kaspi - Kazakhstan&apos;s dominant marketplace - the «Lipsticks, liners, glosses» category has products with no registered brand. Just «No brand». In February they earned <span className="font-mono">₸7.1</span> million combined. <span className="font-mono">55</span> SKUs, almost <span className="font-mono">12,000</span> units. More than twice what Lick Beauty made.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-6">
            I dug in - and found something unexpected. Most of these «no-brand» products are Rhode. Yes, Hailey Bieber&apos;s brand. Except the original Rhode Peptide Lip Tint runs ~<span className="font-mono">$16</span> - about <span className="font-mono">₸7,500</span>. On Kaspi it sells for <span className="font-mono">₸420–515</span>. One photo on the listing. No description. No brand story. Obviously Chinese knockoffs riding Rhode&apos;s name and visuals.
          </p>

          <div className="my-6 border border-[var(--color-border)] rounded-[3px] overflow-hidden">
            <Image src="/blog/why-blogger-brands-fail/rhode-redstat.webp" alt="Rhode Espresso on Redstat — ₸1.6M revenue, February 2026" width={1200} height={800} className="w-full h-auto" />
            <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">Rhode Espresso on Kaspi.kz <span className="text-[var(--color-border)] mx-1.5">·</span> Screenshot: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">redstat.kz</a></p>
          </div>

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            <span className="font-mono">3,274</span> sales a month. Lick Beauty&apos;s Cherry 01 - <span className="font-mono">195</span>.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            A knockoff with a single photo outsells the original brand - and its seven-million audience - seventeen to one.
          </p>

          <DataTable
            columns={[
              { header: "Product" },
              { header: "Price", align: "right" },
              { header: "Revenue (Feb)", align: "right" },
              { header: "Units", align: "right" },
            ]}
            source={REDSTAT}
            rows={[
              [<a key="e" href="https://kaspi.kz/shop/p/rhode-blesk-dlja-gub-espresso-142386324" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Rhode Espresso <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₸421", "₸1,600,604", "3,274"],
              [<a key="t" href="https://kaspi.kz/shop/p/rhode-blesk-dlja-gub-toast-144626391" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Rhode Toast <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₸515", "₸525,066", "990"],
              [<a key="r" href="https://kaspi.kz/shop/p/rhode-blesk-dlja-gub-ribbon-145296485" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Rhode Ribbon <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₸498", "₸403,578", "745"],
              [<a key="f" href="https://kaspi.kz/shop/p/blesk-dlja-gub-blesk-dlja-gub-fruktovyi-blesk-1-sht-152798242" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">«Fruit Gloss» (no-name) <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₸298", "₸361,685", "1,368"],
              [<a key="rj" href="https://kaspi.kz/shop/p/rhode-blesk-dlja-gub-raspberry-jelly-142387040" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Rhode Raspberry Jelly <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₸403", "₸293,371", "661"],
            ]}
          />
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            And here I get to something every seller in our markets knows, but somehow forgets the moment the talk turns to «creator brands». Marketing textbooks give it a fancy name - «price elasticity of demand». Our market puts it simpler: price wins. In Kazakhstan, in Russia, across the whole CIS - price was, is, and will be the main filter on a purchase. Not the brand. Not the followers. Not the Stories. The price.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            A <span className="font-mono">₸420</span> knockoff is an impulse buy. Saw it in the feed - added to cart - didn&apos;t think twice. Even if the quality&apos;s so-so, <span className="font-mono">₸420</span> is nothing to mourn. A <span className="font-mono">₸5,990</span> gloss is a deliberate decision. The buyer has to <em>know</em> this is the gloss they want. And how do they know? From the Stories. Which ran six months ago.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── A launch isn't a business ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">A launch isn&apos;t a business. It&apos;s applause</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            In theater it goes like this: the show ends, the audience claps, the actors bow, everyone&apos;s happy. Then tomorrow comes. You have to walk back on stage. And the day after. And next month. And next year. And the audience is new every time. And they couldn&apos;t care less that last night was a sellout.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            A creator brand launch is applause. Once. The creator films a run of Stories, shows the product, says something heartfelt: «I worked toward this for so long». The audience buys. Not the gloss - the belonging. Not the product - the loyalty. A piece of the life of a person they watch every day.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            The first month isn&apos;t sales. It&apos;s a one-time conversion of social capital into cash. The capital took years to build. The conversion happens in a week. After that, the capital resets to zero. And the business begins.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            And a business is logistics, purchasing, stock levels, listings, SEO, ads, pricing, distribution control, unit economics, repeat purchases, assortment, channels. A long, boring list, and not one item on it can be solved with a Story.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── 19 sellers ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Nineteen sellers for one jar</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Here I went deeper than usual. I looked past the sales and into a specific SKU. 143562625: «Lick beauty Lip Gloss, cherry, Cherry 01». One listing on Kaspi. One product. The same jar.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Nineteen sellers. Each with their own price.
          </p>

          <div className="my-6 border border-[var(--color-border)] rounded-[3px] overflow-hidden">
            <Image src="/blog/why-blogger-brands-fail/lick-lip-gloss.webp" alt="Cherry 01 on Kaspi — 19 sellers, prices from ₸5,800 to ₸16,995" width={1200} height={800} className="w-full h-auto" />
            <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">Screenshot: <a href="https://kaspi.kz/shop/p/lick-beauty-lip-gloss-blesk-dlja-gub-vishnevyi-cherry-01-143562625" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Kaspi.kz</a> <span className="text-[var(--color-border)] mx-1.5">·</span> Lick beauty Lip Gloss Cherry 01</p>
          </div>

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            The creators themselves - LICK - price it at <span className="font-mono">₸5,990</span>. But three sellers on the same listing: <span className="font-mono">₸5,800</span>. Cheaper than the brand. Why pay extra for the brand when the same product sits right beside it for less?
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            At the other end - a sole proprietor, «Metaverse». Same gloss. Same listing. <span className="font-mono">₸16,995</span>. Almost three times more. Between them - fifteen more sellers. One of them, ELEXIR COLLECTION, has a <span className="font-mono">3.0</span> rating, a «TERRIBLE» status, and <span className="font-mono">13%</span> returns. A seller with an awful reputation is moving your gloss at <span className="font-mono">₸8,900</span>.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-6">
            To a Kaspi shopper, all of this is one face. Your brand&apos;s face.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-6">
            These aren&apos;t resellers. It&apos;s more like uncontrolled distribution. It looks like the Lick team handed stock to third-party sellers but never set up recommended-retail-price control. The result: one jar - from <span className="font-mono">₸5,800</span> to <span className="font-mono">₸16,995</span>. A three-fold spread. No single pricing policy, no control over the brand. This is the ABCs, and somehow no one reads them.
          </p>

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-2">
            The new SKUs - Twinkle, Cocoa, Marshmallow - are sold by a single seller. The creators themselves. But even without the price chaos:
          </p>

          <DataTable
            columns={[
              { header: "Product" },
              { header: "Revenue (Feb)", align: "right" },
              { header: "Units", align: "right" },
              {
                header: "Change",
                align: "right",
                type: "delta",
                format: (v) => `${v > 0 ? "+" : "−"}${Math.abs(v).toFixed(1)}%`,
              },
            ]}
            deltaDownColor={LICK_RED}
            source={REDSTAT}
            rows={[
              [<a key="c" href="https://kaspi.kz/shop/p/lick-beauty-lip-gloss-blesk-dlja-gub-vishnevyi-cherry-01-143562625" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Cherry 01 <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₸898,256", "195", -56.5],
              [<a key="tw" href="https://kaspi.kz/shop/p/lick-lip-gloss-blesk-dlja-gub-twinkle-152237502" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Twinkle <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₸1,087,278", "178", -35.3],
              [<a key="co" href="https://kaspi.kz/shop/p/lick-lip-gloss-blesk-dlja-gub-cocoa-152237715" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Cocoa <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₸942,864", "154", -36.2],
              [<a key="ma" href="https://kaspi.kz/shop/p/lick-lip-gloss-blesk-dlja-gub-marshmallow-152237844" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Marshmallow <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₸365,252", "64", -66.6],
            ]}
          />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Marshmallow - down <span className="font-mono">66.6%</span> in a month. With a <span className="font-mono">4.8–5.0</span> rating and <span className="font-mono">1,390</span> reviews on Cherry. Customers are happy. The product is fine. The problem isn&apos;t quality.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── A product you buy once ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">A product you buy once</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            The problem is the product itself.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Lip gloss is a one-time buy. One tube lasts months. You buy it, put it on the shelf, forget it. No repeat sales. No LTV. The customer came and went.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            It&apos;s like a restaurant that serves only one dish - and one so filling you don&apos;t want to eat for a week afterward. A great dish. Everyone praises it. Everyone recommends it. But no one comes back.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            If the line had consumables - micellar water, toners, masks, patches - customers would return every month. Gloss is a pretty souvenir bought once off a Story. A month later, there&apos;s no reason to come back.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── The ones who built ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">The ones who built</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Any diagnosis is only as convincing as the cure. If the problem is the model, then somewhere there must be people who built a different model and won.
          </p>

          <h3 className="text-[17px] font-bold text-[var(--color-text)] mt-10 mb-4">PUSY: 500,000 followers and 3.2 billion</h3>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            In late 2021 Ilona Drozh - a brow-lamination specialist with around 500,000 followers - and serial entrepreneur Artyom Borodavkin founded PUSY. Borodavkin became CEO of Drozh Beauty LLC. Ilona became the face. He built the business. She gave it a face. Literally.
          </p>

          <div className="my-6 border border-[var(--color-border)] rounded-[3px] overflow-hidden max-w-[520px] mx-auto">
            <Image src="/blog/why-blogger-brands-fail/ilona-drozh.webp" alt="Ilona Drozh — founder of the PUSY brand" width={1200} height={1200} className="w-full h-auto" />
            <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">Ilona Drozh <span className="text-[var(--color-border)] mx-1.5">·</span> Instagram <a href="https://www.instagram.com/ilona.drozh/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">@ilona.drozh</a></p>
          </div>

          <PusyRevenueChart />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Margin: <span className="font-mono">25%</span>. For a brand with creator roots, that&apos;s an anomaly.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Per marketplace analytics (MPSTATS), over 30 days - January 26 to February 24, 2026 - PUSY earned <span className="font-mono">₽74.6</span> million (~<span className="font-mono">$830K</span>) on Wildberries alone. Average daily revenue - <span className="font-mono">₽2.4</span> million. Another <span className="font-mono">₽13.5</span> million was lost revenue: the stock ran out, the demand didn&apos;t. PUSY <em>loses</em> more to being out of stock than Lick Beauty <em>earns</em> in a month.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-6">
            The brand has <span className="font-mono">1,377</span> SKUs. Lick Beauty has four.
          </p>

          <DataTable
            columns={[
              { header: "Product" },
              { header: "Revenue (30d, WB)", align: "right" },
              { header: "Units", align: "right" },
            ]}
            rows={[
              [<a key="p1" href="https://www.wildberries.ru/catalog/755406779/detail.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Brow gel, Lamination, 5 ml <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₽7.85M", "16,601"],
              ["Long-hold fixing gel", "₽5.15M", "10,822"],
              [<a key="p3" href="https://www.wildberries.ru/catalog/211695539/detail.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Brow gel, version 2.0 <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₽4.91M", "6,596"],
              [<a key="p4" href="https://www.wildberries.ru/catalog/564679782/detail.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Shampoo &amp; conditioner <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₽4.03M", "4,703"],
              [<a key="p5" href="https://www.wildberries.ru/catalog/434888804/detail.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Mini gel, SUPER FIX <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₽3.33M", "10,308"],
              [<a key="p6" href="https://www.wildberries.ru/catalog/564580844/detail.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Keratin hair mask <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₽1.71M", "3,274"],
              [<a key="p7" href="https://www.wildberries.ru/catalog/105037347/detail.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">SOS face toner <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "₽1.10M", "1,259"],
            ]}
            source={<><a href="https://mpstats.io" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">MPSTATS</a> <span className="text-[var(--color-border)] mx-1.5">·</span> Wildberries</>}
          />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Brow gels are the number-one consumable. It runs out - they buy again. But PUSY didn&apos;t stop at gels. Shampoos, masks, toners, mascara, self-tanner - <span className="font-mono">1,377</span> items. Every one a consumable. Every one a reason to return. The core price band: <span className="font-mono">₽400–1,060</span>.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            What did Borodavkin do? He didn&apos;t film Stories. He built: manufacturing, logistics, marketplaces, finance. Wildberries, Ozon, Magnit Cosmetic, Golden Apple, L&apos;Étoile, four marketplaces in China. In 2025 - Amazon and the Middle Eastern Noon. Hundreds of micro-influencers instead of one big one.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-8">
            Lick Beauty - four SKUs. One marketplace. One market.
          </p>

          <h3 className="text-[17px] font-bold text-[var(--color-text)] mt-10 mb-4">VOIS: no creator at all - 2.5 billion rubles</h3>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Now a case that breaks the whole familiar scheme.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            VOIS is a skincare brand. Founded in 2021 by Islam Gediev from Kislovodsk and Vladimir Zagorsky from Volozhin, Belarus. Two entrepreneurs. No founding creator. None at all.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Per Forbes and SPARK, VOIS revenue in 2024 was <span className="font-mono">₽2.5</span> billion (~<span className="font-mono">$28M</span>). Up from <span className="font-mono">₽388</span> million in a year. A <span className="font-mono">6.5×</span> jump. Profit - <span className="font-mono">₽592</span> million. Gediev is <span className="font-mono">30</span>. A 2025 Forbes «30 Under 30» winner.
          </p>

          <div className="my-6 border border-[var(--color-border)] rounded-[3px] overflow-hidden">
            <Image src="/blog/why-blogger-brands-fail/vois-forbes.webp" alt="VOIS — Forbes «30 Under 30» 2025, ₽2.5bn revenue" width={1200} height={800} className="w-full h-auto" />
            <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">VOIS <span className="text-[var(--color-border)] mx-1.5">·</span> <a href="https://www.wildberries.ru/brands/vois" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Wildberries</a></p>
          </div>

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Their move: they were the first in Russia to put influencers on staff. Not one-off integrations. On payroll. Today - <span className="font-mono">200</span> creators. Half the company. A constant content conveyor that runs every day, not whenever someone&apos;s in the mood to film a Story. Revenue went from <span className="font-mono">₽388</span>M to <span className="font-mono">₽2.5</span>bn in a year, <span className="font-mono">+544%</span> (a <span className="font-mono">6.5×</span> jump).
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Global cases ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">From Almaty to Los Angeles: the same pattern</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            If the Lick Beauty story were unique, you could write it off as bad luck. But it isn&apos;t unique. It&apos;s the rule.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Jaclyn Hill. One of YouTube&apos;s biggest beauty influencers. Jaclyn Cosmetics - launched in 2019 through Forma Brands. Customers found stray fibers in the lipsticks. A full recall, a relaunch, a rollout into Ulta Beauty.
          </p>

          <div className="my-6 border border-[var(--color-border)] rounded-[3px] overflow-hidden">
            <Image src="/blog/why-blogger-brands-fail/jaclyn-hill.webp" alt="Jaclyn Cosmetics — Jaclyn Hill's brand, shut down in 2024" width={1200} height={800} className="w-full h-auto" />
            <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">Jaclyn Cosmetics <span className="text-[var(--color-border)] mx-1.5">·</span> Source: <a href="https://cosmeticsbusiness.com/jaclyn-hill-make-up-brand-jaclyn-cosmetics-closing" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Cosmetics Business</a></p>
          </div>

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            January 2023 - Forma files for bankruptcy. January 2024 - Jaclyn Cosmetics shuts down. Hill was offered the chance to buy the brand back. She declined. Forma&apos;s new president then said a line worth carving in stone: «Product first, not influencer first».
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Different countries. Different industries. Different scales. The same ending.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── The conveyor ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">The conveyor</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            There&apos;s one detail that, to me as an analyst, is the most telling in the whole story.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Lick Beauty isn&apos;t Yusupov&apos;s only beauty brand. The same founders - Yusupov and Zhali - own Glam Me, which makes BlushMe, a blush line by Aiym Seitmetova, a former Yuframe member.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            The model is on a conveyor. Inner-circle creator - brand - China - Stories - first-month revenue. Repeat.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            A conveyor isn&apos;t a flaw in itself. The flaw is when the conveyor has no part for where the business keeps running after the Stories end.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Market ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Even if you become #1 - is the market big enough?</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Say it&apos;s all fixed. Distribution cleaned up, the line expanded, an operating partner found. You&apos;re number one.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            The niche leader, Sen Sulu, does <span className="font-mono">₸26</span> million a month. The entire lipstick category on Kaspi - about <span className="font-mono">₸116</span> million. That&apos;s <span className="font-mono">$230,000</span> for the whole niche. On all of Kaspi. For a brand with a seven-million audience, that&apos;s the ceiling of a single office.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Kazakhstan isn&apos;t a sentence. But Kaspi alone is a voluntary limit.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── What the data shows ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">What the data shows but the Stories don&apos;t</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            These aren&apos;t accusations. They&apos;re things you see when you look at the market from behind the numbers, not from behind a phone camera.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-3">
            <strong className="text-[var(--color-text)]">Consumables.</strong> Micellar water, toners, masks, patches - anything that runs out. One gloss - LTV of ~<span className="font-mono">₸5,500</span>. A consumables line - <span className="font-mono">₸40,000–60,000</span> a year. An <span className="font-mono">8–10×</span> difference.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-3">
            <strong className="text-[var(--color-text)]">Price.</strong> In our markets, price is the main filter. Rhode knockoffs at <span className="font-mono">₸420</span> are an impulse buy. A <span className="font-mono">₸5,990</span> gloss is a deliberate decision that won&apos;t happen without a fresh warm-up. Can&apos;t compete on price - offer value that justifies the gap.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-3">
            <strong className="text-[var(--color-text)]">A partner with unit economics.</strong> PUSY had Borodavkin. VOIS had Zagorsky and Gediev. Lick Beauty has two creators and a friend-cofounder.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-3">
            <strong className="text-[var(--color-text)]">Channels.</strong> WB and Ozon are already in Kazakhstan. The Russian market is <span className="font-mono">10–15×</span> bigger.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-3">
            <strong className="text-[var(--color-text)]">Distribution control.</strong> <span className="font-mono">19</span> sellers, a spread from <span className="font-mono">₸5,800</span> to <span className="font-mono">₸16,995</span>, a seller with <span className="font-mono">13%</span> returns - chaos.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            <strong className="text-[var(--color-text)]"><span className="font-mono">200</span> micro-influencers instead of one mega-influencer.</strong> A conveyor that doesn&apos;t depend on one person&apos;s mood.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Finale ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">The hype ends. The processes don&apos;t</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Arman and Karina are talented people. That has to be said without reservation. Seven million followers can&apos;t be bought or botted. Yuframe is a cultural phenomenon. Lick&apos;s ratings are <span className="font-mono">4.8–5.0</span>. Customers are happy. These people know how to make things audiences love.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            But pleasing an audience and running a business are two different crafts. Followers are attention. A business is repeat sales. Between the first and the second sit operations, logistics, finance, and a partner who builds all of it.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            The «launch a gloss and sell it through Stories» model doesn&apos;t work. Not here, not in America, not for anyone. What works is the other thing: an operating partner. Consumables. An army of micro-influencers. Many channels. Price control.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            <span className="font-mono">₸43.6</span> million in August isn&apos;t a business. It&apos;s a flash. The business is what&apos;s left when the flash fades.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Lick Beauty has a <span className="font-mono">5.0</span> rating. The product is good. The audience is huge. There&apos;s a chance. But it takes giving up on selling gloss through Stories and starting to build a company.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            And one last thing - remember that fact from the middle? Chinese Rhode knockoffs at <span className="font-mono">₸420</span> - one photo on the listing, no followers, no face, not a single Story - earned <span className="font-mono">₸7.1</span> million on Kaspi in February. Lick Beauty, with its seven-million audience - <span className="font-mono">₸3.3</span> million. Is it worth pouring in months of work, manufacturing, logistics, and the warm-up of a multimillion audience - only to sell half as much as a knockoff with one photo and a <span className="font-mono">₸420</span> price tag?
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Sources ─── */}
        <div className="mb-12">
          <h2 className="text-[16px] font-bold tracking-tight text-[var(--color-text)] mb-4">Sources</h2>
          <div className="font-mono text-[11px] text-[var(--color-dim)]/70 leading-relaxed space-y-3">
            <p>Sales data for Lick Beauty, Sen Sulu, LUXVISAGE, Vivienne Sabo, Romand, Maybelline, and «No brand» products on Kaspi.kz - <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Redstat</a>, a marketplace-analytics system.</p>
            <p>PUSY revenue (Drozh Beauty LLC, INN 9705156525) - <a href="https://spark-interfax.ru" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">SPARK-Interfax</a>; <a href="https://shoppers.media" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Shoppers.media</a>, Oct 31, 2025; <a href="https://saby.ru" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Saby.ru</a>.</p>
            <p>PUSY sales on Wildberries for Jan 26 – Feb 24, 2026 - <a href="https://mpstats.io" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">MPSTATS</a>.</p>
            <p>VOIS revenue (Rocket Launch LLC) - <a href="https://www.forbes.ru/svoi-biznes/537023-kak-brend-kosmetiki-s-marketplejsov-zarabatyvaet-milliardy-za-scet-stata-blogerov" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Forbes.ru</a>, Jul 1, 2025; <a href="https://spark-interfax.ru" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">SPARK-Interfax</a>.</p>
            <p>Corporate structure of StartUp Studio and Glam Me - <a href="https://finratings.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Finratings.kz</a>, Aug 8, 2025.</p>
            <p>Jaclyn Cosmetics / Forma Brands - <a href="https://cosmeticsbusiness.com/jaclyn-hill-make-up-brand-jaclyn-cosmetics-closing" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Cosmetics Business</a>; <a href="https://www.businessoffashion.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Business of Fashion</a>, Jan 1, 2024; <a href="https://www.retaildive.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Retail Dive</a>, Jan 5, 2024.</p>
            <p>Russian cosmetics market - <a href="https://www.kommersant.ru" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Kommersant FM</a>, Oct 30, 2025; <a href="https://style.rbc.ru" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">RBC Style</a>, Apr 23, 2025.</p>
          </div>
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
