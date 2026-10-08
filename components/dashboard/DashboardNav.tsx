"use client";

import { useState } from "react";
import Link from "next/link";
import { iconMap } from "@/components/icons";
import { dashboardNav, dashboardUser } from "@/content/dashboard";
import { cn } from "@/lib/cn";

export function DashboardNav() {
  const [active, setActive] = useState(dashboardNav[0].label);

  return (
    <aside className="grid gap-3 self-start rounded-[22px] border border-line bg-surface p-4 shadow-[var(--shadow-soft)] max-sm:p-3 sm:grid-cols-[minmax(0,1fr)_auto] lg:flex lg:flex-col lg:gap-0 lg:sticky lg:top-[96px]">
      <div className="flex items-center gap-3 rounded-[16px] bg-surface-2 p-3 max-sm:p-2.5 sm:col-start-1 sm:row-start-1 sm:min-w-0">
        <span className="brand-gradient grid size-11 shrink-0 place-items-center rounded-full text-[0.9rem] font-bold text-white max-sm:size-9 max-sm:text-[0.8rem]">
          {dashboardUser.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[0.95rem] leading-tight font-bold">
            {dashboardUser.name}
          </p>
          <p className="mt-1 truncate text-[0.76rem] text-muted">
            {dashboardUser.role}
          </p>
        </div>
      </div>

      <nav
        aria-label="Navegación del dashboard"
        className="flex gap-2 overflow-x-auto pb-2.5 max-sm:snap-x max-sm:snap-proximity sm:col-span-2 sm:row-start-2 sm:flex-wrap sm:overflow-visible sm:pb-0 lg:mt-4 lg:flex-col lg:gap-1.5 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#c9d1dc]"
      >
        {dashboardNav.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = active === item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(item.label)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex shrink-0 snap-start items-center gap-2.5 rounded-full px-4 py-2.5 text-[0.9rem] font-semibold transition max-sm:px-3.5 max-sm:py-2 lg:w-full lg:rounded-[14px]",
                isActive
                  ? "brand-gradient text-white shadow-[0_10px_24px_rgb(91_34_232_/_0.22)]"
                  : "text-muted hover:bg-surface-2 hover:text-ink",
              )}
            >
              <Icon className="size-[18px] shrink-0" />
              <span>{item.label}</span>
              {item.count ? (
                <span
                  className={cn(
                    "ml-auto hidden rounded-full px-2 py-0.5 text-[0.72rem] font-bold lg:block",
                    isActive ? "bg-white/20" : "bg-brand/10 text-brand",
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <Link
        href="/"
        className="flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-[0.86rem] font-bold text-muted transition hover:-translate-y-0.5 hover:border-brand/40 hover:text-ink max-sm:py-2 max-sm:text-[0.82rem] sm:col-start-2 sm:row-start-1 lg:mt-4 lg:w-full"
      >
        Volver al sitio
      </Link>
    </aside>
  );
}
