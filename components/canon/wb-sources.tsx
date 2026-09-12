"use client";

import { Fn } from "@/components/canon/term";
import { type Locale } from "@/lib/i18n";

type SourceLink = {
  label: string;
  href: string;
};

type SourceReference = {
  n: number;
  publication: string;
  date: string;
  claim: string;
  links: readonly SourceLink[];
};

const RU_SOURCES: readonly SourceReference[] = [
  {
    n: 1,
    publication: "Российская газета",
    date: "18.07.2026",
    claim: "Данные региональных властей о семи погибших и 25 раненых в Котовске.",
    links: [{ label: "Материал «Российской газеты»", href: "https://rg.ru/2026/07/18/reg-cfo/posle-naleta-dronov-s-porazhaiushchimi-elementami-na-sklade-wb-nachalsia-pozhar.html" }],
  },
  {
    n: 2,
    publication: "Meduza",
    date: "18.07.2026",
    claim: "Первоначальное сообщение о 24 пострадавших на территории комплекса в Электростали.",
    links: [{ label: "Материал Meduza", href: "https://meduza.io/news/2026/07/18/ukrainskie-drony-atakovali-sklady-wildberries-v-dvuh-regionah-rossii-v-tambovskoy-oblasti-pogibli-sem-sotrudnikov-kompanii" }],
  },
  {
    n: 3,
    publication: "РБК",
    date: "18.07.2026",
    claim: "Вечерняя сводка губернатора: 57 пострадавших в Электростали, четыре в Ногинске и один погибший.",
    links: [{ label: "Материал РБК", href: "https://amp.rbc.ru/rbcnews/politics/18/07/2026/6a5baf919a79476912a7ba85" }],
  },
  {
    n: 4,
    publication: "RWB",
    date: "18.07.2026",
    claim: "Подтверждение атаки комплексов в Котовске и Электростали.",
    links: [{ label: "Сообщение RWB", href: "https://t.me/rwb_press_service/1619" }],
  },
  {
    n: 5,
    publication: "Associated Press",
    date: "18.07.2026",
    claim: "Сводный международный обзор событий 18 июля.",
    links: [{ label: "Материал AP", href: "https://apnews.com/article/c2d0d713643288b81dbbea714d5db5ac" }],
  },
  {
    n: 6,
    publication: "Татьяна Ким",
    date: "18.07.2026",
    claim: "Объявленные размеры поддержки семьям погибших и тяжело пострадавшим.",
    links: [{ label: "Публичное сообщение", href: "https://t.me/kimtatyana2024/777" }],
  },
  {
    n: 7,
    publication: "Татьяна Ким",
    date: "18.07.2026",
    claim: "Заявление об оценке потерь продавцов и первых логистических льготах.",
    links: [{ label: "Публичное сообщение", href: "https://t.me/kimtatyana2024/778" }],
  },
  {
    n: 8,
    publication: "RWB",
    date: "19.07.2026",
    claim: "Объявленные WB Банком меры поддержки пострадавших продавцов.",
    links: [{ label: "Сообщение RWB", href: "https://t.me/rwb_press_service/1626" }],
  },
  {
    n: 9,
    publication: "Интерфакс-Украина",
    date: "18.07.2026",
    claim: "Заявление украинской стороны о назначении поражённых объектов.",
    links: [{ label: "Материал Интерфакс-Украина", href: "https://ru.interfax.com.ua/news/general/1186123.html" }],
  },
  {
    n: 10,
    publication: "Фонарь",
    date: "06.03.2023",
    claim: "Описание волонтёрских списков WB/Ozon и доставки заказов в указанный ПВЗ.",
    links: [{ label: "Материал «Фонаря»", href: "https://fonar.tv/article/2023/03/06/plechom-k-plechu-kak-v-belgorodskoy-oblasti-pomogayut-voennym-i-bezhencam" }],
  },
  {
    n: 11,
    publication: "Морпехи Севастополя",
    date: "проверено 19.07.2026",
    claim: "Публично предложенный список товаров и заказ через ПВЗ для 810-й бригады.",
    links: [{ label: "Точный Telegram-пост", href: "https://t.me/morpeh_810/9404" }],
  },
  {
    n: 12,
    publication: "ICRC",
    date: "08.06.1977",
    claim: "Статья 52: тест военной цели и презумпция гражданского назначения при сомнении.",
    links: [{ label: "Дополнительный протокол I, статья 52", href: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-52" }],
  },
  {
    n: 13,
    publication: "MPStats",
    date: "проверено 20.07.2026",
    claim: "Публичная документация внешнего сервиса и методика расчётов, ограничений и периодов в этой статье.",
    links: [
      { label: "Документация MPStats", href: "https://mpstats.io/integrations/docs/description/" },
      { label: "Методика статьи", href: "#methodology" },
    ],
  },
  {
    n: 14,
    publication: "Wildberries",
    date: "18-19.07.2026",
    claim: "Карточка детектора «Булат v.4» и отдельный публичный файл метаданных классификатора.",
    links: [
      { label: "Карточка, артикул 949889001", href: "https://www.wildberries.ru/catalog/949889001/detail.aspx" },
      { label: "Публичные метаданные карточки", href: "https://basket-40.wbbasket.ru/vol9498/part949889/949889001/info/ru/card.json" },
    ],
  },
  {
    n: 15,
    publication: "Wildberries",
    date: "18.07.2026",
    claim: "Карточка бронежилета и заявления продавца о комплектации.",
    links: [{ label: "Карточка, артикул 879755591", href: "https://www.wildberries.ru/catalog/879755591/detail.aspx" }],
  },
  {
    n: 16,
    publication: "Wildberries",
    date: "18.07.2026",
    claim: "Карточка катушки, артикул 447850828, с заявленным назначением для дрона и отдельная проверенная карточка, артикул 971841998, со схемами подключения.",
    links: [
      { label: "Катушка, артикул 447850828", href: "https://www.wildberries.ru/catalog/447850828/detail.aspx" },
      { label: "Схемы подключения, артикул 971841998", href: "https://www.wildberries.ru/catalog/971841998/detail.aspx" },
    ],
  },
  {
    n: 17,
    publication: "Wildberries",
    date: "18.07.2026",
    claim: "Карточка аптечки с военной маркировкой.",
    links: [{ label: "Карточка, артикул 230725243", href: "https://www.wildberries.ru/catalog/230725243/detail.aspx" }],
  },
  {
    n: 18,
    publication: "Wildberries",
    date: "18.07.2026",
    claim: "Карточка гражданского километрового оптического кабеля.",
    links: [{ label: "Карточка, артикул 972102728", href: "https://www.wildberries.ru/catalog/972102728/detail.aspx" }],
  },
  {
    n: 19,
    publication: "Международный союз электросвязи (ITU)",
    date: "01.08.2024",
    claim: "Характеристики семейства одномодового волокна G.657.",
    links: [{ label: "Рекомендация ITU-T G.657", href: "https://www.itu.int/epublications/publication/itu-t-g-657-2024-08-characteristics-of-a-bending-loss-insensitive-single-mode-optical-fibre-and-cable" }],
  },
  {
    n: 20,
    publication: "US Army",
    date: "проверено 19.07.2026",
    claim: "Возможности и физические ограничения оптоволоконного управления БПЛА.",
    links: [{ label: "Материал US Army", href: "https://www.army.mil/article-amp/287737/fiber_optic_drones_posing_a_significant_c_uas_challenge" }],
  },
  {
    n: 21,
    publication: "Командование НАТО по трансформации (NATO ACT)",
    date: "проверено 19.07.2026",
    claim: "Оптоволоконные БПЛА и ограничения традиционного радиочастотного подавления.",
    links: [{ label: "Материал NATO ACT", href: "https://www.act.nato.int/article/innovation-challenge-fibre-optic-drones/" }],
  },
  {
    n: 22,
    publication: "Сергей Собянин",
    date: "20.07.2026",
    claim: "Официальное сообщение: более 400 БПЛА летели в направлении Московского региона с 20:30 до 05:00; 85 уничтожены на подлёте к Москве.",
    links: [{ label: "Официальное сообщение", href: "https://t.me/mos_sobyanin/20878" }],
  },
  {
    n: 23,
    publication: "Минобороны России",
    date: "20.07.2026",
    claim: "Две последовательные сводки за 20:00-23:30 и 23:30-07:00: 4 и 19 БПЛА уничтожены над Московским регионом, из них 2 и 16 летели на Москву.",
    links: [{ label: "Официальные сводки", href: "https://t.me/s/mod_russia/54841" }],
  },
  {
    n: 24,
    publication: "Андрей Воробьёв",
    date: "20.07.2026, 09:44 мск",
    claim: "Срез развивающегося события: десять пострадавших, включая ребёнка, и последствия в Московской области.",
    links: [{ label: "Официальное уточнение", href: "https://t.me/vorobiev_live/12113" }],
  },
  {
    n: 25,
    publication: "Евгения Хрусталёва",
    date: "20.07.2026",
    claim: "Официальное сообщение главы Домодедова о пожаре в индустриальном парке «Южные Врата» и последствиях в округе.",
    links: [{ label: "Официальное сообщение", href: "https://t.me/khrustaleva_domodedovo/7736" }],
  },
  {
    n: 26,
    publication: "Reuters",
    date: "20.07.2026",
    claim: "Комментарий RWB: эвакуация комплекса в Коледино, отсутствие повреждений и возобновление работы.",
    links: [{ label: "Материал Reuters", href: "https://www.reuters.com/business/aerospace-defense/russia-says-ukraine-launched-400-drones-moscow-region-two-wounded-buildings-set-2026-07-20/" }],
  },
  {
    n: 27,
    publication: "The Insider",
    date: "20.07.2026",
    claim: "Проверка NASA FIRMS: тепловая аномалия у нефтебазы во Львовском и отсутствие аномалии на территории склада Wildberries в Коледино.",
    links: [{ label: "Материал The Insider", href: "https://theins.ru/news/295040" }],
  },
  {
    n: 28,
    publication: "Украинская правда",
    date: "20.07.2026",
    claim: "Пересказ с прямой цитатой заявления Владимира Зеленского об ударах по логистическим объектам и нефтебазе Московского региона.",
    links: [{ label: "Материал «Украинской правды»", href: "https://www.pravda.com.ua/news/2026/07/20/8044899/" }],
  },
];

const EN_SOURCES: readonly SourceReference[] = [
  {
    n: 1,
    publication: "Russian regional authorities",
    date: "18.07.2026",
    claim: "Seven night-shift workers killed and 25 injured in Kotovsk.",
    links: [{ label: "Rossiyskaya Gazeta report", href: "https://rg.ru/2026/07/18/reg-cfo/posle-naleta-dronov-s-porazhaiushchimi-elementami-na-sklade-wb-nachalsia-pozhar.html" }],
  },
  {
    n: 2,
    publication: "Meduza",
    date: "18.07.2026",
    claim: "Initial report of 24 people injured on the Elektrostal warehouse grounds.",
    links: [{ label: "Meduza report", href: "https://meduza.io/news/2026/07/18/ukrainskie-drony-atakovali-sklady-wildberries-v-dvuh-regionah-rossii-v-tambovskoy-oblasti-pogibli-sem-sotrudnikov-kompanii" }],
  },
  {
    n: 3,
    publication: "iStories",
    date: "18.07.2026",
    claim: "Moscow region governor reported one local resident killed and 37 injured in the region after the attack.",
    links: [{ label: "iStories report", href: "https://istories.media/news/2026/07/18/vsu-udarili-po-skladam-wilberries-pod-tambovom-i-moskvoi-pogibli-7-chelovek/" }],
  },
  {
    n: 4,
    publication: "RWB",
    date: "18.07.2026",
    claim: "Confirmation of the attack on both the Kotovsk and Elektrostal facilities.",
    links: [{ label: "RWB statement", href: "https://t.me/rwb_press_service/1619" }],
  },
  {
    n: 5,
    publication: "Associated Press",
    date: "18.07.2026",
    claim: "Compiled summary of the July 18 events.",
    links: [{ label: "AP report", href: "https://apnews.com/article/c2d0d713643288b81dbbea714d5db5ac" }],
  },
  {
    n: 6,
    publication: "Tatyana Kim",
    date: "18.07.2026",
    claim: "Announced support for families of the deceased and those seriously injured.",
    links: [{ label: "Public statement", href: "https://t.me/kimtatyana2024/777" }],
  },
  {
    n: 7,
    publication: "Tatyana Kim",
    date: "18.07.2026",
    claim: "Statement on assessing seller losses and initial logistics relief measures.",
    links: [{ label: "Public statement", href: "https://t.me/kimtatyana2024/778" }],
  },
  {
    n: 8,
    publication: "RWB",
    date: "19.07.2026",
    claim: "WB Bank announced support measures for affected sellers.",
    links: [{ label: "RWB statement", href: "https://t.me/rwb_press_service/1626" }],
  },
  {
    n: 9,
    publication: "Interfax-Ukraine",
    date: "18.07.2026",
    claim: "Ukrainian statement on the purpose of the targeted facilities.",
    links: [{ label: "Interfax-Ukraine report", href: "https://ru.interfax.com.ua/news/general/1186123.html" }],
  },
  {
    n: 10,
    publication: "Fonar",
    date: "06.03.2023",
    claim: "Volunteer lists of WB/Ozon goods and delivery to a designated pickup point.",
    links: [{ label: "Fonar article", href: "https://fonar.tv/article/2023/03/06/plechom-k-plechu-kak-v-belgorodskoy-oblasti-pomogayut-voennym-i-bezhencam" }],
  },
  {
    n: 11,
    publication: "810th Marine Brigade channel",
    date: "verified 19.07.2026",
    claim: "Publicly proposed list of goods and pickup-point order for the 810th brigade.",
    links: [{ label: "Telegram post", href: "https://t.me/morpeh_810/9404" }],
  },
  {
    n: 12,
    publication: "ICRC",
    date: "08.06.1977",
    claim: "Article 52: military-objective test and presumption of civilian use in case of doubt.",
    links: [{ label: "Additional Protocol I, Article 52", href: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-52" }],
  },
  {
    n: 13,
    publication: "MPStats",
    date: "verified 20.07.2026",
    claim: "Public documentation of the external analytics service and the article’s methodology.",
    links: [
      { label: "MPStats documentation", href: "https://mpstats.io/integrations/docs/description/" },
      { label: "Article methodology", href: "#methodology" },
    ],
  },
  {
    n: 14,
    publication: "Wildberries",
    date: "18-19.07.2026",
    claim: "Listing for the “Bulat v.4” drone detector and a separate public classifier metadata file.",
    links: [
      { label: "Listing, SKU 949889001", href: "https://www.wildberries.ru/catalog/949889001/detail.aspx" },
      { label: "Public metadata file", href: "https://basket-40.wbbasket.ru/vol9498/part949889/949889001/info/ru/card.json" },
    ],
  },
  {
    n: 15,
    publication: "Wildberries",
    date: "18.07.2026",
    claim: "Body-armor vest listing and seller claims about contents.",
    links: [{ label: "Listing, SKU 879755591", href: "https://www.wildberries.ru/catalog/879755591/detail.aspx" }],
  },
  {
    n: 16,
    publication: "Wildberries",
    date: "18.07.2026",
    claim: "Spool listing, SKU 447850828, and a separate verified listing, SKU 971841998, with connection diagrams.",
    links: [
      { label: "Spool, SKU 447850828", href: "https://www.wildberries.ru/catalog/447850828/detail.aspx" },
      { label: "Connection diagrams, SKU 971841998", href: "https://www.wildberries.ru/catalog/971841998/detail.aspx" },
    ],
  },
  {
    n: 17,
    publication: "Wildberries",
    date: "18.07.2026",
    claim: "First-aid kit listing with military-style labeling.",
    links: [{ label: "Listing, SKU 230725243", href: "https://www.wildberries.ru/catalog/230725243/detail.aspx" }],
  },
  {
    n: 18,
    publication: "Wildberries",
    date: "18.07.2026",
    claim: "Civilian one-kilometer optical cable listing.",
    links: [{ label: "Listing, SKU 972102728", href: "https://www.wildberries.ru/catalog/972102728/detail.aspx" }],
  },
  {
    n: 19,
    publication: "ITU",
    date: "01.08.2024",
    claim: "Characteristics of the G.657 single-mode fiber family.",
    links: [{ label: "ITU-T G.657 recommendation", href: "https://www.itu.int/epublications/publication/itu-t-g-657-2024-08-characteristics-of-a-bending-loss-insensitive-single-mode-optical-fibre-and-cable" }],
  },
  {
    n: 20,
    publication: "US Army",
    date: "verified 19.07.2026",
    claim: "Capabilities and physical limits of fiber-optic drone control.",
    links: [{ label: "US Army article", href: "https://www.army.mil/article-amp/287737/fiber_optic_drones_posing_a_significant_c_uas_challenge" }],
  },
  {
    n: 21,
    publication: "NATO ACT",
    date: "verified 19.07.2026",
    claim: "Fiber-optic UAVs and limits of traditional RF jamming.",
    links: [{ label: "NATO ACT article", href: "https://www.act.nato.int/article/innovation-challenge-fibre-optic-drones/" }],
  },
  {
    n: 22,
    publication: "Sergei Sobyanin",
    date: "20.07.2026",
    claim: "Official report: more than 400 drones heading toward the Moscow region and 85 destroyed on approach to Moscow.",
    links: [{ label: "Official statement", href: "https://t.me/mos_sobyanin/20878" }],
  },
  {
    n: 23,
    publication: "Russian Ministry of Defense",
    date: "20.07.2026",
    claim: "Two sequential reports: 4 and 19 drones destroyed over the Moscow region.",
    links: [{ label: "Official reports", href: "https://t.me/s/mod_russia/54841" }],
  },
  {
    n: 24,
    publication: "Andrei Vorobyov",
    date: "20.07.2026, 09:44 MSK",
    claim: "Developing-event snapshot: ten injured, including a child, and consequences in the Moscow region.",
    links: [{ label: "Official clarification", href: "https://t.me/vorobiev_live/12113" }],
  },
  {
    n: 25,
    publication: "Evgenia Khrustaleva",
    date: "20.07.2026",
    claim: "Official statement from the Domodedovo head about a fire at the Yuzhnye Vorota industrial park.",
    links: [{ label: "Official statement", href: "https://t.me/khrustaleva_domodedovo/7736" }],
  },
  {
    n: 26,
    publication: "Reuters / RWB",
    date: "20.07.2026",
    claim: "RWB comment: Koledino complex evacuation, no damage, and resumption of work.",
    links: [{ label: "Reuters report", href: "https://www.reuters.com/business/aerospace-defense/russia-says-ukraine-launched-400-drones-moscow-region-two-wounded-buildings-set-2026-07-20/" }],
  },
  {
    n: 27,
    publication: "The Insider",
    date: "20.07.2026",
    claim: "NASA FIRMS check: thermal anomaly near the Lvovskoye oil depot and no anomaly at the Koliedino Wildberries site.",
    links: [{ label: "The Insider report", href: "https://theins.ru/news/295040" }],
  },
  {
    n: 28,
    publication: "Ukrainska Pravda",
    date: "20.07.2026",
    claim: "Summary with a direct quote from Volodymyr Zelenskyy on strikes against logistics facilities and the Moscow region oil depot.",
    links: [{ label: "Ukrainska Pravda report", href: "https://www.pravda.com.ua/news/2026/07/20/8044899/" }],
  },
];

function getSources(locale: Locale) {
  return locale === "en" ? EN_SOURCES : RU_SOURCES;
}

function getSource(n: number, locale: Locale) {
  const source = getSources(locale).find((item) => item.n === n);
  if (!source) throw new Error(`Unknown source reference: ${n}`);
  return source;
}

const CITE_HINT: Record<Locale, string> = {
  ru: "Кликабельная ссылка находится в разделе «Источники».",
  en: "Clickable link is in the Sources section.",
};

export function Cite({ n, locale = "ru" }: { n: number; locale?: Locale }) {
  const source = getSource(n, locale);
  return (
    <Fn
      n={n}
      tip={
        <>
          <span className="font-medium text-[var(--color-text)]">{source.publication}</span>
          {` · ${source.date}. ${source.claim}`}
          <span className="mt-1 block text-[10px]">{CITE_HINT[locale]}</span>
        </>
      }
    />
  );
}

const SOURCES_TITLE: Record<Locale, string> = {
  ru: "Источники",
  en: "Sources",
};

export function SourcesList({ locale = "ru" }: { locale?: Locale }) {
  const sources = getSources(locale);
  return (
    <section className="reading-panel reading-sources mb-12" aria-labelledby="article-sources-heading">
      <h2 id="article-sources-heading" className="mb-6 text-[20px] font-medium tracking-tight text-[var(--color-text)]">
        {SOURCES_TITLE[locale]}
      </h2>
      <ol className="list-decimal space-y-3 pl-5 text-[12px] leading-relaxed text-[var(--color-dim)] marker:font-mono marker:text-[var(--color-text)]">
        {sources.map((source) => (
          <li key={source.n} id={`source-${source.n}`}>
            <span className="font-medium text-[var(--color-text)]">{source.publication}</span>
            {` · ${source.date}. ${source.claim} `}
            {source.links.map((link, index) => (
              <span key={link.href}>
                {index > 0 && " · "}
                <a href={link.href} target={link.href.startsWith("#") ? undefined : "_blank"} rel={link.href.startsWith("#") ? undefined : "noopener noreferrer"} className="underline decoration-solid  hover:text-[var(--color-text)]">
                  {link.label}
                </a>
              </span>
            ))}
          </li>
        ))}
      </ol>
    </section>
  );
}
