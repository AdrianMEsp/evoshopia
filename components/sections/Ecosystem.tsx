
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ecosystem } from "@/content/site";

export function Ecosystem() {
  const { items } = ecosystem;
  const cardAccents = [
    "bg-[#c6a2ff]",
    "bg-[#ffd0aa]",
  ];

  return (
    <section
      id="ecosistema"
      className="relative overflow-hidden bg-white py-[72px] lg:py-[88px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 right-[7%] size-[116px] rounded-b-full bg-[#f0e7ff]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[122px] right-[4.5%] size-[58px] bg-[radial-gradient(circle,#6f35ff_1px,transparent_1.5px)] [background-size:12px_12px]"
      />
      <Container className="relative">
        <Reveal className="mx-auto mb-14 max-w-[900px] text-center sm:mb-16">
          <Eyebrow
            tone="neutral"
            className="border-transparent bg-[#f1f1f3] px-3 py-1 text-[0.7rem] tracking-normal"
          >
            {ecosystem.eyebrow}
          </Eyebrow>
          <h2 className="mx-auto mt-4 max-w-[760px] text-[clamp(2rem,4vw,2.65rem)] leading-[1.08] font-extrabold tracking-[-0.045em] text-[#111111]">
            {ecosystem.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[760px] text-[0.95rem] leading-[1.55] text-[#8574a8]">
            {ecosystem.description}
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-[1000px] gap-5 md:grid-cols-2 md:gap-6">
          {items.slice(0, 2).map((item, index) => (
            <Reveal key={item.name} delay={index * 70} className="h-full">
              <article className="group relative flex h-full min-h-[190px] items-center gap-5 overflow-hidden rounded-[22px] border border-[#f0edf7] bg-white p-6 shadow-[0_10px_24px_rgb(16_24_40_/_0.07)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow)] sm:min-h-[210px] sm:gap-6 sm:p-7">
                <span
                  aria-hidden="true"
                  className={`absolute -top-7 -right-7 size-[116px] rounded-bl-[96px] transition-transform duration-500 group-hover:scale-110 ${cardAccents[index]}`}
                />
                <div className="relative z-10 grid size-[68px] shrink-0 place-items-center rounded-full bg-[#fbfbfd] transition-transform duration-300 group-hover:scale-105 sm:size-[76px]">
                  <Image
                    src={item.logo}
                    alt={item.alt}
                    width={76}
                    height={76}
                    loading="lazy"
                    sizes="76px"
                    className="max-h-[68px] max-w-[68px] object-contain"
                  />
                </div>
                <div className="relative z-10 min-w-0 pr-2">
                  <h3 className="text-[1rem] leading-[1.15] font-extrabold tracking-[-0.03em] text-[#111111] sm:text-[1.1rem]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-[0.84rem] leading-[1.45] text-[#374268] sm:text-[0.9rem]">
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
