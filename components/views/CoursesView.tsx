"use client";

import Image from "next/image";
import {
  CatalogEmpty,
  CatalogError,
  CatalogSkeleton,
} from "@/components/views/CatalogFeedback";
import { Reveal } from "@/components/ui/Reveal";
import { getCourses } from "@/lib/catalog";
import { useCatalog } from "@/lib/use-catalog";

const priceFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function CoursesView() {
  const { data: courses, loading, error, retry } = useCatalog(getCourses);
  const courseList = courses ?? [];

  if (loading) return <CatalogSkeleton />;

  if (error) return <CatalogError message={error} onRetry={retry} />;

  if (courseList.length === 0) {
    return (
      <CatalogEmpty
        title="Todavía no hay cursos publicados"
        text="Los cursos disponibles se mostrarán aquí en cuanto se publiquen desde el panel de administración."
      />
    );
  }

  return (
    <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
      {courseList.map((course, index) => (
        <Reveal key={course.id} delay={index * 70} className="h-full">
          <article className="flex h-full flex-col overflow-hidden rounded-[22px] 
          border border-line bg-surface
          shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1.5 
          hover:cursor-pointer hover:border-purple-600 hover:shadow-[var(--shadow)]">
            <div className="relative h-48 overflow-hidden bg-brand/10 max-sm:h-40">
              {course.coverUrl ? (
                <Image
                  src={course.coverUrl}
                  alt={course.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
              <h3 className="text-[1.25rem] leading-tight font-bold tracking-[-0.045em]">
                {course.name}
              </h3>
              <p className="mt-2.5 grow text-[0.96rem] text-muted">
                {course.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.82rem] text-muted">
                {course.instructor ? (
                  <p className="font-semibold text-ink">{course.instructor}</p>
                ) : null}
                {course.workload ? (
                  <p>{course.workload} h de contenido</p>
                ) : null}
              </div>

              <p className="mt-5 border-t border-line pt-4 text-[1.3rem] font-bold tracking-[-0.04em] text-brand">
                {priceFormatter.format(course.price)}
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
