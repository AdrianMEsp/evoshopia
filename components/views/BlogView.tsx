"use client";

import Image from "next/image";
import {
  CatalogEmpty,
  CatalogError,
  CatalogSkeleton,
} from "@/components/views/CatalogFeedback";
import { Reveal } from "@/components/ui/Reveal";
import { getBlogPosts } from "@/lib/catalog";
import { useCatalog } from "@/lib/use-catalog";

function formatDate(value: string | null): string | null {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function BlogView() {
  const { items: posts, loading, error, retry } = useCatalog(getBlogPosts);

  if (loading) return <CatalogSkeleton />;

  if (error) return <CatalogError message={error} onRetry={retry} />;

  if (posts.length === 0) {
    return (
      <CatalogEmpty
        title="Todavía no hay publicaciones"
        text="Cuando el equipo publique artículos desde el panel de administración, aparecerán aquí automáticamente."
      />
    );
  }

  return (
    <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => {
        const dateLabel = formatDate(post.publishedAt);

        return (
          <Reveal key={post.id} delay={index * 70} className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-surface shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1.5 hover:shadow-[var(--shadow)]">
              <div className="relative h-44 overflow-hidden bg-brand/10 max-sm:h-36">
                {post.coverUrl ? (
                  <Image
                    src={post.coverUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div aria-hidden="true" className="brand-gradient size-full opacity-20" />
                )}
              </div>

              <div className="flex grow flex-col p-[26px] max-sm:p-5">
                {dateLabel ? (
                  <p className="text-[0.76rem] font-bold tracking-[0.06em] text-brand uppercase">
                    {dateLabel}
                  </p>
                ) : null}
                <h3 className="mt-2 text-[1.25rem] leading-tight font-bold tracking-[-0.045em]">
                  {post.title}
                </h3>
                <p className="mt-2.5 grow text-[0.96rem] text-muted">
                  {post.excerpt}
                </p>
                {post.author ? (
                  <p className="mt-4 text-[0.82rem] font-semibold text-ink">
                    {post.author}
                  </p>
                ) : null}
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
