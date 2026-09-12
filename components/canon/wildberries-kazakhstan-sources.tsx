"use client";

/*
 * Numbered sources for the article «Wildberries ищет склады в Казахстане.
 * Единого блока на 100 тыс. кв. м нет» (wildberries-kazakhstan). Same grammar
 * as wb-sources.tsx: <Cite n={…}/> in the body renders the canon footnote
 * marker with a hover/tap card, and <SourcesList /> renders the numbered block
 * at the end of the page. The numbering here is the editorial numbering
 * [1]–[27] from the canonical text — do not renumber.
 *
 * Три источника не имеют внешнего URL и по редакционному правилу его не
 * получают: [5] — собственная панель автора (ведёт на методологию и на
 * опубликованные дневные строки), [16] — расчёт Wilbox, переданный автору,
 * [23] — анонимный комментарий продавца.
 */

import { Fn } from "@/components/canon/term";

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

type CanonicalReference = {
  n: number;
  text: string;
  href?: string;
};

const SOURCES: readonly SourceReference[] = [
  {
    n: 1,
    publication: "Коммерсантъ",
    date: "29.07.2026",
    claim:
      "Четыре выбывших комплекса — около 444 тыс. кв. м, или 8% сети; поиск около 100 тыс. кв. м в Казахстане; параметры складского рынка и строящихся хабов.",
    links: [
      {
        label: "Дарья Андрианова. «С логистикой все сопредельно ясно»",
        href: "https://www.kommersant.ru/doc/8846772",
      },
    ],
  },
  {
    n: 2,
    publication: "Associated Press",
    date: "30.07.2026",
    claim:
      "30 июля атаки, пожары и эвакуация работников на объектах Wildberries в Пензе и Сарапуле.",
    links: [
      {
        label: "«Russian strikes across Ukraine kill 10 and NATO scrambles jets after a missile falls in Poland»",
        href: "https://apnews.com/article/russia-ukraine-war-zelenskyy-missile-attack-63ab11e0ebe6a9aefdb547fe442bef3f",
      },
    ],
  },
  {
    n: 3,
    publication: "Tengrinews со ссылкой на Министерство торговли и интеграции РК",
    date: "29.07.2026",
    claim:
      "Wildberries официально не обращалась в Минторговли РК по поводу дополнительных складских мощностей.",
    links: [
      {
        label: "«В Казахстане официально отреагировали на перенос складов Wildberries»",
        href: "https://tengrinews.kz/curious/kazahstane-otreagirovali-vozmojnyiy-perenos-skladov-605066/",
      },
    ],
  },
  {
    n: 4,
    publication: "MarketPapa",
    date: "30.07.2026",
    claim:
      "Публичная оценка снижения продаж на 20–25% в четырех категориях и наблюдение автора поста о снижении СПП; набор данных и полная методика не названы.",
    links: [{ label: "Telegram-публикация", href: "https://t.me/marketpapa_channel/1755" }],
  },
  {
    n: 5,
    publication: "Собственный анализ автора по данным MPStats API",
    date: "30.07.2026",
    claim:
      "Складская атрибуция фиксированной панели из 40 SKU на восьми датах; склад 324108 «Астана Карагандинское шоссе».",
    links: [
      { label: "Методика расчета", href: "#methodology" },
      { label: "Дневные строки панели, CSV", href: "/blog/wildberries-kazakhstan/data/mpstats-astana-daily.csv" },
      { label: "Сводка до/после, CSV", href: "/blog/wildberries-kazakhstan/data/mpstats-pre-post-summary.csv" },
    ],
  },
  {
    n: 6,
    publication: "Бюро национальной статистики РК",
    date: "25.05.2026",
    claim:
      "Объем розничной электронной коммерции Казахстана в 2025 году — 3 768,8 млрд тенге; маркетплейсы — 3 237,5 млрд тенге, или 86%.",
    links: [
      {
        label: "«Об электронной коммерции в Республике Казахстан (2025 г.)»",
        href: "https://stat.gov.kz/ru/industries/economy/local-market/publications/346330/",
      },
    ],
  },
  {
    n: 7,
    publication: "Kaspi Гид",
    date: "проверено 30.07.2026",
    claim: "Нерезидент может подключиться к Магазину на Kaspi.kz.",
    links: [
      {
        label: "«Я нерезидент Республики Казахстан. Я могу подключиться?»",
        href: "https://guide.kaspi.kz/partner/ru/shop/connection/q2907",
      },
    ],
  },
  {
    n: 8,
    publication: "Kaspi Гид",
    date: "проверено 30.07.2026",
    claim:
      "Общие условия подключения к Магазину на Kaspi.kz: требование продаж через Kaspi Pay не менее 20 дней за последние два месяца.",
    links: [
      {
        label: "«Как стать партнером Магазина на Kaspi.kz?»",
        href: "https://guide.kaspi.kz/partner/ru/shop/conditions/q1350",
      },
    ],
  },
  {
    n: 9,
    publication: "Kaspi Гид",
    date: "проверено 30.07.2026",
    claim: "Добавление продавцом собственного склада в Магазине на Kaspi.kz.",
    links: [
      {
        label: "«Как в Магазине на Kaspi.kz добавить склад?»",
        href: "https://guide.kaspi.kz/partner/ru/shop/sale_points/q2708",
      },
    ],
  },
  {
    n: 10,
    publication: "Kaspi Гид",
    date: "проверено 30.07.2026",
    claim:
      "Продавец упаковывает товар и передает его в пункт приема Kaspi.kz, затем заказ доставляет курьерская служба.",
    links: [
      {
        label: "«Как работает Kaspi Доставка?»",
        href: "https://guide.kaspi.kz/partner/ru/shop/delivery/shipping/q2287",
      },
    ],
  },
  {
    n: 11,
    publication: "Forbes Russia",
    date: "20.07.2026",
    claim:
      "Оценки товарных остатков, восстановления складов, страхования и условия оферты Wildberries.",
    links: [
      {
        label: "«Подсчитали — прослезились: во что обойдется Wildberries атака на склады»",
        href: "https://www.forbes.ru/biznes/565242-podscitali-proslezilis-vo-cto-obojdetsa-wildberries-ataka-na-sklady",
      },
    ],
  },
  {
    n: 12,
    publication: "Официальный информационный ресурс Премьер-министра РК",
    date: "08.06.2026",
    claim:
      "Хаб Wildberries в Астане — 160 тыс. кв. м, 47,7 млрд тенге, завершение в I квартале 2027 года.",
    links: [
      {
        label: "«Олжас Бектенов проверил реализацию поручений Президента»",
        href: "https://primeminister.kz/ru/news/olzas-bektenov-proveril-realizaciiu-porucenii-prezidenta-po-razvitiiu-realnogo-sektora-31481",
      },
    ],
  },
  {
    n: 13,
    publication: "Forbes Kazakhstan со ссылкой на пресс-службу Wildberries",
    date: "23.10.2024",
    claim:
      "К концу сентября 2024 года в Казахстане были доступны восемь логистических объектов общей площадью 43 тыс. кв. м.",
    links: [
      {
        label: "«Продажи казахстанских предпринимателей на Wildberries выросли на 67% за год»",
        href: "https://forbes.kz/articles/prodazhi-kazahstanskih-predprinimateley-na-wildberries-vyrosli-na-67-za-god-fe31ca",
      },
    ],
  },
  {
    n: 14,
    publication: "Kaspi Гид",
    date: "проверено 30.07.2026",
    claim:
      "Для подключения Kaspi Доставки продавец указывает город, адрес склада, дни передачи заказов и контакт сотрудника; вне списка городов сервис недоступен.",
    links: [
      {
        label: "«Как подключить Kaspi Доставку по Казахстану?»",
        href: "https://guide.kaspi.kz/partner/ru/shop/delivery/shipping/q2289",
      },
    ],
  },
  {
    n: 15,
    publication: "РБК",
    date: "18.07.2026",
    claim:
      "Положения оферты Wildberries о непреодолимой силе, позиция юристов и заявление компании о проработке финансовой поддержки продавцов.",
    links: [
      {
        label: "«Ким рассказала о компенсации продавцам после атак БПЛА на склады WB»",
        href: "https://www.rbc.ru/business/18/07/2026/6a5b7db89a794732ae4f7a2a",
      },
    ],
  },
  {
    n: 16,
    publication: "Wilbox, расчет, предоставленный автору",
    date: "31.07.2026",
    claim:
      "Сравнение медиан СПП по FBO и FBS в 20 крупных по обороту предметах. Полная методика и сырой набор данных не предоставлены.",
    links: [],
  },
  {
    n: 17,
    publication: "Wildberries, справочный центр продавца",
    date: "обновлено 22.07.2026",
    claim:
      "Скидка WB финансируется площадкой и может меняться; поле «Платформенные скидки» ранее называлось СПП и может включать другие скидки.",
    links: [
      {
        label: "«Скидка WB»",
        href: "https://seller.wildberries.ru/instructions/ru/ru/material/wb-discount",
      },
    ],
  },
  {
    n: 18,
    publication: "Wildberries, справочный центр продавца",
    date: "обновлено 18.05.2026",
    claim:
      "Продавец по FBS хранит, собирает и упаковывает заказ, затем передает его на склад, в СЦ или ПВЗ Wildberries; коэффициенты зависят от физического узла.",
    links: [
      {
        label: "«Модель продаж “Маркетплейс” (FBS)»",
        href: "https://seller.wildberries.ru/instructions/ru/ru/material/fbs-sales-model",
      },
    ],
  },
  {
    n: 19,
    publication: "Wildberries, справочный центр продавца",
    date: "обновлено 20.07.2026",
    claim: "Виртуальный склад FBS привязывается к физическому складу или СЦ и зоне отгрузки.",
    links: [
      {
        label: "«Как создать склад продавца для работы по модели “Маркетплейс” (FBS)»",
        href: "https://seller.wildberries.ru/instructions/ru/ru/material/how-to-create-sellers-warehouse",
      },
    ],
  },
  {
    n: 20,
    publication: "Wildberries, справочный центр продавца",
    date: "обновлено 27.07.2026",
    claim: "Зоны доставки, время сборки и доставки влияют на место товара в выдаче на 30–40%.",
    links: [
      {
        label: "«Выдача и ранжирование товаров»",
        href: "https://seller.wildberries.ru/instructions/ru/ru/material/item-search-results-and-ranking",
      },
    ],
  },
  {
    n: 21,
    publication: "Wildberries, справочный центр продавца",
    date: "обновлено 18.05.2026",
    claim: "Рейтинг доставки FBS и временное ограничение новых заказов при падении ниже 70%.",
    links: [
      {
        label: "«Рейтинг доставки»",
        href: "https://seller.wildberries.ru/instructions/ru/ru/material/delivery-rating",
      },
    ],
  },
  {
    n: 22,
    publication: "Forbes Kazakhstan",
    date: "31.07.2026",
    claim:
      "Предварительный ущерб казахстанских продавцов, истории двух предпринимателей и ход компенсационных выплат.",
    links: [
      {
        label: "Дарья Андреева. «Эксперт: Ситуация вокруг WB серьезно изменит карту e-commerce Центральной Азии»",
        href: "https://forbes.kz/articles/ekspert-situatsiya-vokrug-wbserezno-izmenit-kartu-e-commerce-tsentralnoy-azii-62fd03",
      },
    ],
  },
  {
    n: 23,
    publication: "Анонимный комментарий продавца, переданный автору",
    date: "31.07.2026",
    claim:
      "Сокращение закупок на 30%, сценарий сокращения на 50% и хранения товара на собственном складе. Использован только как частный пример, не как статистика рынка.",
    links: [],
  },
  {
    n: 24,
    publication: "Telegram-канал Marketplace_biz со ссылкой на анонимного подписчика",
    date: "доступ 31.07.2026",
    claim:
      "Локальное наблюдение владельца ПВЗ Ozon: снижение поставок в соседний ПВЗ Wildberries, рост поставок Ozon, задолженность по доставке и сокращение зарплаты сотрудникам.",
    links: [
      {
        label: "«Первые последствия пожаров на WB уже добрались до ПВЗ»",
        href: "https://t.me/marketplace_biz/9122",
      },
    ],
  },
  {
    n: 25,
    publication: "Wildberries, официальный сайт для партнеров ПВЗ",
    date: "доступ 31.07.2026",
    claim:
      "98 тыс. ПВЗ в России и других странах; 28 млн заказов в день; 95% заказов покупатели забирают в ПВЗ.",
    links: [{ label: "pvz.wb.ru", href: "https://pvz.wb.ru/" }],
  },
  {
    n: 26,
    publication: "Курсив",
    date: "17.10.2024",
    claim:
      "В октябре 2024 года 2GIS показывал более 1230 ПВЗ Wildberries в областных городах Казахстана; часть ПВЗ рисковала закрываться из-за недостаточного оборота.",
    links: [
      {
        label: "Анна Липень. «Ну вы, блин, выдаете!», Курсив №39, PDF",
        href: "https://cdn-kz.kursiv.media/wp-content/uploads/2024/10/gazeta-kursiv-39-17102024.pdf",
      },
    ],
  },
  {
    n: 27,
    publication: "PRO Wildberries, обучающий материал для российских партнеров ПВЗ",
    date: "доступ 31.07.2026",
    claim: "Основное вознаграждение партнера ПВЗ — процент от оборота выданных заказов.",
    links: [
      {
        label: "«Какие расходы заложить на открытие ПВЗ и на чем зарабатывать»",
        href: "https://pro.wildberries.ru/lesson/2zavBjdRQc6Y46b2yCQdGvL8jI4/39q8tdxyJcWJkPl0WR4ZXd24e9q",
      },
    ],
  },
];

/*
 * Literal transcription of the numbered `## Источники` block in the
 * editorial index.md. The structured SOURCES records above intentionally stay
 * separate: they power the compact inline citation cards, while this array is
 * the canonical text readers see at the end of the article.
 */
const CANONICAL_REFERENCES: readonly CanonicalReference[] = [
  {
    n: 1,
    text: `Дарья Андрианова. «С логистикой все сопредельно ясно: Wildberries ищет 100 тыс. кв. м складов в Казахстане». Коммерсантъ, 29.07.2026.`,
    href: "https://www.kommersant.ru/doc/8846772",
  },
  {
    n: 2,
    text: `Associated Press. «Russian strikes across Ukraine kill 10 and NATO scrambles jets after a missile falls in Poland», 30.07.2026 — в материале также сообщается об атаках, пожарах и эвакуации работников объектов Wildberries в Пензе и Сарапуле.`,
    href: "https://apnews.com/article/russia-ukraine-war-zelenskyy-missile-attack-63ab11e0ebe6a9aefdb547fe442bef3f",
  },
  {
    n: 3,
    text: `Tengrinews со ссылкой на Министерство торговли и интеграции РК. «В Казахстане официально отреагировали на перенос складов Wildberries», 29.07.2026.`,
    href: "https://tengrinews.kz/curious/kazahstane-otreagirovali-vozmojnyiy-perenos-skladov-605066/",
  },
  {
    n: 4,
    text: `MarketPapa. «Неделя продаж на WB»: публичная оценка за периоды 23–29 июля и 16–22 июля 2026 года; набор данных и полная методика в посте не названы. Telegram-публикация.`,
    href: "https://t.me/marketpapa_channel/1755",
  },
  {
    n: 5,
    text: `Собственный анализ автора по данным MPStats API. Фиксированная панель из 40 SKU, восемь дат, склад 324108 «Астана Карагандинское шоссе». Методология приведена в приложении к статье.`,
  },
  {
    n: 6,
    text: `Бюро национальной статистики РК. «Об электронной коммерции в Республике Казахстан (2025 г.)», 25.05.2026.`,
    href: "https://stat.gov.kz/ru/industries/economy/local-market/publications/346330/",
  },
  {
    n: 7,
    text: `Kaspi Гид. «Я нерезидент Республики Казахстан. Я могу подключиться к Магазину на Kaspi.kz?»`,
    href: "https://guide.kaspi.kz/partner/ru/shop/connection/q2907",
  },
  {
    n: 8,
    text: `Kaspi Гид. «Как стать партнером Магазина на Kaspi.kz?» — требование продаж через Kaspi Pay не менее 20 дней за последние два месяца.`,
    href: "https://guide.kaspi.kz/partner/ru/shop/conditions/q1350",
  },
  {
    n: 9,
    text: `Kaspi Гид. «Как в Магазине на Kaspi.kz добавить склад?»`,
    href: "https://guide.kaspi.kz/partner/ru/shop/sale_points/q2708",
  },
  {
    n: 10,
    text: `Kaspi Гид. «Как работает Kaspi Доставка?»`,
    href: "https://guide.kaspi.kz/partner/ru/shop/delivery/shipping/q2287",
  },
  {
    n: 11,
    text: `Татьяна Романова, Алена Белая. «Подсчитали — прослезились: во что обойдется Wildberries атака на склады». Forbes Russia, 20.07.2026.`,
    href: "https://www.forbes.ru/biznes/565242-podscitali-proslezilis-vo-cto-obojdetsa-wildberries-ataka-na-sklady",
  },
  {
    n: 12,
    text: `Официальный информационный ресурс Премьер-министра РК. «Олжас Бектенов проверил реализацию поручений Президента по развитию реального сектора», 08.06.2026.`,
    href: "https://primeminister.kz/ru/news/olzas-bektenov-proveril-realizaciiu-porucenii-prezidenta-po-razvitiiu-realnogo-sektora-31481",
  },
  {
    n: 13,
    text: `Forbes Kazakhstan. «Продажи казахстанских предпринимателей на Wildberries выросли на 67% за год», 23.10.2024.`,
    href: "https://forbes.kz/articles/prodazhi-kazahstanskih-predprinimateley-na-wildberries-vyrosli-na-67-za-god-fe31ca",
  },
  {
    n: 14,
    text: `Kaspi Гид. «Как в Магазине на Kaspi.kz подключить Kaspi Доставку по Казахстану?»`,
    href: "https://guide.kaspi.kz/partner/ru/shop/delivery/shipping/q2289",
  },
  {
    n: 15,
    text: `РБК. «Ким рассказала о компенсации продавцам после атак БПЛА на склады WB», 18.07.2026.`,
    href: "https://www.rbc.ru/business/18/07/2026/6a5b7db89a794732ae4f7a2a",
  },
  {
    n: 16,
    text: `Wilbox. Расчет медиан СПП по FBO и FBS в 20 крупных по обороту предметах, предоставлен автору 31.07.2026. Полная методика и сырой набор данных не предоставлены.`,
  },
  {
    n: 17,
    text: `Wildberries. «Скидка WB» — дополнительная скидка площадки и отражение платформенных скидок в финансовом отчете; обновлено 22.07.2026.`,
    href: "https://seller.wildberries.ru/instructions/ru/ru/material/wb-discount",
  },
  {
    n: 18,
    text: `Wildberries. «Модель продаж “Маркетплейс” (FBS)» — сборка заказа продавцом, точки передачи и привязка логистических коэффициентов; обновлено 18.05.2026.`,
    href: "https://seller.wildberries.ru/instructions/ru/ru/material/fbs-sales-model",
  },
  {
    n: 19,
    text: `Wildberries. «Как создать склад продавца для работы по модели “Маркетплейс” (FBS)» — физический узел, зона отгрузки и список зон; обновлено 20.07.2026.`,
    href: "https://seller.wildberries.ru/instructions/ru/ru/material/how-to-create-sellers-warehouse",
  },
  {
    n: 20,
    text: `Wildberries. «Выдача и ранжирование товаров» — влияние зон доставки, времени сборки и доставки на место товара; обновлено 27.07.2026.`,
    href: "https://seller.wildberries.ru/instructions/ru/ru/material/item-search-results-and-ranking",
  },
  {
    n: 21,
    text: `Wildberries. «Рейтинг доставки» — расчет рейтинга FBS и ограничения при значении ниже 70%; обновлено 18.05.2026.`,
    href: "https://seller.wildberries.ru/instructions/ru/ru/material/delivery-rating",
  },
  {
    n: 22,
    text: `Дарья Андреева. «Эксперт: Ситуация вокруг WB серьезно изменит карту e-commerce Центральной Азии». Forbes Kazakhstan, 31.07.2026.`,
    href: "https://forbes.kz/articles/ekspert-situatsiya-vokrug-wbserezno-izmenit-kartu-e-commerce-tsentralnoy-azii-62fd03",
  },
  {
    n: 23,
    text: `Анонимный комментарий продавца, переданный автору 31.07.2026: сокращение закупок на 30%, сценарий сокращения на 50% и хранения товара на собственном складе. Использован только как частный пример, не как статистика рынка.`,
  },
  {
    n: 24,
    text: `Marketplace_biz. «Первые последствия пожаров на WB уже добрались до ПВЗ» — сообщение анонимного владельца ПВЗ Ozon о соседнем пункте Wildberries; доступ 31.07.2026.`,
    href: "https://t.me/marketplace_biz/9122",
  },
  {
    n: 25,
    text: `Wildberries. Официальный сайт для партнеров ПВЗ — 98 тыс. пунктов в России и других странах, 28 млн заказов в день и доля получения заказов через ПВЗ. Доступ 31.07.2026.`,
    href: "https://pvz.wb.ru/",
  },
  {
    n: 26,
    text: `Анна Липень. «Ну вы, блин, выдаете! Как пункты выдачи Wildberries и Ozon [не]уживаются в Казахстане». Курсив, №39, 17.10.2024.`,
    href: "https://cdn-kz.kursiv.media/wp-content/uploads/2024/10/gazeta-kursiv-39-17102024.pdf",
  },
  {
    n: 27,
    text: `PRO Wildberries. «Какие расходы заложить на открытие ПВЗ и на чем зарабатывать» — основной доход партнера как процент от оборота выданных заказов; материал для российского рынка, доступ 31.07.2026.`,
    href: "https://pro.wildberries.ru/lesson/2zavBjdRQc6Y46b2yCQdGvL8jI4/39q8tdxyJcWJkPl0WR4ZXd24e9q",
  },
];

function getSource(n: number) {
  const source = SOURCES.find((item) => item.n === n);
  if (!source) throw new Error(`Unknown source reference: ${n}`);
  return source;
}

export function Cite({ n }: { n: number }) {
  const source = getSource(n);
  return (
    <Fn
      n={n}
      tip={
        <>
          <span className="font-medium text-[var(--color-text)]">{source.publication}</span>
          {` · ${source.date}. ${source.claim}`}
          <span className="mt-1 block text-[10px]">
            {source.links.length > 0
              ? "Кликабельная ссылка находится в разделе «Источники»."
              : "У источника нет публичной ссылки — описание в разделе «Источники»."}
          </span>
        </>
      }
    />
  );
}

export function SourcesList() {
  const linkClass = "underline decoration-solid  hover:text-[var(--color-text)]";

  return (
    <section className="reading-panel reading-sources mb-12" aria-labelledby="article-sources-heading">
      <h2 id="article-sources-heading" className="mb-6 text-[20px] font-medium tracking-tight text-[var(--color-text)]">
        Источники
      </h2>
      <ol className="list-decimal space-y-3 pl-5 text-[12px] leading-relaxed text-[var(--color-dim)] marker:font-mono marker:text-[var(--color-text)]">
        {CANONICAL_REFERENCES.map((reference) => (
          <li key={reference.n} id={`source-${reference.n}`} className="scroll-mt-20">
            {reference.n === 5 ? (
              <>
                <a href="/blog/wildberries-kazakhstan/data/mpstats-astana-daily.csv" className={linkClass}>
                  Собственный анализ автора по данным MPStats API.
                </a>{" "}
                <a href="/blog/wildberries-kazakhstan/data/mpstats-pre-post-summary.csv" className={linkClass}>
                  Фиксированная панель из 40 SKU, восемь дат, склад 324108 «Астана Карагандинское шоссе».
                </a>{" "}
                <a href="#methodology" className={linkClass}>
                  Методология приведена в приложении к статье.
                </a>
              </>
            ) : reference.href ? (
              <a href={reference.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {reference.text}
              </a>
            ) : (
              reference.text
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
