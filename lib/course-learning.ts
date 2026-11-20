import type { BlocksContent } from "@strapi/blocks-react-renderer";

import { apiFetch, resolveMediaUrl } from "@/lib/api";

interface StrapiMedia {
  url?: string | null;
}

interface StrapiLesson {
  documentId: string;
  title: string;
  description: string;
  content: BlocksContent | string | null;
  order?: number | null;
}

interface StrapiCourseSection {
  documentId: string;
  title: string;
  order?: number | null;
  lessons?: StrapiLesson[] | null;
}

interface StrapiCourse {
  documentId: string;
  name: string;
  slug: string;
  description: string;
  instructor?: string | null;
  workload?: number | null;
  coverImg?: StrapiMedia | null;
  course_sections?: StrapiCourseSection[] | null;
}

interface CourseProgress {
  completedLessonIds: string[];
  totalLessons: number;
  completedLessons: number;
  percentage: number;
}

export interface CourseLearningLesson {
  documentId: string;
  title: string;
  description: string;
  content: BlocksContent | string | null;
  order: number;
  sectionTitle: string;
  completed: boolean;
}

export interface CourseLearningSection {
  documentId: string;
  title: string;
  lessons: CourseLearningLesson[];
}

export interface CourseLearningData {
  documentId: string;
  name: string;
  slug: string;
  description: string;
  instructor: string | null;
  workload: number | null;
  coverUrl: string | null;
  sections: CourseLearningSection[];
  lessons: CourseLearningLesson[];
  currentLessonId: string | null;
  completedLessons: number;
  totalLessons: number;
  percentage: number;
}

export interface LessonPlayback {
  playbackId: string;
  token: string;
  playbackUrl: string;
  expiresAt: string;
}

interface CompleteLessonResponse {
  completed: boolean;
  alreadyCompleted: boolean;
  completedAt: string;
}

function toOrder(value: number | null | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export async function getCourseLearningData(
  courseDocumentId: string,
): Promise<CourseLearningData> {
  const encodedId = encodeURIComponent(courseDocumentId);
  const [course, progress] = await Promise.all([
    apiFetch<StrapiCourse>(`/courses/${encodedId}/content`),
    apiFetch<CourseProgress>(`/courses/${encodedId}/progress`),
  ]);

  const completedLessonIds = new Set(progress.completedLessonIds ?? []);

  const sections = [...(course.course_sections ?? [])]
    .sort((a, b) => toOrder(a.order) - toOrder(b.order))
    .map<CourseLearningSection>((section) => ({
      documentId: section.documentId,
      title: section.title,
      lessons: [...(section.lessons ?? [])]
        .sort((a, b) => toOrder(a.order) - toOrder(b.order))
        .map<CourseLearningLesson>((lesson) => ({
          documentId: lesson.documentId,
          title: lesson.title,
          description: lesson.description,
          content: lesson.content,
          order: toOrder(lesson.order),
          sectionTitle: section.title,
          completed: completedLessonIds.has(lesson.documentId),
        })),
    }));

  const lessons = sections.flatMap((section) => section.lessons);

  return {
    documentId: course.documentId,
    name: course.name,
    slug: course.slug,
    description: course.description,
    instructor: course.instructor?.trim() || null,
    workload:
      typeof course.workload === "number" && Number.isFinite(course.workload)
        ? course.workload
        : null,
    coverUrl: resolveMediaUrl(course.coverImg?.url),
    sections,
    lessons,
    currentLessonId: lessons.find((lesson) => !lesson.completed)?.documentId ?? null,
    completedLessons: progress.completedLessons,
    totalLessons: progress.totalLessons,
    percentage: progress.percentage,
  };
}

export function getLessonPlayback(lessonDocumentId: string) {
  return apiFetch<LessonPlayback>(
    `/lessons/${encodeURIComponent(lessonDocumentId)}/playback`,
  );
}

export function completeLesson(lessonDocumentId: string) {
  return apiFetch<CompleteLessonResponse>(
    `/lessons/${encodeURIComponent(lessonDocumentId)}/complete`,
    { method: "POST" },
  );
}
