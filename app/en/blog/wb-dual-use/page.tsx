import { ArticleHeader } from "@/components/canon/article-header";
import { ArticleLayout } from "@/components/canon/article-layout";
import { Grafik1, Grafik2, Grafik3, SupplyCallout } from "@/components/charts/wb-dual-use-en";
import { BulatEvidence, CableComparison, ProductCardGallery } from "@/components/canon/wb-evidence";
import { Term } from "@/components/canon/term";
import { Cite, SourcesList } from "@/components/canon/wb-sources";

function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[15px] leading-[1.8] text-[var(--color-dim)] ${className}`}>{children}</p>;
}

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return <h2 id={id} className="mb-6 text-[20px] font-normal tracking-tight text-[var(--color-text)]">{children}</h2>;
}

function H3({ children, id }: { children: React.ReactNode; id?: string }) {
  return <h3 id={id} className="mb-5 text-[17px] font-normal tracking-tight text-[var(--color-text)]">{children}</h3>;
}

const ARTICLE_TITLE = "Why Wildberries Warehouses Came Under Attack: What I Found Across 7,547 Categories";
const ARTICLE_DECK =
  "After the attacks on Wildberries logistics centers in Elektrostal and Kotovsk, I downloaded MPStats data covering 7,547 categories. It included an estimated 246 million rubles in monthly sales value for body armor, drone detectors filed under calibration instruments, and 10-kilometer fiber-optic reels marketed for FPV drones. This helps explain the marketplace’s role in distributed supply—but does not show that any of those products were stored at the two sites that were attacked.";

export default function WbDualUseEnArticle() {
  return (
    <ArticleLayout
      slug="wb-dual-use"
      locale="en"
      header={
        <ArticleHeader
          kicker="Analysis"
          title={ARTICLE_TITLE}
          subtitle={ARTICLE_DECK}
          slug="wb-dual-use"
          date="Jul 22, 2026"
          readMin={15}
          hero={{
            src: "/blog/wb-dual-use/cover.webp",
            alt: "Open Wildberries box with a portable electronic device, protective plate, first-aid kit, optical cable, and ordinary goods",
            credit: "Illustration: Almas Kasymzhanov",
            width: 5792,
            height: 4344,
          }}
          locale="en"
        />
      }
    >
      <section className="mb-12">
        <H2>Why I Started Counting</H2>
        <P className="mb-5">
          After drone strikes hit Wildberries warehouses on July 18, I kept seeing the same question: why would anyone attack an online store’s warehouse? It’s not a military base. It’s clothes, appliances, kids’ stuff, and people picking orders.
        </P>
        <P className="mb-5">
          The question is fair—especially after reports of deaths and injuries. In Kotovsk, according to regional authorities as of July 18, seven night-shift workers were killed and 25 were injured<Cite n={1} locale="en" />. In Elektrostal, <a href="https://meduza.io/news/2026/07/18/ukrainskie-drony-atakovali-sklady-wildberries-v-dvuh-regionah-rossii-v-tambovskoy-oblasti-pogibli-sem-sotrudnikov-kompanii" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">Meduza initially reported 24 people injured</a> on the warehouse grounds itself<Cite n={2} locale="en" />. By 12:47 PM Moscow time, the Moscow region governor reported <a href="https://istories.media/news/2026/07/18/vsu-udarili-po-skladam-wilberries-pod-tambovom-i-moskvoi-pogibli-7-chelovek/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">one local resident killed and 37 injured in the region</a> after the attack<Cite n={3} locale="en" />; from public updates, it was unclear how many of those 37 were actually inside the warehouse. A later Associated Press update put the regional total at 61 injured, without specifying how many were at the warehouse. <a href="https://t.me/rwb_press_service/1619" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">RWB confirmed the attack on both facilities</a><Cite n={4} locale="en" />, and the <a href="https://apnews.com/article/c2d0d713643288b81dbbea714d5db5ac" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">Associated Press compiled a summary of events</a><Cite n={5} locale="en" />.
        </P>
        <P className="mb-5">
          By July 19, <a href="https://t.me/kimtatyana2024/777" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">the company announced</a> that families of the deceased would receive 2 million rubles each, and those in serious condition would receive 1 million<Cite n={6} locale="en" />. RWB also said the volume of payouts to sellers was still being determined and <a href="https://t.me/kimtatyana2024/778" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">damage assessment could take up to 30 days</a><Cite n={7} locale="en" />; separately, <a href="https://t.me/rwb_press_service/1626" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">WB Bank offered affected sellers</a> debt deferrals, concessional loans, and other measures<Cite n={8} locale="en" />. These are announced support measures, not confirmation of completed payments.
        </P>
        <P className="mb-5">
          The Ukrainian side called the complexes major logistics facilities and <a href="https://ru.interfax.com.ua/news/general/1186123.html" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">stated</a> that sanctioned components for drone and navigation-equipment production were supplied through them<Cite n={9} locale="en" />. Public invoices, address-specific stock records, or independent inventories of the warehouses’ contents were not presented.
        </P>
        <P>
          I cannot inspect a warehouse without access to its internal system. But I can check a narrower question: what kinds of goods pass through the Wildberries storefront, in what volumes they sell, and how their logistics are arranged.
        </P>

        <section className="my-8 border-l-2 border-[var(--viz-wb)] pl-5" aria-labelledby="update-july-20-heading">
          <H3 id="update-july-20-heading">Update: July 20</H3>
          <P>
            While this article was being prepared, the Moscow region came under another mass drone attack. <a href="https://t.me/mos_sobyanin/20878" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">Sergei Sobyanin reported</a> more than 400 drones heading toward the region and 85 destroyed on approach to Moscow<Cite n={22} locale="en" />, while the <a href="https://t.me/s/mod_russia/54841" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">Ministry of Defense reported</a> 23 drones destroyed<Cite n={23} locale="en" />; the estimates do not match, so there is no single official figure.
          </P>
          <P className="mt-5">
            At 9:44 AM Moscow time, <a href="https://t.me/vorobiev_live/12113" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">the governor clarified</a> that ten people were injured, including a child<Cite n={24} locale="en" />. Fires and damage were reported in Podolsk, Domodedovo, and the Odintsovsky district; <a href="https://t.me/khrustaleva_domodedovo/7736" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">the head of Domodedovo confirmed</a> a fire at the “Yuzhnye Vorota” industrial park<Cite n={25} locale="en" />.
          </P>
          <P className="mt-5">
            In the first hours, social media claimed that a Wildberries warehouse was on fire again—this time in Koledino. The company denied this: people were evacuated for safety, but the complex itself was not damaged and later resumed normal operations, <a href="https://www.reuters.com/business/aerospace-defense/russia-says-ukraine-launched-400-drones-moscow-region-two-wounded-buildings-set-2026-07-20/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">according to RWB and Reuters</a><Cite n={26} locale="en" />.
          </P>
          <P className="mt-5">
            For this article, the difference matters: on July 18, RWB itself confirmed the attack and a major fire at the Elektrostal complex. On July 20, another major Wildberries facility had to be evacuated, but there is no basis to claim it was attacked or that it was on fire.
          </P>
        </section>
      </section>

      <section className="mb-12">
        <H2>How a Marketplace Enters Wartime Supply Chains</H2>
        <P className="mb-5">
          The first answer came before I downloaded a single row. Wildberries is used not only for ordinary shopping. The same storefront and pickup points are used to order items for the military.
        </P>
        <P className="mb-5">
          In 2023, the Belgorod publication <em>Fonar</em> <a href="https://fonar.tv/article/2023/03/06/plechom-k-plechu-kak-v-belgorodskoy-oblasti-pomogayut-voennym-i-bezhencam" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">described a scheme</a>: volunteers created lists of goods on Ozon and Wildberries, donors paid for orders delivered to a designated pickup point, and organizers then collected the purchases and claimed they passed them to the military<Cite n={10} locale="en" />.
        </P>
        <P className="mb-5">
          There is also a more specific example. A public channel dedicated to the 810th Marine Brigade published a <a href="https://t.me/morpeh_810/9404" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">list of needed items</a>: an electronic warfare system, ten “Bulat v.4” drone detectors, DJI Mavic 3T drones, night-vision devices, generators, camouflage netting, and tools. The same post included links to Wildberries and Ozon products and offered to place an order through a pickup point<Cite n={11} locale="en" />. It also included a monetary fundraiser, but I do not use its details or amount in the analysis.
        </P>
        <P className="mb-5">
          Both sources confirm only a publicly proposed scheme for donating goods through marketplaces. They cannot verify the total amount of aid, the identities of all donors, the purchase and delivery of each item, or its combat use. They also do not show which warehouse a particular order passed through. Between “the item exists on the site” and “the item was in Elektrostal or Kotovsk” there are several missing links.
        </P>
        <P className="mb-5">
          This is where the question splits in two. Data can explain why a large civilian logistics network enters wartime supply chains. But it does not automatically answer whether a specific warehouse was a military target.
        </P>
        <P>
          Under <a href="https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-52" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">Article 52 of Additional Protocol I to the Geneva Conventions</a>, military objectives are limited to objects which by their nature, location, purpose, or use make an effective contribution to military action and whose total or partial destruction, capture, or neutralization, in the circumstances ruling at the time, offers a definite military advantage. In case of doubt as to whether an object normally dedicated to civilian purposes is being used to make an effective contribution to military action, it is presumed not to be so used<Cite n={12} locale="en" />.
        </P>
      </section>

      <section className="mb-12">
        <H2>What I Measured and How</H2>
        <P className="mb-5">
          I pulled all 7,547 Wildberries categories through the API of <a href="https://mpstats.io/integrations/docs/description/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">MPStats</a>, an external analytics service<Cite n={13} locale="en" />. The main window covers 30 days—June 18 to July 17, 2026—ending the day before the attack.
        </P>
        <P className="mb-5">
          Then I selected 18 categories related to protection, camouflage, drones, surveillance, and field supply. For some of them, I pulled twelve previous 30-day windows at roughly monthly intervals. Finally, I manually checked seven product listings and saved available screenshots, images, prices, categories, and stock data.
        </P>
        <P className="mb-5">Four caveats matter here.</P>
        <ul className="mb-5 list-disc space-y-3 pl-5 text-[15px] leading-[1.8] text-[var(--color-dim)] marker:text-[var(--color-border)]">
          <li>MPStats is an external service, not Wildberries’ internal reporting. So all sums below are estimates of sales value in retail prices, not the marketplace’s own revenue.</li>
          <li>These are sales across Russia. The download does not reveal the location of individual inventory.</li>
          <li>A category may include both specialized and ordinary civilian goods. A thermal imager, for example, is needed by soldiers, hunters, rescuers, and builders.</li>
          <li>Some niches overlap. So I do not add generators, first-aid kits, two-way radios, and body-armor vests into one neat number called “Wildberries’ military market.” The data does not support such a total.</li>
        </ul>
      </section>

      <section className="mb-12">
        <H2>The Biggest Specialized Categories</H2>
        <P className="mb-5">
          The largest categories I selected generated nearly the same estimated sales value.
        </P>
        <Grafik1 />
        <P className="mb-5">
          Body armor and camouflage suits produced almost identical estimated sales value, but had very different sales profiles. Estimated sales of suits were roughly four times higher, yet the sales value per estimated sale of body armor was more than four times higher.
        </P>
        <P className="mb-5">
          Night-vision devices and thermal imagers had almost identical sales value per estimated sale—around 26–27 thousand rubles. Drone detectors are much smaller in total sales value but higher by this metric: around 47 thousand rubles per estimated sale.
        </P>
        <P className="mb-5">
          There is an even larger layer of dual-use goods. Generators produced 1.92 billion rubles in estimated sales value over the same period, two-way radios 526.5 million, rangefinders 520.8 million. These figures help put the civilian market in perspective, but they cannot be presented as military procurement. I do not know what share of generators went to construction sites, country homes, shops, or military units.
        </P>
      </section>

      <section className="mb-12">
        <H2>The Long View and the Short View</H2>
        <P className="mb-5">
          The long view is uneven. I compared the average of the first three historical windows with the average of the last three windows, excluding the additional overlapping window ending July 17.
        </P>
        <P className="mb-5">
          Camouflage netting’s estimated sales value in the last three windows was 3.5 times that of the first three. The corresponding multiples were 1.7 for body armor and 1.3 for camouflage suits. By contrast, estimated sales value for load-bearing vests fell to 42% of its early-window level, and quadcopter accessories to 86%.
        </P>
        <P className="mb-5">
          This does not mean sales grew every month. Body armor, for example, peaked in November 2025 at 624 million rubles in 30 days, then declined. The data does not show the reason for the peak.
        </P>
        <P className="mb-5">
          The final month presents a different picture. I compared two adjacent, non-overlapping windows: May 19–June 17 and June 18–July 17. Of the 18 selected categories, two grew, one barely changed, and 15 declined.
        </P>
        <P className="mb-5">
          Generators rose 18.7%, scopes 9.2%, protective helmets fell 0.4%. The biggest drops were drone detectors at -48.4%, hemostatic tourniquets at -46.3%, field rations at -43.7%, tactical belts at -43.6%, camouflage netting at -40.8%. Body armor fell 14.8%.
        </P>
        <P className="mb-5">
          One month cannot establish the cause. It could be seasonality, price changes, supply, demand, or the estimation model itself. But this window breaks the too-convenient story that the entire segment is growing continuously.
        </P>
        <Grafik2 />
      </section>

      <section className="mb-12">
        <H2>More Sellers, Less Money</H2>
        <P className="mb-5">
          The most interesting anomaly appeared not in sales value, but in supply.
        </P>
        <P className="mb-5">
          Over the last month, estimated sales value of body armor fell 14.8%. At the same time, the number of listings in the sample rose 48.9%, and sellers rose 22.9%. For drone detectors, sales value fell 48.4%, but listings rose 14.6% and sellers 13.4%. In quadcopter accessories, sales value fell 11.5% while listings rose 12.4%.
        </P>
        <P className="mb-5">
          From the aggregated download, I cannot tell exactly what happened. New sellers may have entered the platform. Existing sellers may have created additional listings. MPStats or Wildberries may have reclassified goods. So I do not call this an influx of sellers—I only record what is visible in the two windows.
        </P>
        <P className="mb-5">
          In other words, supply expanded while estimated sales value contracted.
        </P>
        <P className="mb-5">
          At the same time, a bigger storefront does not mean bigger demand. In the broad category of quadcopter accessories, there were 98,464 listings, but estimated sales over 30 days were recorded for only 5,093—just 5.2%.
        </P>
        <Grafik3 />
        <SupplyCallout />
      </section>

      <section className="mb-12">
        <H2>The Drone Detector in the Wrong Aisle</H2>
        <P className="mb-5">
          Category analysis quickly hit the limits of the Wildberries classifier.
        </P>
        <P className="mb-5">
          I opened the listing for <a href="https://www.wildberries.ru/catalog/949889001/detail.aspx" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">“Bulat v.4”</a>—a drone detector priced at 132,060 rubles<Cite n={14} locale="en" />. The product name clearly states its purpose. But in Wildberries’ public metadata, it is classified not under drone detectors, but under “Electrical / Calibration instruments”; in the interface, the visible path leads through “For repair / Microelectronics / Measuring instruments.”
        </P>
        <P className="mb-5">
          Because of this, the sales value of the “Drone detectors” category—those same 10.7 million rubles—does not describe the entire market for such devices on the platform. At least part of the supply lies in other sections and is not captured by the direct filter.
        </P>
        <BulatEvidence locale="en" />
        <P className="mb-5">
          The classification problem goes further. A 10-kilometer fiber-optic reel explicitly labeled for FPV drones sits among quadcopters or quadcopter accessories. A first-aid kit with the words “tactical,” “military,” and “SVO” in the name sits among medicine-storage kits. A body-armor vest sits in sports goods.
        </P>
        <P className="mb-5">
          As a result, one type of product ends up distributed across several unrelated sections, and a direct category filter does not cover it.
        </P>
        <P>
          So counting only by the names of selected categories will likely undercount the market. But the reverse method—treating an entire category as military based on a handful of listings—would overstate it. A defensible estimate requires manual review, not just a table filter.
        </P>
      </section>

      <section className="mb-12">
        <H2>What the Listings Show</H2>
        <P className="mb-5">
          I saved screenshots of specific listings on July 18. They do not reveal the buyer. But they show how closely specialized and ordinary items sit side by side on the same civilian platform.
        </P>
        <ul className="mb-5 list-disc space-y-3 pl-5 text-[15px] leading-[1.8] text-[var(--color-dim)] marker:text-[var(--color-border)]">
          <li>
            <a href="https://www.wildberries.ru/catalog/949889001/detail.aspx" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">“Bulat v.4”</a> at 132,060 rubles. An openly sold drone detector. I did not independently verify its claimed range or performance<Cite n={14} locale="en" />.
          </li>
          <li>
            <a href="https://www.wildberries.ru/catalog/879755591/detail.aspx" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">Body-armor vest</a> at 17,098 rubles. The seller claims two plates and protection class <Term tip="Br5: seller-stated protection class; the listing screenshot does not confirm certification or real ballistic resistance.">Br5</Term>. The screenshot confirms only this claim, not real ballistic resistance or certification<Cite n={15} locale="en" />.
          </li>
          <li>
            <a href="https://www.wildberries.ru/catalog/447850828/detail.aspx" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">10 km fiber-optic reel for drones</a> at 22,705 rubles. The seller’s images show a specialized product for FPV and its connection to the drone’s onboard electronics<Cite n={16} locale="en" />.
          </li>
          <li>
            <a href="https://www.wildberries.ru/catalog/230725243/detail.aspx" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">First-aid kit</a> at 6,249 rubles without the WB Wallet discount, with the words “tactical,” “military,” and “SVO” in the name. Its medical contents can also be used outside the army<Cite n={17} locale="en" />.
          </li>
          <li>
            <a href="https://www.wildberries.ru/catalog/972102728/detail.aspx" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">Optical cable for internet</a> at 13,212 rubles without the WB Wallet discount. According to the seller’s description, this is a civilian kilometer-long cable for building internet connections, with two optical fibers, a low-smoke, low-emission sheath, and fiberglass strength members<Cite n={18} locale="en" />.
          </li>
        </ul>
        <ProductCardGallery locale="en" />
        <P className="mb-5">
          The two fiber-optic products are especially telling. The civilian cable and specialized FPV reels use fiber from the <Term tip="G.657: family of bend-insensitive single-mode optical fiber for telecommunications networks.">G.657</Term> family. But they are not the same product under different names. The <a href="https://www.itu.int/epublications/publication/itu-t-g-657-2024-08-characteristics-of-a-bending-loss-insensitive-single-mode-optical-fibre-and-cable" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">ITU’s G.657 recommendation</a> describes a civilian telecommunications standard for bend-insensitive single-mode fiber<Cite n={19} locale="en" />. The FPV product differs in length, weight, reel construction, unwinding mechanism, and connection to the drone’s electronics.
        </P>
        <CableComparison locale="en" />
        <P className="mb-5">
          A physical control line helps bypass ordinary radio-frequency jamming and signal spoofing. But the marketing claim “absolute protection from EW” is false: the fiber can break or snag, and the drone itself can be detected and engaged. These limitations are described by the <a href="https://www.army.mil/article-amp/287737/fiber_optic_drones_posing_a_significant_c_uas_challenge" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">US Army</a> and <a href="https://www.act.nato.int/article/innovation-challenge-fibre-optic-drones/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">NATO ACT</a><Cite n={20} locale="en" /><Cite n={21} locale="en" />.
        </P>
        <P>
          Therefore, sharing a basic technology does not by itself make the finished product military: purpose is determined by the design of the finished item and how it is used.
        </P>
      </section>

      <section className="mb-12">
        <H2>Storefront vs. Warehouse</H2>
        <P className="mb-5">
          Wildberries runs on two fundamentally different models. In one, goods are stored in the platform’s warehouse. In the other, they remain with the seller, and Wildberries connects to delivery after the order.
        </P>
        <P className="mb-5">
          I compared estimated sales value under these models. In specialized electronics, the share of estimated sales value going through the Wildberries warehouse model was small: 1.7% for thermal imagers, 4.1% for quadcopter batteries, 13.4% for night-vision devices, 14.8% for quadcopter accessories, and 16.8% for drone detectors.
        </P>
        <P className="mb-5">
          This does not mean such goods were not in Wildberries warehouses. The share is not zero. But most of the estimated sales value in these categories came from the model where the seller held the goods. And even the “WB warehouse” label does not reveal which specific complex a box was in.
        </P>
        <P>
          There is one more public fact about Elektrostal. According to <a href="https://datacenters.wb.ru/en/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)]    transition-colors">Wildberries’ own data</a>, inside one of its largest distribution centers is a 4 MW data center: three IT modules, 7,000 servers, and 280 racks<Cite n={26} locale="en" />. I found no confirmation that the data center was damaged, was a separate target, or was used for military tasks. This fact only shows the scale of the facility: it is not just a hangar with goods, but part of the company’s physical and digital infrastructure.
        </P>
      </section>

      <section className="mb-12">
        <H2>What the Data Can and Cannot Say</H2>
        <P className="mb-5">
          Now I can answer the question I started with more precisely.
        </P>
        <P className="mb-5">
          Wildberries remains a civilian marketplace. But inside this enormous system there is a measurable layer of body armor, camouflage, surveillance devices, drone detectors, and specialized FPV components. Public fundraisers show that the same storefront and the same pickup points are used to supply the military.
        </P>
        <P className="mb-5">
          This is why civilian e-commerce infrastructure becomes part of wartime supply chains: it has become a convenient distributed channel through which you can buy and hand over almost anything—from a generator and a first-aid kit to a night-vision device.
        </P>
        <P className="mb-5">
          But it does not follow that any Wildberries warehouse automatically becomes a military target. My download does not show what was in Elektrostal or Kotovsk on the night of July 18. It does not identify end buyers. It does not replace invoices, address-specific stock records, intelligence, or a legal assessment of a specific strike.
        </P>
        <P>
          The data helps explain why an attacking side might regard a major logistics hub as militarily significant. It does not establish that any particular facility qualified as a military objective.
        </P>
      </section>

      <section id="methodology" className="reading-panel reading-methodology mb-12 scroll-mt-20">
        <H2>Methodology and Data Sources</H2>
        <P className="mb-4">
          Main download: MPStats, 7,547 Wildberries categories, window June 18–July 17, 2026, all shipping models. Raw CSV saved in the author’s research archive.
        </P>
        <P className="mb-4">
          Pre-attack comparison: two adjacent 30-day windows ending June 17 and July 17, 2026.
        </P>
        <P className="mb-4">
          Long-term dynamics: 12 samples at roughly monthly intervals; the additional sample to July 17 is shown separately because it overlaps with the previous window.
        </P>
        <P className="mb-4">
          Product listings captured July 18, 2026; prices on the marketplace change. For the first-aid kit and civilian cable, the text states the price without the WB Wallet discount.
        </P>
        <P className="mb-4">
          MPStats is a third-party analytics service. All sales and sales value metrics are estimates and do not represent Wildberries’ internal reporting.
        </P>
      </section>

      <SourcesList locale="en" />
    </ArticleLayout>
  );
}
