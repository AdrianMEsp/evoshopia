import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  tone?: "brand" | "light";
}

const toneClasses: Record<"brand" | "light", string> = {
  brand: "border-brand/35 bg-surface/80 text-brand",
  light: "border-white/25 bg-white/10 text-white",
};

export function Eyebrow({ children, className, tone = "brand" }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-[7px] text-[0.78rem] font-extrabold tracking-[0.08em] uppercase",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
