"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MenuIcon, CloseIcon, CartIcon } from "@/components/icons";
import { useAuth } from "@/components/auth/AuthProvider";
import { useCart } from "@/components/cart/CartProvider";
import { SignOutDialog } from "@/components/auth/SignOutDialog";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/content/site";
import { canPurchaseCourses, getUserDisplayName } from "@/lib/auth";
import { cn } from "@/lib/cn";
import Logo from "@/public/images/brand/evosistencia.png";

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [signOutDialogOpen, setSignOutDialogOpen] = useState(false);
  const [signOutPending, setSignOutPending] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, status, signOut } = useAuth();
  const { itemCount } = useCart();
  const onHome = pathname === "/";
  const resolveHref = (href: string) => {
    if (href.startsWith("/")) return href;
    if (href.startsWith("#")) return onHome ? href : `/${href}`;
    return href;
  };
  const isAuthenticated = status === "authenticated" && Boolean(user);
  const canPurchase = isAuthenticated && canPurchaseCourses(user);
  const displayName = getUserDisplayName(user).split(" ")[0];

  useEffect(() => {
    if (!onHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    navLinks
      .filter(({ href }) => href.startsWith("#"))
      .forEach(({ href }) => {
        const section = document.getElementById(href.slice(1));
        if (section) observer.observe(section);
      });

    return () => observer.disconnect();
  }, [onHome]);

  const closeMenu = () => setOpen(false);

  const handleSignOut = async () => {
    setSignOutPending(true);
    try {
      await signOut();
      setSignOutDialogOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setSignOutPending(false);
    }
  };

  const requestSignOut = () => {
    closeMenu();
    setSignOutDialogOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line/85 bg-background/90 backdrop-blur-[18px]">
      <Container className="flex h-19 items-center justify-between gap-6 max-sm:h-16 max-sm:gap-4">
        <Link
          href={resolveHref("#inicio")}
          aria-label="Evosistencia inicio"
          className="flex min-w-[184px] items-center max-sm:min-w-0"
          onClick={closeMenu}
        >
          <Image
            src={Logo}
            alt="Evosistencia"
            width={190}
            height={52}
            priority
            className="h-[52px] w-[190px] object-contain object-left max-sm:h-[40px] max-sm:w-auto"
          />
        </Link>

        <nav
          aria-label="Menú principal"
          className="hidden flex-1 items-center justify-center gap-[clamp(14px,1.3vw,26px)] text-[0.92rem] font-semibold text-muted lg:flex"
        >
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (onHome && activeHref === link.href);
            return (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                onClick={closeMenu}
                aria-current={pathname === link.href ? "page" : undefined}
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
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              {canPurchase ? (
                <Link
                  href="/cart"
                  onClick={closeMenu}
                  aria-label={`Mi carrito, ${itemCount} ${itemCount === 1 ? "curso" : "cursos"}`}
                  className="relative inline-flex size-[46px] shrink-0 items-center justify-center rounded-full border border-line bg-surface text-muted shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand"
                >
                  <CartIcon className="size-5" />
                  {itemCount > 0 ? (
                    <span
                      aria-hidden="true"
                      className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full brand-gradient text-[0.68rem] font-bold text-white"
                    >
                      {itemCount}
                    </span>
                  ) : null}
                </Link>
              ) : null}
              <Button
                href="/dashboard"
                variant="secondary"
                onClick={closeMenu}
                className="hidden max-w-[190px] truncate text-brand lg:inline-flex"
              >
                {displayName}
              </Button>
              <button
                type="button"
                onClick={requestSignOut}
                className="inline-flex h-[46px] items-center 
                justify-center rounded-full border border-line bg-surface 
                px-[18px] text-sm font-bold text-muted shadow-[var(--shadow-soft)] hover:cursor-pointer
                transition duration-200 hover:-translate-y-0.5 hover:border-red-600
                  text-red-700"
              >
                Salir
              </button>
            </>
          ) : (
            <Button
              href="/login"
              variant="secondary"
              onClick={closeMenu}
              className="hidden shrink-0 whitespace-nowrap text-center text-brand lg:inline-flex"
            >
              Iniciar sesión
            </Button>
          )}

          <Button
            href={resolveHref("#contacto")}
            onClick={closeMenu}
            className="hidden shrink-0 whitespace-nowrap text-center lg:inline-flex"
          >
            Agendar reunión
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="text-ink lg:hidden max-lg:-m-2 max-lg:p-2 hover:cursor-pointer"
        >
          {open ? (
            <CloseIcon className="size-7" />
          ) : (
            <MenuIcon className="size-7" />
          )}
        </button>
      </Container>

      {/* Modo Mobile - Celular */}
      {open ? (
        <nav
          aria-label="Menú de navegación"
          className="absolute inset-x-5 top-[82px] flex max-h-[calc(100dvh-96px)] flex-col items-start gap-4 overflow-y-auto rounded-[22px] border border-line bg-surface p-[22px] shadow-[var(--shadow)] lg:hidden max-sm:top-[70px] max-sm:p-[18px]"
        >
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (onHome && activeHref === link.href);

            return (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                onClick={closeMenu}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "flex min-h-[40px] w-full items-center text-base font-semibold text-muted transition-colors hover:text-ink",
                  isActive && "text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {isAuthenticated ? (
            <>
              {canPurchase ? (
                <Link
                  href="/cart"
                  onClick={closeMenu}
                  className="flex min-h-[44px] w-full items-center gap-3 text-base font-semibold text-muted transition-colors hover:text-ink"
                >
                  <CartIcon className="size-5" />
                  Mi carrito {itemCount > 0 ? `(${itemCount})` : ""}
                </Link>
              ) : null}
              <Button href="/dashboard" variant="secondary" onClick={closeMenu} className="w-full text-brand">
                {displayName}
              </Button>
              <button
                type="button"
                onClick={requestSignOut}
                className="inline-flex w-full items-center justify-center rounded-full border border-line bg-surface px-5 py-[13px] text-base font-bold text-muted shadow-[var(--shadow-soft)] transition hover:cursor-pointer hover:border-brand/40 hover:text-ink"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Button href="/login" variant="secondary" onClick={closeMenu} className="w-full text-brand">
              Iniciar sesión
            </Button>
          )}

          <Button href={resolveHref("#contacto")} onClick={closeMenu} className="w-full">
            Agendar reunión
          </Button>
        </nav>
      ) : null}

      <SignOutDialog
        open={signOutDialogOpen}
        pending={signOutPending}
        onCancel={() => setSignOutDialogOpen(false)}
        onConfirm={() => void handleSignOut()}
      />
    </header>
  );
}
