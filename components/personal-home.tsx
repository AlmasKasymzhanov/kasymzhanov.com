import Image from "next/image";
import { PersonalArticles } from "@/components/personal-articles";
import { PersonalFooter } from "@/components/personal-footer";
import { PersonalProjects } from "@/components/personal-projects";
import { PersonalResources } from "@/components/personal-resources";
import { PersonalSidebar } from "@/components/personal-sidebar";
import { PersonalSocialLinks } from "@/components/personal-social-links";
import type { PersonalLocale } from "@/lib/personal-locale";

const HOME_COPY: Record<
  PersonalLocale,
  { title: string; intro: string; introSecond: string; skip: string }
> = {
  ru: {
    title: "Привет, я Алмас.",
    intro:
      "Предприниматель и аналитик. Продаю на маркетплейсах и делаю сервисы для бизнеса: Redstat, 10b и ProofTotal. Развиваю продукты, пишу код и работаю с данными.",
    introSecond:
      "Ещё пишу для Forbes Казахстан и веду этот блог. Здесь про технологии, свои проекты и то, что получается по дороге.",
    skip: "К содержанию",
  },
  kz: {
    title: "Сәлем, мен Алмаспын.",
    intro:
      "Мен кәсіпкер және өнім аналитигімін. Маркетплейстермен жеті жылдан астам жұмыс істеп келемін: Wildberries пен Kaspi-де тауар саттым, ірі сатушыларға ассортиментті, бағаларды және деректерді талдауға көмектестім.",
    introSecond:
      "Қазір Redstat пен 10b жобаларын жасап жатырмын. Бұл жобаларда өнімге, аналитикаға және әзірлеуге жауап беремін. Сонымен қатар маркетплейстер, технология және экономика туралы Forbes Kazakhstan мен осы блогқа жазамын.",
    skip: "Мазмұнға өту",
  },
  en: {
    title: "Hi, I’m Almas.",
    intro:
      "I am an entrepreneur and product analyst. I have worked with marketplaces for more than seven years: selling on Wildberries and Kaspi, and helping large sellers make sense of assortment, pricing, and data.",
    introSecond:
      "Today I build Redstat and 10b, working across product, analytics, and development. I also write about marketplaces, technology, and the economy for Forbes Kazakhstan and this blog.",
    skip: "Skip to content",
  },
};

export function PersonalHome({ locale }: { locale: PersonalLocale }) {
  const copy = HOME_COPY[locale];

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--personal-paper)] text-[var(--personal-text)]">
      <a href="#main-content" className="skip-link">{copy.skip}</a>
      <div className="mx-auto grid min-h-screen min-w-0 w-full max-w-[1440px] lg:grid-cols-[228px_minmax(0,1fr)]">
        <PersonalSidebar locale={locale} />

        <main id="main-content" className="min-w-0 w-full bg-[var(--personal-paper)] px-5 pb-10 pt-10 sm:px-9 md:px-12 md:pb-14 md:pt-14 xl:px-20 xl:pt-16">
          <div className="max-w-[640px] xl:ml-16">
            <section id="about" aria-labelledby="about-title" className="scroll-mt-6 pb-12">
              <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                <Image
                  src="/avatar/almas.webp"
                  alt=""
                  width={72}
                  height={72}
                  priority
                  className="size-16 shrink-0 rounded-full object-cover object-[50%_16.5%] shadow-[0_0_0_1px_var(--personal-image-outline)] sm:size-[72px]"
                />
                <h1
                  id="about-title"
                  className="min-w-0 max-w-[500px] break-words text-balance font-heading text-[32px] sm:text-[38px] md:text-[40px]"
                  style={{ fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.025em" }}
                >
                  {copy.title}
                </h1>
              </div>

              <div className="mt-8 max-w-[620px] space-y-5 text-pretty text-[17px] font-normal leading-[1.65] text-[var(--personal-muted)] sm:text-[18px]">
                <p>{copy.intro}</p>
                <p>{copy.introSecond}</p>
              </div>

              <div className="mt-8">
                <PersonalSocialLinks locale={locale} />
              </div>
            </section>

            <PersonalProjects locale={locale} />
            <PersonalArticles locale={locale} />
            <PersonalResources locale={locale} />
            <PersonalFooter locale={locale} />
          </div>
        </main>
      </div>
    </div>
  );
}
