import { iconMap } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { programs } from "@/content/site";

export function Programs() {
  const ArrowRightIcon = iconMap["arrow-right"];
  const SparklesIcon = iconMap.sparkles;

  return (
    <section id="programas" className="bg-white py-[62px] lg:py-[82px]">
      <Container>
        <Reveal className="mx-auto mb-14 max-w-[760px] text-center sm:mb-16">
          <Eyebrow tone="neutral">{programs.eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-[700px] text-[clamp(2rem,4vw,2.7rem)] leading-[1.04] font-bold tracking-[-0.045em] text-[#111111]">
            {programs.title}
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {programs.items.map((program, index) => {
            const Icon = iconMap[program.icon];
            const isFeatured = index === 1;
            return (
              <Reveal
                key={program.title}
                delay={index * 70}
                className="h-full"
              >
                <article
                  className={`group relative flex h-full min-h-[340px] flex-col items-center overflow-hidden rounded-[24px] border px-7 pb-7 pt-9 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow)] sm:px-8 sm:pb-8 ${
                    index === 0
                      ? "border-[#d9c2ff] bg-[#fbf8ff] shadow-[0_16px_34px_rgb(91_34_232_/_0.12)] lg:-translate-y-2"
                      : "border-[#eee8f8] bg-white shadow-[0_10px_24px_rgb(16_24_40_/_0.06)]"
                  }`}
                >
                  {index === 0 ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 brand-gradient"
                    />
                  ) : null}
                  <div className="mb-6 flex min-h-[76px] w-full items-center justify-center">
                    <span
                      className={`grid size-[76px] place-items-center transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105 ${
                        index === 0
                          ? "bg-[#eee3ff] text-[#5b22e8]"
                          : "bg-[#f2edf8] text-brand"
                      }`}
                    >
                      <Icon className="size-8" />
                    </span>
                  </div>
                  <h3 className="text-[1.25rem] leading-tight font-extrabold tracking-[-0.035em] text-[#111111]">
                    {program.title}
                  </h3>
                  {index === 0 ? (
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#e4d4ff] bg-[#f4edff] px-3 py-1 text-[0.72rem] font-bold text-[#5b22e8]">
                      <SparklesIcon aria-hidden="true" className="size-3.5" />
                      Más popular
                    </span>
                  ) : null}
                  <p className="mt-4 max-w-[340px] text-[0.96rem] leading-[1.55] text-[#374268]">
                    {program.text}
                  </p>
                  <div className="mt-auto flex min-h-10 items-end justify-center pt-6">
                    {isFeatured ? (
                      <Button
                        href="#contacto"
                        className="gap-4 px-4 py-2 text-sm shadow-none"
                      >
                        Saber más
                        <ArrowRightIcon className="size-4" />
                      </Button>
                    ) : (
                      <a
                        href="#contacto"
                        aria-label={`Consultar por ${program.title}`}
                        className="grid size-11 place-items-center rounded-full bg-[#fff0e5] text-accent transition-transform hover:translate-x-1"
                      >
                        <ArrowRightIcon className="size-5" />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
