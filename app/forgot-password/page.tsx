"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthAlert from "@/components/auth/AuthAlert";
import AuthButton from "@/components/auth/AuthButton";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";
import { forgotPassword } from "@/lib/auth";
import { getErrorMessage } from "@/lib/api";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setError("Ingresa tu correo electrónico.");
      return;
    }

    setPending(true);
    setError(null);

    try {
      await forgotPassword(email);
      router.push(
        `/check-email?email=${encodeURIComponent(email.trim().toLowerCase())}`,
      );
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <h1 className="mb-2 text-3xl font-bold">Recuperar acceso</h1>
        <p className="mb-6 text-sm text-muted">
          Ingresa tu correo electrónico y te enviaremos las instrucciones para
          crear una nueva contraseña.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error ? <AuthAlert>{error}</AuthAlert> : null}

          <AuthInput
            type="email"
            name="email"
            placeholder="Correo electrónico"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <AuthButton type="submit" loading={pending}>
            Enviar instrucciones
          </AuthButton>
        </form>

        <p className="mt-6 text-sm text-muted">
          <Link href="/login" className="font-semibold text-brand hover:underline">
            Volver al inicio de sesión
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}
