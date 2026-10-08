import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/content/site";

export function CtaSection() {
  return (
    <section id="contacto" className="py-[62px] lg:py-[82px]">
      <Container>
        <Reveal className="brand-gradient flex flex-col gap-6 rounded-[30px] p-[30px] text-white shadow-[0_28px_70px_rgb(91_34_232_/_0.26)] sm:p-[42px_46px] lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[720px]">
            <h2 className="text-[clamp(1.8rem,3vw,2.7rem)] leading-[1.04] font-bold tracking-[-0.045em]">
              {cta.title}
            </h2>
            <p className="mt-2.5 text-[1.05rem] text-white/85">{cta.text}</p>
          </div>

          <Button href={cta.button.href} variant="light" className="shrink-0">
            {cta.button.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
