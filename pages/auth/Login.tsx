import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/cn";

export default function Login() {
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
              Bienvenidos
            </h1>
            <p className="mt-2 text-[14px] text-muted">
              Ingresá a tu cuenta y retomá tu camino.
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

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[12px] font-semibold text-ink">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                className="h-[44px] w-full rounded-[12px] border border-[#E8E6ED] px-4 text-[14px] text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10"
              />
            </div>

            <div className="flex items-center justify-between text-[14px]">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#E8E6ED] text-brand focus:ring-brand/20"
                />
                <span className="text-ink">Recordarme</span>
              </label>
              <Link href="/auth/forgot-password" className="font-semibold text-brand">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              className={cn(
                "h-[48px] w-full rounded-full text-base font-bold text-white",
                "bg-gradient-to-r from-[#6F2CFF] to-[#FF7A1A]",
              )}
            >
              Iniciar sesión
            </button>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-line" />
              <span className="mx-4 text-[14px] text-muted">o continuá con</span>
              <div className="flex-grow border-t border-line" />
            </div>

            <button
              type="button"
              className="flex h-[48px] w-full items-center justify-center gap-2 rounded-full border border-line bg-surface text-base font-semibold text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>
                <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
                <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
                <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 3.57955 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
              </svg>
              Continuar con Google
            </button>

            <p className="text-center text-[14px] text-ink">
              ¿Todavía no tenés una cuenta?{" "}
              <Link href="/auth/register" className="font-semibold text-brand">
                Registrate
              </Link>
            </p>
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
