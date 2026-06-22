"use client";

import Image from "next/image";
import { ReadTracker } from "@/components/read-tracker";
import { SiteHeader, SiteFooter, AuthorBlock } from "@/components/canon/site-chrome";
import { ArticleHeader } from "@/components/canon/article-header";
import { Term, Fn } from "@/components/canon/term";
import { EngagementProvider } from "@/components/engagement/engagement-provider";
import { EngagementBar } from "@/components/engagement/engagement-bar";
import { Comments } from "@/components/engagement/comments";
import {
  Grafik1,
  Grafik2,
  Grafik3,
  Grafik4,
  Grafik5,
  Grafik6,
  Grafik7,
} from "@/components/charts/nvidia-kazakhstan-en";

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

function IconlyArrowRight({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14.43 5.93L20.5 12L14.43 18.07" />
      <path d="M3.5 12H20.33" />
    </svg>
  );
}

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
export default function SiliconOnCoalArticle() {
  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <ReadTracker slug="nvidia-kazakhstan" />
        <SiteHeader />
        <EngagementProvider slug="nvidia-kazakhstan">
          <article className="w-full max-w-[680px] mx-auto px-6 py-12 md:py-20">

            <ArticleHeader
              locale="en"
              kicker="Data brief"
              title={<>Silicon on Coal</>}
              subtitle={
                <>
                  Kazakhstan has signed $10 billion in agreements with NVIDIA and the American firm Firebird: Central Asia&apos;s largest plant for mining artificial intelligence will rise in Ekibastuz. They&apos;ll mine it the old way - with coal. A data breakdown of what was signed, what it will cost, and where we&apos;ve seen this movie before.
                </>
              }
              slug="nvidia-kazakhstan"
              date="June 22, 2026"
              readMin={14}
              hero={{
                src: "/blog/nvidia-kazakhstan/cover.webp",
                alt: "A lump of Ekibastuz coal with a silicon chip embedded in it",
                credit: "Illustration: Almas Kasymzhanov · Higgsfield AI",
                width: 1600,
                height: 1200,
              }}
            />

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── Lead ─── */}
            <div className="mb-12">
              <P className="mb-5">
                They&apos;ve mined coal in Ekibastuz for a hundred years. The gesture hasn&apos;t changed in a century: bite into the seam, lift the black rock, throw it in the furnace. First they mined heat that way. Then electricity. Now, with the same gesture, they&apos;ll mine artificial intelligence.
              </P>
              <P className="mb-5">
                Above the open pit stands a chimney. At 419.7 metres - 1,377 feet, taller than the Eiffel Tower, taller than anything built in Kazakhstan - it is the tallest flue on Earth. For almost forty years it scattered across the steppe the smoke of{" "}
                <Term tip="GRES - a large Soviet-era thermal (mostly coal) power station. Russian: ГРЭС.">GRES-2</Term>, a coal plant burning rock from the pit next door. The chimney was the exclamation point of the last century: coal, steam, metal, smoke.
              </P>
              <P className="mb-5">
                On June 15, 2026, in Astana, Prime Minister Olzhas Bektenov shook hands with NVIDIA vice president Rev Lebaredian. Beside them stood the founders of the American company Firebird. They signed agreements the government valued at ten billion dollars: the &quot;Data Center Valley&quot; project, a hundred thousand cutting-edge GPUs, capacity up to a gigawatt, the first data center by 2027. The minister of artificial intelligence, Zhaslan Madiyev, promised no less than $3 billion in export revenue a year and infrastructure &quot;for decades ahead.&quot; Coal did come up at the ceremony - but as a virtue: the project was pitched as a way to &quot;turn Ekibastuz coal into export digital revenue.&quot; What that coal will cost - not a word.
              </P>
              <P className="mb-5">
                A pity. &quot;The cloud&quot; - that&apos;s what we&apos;ve gotten used to calling data centers: the place where our files, our chats, our neural networks live. In Ekibastuz this cloud will be assembled out of another cloud - the one rising over a chimney 419.7 metres tall. The digital future here will smell of coal. And that&apos;s not a figure of speech, it&apos;s an engineering schematic.
              </P>
              <P>
                I took the public documents, the ministries&apos; answers, industry statistics, and independent estimates - and ran the numbers. The picture splits into two stories the press releases fuse into one. First: the money mostly isn&apos;t here yet - there&apos;s a promise. Second: the power is mostly coal, and to feed the new digital economy the country is preparing to build new coal generation. Neither cancels the project&apos;s real value. But the value doesn&apos;t cancel the cost either. The numbers come next. Everyone will draw their own conclusions.
              </P>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── I ─── */}
            <div className="mb-12">
              <H2>I. The deal that isn&apos;t there yet</H2>
              <P className="mb-5">
                Start with the ten billion. A pretty figure - round, easy to remember - and almost entirely in the future tense.
              </P>
              <P className="mb-5">
                On June 15, two documents were signed. The first - a framework agreement on strategic cooperation between the Ministry of Artificial Intelligence and Firebird. The second - a &quot;binding{" "}
                <Term tip="A document of preliminary deal terms: it records intent and parameters but doesn't itself obligate anyone to build and doesn't guarantee money. Real obligations come later, in full contracts.">
                  term sheet
                </Term>
                <Fn n={1} tip="Term sheet - a document of preliminary deal terms. It records intent and key parameters but doesn't itself obligate anyone to build and doesn't guarantee money; real obligations come later, in full contracts." />
                {" "}&quot; between a subsidiary of Kazakhtelecom and the same Firebird. Neither is a closed investment deal, a construction contract, or confirmed financing. A term sheet is an engagement, not a wedding. An architect&apos;s render, not a poured foundation.
              </P>
              <P className="mb-5">
                Ten billion isn&apos;t confirmed financing - it&apos;s the stated &quot;total investment volume&quot; across several agreements at once, not a single check written. The structure has since been clarified publicly: the{" "}
                <Term tip="The build is split into parts: stage one (~$5bn, 125 MW live in 2027) and stage two (~$5bn, no dates). The stated $10bn is the sum across all stages and agreements, not money put in at once.">
                  first stage
                </Term>{" "}
                - about five billion, including roughly one billion from the state-controlled{" "}
                <Term tip="Kazakhstan's state-controlled national telecom operator. In the deal it's on the country's side: it provides power, cooling, and connectivity and, per the stated structure, puts ~$1bn into stage one. So 'a billion from the state operator' isn't the same as private investment.">
                  Kazakhtelecom
                </Term>
                ; the commercial launch of the first 125-MW phase is slated for 2027. The second stage - another five billion or so, with no timeline set. Under the deal&apos;s structure, Firebird&apos;s Kazakh subsidiary supplies and finances the compute itself, while Kazakhtelecom provides power, cooling, and connectivity.
              </P>
              <P className="mb-5">
                But this too is a stated plan, not confirmed capital. How much hard capital is in the ground today, no one disclosed - not the government, not the companies. One named billion from the state telecom operator, plus a promise to <em>raise</em> the rest, is not money invested yet: per Reuters, the Kazakh side handles construction of the &quot;Valley,&quot; while Firebird&apos;s role is to supply equipment and attract major global players. And the thirty billion the prime minister floated in January as a long-term marker has no publicly named source of financing behind it.
              </P>

              <ChartSlot
                n={1}
                type="three levels"
                title="Ten billion on paper"
                caption={
                  <>
                    Source: <Src href="https://primeminister.kz">primeminister.kz</Src>
                    <Dot />
                    <Src href="https://www.reuters.com">Reuters</Src>
                    <Dot />
                    <Src href="https://finance.yahoo.com">Bloomberg</Src>
                    <Dot />
                    <Src href="https://thenextweb.com">The Next Web</Src>
                  </>
                }
                note="Hatching - stated sums, not firmly confirmed; solid - firmly named capital."
              >
                <Grafik1 />
              </ChartSlot>

              <P className="mb-5">
                Who is Firebird? An American company headquartered in San Francisco, founded in early 2025. Its co-founder and CEO, Razmig Hovaghimian, previously built not data centers but video streaming - the service Viki, which Rakuten bought. At the time of the Kazakh signing, Firebird had exactly one announced project - a center in Armenia (100 MW, $500 million); by the summer of 2026 it hadn&apos;t yet entered commercial operation, but its financing was already closed: in March 2026 six Armenian banks signed a{" "}
                <Term tip="A large loan issued not by one bank but several at once, splitting the sum and the risk among them.">
                  syndicated loan
                </Term>{" "}
                of $300 million. So the company&apos;s résumé isn&apos;t empty - but it isn&apos;t long either: one financed project, not yet proven in operation.
              </P>
              <P>
                NVIDIA, in this scheme, isn&apos;t an investor. Its role is to supply chips (the current{" "}
                <Term tip="NVIDIA's current top AI-accelerator generation (Blackwell Ultra architecture). Used to train and run large neural nets.">
                  GB300
                </Term>{" "}
                generation and the future{" "}
                <Term tip="NVIDIA's future AI-chip generation (after GB300). Named for astronomer Vera Rubin - it's the model name, not a person.">
                  Vera Rubin
                </Term>
                ) and to advise technically. The company puts no money into construction. And here - a separate, underrated risk: chips of this class require an individual US export license. The question is complicated by the fact that Kazakh companies have already faced US sanctions designations for re-export to Russia, and under that pressure Kazakhstan tightened its own export controls in late 2024. For a hundred thousand chips worth $10 billion, this isn&apos;t background but Washington&apos;s central question: are there guarantees they won&apos;t leak onward? Firebird has a precedent for approval - the US granted the license for the Armenian project. But Armenia isn&apos;t Kazakhstan, and at the time of signing the Kazakh license wasn&apos;t publicly confirmed.
              </P>
              <P className="mt-5">
                None of this makes the project a fiction. Framework agreements are a normal first step for big builds; real gigawatts have started this way too. But between &quot;signed for ten billion&quot; and &quot;invested ten billion&quot; lies a distance measured not in press releases but in executed contracts and poured concrete. So far a framework agreement and a term sheet are signed - the concrete isn&apos;t poured yet.
              </P>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── II ─── */}
            <div className="mb-12">
              <H2>II. Where the power comes from</H2>
              <P className="mb-5">
                Now the most important part. Because a gigawatt compute cluster is, first and foremost, a power plant with servers bolted on.
              </P>
              <P className="mb-5">
                The &quot;Data Center Valley&quot; will sit on the Ekibastuz power hub. That means GRES-1 and GRES-2, two coal plants running on local Ekibastuz coal. In an answer to the outlet Kursiv, the digital ministry put it plainly: power is supplied by GRES-1 and GRES-2, with 300 MW reserved at the start, growing to a gigawatt. Pavlodar Region itself is the country&apos;s energy heart: it accounts for about 42% of all of Kazakhstan&apos;s electricity generation, and almost all of it is coal.
              </P>
              <P className="mb-5">
                In nature there are two stones this story rests on. Silicon and coal. The first becomes chips, so the machine can learn to think. The second is burned to give it the energy to do so. One stone is mined for computation, the other for the power that feeds it. Ekibastuz coal is, on top of that, among the worst on the planet by a simple engineering measure:{" "}
                <Term tip="The share of non-combustible rock in coal that gives no heat and flies out as ash. Ekibastuz coal's is among the highest in the world.">
                  35–40% ash content
                </Term>{" "}
                (the share of non-combustible rock that gives no heat and flies out as ash). Almost half of what enters the furnace isn&apos;t fuel, it&apos;s stone. Since 1981, GRES-1 and GRES-2 have sent that ash into Lake Karasor - an endorheic, bitter-salt body of water on the steppe that has become an archive of everything burned. And under the national emissions-quota plan, the Ekibastuz GRES-1 and GRES-2 are among the largest CO₂ emitters in the country&apos;s power sector.
              </P>
              <P className="mb-5">
                <Term tip="How many grams of CO₂ are emitted per kilowatt-hour generated. The dirtier the fuel (coal is dirtiest), the higher the number.">
                  Carbon intensity
                </Term>
                <Fn n={2} tip="Carbon intensity - how many grams of CO₂ are emitted per kilowatt-hour of electricity generated. The dirtier the fuel (coal is dirtiest), the higher the number." />
                {" "}for all of Kazakhstan&apos;s grid is about 604 grams of CO₂ per kilowatt-hour (Ember data for 2025), with coal making up more than half. That&apos;s twice the European average and roughly twelve times that of wind or solar. And because the &quot;Valley&quot; runs not off the averaged grid but directly off coal units, its real footprint will be heavier still:{" "}
                <Term tip="Older coal units with low steam parameters and low efficiency: more fuel burned, more emissions per kWh.">
                  old subcritical units
                </Term>{" "}
                put out 900–1,000 grams per kilowatt-hour.
              </P>
              <P className="mb-5">
                And here&apos;s the turn that gets lost in the chip headlines. To meet the Ekibastuz hub&apos;s growing demand, <strong className="text-[var(--color-text)]">new coal</strong> is coming online. Units 3 and 4 of GRES-2 are already under construction - the{" "}
                <Term tip="A turnkey deal where one contractor designs, procures, and builds the whole facility (Engineering, Procurement, Construction).">
                  EPC contract
                </Term>{" "}
                is signed - plus more than a thousand megawatts by 2028–2030. And next door they&apos;re building GRES-3 - a whole new coal plant of 2.64 gigawatts (four 660-MW units). Finding an investor for it was agony: the tender was announced three times in 2025, and each time it fell through - almost no one wanted to build a coal plant on a thirty-year horizon. In the end, in January 2026, the build was awarded{" "}
                <Term tip="Awarding a contract with no tender, directly to the only supplier - when no competitors are left.">
                  single-source
                </Term>
                , without competition, to a Chinese-Kazakh consortium (China&apos;s GCL and Kazakhstan&apos;s Integra) - under a guaranteed capacity tariff fifteen years out. The direction itself is telling: to meet the planet&apos;s most modern silicon infrastructure, they&apos;re finishing last-century coal generation on the steppe.
              </P>
              <P className="mb-5">
                It shows in the procurement too. GRES-1, where the &quot;Valley&quot; is being seated right now, by open tenders of the quasi-state sector (the zakup.sk.kz registry, snapshot of June 20, 2026, via the platform{" "}
                <Term
                  accent
                  tip={
                    <>
                      Analytics service for Kazakhstan&apos;s public procurement.
                      <a
                        href="https://10b.kz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center gap-1.5 rounded-[3px] bg-[var(--color-brand)] text-[var(--color-bg)] px-2.5 py-1 text-[11px] font-medium hover:opacity-90 transition-opacity"
                      >
                        Open 10b.kz
                        <IconlyArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </>
                  }
                >
                  10b.kz
                </Term>
                ) is busy not with expansion but with repairs: its largest open tender is a service contract for Alstom high-voltage equipment of nearly half a billion tenge (₸481M), alongside a lift replacement on the seventh power unit and an ash-dump remediation project. The portrait of an aging asset being patched to last until the data center arrives.
              </P>

              <ChartSlot
                n={7}
                type="horizontal bars"
                title="Patching the plant for a data center"
                caption={
                  <>
                    Snapshot of open lots, June 20, 2026
                    <Dot />
                    Source: zakup.sk.kz registry via <Src href="https://app.10b.kz/samruk/4439122">10b.kz</Src>
                  </>
                }
              >
                <Grafik7 />
              </ChartSlot>

              <ChartSlot
                n={2}
                type="stepped area"
                title="New coal for the digital future"
                caption={
                  <>
                    Source: <Src href="https://www.samruk-energy.kz">Samruk-Energy</Src>
                    <Dot />
                    <Src href="https://kz.kursiv.media">Kursiv</Src>
                  </>
                }
                note="Hatching - GRES-3: construction at an early stage (contract awarded single-source, commissioning by 2032)."
              >
                <Grafik2 />
              </ChartSlot>

              <P className="mb-5">
                Here we need the honesty that separates an investigation from a pamphlet. No public document asserts a direct causal link: &quot;they&apos;re building GRES-3 <em>because</em> the data center came.&quot; The plant is also presented as an answer to the country&apos;s general power deficit. But what can be stated firmly: the &quot;Valley&quot; is officially tied to the Ekibastuz hub; the hub is expanding on coal; and the cluster&apos;s gigawatt of demand lands in the same equation as the new coal units. The machines will learn to think. They&apos;ll be fired with coal.
              </P>
              <P>
                The &quot;clean coal&quot; label on GRES-3 is its own story. The{" "}
                <Term tip="Coal units running on steam at very high temperature and pressure: efficiency is higher, less fuel per unit of power, somewhat fewer emissions - but it's still coal.">
                  ultra-supercritical unit
                </Term>
                <Fn n={3} tip="Ultra-supercritical units - coal units running on steam at very high temperature and pressure. Efficiency is higher and less fuel is burned per unit of power, so emissions are somewhat lower - but it's still coal." />
                {" "}technology does cut emissions - by roughly 8–13% against the old units. But &quot;cuts&quot; isn&apos;t &quot;zeroes out&quot;: without{" "}
                <Term tip="Technology that 'catches' CO₂ at the plant's exhaust and pumps it underground. Expensive, not yet used in Kazakhstan; without it 'clean coal' stays coal.">
                  carbon capture
                </Term>
                <Fn n={4} tip="Carbon capture (CCS) - technology that 'catches' CO₂ at the plant's exhaust and pumps it underground instead of releasing it. Expensive and not yet used in Kazakhstan; without it, 'clean coal' stays coal." />
                {" "}a plant like this still emits about 800 grams per kilowatt-hour. Whether GRES-3 will have that capture is publicly unknown. And without it, &quot;clean coal&quot; is mostly an adjective.
              </P>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── III ─── */}
            <div className="mb-12">
              <H2>III. The arithmetic</H2>
              <P className="mb-5">
                The figures here are estimates, and I show what they&apos;re built from. That&apos;s what data journalism is: not &quot;a lot&quot; and &quot;a little,&quot; but exactly how much, and under which assumptions.
              </P>
              <P className="mb-5">
                <strong className="text-[var(--color-text)]">Carbon.</strong> Take the target gigawatt of useful load, a{" "}
                <Term tip="How many times more energy a data center uses than goes to the computing itself. PUE 1.2 = for each 'useful' kilowatt, another 200 watts on cooling. The closer to 1.0, the more efficient.">
                  PUE of 1.2
                </Term>
                <Fn n={5} tip="PUE - how many times more energy a data center uses than goes to the computing itself. PUE 1.2 means: for every 'useful' kilowatt, another 200 watts for cooling and infrastructure. The closer to 1.0, the more efficient." />
                {" "}(realistic for a hot climate) and 85% utilization. That comes to about 8.9 terawatt-hours a year. At grid intensity, that&apos;s roughly <strong className="text-[var(--color-text)]">5.3 million tonnes of CO₂ a year</strong>. On direct coal power - closer to <strong className="text-[var(--color-text)]">8 million</strong>. To feel the scale: 5.3 million tonnes is the annual carbon footprint of a city of four hundred thousand. A single compute campus breathes like an entire regional capital.
              </P>
              <P className="mb-5">
                <strong className="text-[var(--color-text)]">Share of the country.</strong> Those same 8.9 TWh are about <strong className="text-[var(--color-text)]">7% of all of Kazakhstan&apos;s electricity generation</strong> (in 2024 the country generated 117.9 billion kWh, per KEGOC). A single facility takes nearly every fourteenth kilowatt-hour in the country - and the share will only grow the longer the &quot;Valley&quot; runs at full tilt. Today all the country&apos;s data centers together draw under one percent.
              </P>

              <ChartSlot
                n={3}
                type="horizontal bars"
                title="The dirtiest outlet for the smartest machines"
                caption={
                  <>
                    Source: <Src href="https://ember-energy.org/countries-and-regions/kazakhstan/">Ember</Src>
                    <Dot />
                    <Src href="https://www.iea.org">IEA</Src>
                  </>
                }
                note="Hatching - author's estimates by generation type (GRES-3 and the old units)."
              >
                <Grafik3 />
              </ChartSlot>

              <P className="mb-5">
                <strong className="text-[var(--color-text)]">Water.</strong> Here the data is thinnest - so a range, not one number. If the campus is evaporatively cooled (the usual scheme for a hot climate), then at 8.9 TWh and a norm of ~1.8 liters per kilowatt-hour, that&apos;s about <strong className="text-[var(--color-text)]">16 million cubic meters of water a year</strong> - roughly a fifth of all the irrigation water Pavlodar Region&apos;s farmers used in all of 2024 (76.6 million m³). A closed liquid loop uses 5–10× less, but which scheme the &quot;Valley&quot; will choose isn&apos;t publicly stated. And this isn&apos;t abstract: Pavlodar Region is semi-arid, 250–300 mm of rain a year, and the country&apos;s renewable water resources are shrinking. How much water will go to cooling chips on the steppe - no one has said yet.
              </P>
              <P className="mb-5">
                <strong className="text-[var(--color-text)]">The price of carbon.</strong> Here&apos;s the figure that explains all the rest. A tonne of CO₂ in{" "}
                <Term tip="A market where you must pay for the right to emit a tonne of CO₂, to make polluting unprofitable. In the EU a tonne costs dozens of euros; in Kazakhstan about a dollar, and even that effectively doesn't work.">
                  Kazakhstan&apos;s emissions-trading system
                </Term>
                <Fn n={6} tip="Emissions-trading system (ETS) - a market where you must pay for the right to emit a tonne of CO₂. The idea is to make pollution expensive so cleaner options win. In the EU a tonne costs dozens of euros; in Kazakhstan about a dollar, and even that effectively doesn't work." />
                {" "}costs about <strong className="text-[var(--color-text)]">one dollar</strong>. In the EU it&apos;s several dozen euros - on the order of seventy for the same tonne. And in Kazakhstan the quotas are handed out free, with trading itself suspended back in 2022. A dollar a tonne isn&apos;t a brake on coal. It&apos;s a brake pedal that&apos;s gone through the floor: press all you want, the car won&apos;t slow.
              </P>
              <P>
                <strong className="text-[var(--color-text)]">Promises against trajectory.</strong> Kazakhstan has written carbon neutrality by 2060 into law and filed with the UN a target to cut emissions by 2035
                <Fn n={7} tip="NDC - 'Nationally Determined Contribution': a country's official Paris-Agreement pledge for how much it will cut emissions by a given year." />
                . And Climate Action Tracker - an international monitor of climate policy - rates the country&apos;s course &quot;Insufficient&quot; and projects emissions will keep <em>rising</em> at least until 2030. CO₂ emissions per capita here are 12.55 tonnes against a global 4.67. A new coal plant lives 30–40 years - that&apos;s a{" "}
                <Term tip="A decision made today (a new coal plant lives 30–40 years) that 'locks in' emissions for decades - exactly the period the country promised to zero them out.">
                  &quot;carbon lock-in&quot;
                </Term>
                : a decision made today locks emissions in for exactly the period the country promised to zero them out.
              </P>

              <ChartSlot
                n={4}
                type="two lines (lead)"
                title="Two lines that aren't meant to meet - but they're heading toward each other"
                caption={
                  <>
                    Source: <Src href="https://undp.org">UNDP / Kazakhstan NDC</Src>
                    <Dot />
                    <Src href="https://climateactiontracker.org/countries/kazakhstan">Climate Action Tracker</Src>
                  </>
                }
              >
                <Grafik4 />
              </ChartSlot>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── IV ─── */}
            <div className="mb-12">
              <H2>IV. A movie that&apos;s played before</H2>
              <P className="mb-5">
                Kazakhstan isn&apos;t the first to plug artificial intelligence into fossil fuel. This movie has run in several countries, and the ending is known. The lesson isn&apos;t a moral - it&apos;s who ended up paying.
              </P>
              <P className="mb-5">
                <strong className="text-[var(--color-text)]">Memphis, USA.</strong> Elon Musk&apos;s xAI built the Colossus cluster and powered it with gas turbines - without emissions permits. In an April 2026 lawsuit, the NAACP, the oldest civil-rights organization in the US, counted 27 such turbines at the Colossus 2 site in Southaven - and by May there were 57: the company more than doubled the fleet mid-litigation. By the plaintiffs&apos; estimate, that sharply raised nitrogen-oxide and fine-particulate emissions in an area already struggling to breathe. At the first site, Colossus 1, the turbines had to be removed under threat of suit. And in June 2026 the US Department of Justice stepped in - asking that the suit be dismissed, because cutting power to AI infrastructure threatens national security. If even in America, with its courts and environmental law, the fight goes this hard, ask: what brakes will work where a tonne of carbon costs a dollar and a class action is exotic?
              </P>
              <P className="mb-5">
                <strong className="text-[var(--color-text)]">Northern Virginia, USA.</strong> The world&apos;s largest cluster of data centers - more than 1,300 of them. Dominion puts grid capital spending for this demand alone at $28.3 billion (a 2025 filing) - and the main fight is over what share ordinary consumers will pay: from 2027 the state regulator has required data centers to cover at least 85% of grid costs, to protect households. In the summer of 2024, an equipment fault on a transmission line near Fairfax forced about 60 data centers to switch to diesel generators at once - about 1,500 MW of load vanished from the grid instantly, and PJM operators barely kept the system from failing (per a NERC report). And Dominion is delaying the retirement of coal plants - citing demand from those same data centers. The lesson: a gigawatt of load is the load of a whole industrial region, and who pays for it is a question that takes years to settle.
              </P>
              <P className="mb-5">
                <strong className="text-[var(--color-text)]">Ireland.</strong> The country was held up as Europe&apos;s digital hub - until it turned out data centers eat <strong className="text-[var(--color-text)]">22% of all electricity</strong> (per the CSO statistics office for 2024, 6,969 GWh) - more than all the country&apos;s urban households combined. Wholesale prices ran roughly a third above the European average, and experts tie that partly to the data centers. From 2021 to 2025 the grid operator held a de facto moratorium on new connections around Dublin, and EirGrid projects the share will reach 30% by 2032. A sharp lesson: even with developed renewable generation, a share past a fifth pushed the grid to the edge. With a coal-based mix and modest renewables, Kazakhstan&apos;s margin is thinner.
              </P>

              <ChartSlot
                n={5}
                type="horizontal bars"
                title="Where data centers have already overloaded the grid"
                caption={
                  <>
                    Source: <Src href="https://www.cso.ie">CSO Ireland</Src>
                    <Dot />
                    EPRI
                    <Dot />
                    author&apos;s calculation
                  </>
                }
                note="Hatching - forecast and estimates (Northern Virginia by 2030; the &quot;Valley&quot; at 1 GW)."
              >
                <Grafik5 />
              </ChartSlot>

              <P>
                The common denominator of all three stories is one: AI demand grows faster than the clean generation to feed it. And where clean falls short, dirty steps in: gas, more often coal. In the US, demand from data centers has already delayed the retirement of more than thirty coal units.
              </P>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── V ─── */}
            <div className="mb-12">
              <H2>V. The other side of the scale</H2>
              <P className="mb-5">
                To reduce it all to smoke would be dishonest. This deal has weight on the other side of the scale too, and it has to be named plainly - otherwise it&apos;s not a breakdown but a verdict.
              </P>
              <P className="mb-5">
                <strong className="text-[var(--color-text)]">Sovereign AI isn&apos;t a slogan.</strong> In a world where compute is becoming as strategic a resource as oil was in the 20th century, your own infrastructure is independence. Kazakhstan already ranks 34th in IMD&apos;s world digital-competitiveness ranking and is the clear regional leader. The &quot;Valley&quot; fits a wider trend: talks are running in parallel with Microsoft, OpenAI, the Emirati G42 and Mubadala, and a separate $2 billion hub with Freedom Holding has been announced. This isn&apos;t a whim - it&apos;s a bet on a whole industry.
              </P>
              <P className="mb-5">
                <strong className="text-[var(--color-text)]">An investment signal.</strong> Cheap land, tax zeros, and a preferential electricity tariff (officials didn&apos;t name the exact rate, but it&apos;s well below the 7–9 cents of the US and EU) is a message to the global market: come. Against a crowded Virginia and a closed Ireland, Kazakhstan is taking the &quot;frontier&quot; niche for{" "}
                <Term tip="Tech giants (Microsoft, Google, Amazon, etc.) that rent compute capacity by whole data centers.">
                  hyperscalers
                </Term>{" "}
                (the giants like Microsoft and Google that rent capacity by the whole campus). Low latency to European and Asian nodes adds an argument.
              </P>
              <P className="mb-5">
                <strong className="text-[var(--color-text)]">But the jobs aren&apos;t where they seem.</strong> Here data journalism is obliged to cool the enthusiasm with a number. A hyperscale data center isn&apos;t a factory. By industry norms, 100 MW supports 20–30 permanent staff. A gigawatt - a few hundred people, which matches the government&apos;s &quot;more than 250&quot; estimate. Ten billion put into ordinary industry would have yielded tens of thousands of jobs. A data center&apos;s real payoff isn&apos;t direct employment but an ecosystem: talent, skills, adjacent services. That&apos;s valuable. But it&apos;s something other than &quot;the build will give the city work.&quot;
              </P>
              <P>
                And from that, a question without an answer: the preferential tariff (officials didn&apos;t disclose the exact rate) is almost certainly below the cost of new coal generation. Someone subsidizes the difference. If it&apos;s the budget or other consumers - then part of the &quot;investment appeal&quot; is paid out of the common pocket.
              </P>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── VI ─── */}
            <div className="mb-12">
              <H2>VI. A different frontier</H2>
              <P className="mb-5">
                On June 22, 2026, a week after the Astana signing, TIME ran on its cover the words &quot;The AI Frontier - inside the global race to power the future.&quot; The photo isn&apos;t the steppe. It&apos;s a snowbound construction site in a Norwegian fjord, above the Arctic Circle. The town of Narvik, an old port, twenty thousand people. There the company Nscale and Norway&apos;s Aker are building one of Europe&apos;s largest AI clusters - exactly the race Ekibastuz just entered. With one difference that changes everything.
              </P>

              <figure className="my-8 border border-[var(--color-border)] rounded-[3px] overflow-hidden max-w-[460px] mx-auto">
                <Image
                  src="/blog/nvidia-kazakhstan/time-cover.webp"
                  alt="TIME cover, June 22, 2026 — 'The AI Frontier', the snowbound Nscale data center build in Narvik"
                  width={1200}
                  height={1599}
                  className="w-full h-auto"
                />
                <figcaption className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5 leading-relaxed">
                  TIME cover, June 22, 2026
                  <Dot />
                  Nscale data center, Narvik, Norway
                  <Dot />© TIME
                </figcaption>
              </figure>

              <P className="mb-5">The same race. The opposite fuel.</P>
              <P className="mb-5">
                Norway&apos;s grid is about 17 grams of CO₂ per kilowatt-hour. Kazakhstan&apos;s - 604. The difference is more than thirty-fold. Narvik runs on hydropower, which Northern Norway has in surplus: about a gigawatt of &quot;trapped&quot; capacity that&apos;s hard to ship south. The cold there isn&apos;t a problem but an asset - chips run hot, and outside it&apos;s cool year-round, so cooling costs almost nothing. The campus is cooled by a direct liquid loop and fjord water - no evaporation, almost no water used. The steppe near Ekibastuz bakes to forty in summer, and the same engineering question is answered there with{" "}
                <Term tip="Towers that cool a plant by evaporating water: effective, but consumes a lot of water irreversibly - critical for the arid steppe.">
                  evaporative cooling towers
                </Term>{" "}
                - that is, with water, which a semi-arid land is already short of.
              </P>
              <P className="mb-5">
                And here the story closes into a ring. The gesture of mining hasn&apos;t changed for centuries: bite in, lift the rock, throw it in the furnace. First it mined coal. Then the same word - <em>mining</em> - named the minting of bitcoin. Now it &quot;mines&quot; intelligence the same way. Three kinds of mining - one pick. And the most telling part: Norway&apos;s Nscale grew literally out of bitcoin mining - it&apos;s a former cryptocurrency-mining company. Even the &quot;clean&quot; frontier came out of the same mine. The pick never went anywhere. Only the ore changed.
              </P>
              <P className="mb-5">
                The logic of choosing a site is one and the same. Cheap power. Spare capacity. Convenient geography. Norway didn&apos;t choose &quot;clean over dirty&quot; out of virtue - geology dealt it water and cold, as it dealt Kazakhstan coal and heat. And this is where the honest boundary of the argument runs: it&apos;s not about who&apos;s cleaner in spirit, but about what was at hand and what each chooses to build <em>on top</em>. Norway leans on hydro generation that already exists. Kazakhstan is building new coal. Kazakhstan couldn&apos;t have copied Norway&apos;s water anyway - it has no fjords, no great water. But the country had a clean path all the same, just a steppe one rather than a watery one: in wind and solar potential, Kazakhstan is among the world&apos;s leaders. Coal wasn&apos;t chosen because no clean alternative existed.
              </P>
              <P>
                And one detail breaks the convenient picture of &quot;expensive clean energy versus cheap dirty.&quot; Norwegian hydropower costs the data center 3–4 cents a kilowatt-hour; Kazakhstan&apos;s preferential tariff officials didn&apos;t name precisely, but by available estimates it&apos;s of the same order. So clean energy wasn&apos;t rejected for being expensive - it can be cheap too. Which means it was never about finding the cheapest power. It was about what that cheap power is made of.
              </P>

              <ChartSlot
                n={6}
                type="duel (two columns, 6 rows)"
                title="The same race, the opposite fuel"
                caption={
                  <>
                    Source: <Src href="https://www.nowtricity.com">Nowtricity/NVE</Src>
                    <Dot />
                    <Src href="https://ember-energy.org">Ember</Src>
                    <Dot />EU ETS
                    <Dot />KZ ETS
                    <Dot />
                    <Src href="https://www.nscale.com">Nscale</Src>
                    <Dot />
                    <Src href="https://primeminister.kz">primeminister.kz</Src>
                  </>
                }
              >
                <Grafik6 />
              </ChartSlot>

              <P className="mb-5">
                But honesty requires unfolding the Norwegian side too - otherwise it&apos;s a postcard, not a breakdown. Narvik is no paradise. DNV analysts warn: by 2030 all of Norway risks tipping into a power deficit - demand is growing many times faster than capacity is added. Data centers already compete for kilowatts with defense plants and with the electrification of oil platforms; in Northern Norway other industries are told flatly there&apos;s no capacity - &quot;the door is closed.&quot; And expanding clean generation runs into Indigenous rights: in the landmark &quot;Fosen case,&quot; Sámi reindeer herders went all the way to the Supreme Court, which in 2021 found that Europe&apos;s largest wind farms were built in violation of their rights - yet the turbines still run. And &quot;100% renewable&quot; in the contracts rests partly on{" "}
                <Term tip="Papers confirming that somewhere a renewable kilowatt-hour entered the grid. The buyer may call their consumption 'green', though the same shared electrons flow to them over the wires. An accounting tool, not a separate clean wire.">
                  &quot;guarantees of origin&quot;
                </Term>
                <Fn n={8} tip="Guarantees of Origin - papers confirming that somewhere a renewable kilowatt-hour entered the grid. The buyer may call their consumption 'green', though the same shared electrons flow to them over the wires. An accounting tool, not a separate clean line." />
                {" "}- accounting on paper, not a separate clean wire. Though in the Norwegian case, where the grid is already almost all hydro, that discrepancy changes almost nothing.
              </P>
              <P>
                And the contractor in Narvik is no paragon of respectability either. Nscale is a two-year-old startup; the Financial Times devoted a piece to it headlined &quot;borrowed authority,&quot; with questions about its debt load and dependence on a single client. The difference with Firebird isn&apos;t in breed: both are young and ambitious. The difference is that Nscale has an anchor client, Microsoft, with a contract that swelled by late 2025 to $14 billion, billions in closed financing, and a foundation poured back in November 2025. Firebird in Kazakhstan has a framework agreement and a term sheet, but no poured foundation and no named investor. That&apos;s the whole distance between &quot;under construction&quot; and &quot;announced.&quot;
              </P>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── Finale ─── */}
            <div className="mb-12">
              <H2>At the foot of the tallest chimney</H2>
              <P className="mb-5">Let&apos;s go back to Ekibastuz, to the chimney 419.7 metres tall.</P>
              <P className="mb-5">
                For almost forty years it was a monument to the industrial past. Now, at its base, they mean to build the future - racks of chips that can do what no one who raised that chimney could. The planet&apos;s newest silicon will feed on its oldest carbon. Nothing impossible - just a paradox, flat as the steppe: to step into the age of artificial intelligence, you&apos;ll have to burn coal. On TIME&apos;s cover, the future of AI was shot in the snow of a Norwegian fjord. In Ekibastuz it&apos;ll be shot in smoke.
              </P>
              <P className="mb-5">
                Add up what we know. A deal loudly announced at ten billion, under which, for now, sit a framework agreement and a term sheet - not confirmed money. A hundred thousand of the smartest chips - on coal with ash content near forty percent. A new coal plant - in a country that promised by law to zero out greenhouse emissions by 2060. And emitting a tonne of CO₂ costs a dollar here: pollution is barely paid for, and this machine has no brake - not by malice, but by design.
              </P>
              <P className="mb-5">
                I render no verdict - that&apos;s the reader&apos;s job. But one thing the numbers say too plainly to stay silent on: coal here isn&apos;t inevitability, it&apos;s a choice. Narvik proved it - the same campus is built on clean energy, and it&apos;s no costlier than dirty: a clean kilowatt there runs 3–4 cents. That&apos;s not what&apos;s expensive. What&apos;s expensive is what coal will be paid for in thirty years, when the new GRES is still smoking. So it&apos;s not about price - it&apos;s about the decision.
              </P>
              <P className="mb-5">
                And what remains is what&apos;s still unknown, and it decides everything: whether a real power contract is signed, whether the chip licenses are granted, how much water will go, whether GRES-3 will have carbon capture. Until there are answers, any loud verdict is faith, not knowledge.
              </P>
              <P>
                The pick hasn&apos;t changed in a century. Only the ore changed: coal, bitcoin, now - thought. I want Kazakhstan to mine thought. I&apos;m just not sure it has to burn rock to do it. Standing at the foot of the tallest chimney in the world, everyone decides for themselves what they&apos;re looking at: the flue of a departing era or the foundation of an arriving one. Maybe it&apos;s the same structure.
              </P>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── Methodology ─── */}
            <div className="mb-12">
              <p className="text-[13px] italic text-[var(--color-dim)] leading-[1.8] border-l-2 border-[var(--color-border)] pl-4">
                CO₂-emission, water-use, and national-generation-share calculations were made by the author on the basis of publicly verified industry norms (IEA, Ember, EESI) and the assumptions shown in the text. As of publication, the government of Kazakhstan and the participating companies had not published their own environmental assessments of the project. Deal figures are per official statements from primeminister.kz, Reuters, and Kursiv; international precedents per CSO Ireland, Dominion Energy, NAACP/SELC/Earthjustice, Climate Action Tracker; the Narvik/Ekibastuz comparison per TIME, Nscale, Statnett, DNV, Financial Times, and Nowtricity/NVE.
              </p>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── Sources ─── */}
            <div className="mb-12">
              <h2 className="text-[16px] font-bold tracking-tight text-[var(--color-text)] mb-2">Sources</h2>
              <p className="font-mono text-[11px] text-[var(--color-dim)]/70 italic mb-5 leading-relaxed">
                A consolidated list by topic. Granular direct links for each fact are in the two research dossiers behind this piece; below are the key primary sources, grouped by section.
              </p>
              <div className="font-mono text-[11px] text-[var(--color-dim)]/80 leading-relaxed space-y-4">
                <div>
                  <p className="text-[var(--color-dim)] mb-1">The deal (Section I)</p>
                  <ol className="list-decimal list-inside space-y-1 marker:text-[var(--color-border)]">
                    <li>Prime Minister of Kazakhstan - statement on signing the agreements with NVIDIA and Firebird, June 15, 2026 - <Src href="https://primeminister.kz">primeminister.kz</Src></li>
                    <li>Reuters / Kapital.kz - package structure ($10bn as total investment volume), the documents signed, Firebird&apos;s role - <Src href="https://www.reuters.com">reuters.com</Src>, <Src href="https://kapital.kz">kapital.kz</Src></li>
                    <li>Kursiv - the AI Ministry&apos;s answer on powering the &quot;Data Center Valley&quot; from GRES-1 and GRES-2 - <Src href="https://kz.kursiv.media">kursiv.media</Src></li>
                    <li>The Armenian Mirror-Spectator - Firebird profile, the Yerevan project - <Src href="https://mirrorspectator.com">mirrorspectator.com</Src></li>
                    <li>Bloomberg - export licensing of NVIDIA chips for Firebird&apos;s Armenia project - <Src href="https://www.bloomberg.com">bloomberg.com</Src></li>
                    <li>Stage breakdown - stage 1 ~$5bn (incl. ~$1bn Kazakhtelecom), 125 MW live in 2027; stage 2 ~$5bn (no dates); the parties&apos; roles - <Src href="https://thenextweb.com">The Next Web</Src>, <Src href="https://finance.yahoo.com">Bloomberg</Src>, <Src href="https://oilprice.com">oilprice.com</Src>, <Src href="https://eurasianet.org">eurasianet.org</Src></li>
                  </ol>
                </div>
                <div>
                  <p className="text-[var(--color-dim)] mb-1">Power and coal (Section II)</p>
                  <ol className="list-decimal list-inside space-y-1 marker:text-[var(--color-border)]" start={7}>
                    <li>Ember - carbon intensity of Kazakhstan&apos;s grid (~604 g CO₂/kWh), 2025 - <Src href="https://ember-energy.org">ember-energy.org</Src></li>
                    <li>IEA - global average carbon intensities - <Src href="https://www.iea.org">iea.org</Src></li>
                    <li>Interfax-Kazakhstan / Samruk-Energy - capacities of GRES-1, GRES-2, units 3–4, the GRES-3 project (2.64 GW) - <Src href="https://www.samruk-energy.kz">samruk-energy.kz</Src></li>
                    <li>Kursiv + the national emissions-quota plan - GRES-1 and GRES-2 among the largest emitters - <Src href="https://adilet.zan.kz/rus/docs/P2100000006">adilet.zan.kz</Src></li>
                    <li>List of tallest chimneys - the GRES-2 chimney (419.7 m) as the world&apos;s tallest - <Src href="https://en.wikipedia.org/wiki/List_of_tallest_chimneys">en.wikipedia.org</Src></li>
                  </ol>
                </div>
                <div>
                  <p className="text-[var(--color-dim)] mb-1">Climate and the price of carbon (Section III)</p>
                  <ol className="list-decimal list-inside space-y-1 marker:text-[var(--color-border)]" start={12}>
                    <li>Climate Action Tracker - Kazakhstan rating (&quot;Insufficient&quot;), emissions-growth forecast - <Src href="https://climateactiontracker.org/countries/kazakhstan">climateactiontracker.org</Src></li>
                    <li>The Astana Times - price of a CO₂ tonne in Kazakhstan&apos;s ETS (~$1) - <Src href="https://astanatimes.com">astanatimes.com</Src></li>
                    <li>AIFC / IEEFA - trading suspended since 2022, free allocation of quotas</li>
                    <li>UNDP / NDC Kazakhstan - the 2035 reduction target, the 2060 carbon-neutrality law</li>
                    <li>EU ETS - EU allowance price (~€70/t) - <Src href="https://tradingeconomics.com/commodity/carbon">tradingeconomics.com</Src></li>
                    <li>EESI - data-center energy- and water-use norms - <Src href="https://www.eesi.org">eesi.org</Src></li>
                    <li>US EPA - emissions of an average passenger car (~4.6 t CO₂/yr) - <Src href="https://www.epa.gov">epa.gov</Src></li>
                  </ol>
                </div>
                <div>
                  <p className="text-[var(--color-dim)] mb-1">Precedents (Section IV)</p>
                  <ol className="list-decimal list-inside space-y-1 marker:text-[var(--color-border)]" start={19}>
                    <li>NAACP / Southern Environmental Law Center / Earthjustice - the suit against xAI Colossus (Memphis), April 2026 - <Src href="https://www.selc.org">selc.org</Src>, <Src href="https://earthjustice.org">earthjustice.org</Src></li>
                    <li>Reuters / Associated Press - US Department of Justice intervention, June 2026</li>
                    <li>Piedmont Environmental Council (on Dominion IRP-2025) - grid capex $28.3bn; SCC - new data-center tariff from 2027; NERC / Reuters - the ~1,500 MW drop on July 10, 2024 - <Src href="https://www.pecva.org">pecva.org</Src></li>
                    <li>Central Statistics Office Ireland - data-center share of electricity use (22%, 2024) - <Src href="https://www.cso.ie">cso.ie</Src></li>
                    <li>EirGrid / CRU - moratorium on data-center connections around Dublin</li>
                  </ol>
                </div>
                <div>
                  <p className="text-[var(--color-dim)] mb-1">Narvik and Norway (Section VI)</p>
                  <ol className="list-decimal list-inside space-y-1 marker:text-[var(--color-border)]" start={24}>
                    <li>TIME, Billy Perrigo - &quot;The AI Frontier,&quot; reporting from Narvik - <Src href="https://time.com/article/2026/06/03/ai-norway-nscale-data-center/">time.com</Src></li>
                    <li>Nscale - project parameters, the Aker partnership and the Microsoft contract - <Src href="https://www.nscale.com">nscale.com</Src></li>
                    <li>Statnett - capacity reserve and the Northern Norway grid - <Src href="https://www.statnett.no">statnett.no</Src></li>
                    <li>DNV, Energy Transition Outlook Norway 2025 - deficit from the early 2030s - <Src href="https://www.dnv.com/news/2025">dnv.com</Src></li>
                    <li>Financial Times - Nscale analysis, &quot;borrowed authority,&quot; debt load - <Src href="https://www.ft.com">ft.com</Src></li>
                    <li>Nowtricity / NVE - carbon intensity of Norway&apos;s grid (~17 g CO₂/kWh) - <Src href="https://www.nowtricity.com">nowtricity.com</Src></li>
                  </ol>
                </div>
              </div>
            </div>

            <hr className="border-[var(--color-border)] mb-12" />

            {/* ─── Footnotes ─── */}
            <div className="mb-12">
              <h2 className="text-[16px] font-bold tracking-tight text-[var(--color-text)] mb-4">Footnotes: term explanations</h2>
              <ol className="font-mono text-[12px] text-[var(--color-dim)] leading-[1.7] space-y-3">
                <li id="fn-1"><span className="text-[var(--color-text)]">1. Term sheet</span> - a document of preliminary deal terms. It records intent and key parameters but doesn&apos;t itself obligate anyone to build and doesn&apos;t guarantee money; real obligations come later, in full contracts.</li>
                <li id="fn-2"><span className="text-[var(--color-text)]">2. Carbon intensity</span> - how many grams of CO₂ are emitted per kilowatt-hour of electricity generated. The dirtier the fuel (coal is dirtiest), the higher the number.</li>
                <li id="fn-3"><span className="text-[var(--color-text)]">3. Ultra-supercritical units</span> - coal units running on steam at very high temperature and pressure. Efficiency is higher and less fuel is burned per unit of power, so emissions are somewhat lower - but it&apos;s still coal.</li>
                <li id="fn-4"><span className="text-[var(--color-text)]">4. Carbon capture (CCS)</span> - technology that &quot;catches&quot; CO₂ at the plant&apos;s exhaust and pumps it underground instead of releasing it. Expensive and not yet used in Kazakhstan; without it, &quot;clean coal&quot; stays coal.</li>
                <li id="fn-5"><span className="text-[var(--color-text)]">5. PUE</span> - how many times more energy a data center uses than goes to the computing itself. PUE 1.2 means: for every &quot;useful&quot; kilowatt, another 200 watts for cooling and infrastructure. The closer to 1.0, the more efficient.</li>
                <li id="fn-6"><span className="text-[var(--color-text)]">6. Emissions-trading system (ETS)</span> - a market where you must pay for the right to emit a tonne of CO₂. The idea is to make pollution expensive so cleaner options win. In the EU a tonne costs dozens of euros; in Kazakhstan about a dollar, and even that effectively doesn&apos;t work.</li>
                <li id="fn-7"><span className="text-[var(--color-text)]">7. NDC</span> - &quot;Nationally Determined Contribution&quot;: a country&apos;s official Paris-Agreement pledge for how much it will cut emissions by a given year.</li>
                <li id="fn-8"><span className="text-[var(--color-text)]">8. Guarantees of Origin</span> - papers confirming that somewhere a renewable kilowatt-hour entered the grid. The buyer may call their consumption &quot;green,&quot; though the same shared electrons flow to them over the wires. An accounting tool, not a separate clean line.</li>
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
        <AuthorBlock variant="horizontal" locale="en" />
        <SiteFooter locale="en" />
      </div>
    </div>
  );
}
