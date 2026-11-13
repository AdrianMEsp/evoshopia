"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthAlert from "@/components/auth/AuthAlert";
import AuthButton from "@/components/auth/AuthButton";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";
import { useAuth } from "@/components/auth/AuthProvider";
import { getErrorMessage } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Ingresa tu nombre.");
      return;
    }

    if (!email.trim()) {
      setError("Ingresa tu correo electrónico.");
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
      const result = await signUp({
        name,
        lastname,
        email,
        password,
      });

      if (result.authenticated) {
        router.replace("/dashboard");
        return;
      }

      router.replace(
        `/check-email?type=confirmation&email=${encodeURIComponent(
          email.trim().toLowerCase(),
        )}`,
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
        <h1 className="mb-2 text-3xl font-bold">Crea tu cuenta</h1>
        <p className="mb-6 text-sm text-muted">
          Completa tus datos para comenzar tu formación.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error ? <AuthAlert>{error}</AuthAlert> : null}

          <AuthInput
            name="name"
            placeholder="Nombre"
            autoComplete="given-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <AuthInput
            name="lastname"
            placeholder="Apellido"
            autoComplete="family-name"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />

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
            placeholder="Contraseña (mínimo 6 caracteres)"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <AuthInput
            type="password"
            name="passwordConfirmation"
            placeholder="Confirmar contraseña"
            autoComplete="new-password"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
          />

          <AuthButton type="submit" loading={pending}>
            Crear cuenta
          </AuthButton>
        </form>

        <p className="mt-6 text-sm text-muted">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="font-semibold text-brand hover:underline">
            Inicia sesión
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}
