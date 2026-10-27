import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/cn";

export default function ForgotPassword() {
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
              Ingresá el código de verificación.
            </h1>
            <p className="mt-2 text-[14px] text-muted">
              Te enviaremos un código para verificar tu identidad.
            </p>
          </div>

          <form className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[12px] font-semibold text-ink">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                className="h-[44px] w-full rounded-[12px] border border-[#E8E6ED] px-4 text-[14px] text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10"
              />
            </div>

            <button
              type="submit"
              className={cn(
                "h-[48px] w-full rounded-full text-base font-bold text-white",
                "bg-gradient-to-r from-[#6F2CFF] to-[#FF7A1A]",
              )}
            >
              Verificar y continuar
            </button>

            <div className="text-center">
              <Link href="/auth/login" className="text-[14px] font-semibold text-brand">
                Cancelar recuperación
              </Link>
            </div>
          </form>

          <p className="mt-8 text-center text-[13px] text-muted">
            Tu información, siempre protegida.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
