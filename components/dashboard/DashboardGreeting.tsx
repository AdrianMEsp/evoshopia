"use client";

import { ArrowRightIcon } from "@/components/icons";
import { useAuth } from "@/components/auth/AuthProvider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { dashboardGreeting } from "@/content/dashboard";
import { getUserFirstName } from "@/lib/auth";

export function DashboardGreeting() {
  const { user } = useAuth();
  const firstName = getUserFirstName(user);

  return (
    <section className="relative overflow-hidden rounded-[26px] bg-navy p-[26px] text-white shadow-[0_24px_60px_rgb(6_20_46_/_0.24)] max-sm:p-5 sm:p-[34px]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[-45%] right-[-8%] size-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgb(91_34_232_/_0.55),transparent_65%)] max-sm:size-[260px] sm:max-md:size-[300px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-60%] left-[35%] size-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgb(255_122_26_/_0.35),transparent_65%)] max-sm:size-[220px] sm:max-md:size-[250px]"
      />

      <div className="relative max-w-[720px]">
        <Eyebrow tone="light">{dashboardGreeting.eyebrow}</Eyebrow>
        <h1 className="mt-4 text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.05] font-bold tracking-[-0.045em]">
          {firstName ? `Hola, ${firstName}.` : dashboardGreeting.title}
        </h1>
        <p className="mt-3 text-[1.02rem] text-white/80">
          {dashboardGreeting.text}
        </p>

        <div className="mt-6 flex flex-wrap gap-3 max-sm:flex-col max-sm:gap-2.5">
          <a
            href={dashboardGreeting.primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-base font-bold text-neutral-900 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgb(0_0_0_/_0.18)] max-sm:w-full"
          >
            {dashboardGreeting.primaryCta.label}
            <ArrowRightIcon className="size-4" />
          </a>
          <a
            href={dashboardGreeting.secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-base font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/10 max-sm:w-full"
          >
            {dashboardGreeting.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
