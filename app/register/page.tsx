"use client";

import AuthCard from "@/components/auth/AuthCard";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <h1 className="text-3xl font-bold mb-6">
          Creá tu cuenta
        </h1>

        <div className="space-y-4">

          <AuthInput
            placeholder="Nombre"
          />

          <AuthInput
            placeholder="Apellido"
          />

          <AuthInput
            type="email"
            placeholder="Correo"
          />

          <AuthInput
            type="password"
            placeholder="Contraseña"
          />

          <AuthButton>
            Crear cuenta
          </AuthButton>

        </div>

      </AuthCard>
    </AuthLayout>
  );
}