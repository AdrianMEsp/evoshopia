import Image from "next/image";
import { CheckIcon, iconMap } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { founder, hero } from "@/content/site";

export function Hero() {
  const ArrowRightIcon = iconMap["arrow-right"];

  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-[30px] pb-14 sm:pb-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-18%] right-[-8%] left-[35%] h-[560px] bg-[radial-gradient(circle_at_center,rgb(91_34_232_/_0.1),transparent_65%)]"
      />

      <Container className="relative">
        <Reveal className="text-center">
          <div className="flex justify-center">
            <Eyebrow
              tone="neutral"
              className="px-3 py-1 text-[0.75rem] tracking-[0.025em]"
            >
              {hero.eyebrow}
            </Eyebrow>
          </div>

          <h1 className="mx-auto mt-7 max-w-[850px] text-[clamp(2.25rem,4.4vw,3rem)] leading-[1.08] font-bold tracking-[-0.045em] text-[#111111]">
            {hero.title}
          </h1>

          <p className="mx-auto mt-6 max-w-[800px] text-[clamp(0.94rem,1.35vw,1rem)] leading-6 text-muted">
            {hero.description}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-14">
            <Button
              href={hero.primaryCta.href}
              className="gap-3 px-6 py-[9px] text-[0.9rem] shadow-none"
            >
              {hero.primaryCta.label}
              <ArrowRightIcon className="size-4" />
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="secondary"
              className="gap-3 border-[#384263] px-6 py-[9px] text-[0.9rem] shadow-none"
            >
              {hero.secondaryCta.label}
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </Reveal>

        <Reveal
          delay={100}
          className="mx-auto mt-12 grid max-w-[860px] overflow-hidden rounded-[20px] border border-[#f0edf7] bg-white shadow-[0_12px_24px_rgb(16_24_40_/_0.08)] md:min-h-[265px] md:grid-cols-[1fr_1.08fr]"
        >
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <h2 className="text-[1.7rem] leading-tight font-bold tracking-[-0.045em] text-[#111111]">
              {founder.name}
            </h2>
            <p className="mt-1.5 border-b border-[#f0edf7] pb-2 text-[0.86rem] font-extrabold text-accent">
              {founder.role}
            </p>
            <ul className="mt-2 grid gap-1.5">
              {founder.credentials.map((credential, index) => {
                const CredentialIcon = [
                  iconMap.brain,
                  iconMap.ai,
                  iconMap.pulse,
                  iconMap.heart,
                ][index];

                return (
                <li
                  key={credential}
                  className="flex items-center gap-2 text-[0.79rem] text-[#475467]"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#f1e8ff] text-brand">
                    {CredentialIcon ? (
                      <CredentialIcon className="size-3" />
                    ) : (
                      <CheckIcon className="size-3" />
                    )}
                  </span>
                  <span>{credential}</span>
                </li>
                );
              })}
            </ul>
          </div>

          <div className="relative min-h-[265px] overflow-hidden bg-white max-md:min-h-[250px]">
            <div
              aria-hidden="true"
              className="absolute top-[12%] left-[3%] size-[220px] rounded-full border-2 border-[#eee5ff]"
            />
            <div
              aria-hidden="true"
              className="absolute right-[-12%] bottom-[-48%] size-[230px] rounded-full bg-[#fff1e5]"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-[42%] left-[4%] size-[230px] rounded-full bg-[#f3edff]"
            />
            <span
              aria-hidden="true"
              className="absolute top-[11%] right-[6%] z-10 size-3 rounded-full bg-brand"
            />
            <span
              aria-hidden="true"
              className="absolute top-[32%] left-[7%] z-10 size-2.5 rounded-full bg-accent"
            />
            <Image
              src={founder.image}
              alt={founder.alt}
              width={320}
              height={320}
              priority
              sizes="(max-width: 767px) 70vw, 320px"
              className="absolute bottom-0 left-1/2 z-10 h-full w-[70%] -translate-x-1/2 object-contain object-bottom"
            />
            <div className="absolute top-[40%] right-[11%] z-20 w-[138px] rounded-[14px] bg-white p-3.5 shadow-[0_8px_20px_rgb(16_24_40_/_0.12)]">
              <span
                aria-hidden="true"
                className="mb-2.5 block size-5 rounded-full bg-[#f1e8ff]"
              />
              <p className="text-[0.7rem] leading-[1.15] font-extrabold text-[#111111]">
                lorem lorem
                <br />
                lorem
              </p>
              <span
                aria-hidden="true"
                className="mt-2.5 block h-px w-12 bg-brand/50"
              />
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={180}
          className="mx-auto mt-11 grid max-w-[900px] gap-5 sm:grid-cols-3 sm:gap-6"
        >
          {hero.highlights.map(({ icon, title, text }, index) => {
            const Icon = iconMap[icon];
            const iconColor = index === 1 ? "bg-brand" : "bg-accent";

            return (
              <div
                key={title}
                className="flex items-center gap-3"
              >
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-[9px] text-white ${iconColor}`}
                >
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <strong className="block text-[0.84rem]">{title}</strong>
                  <small className="block text-[0.7rem] text-[#98a2b3]">
                    {text}
                  </small>
                </div>
                <ArrowRightIcon className="ml-auto size-3.5 shrink-0 text-navy" />
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
