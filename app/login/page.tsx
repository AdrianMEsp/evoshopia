"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import AuthAlert from "@/components/auth/AuthAlert";
import AuthButton from "@/components/auth/AuthButton";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";
import { useAuth } from "@/components/auth/AuthProvider";
import { getErrorMessage } from "@/lib/api";

function resolveNextPath(value: string | null): string {
  if (value && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  return "/dashboard";
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, status } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const nextPath = resolveNextPath(searchParams?.get("next") ?? null);
  const wasReset = searchParams?.get("reset") === "1";
  const wasRegistered = searchParams?.get("registered") === "1";

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(nextPath);
    }
  }, [nextPath, router, status]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Ingresa tu correo y contraseña.");
      return;
    }

    setPending(true);
    setError(null);

    try {
      await signIn(email, password);
      router.replace(nextPath);
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">Bienvenido</h1>
      <p className="mb-6 text-sm text-muted">
        Ingresa con tu correo y contraseña para acceder a tu espacio.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {wasRegistered ? (
          <AuthAlert tone="success">
            Tu cuenta fue creada correctamente. Inicia sesión para continuar.
          </AuthAlert>
        ) : null}

        {wasReset ? (
          <AuthAlert tone="success">
            Tu contraseña se actualizó. Inicia sesión con tu nueva contraseña.
          </AuthAlert>
        ) : null}

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

        <AuthInput
          type="password"
          name="password"
          placeholder="Contraseña"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <AuthButton type="submit" loading={pending}>
          Iniciar sesión
        </AuthButton>
      </form>

      <div className="mt-6 flex flex-col gap-3 text-sm font-semibold text-brand">
        <Link href="/forgot-password" className="hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>

        <Link href="/register" className="hover:underline">
          Crear cuenta
        </Link>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <Suspense
          fallback={
            <p className="text-sm text-muted">Cargando formulario...</p>
          }
        >
          <LoginForm />
        </Suspense>
      </AuthCard>
    </AuthLayout>
  );
}
