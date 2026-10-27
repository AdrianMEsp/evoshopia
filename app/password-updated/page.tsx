"use client";

import { useRouter } from "next/navigation";

export default function PasswordUpdatedPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full text-center">

        <h1 className="text-3xl font-bold mb-4">
          Contraseña actualizada
        </h1>

        <p className="mb-8">
          Tu contraseña se actualizó correctamente.
        </p>

        <button
          onClick={() => router.push("/login")}
          className="w-full rounded-full bg-purple-600 text-white py-3"
        >
          Volver al login
        </button>

      </div>
    </main>
  );
}