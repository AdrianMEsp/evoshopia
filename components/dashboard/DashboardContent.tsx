"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { getErrorMessage } from "@/lib/api";
import { getDashboardData, type DashboardData } from "@/lib/dashboard";
import { DashboardCourses } from "@/components/dashboard/DashboardCourses";
import { DashboardGreeting } from "@/components/dashboard/DashboardGreeting";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { LessonLibrary } from "@/components/dashboard/LessonLibrary";
import { Reveal } from "@/components/ui/Reveal";

function DashboardSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite" className="space-y-8">
      <div className="space-y-4">
        <div className="h-8 w-52 animate-pulse rounded-full bg-surface-2" />
        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-[20px] border border-line bg-surface"
            />
          ))}
        </div>
      </div>
      <span className="sr-only">Cargando contenidos del dashboard</span>
    </div>
  );
}

export function DashboardContent() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestRef = useRef(0);

  const retry = useCallback(async () => {
    const requestId = requestRef.current + 1;
    requestRef.current = requestId;
    setLoading(true);
    setError(null);

    try {
      const nextData = await getDashboardData();
      if (requestRef.current !== requestId) return;
      setData(nextData);
    } catch (loadError) {
      if (requestRef.current !== requestId) return;
      setError(getErrorMessage(loadError));
    } finally {
      if (requestRef.current === requestId) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const requestId = requestRef.current + 1;
    requestRef.current = requestId;

    getDashboardData()
      .then((nextData) => {
        if (cancelled || requestRef.current !== requestId) return;
        setData(nextData);
      })
      .catch((loadError) => {
        if (cancelled || requestRef.current !== requestId) return;
        setError(getErrorMessage(loadError));
      })
      .finally(() => {
        if (!cancelled && requestRef.current === requestId) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
      requestRef.current += 1;
    };
  }, []);

  const courses = data?.courses ?? [];
  const lessons = data?.lessons ?? [];

  return (
    <div className="grid gap-[22px] max-sm:gap-4 lg:grid-cols-[264px_1fr]">
      <DashboardNav courseCount={courses.length} lessonCount={lessons.length} />

      <div className="min-w-0 space-y-8 max-sm:space-y-6">
        <Reveal>
          <DashboardGreeting
            courseCount={courses.length}
            lessonCount={lessons.length}
            loading={loading}
            unavailable={Boolean(error)}
          />
        </Reveal>

        {loading ? <DashboardSkeleton /> : null}

        {!loading && error ? (
          <Reveal>
            <div
              role="alert"
              className="flex flex-col items-start gap-4 rounded-[20px] border border-red-200 bg-red-50 px-5 py-4 text-[0.9rem] text-red-700 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="font-semibold">{error}</p>
              <button
                type="button"
                onClick={retry}
                className="shrink-0 rounded-full border border-red-300 bg-white px-4 py-2 text-[0.82rem] font-bold text-red-700 transition hover:cursor-pointer hover:bg-red-100"
              >
                Reintentar
              </button>
            </div>
          </Reveal>
        ) : null}

        {!loading && !error ? (
          <>
            <Reveal>
              <DashboardCourses courses={courses} />
            </Reveal>

            <Reveal>
              <LessonLibrary lessons={lessons} />
            </Reveal>
          </>
        ) : null}
      </div>
    </div>
  );
}
