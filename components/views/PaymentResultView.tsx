"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

import AuthAlert from "@/components/auth/AuthAlert";
import { useAuth } from "@/components/auth/AuthProvider";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { getErrorMessage } from "@/lib/api";
import {
  clearLastOrder,
  getLastOrder,
  getMyOrders,
  type Order,
} from "@/lib/flow";

const MAX_STATUS_ATTEMPTS = 8;
const STATUS_RETRY_DELAY_MS = 2500;

type Phase = "waiting" | "verifying" | "paid" | "pending" | "failed";

const priceFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

function subscribeToOrderStorage(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getOrderSnapshot(): string | null {
  return getLastOrder() ?? null;
}

function getServerOrderSnapshot(): undefined {
  return undefined;
}

export function PaymentResultView() {
  const { status: authStatus } = useAuth();
  const { refresh: refreshCart } = useCart();
  const orderDocumentId = useSyncExternalStore(
    subscribeToOrderStorage,
    getOrderSnapshot,
    getServerOrderSnapshot,
  );
  const [order, setOrder] = useState<Order | null>(null);
  const [runtimePhase, setRuntimePhase] = useState<Phase>("verifying");
  const [runtimeMessage, setRuntimeMessage] = useState<string | null>(null);

  const preflightPhase: Phase | null =
    orderDocumentId === undefined || authStatus === "loading"
      ? "waiting"
      : !orderDocumentId
        ? "failed"
        : authStatus === "unauthenticated"
          ? "failed"
          : null;

  const preflightMessage = !orderDocumentId
    ? "No encontramos el pedido que intentas verificar. Si realizaste un pago, revisa tus pedidos desde tu cuenta."
    : authStatus === "unauthenticated"
      ? "Inicia sesión para verificar el estado de tu pago."
      : null;

  const phase = preflightPhase ?? runtimePhase;
  const message =
    preflightPhase === "failed" ? preflightMessage : runtimeMessage;

  useEffect(() => {
    if (preflightPhase) return;

    let cancelled = false;
    let retryTimeoutId: number | undefined;

    const checkStatus = async (attempt: number) => {
      if (cancelled) return;

      try {
        const orders = await getMyOrders();

        if (cancelled) return;

        const current =
          orders.find((item) => item.documentId === orderDocumentId) ?? null;
        setOrder(current);

        if (current?.status === "pagado") {
          setRuntimePhase("paid");
          clearLastOrder();
          void refreshCart().catch(() => undefined);
          return;
        }

        if (
          current?.status === "cancelado" ||
          current?.paymentStatus === "rechazado" ||
          current?.paymentStatus === "anulado"
        ) {
          setRuntimePhase("failed");
          setRuntimeMessage(
            current.paymentStatus === "rechazado"
              ? "Flow rechazó el pago. Tu carrito sigue disponible para intentarlo nuevamente."
              : "El pago no se completó. Tu carrito sigue disponible para intentarlo nuevamente.",
          );
          return;
        }

        if (attempt >= MAX_STATUS_ATTEMPTS) {
          setRuntimePhase("pending");
          return;
        }

        retryTimeoutId = window.setTimeout(
          () => void checkStatus(attempt + 1),
          STATUS_RETRY_DELAY_MS,
        );
      } catch (error) {
        if (cancelled) return;

        setRuntimePhase("failed");
        setRuntimeMessage(getErrorMessage(error));
      }
    };

    const startTimeoutId = window.setTimeout(() => void checkStatus(1), 0);

    return () => {
      cancelled = true;
      window.clearTimeout(startTimeoutId);
      if (retryTimeoutId) window.clearTimeout(retryTimeoutId);
    };
  }, [orderDocumentId, authStatus, preflightPhase, refreshCart]);

  const loginHref = `/login?next=${encodeURIComponent("/payment/result")}`;

  return (
    <div className="mx-auto max-w-[640px]">
      <section className="rounded-[24px] border border-line bg-surface p-[26px] shadow-[var(--shadow-soft)] max-sm:p-5">
        <p className="text-[0.76rem] font-bold tracking-[0.06em] text-brand uppercase">
          Pago de tus cursos
        </p>
        <h1 className="mt-2 text-[1.9rem] leading-tight font-bold tracking-[-0.05em] max-sm:text-[1.6rem]">
          Resultado del pago
        </h1>

        {order ? (
          <dl className="mt-5 space-y-2 rounded-xl bg-surface-2 p-4 text-[0.88rem]">
            {order.items.map((item, index) => (
              <div key={`${item.courseName ?? "curso"}-${index}`} className="flex justify-between gap-4">
                <dt className="text-muted">{item.courseName ?? "Curso"}</dt>
                <dd className="font-semibold">
                  {priceFormatter.format(item.price)}
                </dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 border-t border-line pt-2">
              <dt className="font-bold">Total</dt>
              <dd className="font-bold text-brand">
                {priceFormatter.format(order.totalAmount)}
              </dd>
            </div>
          </dl>
        ) : null}

        <div className="mt-5">
          {phase === "waiting" || phase === "verifying" ? (
            <div
              role="status"
              className="flex items-center gap-3 text-[0.94rem] text-muted"
            >
              <span
                aria-hidden="true"
                className="h-6 w-6 shrink-0 animate-spin rounded-full border-[3px] border-brand/20 border-t-brand"
              />
              <p>Estamos verificando tu pago con Flow...</p>
            </div>
          ) : null}

          {phase === "paid" ? (
            <AuthAlert tone="success">
              ¡Pago confirmado! Ya tienes acceso a los cursos de tu compra.
            </AuthAlert>
          ) : null}

          {phase === "pending" ? (
            <AuthAlert tone="info">
              Tu pago está siendo confirmado. La confirmación puede tardar unos
              segundos; puedes volver a consultar sin pagar nuevamente.
            </AuthAlert>
          ) : null}

          {phase === "failed" && message ? (
            <AuthAlert tone="error">{message}</AuthAlert>
          ) : null}

          {phase === "failed" && authStatus === "unauthenticated" ? (
            <Link
              href={loginHref}
              className="mt-3 inline-flex text-[0.9rem] font-bold text-brand underline underline-offset-2"
            >
              Iniciar sesión
            </Link>
          ) : null}

          {phase === "paid" ? (
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/dashboard">Ir a mis cursos</Button>
              <Button href="/courses" variant="secondary">
                Ver catálogo
              </Button>
            </div>
          ) : null}

          {phase === "pending" ? (
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-transparent brand-gradient px-5 py-[13px] text-base font-bold text-white shadow-[0_14px_30px_rgb(91_34_232_/_0.24)] transition duration-200 hover:-translate-y-0.5 hover:cursor-pointer"
              >
                Volver a verificar
              </button>
              <Button href="/dashboard" variant="secondary">
                Ir a mis cursos
              </Button>
            </div>
          ) : null}

          {phase === "failed" ? (
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/cart" variant="secondary">
                Ir a mi carrito
              </Button>
              <Button href="/courses" variant="secondary">
                Ver cursos
              </Button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
