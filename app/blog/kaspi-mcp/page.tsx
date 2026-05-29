"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { ViewCounter } from "@/components/view-counter";
import { ShareButtons } from "@/components/share-buttons";
import { ReadTracker } from "@/components/read-tracker";
import { useState } from "react";

/* MCP-коннектор для аналитики Kaspi (используется в шаге 3) */
const CONNECTOR_URL = "https://redstat-backend-production.up.railway.app/mcp";

/* ───── Screenshot ───── */
function Shot({ src, alt, caption, w, h, maxWidth }: { src: string; alt: string; caption: React.ReactNode; w: number; h: number; maxWidth?: number }) {
  return (
    <figure
      className="my-6 border border-[var(--color-border)] rounded-[3px] overflow-hidden mx-auto bg-[var(--color-surface)]"
      style={maxWidth ? { maxWidth } : undefined}
    >
      <Image src={src} alt={alt} width={w} height={h} className="w-full h-auto" />
      <figcaption className="font-mono text-[11px] text-[var(--color-dim)] text-center py-2.5">{caption}</figcaption>
    </figure>
  );
}

/* ───── Step ───── */
function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-[13px] font-bold text-[var(--color-dim)] shrink-0">{String(n).padStart(2, "0")}</span>
        <h3 className="text-[16px] font-bold tracking-tight text-[var(--color-text)]">{title}</h3>
      </div>
      <div className="pl-[34px]">{children}</div>
    </div>
  );
}

/* ───── Copy field ───── */
function CopyField({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };
  return (
    <div className="group relative border border-[var(--color-border)] rounded-[3px] bg-[var(--color-surface)] pl-4 pr-12 py-3">
      <code className="font-mono text-[12px] text-[var(--color-text)] break-all select-all">{value}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Скопировано" : "Скопировать ссылку"}
        title={copied ? "Скопировано" : "Скопировать"}
        className="absolute right-2 top-2 inline-flex items-center justify-center w-8 h-8 rounded-[3px] text-[var(--color-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
      >
        {copied ? (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
        )}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════ */

export default function KaspiMcpArticle() {
  const [showProgram, setShowProgram] = useState(false);

  return (
    <div className="min-h-screen">
      <ReadTracker slug="kaspi-mcp" />
      <div className="max-w-[680px] mx-auto px-6 py-12 md:py-20">

        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <Link href="/" className="font-mono text-[13px] text-[var(--color-dim)] hover:text-[var(--color-text)] transition-colors no-underline">
            ← almas kasymzhanov
          </Link>
          <ThemeToggle />
        </div>

        {/* Title */}
        <div className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-dim)] mb-4">Redstat + MCP</p>
          <h1 className="text-[28px] md:text-[34px] font-bold tracking-tight text-[var(--color-text)] leading-[1.2] mb-5">
            Арифметика лени: как заставить AI добывать золото из&nbsp;Kaspi, пока вы пьёте кофе
          </h1>
          <p className="text-[15px] text-[var(--color-dim)] leading-relaxed mb-6">
            Без таблиц, дашбордов и платных сервисов аналитики. Только Claude, чашка кофе и телефон. AI-аналитик, который помогает разбирать ниши на Kaspi прямо в чате. Тот самый гайд из Reels: как развернуть его у себя.
          </p>
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] text-[var(--color-dim)]/60 whitespace-nowrap">Май 29, 2026</p>
            <div className="flex items-center gap-3 whitespace-nowrap">
              <ViewCounter slug="kaspi-mcp" />
              <ShareButtons url="https://akasymzhanov.com/blog/kaspi-mcp" title="Арифметика лени: как AI добывает золото из Kaspi | Almas Kasymzhanov" variant="compact" />
            </div>
          </div>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Что произошло ─── */}
        <div className="mb-12">
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Мир электронной коммерции сегодня похож на старый советский завод: все при деле, все заняты, все что-то сводят в таблицы. Но на выходе лишь бесконечный шум и отчёты, от которых веет холодом бухгалтерских душ. Предприниматели бьются над аналитикой, хотя ответ у них буквально перед носом.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Секрет прост: Redstat + MCP. Это не фокус из сериалов про хакеров, а чистая инженерная механика. Вы берёте свой бизнес, который до этого был «слепым» котёнком, и через коннектор даёте ему зрение. Пока конкурент пытается понять, «почему гамаки не едут», ваш AI-агент уже разложил по полочкам <span className="font-mono">350</span> единиц товара и шепнул: «Бери, маржа твоя».
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Это не фантазия. Вот что он выдал, когда я попросил топ-ниши для старта на Kaspi летом с бюджетом <span className="font-mono">5</span> миллионов тенге: садовые гамаки, химия для бассейнов, электросамокаты. По каждой свои цифры, средний чек и доля «без бренда».
          </p>

          <Shot src="/blog/kaspi-mcp/result.png" alt="Ответ AI-аналитика: топ-ниши для старта на Kaspi летом" caption="Тот самый ответ в чате, целиком" w={855} h={1484} maxWidth={400} />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Возьмём первую. <strong className="text-[var(--color-text)]">Садовые гамаки:</strong> минимальная конкуренция, средний чек около <span className="font-mono">14 000</span> тенге, и, главное, огромная доля «ноунейм» товаров без бренда в среднем и дорогом сегментах (<span className="font-mono">45–58%</span>). На <span className="font-mono">5</span> миллионов можно закупить около <span className="font-mono">350</span> единиц с запасом на маркетинг и логистику.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            <strong className="text-[var(--color-text)]">«Без бренда» значит открытые карточки.</strong> На них может продавать кто угодно. Брендовые карточки закрыты под владельца бренда, новичку туда не зайти. А высокая доля «без бренда» значит, что рынок открыт: заходи и продавай. Поэтому это первое, на что аналитик смотрит в каждой нише.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            По химии для бассейнов он расписал объёмы и метрики и разобрал топ-3 карточки. По электросамокатам разложил по сегментам, бюджету и среднему чеку. Всё это за пять минут, в одном чате. Ниша подобрана. Дальше уже другие AI-агенты идут искать новинки и тренды на Wildberries и Amazon. А как такого аналитика развернуть у себя в телефоне, сейчас покажу.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Что такое MCP ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Что такое MCP, если коротко</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            MCP это «переходник», через который Claude обращается к аналитике маркетплейса прямо в чате. Ниши, цены по сегментам, топ-товары, бренды, доля «без бренда», спрос и сезонность. Сами цифры приходят из сервиса аналитики RedStat, а Claude их читает и объясняет человеческим языком.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Ничего программировать и скачивать не нужно. Один раз вставляешь ссылку в настройках Claude, дальше просто общаешься в чате, как обычно. Это бесплатно: нужен только аккаунт Claude (регистрация на <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-[#D97757] underline decoration-dotted decoration-[#D97757] underline-offset-2 hover:text-[#c4634a] transition-colors">claude.ai</a> бесплатная). Работает и на телефоне, и на компьютере.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Пошаговая настройка ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-8">Как развернуть аналитика у себя за 5 минут</h2>

          <Step n={1} title="Заходим в настройки">
            <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
              Открой Claude, нажми на свой аккаунт и выбери <strong className="text-[var(--color-text)]">Settings</strong> (Настройки).
            </p>
            <Shot src="/blog/kaspi-mcp/01-settings.png" alt="Меню аккаунта в Claude → Settings" caption="Меню аккаунта → Settings" w={335} h={382} maxWidth={300} />
          </Step>

          <Step n={2} title="Открываем раздел коннекторов">
            <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
              В меню слева выбери <strong className="text-[var(--color-text)]">Connectors</strong> и перейди по ссылке <strong className="text-[var(--color-text)]">Customize</strong>. Там коннекторы можно добавлять и настраивать.
            </p>
            <Shot src="/blog/kaspi-mcp/02-connectors.png" alt="Settings → Connectors → Customize" caption="Settings → Connectors → ссылка Customize" w={1067} h={647} />
          </Step>

          <Step n={3} title="Добавляем коннектор и вставляем ссылку">
            <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-4">
              Нажми <strong className="text-[var(--color-text)]">«+»</strong> вверху и выбери <strong className="text-[var(--color-text)]">«Add custom connector»</strong>. В открывшемся окне впиши название (например, <strong className="text-[var(--color-text)]">«Kaspi»</strong>) и вставь ссылку на коннектор, затем нажми «Добавить»:
            </p>
            <CopyField value={CONNECTOR_URL} />
            <Shot src="/blog/kaspi-mcp/03-add-connector.png" alt="Add custom connector: добавленный коннектор Kaspi со ссылкой и инструментами" caption="«+» → «Add custom connector». Справа подключённый Kaspi и его инструменты" w={864} h={570} />
          </Step>

          <Step n={4} title="Авторизация на RedStat (если попросит)">
            <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-3">
              Дальше возможны два варианта:
            </p>
            <ul className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-3 list-disc pl-5 space-y-2">
              <li><strong className="text-[var(--color-text)]">Коннектор подключился сам.</strong> Отлично, переходи к шагу 5.</li>
              <li><strong className="text-[var(--color-text)]">Claude попросил перейти на RedStat.</strong> Это нормально. Откроется страница RedStat. Если ты уже зарегистрирован, просто войди; если нет, зарегистрируйся (удобнее всего <strong className="text-[var(--color-text)]">через Google</strong>, в один клик).</li>
            </ul>
            <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
              Сразу после входа MCP-коннектор подключится автоматически, возвращаться никуда не нужно.
            </p>
          </Step>

          <Step n={5} title="Выдаём разрешения">
            <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
              Справа у каждого инструмента нажми на выпадающее меню и выбери <strong className="text-[var(--color-text)]">«Always allow»</strong>, чтобы Claude мог обращаться к данным без лишних подтверждений. Готово, аналитик подключён.
            </p>
            <Shot src="/blog/kaspi-mcp/04-permissions.png" alt="Tool permissions → Always allow" caption="Разрешения инструментов → «Always allow»" w={496} h={353} maxWidth={440} />
          </Step>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Первый запрос ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Запросы</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Открой <strong className="text-[var(--color-text)]">новый чат</strong> и просто напиши задачу своими словами. Например:
          </p>
          <blockquote className="border-l-2 border-[var(--color-border)] pl-4 my-4 text-[15px] text-[var(--color-dim)] leading-[1.8] italic">
            Подбери топ-ниши для старта на Kaspi летом, бюджет 5 млн ₸. Где заходить с брендом, а где без бренда (открытые карточки). Дай средний чек и сколько единиц можно закупить.
          </blockquote>
          <blockquote className="border-l-2 border-[var(--color-border)] pl-4 my-4 text-[15px] text-[var(--color-dim)] leading-[1.8] italic">
            Разбери нишу садовых гамаков: сегменты по цене, доля без бренда, топ-3 карточки и конкуренция.
          </blockquote>
          <blockquote className="border-l-2 border-[var(--color-border)] pl-4 my-4 text-[15px] text-[var(--color-dim)] leading-[1.8] italic">
            Проанализируй отзывы по этому товару и дай рекомендации, что улучшить в карточке и в самом товаре.
          </blockquote>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Claude сам соберёт аналитику по нише, покажет сегменты и предложит, куда заходить новичку. Никаких таблиц вручную.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Поделиться ─── */}
        <div className="mb-12">
          <ShareButtons url="https://akasymzhanov.com/blog/kaspi-mcp" title="Арифметика лени: как AI добывает золото из Kaspi | Almas Kasymzhanov" variant="full" />
        </div>

        {/* ─── Третий поток ─── */}
        <div className="mb-12 border border-[var(--color-border)] rounded-[3px] p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-dim)] mb-3">Набор на третий поток · AI-аналитика Kaspi</p>
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-4">Вы дали магазину зрение. Дайте ему мозг</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Вы только что настроили инструмент, который даёт зрение там, где конкуренты ещё блуждают вслепую. Но признайтесь: что вы будете делать, когда конкуренты вас догонят? Как масштабируете это до сотен товаров на разных маркетплейсах?
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Я открываю набор на третий поток. Это не «курсы», а инженерный спецназ для селлеров. Мы не пересказываем теорию, мы переводим весь ваш магазин на AI-рельсы: от внутренней аналитики до поиска новинок и трендов. В реальном времени, на ваших данных.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-6">
            В прошлых потоках со мной собирали систему владельцы топовых брендов на Kaspi и Wildberries: основатели Nemo.kz, Assen и другие.
          </p>

          <button
            type="button"
            onClick={() => setShowProgram((v) => !v)}
            className="inline-flex items-center gap-1.5 font-mono text-[13px] text-[var(--color-text)] border-b border-[var(--color-text)] pb-0.5 hover:text-[var(--color-dim)] hover:border-[var(--color-dim)] transition-colors"
          >
            {showProgram ? "Свернуть" : "Подробнее"}
            <span className="text-[10px]">{showProgram ? "▲" : "▼"}</span>
          </button>

          {showProgram && (
            <div className="mt-6 flex flex-col gap-5">
              <div>
                <p className="text-[15px] font-medium text-[var(--color-text)] mb-1">Модуль 1. Kaspi и Redstat через MCP</p>
                <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">Redstat знает, сколько зарабатывает ниша, кто топ-продавец и куда уходит маржа. Вы перестаёте рыться в графиках: спрашиваете словами, кто топ в категории, какая сезонность и где ниша свободна, и получаете ответ данными, не открывая сервис. Готовый коннектор я отдаю вам.</p>
              </div>
              <div>
                <p className="text-[15px] font-medium text-[var(--color-text)] mb-1">Модуль 2. Свой дашборд: оцифровка магазина</p>
                <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">Полная оцифровка вашего магазина на Kaspi. Я даю готовое решение: прямо на эфире вы разворачиваете его у себя, вставляете свой токен и получаете дашборд с полной аналитикой по своему магазину. Туда же выводите MCP-коннектор Redstat и видите весь спектр: что продаётся, что делают конкуренты, куда движется рынок. Инструмент ваш, платить за него никому не нужно.</p>
              </div>
              <div>
                <p className="text-[15px] font-medium text-[var(--color-text)] mb-1">Модуль 3. Автономные агенты (Wildberries)</p>
                <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">Учим AI собирать отчёты за вас. Пока вы пьёте кофе, агент выгружает данные из MPStats, прогоняет их через Claude Code и присылает готовый вердикт. Вы ставите задачу словами, код пишет AI.</p>
              </div>
              <div>
                <p className="text-[15px] font-medium text-[var(--color-text)] mb-1">Модуль 4. Машина времени (Amazon → Kaspi и WB)</p>
                <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">То, что взрывает продажи на Amazon сейчас, доходит до Kaspi и Wildberries через <span className="font-mono">6–18</span> месяцев. Вы видите это заранее и заходите в нишу, пока конкуренты о ней даже не знают.</p>
              </div>
              <div>
                <p className="text-[15px] font-medium text-[var(--color-text)] mb-1">Модуль 5. Ваш «второй мозг»</p>
                <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">Строим базу знаний в Obsidian или NotebookLM. AI один раз выучивает всё о вашей нише и перестаёт задавать глупые вопросы. Он становится вашим бессменным аналитиком.</p>
              </div>
              <div className="border-t border-[var(--color-border)] pt-5">
                <p className="text-[15px] font-medium text-[var(--color-text)] mb-1">Бонусная экосистема</p>
                <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">Все нужные сервисы я открываю со своей стороны: Redstat, MPStats, Wildbox, Jungle Scout, Helium 10. Отдельно платить за них не нужно. Плюс приглашённый эксперт по «белому» ввозу из Китая, который возит оборудование для McDonald’s и Hilton, разбирает, как возить по-белому и спать спокойно.</p>
              </div>
            </div>
          )}

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mt-6 mb-6">
            За две недели вы переводите на AI-рельсы всю систему: внутреннюю аналитику своего магазина, внешнюю аналитику рынка и новинок, агентов и базу знаний. Всё это связывается в один контур, который работает на вас каждый день.
          </p>

          <Link
            href="/stream-3"
            className="inline-flex items-center gap-1.5 font-mono text-[12px] font-medium no-underline bg-[var(--color-text)] text-[var(--color-bg)] rounded-[3px] px-4 py-2.5 hover:opacity-85 transition-opacity"
          >
            Ознакомиться с полной программой
            <span className="text-[11px]">→</span>
          </Link>
        </div>

        {/* ─── Автор ─── */}
        <div className="border-t border-[var(--color-border)] pt-10 mt-8 mb-10">
          <div className="flex items-start gap-5">
            <Image src="/avatar/almas.webp" alt="Almas Kasymzhanov" width={72} height={72} className="rounded-full shrink-0" />
            <div>
              <p className="font-mono text-[14px] font-bold text-[var(--color-text)] mb-2">almas kasymzhanov</p>
              <div className="flex flex-col gap-1.5 mt-1">
                <a href="https://t.me/almaskasymzhanov" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">telegram <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>
                <a href="https://www.instagram.com/almas_kasymzhanov/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">instagram <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>
                <a href="https://github.com/AlmasKasymzhanov" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">github <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--color-border)] pt-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-mono text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] transition-colors no-underline">
              ← Главная
            </Link>
            <span className="font-mono text-[11px] text-[var(--color-dim)]/50">© 2026 akasymzhanov.com</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
