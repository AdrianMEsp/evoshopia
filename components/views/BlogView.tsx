"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, CloseIcon } from "@/components/icons";
import {
  CatalogEmpty,
  CatalogError,
  CatalogSkeleton,
} from "@/components/views/CatalogFeedback";
import { BlogContent } from "@/components/views/BlogContent";
import { Reveal } from "@/components/ui/Reveal";
import { getBlogPosts, type BlogPost } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { useCatalog } from "@/lib/use-catalog";

type PaginationItem = number | `gap-${number}`;

function getPaginationItems(current: number, total: number): PaginationItem[] {
  const visible = new Set<number>([1, total, current - 1, current, current + 1]);

  if (current <= 3) {
    [2, 3, 4].forEach((page) => visible.add(page));
  }

  if (current >= total - 2) {
    [total - 3, total - 2, total - 1].forEach((page) => visible.add(page));
  }

  const pages = [...visible]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  const items: PaginationItem[] = [];
  let previous = 0;

  pages.forEach((page) => {
    if (previous && page - previous > 1) {
      items.push(`gap-${previous}`);
    }
    items.push(page);
    previous = page;
  });

  return items;
}

function BlogPagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  const baseClasses =
    "inline-flex size-10 items-center justify-center rounded-full border text-[0.9rem] font-bold transition duration-200 hover:cursor-pointer";

  return (
    <nav
      aria-label="Paginación del blog"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
        className={cn(
          baseClasses,
          "border-line bg-surface text-muted hover:border-brand/40 hover:text-ink",
          page <= 1 && "cursor-not-allowed opacity-40 hover:border-line hover:text-muted",
        )}
      >
        <ArrowRightIcon className="size-4 -rotate-180" />
      </button>

      {getPaginationItems(page, pageCount).map((item) =>
        typeof item === "number" ? (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={cn(
              baseClasses,
              item === page
                ? "brand-gradient border-transparent text-white shadow-[0_10px_24px_rgb(91_34_232_/_0.24)]"
                : "border-line bg-surface text-muted hover:border-brand/40 hover:text-ink",
            )}
          >
            {item}
          </button>
        ) : (
          <span key={item} aria-hidden="true" className="px-1 text-muted">
            …
          </span>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount}
        aria-label="Página siguiente"
        className={cn(
          baseClasses,
          "border-line bg-surface text-muted hover:border-brand/40 hover:text-ink",
          page >= pageCount &&
            "cursor-not-allowed opacity-40 hover:border-line hover:text-muted",
        )}
      >
        <ArrowRightIcon className="size-4" />
      </button>
    </nav>
  );
}

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

function BlogPostModal({
  post,
  onClose,
}: {
  post: BlogPost;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const dateLabel = formatDate(post.publishedAt);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-0 flex h-full w-full max-w-none items-center justify-center
       bg-transparent p-4 text-ink backdrop:bg-slate-950/55"
    >
      <section className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[24px] border border-line bg-surface shadow-[var(--shadow)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar publicación"
          className="absolute top-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface/90 text-muted transition hover:cursor-pointer hover:border-brand/40 hover:text-ink"
        >
          <CloseIcon className="size-5" />
        </button>

        <div className="relative h-56 overflow-hidden bg-brand/10 max-sm:h-40">
          {post.coverUrl ? (
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          ) : (
            <div aria-hidden="true" className="brand-gradient size-full opacity-20" />
          )}
        </div>

        <div className="p-[26px] max-sm:p-5">
          {dateLabel ? (
            <p className="text-[0.76rem] font-bold tracking-[0.06em] text-brand uppercase">
              {dateLabel}
            </p>
          ) : null}
          <h2 id={titleId} className="mt-2 pr-12 text-[1.75rem] leading-tight font-bold tracking-[-0.045em]">
            {post.title}
          </h2>
          <p className="mt-2.5 text-[0.96rem] text-muted">{post.excerpt}</p>
          {post.author ? (
            <p className="mt-4 text-[0.82rem] font-semibold text-ink">
              {post.author}
            </p>
          ) : null}
          <BlogContent content={post.content} />
        </div>
      </section>
    </dialog>
  );
}

export function BlogView() {
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const loadPosts = useCallback(() => getBlogPosts(page), [page]);
  const { data, loading, error, retry } = useCatalog(loadPosts);

  const posts = data?.posts ?? [];
  const pageCount = Math.max(1, data?.pageCount ?? 1);

  const goToPage = useCallback(
    (nextPage: number) => {
      if (nextPage < 1 || nextPage > pageCount || nextPage === page) return;
      setPage(nextPage);
    },
    [page, pageCount],
  );

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
    <>
      <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-3">
        {posts.map((post, index) => {
          const dateLabel = formatDate(post.publishedAt);

          return (
            <Reveal key={post.id} delay={index * 70} className="h-full">
              <article className="relative flex h-full flex-col overflow-hidden rounded-[22px] 
              border border-line bg-surface shadow-[var(--shadow-soft)] transition duration-200 
              hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[var(--shadow)]">
                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  aria-label={`Leer publicación: ${post.title}`}
                  className="absolute inset-0 z-10 rounded-[22px] hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                />
                <div className="relative h-44 overflow-hidden bg-brand/10 max-sm:h-36">
                  {post.coverUrl ? (
                    <Image
                      src={post.coverUrl}
                      alt={post.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="brand-gradient size-full opacity-20"
                    />
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
                  <p className="mt-2.5 text-[0.96rem] text-muted">
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

      <BlogPagination page={page} pageCount={pageCount} onChange={goToPage} />
      <p className="mt-3 text-center text-[0.8rem] text-muted">
        Página {page} de {pageCount}
      </p>
      {selectedPost ? (
        <BlogPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      ) : null}
    </>
  );
}
