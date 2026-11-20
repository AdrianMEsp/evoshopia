import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { apiFetch, resolveMediaUrl } from "@/lib/api";

interface StrapiMedia {
  url?: string | null;
}

interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string;
  slug?: string | null;
  subtitle?: string | null;
  excerpt?: string | null;
  author?: string | null;
  publishedAt?: string | null;
  content?: BlocksContent | string | null;
  coverImg?: StrapiMedia | null;
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
  publishedAt?: string | null;
  coverImg?: StrapiMedia | null;
  userHasAccess?: boolean | null;
  inUserCart?: boolean | null;
}

interface CollectionResponse<T> {
  data?: T[] | null;
  meta?: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string | null;
  publishedAt: string | null;
  content: BlocksContent | string;
  coverUrl: string | null;
}

export interface BlogPageData {
  posts: BlogPost[];
  pageCount: number;
}

export const BLOG_PAGE_SIZE = 5;

export interface Course {
  id: string;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  instructor: string | null;
  price: number;
  workload: number | null;
  coverUrl: string | null;
  userHasAccess: boolean;
  inUserCart: boolean;
}

const blogQuery = (page: number) =>
  `/blogs?populate=coverImg&sort[0]=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${BLOG_PAGE_SIZE}`;

const CATALOG_PAGE_SIZE = 30;
const MAX_CATALOG_PAGES = 20;

const catalogQuery = (page: number) =>
  `/catalog?page=${page}&pageSize=${CATALOG_PAGE_SIZE}&sort=newest`;

async function fetchCatalogPage(page: number) {
  return apiFetch<CollectionResponse<StrapiCourse>>(catalogQuery(page));
}

async function fetchCatalogCourses(): Promise<StrapiCourse[]> {
  const firstPage = await fetchCatalogPage(1);
  const courses = Array.isArray(firstPage?.data) ? firstPage.data : [];
  const pageCount = firstPage?.meta?.pagination?.pageCount ?? 1;
  const totalPages = Math.min(Math.max(1, pageCount), MAX_CATALOG_PAGES);

  if (totalPages <= 1) return courses;

  const remainingPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      fetchCatalogPage(index + 2),
    ),
  );

  return remainingPages.reduce<StrapiCourse[]>(
    (all, page) => all.concat(Array.isArray(page?.data) ? page.data : []),
    courses,
  );
}

function toId(value: string | number): string {
  return String(value);
}

export async function getBlogPosts(
  page = 1,
): Promise<BlogPageData> {
  const safePage = Number.isInteger(page) && page > 0 ? page : 1;
  const response = await apiFetch<CollectionResponse<StrapiBlogPost>>(
    blogQuery(safePage),
    { auth: false },
  );

  const posts = (Array.isArray(response?.data) ? response.data : []).map(
    (post) => ({
      id: toId(post.documentId ?? post.id),
      title: post.title,
      slug: post.slug ?? toId(post.documentId ?? post.id),
      excerpt: post.subtitle?.trim() || post.excerpt?.trim() || "",
      author: post.author?.trim() || null,
      publishedAt: post.publishedAt ?? null,
      content: post.content ?? [],
      coverUrl: resolveMediaUrl(post.coverImg?.url),
    }),
  );

  const pageCount = response?.meta?.pagination?.pageCount;

  return {
    posts,
    pageCount:
      typeof pageCount === "number" && pageCount > 0 ? pageCount : 1,
  };
}

function toCourse(course: StrapiCourse): Course {
  return {
    id: toId(course.documentId ?? course.id),
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
    userHasAccess: Boolean(course.userHasAccess),
    inUserCart: Boolean(course.inUserCart),
  };
}

export async function getCourses(): Promise<Course[]> {
  const courses = await fetchCatalogCourses();
  return courses.map(toCourse);
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const courses = await fetchCatalogCourses();
  const course = courses.find((item) => item.slug === slug);
  return course ? toCourse(course) : null;
}
