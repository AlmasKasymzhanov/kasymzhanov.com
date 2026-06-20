"use client";

import Link from "next/link";
import Image from "next/image";
import { SiteHeader, SiteFooter } from "@/components/canon/site-chrome";

const CSS = `
  .s3{
    color:var(--color-text);
    font-family:var(--font-mono);
    -webkit-font-smoothing:antialiased;
    line-height:1.8;
  }
  .s3-wrap{max-width:680px;margin:0 auto;padding:48px 24px 96px}
  .s3-arr{color:var(--color-dim);opacity:.55;padding:0 2px}
  .s3-eyebrow{font-family:var(--font-mono);font-size:11px;letter-spacing:.2em;
    text-transform:uppercase;color:var(--color-brand);margin-bottom:16px}
  .s3 h1{font-size:33px;line-height:1.18;letter-spacing:-.02em;font-weight:700;
    color:var(--color-text);margin:0 0 20px}
  .s3-lead{font-size:16px;color:var(--color-dim);line-height:1.8;margin:0 0 16px}
  .s3-lead.dim{color:var(--color-dim);opacity:.85}
  .s3-rule{border:none;border-top:1px solid var(--color-border);margin:48px 0 0}
  .s3-sec{padding:48px 0 0}
  .s3-kicker{font-family:var(--font-mono);font-size:11px;letter-spacing:.2em;
    text-transform:uppercase;color:var(--color-dim);margin-bottom:16px}
  .s3 h2{font-size:20px;line-height:1.25;letter-spacing:-.01em;font-weight:650;
    color:var(--color-text);margin:0 0 16px}
  .s3 p{font-size:15px;color:var(--color-dim);line-height:1.8;margin:14px 0}
  .s3 p b,.s3 li b{color:var(--color-text);font-weight:600}
  .s3-card{border:1px solid var(--color-border);border-radius:3px;padding:26px 24px;margin:16px 0}
  .s3-card h3{font-size:16px;font-weight:600;letter-spacing:-.01em;color:var(--color-text);margin:0}
  .s3-card p{margin:10px 0 0}
  .s3-num{font-family:var(--font-mono);font-size:12px;color:var(--color-dim)}
  .s3-head-row{display:flex;align-items:baseline;flex-wrap:wrap;gap:8px;margin-bottom:10px}
  .s3-res{font-size:15px;color:var(--color-text);background:var(--color-surface);
    border-left:2px solid var(--color-border);padding:12px 16px;margin-top:16px;
    border-radius:0 3px 3px 0;line-height:1.7}
  .s3-res b{font-weight:700}
  .s3 ul{margin:14px 0 0;padding:0 0 0 20px;list-style:disc}
  .s3 ul li{font-size:15px;color:var(--color-dim);line-height:1.8;padding:3px 0}
  .s3 ul li::marker{color:var(--color-dim)}
  .s3-tablewrap{overflow-x:auto;margin:18px 0;border:1px solid var(--color-border);border-radius:3px}
  .s3-table{width:100%;border-collapse:collapse;font-size:13px;min-width:420px}
  .s3-table th{text-align:left;font-family:var(--font-mono);font-weight:500;color:var(--color-dim);
    padding:10px 16px;border-bottom:1px solid var(--color-border);font-size:11px;
    text-transform:uppercase;letter-spacing:.05em}
  .s3-table td{padding:11px 16px;border-bottom:1px solid var(--color-border);
    color:var(--color-text);vertical-align:top;font-size:13px}
  .s3-table tr:last-child td{border-bottom:none}
  .s3-table td:last-child,.s3-table th:last-child{text-align:right;white-space:nowrap;font-family:var(--font-mono)}
  .s3-table td.free{color:var(--color-text)}
  .s3-cta{border:1px solid var(--color-border);border-radius:3px;padding:26px 24px;margin:24px 0 0}
  .s3-cta p{color:var(--color-text)}
  .s3-wa{display:inline-flex;align-items:center;gap:6px;margin-top:18px;
    font-family:var(--font-mono);font-size:13px;font-weight:500;color:var(--color-brand);
    text-decoration:none;border:1px solid var(--color-brand);border-radius:3px;
    padding:11px 18px;transition:background .15s,color .15s}
  .s3-wa:hover{background:var(--color-brand);color:var(--color-bg)}
  .s3-ghost{display:inline-flex;align-items:center;gap:6px;margin-top:14px;
    font-family:var(--font-mono);font-size:13px;color:var(--color-text);
    text-decoration:none;border-bottom:1px solid var(--color-text);padding-bottom:2px;
    transition:color .15s,border-color .15s}
  .s3-ghost:hover{color:var(--color-brand);border-color:var(--color-brand)}
  .s3-toolcard{display:block;text-decoration:none}
  .s3-toolimg{border:1px solid var(--color-border);border-radius:3px;overflow:hidden;
    margin-bottom:18px;background:var(--color-surface)}
  .s3-toolimg img{display:block;width:100%;height:auto}
  .s3-toolcard h2{transition:color .15s}
  .s3-toolcard:hover h2{color:var(--color-brand)}
  .s3-toolcard:hover .s3-ghost{color:var(--color-brand);border-color:var(--color-brand)}
  .s3-banner{border:1px solid var(--color-text);border-radius:3px;padding:18px 20px;margin:0 0 40px;
    display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px}
  .s3-banner-txt{font-size:14px;color:var(--color-text);line-height:1.5}
  .s3-banner-txt b{font-weight:700}
  .s3-banner-btn{display:inline-flex;align-items:center;gap:6px;white-space:nowrap;
    font-family:var(--font-mono);font-size:13px;font-weight:600;color:var(--color-bg);
    background:var(--color-text);text-decoration:none;border:1px solid var(--color-text);
    border-radius:3px;padding:11px 18px;transition:opacity .15s}
  .s3-banner-btn:hover{opacity:.85}
  @media (max-width:480px){
    .s3-wrap{padding:32px 18px 64px}
    .s3 h1{font-size:27px}
    .s3-card,.s3-cta{padding:20px 18px}
    .s3-sec{padding:40px 0 0}
    .s3-rule{margin-top:40px}
  }
`;

type Module = { num: string; title: string; body: React.ReactNode };

const MODULES: Module[] = [
  {
    num: "Модуль 1",
    title: "Kaspi × Redstat",
    body: (
      <>
        <p>
          Redstat знает, сколько зарабатывает ниша, кто топ-продавец и куда
          уходит маржа. Обычно вы сами роетесь в его графиках. В этом модуле
          он будет отвечать вам словами.
        </p>
        <p>
          Главное новшество третьего потока — MCP-коннектор. Я написал
          коннектор, который подключает Redstat прямо в Claude. Вы пишете:
          «кто топ в категории кронштейнов, какая у них сезонность» — и
          получаете ответ данными, не заходя в сервис. Готовый коннектор даю
          вам.
        </p>
        <p>
          Плюс разбираем живые кейсы: как находить недопредставленные ниши на
          Kaspi, где конкуренты слабые, а спрос уже есть.
        </p>
        <div className="s3-res">
          <b>Результат:</b> спрашиваете ниши, конкурентов и сезонность словами —
          и получаете ответ, не открывая сервис.
        </div>
      </>
    ),
  },
  {
    num: "Модуль 2",
    title: "Свой дашборд: оцифровка магазина",
    body: (
      <>
        <p>
          Полная оцифровка вашего магазина на Kaspi. Вы перестаёте держать
          цифры в голове и в таблицах: продажи, маржа, остатки и отмены
          собираются в один живой дашборд.
        </p>
        <p>
          Я даю готовое решение. Прямо на эфире вы разворачиваете его у себя,
          вставляете свой токен и получаете дашборд с полной аналитикой по
          своему магазину. Никаких подписок: инструмент ваш.
        </p>
        <p>
          Сюда же выводим MCP-коннектор Redstat. В одном окне видите весь
          спектр: что продаётся у вас, что делают конкуренты и куда движется
          рынок.
        </p>
        <div className="s3-res">
          <b>Результат:</b> живой дашборд по вашему магазину, рядом рыночная
          аналитика, всё в одном месте.
        </div>
      </>
    ),
  },
  {
    num: "Модуль 3",
    title: "Wildberries × MPStats",
    body: (
      <>
        <p>
          Каждую неделю вручную собирать отчёт по нише — это не работа
          аналитика. Это работа копировальной машины.
        </p>
        <p>
          Учимся выгружать данные из MPStats API напрямую, подавать их в Claude
          Code и собирать агентов для автоматического мониторинга. Практика на
          каждом занятии: Hoppscotch, JSON, подключение к Claude. К концу модуля
          у вас работающий агент, который сам выдаёт отчёт раз в день или в
          неделю.
        </p>
        <p>Программировать не нужно. Код пишет AI. Вы ставите задачу словами.</p>
        <div className="s3-res">
          <b>Результат:</b> готовый AI-агент сам пишет отчёт по вашей нише раз в
          день или в неделю.
        </div>
      </>
    ),
  },
  {
    num: "Модуль 4",
    title: "Тренды Amazon → Kaspi и Wildberries",
    body: (
      <>
        <p>
          Вот факт, который меняет стратегию: то, что взрывает продажи на Amazon
          сейчас, приходит на Kaspi и Wildberries через 6–18 месяцев. Не
          когда-нибудь, а с понятной задержкой — и эту задержку видно заранее.
        </p>
        <p>
          Кто увидел тренд первым — заходит в пустую нишу. Кто вторым — воюет за
          место в уже перегретом сегменте.
        </p>
        <p>
          По сути это машина времени для закупок: вы видите, что будет
          продаваться у нас, пока это ещё только разгоняется на западе.
        </p>
        <p>Разбираем три инструмента:</p>
        <ul>
          <li>
            <b>Jungle Scout</b> — продуктовые тренды Amazon. Доступ через мой
            аккаунт, для вас бесплатно.
          </li>
          <li>
            <b>Helium 10</b> — глубокая аналитика и keyword research. Доступ
            через мой аккаунт, для вас бесплатно.
          </li>
          <li>
            <b>amazing.ai</b> — расширение для аналитики SKU прямо на странице
            Amazon.
          </li>
        </ul>
        <p>Все доступы открываю со своей стороны: вы пользуетесь через мой аккаунт и ничего не платите. Показываю, как подключить.</p>
        <div className="s3-res">
          <b>Результат:</b> заходите в нишу за 6–18 месяцев до того, как в неё
          придут конкуренты.
        </div>
      </>
    ),
  },
  {
    num: "Модуль 5",
    title: "Личная AI-база знаний",
    body: (
      <>
        <p>
          Каждый раз заново объяснять AI, что вы продаёте и кто ваши
          конкуренты — это как нанимать нового сотрудника каждый понедельник и
          тратить утро на его введение в курс.
        </p>
        <p>
          В четвёртом модуле вы строите базу знаний на NotebookLM или Obsidian:
          ваша категория, конкуренты, сезонность, ценовые сегменты. AI читает
          её один раз. Дальше — просто работаете. Показываю свою личную систему
          как референс.
        </p>
        <div className="s3-res">
          <b>Результат:</b> AI помнит всё о вашей категории — больше не
          объясняете заново каждый раз.
        </div>
      </>
    ),
  },
];

const WA = `https://wa.me/77028290908?text=${encodeURIComponent(
  "Здравствуйте! Хочу на третий поток курса по AI-аналитике маркетплейсов."
)}`;

export function Stream3Page() {
  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <SiteHeader />
        <div className="s3">
          <style dangerouslySetInnerHTML={{ __html: CSS }} />
          <div className="s3-wrap">

        {/* Набор закрыт → предзапись */}
        <div className="s3-banner">
          <div className="s3-banner-txt">
            <b>Набор в 3 поток закрыт</b> — все места заняты. Открыта предзапись на 4 поток.
          </div>
          <Link href="/stream-4" className="s3-banner-btn">
            Записаться в предзапись
          </Link>
        </div>

        {/* HERO */}
        <div className="s3-eyebrow">AI-аналитика маркетплейсов · третий поток</div>
        <h1>Научитесь разговаривать со своим магазином</h1>
        <p className="s3-lead">
          Вечер. Ноутбук. Excel. Вы сводите цифры за неделю, смотрите на сводную
          таблицу и понимаете: ответа на главный вопрос — что закупать в
          следующем месяце — в ней нет. Есть числа. Ответа нет.
        </p>
        <p className="s3-lead dim">
          Этот курс про другое. Вы спрашиваете свой магазин: «где я теряю на
          отменах», «какая ниша ещё свободна», «что брать на сезон» — и получаете
          ответ. По своим данным, человеческим языком, за секунды.
        </p>
        <p className="s3-lead">
          Коротко, чтобы вы понимали, кто это говорит. Redstat, через который вы
          будете спрашивать рынок, <b>я построил сам</b> — это мой сервис
          аналитики маркетплейсов. На курсе я отдаю то, чем пользуюсь каждый
          день, а не пересказываю чужие методички.
        </p>

        {/* ЧТО ВЫ ПОЛУЧИТЕ */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Что вы получите</div>
          <h2>Не знания. Инструменты, которые работают на следующий день после курса.</h2>
          <ul>
            <li>
              <b>AI-агент для Wildberries.</b> Раз в день или в неделю сам
              выдаёт отчёт по вашей нише. Настраиваете один раз.
            </li>
            <li>
              <b>MCP-коннектор для Redstat.</b> Аналитика прямо в чате:
              спрашиваете «покажи ниши с низкой конкуренцией» — получаете ответ
              данными, не открывая сервис. Готовый коннектор в подарок.
            </li>
            <li>
              <b>Свой дашборд магазина.</b> Готовое решение: вставляете токен и
              получаете полную оцифровку магазина, рядом рыночная аналитика
              через коннектор Redstat. Инструмент ваш, без подписок.
            </li>
            <li>
              <b>Личная AI-база знаний.</b> NotebookLM или Obsidian, ваш «второй
              мозг» по рынку. AI читает её один раз и помнит всё о вашей
              категории.
            </li>
            <li>
              <b>Навык опережать рынок.</b> Тренды Amazon → Kaspi и Wildberries
              за 6–18 месяцев до конкурентов.
            </li>
          </ul>
        </div>

        {/* МОДУЛИ */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Пять модулей</div>
        </div>
        {MODULES.map((m) => (
          <div className="s3-card" key={m.num}>
            <div className="s3-head-row">
              <span className="s3-num">{m.num}</span>
              <h3>{m.title}</h3>
            </div>
            {m.body}
          </div>
        ))}

        {/* ЛОГИКА */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Логика курса</div>
          <h2>Пять модулей — одна система</h2>
          <p>
            Порядок не случайный. Начинаем с Kaspi и Redstat — на этом
            маркетплейсе вы уже торгуете, поэтому осваиваетесь без стресса.
            Затем оцифровываем ваш магазин в собственный дашборд. Дальше
            Wildberries и MPStats — собираете первого AI-агента. Потом
            Amazon — учитесь читать тренды до того, как они придут к нам. В
            финале всё складывается в одну базу знаний, и система начинает
            работать на вас каждый день.
          </p>
        </div>

        {/* БОНУС 1 */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Бонус 1</div>
          <h2>Внешний трафик на карточку</h2>
          <p>Органика у любого магазина имеет потолок. Вы его, возможно, уже достигли.</p>
          <ul>
            <li>
              <b>Wildbox:</b> смотрим, кто и как льёт трафик на топовые карточки
              WB, находим рабочие связки и залетевшие видео — чтобы повторить под
              свой товар. Доступ бесплатно.
            </li>
            <li>
              <b>Facebook Ads:</b> кабинет, креативы, рабочие связки.
            </li>
            <li>
              <b>Бартер с блогерами:</b> как закрывать на обзоры по чёткому ТЗ и
              получать буст продаж на Kaspi и WB.
            </li>
          </ul>
        </div>

        {/* БОНУС 2 — белый ввоз + Рустам trust */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Бонус 2</div>
          <h2>Белый ввоз из Китая</h2>
          <p>
            Возить по-серому — значит спать вполглаза. Разберём как делать
            по-белому, чтобы спать спокойно и расти.
          </p>
          <p>
            Отдельное занятие ведёт приглашённый эксперт — <b>Рустам
            Ниетпаев</b>, основатель и владелец компании по белому ввозу из
            Китая. Его команда возит оборудование для <b>McDonald&apos;s</b> и{" "}
            <b>Hilton</b> в Казахстан — уровень, которому доверяют международные
            сети. Рассказывает не теорию из интернета, а свою ежедневную работу.
          </p>
          <p>
            Один грамотно оформленный ввоз окупает стоимость всего курса.
          </p>
          <p>На занятии разбираем как делать по-белому и спать спокойно:</p>
          <ul>
            <li>
              Маршрут: завод <span className="s3-arr">→</span> Хоргос{" "}
              <span className="s3-arr">→</span> Алматы{" "}
              <span className="s3-arr">→</span> растаможка{" "}
              <span className="s3-arr">→</span> ГТД на руках.
            </li>
            <li>
              Документы по порогам: до $10 000 — инвойс, дальше — контракт, от
              $50 000 — контракт плюс УНК.
            </li>
            <li>
              Реальная стоимость: брокер, пошлина, НДС, сертификация при первом
              ввозе.
            </li>
            <li>
              Главный подводный камень — заводы без экспортной лицензии — и как
              его обходят по-белому.
            </li>
          </ul>
        </div>

        {/* ЧТО БЕСПЛАТНО — таблица */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Что входит бесплатно</div>
          <h2>Сервисы, за которые обычно платят каждый месяц</h2>
          <div className="s3-tablewrap">
            <table className="s3-table">
              <thead>
                <tr>
                  <th>Сервис</th>
                  <th>Обычно</th>
                  <th>В курсе</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Redstat — доступ + полгода после курса</td>
                  <td>платно помесячно</td>
                  <td className="free">бесплатно</td>
                </tr>
                <tr>
                  <td>MPStats для Wildberries</td>
                  <td>платно</td>
                  <td className="free">бесплатно</td>
                </tr>
                <tr>
                  <td>Wildbox для внешнего трафика</td>
                  <td>платно</td>
                  <td className="free">бесплатно</td>
                </tr>
                <tr>
                  <td>MCP-коннектор для Redstat</td>
                  <td>не продаётся</td>
                  <td className="free">в подарок</td>
                </tr>
                <tr>
                  <td>Jungle Scout — через мой доступ</td>
                  <td>$49+/мес</td>
                  <td className="free">бесплатно</td>
                </tr>
                <tr>
                  <td>Helium 10 — через мой доступ</td>
                  <td>$99+/мес</td>
                  <td className="free">бесплатно</td>
                </tr>
                <tr>
                  <td>Все материалы и записи</td>
                  <td>—</td>
                  <td className="free">навсегда</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* MID CTA */}
        <div className="s3-cta">
          <p style={{ margin: 0, fontSize: 17 }}>
            Уже видно, что входит. Если хотите место в группе — напишите,
            обсудим детали.
          </p>
          <a
            className="s3-wa"
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
          >
            Написать в WhatsApp →
          </a>
        </div>

        {/* ФОРМАТ */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Формат</div>
          <h2>Два созвона в неделю в Zoom</h2>
          <p>
            Групповая работа, разборы реальных кейсов, ответы на вопросы. Все
            записи остаются с вами навсегда.
          </p>
          <p style={{ marginTop: 18 }}>Что нужно для старта:</p>
          <ul>
            <li>Вы продаёте или только запускаетесь на Kaspi или Wildberries.</li>
            <li>Аккаунт в Claude (бесплатный подходит, для модуля 5 удобнее Pro).</li>
            <li>Два часа в неделю на Zoom.</li>
          </ul>
        </div>

        {/* КТО УЧИЛСЯ */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Кто учился на прошлых потоках</div>
          <ul>
            <li>
              <b>Александр Довбня, бренд Top Flop</b> — топ в нише домашних
              тапочек на Wildberries. Выручка больше 2 млрд рублей в год.
            </li>
            <li>
              <b>Дулат Ассанов, бренд Assen</b> — топ в нише кронштейнов на WB,
              Ozon и Kaspi.
            </li>
            <li>
              <b>Елдос Хапез, основатель Nemo.kz</b> — выручка больше 2 млрд
              тенге в месяц.
            </li>
          </ul>
          <p>
            Учились очень разные люди: и те, кто запускал первый магазин, и
            владельцы брендов с многомиллиардной выручкой. Оборот не важен —
            важно, что вы продаёте или запускаетесь на Kaspi или Wildberries и
            хотите, чтобы аналитика перестала отнимать вечера.
          </p>
        </div>

        {/* FAQ */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Частые вопросы</div>
          <div className="s3-card">
            <h3>Это сложно? Я не программист.</h3>
            <p style={{ marginBottom: 0 }}>
              Программировать не нужно. Код пишет AI, вы ставите задачи словами.
              Всё собираем вместе на созвонах, с нуля и по шагам.
            </p>
          </div>
          <div className="s3-card">
            <h3>Это безопасно для моего магазина?</h3>
            <p style={{ marginBottom: 0 }}>
              Да. Коннектор работает только на чтение: показывает аналитику и
              ничего не делает с самим магазином — не трогает заказы, остатки,
              деньги и доступы. Данные идут из Redstat (это мой сервис аналитики
              маркетплейсов) и MPStats.
            </p>
          </div>
          <div className="s3-card">
            <h3>У меня маленький оборот или я только запускаюсь.</h3>
            <p style={{ marginBottom: 0 }}>
              Подходит. Оборот не важен — важно, что вы продаёте или
              запускаетесь на Kaspi или Wildberries.
            </p>
          </div>
        </div>

        {/* ПОЧЕМУ НЕ ПОВТОР */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Почему третий поток — не просто повтор</div>
          <ul>
            <li>
              <b>MCP-коннектор для Redstat.</b> Аналитика прямо в чате, без
              переключения между сервисами. Написан специально для этого потока,
              передаю готовым.
            </li>
            <li>
              <b>Агенты, которые работают по расписанию.</b> Не разовый запрос
              «покажи данные», а система, которая сама собирает отчёт каждый день
              или неделю — без вас.
            </li>
          </ul>
          <p>Это не апдейт программы. Это другой уровень инструментария.</p>
        </div>

        {/* ГАРАНТИЯ */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Гарантия</div>
          <h2>Не заработает — дорабатываю лично, без доплаты</h2>
          <p>
            Пройдёте все занятия, но инструмент так и не запустится — садимся
            один на один после курса и доводим, пока он не заработает.
          </p>
        </div>

        {/* CTA */}
        <div className="s3-cta">
          <p style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
            Стоимость 250 000 ₸.
          </p>
          <p style={{ marginTop: 8 }}>
            Беру небольшую группу — чтобы успеть лично довести агента до
            результата у каждого. Напишите мне в WhatsApp: расскажу детали,
            отвечу на вопросы и закреплю за вами место.
          </p>
          <a
            className="s3-wa"
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
          >
            Написать в WhatsApp →
          </a>
        </div>

        {/* Набор закрыт → предзапись (повтор внизу) */}
        <div className="s3-banner" style={{ marginTop: 28 }}>
          <div className="s3-banner-txt">
            <b>Набор в 3 поток закрыт</b> — все места заняты. Открыта предзапись на 4 поток.
          </div>
          <Link href="/stream-4" className="s3-banner-btn">
            Записаться в предзапись
          </Link>
        </div>

        {/* Инструменты: превью статьи про MCP */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Инструменты</div>
          <Link href="/blog/kaspi-mcp" className="s3-toolcard">
            <div className="s3-toolimg">
              <Image
                src="/blog/kaspi-mcp/mcp.webp"
                alt="Превью статьи: AI находит нишу на Kaspi за 5 минут"
                width={1200}
                height={800}
              />
            </div>
            <h2>AI находит нишу на Kaspi за 5 минут</h2>
            <p>
              Без таблиц и дорогих сервисов. Я попросил агента, и он выдал три
              готовые ниши: с ценами и долей «без бренда». Разверни такого
              карманного аналитика у себя по моему гайду.
            </p>
            <span className="s3-ghost">Читать статью</span>
          </Link>
        </div>

          </div>
        </div>
        <div className="flex-1" aria-hidden />
        <SiteFooter />
      </div>
    </div>
  );
}
