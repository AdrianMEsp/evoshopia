"use client";

import { useState } from "react";
import Link from "next/link";

import AuthAlert from "@/components/auth/AuthAlert";
import { useAuth } from "@/components/auth/AuthProvider";
import { useCart } from "@/components/cart/CartProvider";
import { ArrowRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { CatalogEmpty } from "@/components/views/CatalogFeedback";
import { getErrorMessage } from "@/lib/api";
import { canPurchaseCourses } from "@/lib/auth";
import { saveLastOrder, startCartCheckout } from "@/lib/flow";

const priceFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function CartView() {
  const { user, status } = useAuth();
  const {
    cart,
    loading,
    error,
    itemCount,
    isPending,
    removeItem,
    refresh,
  } = useCart();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const canPurchase = canPurchaseCourses(user);

  const handleRemove = async (courseDocumentId: string) => {
    setFeedback(null);

    try {
      await removeItem(courseDocumentId);
    } catch (removeError) {
      setFeedback(getErrorMessage(removeError));
    }
  };

  const handleRefresh = async () => {
    setFeedback(null);

    try {
      await refresh();
    } catch (refreshError) {
      setFeedback(getErrorMessage(refreshError));
    }
  };

  const handleCheckout = async () => {
    if (!canPurchase || cart.items.length === 0 || isCheckingOut) return;

    setIsCheckingOut(true);
    setFeedback(null);

    try {
      const checkout = await startCartCheckout();
      saveLastOrder(checkout.orderDocumentId);
      window.location.assign(checkout.paymentUrl);
    } catch (checkoutError) {
      setFeedback(getErrorMessage(checkoutError));
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (status === "loading") {
    return (
      <div
        role="status"
        className="flex min-h-[40vh] items-center justify-center"
      >
        <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-brand/20 border-t-brand" />
        <span className="sr-only">Cargando tu sesión</span>
      </div>
    );
  }

  if (!canPurchase) {
    return (
      <div className="mx-auto max-w-[640px]">
        <AuthAlert tone="info">
          {status === "unauthenticated" ? (
            <>
              Inicia sesión para ver tu carrito.{" "}
              <Link
                href="/login?next=%2Fcart"
                className="font-bold underline underline-offset-2"
              >
                Ingresar
              </Link>
            </>
          ) : (
            <>
              Las cuentas de institución no realizan compras. Puedes revisar el
              catálogo en{" "}
              <Link
                href="/courses"
                className="font-bold underline underline-offset-2"
              >
                Cursos
              </Link>
              .
            </>
          )}
        </AuthAlert>
      </div>
    );
  }

  if (loading && cart.items.length === 0) {
    return (
      <div
        aria-busy="true"
        aria-live="polite"
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
      >
        <div className="h-72 animate-pulse rounded-[24px] border border-line bg-surface" />
        <div className="h-56 animate-pulse rounded-[24px] border border-line bg-surface" />
        <span className="sr-only">Cargando carrito</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[640px]">
        <AuthAlert tone="error">{error}</AuthAlert>
        <button
          type="button"
          onClick={() => void handleRefresh()}
          className="mt-4 rounded-full border border-line bg-surface px-5 py-2.5 text-[0.88rem] font-bold text-brand shadow-[var(--shadow-soft)] transition hover:cursor-pointer hover:border-brand/40"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <>
        <CatalogEmpty
          title="Tu carrito está vacío"
          text="Agrega cursos desde el catálogo para reunirlos aquí y comprarlos en un solo pago."
        />
        <div className="mt-6 flex justify-center">
          <Button href="/courses">Explorar cursos</Button>
        </div>
      </>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      <section className="rounded-[24px] border border-line bg-surface p-[26px] shadow-[var(--shadow-soft)] max-sm:p-5">
        <h2 className="text-[1.2rem] font-bold tracking-[-0.04em]">
          Tus cursos
        </h2>
        <ul className="mt-4">
          {cart.items.map((item) => (
            <li
              key={item.documentId}
              className="flex flex-col gap-3 border-b border-line py-5 first:pt-0 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-[1.02rem] font-bold">{item.course.name}</p>
                <p className="mt-1 text-[0.88rem] text-muted">
                  {priceFormatter.format(item.course.price)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void handleRemove(item.course.documentId)}
                disabled={isPending(item.course.documentId)}
                className="self-start rounded-full border border-line px-4 py-2 text-[0.82rem] font-bold text-muted transition hover:cursor-pointer hover:border-red-300 hover:text-red-700 disabled:cursor-wait disabled:opacity-60 sm:self-auto"
              >
                {isPending(item.course.documentId)
                  ? "Quitando..."
                  : "Quitar del carrito"}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <aside className="rounded-[24px] border border-line bg-surface p-[26px] shadow-[var(--shadow-soft)] max-sm:p-5">
        <h2 className="text-[1.2rem] font-bold tracking-[-0.04em]">
          Resumen de compra
        </h2>
        <dl className="mt-5 space-y-3 border-y border-line py-5 text-[0.92rem]">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">
              {itemCount} {itemCount === 1 ? "curso" : "cursos"}
            </dt>
            <dd className="font-semibold">{priceFormatter.format(cart.amount)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-bold">Total a pagar</dt>
            <dd className="text-[1.35rem] font-bold tracking-[-0.04em] text-brand">
              {priceFormatter.format(cart.amount)}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => void handleCheckout()}
          disabled={isCheckingOut}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-transparent brand-gradient px-5 text-base font-bold text-white shadow-[0_14px_30px_rgb(91_34_232_/_0.24)] transition duration-200 hover:-translate-y-0.5 hover:cursor-pointer disabled:cursor-wait disabled:opacity-60"
        >
          {isCheckingOut ? "Iniciando pago..." : "Continuar al pago"}
          {isCheckingOut ? null : <ArrowRightIcon className="size-4" />}
        </button>

        <p className="mt-4 text-[0.78rem] leading-5 text-muted">
          Te redirigiremos a Flow para completar el pago. El total se confirma
          en el servidor antes de cobrar.
        </p>

        {feedback ? (
          <div className="mt-4">
            <AuthAlert tone="error">{feedback}</AuthAlert>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
