"use client";

import { useRouter } from "next/navigation";

export default function VerifyCodePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">

        <h1 className="text-3xl font-bold mb-6">
          Ingresá el código
        </h1>

        <input
          placeholder="123456"
          className="w-full border rounded-lg p-3 mb-6"
        />

        <button
          onClick={() => router.push("/reset-password")}
          className="w-full rounded-full bg-purple-600 text-white py-3"
        >
          Validar código
        </button>

      </div>
    </main>
  );
}