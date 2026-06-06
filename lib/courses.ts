// Course content config. Videos (Bunny Stream embed URLs) are pasted into `bunny`
// as they become available. Files live in Supabase Storage (wired later); for now
// `file` is the source filename under course-files/<lessonSlug>/.

export type CourseFile = {
  name: string;
  type: "slides" | "doc" | "csv" | "zip";
  file: string;
};

export type Lesson = {
  n: number;
  slug: string;
  title: string;
  desc: string;
  bunny: string; // Bunny Stream embed URL, e.g. https://iframe.mediadelivery.net/embed/<lib>/<id>
  files: CourseFile[];
};

export type Course = {
  title: string;
  tagline: string;
  lessons: Lesson[];
};

export const COURSE: Course = {
  title: "AI-аналитика маркетплейсов",
  tagline: "Поток 2 · 6 занятий",
  lessons: [
    {
      n: 1,
      slug: "zanyatie-1",
      title: "Собираем data-среду",
      desc: "VS Code · Claude Code · Obsidian — за два часа собираем рабочую data-среду.",
      bunny: "https://player.mediadelivery.net/embed/677544/3a684ce5-de26-4f65-ab74-6d4c211783c6?responsive=true",
      files: [{ name: "Слайды занятия", type: "slides", file: "slides.html" }],
    },
    {
      n: 2,
      slug: "zanyatie-2",
      title: "AI-First analytics",
      desc: "Claude бегает по Redstat и MPStats за вас: HQ — база знаний, Projects — где живёт работа.",
      bunny: "https://player.mediadelivery.net/embed/677544/aa108e14-2085-441c-a67e-93c9bcdffa6e?responsive=true",
      files: [
        { name: "Слайды занятия", type: "slides", file: "slides.html" },
        { name: "Промпт · создание context-pack", type: "doc", file: "prompt-create-context-pack.docx" },
        { name: "Промпт · WB Ads Analyzer", type: "doc", file: "prompt-wb-ads-analyzer.docx" },
        { name: "Redstat context-pack", type: "zip", file: "redstat-context-pack.zip" },
        { name: "WB · выбор ниши (CSV)", type: "csv", file: "wb-niche-selection.csv" },
        { name: "WB Analyzer · код-пак", type: "zip", file: "wb-analyzer-pack.zip" },
      ],
    },
    {
      n: 3,
      slug: "zanyatie-3",
      title: "Тренды Запада → внешний трафик СНГ",
      desc: "6 сервисов · 1 платформа доступа · единый workflow. Логика курса слой за слоем.",
      bunny: "https://player.mediadelivery.net/embed/677544/7936dc0a-e1e1-4936-9755-5103ba60fb87?responsive=true",
      files: [
        { name: "Слайды занятия", type: "slides", file: "slides.html" },
        { name: "Ресурсы и доступы", type: "doc", file: "resources.docx" },
      ],
    },
    {
      n: 4,
      slug: "zanyatie-4",
      title: "Логистика",
      desc: "Приглашённый гость по «белой» логистике: как возить из Китая по-белому и спать спокойно.",
      bunny: "https://player.mediadelivery.net/embed/677544/dffe247a-2dea-464e-bd4b-443c5ff038f7?responsive=true",
      files: [{ name: "Ресурсы и доступы", type: "doc", file: "resources.docx" }],
    },
    {
      n: 5,
      slug: "zanyatie-5",
      title: "Своя аналитика. На своих данных. За 15 минут",
      desc: "Свой дашборд: один Kaspi-токен → 365 дней истории, 8 разделов аналитики, твой URL.",
      bunny: "https://player.mediadelivery.net/embed/677544/6b84bbac-087f-4d97-ac57-b38dd72cdd33?responsive=true",
      files: [
        { name: "Слайды занятия", type: "slides", file: "slides.html" },
        { name: "Ресурсы и доступы", type: "doc", file: "resources.docx" },
        { name: "Niche Analytics · код-пак", type: "zip", file: "niche-analytics.zip" },
      ],
    },
    {
      n: 6,
      slug: "zanyatie-6",
      title: "MCP-коннектор к дашборду",
      desc: "Магазин в чате: подключаем дашборд к Claude в браузере и на телефоне.",
      bunny: "https://player.mediadelivery.net/embed/677544/cfabc098-3d52-4ced-bbdd-09d5c77c61fb?responsive=true",
      files: [
        { name: "Слайды занятия", type: "slides", file: "kaspi-mcp-connector-slides.html" },
        { name: "Kaspi MCP-коннектор · код-пак", type: "zip", file: "kaspi-mcp-connector.zip" },
      ],
    },
  ],
};

export function getLesson(slug: string) {
  return COURSE.lessons.find((l) => l.slug === slug);
}
