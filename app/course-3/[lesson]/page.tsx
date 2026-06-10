import type { Metadata } from "next";
import { STREAM3 } from "@/lib/courses";
import { CourseLessonView } from "@/components/course/course-views";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ lesson: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lesson } = await params;
  const l = STREAM3.lessons.find((x) => x.slug === lesson);
  return {
    title: l ? `${l.title} — ${STREAM3.title}` : STREAM3.title,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: Props) {
  const { lesson } = await params;
  return <CourseLessonView course={STREAM3} lessonSlug={lesson} />;
}
