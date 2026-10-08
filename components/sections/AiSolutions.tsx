import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { aiSolutions } from "@/content/site";

export function AiSolutions() {
  const { items } = aiSolutions;

  return (
    <section className="py-[62px] lg:py-[82px]">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[32px] bg-navy p-[22px] text-white shadow-[var(--shadow)] sm:p-[34px] lg:p-[54px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[-140px] right-[-120px] size-[380px] rounded-full bg-[radial-gradient(circle,rgb(255_122_26_/_0.35),transparent_68%)]"
          />

          <div className="relative grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Eyebrow tone="light">{aiSolutions.eyebrow}</Eyebrow>
              <h2 className="mt-3.5 text-[clamp(2rem,3vw,3.2rem)] leading-[1.04] font-bold tracking-[-0.045em]">
                {aiSolutions.title}
              </h2>
              <p className="mt-5 text-[1.05rem] text-white/75">
                {aiSolutions.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <article
                  key={item.name}
                  className="rounded-[22px] border border-white/15 bg-white/10 p-6"
                >
                  <Image
                    src={item.logo}
                    alt={item.alt}
                    width={70}
                    height={70}
                    loading="lazy"
                    className="mb-3.5 h-[70px] w-auto object-contain"
                  />
                  <h3 className="text-[1.25rem] leading-none font-bold tracking-[-0.045em]">
                    {item.name}
                  </h3>
                  <p className="mt-2.5 text-[0.96rem] text-white/75">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
