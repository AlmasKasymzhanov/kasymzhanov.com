import Image from "next/image";
import { ProjectDetails } from "@/components/project-details";
import type { PersonalLocale } from "@/lib/personal-locale";

type ProjectMetric = {
  value: string;
  label: string;
};

type ProjectLogo = {
  onDark: string;
  onLight: string;
  treatment: "mark" | "wordmark" | "badge";
};

type PersonalProject = {
  id: "project-redstat" | "project-10b" | "project-prooftotal";
  name: string;
  href?: string;
  period?: string;
  disciplines: string;
  description: string;
  logo: ProjectLogo;
  metrics: ProjectMetric[];
  note?: string;
  clients?: string[];
};

const PROJECTS: Record<PersonalLocale, PersonalProject[]> = {
  ru: [
    {
      id: "project-redstat",
      name: "Redstat",
      href: "https://redstat.kz",
      period: "2026 — сейчас",
      disciplines: "Продукт · Разработка · Data · AI",
      description:
        "Платформа аналитики Kaspi. ML-модели прогнозируют выручку, продажи и конкуренцию, а Red Agent помогает находить ниши и оценивать экономику товара.",
      logo: {
        onDark: "/logos/redstat-white.png",
        onLight: "/logos/redstat-black.png",
        treatment: "mark",
      },
      metrics: [
        { value: "1,2 млн+", label: "товаров" },
        { value: "1,6 млрд+", label: "записей о заказах" },
        { value: "1 774", label: "пользователя" },
        { value: "432", label: "активных в месяц" },
      ],
      note: "Red Agent и MCP обработали 63 641 запрос за последние 30 дней.",
    },
    {
      id: "project-10b",
      name: "10b",
      href: "https://10b.kz",
      period: "2025 — сейчас",
      disciplines: "Продукт · Разработка · Data · AI",
      description:
        "Поиск и аналитика лотов Госзакупа и Самрук-Казына. ML оценивает маржу и конкуренцию, а Kepler AI и MCP разбирают техспецификации, заказчиков и риски.",
      logo: {
        onDark: "/logos/10b-white.svg",
        onLight: "/logos/10b-black.svg",
        treatment: "wordmark",
      },
      metrics: [
        { value: "23,7 тыс.", label: "посетителей" },
        { value: "108,6 тыс.", label: "просмотров страниц" },
        { value: "4,6", label: "страницы на посетителя" },
      ],
    },
    {
      id: "project-prooftotal",
      name: "ProofTotal",
      disciplines: "Продукт · Разработка · Data · AI · Интеграции",
      description: "Аналитика и интеграция бизнес-систем. Сверяем данные из разных источников, находим расхождения и помогаем разобраться в их причинах.",
      clients: ["L'Oréal Paris Kazakhstan", "Mechta Market", "Halyk Market"],
      logo: { onDark: "/logos/prooftotal-badge.svg", onLight: "/logos/prooftotal-badge.svg", treatment: "badge" },
      metrics: [],
    },
  ],
  kz: [
    {
      id: "project-redstat",
      name: "Redstat",
      href: "https://redstat.kz",
      period: "2026 — қазір",
      disciplines: "Өнім · Әзірлеу · Data · AI",
      description:
        "Kaspi аналитикасына арналған платформа. ML-модельдер түсімді, сатылымды және бәсекені болжайды, ал Red Agent тауашаларды табуға және тауар экономикасын бағалауға көмектеседі.",
      logo: {
        onDark: "/logos/redstat-white.png",
        onLight: "/logos/redstat-black.png",
        treatment: "mark",
      },
      metrics: [
        { value: "1,2 млн+", label: "тауар" },
        { value: "1,6 млрд+", label: "тапсырыс жазбасы" },
        { value: "1 774", label: "пайдаланушы" },
        { value: "432", label: "ай сайын белсенді" },
      ],
      note: "Соңғы 30 күнде Red Agent пен MCP 63 641 сұрауды өңдеді.",
    },
    {
      id: "project-10b",
      name: "10b",
      href: "https://10b.kz",
      period: "2025 — қазір",
      disciplines: "Өнім · Әзірлеу · Data · AI",
      description:
        "Мемлекеттік сатып алу және Самұрық-Қазына лоттарын іздеу мен талдау. ML маржа мен бәсекені бағалайды, ал Kepler AI және MCP техникалық сипаттамаларды, тапсырыс берушілерді және тәуекелдерді талдайды.",
      logo: {
        onDark: "/logos/10b-white.svg",
        onLight: "/logos/10b-black.svg",
        treatment: "wordmark",
      },
      metrics: [
        { value: "23,7 мың", label: "келуші" },
        { value: "108,6 мың", label: "бет қаралымы" },
        { value: "4,6", label: "бір келушіге шаққандағы бет" },
      ],
    },
    {
      id: "project-prooftotal",
      name: "ProofTotal",
      disciplines: "Өнім · Әзірлеу · Data · AI · Интеграциялар",
      description: "Аналитика және бизнес-жүйелерді біріктіру. Әртүрлі дереккөздердегі мәліметтерді салыстырып, сәйкессіздіктерді табамыз және олардың себептерін анықтауға көмектесеміз.",
      clients: ["L'Oréal Paris Kazakhstan", "Mechta Market", "Halyk Market"],
      logo: { onDark: "/logos/prooftotal-badge.svg", onLight: "/logos/prooftotal-badge.svg", treatment: "badge" },
      metrics: [],
    },
  ],
  en: [
    {
      id: "project-redstat",
      name: "Redstat",
      href: "https://redstat.kz",
      period: "2026 — present",
      disciplines: "Product · Development · Data · AI",
      description:
        "Kaspi analytics platform. ML models forecast revenue, sales, and competition; Red Agent helps sellers find niches and assess unit economics.",
      logo: {
        onDark: "/logos/redstat-white.png",
        onLight: "/logos/redstat-black.png",
        treatment: "mark",
      },
      metrics: [
        { value: "1.2M+", label: "products" },
        { value: "1.6B+", label: "order records" },
        { value: "1,774", label: "registered users" },
        { value: "432", label: "monthly active users" },
      ],
      note: "Red Agent and MCP handled 63,641 requests over the latest 30 complete days.",
    },
    {
      id: "project-10b",
      name: "10b",
      href: "https://10b.kz",
      period: "2025 — present",
      disciplines: "Product · Development · Data · AI",
      description:
        "Search and analytics for Kazakhstan’s public procurement and Samruk-Kazyna lots. ML estimates margins and competition; Kepler AI and MCP analyze specifications, buyers, and risks.",
      logo: {
        onDark: "/logos/10b-white.svg",
        onLight: "/logos/10b-black.svg",
        treatment: "wordmark",
      },
      metrics: [
        { value: "23.7K", label: "visitors" },
        { value: "108.6K", label: "page views" },
        { value: "4.6", label: "pages per visitor" },
      ],
    },
    {
      id: "project-prooftotal",
      name: "ProofTotal",
      disciplines: "Product · Development · Data · AI · Integrations",
      description: "Analytics and business systems integration. We reconcile data across sources, find discrepancies, and help explain their causes.",
      clients: ["L'Oréal Paris Kazakhstan", "Mechta Market", "Halyk Market"],
      logo: { onDark: "/logos/prooftotal-badge.svg", onLight: "/logos/prooftotal-badge.svg", treatment: "badge" },
      metrics: [],
    },
  ],
};

function ProjectLogo({ logo }: { logo: ProjectLogo }) {
  if (logo.treatment === "badge") {
    return <Image src={logo.onDark} alt="" width={32} height={32} className="size-8 shrink-0 rounded-[7px]" />;
  }

  const imageClassName =
    logo.treatment === "mark"
      ? "absolute left-0 top-0 h-[18px] w-auto max-w-none"
      : "h-auto w-[23px]";

  const images = (
    <>
      <Image
        src={logo.onDark}
        alt=""
        width={logo.treatment === "mark" ? 2263 : 1078}
        height={logo.treatment === "mark" ? 380 : 390}
        className={`personal-project-logo-on-dark ${imageClassName}`}
      />
      <Image
        src={logo.onLight}
        alt=""
        width={logo.treatment === "mark" ? 2263 : 1078}
        height={logo.treatment === "mark" ? 380 : 390}
        className={`personal-project-logo-on-light ${imageClassName}`}
      />
    </>
  );

  return (
    <span
      aria-hidden="true"
      className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[7px] bg-[var(--personal-rail-hover)] transition-colors duration-[120ms] group-hover:bg-[var(--personal-rail-active)]"
    >
      {logo.treatment === "mark" ? (
        <span className="relative size-[18px] overflow-hidden">{images}</span>
      ) : (
        images
      )}
    </span>
  );
}

export function PersonalProjects({ locale }: { locale: PersonalLocale }) {
  const projects = PROJECTS[locale];
  const sectionTitle = locale === "en" ? "Projects" : locale === "kz" ? "Жобалар" : "Проекты";
  const newTabLabel =
    locale === "en"
      ? " (opens in a new tab)"
      : locale === "kz"
        ? " (жаңа қойындыда ашылады)"
        : " (откроется в новой вкладке)";

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-8 pb-16 pt-5">
      <h2 id="projects-title" className="text-[18px] font-normal leading-6 tracking-[-0.012em]">
        {sectionTitle}
      </h2>

      <ul className="mt-6 space-y-1">
        {projects.map((project) => (
          <li key={project.id} id={project.id} className="scroll-mt-8">
            <ProjectDetails
              id={project.id}
              name={project.name}
              disciplines={project.disciplines}
              href={project.href}
              newTabLabel={newTabLabel}
              detailsLabel={locale === "en" ? "Details" : locale === "kz" ? "Толығырақ" : "Подробнее"}
              visitLabel={locale === "en" ? "Visit" : locale === "kz" ? "Сайтқа өту:" : "Перейти на"}
              logo={<ProjectLogo logo={project.logo} />}
            >
              <p>{project.description}</p>
              {project.period && <p className="mt-2">{project.period}</p>}
              {project.metrics.length > 0 && (
                <p className="mt-2">{project.metrics.map((metric) => `${metric.value} ${metric.label}`).join(" · ")}</p>
              )}
              {project.note && <p className="mt-2">{project.note}</p>}
              {project.clients && (
                <p className="mt-3">
                  <span className="text-[var(--personal-text)]">{locale === "en" ? "Clients" : locale === "kz" ? "Клиенттер" : "Среди клиентов"}:</span>{" "}
                  {project.clients.join(", ")}{locale === "en" ? ", and others." : locale === "kz" ? " және басқалар." : " и другие."}
                </p>
              )}
            </ProjectDetails>
          </li>
        ))}
      </ul>
    </section>
  );
}
