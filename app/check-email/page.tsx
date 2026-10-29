"use client";

import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">

        <h1 className="text-3xl font-bold mb-4">
          Revisá tu correo
        </h1>

        <p className="text-muted-foreground mb-8">
          Te enviamos un correo con instrucciones para recuperar el acceso.
        </p>

        <Link
          href="/verify-code"
          className="block w-full text-center rounded-full bg-purple-600 text-white py-3"
        >
          Ingresar código
        </Link>
      </div>
    </main>
  );
}
