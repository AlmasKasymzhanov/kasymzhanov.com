import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndividual } from "@/lib/courses";
import { CourseFileView } from "@/components/course/course-views";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

interface Props {
  params: Promise<{ student: string; lesson: string; file: string }>;
}

export default async function Page({ params }: Props) {
  const { student, lesson, file } = await params;
  const course = getIndividual(student);
  if (!course) notFound();
  return <CourseFileView course={course} lessonSlug={lesson} file={file} />;
}
