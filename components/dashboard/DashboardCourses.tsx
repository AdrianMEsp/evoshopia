import Link from "next/link";

import { ArrowRightIcon, iconMap, type IconName } from "@/components/icons";
import type { DashboardCourse } from "@/lib/dashboard";

const courseIcons: IconName[] = [
  "heart",
  "brain",
  "exchange",
  "ai",
  "lightbulb",
  "sparkles",
];

function describeCourse(course: DashboardCourse) {
  const parts: string[] = [];

  if (course.workload) {
    parts.push(`${course.workload} h de contenido`);
  }

  parts.push(
    `${course.lessonCount} ${course.lessonCount === 1 ? "lección" : "lecciones"}`,
  );

  return parts.join(" · ");
}

export function DashboardCourses({ courses }: { courses: DashboardCourse[] }) {
  return (
    <section id="cursos">
      <div className="mb-[18px] flex flex-wrap items-end justify-between gap-3 max-sm:mb-4">
        <div>
          <h2 className="text-[clamp(1.5rem,2.2vw,2rem)] leading-none font-bold tracking-[-0.04em]">
            Cursos disponibles
          </h2>
          <p className="mt-2 text-[0.96rem] text-muted">
            Contenidos publicados en tu programa de formación.
          </p>
        </div>
        <span className="rounded-full border border-line bg-surface px-3.5 py-2 text-[0.78rem] font-bold text-muted">
          {courses.length} {courses.length === 1 ? "curso" : "cursos"}
        </span>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-[20px] border border-dashed border-line bg-surface p-8 text-center text-[0.92rem] text-muted">
          Todavía no hay cursos publicados.
        </div>
      ) : (
        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => {
            const Icon = iconMap[courseIcons[index % courseIcons.length]];

            return (
              <article
                key={course.documentId}
                className="flex h-full flex-col rounded-[20px] border border-line bg-surface p-[22px] shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1.5 hover:shadow-[var(--shadow)] max-sm:p-[18px]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
                    <Icon className="size-5" />
                  </span>
                  <span className="rounded-full border border-line bg-surface-2 px-3 py-1 text-[0.7rem] font-extrabold tracking-[0.04em] text-muted uppercase">
                    Curso
                  </span>
                </div>

                <h3 className="mt-4 text-[1.12rem] leading-tight font-bold tracking-[-0.04em]">
                  {course.name}
                </h3>
                <p className="mt-2.5 grow text-[0.9rem] text-muted">
                  {course.description}
                </p>

                <div className="mt-4 space-y-1 text-[0.8rem] text-muted">
                  {course.instructor ? (
                    <p className="font-semibold text-ink">
                      {course.instructor}
                    </p>
                  ) : null}
                  <p>{describeCourse(course)}</p>
                </div>

                <Link
                  href="#lecciones"
                  className="mt-4 inline-flex items-center gap-2 self-start text-[0.9rem] font-bold text-brand transition hover:gap-3 max-sm:mt-5 max-sm:w-full max-sm:justify-center max-sm:rounded-full max-sm:border max-sm:border-brand/30 max-sm:bg-brand/5 max-sm:py-3"
                >
                  Ver lecciones
                  <ArrowRightIcon className="size-4" />
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
