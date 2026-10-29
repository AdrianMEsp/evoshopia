"use client";

import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">

        <h1 className="text-3xl font-bold mb-6">
          Nueva contraseña
        </h1>

        <input
          type="password"
          placeholder="Nueva contraseña"
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="w-full border rounded-lg p-3 mb-6"
        />

        <button
          onClick={() => router.push("/password-updated")}
          className="w-full rounded-full bg-purple-600 text-white py-3"
        >
          Actualizar contraseña
        </button>

      </div>
    </main>
  );
}