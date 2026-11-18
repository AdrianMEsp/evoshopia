import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { apiFetch, resolveMediaUrl } from "@/lib/api";

interface StrapiMedia {
  url?: string | null;
}

interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  author?: string | null;
  publishedAt?: string | null;
  content?: BlocksContent | null;
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
}

interface CollectionResponse<T> {
  data?: T[] | null;
  meta?: {
    pagination?: {
      pageCount?: number;
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
  content: BlocksContent;
  coverUrl: string | null;
}

export interface BlogPageData {
  posts: BlogPost[];
  pageCount: number;
}

export const BLOG_PAGE_SIZE = 5;

export interface Course {
  id: string;
  name: string;
  slug: string;
  description: string;
  instructor: string | null;
  price: number;
  workload: number | null;
  coverUrl: string | null;
}

const blogQuery = (page: number) =>
  `/blogs?populate[coverImg][fields][0]=url&sort[0]=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${BLOG_PAGE_SIZE}`;

const COURSES_QUERY =
  "/courses?fields[0]=documentId&fields[1]=name&fields[2]=slug&fields[3]=description&fields[4]=instructor&fields[5]=price&fields[6]=workload&fields[7]=publishedAt&populate[coverImg][fields][0]=url&sort[0]=publishedAt:desc&pagination[pageSize]=100";

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
      slug: post.slug,
      excerpt: post.excerpt,
      author: post.author?.trim() || null,
      publishedAt: post.publishedAt ?? null,
      content: Array.isArray(post.content) ? post.content : [],
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

export async function getCourses(): Promise<Course[]> {
  const response = await apiFetch<CollectionResponse<StrapiCourse>>(
    COURSES_QUERY,
    { auth: false },
  );

  return (Array.isArray(response?.data) ? response.data : []).map((course) => ({
    id: toId(course.documentId ?? course.id),
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
  }));
}
