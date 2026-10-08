import type { Metadata } from "next";
import { ArrowRightIcon, iconMap } from "@/components/icons";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { VideoLibrary } from "@/components/dashboard/VideoLibrary";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import {
  dashboardCourses,
  dashboardGreeting,
  dashboardNotice,
} from "@/content/dashboard";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Mi espacio | ${site.name}`,
  description: "Vista preliminar del dashboard de formación de Evosistencia.",
};

export default function DashboardPage() {
  return (
    <Container className="py-8 max-sm:py-5 lg:py-10">
      <div className="grid gap-[22px] max-sm:gap-4 lg:grid-cols-[264px_1fr]">
        <DashboardNav />

        <div className="min-w-0 space-y-8 max-sm:space-y-6">
          <Reveal>
            <section className="relative overflow-hidden rounded-[26px] bg-navy p-[26px] text-white shadow-[0_24px_60px_rgb(6_20_46_/_0.24)] max-sm:p-5 sm:p-[34px]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-[-45%] right-[-8%] size-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgb(91_34_232_/_0.55),transparent_65%)] max-sm:size-[260px] sm:max-md:size-[300px]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-60%] left-[35%] size-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgb(255_122_26_/_0.35),transparent_65%)] max-sm:size-[220px] sm:max-md:size-[250px]"
              />

              <div className="relative max-w-[720px]">
                <Eyebrow tone="light">{dashboardGreeting.eyebrow}</Eyebrow>
                <h1 className="mt-4 text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.05] font-bold tracking-[-0.045em]">
                  {dashboardGreeting.title}
                </h1>
                <p className="mt-3 text-[1.02rem] text-white/80">
                  {dashboardGreeting.text}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 max-sm:flex-col max-sm:gap-2.5">
                  <a
                    href={dashboardGreeting.primaryCta.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-base font-bold text-neutral-900 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgb(0_0_0_/_0.18)] max-sm:w-full"
                  >
                    {dashboardGreeting.primaryCta.label}
                    <ArrowRightIcon className="size-4" />
                  </a>
                  <a
                    href={dashboardGreeting.secondaryCta.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-base font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/10 max-sm:w-full"
                  >
                    {dashboardGreeting.secondaryCta.label}
                  </a>
                </div>
              </div>
            </section>
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
  );
}
