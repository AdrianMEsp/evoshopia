"use client";

import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import AuthLayout from "@/components/auth/AuthLayout";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // MÁS ADELANTE:
    // await supabase.auth.resetPasswordForEmail(email)

    router.push("/check-email");
  };

  return (
    <AuthLayout>
      <AuthCard>
        <h1 className="mb-3 text-3xl font-bold">
          Recuperar acceso
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Ingresá tu correo electrónico para recibir las instrucciones.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Correo electrónico"
            required
            className="
              w-full
              rounded-xl
              border
              p-3
            "
          />

          <button
            type="submit"
            className="
              w-full
              rounded-full
              bg-gradient-to-r
              from-violet-600
              to-orange-400
              py-3
              text-white
              font-medium
            "
          >
            Enviar instrucciones
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
