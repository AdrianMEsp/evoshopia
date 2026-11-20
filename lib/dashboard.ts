import { apiFetch, resolveMediaUrl } from "@/lib/api";

interface StrapiMedia {
  url?: string | null;
}

interface StrapiLesson {
  id: number;
  documentId: string;
  title: string;
  description: string;
  order?: number | null;
}

interface StrapiCourseSection {
  id: number;
  documentId: string;
  title: string;
  description: string;
  order?: number | null;
  lessons?: StrapiLesson[] | null;
}

interface StrapiCourse {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  instructor?: string | null;
  price: number;
  workload?: number | null;
  coverImg?: StrapiMedia | null;
  course_sections?: StrapiCourseSection[] | null;
}

interface CatalogCourse {
  documentId: string;
  userHasAccess?: boolean | null;
}

interface CatalogResponse {
  data: CatalogCourse[];
  meta?: { pagination?: { pageCount?: number } };
}

interface CourseProgress {
  totalLessons: number;
  completedLessons: number;
  percentage: number;
  completedLessonIds: string[];
}

export interface DashboardLesson {
  id: number;
  documentId: string;
  title: string;
  description: string;
  order: number;
  courseName: string;
  courseDocumentId: string;
  courseSlug: string;
  sectionTitle: string;
}

export interface DashboardCourse {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  instructor: string | null;
  price: number;
  workload: number | null;
  coverUrl: string | null;
  lessonCount: number;
  lessons: DashboardLesson[];
  progress: CourseProgress | null;
  currentLesson: DashboardLesson | null;
}

export interface DashboardData {
  courses: DashboardCourse[];
  lessons: DashboardLesson[];
}

const CATALOG_PAGE_SIZE = 30;

const catalogQuery = (page: number) =>
  `/catalog?page=${page}&pageSize=${CATALOG_PAGE_SIZE}&sort=newest`;

function toOrder(value: number | null | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

async function getAccessibleCourseIds(): Promise<string[]> {
  const firstPage = await apiFetch<CatalogResponse>(catalogQuery(1));
  const pageCount = firstPage.meta?.pagination?.pageCount ?? 1;
  const remainingPages = await Promise.all(
    Array.from({ length: Math.max(pageCount - 1, 0) }, (_, index) =>
      apiFetch<CatalogResponse>(catalogQuery(index + 2)),
    ),
  );

  return [firstPage, ...remainingPages]
    .flatMap((page) => (Array.isArray(page.data) ? page.data : []))
    .filter((course) => course.userHasAccess)
    .map((course) => course.documentId)
    .filter((documentId): documentId is string => Boolean(documentId));
}

export async function getDashboardData(): Promise<DashboardData> {
  const documentIds = await getAccessibleCourseIds();
  const courseResults = await Promise.allSettled(
    documentIds.map(async (documentId) => {
      const [course, progress] = await Promise.all([
        apiFetch<StrapiCourse>(`/courses/${documentId}/content`),
        apiFetch<CourseProgress>(`/courses/${documentId}/progress`).catch(
          () => null,
        ),
      ]);
      return { course, progress };
    }),
  );

  const courses = courseResults
    .filter(
      (
        result,
      ): result is PromiseFulfilledResult<{
        course: StrapiCourse;
        progress: CourseProgress | null;
      }> => result.status === "fulfilled",
    )
    .map((result) => result.value);

  const normalizedCourses = courses.map(({ course, progress }) => {
    const sections = [...(course.course_sections ?? [])].sort(
      (a, b) => toOrder(a.order) - toOrder(b.order),
    );

    const lessons = sections.flatMap((section) =>
      [...(section.lessons ?? [])]
        .sort((a, b) => toOrder(a.order) - toOrder(b.order))
        .map<DashboardLesson>((lesson) => ({
          id: lesson.id,
          documentId: lesson.documentId,
          title: lesson.title,
          description: lesson.description,
          order: toOrder(lesson.order),
          courseName: course.name,
          courseDocumentId: course.documentId,
          courseSlug: course.slug,
          sectionTitle: section.title,
        })),
    );

    const completedLessonIds = new Set(progress?.completedLessonIds ?? []);
    const currentLesson =
      lessons.find((lesson) => !completedLessonIds.has(lesson.documentId)) ??
      null;

    return {
      id: course.id,
      documentId: course.documentId,
      name: course.name,
      slug: course.slug,
      description: course.description,
      instructor: course.instructor?.trim() || null,
      price: Number.isFinite(course.price) ? course.price : 0,
      workload:
        typeof course.workload === "number" && Number.isFinite(course.workload)
          ? course.workload
          : null,
      coverUrl: resolveMediaUrl(course.coverImg?.url),
      lessonCount: lessons.length,
      lessons,
      progress,
      currentLesson,
    } satisfies DashboardCourse;
  });

  return {
    courses: normalizedCourses,
    lessons: normalizedCourses.flatMap((course) => course.lessons),
  };
}
