import type { Metadata } from "next";
import { STREAM3 } from "@/lib/courses";
import { CourseListView } from "@/components/course/course-views";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${STREAM3.title} — Поток 3`,
  description: "Закрытый курс: видео-сессии и материалы третьего потока.",
  robots: { index: false, follow: false },
};

export default function Course3Page() {
  return <CourseListView course={STREAM3} />;
}
