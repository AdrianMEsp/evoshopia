import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { aiSolutions } from "@/content/site";

export function AiSolutions() {
  const { items } = aiSolutions;

  return (
    <section className="relative overflow-hidden bg-[#2e1554] py-[62px] text-white lg:py-[82px]">
      <div
        aria-hidden="true"
        className="absolute top-[-150px] left-[46%] size-[360px] rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-190px] left-[58%] size-[420px] rounded-full border-[70px] border-[#7134ff]/15"
      />

      <Container className="relative">
        <Reveal className="mx-auto mb-12 max-w-[980px] text-center sm:mb-14">
          <Eyebrow
            tone="light"
            className="border-white/15 bg-[#8173b4]/45 px-5 py-2.5 text-[0.76rem] tracking-[0.12em] text-white shadow-[0_8px_24px_rgb(15_8_35_/_0.18)]"
          >
            {aiSolutions.eyebrow}
          </Eyebrow>
          <h2 className="mx-auto mt-4 max-w-[980px] text-[clamp(2.15rem,4.2vw,3.4rem)] leading-[1.1] font-bold tracking-[-0.045em] text-white">
            {aiSolutions.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[900px] text-[1rem] leading-[1.55] text-[#dcd2ee]">
            {aiSolutions.description}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.name} delay={index * 70} className="h-full">
              <article className="group relative grid min-h-[190px] grid-cols-[54px_88px_1fr] items-center gap-5 border-y border-white/12 px-2 py-7 first:border-b-0 sm:gap-6 sm:px-6 md:min-h-[210px] md:px-10 md:first:border-r md:first:border-b-white/12">
                <span className="text-[1.45rem] leading-none font-black tracking-[-0.04em] text-[#b99cff]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative grid size-[88px] place-items-center overflow-hidden rounded-xl bg-white transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                  <Image
                    src={item.logo}
                    alt={item.alt}
                    width={84}
                    height={84}
                    loading="lazy"
                    sizes="88px"
                    className="max-h-[84px] max-w-[84px] object-contain"
                  />
                </div>

                <div className="relative max-w-[390px]">
                  <h3 className="text-[1.35rem] leading-tight font-extrabold tracking-[-0.03em] text-white">
                    {item.name}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-3 block h-1 w-10 rounded-full bg-[#bd9cff] transition-all duration-300 group-hover:w-16"
                  />
                  <p className="mt-4 text-[0.92rem] leading-[1.55] text-[#dcd2ee]">
                    {item.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
