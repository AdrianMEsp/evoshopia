"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/content/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const homeHref = (href: string) => (onHome ? href : `/${href}`);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    navLinks.forEach(({ href }) => {
      const section = document.getElementById(href.slice(1));
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/85 bg-background/90 backdrop-blur-[18px]">
      <Container className="flex h-[76px] items-center justify-between gap-6 max-sm:h-[64px] max-sm:gap-4">
        <a
          href={homeHref("#inicio")}
          aria-label="Evosistencia inicio"
          className="flex min-w-[184px] items-center max-sm:min-w-0"
          onClick={closeMenu}
        >
          <Image
            src="/images/brand/evosistencia.png"
            alt="Evosistencia"
            width={190}
            height={52}
            priority
            className="h-[52px] w-[190px] object-contain object-left max-sm:h-[40px] max-sm:w-auto"
          />
        </a>

        <nav
          aria-label="Menú principal"
          className="hidden items-center gap-[26px] text-[0.92rem] font-semibold text-muted lg:flex"
        >
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={homeHref(link.href)}
                onClick={closeMenu}
                className={cn(
                  "relative transition-colors duration-200 hover:text-ink",
                  isActive && "text-ink",
                )}
              >
                {link.label}
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="brand-gradient absolute -bottom-2.5 left-0 h-0.5 w-full rounded"
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            href="/dashboard"
            variant="secondary"
            onClick={closeMenu}
            className="hidden text-brand lg:inline-flex"
          >
            Iniciar sesión
          </Button>

          <Button
            href={homeHref("#contacto")}
            onClick={closeMenu}
            className="hidden lg:inline-flex"
          >
            Agendar reunión
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="text-ink lg:hidden max-lg:-m-2 max-lg:p-2"
        >
          {open ? (
            <CloseIcon className="size-7" />
          ) : (
            <MenuIcon className="size-7" />
          )}
        </button>
      </Container>

      {open ? (
        <nav
          aria-label="Menú de navegación"
          className="absolute inset-x-5 top-[82px] flex max-h-[calc(100dvh-96px)] flex-col items-start gap-4 overflow-y-auto rounded-[22px] border border-line bg-surface p-[22px] shadow-[var(--shadow)] lg:hidden max-sm:top-[70px] max-sm:p-[18px]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={homeHref(link.href)}
              onClick={closeMenu}
              className="flex min-h-[40px] w-full items-center text-base font-semibold text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <Button href="/dashboard" variant="secondary" onClick={closeMenu} className="w-full text-brand">
            Iniciar sesión
          </Button>
          <Button href={homeHref("#contacto")} onClick={closeMenu} className="w-full">
            Agendar reunión
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
