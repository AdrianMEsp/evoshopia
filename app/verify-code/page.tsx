"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import AuthAlert from "@/components/auth/AuthAlert";
import AuthButton from "@/components/auth/AuthButton";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";

function extractCode(value: string): string {
  const trimmed = value.trim();

  try {
    const url = new URL(trimmed);
    const code = url.searchParams.get("code");
    if (code) return code;
  } catch {
    // Si no es una URL, se usa el texto ingresado.
  }

  return trimmed;
}

function VerifyCodeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") ?? null;

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedCode = extractCode(code);

    if (!normalizedCode) {
      setError("Ingresa el código que recibiste en tu correo.");
      return;
    }

    setError(null);
    router.push(`/reset-password?code=${encodeURIComponent(normalizedCode)}`);
  };

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">Ingresa el código</h1>
      <p className="mb-6 text-sm text-muted">
        {email
          ? `Enviamos el código a ${email}. Puedes pegarlo aquí o abrir directamente el enlace del correo.`
          : "Copia el código que aparece en el correo de recuperación."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error ? <AuthAlert>{error}</AuthAlert> : null}

        <AuthInput
          name="code"
          placeholder="Código de recuperación"
          autoComplete="one-time-code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          required
        />

        <AuthButton type="submit">Validar código</AuthButton>
      </form>

      <p className="mt-6 text-sm text-muted">
        <Link
          href="/forgot-password"
          className="font-semibold text-brand hover:underline"
        >
          Solicitar un nuevo código
        </Link>
      </p>
    </>
  );
}

export default function VerifyCodePage() {
  return (
    <AuthLayout>
      <AuthCard>
        <Suspense fallback={<p className="text-sm text-muted">Cargando...</p>}>
          <VerifyCodeForm />
        </Suspense>
      </AuthCard>
    </AuthLayout>
  );
}
