import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/content/site";

export function CtaSection() {
  return (
    <section id="contacto" className="bg-[#241344] py-[68px] lg:py-[76px]">
      <Container>
        <Reveal className="flex flex-col items-center text-center text-white">
          <CalendarDays
            aria-hidden="true"
            className="motion-float size-6 text-white/60"
            strokeWidth={1.2}
          />
          <h2 className="mt-6 text-[clamp(1.8rem,3vw,2.35rem)] leading-[1.08] font-bold tracking-[-0.035em]">
            {cta.title}
          </h2>
          <p className="mt-5 max-w-[500px] text-[0.88rem] leading-[1.45] text-white/70">
            {cta.text}
          </p>
          <Button
            href={cta.button.href}
            className="mt-6 gap-2 px-6 py-[9px] text-[0.82rem] shadow-none"
          >
            {cta.button.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
