"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthAlert from "@/components/auth/AuthAlert";
import { useAuth } from "@/components/auth/AuthProvider";
import { useCart } from "@/components/cart/CartProvider";
import { ArrowRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { CatalogEmpty, CatalogError } from "@/components/views/CatalogFeedback";
import { getErrorMessage } from "@/lib/api";
import { canPurchaseCourses } from "@/lib/auth";
import { getCourseBySlug } from "@/lib/catalog";
import { useCatalog } from "@/lib/use-catalog";

type PurchaseFeedback = {
  tone: "success" | "info" | "error";
  message: string;
  linkHref?: string;
  linkLabel?: string;
};

const priceFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function CourseDetailView({ slug }: { slug: string }) {
  const { status, user } = useAuth();
  const { isInCart, isPending, addItem } = useCart();
  const [feedback, setFeedback] = useState<PurchaseFeedback | null>(null);
  const loadCourse = useCallback(() => getCourseBySlug(slug), [slug]);
  const { data: course, loading, error, retry } = useCatalog(loadCourse);
  const canPurchase = canPurchaseCourses(user);

  const handleAddToCart = async () => {
    if (status === "loading" || !course) return;

    if (!canPurchase) {
      setFeedback({
        tone: "info",
        message: "Las cuentas de institución no compran cursos.",
        linkHref: "/courses",
        linkLabel: "Ver cursos",
      });
      return;
    }

    if (course.userHasAccess) {
      setFeedback({
        tone: "success",
        message: "Ya tienes acceso a este curso.",
        linkHref: "/dashboard",
        linkLabel: "Ir a mis cursos",
      });
      return;
    }

    if (isInCart(course.documentId)) {
      setFeedback({
        tone: "info",
        message: "Este curso ya está en tu carrito.",
        linkHref: "/cart",
        linkLabel: "Ir al carrito",
      });
      return;
    }

    setFeedback(null);

    try {
      await addItem(course.documentId);
      setFeedback({
        tone: "success",
        message: "Curso agregado a tu carrito.",
        linkHref: "/cart",
        linkLabel: "Ir al carrito",
      });
    } catch (addError) {
      setFeedback({
        tone: "error",
        message: getErrorMessage(addError),
      });
    }
  };

  if (loading) {
    return (
      <div
        aria-busy="true"
        aria-live="polite"
        className="grid gap-8 lg:grid-cols-2"
      >
        <div className="aspect-[4/3] animate-pulse rounded-[24px] border border-line bg-surface" />
        <div className="h-96 animate-pulse rounded-[24px] border border-line bg-surface" />
        <span className="sr-only">Cargando curso</span>
      </div>
    );
  }

  if (error) return <CatalogError message={error} onRetry={retry} />;

  if (!course) {
    return (
      <CatalogEmpty
        title="Curso no encontrado"
        text="El curso que buscas no existe o ya no está disponible."
      />
    );
  }

  const courseInCart = isInCart(course.documentId);
  const coursePending = isPending(course.documentId);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-line bg-brand/10">
        {course.coverUrl ? (
          <Image
            src={course.coverUrl}
            alt={course.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        ) : (
          <div aria-hidden="true" className="brand-gradient size-full opacity-20" />
        )}
      </div>

      <section className="rounded-[24px] border border-line bg-surface p-[26px] shadow-[var(--shadow-soft)] max-sm:p-5">
        <p className="text-[0.76rem] font-bold tracking-[0.06em] text-brand uppercase">
          Detalle del curso
        </p>
        <h1 className="mt-2 text-[2rem] leading-tight font-bold tracking-[-0.05em] max-sm:text-[1.7rem]">
          {course.name}
        </h1>
        <p className="mt-4 text-[0.98rem] leading-7 text-muted">
          {course.description}
        </p>

        <dl className="mt-6 space-y-3 border-y border-line py-5 text-[0.9rem]">
          {course.instructor ? (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Instructor</dt>
              <dd className="text-right font-semibold text-ink">
                {course.instructor}
              </dd>
            </div>
          ) : null}
          {course.workload ? (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Duración</dt>
              <dd className="text-right font-semibold text-ink">
                {course.workload} h de contenido
              </dd>
            </div>
          ) : null}
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Precio</dt>
            <dd className="text-right text-[1.25rem] font-bold tracking-[-0.04em] text-brand">
              {priceFormatter.format(course.price)}
            </dd>
          </div>
        </dl>

        {course.userHasAccess ? (
          <Button
            href="/dashboard"
            variant="secondary"
            className="mt-6 w-full text-brand"
          >
            Ya es tuyo · Ir a mis cursos
          </Button>
        ) : canPurchase && courseInCart ? (
          <Button href="/cart" variant="secondary" className="mt-6 w-full text-brand">
            Ir a mi carrito
          </Button>
        ) : canPurchase ? (
          <button
            type="button"
            onClick={() => void handleAddToCart()}
            disabled={status === "loading" || coursePending}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-transparent brand-gradient px-5 text-base font-bold text-white shadow-[0_14px_30px_rgb(91_34_232_/_0.24)] transition duration-200 hover:-translate-y-0.5 hover:cursor-pointer disabled:cursor-wait disabled:opacity-60"
          >
            {status === "loading"
              ? "Verificando sesión..."
              : coursePending
                ? "Agregando al carrito..."
                : "Agregar al carrito"}
            {status === "loading" || coursePending ? null : (
              <ArrowRightIcon className="size-4" />
            )}
          </button>
        ) : (
          <AuthAlert tone="info">
            Las cuentas de institución no compran cursos. El acceso se gestiona
            desde la institución.
          </AuthAlert>
        )}

        {feedback ? (
          <div className="mt-4">
            <AuthAlert tone={feedback.tone}>
              {feedback.message}
              {feedback.linkHref && feedback.linkLabel ? (
                <>
                  {" "}
                  <Link
                    href={feedback.linkHref}
                    className="font-bold underline underline-offset-2"
                  >
                    {feedback.linkLabel}
                  </Link>
                </>
              ) : null}
            </AuthAlert>
          </div>
        ) : null}

        <Link
          href="/courses"
          className="mt-5 inline-flex text-[0.88rem] font-semibold text-muted transition hover:text-brand"
        >
          Volver a los cursos
        </Link>
      </section>
    </div>
  );
}
