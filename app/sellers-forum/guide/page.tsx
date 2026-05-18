import type { Metadata } from "next";
import { KaStyle, KaFoot } from "../_ka";

export const metadata: Metadata = {
  title: "Карманный аналитик Kaspi — пошаговое объяснение | Алмас Касымжанов",
  description:
    "Установка карманного аналитика Kaspi по шагам: Node.js, VS Code, расширение Claude Code, архив, токен. ~15 минут, программировать не нужно.",
};

type Step = { num: string; title: string; body: React.ReactNode };

const STEPS: Step[] = [
  {
    num: "1",
    title: "Установить Node.js",
    body: (
      <>
        <p>
          Если ещё не установлен — откройте{" "}
          <a href="https://nodejs.org">nodejs.org</a> → большая кнопка{" "}
          <b>LTS</b> → скачайте файл → запустите → устанавливайте по умолчанию
          (Next / Далее до конца, ничего не меняя).
        </p>
        <p className="ka-pin">
          Проверка не требуется — если установщик дошёл до «Finish», всё ок.
        </p>
      </>
    ),
  },
  {
    num: "2",
    title: "Установить VS Code",
    body: (
      <>
        <p>
          Если ещё не установлен — откройте{" "}
          <a href="https://code.visualstudio.com">code.visualstudio.com</a> →
          кнопка <b>Download</b> (сайт сам определит вашу систему) → установите
          по умолчанию.
        </p>
        <p>
          VS Code — это просто удобное окно: внутри будет папка проекта, чат с
          Claude и встроенный терминал. Бояться нечего.
        </p>
      </>
    ),
  },
  {
    num: "3",
    title: "Поставить расширение Claude Code",
    body: (
      <>
        <p>
          Запустите VS Code → слева иконка <b>Extensions</b> (четыре
          квадратика) → в поиске наберите <b>Claude Code</b> → выберите
          расширение <b>от Anthropic</b> → <b>Install</b> → войдите (
          <b>Sign in</b>), откроется браузер, подтвердите и вернитесь в VS Code.
        </p>
        <p className="ka-pin">
          <b>Важно:</b> ставьте именно «<b>Claude Code</b>» от Anthropic — не
          «Claude Dev» и не другие похожие. Это разные расширения.
        </p>
      </>
    ),
  },
  {
    num: "4",
    title: "Скачать архив и распаковать на Рабочий стол",
    body: (
      <>
        <p>
          Скачайте файл <b>kaspi-mcp.zip</b> по ссылке — он попадёт в{" "}
          <b>Загрузки</b>:
        </p>
        <div className="ka-cmd">
          <span className="c">ссылка на архив: </span>
          https://drive.google.com/file/d/1vCVd3Ehu9vfyF8RTfQMQzRMdxtmH9hta/view?usp=sharing
        </div>
        <p>
          Перетащите его на <b>Рабочий стол</b>, затем распакуйте.{" "}
          <span className="ka-os">Windows</span> правый клик → «Извлечь всё».{" "}
          <span className="ka-os">Mac</span> двойной клик по архиву. На Рабочем
          столе появится папка <b>kaspi-mcp</b>.
        </p>
        <p className="ka-pin">
          <b>Важно:</b> распаковывайте именно на Рабочий стол — так папку проще
          найти на следующем шаге.
        </p>
      </>
    ),
  },
  {
    num: "5",
    title: "Открыть папку в VS Code",
    body: (
      <>
        <p>
          VS Code → меню <b>File → Open Folder…</b> (Файл → Открыть папку) →
          выберите папку <b>kaspi-mcp</b> на Рабочем столе → <b>Open</b>.
        </p>
        <p>
          Слева появится список файлов проекта. Если спросит «
          <b>Do you trust the authors?</b>» — нажмите <b>Yes</b> / <b>Trust</b>.
          Без этого Claude и коннектор не увидят проект.
        </p>
      </>
    ),
  },
  {
    num: "6",
    title: "Вставить один промпт со своим токеном",
    body: (
      <>
        <p>
          Откройте чат <b>Claude Code</b> (иконка Claude слева). Сначала
          возьмите токен: <b>Kaspi Merchant Cabinet → Настройки → API →
          X-Auth-Token</b>, скопируйте. Затем вставьте в чат текст ниже,
          подставив свой токен вместо <b>ВСТАВЬ_СВОЙ_ТОКЕН</b>, и нажмите Enter:
        </p>
        <div className="ka-cmd">
{`Это проект kaspi-mcp, папка уже открыта. Разверни его
по шагам, объясняя простыми словами:
1) выполни npm install
2) создай .env из .env.example
3) впиши в .env мой Kaspi-токен: ВСТАВЬ_СВОЙ_ТОКЕН
4) запусти npm run sync (данные за 30 дней)
5) скажи, когда коннектор kaspi готов, и дай 4 примера
   вопросов.
Если попросишь разрешение запустить команду — я нажму «разрешить».`}
        </div>
        <p>
          Дальше Claude работает сам: ставит зависимости, создаёт настройки,
          синхронизирует данные за 30 дней. Просто читайте, что он пишет, и при
          запросе разрешения нажимайте «разрешить».
        </p>
        <p className="ka-pin">
          <b>Безопасность:</b> токен сохранится только у вас на компьютере (в
          файле .env проекта), никуда не отправляется. После форума можете
          перевыпустить его в кабинете Kaspi — старый перестанет работать.
        </p>
      </>
    ),
  },
  {
    num: "7",
    title: "Перезапустить и спрашивать",
    body: (
      <>
        <p>
          Claude скажет, что данные загружены. Перезагрузите окно:{" "}
          <b>Ctrl/Cmd+Shift+P → Reload Window</b>. Если появится запрос —{" "}
          <b>разрешите коннектор kaspi</b>. Теперь спрашивайте обычным языком:
        </p>
        <div className="ka-qa">Какая у меня выручка за 30 дней?</div>
        <div className="ka-qa">
          Где теряю на отменах? Превышен ли порог Kaspi 3%?
        </div>
        <div className="ka-qa">Топ-10 городов по выручке</div>
        <div className="ka-qa">Сколько идёт через Kaspi Kredit?</div>
      </>
    ),
  },
  {
    num: "★",
    title: "Бонус — отчёт для собственника одной командой",
    body: (
      <>
        <p>Вставьте в чат Claude Code:</p>
        <div className="ka-cmd">
{`Сделай отчёт для собственника: выполни npm run report —
он создаст файл report.html прямо в папке проекта на
Рабочем столе. Затем открой report.html в браузере, чтобы
я сразу увидел результат, и в двух словах скажи главные
выводы и риски.`}
        </div>
        <p>
          Файл <b>report.html</b> — KPI, график выручки, топ-города, структура
          оплаты, выводы и риски. Откроется сразу, печатается в PDF
          (Ctrl/Cmd+P).
        </p>
      </>
    ),
  },
];

const TROUBLE: { q: string; a: React.ReactNode }[] = [
  {
    q: "Расширения «Claude Code» нет в поиске / поставил не то",
    a: (
      <>
        Ищите именно <b>Claude Code от Anthropic</b> (не «Claude Dev»). Если
        поставили не то — удалите, поставьте правильное, перезапустите VS Code.
      </>
    ),
  },
  {
    q: "Чат Claude Code не открывается",
    a: (
      <>
        Проверьте что вошли в аккаунт (Sign in) на шаге 3. Ctrl/Cmd+Shift+P →
        наберите «Claude» → выберите команду фокуса на чат.
      </>
    ),
  },
  {
    q: "Слева нет файлов / Claude «не видит проект»",
    a: (
      <>
        Папка открыта неправильно. File → Open Folder → выберите именно папку{" "}
        <b>kaspi-mcp</b> (не отдельный файл). На запрос «Do you trust the
        authors?» нажмите <b>Trust</b>.
      </>
    ),
  },
  {
    q: "Ошибка на npm install / sync",
    a: (
      <>
        Скажите Claude в чате: «повтори с того места где упало» — часто
        помогает. <span className="ka-os">Mac</span> при ошибке про права —
        «запусти с sudo». <span className="ka-os">Windows</span> запустите VS
        Code от имени администратора.
      </>
    ),
  },
  {
    q: "Спрашиваю — отвечает «нет данных»",
    a: (
      <>
        Синхронизация не прошла или токен не вписан. Скажите Claude: «проверь
        .env и выполни npm run sync заново» — он подскажет, что сделать. После —
        Reload Window.
      </>
    ),
  },
];

export default function GuidePage() {
  return (
    <div className="ka-root">
      <KaStyle />
      <div className="ka-wrap">
        <a className="ka-back" href="/sellers-forum">← Назад к материалам</a>

        <div className="ka-head">
          <div className="ka-eyebrow">Kaspi × Claude · Пошаговое объяснение</div>
          <h1>
            Карманный аналитик Kaspi
            <br />— установка по шагам
          </h1>
          <p className="ka-intro">
            Делайте по порядку, ничего не пропуская. Программировать не нужно —
            всю настройку выполнит Claude, вы только делаете простые клики и в
            конце вставляете один готовый текст со своим токеном. Время: ~15
            минут.
          </p>
        </div>

        {STEPS.map((s) => (
          <div className="ka-step" key={s.num}>
            <div className="ka-num">{s.num}</div>
            <div className="ka-body">
              <h2>{s.title}</h2>
              {s.body}
            </div>
          </div>
        ))}

        <div className="ka-trouble">
          <h3>Если что-то пошло не так</h3>
          <dl>
            {TROUBLE.map((t, i) => (
              <div key={i}>
                <dt>{t.q}</dt>
                <dd>{t.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        <KaFoot />
      </div>
    </div>
  );
}
