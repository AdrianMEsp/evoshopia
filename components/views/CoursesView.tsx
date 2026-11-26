"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import AuthAlert from "@/components/auth/AuthAlert";
import { useAuth } from "@/components/auth/AuthProvider";
import { useCart } from "@/components/cart/CartProvider";
import {
  CatalogEmpty,
  CatalogError,
  CatalogSkeleton,
} from "@/components/views/CatalogFeedback";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getErrorMessage } from "@/lib/api";
import { canPurchaseCourses } from "@/lib/auth";
import { getCourses, type Course } from "@/lib/catalog";
import { useCatalog } from "@/lib/use-catalog";

const priceFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function CoursesView() {
  const { user } = useAuth();
  const { isInCart, isPending, addItem } = useCart();
  const { data: courses, loading, error, retry } = useCatalog(getCourses);
  const [feedback, setFeedback] = useState<{
    courseId: string;
    message: string;
  } | null>(null);
  const courseList = courses ?? [];
  const canPurchase = canPurchaseCourses(user);

  const handleAdd = async (course: Course) => {
    setFeedback(null);

    try {
      await addItem(course.documentId);
    } catch (addError) {
      setFeedback({
        courseId: course.documentId,
        message: getErrorMessage(addError),
      });
    }
  };

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
          <article className="flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-surface shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[var(--shadow)]">
            <Link
              href={`/courses/${course.slug}`}
              aria-label={`Ver detalles de ${course.name}`}
              className="flex grow flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
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
              </div>
            </Link>

            <div className="flex flex-col gap-3 border-t border-line px-[26px] pt-4 pb-[26px] max-sm:px-5 max-sm:pb-5">
              <p className="text-[1.3rem] font-bold tracking-[-0.04em] text-brand">
                {priceFormatter.format(course.price)}
              </p>

              {course.userHasAccess ? (
                <Button
                  href="/dashboard"
                  variant="secondary"
                  className="w-full text-brand"
                >
                  Ya es tuyo
                </Button>
              ) : canPurchase ? (
                isInCart(course.documentId) ? (
                  <Button
                    href="/cart"
                    variant="secondary"
                    className="w-full text-brand"
                  >
                    Ya está en tu carrito
                  </Button>
                ) : (
                  <button
                    type="button"
                    onClick={() => void handleAdd(course)}
                    disabled={isPending(course.documentId)}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-transparent brand-gradient px-4 text-[0.9rem] font-bold text-white shadow-[0_10px_24px_rgb(91_34_232_/_0.2)] transition duration-200 hover:-translate-y-0.5 hover:cursor-pointer disabled:cursor-wait disabled:opacity-60"
                  >
                    {isPending(course.documentId)
                      ? "Agregando..."
                      : "Agregar al carrito"}
                  </button>
                )
              ) : null}

              {feedback?.courseId === course.documentId ? (
                <AuthAlert tone="error">{feedback.message}</AuthAlert>
              ) : null}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
