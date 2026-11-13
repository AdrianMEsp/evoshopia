"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import AuthAlert from "@/components/auth/AuthAlert";
import AuthButton from "@/components/auth/AuthButton";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";
import { resetPassword } from "@/lib/auth";
import { getErrorMessage } from "@/lib/api";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeFromUrl = searchParams?.get("code") ?? "";

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const codeToUse = (codeFromUrl || code).trim();

    if (!codeToUse) {
      setError("Falta el código de recuperación.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setPending(true);
    setError(null);

    try {
      await resetPassword(codeToUse, password, passwordConfirmation);
      router.replace("/password-updated");
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">Nueva contraseña</h1>
      <p className="mb-6 text-sm text-muted">
        Crea una contraseña nueva para volver a acceder a tu cuenta.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error ? <AuthAlert>{error}</AuthAlert> : null}

        {!codeFromUrl ? (
          <AuthInput
            name="code"
            placeholder="Código de recuperación"
            autoComplete="one-time-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            required
          />
        ) : null}

        <AuthInput
          type="password"
          name="password"
          placeholder="Nueva contraseña (mínimo 6 caracteres)"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <AuthInput
          type="password"
          name="passwordConfirmation"
          placeholder="Confirmar nueva contraseña"
          autoComplete="new-password"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          required
        />

        <AuthButton type="submit" loading={pending}>
          Actualizar contraseña
        </AuthButton>
      </form>

      <p className="mt-6 text-sm text-muted">
        <Link href="/login" className="font-semibold text-brand hover:underline">
          Volver al inicio de sesión
        </Link>
      </p>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <Suspense fallback={<p className="text-sm text-muted">Cargando...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </AuthCard>
    </AuthLayout>
  );
}
