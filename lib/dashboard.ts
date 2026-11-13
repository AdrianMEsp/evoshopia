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

interface CourseSummary {
  documentId: string;
}

interface CoursesResponse {
  data: CourseSummary[];
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
}

export interface DashboardData {
  courses: DashboardCourse[];
  lessons: DashboardLesson[];
}

const COURSES_QUERY =
  "/courses?fields[0]=documentId&sort[0]=publishedAt:desc&pagination[pageSize]=100";

function toOrder(value: number | null | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export async function getDashboardData(): Promise<DashboardData> {
  const response = await apiFetch<CoursesResponse>(COURSES_QUERY);
  const summaries = Array.isArray(response?.data) ? response.data : [];
  const courseResults = await Promise.allSettled(
    summaries
      .map((course) => course.documentId)
      .filter((documentId): documentId is string => Boolean(documentId))
      .map((documentId) =>
        apiFetch<StrapiCourse>(`/courses/${documentId}/content`),
      ),
  );

  const courses = courseResults
    .filter(
      (result): result is PromiseFulfilledResult<StrapiCourse> =>
        result.status === "fulfilled",
    )
    .map((result) => result.value);

  const normalizedCourses = courses.map((course) => {
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
    } satisfies DashboardCourse;
  });

  return {
    courses: normalizedCourses,
    lessons: normalizedCourses.flatMap((course) => course.lessons),
  };
}
