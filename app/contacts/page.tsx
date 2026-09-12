import { PersonalDocument } from "@/components/personal-document";
import { PersonalSocialLinks } from "@/components/personal-social-links";
import { personalMetadata } from "@/lib/site-metadata";

export const metadata = personalMetadata(
  "Контакты — Алмас Касымжанов",
  "Связаться с Алмасом Касымжановым: обсудить проект, исследование или статью.",
  "/contacts",
);

export default function ContactsPage() {
  return <PersonalDocument locale="ru">
    <header>
      <h1>Контакты</h1>
      <p className="mt-6 text-[var(--personal-muted)]">Обсудить проект или исследование, задать вопрос по статье — напишите мне на почту или в соцсетях.</p>
    </header>
    <div className="mt-8"><PersonalSocialLinks locale="ru" /></div>
    <div className="mt-10">
      <p className="personal-caption">Телефон для деловых вопросов</p>
      <a href="tel:+77028290908" className="reading-text-action">+7 702 829 09 08</a>
    </div>
  </PersonalDocument>;
}
