"use client";

import MuxPlayer from "@mux/mux-player-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import AuthAlert from "@/components/auth/AuthAlert";
import { ArrowRightIcon, CheckIcon, PlayIcon } from "@/components/icons";
import { BlogContent } from "@/components/views/BlogContent";
import { CatalogEmpty, CatalogError } from "@/components/views/CatalogFeedback";
import { getErrorMessage } from "@/lib/api";
import { cn } from "@/lib/cn";
import {
  completeLesson,
  getCourseLearningData,
  getLessonPlayback,
  type CourseLearningData,
  type LessonPlayback,
} from "@/lib/course-learning";

interface CourseLearningViewProps {
  courseDocumentId: string;
  requestedLessonId?: string | null;
}

export function CourseLearningView({
  courseDocumentId,
  requestedLessonId,
}: CourseLearningViewProps) {
  const [data, setData] = useState<CourseLearningData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [playback, setPlayback] = useState<{
    lessonId: string;
    data: LessonPlayback;
  } | null>(null);
  const [playbackError, setPlaybackError] = useState<{
    lessonId: string;
    message: string;
  } | null>(null);
  const [completing, setCompleting] = useState(false);
  const [completeError, setCompleteError] = useState<string | null>(null);
  const requestRef = useRef(0);

  const applyData = useCallback(
    (nextData: CourseLearningData) => {
      setData(nextData);
      setSelectedLessonId((current) => {
        if (
          current &&
          nextData.lessons.some((lesson) => lesson.documentId === current)
        ) {
          return current;
        }
        if (
          requestedLessonId &&
          nextData.lessons.some(
            (lesson) => lesson.documentId === requestedLessonId,
          )
        ) {
          return requestedLessonId;
        }
        return nextData.currentLessonId;
      });
    },
    [requestedLessonId],
  );

  useEffect(() => {
    let cancelled = false;
    const requestId = requestRef.current + 1;
    requestRef.current = requestId;

    getCourseLearningData(courseDocumentId)
      .then((nextData) => {
        if (!cancelled && requestRef.current === requestId) {
          applyData(nextData);
        }
      })
      .catch((loadError) => {
        if (!cancelled && requestRef.current === requestId) {
          setError(getErrorMessage(loadError));
        }
      })
      .finally(() => {
        if (!cancelled && requestRef.current === requestId) setLoading(false);
      });

    return () => {
      cancelled = true;
      requestRef.current += 1;
    };
  }, [courseDocumentId, applyData]);

  const retry = () => {
    const requestId = requestRef.current + 1;
    requestRef.current = requestId;
    setLoading(true);
    setError(null);

    getCourseLearningData(courseDocumentId)
      .then((nextData) => {
        if (requestRef.current === requestId) applyData(nextData);
      })
      .catch((loadError) => {
        if (requestRef.current === requestId) {
          setError(getErrorMessage(loadError));
        }
      })
      .finally(() => {
        if (requestRef.current === requestId) setLoading(false);
      });
  };

  useEffect(() => {
    if (!selectedLessonId) return;

    let cancelled = false;
    getLessonPlayback(selectedLessonId)
      .then((result) => {
        if (!cancelled) {
          setPlayback({ lessonId: selectedLessonId, data: result });
        }
      })
      .catch((lessonPlaybackError) => {
        if (!cancelled) {
          setPlaybackError({
            lessonId: selectedLessonId,
            message: getErrorMessage(lessonPlaybackError),
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedLessonId]);

  const handleComplete = async () => {
    if (!data || !selectedLessonId || completing) return;

    setCompleting(true);
    setCompleteError(null);

    try {
      await completeLesson(selectedLessonId);
      const nextData = await getCourseLearningData(courseDocumentId);
      applyData(nextData);
      const nextLesson = nextData.lessons.find((lesson) => !lesson.completed);
      if (nextLesson) setSelectedLessonId(nextLesson.documentId);
    } catch (completeErrorValue) {
      setCompleteError(getErrorMessage(completeErrorValue));
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div
        aria-busy="true"
        aria-live="polite"
        className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]"
      >
        <div className="h-[420px] animate-pulse rounded-[20px] border border-line bg-surface" />
        <div className="h-[420px] animate-pulse rounded-[20px] border border-line bg-surface" />
        <span className="sr-only">Cargando curso</span>
      </div>
    );
  }

  if (error) {
    return <CatalogError message={error} onRetry={retry} />;
  }

  if (!data) {
    return (
      <CatalogEmpty
        title="Curso no encontrado"
        text="El curso que buscas no está disponible."
      />
    );
  }

  const selectedLesson =
    data.lessons.find((lesson) => lesson.documentId === selectedLessonId) ??
    null;
  const activePlayback =
    playback?.lessonId === selectedLessonId ? playback.data : null;
  const activePlaybackError =
    playbackError?.lessonId === selectedLessonId
      ? playbackError.message
      : null;
  const playbackLoading = Boolean(
    selectedLessonId && !activePlayback && !activePlaybackError,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
      <aside className="rounded-[20px] border border-line bg-surface p-5 shadow-[var(--shadow-soft)] lg:sticky lg:top-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-[0.84rem] font-bold text-muted transition hover:text-brand"
        >
          <ArrowRightIcon className="size-4 -rotate-180" />
          Volver al dashboard
        </Link>

        <h2 className="mt-4 text-[1.05rem] leading-tight font-bold tracking-[-0.03em]">
          {data.name}
        </h2>
        <p className="mt-1 text-[0.8rem] text-muted">
          {data.completedLessons} de {data.totalLessons} lecciones completadas ·{" "}
          {data.percentage}%
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full brand-gradient"
            style={{ width: `${data.percentage}%` }}
          />
        </div>

        <div className="mt-5 space-y-5">
          {data.sections.map((section) => (
            <div key={section.documentId}>
              <p className="text-[0.72rem] font-extrabold tracking-[0.04em] text-muted uppercase">
                {section.title}
              </p>
              <ul className="mt-2 space-y-1">
                {section.lessons.map((lesson) => {
                  const isSelected = lesson.documentId === selectedLessonId;
                  const isCurrent = lesson.documentId === data.currentLessonId;

                  return (
                    <li key={lesson.documentId}>
                      <button
                        type="button"
                        onClick={() => setSelectedLessonId(lesson.documentId)}
                        className={cn(
                          "flex w-full items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[0.85rem] transition hover:cursor-pointer",
                          isSelected
                            ? "border-brand/30 bg-brand/10 text-brand"
                            : "border-transparent text-ink hover:bg-surface-2",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                            lesson.completed
                              ? "bg-teal/15 text-teal"
                              : isCurrent
                                ? "bg-brand/15 text-brand"
                                : "bg-surface-2 text-muted",
                          )}
                        >
                          {lesson.completed ? (
                            <CheckIcon className="size-3.5" />
                          ) : (
                            <PlayIcon className="size-3 translate-x-px" />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-bold">
                            {lesson.title}
                          </span>
                          {isCurrent && !lesson.completed ? (
                            <span className="text-[0.7rem] font-bold text-brand">
                              En curso
                            </span>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      <section className="min-w-0 rounded-[20px] border border-line bg-surface p-5 shadow-[var(--shadow-soft)] max-sm:p-4">
        {selectedLesson ? (
          <>
            <p className="text-[0.78rem] font-bold text-muted">
              {selectedLesson.sectionTitle} · Lección {selectedLesson.order}
            </p>
            <h1 className="mt-1.5 text-[clamp(1.4rem,2.4vw,2rem)] leading-tight font-bold tracking-[-0.04em]">
              {selectedLesson.title}
            </h1>
            {selectedLesson.description ? (
              <p className="mt-2 text-[0.92rem] text-muted">
                {selectedLesson.description}
              </p>
            ) : null}

            <div className="mt-5 overflow-hidden rounded-2xl bg-navy">
              {playbackLoading ? (
                <div className="flex aspect-video items-center justify-center">
                  <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-white/20 border-t-white" />
                  <span className="sr-only">Cargando video</span>
                </div>
              ) : activePlaybackError ? (
                <p className="aspect-video grid place-items-center px-6 text-center text-[0.9rem] text-white/80">
                  {activePlaybackError}
                </p>
              ) : activePlayback ? (
                <MuxPlayer
                  key={activePlayback.playbackId}
                  src={activePlayback.playbackUrl}
                  playbackId={activePlayback.playbackId}
                  metadataVideoTitle={selectedLesson.title}
                  className="w-full"
                  style={{ aspectRatio: "16 / 9" }}
                />
              ) : null}
            </div>

            <BlogContent content={selectedLesson.content} />

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
              {selectedLesson.completed ? (
                <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-5 text-sm font-bold text-teal">
                  <CheckIcon className="size-4" />
                  Lección completada
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => void handleComplete()}
                  disabled={completing}
                  className="inline-flex min-h-11 items-center justify-center rounded-full brand-gradient px-5 text-sm font-bold text-white transition hover:cursor-pointer disabled:cursor-wait disabled:opacity-60"
                >
                  {completing ? "Marcando..." : "Marcar como completada"}
                </button>
              )}
              {completeError ? (
                <AuthAlert tone="error">{completeError}</AuthAlert>
              ) : null}
            </div>
          </>
        ) : (
          <CatalogEmpty
            title="Sin lecciones"
            text="Este curso todavía no tiene lecciones publicadas."
          />
        )}
      </section>
    </div>
  );
}
