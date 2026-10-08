import Image from "next/image";
import { CheckIcon, iconMap } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { founder, hero } from "@/content/site";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-[54px] pb-16 lg:pt-[86px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-20%] right-[-10%] left-[45%] h-[680px] bg-[radial-gradient(circle_at_center,rgb(91_34_232_/_0.18),transparent_62%)]"
      />
      <div className="text-center">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
      </div>

      <Container className="relative grid items-center gap-[58px] lg:grid-cols-[1.06fr_0.94fr]">
        <Reveal>

          <h1 className="mt-[18px] max-w-[850px] text-[clamp(2.35rem,5vw,4.95rem)] leading-[1.04] font-bold tracking-[-0.045em]">
            {hero.title}
          </h1>

          <p className="mt-[22px] max-w-[680px] text-[clamp(1.05rem,1.5vw,1.28rem)] text-muted">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>

          <div className="mt-[42px] grid gap-3.5 lg:grid-cols-3">
            {hero.highlights.map(({ icon, title, text }) => {
              const Icon = iconMap[icon];
              return (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-[18px] border border-line bg-surface/90 p-4"
                >
                  <Icon className="mt-0.5 size-5 shrink-0" />
                  <div>
                    <strong className="block text-[0.9rem]">{title}</strong>
                    <small className="mt-0.5 block text-[0.8rem] text-muted">
                      {text}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="relative isolate">
          <div
            aria-hidden="true"
            className="absolute top-[5%] right-[-2%] bottom-0 left-[10%] -z-10 rounded-full border-[24px] border-brand/20 border-r-accent/70 max-sm:hidden"
          />

          <Image
            src={founder.image}
            alt={founder.alt}
            width={800}
            height={800}
            priority
            className="w-[min(420px,90%)] rounded-[34px] drop-shadow-[0_24px_42px_rgb(16_24_40_/_0.18)] max-lg:mx-auto lg:ml-auto"
          />

          <aside className="absolute bottom-[7%] left-[4%] w-[min(340px,76%)] rounded-[20px] border border-white/15 bg-navy/95 p-[22px] text-white shadow-[0_22px_50px_rgb(6_20_46_/_0.25)] backdrop-blur-[12px] max-sm:relative max-sm:bottom-auto max-sm:left-auto max-sm:-mt-2.5 max-sm:w-full">
            <h3 className="text-[1.5rem] leading-none font-bold tracking-[-0.045em]">
              {founder.name}
            </h3>
            <p className="mt-1.5 mb-3 text-[0.9rem] font-extrabold text-[#ffbf84]">
              {founder.role}
            </p>
            <ul className="grid gap-1.5 text-[0.86rem]">
              {founder.credentials.map((credential) => (
                <li key={credential} className="flex items-center gap-2">
                  <CheckIcon className="size-4 shrink-0 text-[#ff9d4d]" />
                  <span>{credential}</span>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </Container>
    </section>
  );
}
