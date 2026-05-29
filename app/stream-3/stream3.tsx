"use client";

import { useEffect, useState } from "react";

const CSS = `
  .s3{
    --sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    --mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    background:var(--bg);color:var(--ink);font-family:var(--sans);
    -webkit-font-smoothing:antialiased;line-height:1.6;min-height:100vh;
    transition:background .2s,color .2s;
  }
  .s3.light{--bg:#ffffff;--ink:#101012;--dim:#6b6b70;--line:#e5e5e7;--soft:#f6f6f7;--accent:#101012}
  .s3.dark{--bg:#0c0c0d;--ink:#f3f3f4;--dim:#9a9aa0;--line:#262629;--soft:#161618;--accent:#f3f3f4}
  .s3-wrap{max-width:720px;margin:0 auto;padding:40px 24px 120px}
  .s3-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:48px}
  .s3-brand{font-family:var(--mono);font-size:13px;color:var(--dim);text-decoration:none}
  .s3-brand:hover{color:var(--ink)}
  .s3-toggle{width:34px;height:34px;border:1px solid var(--line);border-radius:50%;
    background:transparent;cursor:pointer;display:flex;align-items:center;
    justify-content:center;color:var(--ink);transition:border-color .15s}
  .s3-toggle:hover{border-color:var(--ink)}
  .s3-dot{width:14px;height:14px;border-radius:50%;border:2px solid var(--ink)}
  .s3.dark .s3-dot{background:var(--ink)}
  .s3-eyebrow{font-size:12px;letter-spacing:.22em;text-transform:uppercase;
    color:var(--dim);font-weight:600;margin-bottom:18px}
  .s3 h1{font-size:clamp(30px,6vw,52px);line-height:1.05;letter-spacing:-.025em;
    font-weight:700;margin:0 0 22px}
  .s3-lead{font-size:18px;color:var(--ink);margin:0 0 14px;max-width:62ch}
  .s3-lead.dim{color:var(--dim)}
  .s3-rule{border:none;border-top:1px solid var(--line);margin:56px 0 0}
  .s3-sec{padding:48px 0 0}
  .s3-kicker{font-family:var(--mono);font-size:12px;letter-spacing:.14em;
    text-transform:uppercase;color:var(--dim);margin-bottom:18px}
  .s3 h2{font-size:clamp(22px,4vw,30px);line-height:1.12;letter-spacing:-.02em;
    font-weight:680;margin:0 0 16px}
  .s3 p{font-size:17px;color:var(--dim);margin:14px 0}
  .s3 p b,.s3 li b{color:var(--ink);font-weight:600}
  .s3-card{border:1px solid var(--line);border-radius:14px;padding:30px 28px;margin:18px 0}
  .s3-card h3{font-size:21px;font-weight:660;letter-spacing:-.01em;margin:0 0 4px}
  .s3-card .s3-num{margin-bottom:0;margin-right:10px}
  .s3-num{font-family:var(--mono);font-size:13px;color:var(--dim);
    border:1px solid var(--line);border-radius:6px;padding:3px 9px;display:inline-block}
  .s3-head-row{display:flex;align-items:center;flex-wrap:wrap;gap:4px;margin-bottom:14px}
  .s3-res{font-size:16px;color:var(--ink);background:var(--soft);
    border-left:3px solid var(--ink);padding:12px 16px;margin-top:16px;border-radius:0 8px 8px 0}
  .s3-res b{font-weight:700}
  .s3 ul{margin:14px 0 0 0;padding:0;list-style:none}
  .s3 ul li{font-size:16px;color:var(--dim);padding:7px 0 7px 22px;position:relative}
  .s3 ul li:before{content:"";position:absolute;left:2px;top:15px;width:6px;height:6px;
    border-radius:50%;background:var(--dim)}
  .s3-tablewrap{overflow-x:auto;margin:18px 0}
  .s3-table{width:100%;border-collapse:collapse;font-size:15px;min-width:420px}
  .s3-table th{text-align:left;font-weight:600;color:var(--dim);padding:10px 12px;
    border-bottom:2px solid var(--line);font-size:12px;text-transform:uppercase;letter-spacing:.06em}
  .s3-table td{padding:11px 12px;border-bottom:1px solid var(--line);color:var(--ink);vertical-align:top}
  .s3-table td:last-child,.s3-table th:last-child{text-align:right;white-space:nowrap;font-weight:600}
  .s3-table td.free{color:var(--ink)}
  .s3-price{display:flex;flex-wrap:wrap;gap:14px;margin:18px 0 0}
  .s3-pill{font-family:var(--mono);font-size:14px;border:1px solid var(--line);
    border-radius:8px;padding:10px 16px;color:var(--ink)}
  .s3-cta{border:1px solid var(--ink);border-radius:14px;padding:30px 28px;margin:24px 0 0}
  .s3-cta p{color:var(--ink)}
  .s3-wa{display:inline-block;margin-top:18px;background:var(--ink);color:var(--bg);
    text-decoration:none;font-weight:600;font-size:15px;padding:13px 22px;border-radius:10px;
    transition:opacity .15s}
  .s3-wa:hover{opacity:.85}
  .s3-foot{margin-top:64px;padding-top:24px;border-top:1px solid var(--line);
    font-size:14px;color:var(--dim)}
  .s3-foot a{color:var(--ink);text-underline-offset:3px}
  @media (max-width:480px){
    .s3-wrap{padding:28px 18px 90px}
    .s3-top{margin-bottom:36px}
    .s3-card,.s3-cta{padding:22px 18px}
    .s3-sec{padding:40px 0 0}
    .s3-rule{margin-top:44px}
    .s3-lead{font-size:17px}
    .s3 p{font-size:16px}
    .s3-res,.s3 ul li{font-size:15px}
    .s3-price{gap:10px}
    .s3-pill{font-size:13px;padding:9px 13px}
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
    num: "Модуль 3",
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
            <b>Jungle Scout</b> — продуктовые тренды Amazon. Через group-buy:
            $8 вместо $49+ в месяц.
          </li>
          <li>
            <b>Helium 10</b> — глубокая аналитика и keyword research. Через
            group-buy: $10 вместо $99+ в месяц.
          </li>
          <li>
            <b>amazing.ai</b> — расширение для аналитики SKU прямо на странице
            Amazon.
          </li>
        </ul>
        <p>Доступ через мой group-buy даю бесплатно и показываю как подключить.</p>
        <div className="s3-res">
          <b>Результат:</b> заходите в нишу за 6–18 месяцев до того, как в неё
          придут конкуренты.
        </div>
      </>
    ),
  },
  {
    num: "Модуль 4",
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
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("s3-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("s3-theme", next);
    } catch {}
  };

  return (
    <div className={`s3 ${theme}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="s3-wrap">
        <div className="s3-top">
          <a className="s3-brand" href="/">akasymzhanov.com</a>
          <button
            className="s3-toggle"
            onClick={toggle}
            aria-label={theme === "light" ? "Тёмная тема" : "Светлая тема"}
            title={theme === "light" ? "Тёмная тема" : "Светлая тема"}
          >
            <span className="s3-dot" />
          </button>
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
          <div className="s3-kicker">Четыре модуля</div>
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
          <h2>Четыре модуля — одна система</h2>
          <p>
            Порядок не случайный. Начинаем с Kaspi и Redstat — на этом
            маркетплейсе вы уже торгуете, поэтому осваиваетесь без стресса.
            Дальше Wildberries и MPStats — собираете первого AI-агента. Потом
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
            Белым ввозом занимается наш партнёр — он возит оборудование для{" "}
            <b>McDonald&apos;s</b> и <b>Hilton</b> в Казахстан. Уровень,
            которому доверяют международные сети.
          </p>
          <p>
            Один грамотно оформленный ввоз окупает стоимость всего курса.
          </p>
          <p>На занятии разбираем как делать по-белому и спать спокойно:</p>
          <ul>
            <li>
              Маршрут: завод → Хоргос → Алматы → растаможка → ГТД на руках.
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
                  <td>Jungle Scout через group-buy</td>
                  <td>$49+/мес</td>
                  <td className="free">$8/мес</td>
                </tr>
                <tr>
                  <td>Helium 10 через group-buy</td>
                  <td>$99+/мес</td>
                  <td className="free">$10/мес</td>
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
            <li>Аккаунт в Claude (бесплатный подходит, для модуля 4 удобнее Pro).</li>
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
              <b>Ильдос Хайпес, основатель Nemo.kz</b> — выручка больше 2 млрд
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
              Аналитика идёт через официальные сервисы — Redstat и MPStats.
              Коннектор только читает цифры, которые вы и так видите в этих
              сервисах. Он не управляет магазином, не трогает заказы и деньги.
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
          <h2>Довожу до результата лично</h2>
          <p>
            Пройдёте все занятия и не запустите свой инструмент — дорабатываю с
            вами один на один после курса. Без доплаты, пока не заработает.
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

        <div className="s3-foot">
          Алмас Касымжанов ·{" "}
          <a href={WA} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
