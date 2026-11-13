"use client";

import { useState } from "react";

import { PlayIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import type { DashboardLesson } from "@/lib/dashboard";

export function LessonLibrary({ lessons }: { lessons: DashboardLesson[] }) {
  const [category, setCategory] = useState("Todos");
  const courseNames = Array.from(new Set(lessons.map((lesson) => lesson.courseName)));
  const categories = ["Todos", ...courseNames];
  const activeCategory = categories.includes(category) ? category : "Todos";
  const visible =
    activeCategory === "Todos"
      ? lessons
      : lessons.filter((lesson) => lesson.courseName === activeCategory);

   return (
    <section id="lecciones">
      <div className="mb-[18px] flex flex-wrap items-end justify-between gap-3 max-sm:mb-4">
        <div>
          <h2 className="text-[clamp(1.5rem,2.2vw,2rem)] leading-none font-bold tracking-[-0.04em]">
            Lecciones de tus cursos
          </h2>
          <p className="mt-2 text-[0.96rem] text-muted">
            Contenidos y secciones cargados desde la base de datos.
          </p>
        </div>
      </div>

      {lessons.length === 0 ? (
        <div className="rounded-[20px] border border-dashed border-line bg-surface p-8 text-center text-[0.92rem] text-muted">
          Todavía no hay lecciones publicadas.
        </div>
      ) : (
        <>
          <div
            role="tablist"
            aria-label="Filtrar lecciones por curso"
            className="mb-5 flex flex-wrap gap-2 max-sm:mb-4 max-sm:flex-nowrap max-sm:overflow-x-auto max-sm:pb-2.5 max-sm:snap-x max-sm:snap-proximity max-sm:[scrollbar-width:thin] max-sm:[&::-webkit-scrollbar]:h-1.5 max-sm:[&::-webkit-scrollbar]:bg-transparent max-sm:[&::-webkit-scrollbar-thumb]:rounded-full max-sm:[&::-webkit-scrollbar-thumb]:bg-[#c9d1dc]"
          >
            {categories.map((item) => {
              const isActive = item === activeCategory;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(item)}
                  className={cn(
                    "shrink-0 snap-start rounded-full border px-4 py-2 text-[0.84rem] font-bold transition hover:cursor-pointer",
                    isActive
                      ? "border-transparent brand-gradient text-white shadow-[0_10px_24px_rgb(91_34_232_/_0.2)]"
                      : "border-line bg-surface text-muted hover:-translate-y-0.5 hover:border-brand/40 hover:text-ink",
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((lesson) => (
              <article
                key={`${lesson.courseDocumentId}-${lesson.id}`}
                className="flex h-full flex-col rounded-[20px] border border-line bg-surface p-[18px] shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1.5 hover:shadow-[var(--shadow)] max-sm:p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
                    <PlayIcon className="size-[18px] translate-x-0.5" />
                  </span>
                  <span className="max-w-[65%] truncate rounded-full border border-line bg-surface-2 px-3 py-1 text-[0.7rem] font-extrabold tracking-[0.04em] text-muted uppercase">
                    {lesson.courseName}
                  </span>
                </div>

                <h3 className="mt-4 text-[1.02rem] leading-tight font-bold tracking-[-0.03em]">
                  {lesson.title}
                </h3>
                <p className="mt-2 grow text-[0.88rem] text-muted">
                  {lesson.description}
                </p>

                <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-line pt-3 text-[0.78rem] text-muted">
                  <span className="truncate font-semibold text-ink">
                    {lesson.sectionTitle}
                  </span>
                  <span className="shrink-0">
                    {lesson.order > 0 ? `Lección ${lesson.order}` : "Lección"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
