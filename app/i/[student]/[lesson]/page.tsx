import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndividual } from "@/lib/courses";
import { CourseLessonView } from "@/components/course/course-views";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

interface Props {
  params: Promise<{ student: string; lesson: string }>;
}

export default async function Page({ params }: Props) {
  const { student, lesson } = await params;
  const course = getIndividual(student);
  if (!course) notFound();
  return <CourseLessonView course={course} lessonSlug={lesson} />;
}
