"use client";

import Link from "next/link";
import { CopyField } from "@/components/canon/copy-field";
import { IconlyChevronDown, IconlyArrowUpRight } from "@/components/iconly-icons";
import Image from "next/image";
import { ArticleHeader } from "@/components/canon/article-header";
import { ArticleLayout } from "@/components/canon/article-layout";
import { useState } from "react";

/* MCP-коннектор для аналитики Kaspi (используется в шаге 3) */
const CONNECTOR_URL = "https://mcp.redstat.kz/mcp";

/* ───── Screenshot ───── */
function Shot({ src, alt, caption, w, h, maxWidth }: { src: string; alt: string; caption: React.ReactNode; w: number; h: number; maxWidth?: number }) {
  return (
    <figure
      className="research-figure"
      style={maxWidth ? { maxWidth } : undefined}
    >
      <Image src={src} alt={alt} width={w} height={h} className="w-full h-auto" />
      {/* Full-width shots get a left caption (editorial canon); small capped UI
          screenshots stay centered under their narrow frame. */}
      <figcaption className={`font-mono text-[12px] text-[var(--color-dim)] px-4 py-2.5 ${maxWidth ? "text-center" : "text-left"}`}>{caption}</figcaption>
    </figure>
  );
}

/* ───── Step ───── */
function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-[13px] font-normal text-[var(--color-dim)] shrink-0">{String(n).padStart(2, "0")}</span>
        <h3 className="text-[16px] font-normal tracking-tight text-[var(--color-text)]">{title}</h3>
      </div>
      <div className="sm:pl-[34px]">{children}</div>
    </div>
  );
}

/* ───── Copy field ───── */


/* ═══════════════════════════════════════════════════ */

export default function KaspiMcpArticle() {
  const [showProgram, setShowProgram] = useState(false);

  return (
    <ArticleLayout
      slug="kaspi-mcp"
      locale="ru"
      header={
        <ArticleHeader
          kicker="Redstat + MCP"
          title={<>Арифметика лени: как заставить AI добывать золото из&nbsp;Kaspi, пока вы пьёте кофе</>}
          subtitle="Тот самый гайд из Reels. Разворачиваем AI-аналитика Kaspi прямо в телефоне: пошагово, со скриншотами, бесплатно."
          slug="kaspi-mcp"
          date="29 мая 2026"
          readMin={5}
          hero={{
            src: "/blog/kaspi-mcp/mcp.webp",
            alt: "Иллюстрация к гайду по MCP-коннектору для Kaspi",
            credit: "Иллюстрация: Алмас Касымжанов · Higgsfield AI",
          }}
        />
      }
    >
      {/* ─── Что произошло ─── */}
      <div className="mb-12">
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Большинство селлеров ищут товар по полдня и всё равно гадают. Я попросил AI и за пять минут получил три готовые ниши для старта на Kaspi: с ценами, долей «без бренда» и прикидкой, сколько закупить на бюджет в <span className="font-mono">5</span> миллионов.
          </p>

          <Shot src="/blog/kaspi-mcp/result.png" alt="Ответ AI-аналитика: топ-ниши для старта на Kaspi летом" caption="Тот самый ответ в чате, целиком" w={855} h={1484} maxWidth={400} />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Никакой магии и дорогих дашбордов. Claude через MCP-коннектор берёт данные из Redstat (это мой сервис аналитики маркетплейсов) и отвечает словами. Нужен только бесплатный аккаунт Claude и пять минут.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Пошаговая настройка ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-normal tracking-tight text-[var(--color-text)] mb-8">Как развернуть аналитика у себя за 5 минут</h2>

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
              После входа коннектор подключится сам, возвращаться никуда не нужно.
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
          <h2 className="text-[20px] font-normal tracking-tight text-[var(--color-text)] mb-6">Запросы</h2>
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

        {/* ─── Третий поток ─── */}
        <div className="reading-panel reading-offer mb-12">
          <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-brand)] mb-3">Набор на третий поток · AI-аналитика Kaspi</p>
          <h2 className="text-[20px] font-normal tracking-tight text-[var(--color-text)] mb-4">Вы дали магазину зрение. Дайте ему мозг</h2>
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
            aria-expanded={showProgram}
            aria-controls="mcp-program"
            className="inline-flex items-center gap-1.5 font-mono text-[13px] text-[var(--color-text)] min-h-11 hover:text-[var(--color-brand)]  transition-colors"
          >
            {showProgram ? "Свернуть" : "Подробнее"}
            <IconlyChevronDown size={14} className={`transition-transform duration-150 ${showProgram ? "rotate-180" : ""}`} />
          </button>

          {showProgram && (
            <div id="mcp-program" className="mt-6 flex flex-col gap-5">
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
            className="reading-text-action reading-offer-action"
          >
            Ознакомиться с полной программой <IconlyArrowUpRight size={16} />
          </Link>
        </div>
    </ArticleLayout>
  );
}
