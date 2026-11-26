"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import AuthCard from "@/components/auth/AuthCard";
import AuthLayout from "@/components/auth/AuthLayout";

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") ?? null;
  const isConfirmation = searchParams?.get("type") === "confirmation";

  const verifyHref = email
    ? `/verify-code?email=${encodeURIComponent(email)}`
    : "/verify-code";

  return (
    <>
      <h1 className="mb-3 text-3xl font-bold">Revisa tu correo</h1>

      <p className="mb-4 text-sm text-muted">
        {isConfirmation
          ? "Tu cuenta fue creada. Te enviamos un correo para confirmar tu dirección."
          : "Te enviamos un correo con las instrucciones para recuperar el acceso."}
      </p>

      {email ? (
        <p className="mb-6 rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm font-semibold text-ink">
          {email}
        </p>
      ) : null}

      <p className="mb-6 text-sm text-muted">
        {isConfirmation
          ? "Abre el enlace del correo para confirmar tu cuenta y luego inicia sesión."
          : "También puedes ingresar manualmente el código que aparece en el correo."}
      </p>

      <div className="space-y-3">
        {isConfirmation ? (
          <Link
            href="/login"
            className="brand-gradient block w-full rounded-xl px-5 py-3 text-center font-semibold text-white"
          >
            Ir al inicio de sesión
          </Link>
        ) : (
          <Link
            href={verifyHref}
            className="brand-gradient block w-full rounded-xl px-5 py-3 text-center font-semibold text-white"
          >
            Ingresar código
          </Link>
        )}

        {!isConfirmation ? (
          <Link
            href="/forgot-password"
            className="block w-full rounded-xl border border-line bg-surface px-5 py-3 text-center text-sm font-semibold text-brand transition hover:border-brand/40"
          >
            Enviar el correo nuevamente
          </Link>
        ) : null}
      </div>
    </>
  );
}

export default function CheckEmailPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <Suspense
          fallback={<p className="text-sm text-muted">Cargando...</p>}
        >
          <CheckEmailContent />
        </Suspense>
      </AuthCard>
    </AuthLayout>
  );
}
