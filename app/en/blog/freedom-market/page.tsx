import { ArticleHeader } from "@/components/canon/article-header";
import { ArticleLayout } from "@/components/canon/article-layout";
import { Term, Fn } from "@/components/canon/term";
import {
  Grafik1,
  Grafik2,
  Grafik3,
  Grafik4,
  Grafik5,
  Grafik6,
} from "@/components/charts/freedom-market-en";
import { TengeJourney } from "@/components/charts/tenge-journey";

/* Monochrome link for captions / sources (canon: links never carry accent). */
function Src({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors"
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
  brock = "Chart",
  children,
}: {
  n: number | string;
  type: string;
  title: string;
  caption: React.ReactNode;
  note?: React.ReactNode;
  /* Credit taxonomy: the label names what the element IS (FT/WSJ practice) —
   * Chart for axes/bars/lines, Table, Timeline, Graphic, Interactive. */
  brock?: "Chart" | "Table" | "Timeline" | "Graphic" | "Interactive";
  children?: React.ReactNode;
}) {
  return (
    <figure
      id={`grafik-${n}`}
      data-chart-slot={n}
      data-chart-type={type}
      className="research-figure"
    >
      <figcaption className="mb-5">
        <span className="block text-[15px] font-medium text-[var(--color-text)] leading-snug">{title}</span>
      </figcaption>
      <div data-chart-canvas>{children}</div>
      {note && (
        <p className="font-mono text-[12px] italic text-[var(--color-dim)] mt-4 leading-relaxed">{note}</p>
      )}
      <p className="font-mono text-[12px] text-[var(--color-dim)] mt-2.5 leading-relaxed">
        {caption}
        <span className="text-[var(--color-border)] mx-1.5">·</span>
        {brock}:{" "}
        <a
          href="https://brockui.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-dim)] hover:text-[var(--brock-accent)]    transition-colors"
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
  return <h2 className="text-[20px] font-normal tracking-tight text-[var(--color-text)] mb-6">{children}</h2>;
}

/* ═══════════════════════════════════════════════════ */
export default function FreedomMarketArticleEn() {
  return (
    <ArticleLayout
      slug="freedom-market"
      locale="en"
      header={
        <ArticleHeader
          locale="en"
          kicker="Investigation"
          title={<>The Marketplace Is Dead.<br />It Will Call You.</>}
          subtitle={
            <>
              How Timur Turlov&rsquo;s Freedom is buying a marketplace that stopped paying people, why the holding is resurrecting it under its own name - and why Kaspi, for the first time in a decade, faces a challenger with real ammunition.
            </>
          }
          slug="freedom-market"
          date="July 9, 2026"
          readMin={21}
          hero={{
            src: "/blog/freedom-market/cover.webp",
            alt: "A green chess knight in a shipping box with bubble wrap on a red background; the label has TEEZ crossed out and reads FREEDOM MARKET, from Karaganda, one-day delivery",
            credit: "Illustration: Almas Kasymzhanov · Higgsfield AI",
            width: 1600,
            height: 1195,
          }}
        />
      }
    >
        {/* ─── Lead ─── */}
        <div className="mb-12">
          <p className="font-mono text-[12px] italic text-[var(--color-dim)] mb-6">
            Key figures are given in Kazakhstani tenge (₸) and Russian rubles (₽); at publication, $1 ≈ ₸500 ≈ ₽80.
          </p>
          <P className="mb-5">
            On a Sunday afternoon, Nurbek Zeinullayev got a phone call from a company that does not exist.
          </P>
          <P className="mb-5">
            Zeinullayev is one of{" "}
            <Term tip="Kazakhstan's dominant super-app: payments, banking, e-commerce in one application; Nasdaq-listed, used by most of the country's adult population.">Kaspi</Term>
            &rsquo;s larger sellers: a man who lives inside Kazakh e-commerce rather than admiring it through the shop window. People like him don&rsquo;t get called by accident.
          </P>
          <P className="mb-5">
            The call was followed by a letter, polite and templated: &ldquo;My name is A., I represent the Freedom Market marketplace (formerly Teez).&rdquo; No website, no press release, no entry in the trademark registry. The company that doesn&rsquo;t exist already has a partner manager, a mailing template and a commission rate card.
          </P>
          <P className="mb-5">
            The word &ldquo;formerly&rdquo; sits in those brackets as calmly as it would in an obituary. As recently as February,{" "}
            <Term tip="Kazakh marketplace launched in 2024 on a central-warehouse, next-day-delivery model; ran into payment arrears in early 2026 and was absorbed into Freedom.">Teez</Term>{" "}
            was a marketplace that had been failing to pay its sellers for a second month: sellers wrote to newsrooms that the platform was &ldquo;driving people into debt pits&rdquo;
            <Fn n={1} tip="Exclusive.kz, 19.02.2026 — Teez to settle debts to sellers after the fintech deal: a seller's letter about arrears «for the second month running», weekly promises of a rescue payment." />
            {" "}while the company promised a rescue payment week after week. Then the promises stopped, the founders left, and the platform went silent. Turns out it hadn&rsquo;t died. It had changed clothes.
          </P>
          <P className="mb-5">
            Further down, the letter asked the question the whole exercise was apparently built around: &ldquo;What, in your view, is missing from the existing marketplaces?&rdquo;
          </P>
          <P>
            Of the full-fledged &ldquo;existing&rdquo; ones, frankly, Kazakhstan has one. And this entire text is an attempt to answer that question in earnest: what is missing, who has it - and why the message in Zeinullayev&rsquo;s phone is the opening move of the most interesting game ever played on the Kazakh market. A game that doesn&rsquo;t even have a press release yet.
          </P>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── A Death With Ambitions ─── */}
        <div className="mb-12">
          <H2>A Death With Ambitions</H2>
          <P className="mb-5">
            The name Teez carries two words inside it: the Kazakh &ldquo;tez&rdquo; - fast - and the English &ldquo;tease.&rdquo; It started with the first one: a September 2024 launch, the only central-warehouse model among local players based in{" "}
            <Term tip="An industrial city in central Kazakhstan; site of the Teez fulfillment warehouse.">Karaganda</Term>
            , free next-day delivery on any order, plans to reach &ldquo;50 countries in five years&rdquo;
            <Fn n={2} tip="Forbes Kazakhstan, June 2024 — Teez: the first Kazakh marketplace with free next-day delivery." />
            . By spring 2025 the platform was doing 11,000 orders a day, had signed up 28,000 sellers and operated in 32 cities; orders to the west of the country flew by plane
            <Fn n={3} tip="Zakon.kz, 18.04.2025 — Teez six months on: 11K orders/day, 28K sellers, 32 cities, air delivery westward; fintech listed as «the next stage»." />
            .
          </P>
          <P className="mb-5">
            By January 2026, only the second word was left. Teez had stopped being fast - and stopped paying, too. What remained was the tease.
          </P>
          <P className="mb-5">
            In its Telegram channel for sellers, the platform announced it was being acquired by &ldquo;a major Kazakh fintech player&rdquo; whose name was sealed by an{" "}
            <Term tip="Non-disclosure agreement.">NDA</Term>
            , and that &ldquo;the current payment delays are related to the transition period.&rdquo; The company gave itself &ldquo;a week and a half to two weeks&rdquo; to meet its obligations
            <Fn n={4} tip="Forbes Kazakhstan, 21.01.2026 — A Kazakh marketplace is being sold to a major fintech." />
            . &ldquo;The marketplace is not going bankrupt, not shutting down,&rdquo; Teez reassured everyone
            <Fn n={5} tip="Orda.kz, 20.01.2026 — «We are not going bankrupt»: Teez is being bought out by a major fintech company." />
            . Technically, it wasn&rsquo;t lying: bankruptcy is a courtroom procedure in which a debtor meets its creditors. Teez chose a lighter genre - a costume change.
          </P>
          <P className="mb-5">
            From there, the timeline reads like a repayment schedule that was never once met. February: a{" "}
            <Term tip="A preliminary agreement on the key terms of a deal - not yet the deal itself.">term sheet</Term>{" "}
            is signed,{" "}
            <Term tip="A comprehensive pre-acquisition review of a company: finances, debts, legal risks.">due diligence</Term>{" "}
            assigned to a{" "}
            <Term tip="The four largest global audit firms: Deloitte, PwC, EY, KPMG.">Big Four</Term>{" "}
            firm, transition period through April 1
            <Fn n={6} tip="Kapital.kz, 2026 — Teez undergoing pre-sale due diligence." />
            . The same week - a promise of a payment &ldquo;within two weeks&rdquo; that would &ldquo;fully settle debts to sellers&rdquo;
            <Fn n={1} tip="Exclusive.kz, 19.02.2026 — the two-week payment promise and the seller's letter about two months of arrears." />
            . Those same days, a seller writes to the newsroom of{" "}
            <Term tip="A Kazakh business-news outlet.">Exclusive.kz</Term>
            : no payouts &ldquo;for the second month running,&rdquo; management &ldquo;feeding us promises every week&rdquo;
            <Fn n={1} tip="Exclusive.kz, 19.02.2026 — the seller's letter to the newsroom." />
            .
          </P>
          <P className="mb-5">
            In March, venture investor Yerlan Issekeshev - elder brother of Astana&rsquo;s former mayor - quietly exits the ownership chain
            <Fn n={7} tip="Forbes Kazakhstan, 31.03.2026 — Teez ownership changes before the deal." />
            . In April, co-founders Linar Khusnullin and Nikita Yeremin leave operational management. On his way out, Khusnullin says he is handing the company &ldquo;into good hands&rdquo; - &ldquo;a very strong, major company building the largest ecosystem in the country&rdquo;
            <Fn n={8} tip="Forbes Kazakhstan, 24.04.2026 — Two Teez co-founders exit operational management." />
            .
          </P>
          <P className="mb-5">
            For Khusnullin, this is the third marketplace brought to a sale:{" "}
            <Term tip="Russian marketplace co-founded by Linar Khusnullin; sold to retailer Magnit in 2023.">KazanExpress</Term>{" "}
            went to Russia&rsquo;s{" "}
            <Term tip="One of Russia's largest food retailers.">Magnit</Term>{" "}
            in 2023, and he was a managing partner at Uzbekistan&rsquo;s{" "}
            <Term tip="Uzbekistan's e-commerce ecosystem (marketplace, bank, BNPL); the country's first unicorn.">Uzum</Term>
            <Fn n={8} tip="Forbes Kazakhstan, 24.04.2026 — Khusnullin's track record: KazanExpress, Uzum, Teez." />
            . A decade has polished the formula: build fast, sell on time. KazanExpress sellers, for what it&rsquo;s worth, also complained about payout delays on the eve of the Magnit deal
            <Fn n={9} tip="Seller channels via Oborot.ru, 2023 — KazanExpress sellers' complaints about payout delays before the Magnit deal." />
            . Coincidence or signature - a question I don&rsquo;t have the documents to answer. The sellers have the chat logs.
          </P>
          <P className="mb-5">
            The buyer&rsquo;s name was, all along, a secret the entire market knew and nobody would confirm. Back in February, Turlov told Bloomberg: &ldquo;We may soon announce the acquisition of a local marketplace&rdquo;
            <Fn n={10} tip="Turlov's Bloomberg interview via The-tech.kz, 03.02.2026 — plans to buy a bank and a marketplace in Kazakhstan." />
            . In April, asked point-blank about Teez, he said: &ldquo;I&rsquo;m not sure we&rsquo;re ready to name it&rdquo;
            <Fn n={11} tip="National Business, 17.04.2026 — Freedom Holding takes the Kazakh super-app model to Turkey." />
            . On June 1,{" "}
            <Term tip="Nasdaq-listed financial group founded by Timur Turlov: brokerage, banking, insurance, telecom, and now e-commerce, centered on Kazakhstan.">Freedom Holding</Term>{" "}
            announced the migration of its entire ecosystem to a single Freedom brand
            <Fn n={12} tip="LS (lsm.kz), 01.06.2026 — Freedom announces brand transformation." />
            . And in July, a partner manager was already mailing Kaspi sellers a rate card on behalf of &ldquo;Freedom Market (formerly Teez).&rdquo;
          </P>
          <P>
            There is still no press release closing the deal. But the deal already has a sales department.
          </P>

          <ChartSlot
            n={1}
            type="timeline, two tracks"
            brock="Timeline"
            title="The Teez timeline: promises vs. dates"
            caption={<>Source: Forbes Kazakhstan <Dot /> Exclusive.kz <Dot /> Orda.kz <Dot /> Kapital.kz <Dot /> <Term tip="WHOIS - the public registry of domain records (registration date, registrar, owner); KazNIC administers the national .kz zone.">KazNIC WHOIS</Term> <Dot /> <Term tip="Certificate Transparency - public logs of every SSL certificate ever issued; they show when a certificate was issued and which subdomains it covers.">Certificate Transparency</Term></>}
            note="June 2024 - July 2026. In green (Freedom's colour) - the events nobody announced: the May 9 registration of fmarket.kz and the May 13 SSL certificate. The domain's ownership by the holding has not been established (source 42)."
          >
            <Grafik1 />
          </ChartSlot>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── The Bank Theorem ─── */}
        <div className="mb-12">
          <H2>The Bank Theorem</H2>
          <P className="mb-5">
            Why Teez died is not a rhetorical question. It didn&rsquo;t die of bad service: the next-day delivery was real. It died of the thing everything in this business dies of - not having a bank.
          </P>
          <P className="mb-5">
            Look at the survivors. At Kaspi,{" "}
            <Term tip="Buy now, pay later: the purchase is split into equal payments, typically at 0% to the buyer; the financing cost is carried by the seller and the platform's bank.">installment purchases</Term>{" "}
            are its biggest lending product - 41% of everything the fintech platform originates - and fintech brings in ₸1.54 of the company&rsquo;s ₸4.05 trillion in revenue
            <Fn n={13} tip="Kaspi.kz IR, 4Q & FY 2025: BNPL - 41% of TFV (fintech platform origination volume, ₸11.7T in 2025); fintech revenue ₸1.54T of ₸4.05T; 77 monthly transactions per active consumer." />
            . At{" "}
            <Term tip="Latin America's largest marketplace; market capitalization above $100 billion.">MercadoLibre</Term>{" "}
            - a Latin American Kaspi the size of a continent - the{" "}
            <Term tip="MercadoLibre's fintech arm: payments and credit.">Mercado Pago</Term>{" "}
            fintech arm generates 41% of group revenue: $8.6 billion of $21 billion
            <Fn n={14} tip="GlobeNewswire, 20.02.2025 — MercadoLibre Q4 2024: $21B revenue, Mercado Pago $8.6B." />
            . Russia&rsquo;s{" "}
            <Term tip="Russia's second-largest marketplace; its fintech arm generates the bulk of group EBITDA.">Ozon</Term>{" "}
            only turned EBITDA-positive once its fintech began earning more than the storefront was losing: in 2024, the financial division delivered over 80% of group{" "}
            <Term tip="Earnings before interest, taxes, depreciation and amortization.">EBITDA</Term>
            <Fn n={15} tip="Ozon IR, 2024 results — the fintech division delivered over 80% of group EBITDA." />
            .{" "}
            <Term tip="The largest marketplace of Russia and the CIS; began as an online clothing store. WB.kz is its Kazakh storefront.">Wildberries</Term>{" "}
            started its own bank.{" "}
            <Term tip="US marketplace for handmade and vintage goods.">Etsy</Term>{" "}
            and{" "}
            <Term tip="Europe's largest online fashion retailer.">Zalando</Term>{" "}
            live without a banking license - but those are niche players in markets where every other external provider sells installment plans. In Kazakhstan, where the installment plan is a second currency, there is no independent provider of the <Term tip="Swedish buy-now-pay-later service that plugs into any store's checkout as an external installment provider.">Klarna</Term> kind: installments are issued by the banks themselves - and none of them will hand its installment product to a rival marketplace&rsquo;s checkout. Here, asking a marketplace &ldquo;where is your bank&rdquo; is like asking an organism &ldquo;where is your heart.&rdquo;
          </P>
          <P className="mb-5">
            Kaspi is the rarest of cases, where the theorem ran in reverse: the marketplace didn&rsquo;t grow itself a bank - a bank grew itself a marketplace all the way to market leadership. And it holds that marketplace not with assortment but with frequency: 77 transactions per active user per month
            <Fn n={13} tip="Kaspi.kz IR, 4Q & FY 2025 — 77 average monthly transactions per active consumer." />
            {" "}- utility bills, transfers,{" "}
            <Term tip="Paying by scanning a QR code with a phone; in Kazakhstan, Kaspi's signature move.">QR payments</Term>{" "}
            at the shawarma stand.
          </P>
          <P>
            Teez built everything except that. The warehouse, the planes, pickup points with fitting rooms - and not one{" "}
            <Term tip="Kazakhstan's national currency (₸).">tenge</Term>{" "}
            of installment lending: fintech sat in the plans as &ldquo;the next stage&rdquo;
            <Fn n={3} tip="Zakon.kz, 18.04.2025 — fintech sat in Teez's plans as «the next stage»." />
            . The next stage never came. Speed without installments is cost without leverage: you&rsquo;re delivering goods, free of charge, to people who can&rsquo;t afford to buy them.
          </P>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── The Doppelgänger ─── */}
        <div className="mb-12">
          <H2>The Doppelgänger</H2>
          <P className="mb-5">
            The most painful part of the Teez story is that its{" "}
            <Term tip="In German Romanticism, a person's ghostly double living a life of its own.">doppelgänger</Term>{" "}
            lived next door - the double from German Romantic novellas, the shadow that walks with your gait but has better luck. The double did everything the same - just in the right order.
          </P>
          <P className="mb-5">
            Uzum in Uzbekistan was launched by essentially the same team: Khusnullin was a managing partner
            <Fn n={8} tip="Forbes Kazakhstan, 24.04.2026 — Khusnullin was a managing partner at Uzum." />
            . The same bet on next-day delivery, the same central warehouse. One difference: Uzum switched on{" "}
            <Term tip="Uzum's buy-now-pay-later service.">Nasiya</Term>{" "}
            - its own buy-now-pay-later service - from day one. The result: half of the marketplace&rsquo;s turnover now flows through its own fintech,{" "}
            <Term tip="Gross merchandise value: the total value of goods sold through a platform; the standard measure of marketplace size.">GMV</Term>{" "}
            grew 2.4x in 2024 to $345 million, and installment and microloan volume grew 2.7x
            <Fn n={16} tip="Uzum press release, 24.02.2025 — 2024 results: GMV $345M (×2.4), installments and microloans ×2.7, ~50% of turnover through its own fintech." />
            . In August 2025, Uzum raised a round from{" "}
            <Term tip="Chinese technology giant and one of the world's largest investors.">Tencent</Term>{" "}
            at a $1.5 billion valuation and became Uzbekistan&rsquo;s first{" "}
            <Term tip="A private company valued at $1 billion or more.">unicorn</Term>
            <Fn n={17} tip="TechCrunch, 05.08.2025 — Uzum raises a Tencent round at a $1.5B valuation; Uzbekistan's first unicorn." />
            .
          </P>
          <P>
            One playbook, two outcomes. Uzum is a unicorn. Teez is a distressed asset with debts. The entire difference is one product, switched on a year earlier.
          </P>

          <ChartSlot
            n={2}
            type="comparison table"
            brock="Table"
            title="Uzum and Teez: one model, two outcomes"
            caption={<>Source: Uzum press release <Dot /> <Src href="https://techcrunch.com/2025/08/05/uzbekistans-first-unicorn-uzum-leaps-to-a-1-5b-valuation/">TechCrunch</Src> <Dot /> Forbes Kazakhstan</>}
            note="A mirror structure: the same team, the same warehouse-and-delivery model - and one difference, switched on from day one."
          >
            <Grafik2 />
          </ChartSlot>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── A Graveyard of Brands ─── */}
        <div className="mb-12">
          <H2>A Graveyard of Brands</H2>
          <P className="mb-5">
            Now, about what happens to the Teez name. Spoiler: what happens to all of them.
          </P>
          <P className="mb-5">
            The history of marketplace acquisitions is a graveyard of storefront signs. Walmart bought{" "}
            <Term tip="US marketplace acquired by Walmart in 2016; the brand was retired in 2020.">Jet.com</Term>{" "}
            for $3.3 billion and shut it down four years later
            <Fn n={18} tip="Axios, 20.05.2020 — Walmart grounds Jet.com four years after the $3.3B acquisition." />
            . Amazon bought the Middle East&rsquo;s{" "}
            <Term tip="Middle Eastern marketplace acquired by Amazon in 2017; rebranded to Amazon.ae.">Souq</Term>{" "}
            for $580 million and renamed it within two
            <Fn n={19} tip="Retail Dive, May 2019 — Amazon rebrands Souq into Amazon.ae." />
            . KazanExpress survived under its own name for about five months after the Magnit deal
            <Fn n={20} tip="Logirus, April 2024 — KazanExpress to be fully «reborn» as Magnit Market by the end of 2024." />
            . A strategic buyer doesn&rsquo;t buy the sign - it buys the warehouses, the software and the people. The sign it brings along.
          </P>
          <P>
            Freedom didn&rsquo;t even leave room for intrigue: on June 1 the holding announced its single-brand migration
            <Fn n={12} tip="LS (lsm.kz), 01.06.2026 — the Freedom brand transformation." />
            , and the letter to Zeinullayev is the first field evidence that the rebranding has reached Karaganda. &ldquo;Freedom Market (formerly Teez)&rdquo; isn&rsquo;t a name. It&rsquo;s an epitaph.
          </P>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── A Cautionary Tale ─── */}
        <div className="mb-12">
          <H2>A Cautionary Tale</H2>
          <P className="mb-5">
            This is where one is supposed to write that now, with Turlov&rsquo;s bank behind it, the marketplace is bound to succeed. One is not. A bank standing behind a marketplace is necessary but not sufficient - and that has been proven experimentally, with very large sums.
          </P>
          <P className="mb-5">
            The experiment was called{" "}
            <Term tip="Russia's largest bank (Sber) and its now-collapsed marketplace venture.">SberMegaMarket</Term>
            . Sber had everything Teez lacked: a bottomless balance sheet, half of Russia on its payroll cards, its own delivery network. It lacked one thing - a reason for people to open the marketplace app every day: the bank and the storefront lived in different apps, linked by SberSpasibo bonus points, a shared Sber ID and a SberPay button - but the purchase and the money never met on one screen. Sber bought growth with cashback, multiplying sales fivefold over 2023 - and then got tired of paying, cutting first the subsidies, then its own logistics. The result in 2025: minus 93%, from ₽342.6 billion to ₽24.5 billion, a slide from 4th to 38th place among Russian online retailers
            <Fn n={21} tip="Data Insight: MegaMarket's 2023 turnover grew 5x to ₽312B (RBC, 29.01.2024); Data Insight (via Investing.com, RB.ru) — MegaMarket's 2025 sales: −93%, from ₽342.6B to ₽24.5B; from 4th to 38th place." />
            . Sber&rsquo;s loss from non-core activities in 2024 - the last year MegaMarket ran at full steam - was ₽284 billion; how much of that fell on the marketplace, the bank never disclosed
            <Fn n={22} tip="Interfax — Sber posts a ₽284B loss from non-core activities in 2024 (all non-core businesses combined, no per-asset breakdown)." />
            .
          </P>
          <P className="mb-5">
            <Term tip="Kazakhstan's largest bank by assets.">Halyk</Term>{" "}
            - Kazakhstan&rsquo;s largest bank - runs Halyk Market, with &ldquo;0-0-24&rdquo; installment plans and a claimed 11 million users. It ranks among the country&rsquo;s top-5 marketplaces
            <Fn n={23} tip="Nur.kz — Halyk Market enters Kazakhstan's top-5 marketplaces (Ranking.kz)." />
            , and that is the extent of what can be said about it: the platform doesn&rsquo;t disclose GMV, sellers don&rsquo;t mention it in conversation, and it has never made a move on the leader.
          </P>
          <P>
            The difference between Kaspi and these two isn&rsquo;t money or data: Sber knows more about Russians than anyone alive. The difference is the loop. At Kaspi, the bank and the storefront are one organism - the installment decision happens in the same click as the purchase, and 77 monthly transactions keep the user in the app daily. At Sber, the bank and the marketplace were neighboring buildings with separate entrances. A marketplace can be bought with money. Frequency can&rsquo;t.
          </P>

          <ChartSlot
            n={3}
            type="two mini panels"
            title="A bank inside the storefront vs. a bank next door"
            caption={<>Source: <Term tip="IR - investor relations: a company's official reporting for investors.">Ozon IR</Term> <Dot /> <Term tip="Data Insight - a Russian e-commerce research agency.">Data Insight</Term></>}
            note="Ozon's fintech rises, MegaMarket falls. Panels on their own scales: fintech revenue on the left, storefront sales on the right."
          >
            <Grafik3 />
          </ChartSlot>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── The Price List of a Company That Doesn't Exist ─── */}
        <div className="mb-12">
          <H2>The Price List of a Company That Doesn&rsquo;t Exist</H2>
          <P className="mb-5">
            Back to the letter. It contains a table no media outlet has - Freedom Market&rsquo;s{" "}
            <Term tip="The platform's percentage cut of each sale, paid by the seller.">commissions</Term>{" "}
            for its first partners.
          </P>
          <P className="mb-5">
            A commission is the platform&rsquo;s cut of every sale, and it depends on how the buyer paid. If the customer pays by card or takes a bank loan, the store gives Freedom Market 5% of the receipt. If they take an interest-free installment plan, the commission climbs with its length: 6% for three months, 8% for six, 11% for nine, 13% for twelve, 14% for twenty-four.
          </P>

          <ChartSlot
            n={4}
            type="vertical bars"
            title="Freedom Market's commission ladder: from 5% for card payment to 14% for a two-year installment plan"
            caption={<>Source: Freedom Market terms for first partners, July 2026; correspondence on file with the author</>}
            note="Exclusive data. A commission is the platform's cut of each sale, paid by the seller; it depends on how the buyer paid."
          >
            <Grafik4 />
          </ChartSlot>

          <P className="mb-5">
            The ladder is more interesting than it looks. A loan costs the seller the same as a card payment, because the interest there is paid by the buyer. Installments get pricier with length because someone has to finance the buyer&rsquo;s &ldquo;zero percent&rdquo; - and that someone is the seller, through the elevated commission. Now the arithmetic. The seller&rsquo;s surcharge for a 24-month plan over a card payment is 9 percentage points of commission - that is, 9% of the receipt, paid once. But the bank has to source that money for two years: even{" "}
            <Term tip="Funding: the price a bank pays to raise the money it lends out.">funded</Term>{" "}
            at retail deposit rates, financing a two-year installment plan costs 1.7-2 times those 9 points
            <Fn n={24} tip="Author's estimate: on a 24-month annuity schedule the average outstanding balance is ≈52% of the receipt; funded at retail tenge deposit rates (KDIF, 2026: term deposits ≈15-18% p.a.), two years cost ≈16-19% of the receipt - against the seller's 9 p.p. surcharge. The estimate is nominal and uses marginal (not blended) funding; discounted to present value the multiple is ~1.5-1.8 and the conclusion holds. Early repayments, adjacent income and the upfront commission cheapen it; credit-risk cost makes it dearer." />
            . Either Freedom is deliberately subsidizing long installments to poach sellers, or it is counting on money cheaper than the market&rsquo;s. Below, I&rsquo;ll explain why I believe the second.
          </P>
          <P className="mb-5">
            Beyond the numbers, the letter makes promises - and every one lands on a specific pain of the Kaspi seller. &ldquo;Not a tender platform: every store gets its own storefront, like on Wildberries and Ozon&rdquo; - against the single-listing model, where up to five dozen sellers sit on one iPhone listing and cut into each other&rsquo;s margins
            <Fn n={25} tip="Redstat data, April 2026: 59 sellers on the Apple iPhone 17 Pro 256Gb listing; 35–59 sellers on each of the eight top-selling iPhone listings, with month-on-month revenue declines of 13–63% on seven of the eight." />
            . Promo codes and &ldquo;measurable ad spend&rdquo; - against advertising blind. Open categories - against category turnstiles. Freedom isn&rsquo;t selling sellers a commission rate. It&rsquo;s selling them everything Kaspi wouldn&rsquo;t allow.
          </P>
          <P className="mb-5">
            And one detail the letter omits - payout terms. For a platform whose previous incarnation spent two months not paying people, a strange thing to forget. Zeinullayev asked himself. The answer: at launch, money arrives the day after the item is handed to the customer
            <Fn n={26} tip="From Nurbek Zeinullayev's correspondence and calls with the Freedom Market team, July 2026. Records and screenshots on file with the author; published with Zeinullayev's consent." />
            . At Kaspi - same day. One day&rsquo;s difference is a small price; the only question is whether the market remembers what the word &ldquo;tomorrow&rdquo; once looked like at this particular warehouse.
          </P>
          <P>
            The calls with first partners surface things the letter doesn&rsquo;t mention. Both operating modes will be available: selling from your own warehouse (
            <Term tip="Fulfillment by seller: goods stay at the seller's warehouse; after a sale, the seller hands the parcel to the platform's delivery.">FBS</Term>
            ) and from the Karaganda{" "}
            <Term tip="Order processing by the platform: storage, picking, packing, delivery from the platform's own warehouse.">fulfillment</Term>{" "}
            center - which industry convention will presumably force us to call{" "}
            <Term tip="Goods are stored at the platform's warehouse in advance, and the platform picks, packs and delivers. At Wildberries this is FBW (Fulfillment by Wildberries); for Freedom Market - FBF, Fulfillment by Freedom.">FBF</Term>
            , Fulfillment by Freedom
            <Fn n={26} tip="From Zeinullayev's calls with the Freedom Market team: FBS + FBF, commissions identical for everyone, including the holding's own services." />
            . Kaspi has no fulfillment of its own for third-party sellers as of publication - and for sellers from Russia, Uzbekistan and China this is an open door: load your goods into the warehouse and sell, without an office or a courier in the country. Commissions, according to the platform, will be identical for everyone - including the holding&rsquo;s own services such as{" "}
            <Term tip="Kazakh online grocery service with perishables logistics; part of the Freedom ecosystem.">Arbuz</Term>
            <Fn n={26} tip="From Zeinullayev's calls with the Freedom Market team, July 2026." />
            : a level-playing-field pledge that is easy to make before launch and hard to keep after.
          </P>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── The Arsenal ─── */}
        <div className="mb-12">
          <H2>The Arsenal</H2>
          <P className="mb-5">
            What actually stands behind the letter. Freedom Holding closed its fiscal year with record revenue of $2.19 billion and net income doubled to $153 million - doubled, in fairness, off a dismal prior year: two years ago the holding earned $379 million. Assets grew by a third to $13.2 billion. Monthly{" "}
            <Term tip="One application bundling many services: payments, shopping, tickets, government services.">super-app</Term>{" "}
            audience grew two-and-a-half-fold over the year to almost 2.6 million; bank customers reached 5 million, brokerage accounts 858 thousand
            <Fn n={27} tip="FRHC FY2026 (year to 31.03.2026), press release 02.06.2026 and 10-K: revenue $2.19B; net income $153.3M vs $76.2M in FY2025 (+101%) and $378.5M in FY2024; assets $13.2B against $9.9B a year earlier; super-app MAU 2.59M vs 1.02M a year earlier; 5.03M banking clients; 858K brokerage accounts." />
            . The &ldquo;five million already use Freedom&rdquo; line from the partner manager&rsquo;s script is not a marketing rounding. It&rsquo;s a number from the filings - with one clarification: the five million are bank clients; 2.6 million are active in the super-app.
          </P>
          <P className="mb-5">
            Plus the Teez inheritance: the only central-warehouse logistics model among local players, capable of next-day delivery - the very line item Sber, tired of paying, cut at MegaMarket.
          </P>
          <P className="mb-5">
            Plus something Teez never had for a single day - an instrument for bringing people back. Sellers will come to a new storefront on their own: for a merchant, a second platform is a line in a spreadsheet, not a relocation, and Russian research shows sellers on two platforms earn multiples of what they earn on one
            <Fn n={28} tip="T-Bank eCommerce research, October 2024: average seller income on one platform - ₽53K/month; on two - ₽137K/month." />
            . The scarce resource in this game is the buyer. Teez bought buyers with cashback, ads and influencers exactly as long as the money lasted: the campaigns were the first thing to stop, and their &ldquo;resumption&rdquo; featured as a separate line item in the new owners&rsquo; February promises
            <Fn n={1} tip="Exclusive.kz, 19.02.2026 — «resumption of ad campaigns» as a separate line item in the February promises." />
            . Between orders, a person had no reason to open the Teez app at all. Freedom has that reason ready-made: the super-app&rsquo;s cashback, already used by millions - on utilities, flights, purchases across the holding&rsquo;s services. And it accrues not in money or points but in an exchange-traded note tied to the holding&rsquo;s own stock, straight into the client&rsquo;s brokerage account. Wire it up so that this cashback is spent and earned through the marketplace, and the storefront acquires what took Kaspi a decade to build: reasons to open the app with no intention of buying anything.
          </P>
          <P className="mb-5">
            Plus the bank - and here it&rsquo;s worth examining the credit conveyor, because in Kazakhstan the conveyor, not the storefront, decides the outcome. Plenty of players &ldquo;have&rdquo; installment plans. They approve them very differently, and nobody publishes the numbers:{" "}
            <Term tip="The share of installment/loan applications approved at the moment of purchase; not publicly disclosed by any Kazakh bank.">checkout approval rates</Term>{" "}
            by bank are an officially blind spot - publicly, neither the regulator nor the credit bureaus track them
            <Fn n={29} tip="Survey of public lending data: ARDFM, NBK Bank Lending Survey, First Credit Bureau DataHub — bank-level approval rates are not published." />
            . Only the market-wide background is known, and it is harsh: on average, 26–31% of loan applications get approved
            <Fn n={30} tip="AFK: market-average application approval 26.2-29.2% (2024); unsecured consumer loans 27.5-31.5% (9M2025). Finprom/NBK, Q4 2024: unsecured approval 29.5%." />
            . Up to three out of four applications are turned down - in a country where 8.1 million people carry active unsecured consumer loans
            <Fn n={31} tip="DataHub / First Credit Bureau — Kazakhstan's credit market, H1 2025: 8.1M people with active unsecured loans; issuance falling in real terms." />
            . Kazakhstan is a country that lives on credit and gets turned down for it. Kaspi&rsquo;s own filings name instant automated credit decisioning as the core of the model
            <Fn n={32} tip="Kaspi.kz Form 20-F — automated, centralized, big-data-driven proprietary loan approval process." />
            {" "}- and it pays for its risk appetite in delinquency: Kaspi Bank&rsquo;s{" "}
            <Term tip="Non-performing loans: loans 90+ days overdue; the key credit-quality indicator.">non-performing loan</Term>{" "}
            ratio is 5.2% against the sector-wide average of 3.4%, a mix that includes mortgages and corporate loans
            <Fn n={33} tip="Halyk Finance - Kazakhstan's banking sector, June 2025: Kaspi Bank NPL90+ at 5.2% vs 3.4% sector-wide (a mix including lower-delinquency mortgages and corporate loans)." />
            . Approval is not the{" "}
            <Term tip="Automated borrower assessment: an algorithm approves or declines a loan in seconds.">scoring</Term>{" "}
            engine&rsquo;s mercy; it is a business decision with a price tag, and Kaspi pays it deliberately. Tellingly,{" "}
            <Term tip="A top-tier Kazakh commercial bank.">ForteBank</Term>{" "}
            - whose installment approvals the sellers we spoke to privately call hard to pass - simply bought{" "}
            <Term tip="Consumer-lending specialist focused on point-of-sale loans; Kazakh unit acquired by ForteBank in 2025.">Home Credit Bank</Term>{" "}
            in 2025, a specialist in{" "}
            <Term tip="Credit issued right at the moment of purchase.">point-of-sale lending</Term>
            <Fn n={34} tip="The Tenge, 2025 — ForteBank absorbs Home Credit Bank." />
            . Banks don&rsquo;t buy someone else&rsquo;s scoring when their own works.
          </P>
          <P className="mb-5">
            For Freedom, this is the real exam: whether the banking data of five million clients - without Kaspi&rsquo;s daily payment frequency - is enough for a comparable share of &ldquo;yes&rdquo; at the moment of purchase. The storefront and the warehouse have been bought. The conveyor will have to be built.
          </P>
          <P className="mb-5">
            Plus the seller side, where Freedom has a move nobody in Kazakhstan has made. In Russia, banks spent 2026 openly buying up &ldquo;eyes&rdquo;:{" "}
            <Term tip="A Russian bank built for entrepreneurs and small business.">Tochka</Term>
            , a bank for entrepreneurs, acquired the analytics service{" "}
            <Term tip="Russian marketplace-analytics service for sellers; acquired by Tochka in 2026.">MPSTATS</Term>{" "}
            for roughly ₽2 billion; Alfa-Bank answered with{" "}
            <Term tip="Russian marketplace-analytics service; acquired by Alfa-Bank.">MarketGuru</Term>
            <Fn n={35} tip="BG.ru, February 2026 — Tochka bank acquires 100% of MPSTATS (~₽2B); Alfa-Bank buys MarketGuru." />
            . Tochka&rsquo;s CEO articulated the logic: data, money and management decisions should live together. A bank that sees a seller&rsquo;s sales can lend to them cheaper than anyone and keep their account longer than anyone. Freedom can assemble that loop from scratch and in full: a merchant account, credit against turnover - and a three-layer data infrastructure. Internal cabinet analytics, so a seller sees their unit economics down to the tenge: margin per item, cost of advertising, cost of a return. External market analytics - which niches are growing, where it&rsquo;s uncrowded, where to enter. And an open{" "}
            <Term tip="A programming interface: how third-party services connect to the platform's data.">API</Term>
            , so that an ecosystem of third-party services grows around the platform the way it did around Wildberries - analytics, advertising,{" "}
            <Term tip="Search engine optimization: tuning listings and pages for search visibility.">SEO</Term>{" "}
            tools: every such service markets the marketplace to its own users, free of charge. A platform whose previous name became a synonym for delays can make transparency and the speed of money its banner. Same mechanics, opposite sign.
          </P>
          <P>
            And the third weapon on this flank is the cheapest one: talking. The Kaspi seller&rsquo;s pain isn&rsquo;t only commissions. A seller cabinet can hold tens of millions of tenge in turnover, and a block can arrive over a single customer review - the seller community passes these stories around like campfire horror tales, and the appeal procedures in them look like a formality. Freedom opened with the opposite gesture: the manager isn&rsquo;t selling - she is collecting feedback, and after the letter an entire department got on calls with Zeinullayev, asking about strategy, pains and missing tools
            <Fn n={26} tip="From Zeinullayev's correspondence and calls with the Freedom Market team, July 2026." />
            . A platform that asks &ldquo;what&rsquo;s missing&rdquo; before launch already differs from Kaspi, which in a decade of dominance never - sellers say - built them even basic internal analytics. &ldquo;Many sellers can&rsquo;t properly compute their own unit economics - the infrastructure just isn&rsquo;t there, though it would be simple to build. Apparently someone benefits from people not knowing how to count their money,&rdquo; is how Zeinullayev puts it.
          </P>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Dresses First ─── */}
        <div className="mb-12">
          <H2>Dresses First</H2>
          <P className="mb-5">
            If someone asked me which square to open this game on, I would answer: not electronics, where Kaspi&rsquo;s heavy pieces stand - the wardrobe.
          </P>
          <P className="mb-5">
            Clothing and footwear make up about 7% of Kaspi&rsquo;s category turnover - against a quarter of the market on Wildberries
            <Fn n={36} tip="Author's calculations. Kaspi — Redstat, April 2026 (clothing & footwear ₸11.6B of ₸168.8B, 6.8%; electronics 27.4%). WB — MPSTATS, Jul 2025 - Jun 2026 (clothing & footwear ₽5.7T of ₽23.2T in orders, 24.7%; shares computed on unrounded data). «Revenue» in MPSTATS data means orders, not completed purchases." />
            . The category where the Kazakh shopper already votes with their wallet (WB.kz in Kazakhstan grows first and foremost on fashion) is nearly absent from the country&rsquo;s main marketplace. The money in Kazakhstan&rsquo;s wardrobe is currently leaving for a Russian platform - not because it is better, but because a local alternative with a warehouse and fitting rooms simply does not exist. Kaspi is an electronics store the size of a country: electronics take 27% of its turnover, clothing sits in the tail of the table.
          </P>

          <ChartSlot
            n={5}
            type="stacked bars"
            title="Two structures: fashion's share of turnover - Wildberries vs. Kaspi"
            caption={<>Source: MPSTATS <Dot /> Redstat <Dot /> author&rsquo;s calculations</>}
            note="Alt: fashion's share of turnover - 24.7% on Wildberries vs. 6.8% on Kaspi, a 3.6x gap."
          >
            <Grafik5 />
          </ChartSlot>

          <P className="mb-5">
            And this is not a category-management oversight. It&rsquo;s architecture. A year of Wildberries data shows: fashion is the only major category that physically cannot exist without the platform&rsquo;s warehouse. 85% of its turnover runs through fulfillment, and the share of dresses sold from WB warehouses never dropped below 92% in any month of the year
            <Fn n={36} tip="MPSTATS, twelve monthly windows (Jul 2025 - Jun 2026): clothing's fulfillment share - 85.2%; the «Dresses» niche's minimum monthly fulfillment share - 92%." />
            . You cannot sell a dress without a warehouse, a fitting room and an easy return. Kaspi has none of the three - and this gap doesn&rsquo;t close by hiring a category team. It closes with a warehouse. Which Freedom already owns - along with the fitting rooms in the pickup points inherited from Teez.
          </P>

          <ChartSlot
            n={6}
            type="line, 12 months"
            title="The seasonal fulfillment wave on WB: 24% in summer, 50% in December"
            caption={<>Source: MPSTATS, twelve monthly windows <Dot /> author&rsquo;s calculations</>}
            note="In % of WB turnover, monthly. Peak season cannot be survived without a warehouse: the market-wide fulfillment share doubles into December."
          >
            <Grafik6 />
          </ChartSlot>

          <P className="mb-5">
            Now reread the partner manager&rsquo;s letter with this lens. &ldquo;Every seller gets their own store&rdquo; is a fashion format: a dress, unlike an iPhone, is sold by a store&rsquo;s face and content, not by the lowest price in a shared listing.{" "}
            <Term tip="User-generated content: customer reviews, photos and videos.">UGC</Term>{" "}
            and promo codes are fashion instruments. Fitting rooms are fashion infrastructure. Freedom Market - perhaps without having articulated it - has assembled a toolkit for exactly one category: the only one where Kaspi cannot answer without rebuilding its entire model. In electronics, Kaspi parries within a week by adjusting an installment rate: that is its fortress. In clothing, it would have to build warehouses and reinvent its own product listing. Military theory has called this a flank attack since{" "}
            <Term tip="216 BC: Hannibal deliberately yielded in the center and enveloped the Roman flanks; the classic of flank strategy.">Cannae</Term>
            , where Hannibal yielded in the center and closed his wings: a blow the opponent cannot reinforce against without restructuring the whole army. Wildberries, for the record, started as a clothing store - and took everything else from that beachhead.
          </P>
          <P className="mb-5">
            The beachhead itself is not a hypothesis but a model proven next door: Wildberries began precisely with clothing, built the CIS&rsquo;s largest marketplace on it, and still holds a quarter of its turnover in the category - every number in this chapter is computed from its data. How to accelerate the category, though, is a lesson from{" "}
            <Term tip="Chinese fast-fashion giant: micro-batches, instant demand response, customer content as marketing.">Shein</Term>
            : the Chinese fast-fashion giant took off without a single physical store - on micro-batches, instant demand response, and customer-generated content instead of advertising. For Freedom these are not two examples but a division of labor: Wildberries supplies the proof that fashion builds marketplaces; Shein supplies the acceleration playbook - and both halves assemble from parts Freedom already owns: a warehouse with fitting rooms, the UGC tools from the letter, the open FBF door for sellers from China - the very ones who carry fast fashion.
          </P>
          <P className="mb-5">
            The dress here is an image, not the whole plan. This is about fashion as a category: clothing, footwear, lingerie, accessories - a quarter of the neighboring market, surrendered in Kazakhstan without a fight. The second target of the first wave is visible in the same table: long-shelf-life groceries. Back in November 2024, the &ldquo;Food&rdquo; category on Kaspi did about ₸0.3 billion a month; now it does ₸6.6–7.8 billion - growth of twentyfold and change
            <Fn n={36} tip="Redstat: monthly revenue of Kaspi's Food category - ₸0.31B in November 2024 versus ₸6.6-7.8B across January-April 2026; April snapshot - ₸6.6B with 234 sellers." />
            . Yet entry to the category is open to barely more than two hundred sellers nationwide, and in April exactly three companies were selling vegetables - with revenue averaging just under a quarter of a billion tenge per company
            <Fn n={36} tip="Redstat, April 2026 — 234 sellers in «Food»; 3 sellers in «Vegetables» with ~₸721M in category revenue." />
            . Translation: demand has been proven with Kaspi&rsquo;s own money, while supply is held back by a turnstile - a rare case where you can judge the length of the queue by how narrowly the door is cracked open. Freedom, meanwhile, already owns Arbuz with its perishables logistics - and the promise of &ldquo;open categories&rdquo; in that very letter.
          </P>
          <P>
            One honest caveat: dresses don&rsquo;t monetize through installment plans - the receipt is too small for the credit conveyor. Fashion doesn&rsquo;t buy margin. It buys frequency and habit. The margin arrives later - together with the television.
          </P>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── The Move That Isn't in the Letter ─── */}
        <div className="mb-12">
          <H2>The Move That Isn&rsquo;t in the Letter</H2>
          <P className="mb-5">
            Now the main thing - a move that isn&rsquo;t in the letter. It may well have been mapped out on the holding&rsquo;s internal slides long ago; what&rsquo;s visible from the outside is something else - that nobody on the market has made it. Freedom owns one asset that neither Kaspi, nor Halyk, nor anyone else on this market has. A broker.
          </P>
          <P className="mb-5">
            Look at the world map. Yield on sellers&rsquo; balances is already paid by Western platforms - Shopify has a dedicated product for it,{" "}
            <Term tip="Shopify's merchant account paying yield on sellers' balances.">Shopify Balance</Term>
            . There is also a principled counterexample - Amazon: its merchant wallet,{" "}
            <Term tip="Amazon's merchant wallet; pays no yield on balances.">Amazon Seller Wallet</Term>
            , pays nothing on balances, zero percent - the world&rsquo;s largest marketplace consciously declines to share the yield on its sellers&rsquo; own money. Cashback in real stock through one&rsquo;s own broker is already paid by{" "}
            <Term tip="Israeli retail-investing platform; pays debit-card cashback in real stock.">eToro</Term>{" "}
            - 4% on its debit card since June 2025
            <Fn n={37} tip="eToro press release, 24.06.2025 — debit card in Europe with 4% back in stock." />
            . Wallet balances are auto-invested by MercadoLibre: its{" "}
            <Term tip="MercadoLibre's service that auto-invests wallet balances into a money-market fund.">Mercado Fondo</Term>{" "}
            fund has grown to $18.8 billion under management
            <Fn n={38} tip="MELI Letters to Shareholders — Mercado Fondo AUM dynamics; $18.8B as of Q4 2025." />
            , and its Chinese progenitor{" "}
            <Term tip="The money-market fund inside Alipay; at its peak, the world's largest.">Yu&rsquo;e Bao</Term>{" "}
            held $267 billion at its peak - until the regulator cut the limits. Kaspi has assembled the marketplace and merchant deposits - the storefront and the money, but not the loop. Deposits Kaspi does have - retail ones and a Business Deposit for merchants; what it lacks is yield by default on every working tenge, and the floor above the deposit: securities. But the triple link - a marketplace, yield on sellers&rsquo; money, and rewards in securities through one&rsquo;s own broker - has, as far as public disclosures allow one to judge, never been assembled by anyone in the world
            <Fn n={39} tip="Author's prior-art survey of public disclosures and product announcements (Shopify, Amazon, MercadoLibre, eToro, Robinhood, Trade Republic, Grab, Kaspi, et al.), June–July 2026." />
            . It requires a triple stack: a working marketplace plus a banking license and a{" "}
            <Term tip="A licensed securities intermediary.">broker-dealer</Term>{" "}
            license at once. Freedom - if the Teez deal has closed - holds all three in one vault - and it is the only player whose brokerage is the core of the business, not an appendage to a bank.
          </P>
          <P className="mb-5">
            What it means in practice. A seller&rsquo;s revenue lands, by default, on an account that accrues interest daily. This is not a brokerage account with stocks: a seller needs safety and instant access, so the mechanics differ - the rate on the balance is tied to short, safe{" "}
            <Term tip="Short-term, low-risk placements (overnight deposits, government paper) with daily accrual and near-instant access.">money-market instruments</Term>
            , and the yield drips in daily, visible in the app. That is exactly how Yu&rsquo;e Bao works inside{" "}
            <Term tip="China's largest payment platform, part of the Alibaba ecosystem.">Alipay</Term>{" "}
            and Mercado Fondo inside MercadoLibre; at Kazakh interest rates, that &ldquo;+X tenge today&rdquo; line becomes visible to the naked eye. Money can be withdrawn instantly and free - but every day it sits, it earns. &ldquo;Unprofitable to withdraw&rdquo; means precisely this: nobody forbids the seller anything; the account is simply built so that keeping money inside is the rational choice, not a constraint. There is a fork here, and it is worth naming honestly: money that actually leaves for a fund is money the bank cannot lend - that is how Mercado Fondo works; in the installment model the bank pays the daily interest itself, slightly below market, and the balances remain its funding - the cheapness is the spread between the seller&rsquo;s rate and the market price of money. Those voluntarily left balances are what funds the next buyer&rsquo;s installment plan. Which is, incidentally, where the economics of that suspiciously generous commission ladder may come from. Securities enter the construction on the other side of the counter - with the buyer: their cashback doesn&rsquo;t expire as points but settles into a portfolio as fractional shares via the holding&rsquo;s broker. Behavioral studies have shown that recipients of a brand&rsquo;s stock increased their spending by double-digit percentages
            <Fn n={40} tip="Medina, Mittal — NBER Working Paper No. 28479 (2021): brand stock ownership and consumer spending." />
            . And the buyer of a kettle quietly becomes a brokerage client at zero acquisition cost - for a holding whose highest-margin business is precisely{" "}
            <Term tip="The brokerage business: commissions on clients' securities trades.">brokerage</Term>
            : per the segment reporting, the brokerage segment&rsquo;s pre-tax margin is about 55%, the banking segment&rsquo;s about 15%
            <Fn n={27} tip="FRHC 10-K FY2026 (SEC), segment reporting: brokerage - revenue $831.5M, pre-tax income $456.2M (≈55% margin); banking - $689.2M and $102.0M (≈15%)." />
            .
          </P>
          <P className="mb-5">
            Kaspi&rsquo;s imperial metric is frequency: 77 touches a month. The only metric that can answer it is the lifespan of a tenge inside the system. Kaspi owns its users&rsquo; time. Freedom could own their capital.
          </P>

          <TengeJourney locale="en" />

          <P>
            In fairness: the first products built on this mechanic are dead.{" "}
            <Term tip="US startup that paid cashback in brand stock; wound down in 2023.">Bumped</Term>{" "}
            burned through $32 million of investment and was sold for $631 thousand - the startup had to build both the broker and the audience from scratch
            <Fn n={41} tip="Bakkt 10-Q/10-K (SEC): on 08.02.2023 Bakkt acquired 100% of Bumped Financial for $631K in cash; the startup had raised ~$32M." />
            .{" "}
            <Term tip="Singapore's super-app: rides, delivery, payments.">Grab</Term>{" "}
            shut down its auto-invest in overbanked Singapore, where a 1.8% yield warmed nobody. Both products died of lacking what Freedom already has: a broker at the core of the business, and double-digit rates at which yield on a balance is visible to the naked eye. A rare case where an idea that buried startups can only be lifted by an{" "}
            <Term tip="The sitting, dominant market player.">incumbent</Term>{" "}
            - a sitting heavyweight who needs to build neither the license nor the audience.
          </P>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Three Unanswered Questions ─── */}
        <div className="mb-12">
          <H2>Three Unanswered Questions</H2>
          <P className="mb-5">
            First - the debts. There is still no official confirmation that Teez&rsquo;s obligations have been settled; the total size of the debt was never disclosed. The field signal is cautiously positive: the sellers Zeinullayev talks to got their money - &ldquo;there were delays, but no real problems&rdquo;
            <Fn n={26} tip="From Zeinullayev's correspondence and calls with the Freedom Market team and fellow sellers, July 2026." />
            . On former employees&rsquo; wages there is not even that much of a field signal. If the books are indeed closed, Freedom bought, along with the warehouse, the chance to quietly turn the worst page of its history. What remains is to say so out loud: here, silence works against the buyer.
          </P>
          <P className="mb-5">
            Second - legal status. The deal is confirmed neither by a press release nor by a Nasdaq issuer&rsquo;s disclosure; a Freedom Market trademark is nowhere to be found in the open registries. A domain, however, is. fmarket.kz - the natural name in the holding&rsquo;s nomenclature, where Freedom Finance lives at ffin.kz and Freedom Telecom at ftel.kz - was registered on May 9, 2026: two weeks after the Teez founders left management and three weeks before the Freedom brand unification. Registered through the same registrar that services ffin.kz and ftel.kz, with the same hidden owner as the flagship ffin.kz
            <Fn n={42} tip="KazNIC WHOIS, checked 05.07.2026: fmarket.kz created 09.05.2026, registrar PS Internet Company, owner redacted; ftel.kz - same registrar, registered openly to Freedom Telecom Operations. A shared registrar is not by itself proof of ownership; fmarket.kz's affiliation with Freedom Holding has not been established." />
            . And four days later, an{" "}
            <Term tip="A website security certificate; its issuance means the domain is being actively managed.">SSL certificate</Term>{" "}
            was issued on the domain - covering, among others, the mail subdomain mail.fmarket.kz
            <Fn n={42} tip="Certificate Transparency logs (CertSpotter): on 13.05.2026 a Let's Encrypt certificate was issued for fmarket.kz, covering fmarket.kz, www.fmarket.kz and mail.fmarket.kz; issuance requires active hosting and DNS control. The subdomain set may reflect a hosting panel's default configuration." />
            . Domains bought for resale don&rsquo;t set up email. Whoever stands behind the purchase, the week of May 9–13 speaks for itself: someone was already building infrastructure under the name of a company that doesn&rsquo;t exist. The sales department is moving faster than the lawyers - normal for a launch, corrosive for sellers&rsquo; trust. Every promise from the partner manager so far exists in the same genre as Teez&rsquo;s promises in January: verbal, and pre-launch. A separate storyline is the{" "}
            <Term tip="Securities and Exchange Commission - the US stock-market regulator.">SEC</Term>
            : in March, the company and Turlov personally received a{" "}
            <Term tip="An SEC notification of intent to bring enforcement action; not a charge, but the last step before one.">Wells Notice</Term>{" "}
            - after a five-year investigation, the SEC staff had reached a preliminary determination to recommend a civil enforcement action. In June Turlov framed it as good news - the investigative phase is over - but the company is contesting the SEC&rsquo;s findings, and the question of a lawsuit remains open
            <Fn n={43} tip="FRHC 10-K: Wells Notice received 11.03.2026 by the company and Turlov; the SEC's 'preliminary determination' is being contested. Bloomberg, 02.06.2026; Kursiv, 03.06.2026 - Turlov on the completion of the five-year investigation." />
            . The final terms of that denouement are still to be read by investors.
          </P>
          <P>
            Third - timing, and it cuts both ways. Freedom is rolling out an installment-driven marketplace at the precise moment the regulator is cooling consumer lending: unsecured loan issuance is falling in real terms, debt-burden limits are in force, further tightening is under discussion
            <Fn n={31} tip="DataHub / First Credit Bureau — Kazakhstan's credit market, H1 2025." />
            . The machine that must tell the buyer &ldquo;yes&rdquo; will be accelerating into a headwind. But the wind has a favorable side - two of them. First: the less often banks approve installments, the more often the buyer pays in full - and a full-price purchase with cashback at a 5% commission is exactly the cell of the rate card where Freedom Market beats everyone. &ldquo;Approvals are down - many will just pay upfront. And upfront is a cashback story,&rdquo; Zeinullayev reasons. The second side is political: the country&rsquo;s leadership has spent years publicly demanding that banks pivot from consumer lending to lending to business
            <Fn n={44} tip="Public statements by the country's leadership on pivoting banks from consumer lending to business lending, 2023–2026." />
            . A working-capital loan to a seller is a loan to a small business: a marketplace that learns to finance the entrepreneur rather than the shopper will find itself not against the state agenda but inside it - a rare position for a fintech in a tightening cycle. And the better this whole machine runs, the more attentively the regulator will study it: the fate of Yu&rsquo;e Bao, throttled by limits at its peak, is a mandatory chapter in any textbook about money that stays in the loop too well.
          </P>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── In Lieu of an Epilogue ─── */}
        <div className="mb-12">
          <H2>In Lieu of an Epilogue</H2>
          <P className="mb-5">
            I asked Zeinullayev whether he himself would join Freedom Market. He answered without a pause: yes. &ldquo;Companies like Kaspi need competitors. Where there&rsquo;s competition, there&rsquo;s growth. And you&rsquo;re not dependent on a single sales channel.&rdquo; Since the letter, an entire team from the platform has been on calls with him - discussing strategy, trading questions. That, most likely, is how dozens of large Kaspi sellers are reasoning right now: an empty storefront is cheap visibility and commissions from 5%, and even the warehouse of a company that owed people money four months ago stops being frightening - if the people it owed have been paid.
          </P>
          <P className="mb-5">
            And while the sellers do their math, look at the whole board. Kaspi last year stepped onto the Turkish board, buying 65% of{" "}
            <Term tip="Turkey's No. 2 marketplace after Trendyol, operating nationwide; the only Turkish e-commerce company on Nasdaq.">Hepsiburada</Term>{" "}
            - the country&rsquo;s No. 2 marketplace
            <Fn n={45} tip="Kaspi.kz IR, 29.01.2025 - closing of the acquisition of 65.41% of Hepsiburada, ~$1.1B; Turkish strategy." />
            . Freedom this year answered on the same board: in June the Turkish regulator approved the holding&rsquo;s purchase of a bank
            <Fn n={46} tip="Turkey's BRSA and competition authority approved the acquisition of 99.3% of Turkish Bank A.Ş.; the agreement was signed in February 2026, closing still ahead. 24.kz, 30.06.2026; FRHC release, 01.07.2026." />
            {" "}- while quietly entering Kaspi&rsquo;s home market through the Karaganda warehouse. Two grandmasters have simultaneously started games on each other&rsquo;s boards. This is not a simultaneous exhibition, where a master walks past novices&rsquo; tables - these are two counter-games, and both boards seat champions.
          </P>
          <P className="mb-5">
            The partner manager&rsquo;s letter asked what was missing from the existing marketplaces. My answer: for ten years, the market has been missing a second player. Looks like exactly that order is being assembled right now - at that same warehouse in Karaganda. And from there, as we remember, they deliver in one day.
          </P>
          <P className="mb-5">
            From here, the game can be recorded in notation. Next-day delivery - a move. A commission from 5% - a move. Storefronts instead of a shared listing, open categories, next-day payouts - move, move, move. Kaspi has an answer to each: the champion has the conveyor, the frequency and a ten-year head start. But one piece on the board belongs to Freedom alone, and it cannot be bought with money - the broker. Play it the way described above, and it is no longer an exchange of pawns. It is check. Not mate: mate is far away, and nobody in the country defends better than the champion. But what is it like - to play against yourself for ten years and suddenly hear a piece being moved across the table?
          </P>
          <P>
            The clock is already running.
          </P>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Sources ─── */}
        <div className="reading-panel reading-sources mb-12">
          <h2 className="text-[16px] font-medium tracking-tight text-[var(--color-text)] mb-4">Sources</h2>
          <p className="font-mono text-[12px] italic text-[var(--color-dim)] mb-4">Russian-language sources are marked; links lead to the originals cited.</p>
          <ol className="font-mono text-[12px] text-[var(--color-dim)] leading-[1.7] space-y-3 list-decimal list-inside marker:text-[var(--color-border)]">
            <li>Teez to settle debts to sellers after the fintech deal - <Src href="https://exclusive.kz/teez-vyplatit-dolgi-prodavcam-posle-sdelki-s-finteh-partnerom/">Exclusive.kz</Src>, 19.02.2026 (in Russian).</li>
            <li>Teez: the first Kazakh marketplace with free next-day delivery - <Src href="https://forbes.kz/articles/teez-pervyy-kazahstanskiy-marketpleys-s-besplatnoy-dostavkoy-za-odin-den-4f04aa">Forbes Kazakhstan</Src>, June 2024 (in Russian).</li>
            <li>Teez six months on - <Src href="https://www.zakon.kz/ekonomika-biznes/6474369-Teez-spustya-polgoda-chto-stalo-s-novym-kazakhstanskim-marketpleysom.html">Zakon.kz</Src>, 18.04.2025 (in Russian).</li>
            <li>A Kazakh marketplace is being sold to a major fintech - <Src href="https://forbes.kz/articles/odin-iz-marketpleysov-kazahstana-prodayut-krupnomu-fintehu-ac77ae">Forbes Kazakhstan</Src>, 21.01.2026 (in Russian).</li>
            <li>&ldquo;We are not going bankrupt&rdquo; - <Src href="https://orda.kz/my-ne-bankrotimsja-kazahstanskij-marketplejs-teez-vykupaet-krupnaja-finteh-kompanija-410996/">Orda.kz</Src>, 20.01.2026 (in Russian).</li>
            <li>Teez undergoing pre-sale due diligence - <Src href="https://kapital.kz/business/144992/marketplejs-teez-prohodit-due-diligence-pered-prodazhej.html">Kapital.kz</Src>, 2026 (in Russian).</li>
            <li>Teez ownership changes before the deal - <Src href="https://forbes.kz/articles/pered-sdelkoy-spisok-vladeltsev-marketpleysa-teez-izmenilsya-e1dd61">Forbes Kazakhstan</Src>, 31.03.2026 (in Russian).</li>
            <li>Two Teez co-founders exit operational management - <Src href="https://forbes.kz/articles/marketpleys-teez-pokinuli-dva-soosnovatelya-3e6c82">Forbes Kazakhstan</Src>, 24.04.2026 (in Russian).</li>
            <li>KazanExpress sellers&rsquo; complaints about payout delays before the Magnit deal - <Src href="https://oborot.ru/news/kazanexpress-zaderzhivaet-vyplaty-prodavcam-rukovoditel-izvinilsya-i-obyasnil-situaciyu-i152815.html">Oborot.ru</Src>; <Src href="https://realnoevremya.ru/articles/293765-kak-prodavcy-kazanexpress-otreagirovali-na-ego-prodazhu-magnitu">Realnoe Vremya</Src>, October 2023 (in Russian).</li>
            <li>Turlov&rsquo;s Bloomberg interview via <Src href="https://the-tech.kz/freedom-holding-planiruet-kupit-bank-i-marketplejs-v-kazahstane-chto-rasskazal-timur-turlov-v-intervyu-bloomberg">The-tech.kz</Src>, 03.02.2026 (in Russian).</li>
            <li>Freedom Holding takes the Kazakh super-app model to Turkey - <Src href="https://nationalbusiness.kz/news/freedom-holding-vihodit-v-turtsiyu-s-modelyu-kazahstanskogo-superappa/">National Business</Src>, 17.04.2026 (in Russian).</li>
            <li>Freedom announces brand transformation - <Src href="https://lsm.kz/freedom-ob-yavlyaet-o-transformacii-brenda">LS</Src>, 01.06.2026 (in Russian).</li>
            <li>Kaspi.kz 4Q & FY 2025 Financial Results - <Src href="https://ir.kaspi.kz/media/4Q__FY_2025_Financial_Results.pdf">Kaspi.kz IR</Src>, 02.03.2026.</li>
            <li>MercadoLibre Q4 2024 results - <Src href="https://www.globenewswire.com/news-release/2025/02/20/3030128/9375/en/mercado-libre-delivers-stellar-q4-2024-with-net-revenue-of-6-1-billion-and-net-income-of-639-million.html">GlobeNewswire</Src>, 20.02.2025.</li>
            <li>Ozon: 2024 results, fintech&rsquo;s share of group EBITDA - <Src href="https://ir.ozon.com/ru/sth/ozon-obyavlyaet-finansovye-rezultaty-za-chetvertyy-kvartal-2024-goda-i-2024-god-2e5989f0">Ozon IR</Src>; 2025 results, fintech revenue ₽88.8B → ₽195.2B (+120%) - <Src href="https://ir.ozon.com/ru/sth/ozon-obyavlyaet-finansovye-rezultaty-za-chetvertyy-kvartal-2025-goda-i-2025-god-18833bbf">Ozon IR</Src> (in Russian).</li>
            <li>Uzum 2024 results - <Src href="https://uzum.com/ru/press-center/news-and-press-releases/uzum-announces-financial-results-for-2024/">Uzum press release</Src>, 24.02.2025 (in Russian).</li>
            <li>Uzbekistan&rsquo;s first unicorn, Uzum, leaps to a $1.5B valuation - <Src href="https://techcrunch.com/2025/08/05/uzbekistans-first-unicorn-uzum-leaps-to-a-1-5b-valuation/">TechCrunch</Src>, 05.08.2025.</li>
            <li>Walmart grounds Jet.com - <Src href="https://www.axios.com/2020/05/20/walmart-jet-com">Axios</Src>, 20.05.2020.</li>
            <li>Amazon rebrands Souq - <Src href="https://www.retaildive.com/news/amazon-rebrands-souq/553927/">Retail Dive</Src>, May 2019.</li>
            <li>KazanExpress to be fully &ldquo;reborn&rdquo; by end of 2024 - <Src href="https://logirus.ru/news/e-commerce/kazanexpress_do_kontsa_2024_goda_polnostyu_-pereroditsya-_i_nachnet_plesti_set_punktov_vydachi.html">Logirus</Src>, April 2024 (in Russian).</li>
            <li>MegaMarket sales collapse 93% in 2025 (Data Insight) - <Src href="https://ru.investing.com/news/general-news/article-3266688">Investing.com</Src>; <Src href="https://rb.ru/news/megamarket-opustilsya-s-4-go-na-38-e-mesto-v-rejtinge-marketplejsov-rossii-chislo-zakazov-na-ploshadke-upalo-vtroe/">RB.ru</Src>. Turnover grew 5x in 2023 - <Src href="https://www.rbc.ru/industries/news/65b79e249a794719b17035fa">RBC / Data Insight</Src>, 29.01.2024 (in Russian).</li>
            <li>Sber posts ₽284 billion loss from non-core activities in 2024 - <Src href="https://www.interfax.ru/russia/1011212">Interfax</Src> (in Russian).</li>
            <li>Halyk Market enters Kazakhstan&rsquo;s top-5 marketplaces - <Src href="https://www.nur.kz/nurfin/banks/2349777-halyk-market-voshel-v-top-5-marketpleysov-kazahstana-po-itogam-issledovaniya-ranking-kz/">Nur.kz</Src> (in Russian).</li>
            <li>Author&rsquo;s estimate: on a 24-month annuity schedule the average outstanding balance is ≈52% of the receipt; funding at retail tenge deposit rates (term deposits ≈15-18% p.a., short ones up to 20.5%: <Src href="https://kdif.kz/depozity-i-garantiya/srochnye-vklady/">KDIF</Src>; <Src href="https://tengrinews.kz/private_finance/zarabotat-nazvanyi-samyie-vyigodnyie-depozityi-kazahstantsev-595951/">Tengrinews</Src>, 03.2026 (in Russian)) costs ≈16-19% of the receipt over two years, against the seller&rsquo;s 9 p.p. surcharge. The estimate is nominal, uses marginal (not blended-with-CASA) funding and no discounting - in present value the multiple is ~1.5-1.8 and the conclusion holds; early repayments, the bank&rsquo;s adjacent income and the upfront nature of the commission are not counted (they cheapen it), nor is credit-risk cost (it makes it dearer).</li>
            <li>Redstat data, April 2026: 59 sellers on the iPhone 17 Pro 256Gb listing; 35–59 sellers on each of the eight top-selling iPhone listings.</li>
            <li>Nurbek Zeinullayev&rsquo;s correspondence and calls with the Freedom Market team, July 2026. Records and screenshots on file with the author; published with Zeinullayev&rsquo;s consent.</li>
            <li>Freedom Holding Corp. FY2026 results - <Src href="https://www.nasdaq.com/press-release/freedom-holding-corp-more-doubles-net-income-and-reports-record-revenue-fiscal-2026">Nasdaq/FRHC</Src>, 02.06.2026.</li>
            <li>T-Bank eCommerce research (October 2024): average seller income on one platform - ₽53K/month; on two - ₽137K/month - <Src href="https://www.tbank.ru/about/news/08102024-t-bank-ecommerce-and-t-data-released-a-study-on-the-marketplace-sellers-market-in-2024/">T-Bank</Src> (in Russian).</li>
            <li>ARDFM, <Src href="https://nationalbank.kz/en/news/predydushchie-publikacii-opros">NBK Bank Lending Survey</Src>, <Src href="https://datahub.1cb.kz/ru/articles/53">FCB DataHub</Src> - bank-level approval rates are not published (in Russian).</li>
            <li>Loan-application approval rates: AFK reviews for 2024 and 9M2025 - <Src href="https://forbes.kz/articles/afk-bezzalogovye-zaymy-v-kazahstane-padayut-zalogovye-segmenty-rastut-9cc40f">Forbes.kz</Src>; Finprom on NBK data - <Src href="https://tengrinews.kz/kazakhstan_news/potrebitelskie-kredityi-v-kazahstane-vsem-li-ih-odobryayut-566889/">Tengrinews</Src> (in Russian).</li>
            <li>Kazakhstan&rsquo;s credit market: H1 2025 results - <Src href="https://datahub.1cb.kz/ru/articles/54">DataHub / First Credit Bureau</Src> (in Russian).</li>
            <li>Kaspi.kz Form 20-F - <Src href="https://ir.kaspi.kz/media/Form_20-F_2025.pdf">automated loan approval process</Src>.</li>
            <li>Kazakhstan&rsquo;s banking sector in June 2025 - <Src href="https://halykfinance.kz/download/files/analytics/banks_june2025.pdf">Halyk Finance</Src> (in Russian).</li>
            <li>ForteBank absorbs Home Credit Bank - <Src href="https://the-tenge.kz/articles/forte-bank-pogloshchaet-home-credit-bank">The Tenge</Src>, 2025 (in Russian).</li>
            <li>Tochka bank acquires 100% of MPSTATS - <Src href="https://bg.ru/bg/business/comm-news/31254-mpstats-tochka">BG.ru</Src>, February 2026 (in Russian).</li>
            <li>Author&rsquo;s calculations: Kaspi category shares - Redstat, April 2026; Wildberries structure and fulfillment shares - MPSTATS, July 2025 - June 2026, twelve monthly windows (clothing&rsquo;s FBW share by monthly windows - never below 76%, averaging 85.2%). &ldquo;Revenue&rdquo; in MPSTATS data means orders, not completed purchases. Datasets and methodology available on request.</li>
            <li>eToro launches debit card in Europe, giving users 4% back in stock - <Src href="https://www.etoro.com/news-and-analysis/press-releases/etoro-launches-debit-card-in-europe-giving-users-4-back-in-stock-on-everyday-purchases/">eToro</Src>, 24.06.2025.</li>
            <li>MercadoLibre: Mercado Fondo AUM dynamics - <Src href="https://api.mziq.com/mzfilemanager/v2/d/098a2d95-0ea8-4ed5-a340-d9ef6a2b0053/2ff0f141-ac16-6c7d-f47e-c9ff03c0da9e?origin=1">MELI Letters to Shareholders</Src>.</li>
            <li>Author&rsquo;s prior-art survey of public disclosures and product announcements, June–July 2026. Methodology and source registry available on request.</li>
            <li>Medina, Mittal. NBER Working Paper No. 28479 (2021): brand stock ownership and consumer spending - <Src href="https://www.nber.org/papers/w28479">NBER</Src>.</li>
            <li>Bakkt acquires Bumped Financial for $0.63M (08.02.2023, cash) - <Src href="https://www.sec.gov/Archives/edgar/data/1820302/000182030224000070/bakkt10-k2023ars.pdf">Bakkt 10-K 2023 (SEC)</Src>.</li>
            <li>KazNIC WHOIS (05.07.2026): fmarket.kz created 09.05.2026, PS Internet Company, owner redacted; ftel.kz - same registrar, Freedom Telecom Operations; ffin.kz - owner likewise hidden. Certificate Transparency (CertSpotter): 13.05.2026 - a Let&rsquo;s Encrypt certificate for fmarket.kz, www and mail; the subdomain set may reflect a hosting panel&rsquo;s default configuration. A shared registrar is not by itself proof of ownership.</li>
            <li>Billionaire Kazakh brokerage CEO got SEC enforcement warning - <Src href="https://www.bloomberg.com/news/articles/2026-06-02/billionaire-kazakh-brokerage-ceo-gets-sec-enforcement-warning">Bloomberg</Src>, 02.06.2026; <Src href="https://kz.kursiv.media/en/2026-06-03/engk-tank-timur-turlov-completion-of-sec-investigation-will-pave-the-way-for-capital-raising/">Kursiv</Src>, 03.06.2026.</li>
            <li>Public statements by the country&rsquo;s leadership on pivoting banks to business lending, 2023–2026.</li>
            <li>Kaspi.kz completes acquisition of 65.41% of Hepsiburada (~$1.1B) - <Src href="https://www.globenewswire.com/news-release/2025/01/29/3016953/0/en/Kaspi-kz-Completes-Acquisition-of-Controlling-Interest-in-Hepsiburada.html">GlobeNewswire</Src>, 29.01.2025; Turkish strategy - <Src href="https://ir.kaspi.kz/media/4Q__FY_2025_Financial_Results.pdf">Kaspi.kz IR</Src>.</li>
            <li>Turkish regulator approves Freedom Holding&rsquo;s acquisition of 99.3% of Turkish Bank A.Ş. - <Src href="https://24.kz/ru/news/economyc/777746-regulyator-turtsii-odobril-sdelku-freedom-holding-corp-po-priobreteniyu-banka">24.kz</Src>, 30.06.2026 (in Russian); <Src href="https://www.globenewswire.com/news-release/2026/07/01/3320869/0/en/Freedom-Holding-Corp-Receives-BRSA-Approval-to-Acquire-Turkish-Bank.html">FRHC release</Src>, 01.07.2026.</li>
          </ol>
        </div>

        {/* ─── Engagement ─── */}

    </ArticleLayout>
  );
}
