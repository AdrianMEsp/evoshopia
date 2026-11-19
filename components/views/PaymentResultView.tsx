"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import AuthAlert from "@/components/auth/AuthAlert";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { getErrorMessage } from "@/lib/api";
import {
  getFlowPaymentStatus,
  type FlowPaymentStatusResult,
} from "@/lib/flow";

const MAX_STATUS_ATTEMPTS = 8;
const STATUS_RETRY_DELAY_MS = 2500;

type Phase = "waiting" | "verifying" | "paid" | "pending" | "failed";

export function PaymentResultView() {
  const searchParams = useSearchParams();
  const { status: authStatus } = useAuth();
  const token = (searchParams.get("token") ?? "").trim();
  const errorCode = searchParams.get("error");
  const [runtimePhase, setRuntimePhase] = useState<Phase>("verifying");
  const [runtimeMessage, setRuntimeMessage] = useState<string | null>(null);
  const [result, setResult] = useState<FlowPaymentStatusResult | null>(null);

  const preflightPhase: Phase | null =
    errorCode === "missing_token" || !token || authStatus === "unauthenticated"
      ? "failed"
      : authStatus === "loading"
        ? "waiting"
        : null;

  const preflightMessage =
    errorCode === "missing_token"
      ? "No recibimos el identificador del pago desde Flow. Si el cobro se realizó, revisa tu correo o contáctanos."
      : !token
        ? "No encontramos el pago que intentas verificar."
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
        const data = await getFlowPaymentStatus(token);

        if (cancelled) return;

        setResult(data);

        if (data.status === "paid") {
          setRuntimePhase("paid");
          return;
        }

        if (
          data.status === "rejected" ||
          data.status === "cancelled" ||
          data.status === "failed"
        ) {
          setRuntimePhase("failed");
          setRuntimeMessage(
            data.status === "rejected"
              ? "Flow rechazó el pago. Puedes intentarlo nuevamente con otro medio de pago."
              : data.status === "cancelled"
                ? "El pago fue anulado antes de completarse."
                : "El pago no pudo verificarse correctamente.",
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
  }, [token, errorCode, authStatus, preflightPhase]);

  const loginHref = `/login?next=${encodeURIComponent(
    `/payment/result${token ? `?token=${encodeURIComponent(token)}` : ""}`,
  )}`;

  return (
    <div className="mx-auto max-w-[640px]">
      <section className="rounded-[24px] border border-line bg-surface p-[26px] shadow-[var(--shadow-soft)] max-sm:p-5">
        <p className="text-[0.76rem] font-bold tracking-[0.06em] text-brand uppercase">
          Pago del curso
        </p>
        <h1 className="mt-2 text-[1.9rem] leading-tight font-bold tracking-[-0.05em] max-sm:text-[1.6rem]">
          Resultado del pago
        </h1>

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
              ¡Pago confirmado! Ya tienes acceso al curso
              {result?.courseName ? ` "${result.courseName}"` : ""}.
            </AuthAlert>
          ) : null}

          {phase === "pending" ? (
            <AuthAlert tone="info">
              Tu pago está siendo procesado. La confirmación puede tardar unos
              minutos; puedes volver a verificar sin pagar nuevamente.
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
              {result?.courseSlug ? (
                <Button
                  href={`/courses/${result.courseSlug}`}
                  variant="secondary"
                >
                  Ver el curso
                </Button>
              ) : null}
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
              {result?.courseSlug ? (
                <Button
                  href={`/courses/${result.courseSlug}`}
                  variant="secondary"
                >
                  Volver al curso
                </Button>
              ) : (
                <Button href="/courses" variant="secondary">
                  Ver cursos
                </Button>
              )}
              <Button href="/dashboard" variant="secondary">
                Ir a mis cursos
              </Button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
