import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndividual } from "@/lib/courses";
import { CourseListView } from "@/components/course/course-views";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

interface Props {
  params: Promise<{ student: string }>;
}

export default async function Page({ params }: Props) {
  const { student } = await params;
  const course = getIndividual(student);
  if (!course) notFound();
  return <CourseListView course={course} />;
}
