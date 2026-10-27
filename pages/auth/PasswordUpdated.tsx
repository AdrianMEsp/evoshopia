import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/cn";
import { CheckCircle2 } from "lucide-react";

export default function PasswordUpdated() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-6 py-10 sm:px-8">
        <div className="w-full max-w-[452px]">
          <div className="flex flex-col items-center text-center">
            <span className="mb-4 inline-flex items-center justify-center rounded-full border border-line bg-surface px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
              TU ESPACIO EVOSISTENCIA
            </span>
            <h1 className="text-[32px] font-bold leading-tight text-ink">
              Tu contraseña, actualizada.
            </h1>
            <p className="mt-2 text-[14px] text-muted">
              Ya podés volver a acceder a tu cuenta.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#22C55E]/10">
              <CheckCircle2 className="h-10 w-10 text-[#22C55E]" />
            </div>

            <Link
              href="/auth/login"
              className={cn(
                "flex h-[48px] w-full items-center justify-center rounded-full text-base font-bold text-white",
                "bg-gradient-to-r from-[#6F2CFF] to-[#FF7A1A]",
              )}
            >
              Iniciar sesión
            </Link>
          </div>

          <p className="mt-8 text-center text-[13px] text-muted">
            Tu información, siempre protegida.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
