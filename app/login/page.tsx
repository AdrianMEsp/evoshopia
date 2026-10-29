"use client";

import Link from "next/link";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard>

        <h1 className="text-3xl font-bold mb-6">
          Bienvenidos
        </h1>

        <div className="space-y-4">

          <AuthInput
            type="email"
            placeholder="Correo electrónico"
          />

          <AuthInput
            type="password"
            placeholder="Contraseña"
          />

          <AuthButton >
            Iniciar sesión
          </AuthButton>

        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm">

          <Link href="/forgot-password">
            ¿Olvidaste tu contraseña?
          </Link>

          <Link href="/register">
            Crear cuenta
          </Link>

        </div>

      </AuthCard>
    </AuthLayout>
  );
}