import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/cn";
import { Check } from "lucide-react";

export default function NewPassword() {
  const requirements = [
    "Mínimo 8 caracteres",
    "Una letra mayúscula",
    "Una letra minúscula",
    "Un número",
  ];

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
              Creá tu nueva contraseña.
            </h1>
          </div>

          <form className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword" className="text-[12px] font-semibold text-ink">
                Nueva contraseña
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                className="h-[44px] w-full rounded-[12px] border border-[#E8E6ED] px-4 text-[14px] text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmNewPassword" className="text-[12px] font-semibold text-ink">
                Confirmar contraseña
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                placeholder="Confirma tu nueva contraseña"
                className="h-[44px] w-full rounded-[12px] border border-[#E8E6ED] px-4 text-[14px] text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10"
              />
            </div>

            <div className="rounded-[12px] border border-[#E8E6ED] bg-surface px-4 py-3">
              <p className="mb-2 text-[13px] font-semibold text-ink">Requisitos:</p>
              <ul className="flex flex-col gap-1.5">
                {requirements.map((req) => (
                  <li key={req} className="flex items-center gap-2 text-[13px] text-muted">
                    <Check className="h-4 w-4 text-[#22C55E]" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              className={cn(
                "h-[48px] w-full rounded-full text-base font-bold text-white",
                "bg-gradient-to-r from-[#6F2CFF] to-[#FF7A1A]",
              )}
            >
              Guardar nueva contraseña
            </button>
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
