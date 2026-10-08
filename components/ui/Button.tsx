import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2.5 rounded-full px-5 py-[13px] text-base font-bold transition duration-200 ease-out";

const variantClasses: Record<Variant, string> = {
  primary:
    "border border-transparent brand-gradient text-white shadow-[0_14px_30px_rgb(91_34_232_/_0.24)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgb(91_34_232_/_0.28)]",
  secondary:
    "border border-line bg-surface shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-brand/40",
  light:
    "border border-transparent bg-white text-neutral-900 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgb(0_0_0_/_0.18)]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  ariaLabel,
  onClick,
}: ButtonProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </a>
  );
}
