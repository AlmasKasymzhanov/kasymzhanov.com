import type { Metadata } from "next";
import { STREAM3 } from "@/lib/courses";
import { CourseFileView } from "@/components/course/course-views";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

interface Props {
  params: Promise<{ lesson: string; file: string }>;
}

export default async function Page({ params }: Props) {
  const { lesson, file } = await params;
  return <CourseFileView course={STREAM3} lessonSlug={lesson} file={file} />;
}
