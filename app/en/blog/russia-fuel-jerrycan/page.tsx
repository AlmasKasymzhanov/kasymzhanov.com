"use client";

import { ReadTracker } from "@/components/read-tracker";
import { SiteHeader, SiteFooter, AuthorBlock } from "@/components/canon/site-chrome";
import { ArticleHeader } from "@/components/canon/article-header";
import { Term, Fn } from "@/components/canon/term";
import { EngagementProvider } from "@/components/engagement/engagement-provider";
import { EngagementBar } from "@/components/engagement/engagement-bar";
import { Comments } from "@/components/engagement/comments";
import {
  Grafik1,
  Grafik2a,
  Grafik3search,
  GrafikRegions,
  GrafikArtikuly,
  GrafikArbitrage,
  Grafik5,
  Grafik6,
} from "@/components/charts/russia-fuel-jerrycan-en";

/* Monochrome link for captions / sources (canon: links never carry accent). */
function Src({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors"
    >
      {children}
    </a>
  );
}

const Dot = () => <span className="text-[var(--color-border)] mx-1.5">·</span>;

function ChartSlot({
  n,
  type,
  title,
  caption,
  note,
  children,
}: {
  n: number;
  type: string;
  title: string;
  caption: React.ReactNode;
  note?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <figure
      id={`grafik-${n}`}
      data-chart-slot={n}
      data-chart-type={type}
      className="my-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[3px] p-5"
    >
      <figcaption className="mb-4">
        <span className="block text-[15px] font-bold text-[var(--color-text)] leading-snug">{title}</span>
      </figcaption>
      <div data-chart-canvas>{children}</div>
      {note && (
        <p className="font-mono text-[10px] italic text-[var(--color-dim)]/70 mt-3 leading-relaxed">{note}</p>
      )}
      <p className="font-mono text-[11px] text-[var(--color-dim)] mt-2 leading-relaxed">
        {caption}
        <span className="text-[var(--color-border)] mx-1.5">·</span>
        Charts:{" "}
        <a
          href="https://brockui.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-dim)] hover:text-[var(--brock-accent)] hover:underline decoration-dotted underline-offset-2 transition-colors"
        >
          Brock UI
        </a>
      </p>
    </figure>
  );
}

function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[15px] text-[var(--color-dim)] leading-[1.8] ${className}`}>{children}</p>;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">{children}</h2>;
}

/* ═══════════════════════════════════════════════════ */
export default function JerrycanArticleEn() {
  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <ReadTracker slug="russia-fuel-jerrycan" />
        <SiteHeader />
        <EngagementProvider slug="russia-fuel-jerrycan">
          <article className="w-full max-w-[680px] mx-auto px-6 py-12 md:py-20">

            <ArticleHeader
              locale="en"
              kicker="Data brief"
              title={<>The State Closed the Statistics.<br />The Market Opened a Jerrycan.</>}
              subtitle={
                <>
                  A shortage you can&rsquo;t announce, you can still count &mdash; one jerrycan at a time. In the summer of 2026 Russian pumps are rationing fuel and official fuel output has been classified since 2024 &mdash; so the country&rsquo;s most honest crisis gauge becomes a marketplace warehouse.
                </>
              }
              slug="russia-fuel-jerrycan"
              date="June 29, 2026"
              readMin={12}
              hero={{
                src: "/blog/russia-fuel-jerrycan/cover-en.webp",
                alt: "A jerrycan with a sharp chart spike bursting upward from its spout instead of fuel",
                credit: "Illustration: Almas Kasymzhanov · Higgsfield AI",
                width: 1600,
                height: 1200,
              }}
            />

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── Lead ─── */}
            <div className="mb-12">
              <P className="mb-5">
                Every crisis has an instrument that notices it first. Not Rosstat, not the filling station, not the television. A marketplace warehouse.
              </P>
              <P className="mb-5">
                While the zeros lit up on the pump displays and officials called the queues a panic, the marketplace was logging what no one announces from a podium but everyone leaves in the order log. On 23 June 2026, in a single day, people there bought{" "}
                <Term tip="Daily orders of fuel jerrycans on Wildberries: 1,427 units on 23.06.2026 vs 435 units on 23.06.2025. Source: MPStats / WB.">
                  1,427 jerrycans
                </Term>{" "}
                for fuel.
                <Fn n={1} tip="MPStats — Wildberries data. Daily series and extended product cut of the fuel-jerrycan category, 01.03–27.06 (2025 and 2026). Author&rsquo;s calculations." />
                {" "}A year earlier, on the very same day &mdash; 435.
              </P>
              <P className="mb-5">
                A marketplace doesn&rsquo;t comment, doesn&rsquo;t panic and doesn&rsquo;t reassure. It simply records what people are spending money on right now. And when the official statistics go dark, that log stays the country&rsquo;s most honest gauge. The barometer the state forgot to ban.
              </P>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── There's a Shortage. There's No Counter ─── */}
            <div className="mb-12">
              <H2>There&rsquo;s a Shortage. There&rsquo;s No Counter</H2>
              <P className="mb-5">
                Summer 2026. A country that pumps oil is rationing fuel: &ldquo;full tank only,&rdquo; 30&ndash;40 litres per customer, no filling jerrycans &mdash; in no fewer than 56 regions.
                <Fn n={2} tip="Zona.Media — map of restrictions (56 regions, in 18 mandatory limits for all stations); Pravda.com.ua, Meduza — limit details, ~20 L/person in Crimea. End of June 2026." />
                {" "}The cause isn&rsquo;t in the ground but in the refining: a run of shutdowns at refineries cut gasoline output by roughly a quarter year on year by mid-June.
                <Fn n={3} tip="HydrocarbonProcessing — gasoline output −25%, 90k t/day (765k bbl); Moscow Times — refining at its lowest since 2009; IEA — refining &laquo;just under 5M bbl/day&raquo; in June, 4.58M in May (16-year low)." />
                {" "}The queues and the dark pump displays &mdash; everyone has written about those; we won&rsquo;t repeat them.
              </P>
              <P className="mb-5">
                The price shot where the regulator couldn&rsquo;t reach: on Crimea&rsquo;s black market a litre ran as high as 200 rubles &mdash; against 65&ndash;71 at the pump.
                <Fn n={4} tip="The Counteroffensive — Crimea black market ~200 ₽/L; globalpetrolprices — official retail AI-92 65.4 ₽, AI-95 71.1 ₽ (15.06.2026). Outside Crimea the upper bound and a wider &laquo;southern Russia&raquo; figure are not separately confirmed." />
                {" "}What&rsquo;s more interesting is what a person does after looking at that queue and deciding tomorrow will be worse. They go to stock up. And there&rsquo;s nothing to stock up in: selling fuel on the marketplace has been banned. So they buy what&rsquo;s still allowed &mdash; empty cans.
              </P>
              <P>
                And the main instrument the country switched off itself: monthly gasoline output{" "}
                <Term tip="Rosstat stopped publishing monthly gasoline-output data at the end of May 2024, and on 29 August 2024 classified the rest of the refined products (diesel, fuel oil, LPG) as well.">
                  Rosstat stopped publishing
                </Term>{" "}
                back in 2024.
                <Fn n={5} tip="Interfax — Rosstat stopped publishing gasoline data (end of May 2024) and the rest of the refined products (29 August 2024). The Energy Ministry: disclosure &laquo;could become grounds for manipulation&raquo;." />
                {" "}There&rsquo;s a shortage &mdash; but no number for it. So it has to be measured indirectly: with the counter they forgot to switch off. This isn&rsquo;t about politics or the front &mdash; it&rsquo;s about what&rsquo;s visible in a marketplace&rsquo;s log once the official tally has been zeroed out. And there&rsquo;s a lot to see there.
              </P>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── Why a Jerrycan, of All Things ─── */}
            <div className="mb-12">
              <H2>Why a Jerrycan, of All Things</H2>
              <P className="mb-5">
                A marketplace records millions of decisions a day, and almost every one is somebody&rsquo;s small forecast about the future. Most goods make poor indicators: demand for generators is smeared by blackouts, for scooters by regulation. The jerrycan is clean. People buy it for one thing. Not for the dacha in winter, not as a gift. For fuel they&rsquo;re afraid they won&rsquo;t get.
              </P>
              <P>
                And here it&rsquo;s important not to confuse three different things that even the business press trips over. First: on the recommendation of{" "}
                <Term tip="FAS — Russia&rsquo;s Federal Antimonopoly Service.">FAS</Term>{" "}
                the marketplaces pulled fuel itself off the shelves as a product &mdash; Ozon, Wildberries and Avito have blocked such listings at moderation since 22 June.
                <Fn n={6} tip="Meduza, Moscow Times, Oreanda — Ozon, Wildberries and Avito stopped selling fuel on FAS&rsquo;s recommendation/request from ~22 June 2026; the agency saw signs of speculative resale." />
                {" "}Second: some filling stations stopped pouring fuel into jerrycans. Third, which never happened: nobody banned empty jerrycans. They&rsquo;re sold freely. The ban landed on fuel &mdash; and the demand spilled into the can, and the can became the storefront of the panic.
              </P>
              <P className="mt-5">
                Reading a crisis by the jerrycan is no new trick. It was done in the US in 2021 and in Britain that same autumn. We&rsquo;ll come back to them: they prove the instrument works.
              </P>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── The Curve the News Tickers Never Show ─── */}
            <div className="mb-12">
              <H2>The Curve the News Tickers Never Show</H2>
              <P className="mb-5">
                Here&rsquo;s what a shortage looks like if you watch not the pump but the warehouse.
              </P>
              <P className="mb-5">
                Per{" "}
                <Term tip="MPStats — a marketplace deep-analytics service (here: Wildberries data).">MPStats</Term>, from 1 March to 27 June 2026 the fuel-jerrycan category on Wildberries logged{" "}
                <Term tip="69,978 orders in 2026 vs 43,057 in 2025 over the same period (+62.5%); revenue 91.0 vs 39.0M ₽ (+133.6%).">
                  69,978 orders worth 91 million rubles
                </Term>. Over the same stretch a year earlier &mdash; 43,057 orders worth 39 million.{" "}
                <Term tip="&laquo;Year on year&raquo; — comparison with the same period a year earlier.">YoY</Term>{" "}
                demand grew 62 percent, revenue 134.
              </P>
              <P>
                But the annual total hides the main thing. What matters isn&rsquo;t the volume but the shape. In mid-June the flat line steps up, and the step lands to the day on the fuel-sales ban of 20&ndash;22 June. On the 18th &mdash; 658 orders, +19% year on year. Then the run-up: the 20th &mdash; 857, the 21st &mdash; 1,018, the 22nd &mdash; 1,123. 23 June, the peak:{" "}
                <Term tip="1,427 orders on 23.06.2026 — that&rsquo;s +228% on 435 orders on 23.06.2025 and 4.7× the average March day (306/day).">
                  1,427 orders, +228 percent
                </Term>{" "}
                year on year and 4.7× the average March day. The ban didn&rsquo;t kill demand. It poured it into the marketplace&rsquo;s warehouse.
              </P>

              <ChartSlot
                n={1}
                type="line, daily"
                title="Jerrycans spiked the day fuel was pulled"
                caption={<>Source: MPStats (Wildberries)</>}
                note="Shaded band — the fuel-sales ban of 20–22 June. Daily orders, 2026 over 2025."
              >
                <Grafik1 />
              </ChartSlot>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── Or Maybe It's Just Summer ─── */}
            <div className="mb-12">
              <H2>Or Maybe It&rsquo;s Just Summer</H2>
              <P className="mb-5">
                Here an honest piece has to stop and ask itself. Jerrycans get pricier every June: the dacha, the riding season, road trips. What if the whole rise is the season, not the crisis?
              </P>
              <P className="mb-5">
                Let&rsquo;s test it on last year &mdash; same weather, same dachas. In 2025 demand from March to late June grew 1.88×. In 2026 &mdash;{" "}
                <Term tip="Growth Mar→late June: 2025 ×1.88, 2026 ×3.51; excess over ordinary seasonality — ×1.86 (≈ +86% over what the calendar alone predicts).">
                  3.51×
                </Term>. The excess over normal seasonality is 1.86×. Late June ran about 86 percent above what the calendar alone predicts. The season explains half. The other half is explained by fear.
              </P>

              <ChartSlot
                n={2}
                type="multiplier bars"
                title="Season or panic? 2025 shows the norm"
                caption={<>Source: MPStats (Wildberries)</>}
                note="How many times demand grew from March to late June. Every year demand rises into summer — in 2025, by 1.88×. In 2026, by 3.51×, nearly double the usual. That excess over the norm is the panic."
              >
                <Grafik2a />
              </ChartSlot>

              <P>
                And it shows up not only in purchases but in search &mdash; where a person is at their most honest, because they&rsquo;re talking not to a neighbour but to a box. On{" "}
                <Term tip="Google Trends — a Google service; relative interest 0–100, normalised to the query&rsquo;s own peak, not an absolute count. Years can be compared only by the shape of the curve.">
                  Google Trends
                </Term>{" "}
                interest in &ldquo;jerrycan&rdquo; in 2026 rose almost vertically from early May to late June, elevenfold from the first week to the last. In 2025, over the same months &mdash; a flat sawtooth with no spike.
                <Fn n={7} tip="Google Trends — &laquo;jerrycan/канистра&raquo; (Russia). Normalised to the query&rsquo;s peak; compared by shape. Weekly means: 2026 ramp ~7→62, 2025 flat ~46–68." />
                {" "}On{" "}
                <Term tip="Wordstat — Yandex&rsquo;s tool for gauging search-query frequency.">Yandex Wordstat</Term>{" "}
                the frequency of the word &ldquo;jerrycan&rdquo; added 29 percent from March to May, and that&rsquo;s before the June peak; in May it ran 23 percent above the year before. Two independent search engines draw the very same hill.
              </P>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── The Market Overpaid — and Gave Itself Away ─── */}
            <div className="mb-12">
              <H2>The Market Overpaid &mdash; and Gave Itself Away</H2>
              <P className="mb-5">
                The market didn&rsquo;t just snap up jerrycans. It overpaid for them &mdash; and, out loud, said its fear into the search bar.
              </P>
              <P className="mb-5">
                The{" "}
                <Term tip="Average order value — the average sum of a single order (revenue ÷ number of orders).">average order value</Term>{" "}
                in the category rose 44 percent over the year: from 905 to 1,301 rubles. And in the most acute month, June, it nearly doubled year on year:{" "}
                <Term tip="June average order value: 1,766 ₽ in 2026 vs 908 ₽ in 2025 (+94%).">1,766 against 908</Term>. You could pin that on the cheap cans being cleared out, leaving the pricey models. But the markup shows on a single product too. One and the same 20-litre jerrycan from one seller:{" "}
                <Term tip="The same 20 L jerrycan, the same listing: average purchase price over 28 days — 1,655 ₽, over the last week — 2,386 ₽.">
                  average purchase price over 28 days &mdash; 1,655 rubles, over the last week &mdash; 2,386
                </Term>. Same product, same link, rising tag. This isn&rsquo;t a basket shift. This is the price of fear.
              </P>

              <P>
                And what exactly they feared shows in the queries. The query &ldquo;jerrycan&rdquo; itself &mdash; almost two million impressions a month, and nearly a third of them literally contain &ldquo;for fuel&rdquo; (576 thousand): they searched not for an abstract can but for one under fuel. And against that backdrop &mdash; panic in the search bar&rsquo;s own words: &ldquo;filling jerrycans at the station&rdquo; &mdash; 93 thousand, &ldquo;can you put fuel in a jerrycan&rdquo; &mdash; 76 thousand, &ldquo;fuel into a jerrycan at the station&rdquo; &mdash; 55 thousand. And the truly crisis-grade ones, the kind that never come up in a calm year: &ldquo;jerrycan Crimean bridge&rdquo; &mdash; 30 thousand, &ldquo;jerrycans across the bridge&rdquo; &mdash; 25 thousand, &ldquo;jerrycans banned&rdquo; &mdash; 22 thousand.
                <Fn n={8} tip="Yandex Wordstat, &laquo;Top queries&raquo; for 29.05–27.06.2026 (all regions, all devices): &laquo;jerrycan&raquo; — 1,940,545 impressions, of which &laquo;jerrycan for fuel&raquo; — 575,733 (≈30%). From a full read of the top-2,000 phrasings; the &laquo;how to stockpile / pour fuel&raquo; cluster runs to hundreds of thousands of impressions. Monthly &laquo;jerrycan&raquo; dynamics — +23% vs May a year earlier. Queries are English glosses of the Russian originals." />
                {" "}This is panic recorded not by a correspondent but by the buyer themselves, in the search query&rsquo;s own words. The search bar turned out to be more honest than the press conference.
              </P>

              <ChartSlot
                n={8}
                type="list"
                title="The market gave itself away: what they searched in a panic"
                caption={<>Source: Yandex Wordstat</>}
                note="Top — the month's «jerrycan» queries (1.94M total; nearly a third literally «for fuel»). Bottom — tell-tale phrases: how to stockpile fuel («filling at the station», «can you put fuel») and the shortage itself («Crimean bridge», «across the bridge», «banned»). English glosses of the Russian queries."
              >
                <Grafik3search />
              </ChartSlot>

              <P>
                And search shows exactly where it burns. Interest in &ldquo;jerrycan&rdquo; in Crimea runs 4.5&ndash;5.5× the national average, and the whole south follows. That very &ldquo;jerrycan Crimean bridge&rdquo;: people were searching how to haul fuel to where it doesn&rsquo;t get delivered. The search bar drew a map of the shortage &mdash; and its epicentre is Crimea.
              </P>

              <ChartSlot
                n={9}
                type="horizontal bars"
                title="&laquo;Jerrycan&raquo; was searched far harder in Crimea and the south"
                caption={<>Source: Yandex Wordstat (28.05–28.06.2026)</>}
                note="Affinity index: ×1 = the national average interest. In Simferopol, interest in «jerrycan» is 5.5× the usual — search points to the shortage's epicentre."
              >
                <GrafikRegions />
              </ChartSlot>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── The Shortage Jumped From the Pump to the Shelf ─── */}
            <div className="mb-12">
              <H2>The Shortage Jumped From the Pump to the Shelf</H2>
              <P className="mb-5">
                A marketplace warehouse has something a filling station doesn&rsquo;t &mdash; a memory of every delivery. And it shows the shelf emptied exactly the way the tank did.
              </P>
              <P className="mb-5">
                Per MPStats, the{" "}
                <Term tip="Turnover — how many days it takes to sell the current stock; 0 days = the item sells the day it arrives.">
                  turnover
                </Term>{" "}
                of jerrycans in June fell to zero: stock left the day it arrived.{" "}
                <Term tip="Stock cover — how many days the warehouse lasts at the current sales pace. Zero = the shelf is empty.">
                  Stock cover
                </Term>{" "}
                across every selling listing came out at zero. By month&rsquo;s end, 98 percent of the category&rsquo;s{" "}
                <Term tip="A listing (product card) — a single position/ad on a marketplace.">listings</Term>{" "}
                stood with empty stock. Sellers tried to catch up: in June they opened{" "}
                <Term tip="154 new listings a day in June vs 25 in May — a 6.2× rise. New listings by First Date, cleaned jerrycan assortment.">
                  six times the usual number of new listings
                </Term>, a hundred and fifty a day against twenty-five in May.
                <Fn n={9} tip="MPStats — extended product cut of Wildberries (cleaned jerrycan assortment ~13k listings): new listings by First Date, Balance, Turnover, Sales Per Day, Revenue, SKUs. Author&rsquo;s calculations." />
                {" "}But opening a listing isn&rsquo;t bringing in stock. Of those newcomers, sales happened for half a percent; the rest stayed empty storefronts &mdash; prospectors who&rsquo;d rushed the gold rush with empty pans.
              </P>
              <P className="mb-5">
                The upshot is simple and neat in its logic: the shortage didn&rsquo;t stay at the pump. It jumped from the fuel pump to the marketplace&rsquo;s storage shelf. The same dry tank, only online.
              </P>
              <P>
                And the money, as ever, went not to those who rushed in but to those who&rsquo;d sat in the niche for years. Two aluminium &ldquo;Demidovsky&rdquo; jerrycans from one seller &mdash; a 10-litre (art. 292065586) and a 20-litre (292065587) &mdash;{" "}
                <Term tip="Two Demidovsky listings: 10 L (art. 292065586) — 7,321 orders / 17.2M ₽ and 20 L (292065587) — 3,412 / 15.9M ₽ over the period = 42% of the fuel assortment&rsquo;s revenue.">
                  took 42 percent of the whole category&rsquo;s revenue
                </Term>. And it was they who caught the surge: over June, sales of the 10-litre grew 2.2×, the 20-litre tripled. Whoever had stock on the shelf skimmed the cream. The crisis paid the patient.
              </P>

              <ChartSlot
                n={10}
                type="two lines"
                title="The crisis paid the patient: two &laquo;Demidovsky&raquo; SKUs surged in June"
                caption={<>Source: MPStats (Wildberries), monthly</>}
                note="Monthly sales of the two top SKUs. Whoever had stock on the shelf caught the surge: 10 L +118%, 20 L +215% in June. Newcomers with empty storefronts missed it."
              >
                <GrafikArtikuly />
              </ChartSlot>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── We've Seen This Before: Britain and the US ─── */}
            <div className="mb-12">
              <H2>We&rsquo;ve Seen This Before: Britain and the US</H2>
              <P className="mb-5">
                To tell whether this is an anomaly or a law, let&rsquo;s see how the same instrument fired in other countries. A caveat up front, because the data is of different kinds: these are three readings of one phenomenon by different instruments, not one chart across three countries. In Russia we have four axes &mdash; sales, price, search, restocking pace. Britain and the US have one each, and showing their quality honestly matters more than hiding it.
              </P>
              <P className="mb-5">
                Britain, autumn 2021. A shortage of tanker drivers triggered disruptions and panic at the pumps. Halfords reported that over a single weekend (25&ndash;26 September) jerrycan sales rose 1,656 percent, and &ldquo;jerry can&rdquo; became the fourth-most-searched term on its site; e-bike orders more than doubled alongside.
                <Fn n={10} tip="City A.M., Motoring Research, The Retail Bulletin — Halfords: jerrycan sales +1,656% over the weekend, &laquo;jerry can&raquo; the 4th query on its site, e-bike orders more than doubled. Exact calendar dates not named in sources (published 27–28 September 2021, &laquo;this weekend&raquo;)." />
              </P>
              <P className="mb-5">
                The US, May 2021. A cyberattack shut down the Colonial Pipeline, which carried 45 percent of the East Coast&rsquo;s fuel; the 7&ndash;13 May outage hit some 12 thousand filling stations.
                <Fn n={11} tip="Wikipedia / Colonial Pipeline — attack 7–13 May 2021, 45% of East Coast fuel, ~12,000 stations. GasBuddy — demand +40.1% across five pipeline states. CBS — CPSC warning." />
                {" "}And here honesty beats effect: there&rsquo;s no direct figure for jerrycan sales in open sources &mdash; that&rsquo;s a gap in the data. But an indirect trace remains. The query &ldquo;gas can&rdquo; on Google was flat before the attack, then on day five of the outage jumped 3.5× over base and promptly collapsed. And the authorities issued an official warning &mdash; on 12 May the Consumer Product Safety Commission asked people &ldquo;not to fill plastic bags with gasoline.&rdquo;
              </P>
              <P>
                And here&rsquo;s the difference that makes the Russian case not a repeat but an escalation. The American pipe was down for six days, Britain&rsquo;s driver shortage was sorted in weeks &mdash; and the jerrycan surge there was a flash: peak and retreat within two to four weeks. The Russian shortage rests not on a pipe or on drivers but on the state of the plants themselves. That doesn&rsquo;t get fixed in five days. Which means the jerrycan in Russia risks becoming not a flash but a market.
              </P>

              <ChartSlot
                n={5}
                type="three mini panels"
                title="The jerrycan as a crisis gauge: three countries, one script"
                caption={<>Source: Halfords (via <Src href="https://www.cityam.com">City A.M.</Src>) <Dot /> <Src href="https://trends.google.com">Google Trends</Src> <Dot /> MPStats (Wildberries)</>}
                note="Different kinds of data — hence three separate panels, not one scale: Britain — sales, US — search, Russia — sales."
              >
                <Grafik5 />
              </ChartSlot>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── Closer to Home: One Jerrycan, Two Markets ─── */}
            <div className="mb-12">
              <H2>Closer to Home: One Jerrycan, Two Markets</H2>
              <P className="mb-5">
                The crisis is in Russia, but this piece is read in Kazakhstan. And here you can see what no filling station will show: one and the same jerrycan lives two different lives on two neighbouring storefronts.
              </P>
              <P>
                In Kazakhstan, on the same jerrycans &mdash; no anomalies. Per Redstat, demand on Kaspi grows smoothly and seasonally from spring into summer, as it does every year &mdash; from 1,145 orders in February to 1,976 in May.
                <Fn n={12} tip="Redstat — Kaspi data (Kazakhstan), summary 01.03–15.06.2026: 6,607 orders, revenue 43.46M ₸, 316 products, 236 sellers; monthly Dec 1,452 → May 1,976. From screenshots (no machine-readable Kaspi CSV). No 2025 comparison — last year&rsquo;s summary isn&rsquo;t in the data; the contrast with Russia is by curve shape, not by average order value." />
                {" "}None of the sharp jump that in Russia coincided with the fuel ban; the curve runs as an even hill. And the assortment is calm: the same models trade in the Kazakh top for a third, fourth, fifth year, and not a single newcomer popped up for the crisis.
              </P>
              <P className="mt-5">
                One and the same product. A border between two warehouses &mdash; and two different curves. In Russia the jerrycan became an instrument measuring fear: a sharp peak on 23 June. In Kazakhstan it stayed just a jerrycan: an even seasonal hill. The anomaly reads not in the units themselves but in the shape of the curve &mdash; and by that measure it stopped at the border.
              </P>

              <ChartSlot
                n={6}
                type="columns by month"
                title="In Kazakhstan &mdash; a smooth seasonal hill, no jump"
                caption={<>Source: Redstat (Kaspi)</>}
                note="Monthly jerrycan orders on Kaspi (Dec 2025 → May 2026). Smooth, seasonal growth — not a single anomaly day like Russia's 23 June."
              >
                <Grafik6 />
              </ChartSlot>

              <P className="mt-8">
                And the shortage leaves one more fingerprint, visible only from two storefronts at once: it pulled neighbouring markets&rsquo; prices apart. The same 20-litre plastic jerrycan on Kaspi (article 109030553) costs 4,900 tenge &mdash;{" "}
                <Term tip="4,900 ₸ × 0.159 = ≈780 ₽. CBR rate, 27.06.2026.">about 780 rubles</Term>; on Wildberries the same one goes for roughly 1,200 rubles in normal times and ran up to 2,400 in the crisis week. One-and-a-half to three times the difference across a single border. And somebody earns on gaps like that: big players arbitrage the fuel itself, an enterprising seller &mdash; the can, hauling 20-litre jerrycans in from Kazakhstan at the hottest moment. This is not investment advice: the spread is eaten by marketplace fees and the logistics of a bulky good, and the Russian markup is temporary. But the gap itself is one more trace of the shortage: for a short while the market made even carrying an empty can across a border worth it.
              </P>

              <ChartSlot
                n={11}
                type="two lines"
                title="The crisis pulled prices apart: in Russia the jerrycan climbs, in Kazakhstan it doesn&rsquo;t"
                caption={<>Source: MPStats (Wildberries) <Dot /> Redstat (Kaspi) <Dot /> CBR rate 0.159 ₽/₸</>}
                note="The same 20 L plastic jerrycan. The gap between markets grows from ×1.5 in normal times to ×3 in the crisis week. Not investment advice."
              >
                <GrafikArbitrage />
              </ChartSlot>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── Every Crisis Makes Someone Rich ─── */}
            <div className="mb-12">
              <H2>Every Crisis Makes Someone Rich</H2>
              <P className="mb-5">
                The jerrycan is a special case of an old law: an acute shortage of one good almost always inflates the market for another &mdash; a substitute, or the container to hoard in. And the Russian jerrycan joins a long line.
              </P>
              <P className="mb-5">
                The oil shocks of the 1970s moved America off thirsty cars and onto economical Japanese ones &mdash; their share of the US market rose from 8 percent in the mid-decade to 21&ndash;23 by 1980 and never fell back.
                <Fn n={13} tip="Wikipedia (Automotive industry in Japan; Bike boom) — Japanese share of the US market ~8% (mid-70s) → ~21–23% (1980); the &laquo;bike boom&raquo; 1972–74 (7→15M), amplified by the embargo. (The 26% figure refers to ALL auto imports, not Japanese alone.)" />
                {" "}Gas in Europe-2022 grew dearer &mdash; and everything that heats another way fired off: heat-pump sales added almost 39 percent, firewood and pellets in Germany almost 86 over the year.
                <Fn n={14} tip="EHPA — heat-pump sales in Europe +38.9% in 2022 (3.0M units); Destatis (PE22_N059_61) — firewood and pellets in Germany +85.7% year on year in August 2022." />
                {" "}The 2020 pandemic shut the gyms and the metro &mdash; and demand moved onto bicycles: up 65 percent for the year in the US, e-bikes &mdash; up 145.
                <Fn n={15} tip="NPD Group / CBS / Statista — US bicycle sales +65% in 2020 (some months +100%+), e-bikes +145%." />
              </P>
              <P className="mb-5">
                The law is one: a crisis doesn&rsquo;t destroy demand &mdash; it relocates it. Sometimes for good, like the Japanese cars. More often for a while, like the jerrycans in the US and Britain. Where Russia&rsquo;s fuel demand relocates and whether it settles there will be decided not by the marketplace but by the length of the crisis. The marketplace will merely record it first &mdash; as it recorded everything else.
              </P>
              <P>
                A shortage can&rsquo;t be announced. But it can be counted. One jerrycan at a time.
              </P>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── How this was counted ─── */}
            <div className="mb-12">
              <p className="text-[13px] italic text-[var(--color-dim)] leading-[1.8] border-l-2 border-[var(--color-border)] pl-4">
                Russia (sales, prices, deliveries, SKUs) &mdash; MPStats analytics on Wildberries data: a daily series and an extended product cut of the fuel-jerrycan category, 01.03&ndash;27.06 in 2025 and 2026. The curve and YoY &mdash; across the whole category; the structure (single-product price, restocking pace, concentration, top SKUs) &mdash; across the cleaned jerrycan assortment (~13k listings). Kazakhstan &mdash; Redstat analytics on Kaspi data (values taken from screenshots: no machine-readable Kaspi report exists). Search &mdash; Google Trends and Yandex Wordstat; Google Trends normalises each query to its own peak, so the years are compared by the shape of the curve. Seasonal control &mdash; the March&rarr;late-June rise in 2025 (×1.88) is taken as the seasonal norm; the 2026 excess (×1.86) is attributed to the crisis. Macro &mdash; Reuters and industry sources; monthly gasoline output has not been published officially since 2024. Ozon is not included.
              </p>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── Sources ─── */}
            <div className="mb-12">
              <h2 className="text-[16px] font-bold tracking-tight text-[var(--color-text)] mb-4">Sources</h2>
              <ol className="font-mono text-[12px] text-[var(--color-dim)] leading-[1.7] space-y-3 list-decimal list-inside marker:text-[var(--color-border)]">
                <li>MPStats &mdash; extended product cut and daily series of Wildberries (fuel-jerrycan category, 01.03&ndash;27.06, 2025&ndash;2026): sales, revenue, stock, turnover, SKUs. Kazakhstan (Kaspi) &mdash; Redstat, from screenshots. Author&rsquo;s calculations.</li>
                <li>Fuel-sale restrictions across Russian regions (56 regions, 18 with mandatory limits) &mdash; <Src href="https://en.zona.media/article/2026/06/26/fuel_map">Zona.Media</Src>, <Src href="https://www.pravda.com.ua/eng/news/2026/06/24/8040814/">Pravda.com.ua</Src>, <Src href="https://meduza.io/en/news/2026/06/23/the-region-that-produces-40-of-russia-s-oil-is-now-rationing-fuel">Meduza</Src>.</li>
                <li>Gasoline output &minus;25% (90k t/day) and primary refining 4.58M bbl/day &mdash; <Src href="https://www.hydrocarbonprocessing.com/news/2026/06/russian-gasoline-output-down-25-so-far-in-june-after-drone-attacks-on-refineries/">Hydrocarbon Processing</Src>, <Src href="https://www.themoscowtimes.com/2026/06/11/russian-oil-output-falls-for-sixth-straight-month-as-ukrainian-drone-attacks-hit-infrastructure-a92987">The Moscow Times</Src>, IEA.</li>
                <li>Crimea black market ~200 ₽/L &mdash; <Src href="https://www.counteroffensive.news/p/russias-oil-empire-running-low-on">The Counteroffensive</Src>; official retail &mdash; <Src href="https://www.globalpetrolprices.com/Russia/gasoline_prices/">GlobalPetrolPrices</Src>.</li>
                <li>Rosstat stopped publishing refined-product data (gasoline &mdash; May 2024, the rest &mdash; 29 August 2024) &mdash; <Src href="https://interfax.com/newsroom/top-stories/105511/">Interfax</Src>.</li>
                <li>FAS and the marketplaces (Ozon, Wildberries, Avito) on halting fuel sales, 22 June 2026 &mdash; <Src href="https://meduza.io/amp/en/news/2026/06/22/russia-s-three-biggest-online-marketplaces-ban-fuel-sales">Meduza</Src>, <Src href="https://www.themoscowtimes.com/2026/06/22/russian-antitrust-service-enlists-e-commerce-sites-to-block-speculative-fuel-resales-a93068">The Moscow Times</Src>.</li>
                <li>Google Trends &mdash; &laquo;канистра&raquo;/jerrycan (Russia), &laquo;gas can&raquo; (US). <Src href="https://trends.google.com">trends.google.com</Src>. Normalised to the query&rsquo;s peak.</li>
                <li>Yandex Wordstat &mdash; frequency and top phrases for the word &laquo;канистра&raquo; (jerrycan). <Src href="https://wordstat.yandex.ru">wordstat.yandex.ru</Src>.</li>
                <li>Halfords: jerrycans +1,656% over the weekend, &laquo;jerry can&raquo; the 4th query, e-bikes ×2 &mdash; <Src href="https://www.cityam.com/jerry-can-sales-surge-at-halfords-as-fuel-panic-buying-grips-the-uk/">City A.M.</Src>, <Src href="https://www.motoringresearch.com/car-news/jerry-can-sales-soar/">Motoring Research</Src>.</li>
                <li>Colonial Pipeline (7&ndash;13 May 2021, 45% of the East Coast, ~12,000 stations, GasBuddy +40.1%) &mdash; <Src href="https://en.wikipedia.org/wiki/Colonial_Pipeline">Wikipedia</Src>; CPSC warning (12 May) &mdash; <Src href="https://www.cbsnews.com/news/gas-shortage-plastic-bags-warning-consumer-product-safety/">CBS News</Src>.</li>
                <li>Japan / 1970s bike boom &mdash; <Src href="https://en.wikipedia.org/wiki/Automotive_industry_in_Japan">Wikipedia</Src>, <Src href="https://en.wikipedia.org/wiki/Bike_boom">Bike boom</Src>.</li>
                <li>Europe 2022: heat pumps +38.9% &mdash; <Src href="https://ehpa.org/news-and-resources/publications/european-heat-pump-market-and-statistics-report-2023/">EHPA</Src>; firewood/pellets in Germany +85.7% &mdash; <Src href="https://www.destatis.de/EN/Press/2022/09/PE22_N059_61.html">Destatis</Src>.</li>
                <li>Bicycles 2020 (+65%, e-bikes +145%) &mdash; NPD Group via <Src href="https://www.cbsnews.com/news/bicycle-sales-up-inventory-shortages-coronavirus-pandemic/">CBS News</Src>, <Src href="https://www.statista.com/chart/21794/year-over-year-change-in-bicycle-sales-in-the-us/">Statista</Src>.</li>
              </ol>
            </div>

            {/* ─── Engagement ─── */}
            <div className="mt-12 flex justify-end">
              <EngagementBar />
            </div>
            <Comments />
          </article>
        </EngagementProvider>

        <div className="flex-1" aria-hidden />
        <AuthorBlock variant="horizontal" />
        <SiteFooter />
      </div>
    </div>
  );
}
