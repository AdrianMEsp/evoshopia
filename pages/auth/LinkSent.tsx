import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/cn";

export default function LinkSent() {
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
              Revisá tu correo.
            </h1>
            <p className="mt-2 text-[14px] text-muted">
              Te enviamos un enlace de recuperación.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-5">
            <div className="rounded-[12px] border border-[#E8E6ED] bg-surface px-4 py-3 text-center text-[14px] text-ink">
              correo@ejemplo.com
            </div>

            <button
              type="button"
              className={cn(
                "h-[48px] w-full rounded-full text-base font-bold text-white",
                "bg-gradient-to-r from-[#6F2CFF] to-[#FF7A1A]",
              )}
            >
              Reenviar enlace
            </button>

            <div className="text-center">
              <Link href="/auth/login" className="text-[14px] font-semibold text-brand">
                Volver al inicio
              </Link>
            </div>
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
