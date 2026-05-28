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
  .s3.light{--bg:#ffffff;--ink:#101012;--dim:#6b6b70;--line:#e5e5e7;--soft:#f6f6f7}
  .s3.dark{--bg:#0c0c0d;--ink:#f3f3f4;--dim:#9a9aa0;--line:#262629;--soft:#161618}
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
  .s3-lead{font-size:18px;color:var(--ink);margin:0 0 14px;max-width:60ch}
  .s3-lead.dim{color:var(--dim)}
  .s3-rule{border:none;border-top:1px solid var(--line);margin:56px 0 0}
  .s3-sec{padding:48px 0 0}
  .s3-kicker{font-family:var(--mono);font-size:12px;letter-spacing:.14em;
    text-transform:uppercase;color:var(--dim);margin-bottom:18px}
  .s3 h2{font-size:clamp(22px,4vw,30px);line-height:1.12;letter-spacing:-.02em;
    font-weight:680;margin:0 0 16px}
  .s3 p{font-size:17px;color:var(--dim);margin:14px 0}
  .s3 p b,.s3 li b{color:var(--ink);font-weight:600}
  .s3-num{font-family:var(--mono);font-size:13px;color:var(--dim);
    border:1px solid var(--line);border-radius:6px;padding:3px 9px;
    display:inline-block;margin-bottom:14px}
  .s3-card{border:1px solid var(--line);border-radius:14px;padding:30px 28px;margin:18px 0}
  .s3-card h3{font-size:21px;font-weight:660;letter-spacing:-.01em;margin:0 0 4px}
  .s3-card .s3-num{margin-bottom:0;margin-right:10px}
  .s3-head-row{display:flex;align-items:center;flex-wrap:wrap;gap:4px;margin-bottom:14px}
  .s3-res{font-size:16px;color:var(--ink);background:var(--soft);
    border-left:3px solid var(--ink);padding:12px 16px;margin-top:16px;border-radius:0 8px 8px 0}
  .s3-res b{font-weight:700}
  .s3 ul{margin:14px 0 0 0;padding:0;list-style:none}
  .s3 ul li{font-size:16px;color:var(--dim);padding:7px 0 7px 22px;position:relative}
  .s3 ul li:before{content:"";position:absolute;left:2px;top:15px;width:6px;height:6px;
    border-radius:50%;background:var(--dim)}
  .s3-price{display:flex;flex-wrap:wrap;gap:14px;margin:18px 0 0}
  .s3-pill{font-family:var(--mono);font-size:14px;border:1px solid var(--line);
    border-radius:8px;padding:10px 16px;color:var(--ink)}
  .s3-foot{margin-top:64px;padding-top:24px;border-top:1px solid var(--line);
    font-size:14px;color:var(--dim)}
  .s3-foot a{color:var(--ink);text-underline-offset:3px}
  @media (max-width:480px){
    .s3-wrap{padding:28px 18px 90px}
    .s3-top{margin-bottom:36px}
    .s3-card{padding:22px 18px}
    .s3-sec{padding:40px 0 0}
    .s3-rule{margin-top:44px}
    .s3-lead{font-size:17px}
    .s3 p{font-size:16px}
    .s3-res,.s3 ul li{font-size:15px}
    .s3-price{gap:10px}
    .s3-pill{font-size:13px;padding:9px 13px}
  }
`;

type Session = {
  num: string;
  title: string;
  body: React.ReactNode;
  result: React.ReactNode;
};

const SESSIONS: Session[] = [
  {
    num: "Занятие 1",
    title: "Рабочее место",
    body: (
      <>
        <p>
          Ставим два инструмента — VS Code и Claude Code. Звучит как что-то для
          программистов, на деле два скачивания и пара кнопок. Бояться нечего.
        </p>
        <p>
          Дальше учимся главному: разговаривать с Claude по-человечески.
          Не «введите команду», а «сделай мне вот так» — и он делает.
          Это и есть навык, ради которого вы пришли.
        </p>
      </>
    ),
    result: (
      <>
        <b>На выходе:</b> рабочее место собрано, всё стоит и подключено. С этого
        момента вы не «пользователь программы», а человек, который ставит
        задачи, а машина их выполняет.
      </>
    ),
  },
  {
    num: "Занятие 2",
    title: "Своя аналитика магазина",
    body: (
      <>
        <p>
          Разворачиваем ваш личный дашборд по вашему же магазину. Вставляете
          токен Kaspi — и экран оживает: выручка, средний чек, отмены,
          возвраты, города, кредит. Видно какие товары тащат, а какие
          пылятся на складе и тихо съедают деньги.
        </p>
        <p>
          Это не чужой сервис за подписку, который завтра поднимет цену.
          Это ваше. Захотели новый график — попросили Claude, он появился.
          Дашборд растёт под вас, а не вы под него.
        </p>
      </>
    ),
    result: (
      <>
        <b>На выходе:</b> дашборд, который показывает правду о магазине. И вы
        умеете менять его под свои задачи.
      </>
    ),
  },
  {
    num: "Занятие 3",
    title: "AI-агент, который работает за вас",
    body: (
      <>
        <p>
          Самое мощное. Собираем агента, который работает вместо вас. Он сам
          открывает сервисы аналитики, сам лезет на китайские сайты вроде 1688,
          сам собирает цены, конкурентов, ниши — и приносит готовый разбор.
        </p>
        <p>
          Вы не кликаете по сотне вкладок до рези в глазах. Вы говорите
          «найди прибыльные ниши» или «собери цены у поставщиков» — и идёте
          пить кофе. Возвращаетесь, а работа сделана.
        </p>
      </>
    ),
    result: (
      <>
        <b>На выходе:</b> ваш личный агент под ваши задачи. Один раз настроили —
        работает дальше сам.
      </>
    ),
  },
  {
    num: "Занятие 4",
    title: "MCP-коннектор — магазин в кармане",
    body: (
      <>
        <p>
          Подключаем данные магазина прямо в чат Claude. После этого аналитика
          живёт у вас в телефоне.
        </p>
        <p>
          Лежите вечером на диване, открываете телефон, пишете «сколько я
          заработал на этой неделе» или «где теряю на отменах» — и получаете
          ответ по своим настоящим цифрам. Без дашбордов, без захода в кабинет,
          без Excel. Просто спросили — вам ответили.
        </p>
      </>
    ),
    result: (
      <>
        <b>На выходе:</b> магазин, которому можно задать вопрос словами и
        получить ответ. В любой момент, откуда угодно.
      </>
    ),
  },
  {
    num: "Занятие 5",
    title: "Тренды и опережающие сигналы",
    body: (
      <>
        <p>
          Учимся подсматривать за Западом — без зазрения совести. Там тренды
          появляются на полгода-год раньше, чем доходят до нас. То что сейчас
          разрывает Amazon и TikTok, на Kaspi приедет позже.
        </p>
        <p>
          Берём западные сервисы, находим что вот-вот выстрелит, и проверяем
          трезво: приживётся ли это в Казахстане или останется чисто
          американской причудой. Заходим в нишу, пока в ней пусто.
        </p>
      </>
    ),
    result: (
      <>
        <b>На выходе:</b> список ниш, в которые можно заходить первым, пока
        конкуренты ещё спят.
      </>
    ),
  },
];

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
        <div className="s3-eyebrow">AI-аналитик маркетплейсов · поток 3</div>
        <h1>Научитесь разговаривать со своим магазином</h1>
        <p className="s3-lead">
          Давайте честно. Вы открываете Kaspi-кабинет, смотрите на цифры
          и понимаете их как-то на ощупь. Сколько реально заработали? Где
          утекают деньги? Какой товар тащит, а какой лежит мёртвым грузом?
        </p>
        <p className="s3-lead dim">
          За две недели мы соберём систему, которая отвечает на эти вопросы
          за десять секунд. Своими руками, у вас на ноутбуке. Без обещаний
          «потом разберётесь» — каждый разворачивает у себя прямо на занятии.
        </p>

        {/* ДЛЯ КОГО */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Для кого</div>
          <h2>Для всех, кто продаёт на Kaspi или Wildberries</h2>
          <p>
            Большой оборот, маленький, или вы только думаете начать — без
            разницы. Никаких «курс для тех, у кого от миллиона». Если надоело
            считать вручную в Excel и хочется, чтобы рутину делал AI — вам сюда.
          </p>
          <p>
            Программировать не нужно. Серьёзно. Всю техническую часть делает
            Claude, вы — ставите задачи словами.
          </p>
        </div>

        {/* КАК УСТРОЕНО */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Как устроено</div>
          <h2>5 основных занятий и 2 бонусных за две недели</h2>
          <p>
            Созвоны в Zoom по два часа. Идём по принципу «сначала фундамент,
            потом стройка»: первое занятие собираем рабочее место, дальше каждое
            кладётся в эту базу. Всё что находим и настраиваем — остаётся
            в одной системе, и она ваша навсегда.
          </p>
        </div>

        {/* SESSIONS */}
        {SESSIONS.map((s) => (
          <div className="s3-card" key={s.num}>
            <div className="s3-head-row">
              <span className="s3-num">{s.num}</span>
              <h3>{s.title}</h3>
            </div>
            {s.body}
            <div className="s3-res">{s.result}</div>
          </div>
        ))}

        {/* BONUS 1 */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Бонус 1</div>
          <h2>Белый ввоз из Китая</h2>
          <p>
            Отдельное занятие с приглашённым спикером. Это{" "}
            <b>Рустам Ниетпаев</b>, основатель и владелец компании TradeLINK
            (belayadostavka.kz). Его команда возит товар из Китая по-белому
            под ключ — поиск поставщика, выкуп, доставка, растаможка, документы.
            То есть рассказывает не теорию из интернета, а свою ежедневную
            работу.
          </p>
          <p>
            Белый ввоз — это когда товар приходит официально, с таможенной
            декларацией (ГТД). Значит продаёте на Kaspi, Wildberries и Ozon
            спокойно, без риска что груз заберут или выпишут штраф. Без этого
            расти страшно.
          </p>
          <p>На занятии разберём весь путь — от завода до вашего склада:</p>
          <ul>
            <li>
              <b>Маршрут:</b> завод в Китае → Хоргос → Алматы → растаможка → ГТД
            </li>
            <li>
              <b>Какую логистику выбрать:</b> сборный груз (2-4 недели) против
              полной фуры (1-2 недели) — что когда выгоднее
            </li>
            <li>
              <b>Документы по порогам:</b> до $10 000 хватает инвойса, дальше —
              контракт, от $50 000 — контракт плюс УНК
            </li>
            <li>
              <b>Сколько стоит:</b> брокер, пошлина и НДС по коду товара,
              сертификация при первом ввозе
            </li>
            <li>
              <b>Главный подводный камень:</b> заводы без экспортной лицензии —
              и как это обходится по-белому
            </li>
          </ul>
          <div className="s3-res">
            <b>На выходе:</b> понимание как возить из Китая официально и не
            бояться за груз. С чего начать, если ТОО или ИП ещё нет — тоже
            скажем.
          </div>
        </div>

        {/* BONUS 2 */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Бонус 2</div>
          <h2>Внешний трафик</h2>
          <p>
            Как приводить покупателей на карточку из соцсетей. Facebook,
            креативы, рабочие связки. Где искать ролики, которые «залетают»,
            как разобрать их по косточкам и снять своё — а не сжигать бюджет
            наугад.
          </p>
          <div className="s3-res">
            <b>На выходе:</b> понимание как лить трафик осознанно, с расчётом,
            а не на удачу.
          </div>
        </div>

        {/* ЧТО ОСТАНЕТСЯ */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Что у вас останется после курса</div>
          <h2>Не конспект, а работающие инструменты</h2>
          <ul>
            <li>Свой дашборд по магазину, развёрнутый на ваших данных</li>
            <li>AI-агент, который сам собирает и анализирует</li>
            <li>Коннектор, чтобы спрашивать магазин прямо в чате с телефона</li>
            <li>Записи всех занятий — навсегда</li>
          </ul>
        </div>

        {/* ЦЕНА */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Цена и формат</div>
          <h2>5 + 2 занятия, две недели, 250 000 ₸</h2>
          <div className="s3-price">
            <span className="s3-pill">5 основных + 2 бонуса</span>
            <span className="s3-pill">2 недели · Zoom</span>
            <span className="s3-pill">250 000 ₸</span>
            <span className="s3-pill">записи навсегда</span>
          </div>
        </div>

        {/* ГАРАНТИЯ */}
        <hr className="s3-rule" />
        <div className="s3-sec">
          <div className="s3-kicker">Гарантия</div>
          <h2>Не запустите — довожу лично</h2>
          <p>
            Пройдёте все занятия и не запустите свой инструмент — доведу
            один на один после курса. Без доплаты, пока не заработает.
            Мне важно, чтобы ушли с результатом, а не с папкой записей.
          </p>
        </div>

        <div className="s3-foot">
          Алмас Касымжанов ·{" "}
          <a
            href="https://www.instagram.com/almas_kasymzhanov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @almas_kasymzhanov
          </a>
        </div>
      </div>
    </div>
  );
}
