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
      bunny: "",
      files: [{ name: "Слайды занятия", type: "slides", file: "slides.html" }],
    },
    {
      n: 2,
      slug: "zanyatie-2",
      title: "AI-First analytics",
      desc: "Claude бегает по Redstat и MPStats за вас: HQ — база знаний, Projects — где живёт работа.",
      bunny: "",
      files: [
        { name: "Слайды занятия", type: "slides", file: "slides.html" },
        { name: "Промпт · создание context-pack", type: "doc", file: "prompt-create-context-pack.docx" },
        { name: "Промпт · WB Ads Analyzer", type: "doc", file: "prompt-wb-ads-analyzer.docx" },
        { name: "Redstat context-pack", type: "zip", file: "redstat-context-pack.zip" },
        { name: "WB · выбор ниши (CSV)", type: "csv", file: "WB - выбор ниши - 31.03.2026.csv" },
        { name: "WB Analyzer · код-пак", type: "zip", file: "wb-analyzer-pack.zip" },
      ],
    },
    {
      n: 3,
      slug: "zanyatie-3",
      title: "Тренды Запада → внешний трафик СНГ",
      desc: "6 сервисов · 1 платформа доступа · единый workflow. Логика курса слой за слоем.",
      bunny: "",
      files: [
        { name: "Слайды занятия", type: "slides", file: "slides.html" },
        { name: "Ресурсы и доступы", type: "doc", file: "Ресурсы и доступы.docx" },
      ],
    },
    {
      n: 4,
      slug: "zanyatie-4",
      title: "Логистика",
      desc: "Приглашённый гость по «белой» логистике: как возить из Китая по-белому и спать спокойно.",
      bunny: "",
      files: [{ name: "Ресурсы и доступы", type: "doc", file: "Ресурсы и доступы.docx" }],
    },
    {
      n: 5,
      slug: "zanyatie-5",
      title: "Своя аналитика. На своих данных. За 15 минут",
      desc: "Свой дашборд: один Kaspi-токен → 365 дней истории, 8 разделов аналитики, твой URL.",
      bunny: "",
      files: [
        { name: "Слайды занятия", type: "slides", file: "slides.html" },
        { name: "Ресурсы и доступы", type: "doc", file: "Ресурсы и доступы.docx" },
        { name: "Niche Analytics · код-пак", type: "zip", file: "niche-analytics.zip" },
      ],
    },
    {
      n: 6,
      slug: "zanyatie-6",
      title: "MCP-коннектор к дашборду",
      desc: "Магазин в чате: подключаем дашборд к Claude в браузере и на телефоне.",
      bunny: "",
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
