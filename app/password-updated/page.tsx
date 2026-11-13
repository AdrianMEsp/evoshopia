"use client";

import Link from "next/link";

import AuthCard from "@/components/auth/AuthCard";
import AuthLayout from "@/components/auth/AuthLayout";

export default function PasswordUpdatedPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <div className="text-center">
          <span className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-emerald-50 text-2xl text-emerald-600">
            ✓
          </span>

          <h1 className="mb-3 text-3xl font-bold">Contraseña actualizada</h1>

          <p className="mb-8 text-sm text-muted">
            Tu contraseña se actualizó correctamente. Ya puedes iniciar sesión
            con tus nuevas credenciales.
          </p>

          <Link
            href="/login?reset=1"
            className="brand-gradient block w-full rounded-xl px-5 py-3 text-center font-semibold text-white"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
