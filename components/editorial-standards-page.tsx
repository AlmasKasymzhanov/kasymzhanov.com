import { PersonalDocument } from "@/components/personal-document";
import Link from "next/link";
import { IconlyArrowUpRight } from "@/components/iconly-icons";

import { type Locale } from "@/lib/i18n";

type Standard = { id: string; number: string; title: string; body: string; points?: string[] };

export function EditorialStandardsPage({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const standards: Standard[] = isEn ? [
    { id: "evidence", number: "01", title: "Evidence before certainty", body: "I distinguish verified facts, third-party estimates, hypotheses, and the author's analysis. A number is not treated as proof merely because it is precise.", points: ["Primary documents and first-party datasets take priority.", "Every chart names its source, period, unit, and relevant limitation.", "When evidence is incomplete, the conclusion becomes narrower — not louder."] },
    { id: "sources", number: "02", title: "Sources and anonymity", body: "Named, on-record sources are preferred. An unnamed source may be used when the information is important, the source faces a credible risk, and the claim can be corroborated or its uncertainty made explicit." },
    { id: "methods", number: "03", title: "Data and methodology", body: "Stories based on marketplace or proprietary data explain the sample, time window, metric definition, transformations, and blind spots. Data obtained through Redstat, 10b.kz, MPStats, or another commercial service is labeled as such." },
    { id: "conflicts", number: "04", title: "Ownership and conflicts", body: "I develop Redstat, 10b and ProofTotal. When a commercial, personal, or data-provider relationship is relevant to a post, I disclose it in that post." },
    { id: "ai", number: "05", title: "Use of AI", body: "AI may assist with illustration, transcription, translation, code, and exploratory research. It is not treated as a source. Claims, quotations, calculations, and final editorial decisions remain the responsibility of the author. AI-generated or AI-assisted visuals are credited." },
    { id: "corrections", number: "06", title: "Corrections and updates", body: "Substantive corrections are added to the story with a clear note and update date. Quiet fixes are limited to spelling, typography, and formatting that do not change meaning. Readers can report an error by email." },
  ] : [
    { id: "evidence", number: "01", title: "Доказательства раньше уверенности", body: "Я отделяю проверенный факт, стороннюю оценку, гипотезу и авторский вывод. Точное число не становится доказательством только потому, что выглядит убедительно.", points: ["Приоритет — первичным документам и данным из первого источника.", "У каждого графика указаны источник, период, единица измерения и существенные ограничения.", "Если данных недостаточно, вывод становится уже, а не громче."] },
    { id: "sources", number: "02", title: "Источники и анонимность", body: "Я предпочитаю названные источники, говорящие под запись. Неназванный источник допустим, если информация общественно значима, раскрытие создаёт реальный риск, а утверждение можно подтвердить независимо или честно обозначить его неопределённость." },
    { id: "methods", number: "03", title: "Данные и методология", body: "Материалы на данных маркетплейсов или закрытых сервисов объясняют выборку, период, определение метрик, преобразования и слепые зоны. Данные Redstat, 10b.kz, MPStats и других коммерческих систем маркируются прямо." },
    { id: "conflicts", number: "04", title: "Владение и конфликты интересов", body: "Я развиваю Redstat, 10b и ProofTotal. Если с темой статьи связаны мои коммерческие или личные отношения, в том числе с поставщиком данных, я указываю это в самом материале." },
    { id: "ai", number: "05", title: "Использование AI", body: "AI может помогать с иллюстрациями, расшифровкой, переводом, кодом и предварительным поиском. AI не считается источником. Проверка фактов, цитат, расчётов и финальное редакционное решение остаются ответственностью автора. AI-визуалы маркируются." },
    { id: "corrections", number: "06", title: "Исправления и обновления", body: "Существенное исправление сопровождается примечанием и датой обновления. Без отдельного уведомления исправляются только опечатки, типографика и форматирование, не меняющие смысл. Сообщить об ошибке можно по электронной почте." },
  ];
  const copy = isEn
    ? { title: "How I work with data", deck: "The principles I follow when researching, calculating, publishing, and correcting posts on this blog.", contact: "Report an error", about: "About me" }
    : { title: "Как я работаю с данными", deck: "Принципы, которых я придерживаюсь в исследованиях, расчётах, публикациях и исправлениях в этом блоге.", contact: "Сообщить об ошибке", about: "Обо мне" };

  return <PersonalDocument locale={locale}>
    <header>
      <h1>{copy.title}</h1>
      <p className="mt-6 text-[var(--personal-muted)]">{copy.deck}</p>
    </header>
    <div className="mt-12 space-y-10">
      {standards.map(item => <section key={item.id} id={item.id} className="scroll-mt-8">
        <h2>{item.title}</h2>
        <p className="mt-4 text-[var(--personal-muted)]">{item.body}</p>
        {item.points && <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--personal-muted)]">{item.points.map(point => <li key={point}>{point}</li>)}</ul>}
      </section>)}
    </div>
    <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
      <a href="mailto:almas@kasymzhanov.com" className="reading-text-action group">{copy.contact}<IconlyArrowUpRight className="reading-arrow reading-arrow-external" /></a>
      <Link href={isEn ? "/en#about" : "/#about"} className="reading-text-action">{copy.about}</Link>
    </div>
  </PersonalDocument>;
}
