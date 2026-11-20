import type { Metadata } from "next";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { CourseLearningView } from "@/components/views/CourseLearningView";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Mi curso | ${site.name}`,
  description: "Continúa tu curso desde la última lección pendiente.",
};

export default async function CourseLearningPage({
  params,
  searchParams,
}: {
  params: Promise<{ documentId: string }>;
  searchParams: Promise<{ lesson?: string | string[] }>;
}) {
  const { documentId } = await params;
  const { lesson } = await searchParams;
  const requestedLessonId = Array.isArray(lesson) ? lesson[0] : lesson;

  return (
    <RequireAuth>
      <Container className="py-8 max-sm:py-5 lg:py-10">
        <CourseLearningView
          courseDocumentId={documentId}
          requestedLessonId={requestedLessonId}
        />
      </Container>
    </RequireAuth>
  );
}
