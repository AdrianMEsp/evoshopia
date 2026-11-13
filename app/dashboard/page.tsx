import type { Metadata } from "next";
import { ArrowRightIcon, iconMap } from "@/components/icons";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardGreeting } from "@/components/dashboard/DashboardGreeting";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { VideoLibrary } from "@/components/dashboard/VideoLibrary";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { dashboardCourses, dashboardNotice } from "@/content/dashboard";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Mi espacio | ${site.name}`,
  description: "Vista preliminar del dashboard de formación de Evosistencia.",
};

export default function DashboardPage() {
  return (
    <RequireAuth>
      <Container className="py-8 max-sm:py-5 lg:py-10">
        <div className="grid gap-[22px] max-sm:gap-4 lg:grid-cols-[264px_1fr]">
          <DashboardNav />

          <div className="min-w-0 space-y-8 max-sm:space-y-6">
            <Reveal>
              <DashboardGreeting />
            </Reveal>

          <Reveal>
            <section id="cursos">
              <div className="mb-[18px] flex flex-wrap items-end justify-between gap-3 max-sm:mb-4">
                <div>
                  <h2 className="text-[clamp(1.5rem,2.2vw,2rem)] leading-none font-bold tracking-[-0.04em]">
                    Continuar aprendiendo
                  </h2>
                  <p className="mt-2 text-[0.96rem] text-muted">
                    Tus cursos inscritos y su progreso.
                  </p>
                </div>
                <span className="rounded-full border border-line bg-surface px-3.5 py-2 text-[0.78rem] font-bold text-muted">
                  {dashboardCourses.length} cursos
                </span>
              </div>

              <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
                {dashboardCourses.map((course) => {
                  const Icon = iconMap[course.icon];
                  const started = course.progress > 0;
                  return (
                    <article
                      key={course.title}
                      className="flex h-full flex-col rounded-[20px] border border-line bg-surface p-[22px] shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1.5 hover:shadow-[var(--shadow)] max-sm:p-[18px]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
                          <Icon className="size-5" />
                        </span>
                        <span className="rounded-full border border-line bg-surface-2 px-3 py-1 text-[0.7rem] font-extrabold tracking-[0.04em] text-muted uppercase">
                          {course.category}
                        </span>
                      </div>

                      <h3 className="mt-4 text-[1.12rem] leading-none font-bold tracking-[-0.04em]">
                        {course.title}
                      </h3>
                      <p className="mt-2.5 grow text-[0.9rem] text-muted">
                        {course.text}
                      </p>

                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between gap-3 text-[0.78rem] font-semibold">
                          <span className="text-brand">{course.progress}%</span>
                        </div>
                        <div
                          role="progressbar"
                          aria-valuenow={course.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Progreso de ${course.title}`}
                          className="h-2 overflow-hidden rounded-full border border-line bg-surface-2"
                        >
                          <div
                            className="brand-gradient h-full rounded-full transition-[width] duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className="mt-4 inline-flex items-center gap-2 self-start text-[0.9rem] font-bold text-brand transition hover:gap-3 max-sm:mt-5 max-sm:w-full max-sm:justify-center max-sm:rounded-full max-sm:border max-sm:border-brand/30 max-sm:bg-brand/5 max-sm:py-3"
                      >
                        {started ? "Continuar" : "Comenzar"}
                        <ArrowRightIcon className="size-4" />
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section id="videos">
              <div className="mb-[18px] flex flex-wrap items-end justify-between gap-3 max-sm:mb-4">
                <div>
                  <h2 className="text-[clamp(1.5rem,2.2vw,2rem)] leading-none font-bold tracking-[-0.04em]">
                    Videos para ti
                  </h2>
                  <p className="mt-2 text-[0.96rem] text-muted">
                    Contenidos breves del programa, filtrados por categoría.
                  </p>
                </div>
              </div>

              <VideoLibrary />
            </section>
          </Reveal>

          <Reveal>
            <p className="rounded-[18px] border border-dashed border-brand/35 bg-brand/5 px-5 py-4 text-[0.88rem] font-semibold text-muted max-sm:px-4 max-sm:py-3.5">
              {dashboardNotice}
            </p>
          </Reveal>
          </div>
        </div>
      </Container>
    </RequireAuth>
  );
}
