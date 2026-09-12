import { PersonalDocument } from "@/components/personal-document";
import Link from "next/link";

import { type Locale } from "@/lib/i18n";

type Standard = { id: string; number: string; title: string; body: string; points?: string[] };

export function EditorialStandardsPage({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const standards: Standard[] = isEn ? [
    { id: "evidence", number: "01", title: "Evidence before certainty", body: "We distinguish verified facts, third-party estimates, hypotheses, and the author's analysis. A number is not treated as proof merely because it is precise.", points: ["Primary documents and first-party datasets take priority.", "Every chart names its source, period, unit, and relevant limitation.", "When evidence is incomplete, the conclusion becomes narrower — not louder."] },
    { id: "sources", number: "02", title: "Sources and anonymity", body: "Named, on-record sources are preferred. An unnamed source may be used when the information is important, the source faces a credible risk, and the claim can be corroborated or its uncertainty made explicit." },
    { id: "methods", number: "03", title: "Data and methodology", body: "Stories based on marketplace or proprietary data explain the sample, time window, metric definition, transformations, and blind spots. Data obtained through Redstat, 10b.kz, MPStats, or another commercial service is labeled as such." },
    { id: "conflicts", number: "04", title: "Ownership and conflicts", body: "Kasymzhanov is owned and edited by Almas Kasymzhanov, who also founded 10b.kz, Redstat, and Brock UI. A material commercial, personal, or data-provider relationship relevant to a story is disclosed in that story." },
    { id: "ai", number: "05", title: "Use of AI", body: "AI may assist with illustration, transcription, translation, code, and exploratory research. It is not treated as a source. Claims, quotations, calculations, and final editorial decisions remain the responsibility of the author. AI-generated or AI-assisted visuals are credited." },
    { id: "corrections", number: "06", title: "Corrections and updates", body: "Substantive corrections are added to the story with a clear note and update date. Quiet fixes are limited to spelling, typography, and formatting that do not change meaning. Readers can report an error by email." },
  ] : [
    { id: "evidence", number: "01", title: "Доказательства раньше уверенности", body: "Мы отделяем проверенный факт, стороннюю оценку, гипотезу и авторский вывод. Точное число не становится доказательством только потому, что выглядит убедительно.", points: ["Приоритет — первичным документам и данным из первого источника.", "У каждого графика указаны источник, период, единица измерения и существенные ограничения.", "Если данных недостаточно, вывод становится уже, а не громче."] },
    { id: "sources", number: "02", title: "Источники и анонимность", body: "Мы предпочитаем названные источники, говорящие под запись. Неназванный источник допустим, если информация общественно значима, раскрытие создаёт реальный риск, а утверждение можно подтвердить независимо или честно обозначить его неопределённость." },
    { id: "methods", number: "03", title: "Данные и методология", body: "Материалы на данных маркетплейсов или закрытых сервисов объясняют выборку, период, определение метрик, преобразования и слепые зоны. Данные Redstat, 10b.kz, MPStats и других коммерческих систем маркируются прямо." },
    { id: "conflicts", number: "04", title: "Владение и конфликты интересов", body: "Изданием владеет и руководит Алмас Касымжанов — также основатель 10b.kz, Redstat и Brock UI. Существенные коммерческие, личные отношения или отношения с поставщиком данных, связанные с темой материала, раскрываются в самом материале." },
    { id: "ai", number: "05", title: "Использование AI", body: "AI может помогать с иллюстрациями, расшифровкой, переводом, кодом и предварительным поиском. AI не считается источником. Проверка фактов, цитат, расчётов и финальное редакционное решение остаются ответственностью автора. AI-визуалы маркируются." },
    { id: "corrections", number: "06", title: "Исправления и обновления", body: "Существенное исправление сопровождается примечанием и датой обновления. Без отдельного уведомления исправляются только опечатки, типографика и форматирование, не меняющие смысл. Сообщить об ошибке можно по электронной почте." },
  ];
  const copy = isEn
    ? { eyebrow: "How we work", title: "Editorial standards", deck: "The compact rulebook behind every investigation, calculation, chart, and correction published by Kasymzhanov.", contact: "Report an error or raise an editorial concern", about: "Read about the publication" }
    : { eyebrow: "Как мы работаем", title: "Редакционные стандарты", deck: "Короткий свод правил, который стоит за каждым расследованием, расчётом, графиком и исправлением Kasymzhanov.", contact: "Сообщить об ошибке или задать редакционный вопрос", about: "Об издании" };

  return <PersonalDocument locale={locale}>
          <header className="grid gap-10 border-b border-[var(--color-text)] pb-12 lg:grid-cols-1">
            <div>
              <p className="font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-[var(--color-brand)]">{copy.eyebrow}</p>
              <h1 className="mt-5 max-w-[900px] font-heading text-[48px] font-normal leading-[0.94] tracking-[-0.045em] sm:text-[64px] md:text-[76px]">{copy.title}</h1>
              <p className="mt-7 max-w-[760px] text-[18px] leading-relaxed text-[var(--color-dim)] md:text-[21px]">{copy.deck}</p>
            </div>
            <nav className="self-end border-t border-[var(--color-border)] pt-4 font-mono text-[10px] uppercase tracking-[0.07em] text-[var(--color-dim)]" aria-label={copy.title}>
              {standards.map((item) => <a key={item.id} href={`#${item.id}`} className="flex justify-between gap-4 border-b border-[var(--color-border)] py-2 hover:text-[var(--color-brand)]"><span>{item.title}</span><span>{item.number}</span></a>)}
            </nav>
          </header>

          <div className="mx-auto max-w-[960px]">
            {standards.map((item) => (
              <section key={item.id} id={item.id} className="grid gap-5 border-b border-[var(--color-border)] py-10 md:grid-cols-[90px_1fr] md:py-14">
                <p className="font-mono text-[11px] text-[var(--color-brand)]">{item.number}</p>
                <div>
                  <h2 className="font-heading text-[28px] font-normal tracking-tight md:text-[36px]">{item.title}</h2>
                  <p className="mt-5 max-w-[760px] text-[16px] leading-[1.75] text-[var(--color-dim)] md:text-[18px]">{item.body}</p>
                  {item.points && <ul className="mt-5 max-w-[760px] list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-[var(--color-dim)]">{item.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                </div>
              </section>
            ))}
          </div>

          <div className="mx-auto mt-12 flex max-w-[960px] flex-col gap-3 bg-[var(--color-surface)] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <a href="mailto:almas@kasymzhanov.com?subject=Editorial%20correction" className="font-heading text-[20px] font-normal hover:text-[var(--color-brand)]">{copy.contact} →</a>
            <Link href={isEn ? "/en/about" : "/about"} className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-dim)] hover:text-[var(--color-brand)]">{copy.about}</Link>
          </div>
        </PersonalDocument>;
}
