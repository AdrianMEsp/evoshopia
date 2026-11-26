import Image from "next/image";
import { iconMap } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { reasons } from "@/content/site";

const reasonImages = [
  { src: "/images/brand/engineering.jpg", alt: "Ingeniera trabajando con equipos técnicos" },
  { src: "/images/brand/psychology-conversation.jpg", alt: "Dos profesionales conversando y compartiendo ideas" },
  { src: "/images/brand/ai.jpg", alt: "Visualización conceptual de inteligencia artificial" },
  { src: "/images/brand/wellbeing.jpg", alt: "Persona practicando meditación y autocuidado" },
  { src: "/images/brand/innovation.jpg", alt: "Equipo colaborando en un espacio de innovación" },
];

export function WhyEvosistencia() {
  return (
    <section id="por-que" className="bg-[#f4ecff] py-[62px] lg:py-[82px]">
      <Container>
        <Reveal className="mx-auto mb-14 max-w-[900px] text-center sm:mb-16">
          <Eyebrow
            tone="neutral"
            className="border-transparent bg-[#f1f1f3] px-3 py-1 text-[0.7rem] tracking-normal"
          >
            {reasons.eyebrow}
          </Eyebrow>
          <h2 className="mx-auto mt-4 max-w-[1040px] text-[clamp(2rem,4vw,2.65rem)] leading-[1.02] font-extrabold tracking-[-0.045em] text-[#111111]">
            {reasons.title}
          </h2>
        </Reveal>

        <div className="relative mx-auto max-w-[920px] before:absolute before:top-[56px] before:bottom-[82px] before:left-[34px] before:w-px before:bg-[#c9a8ff] before:content-[''] sm:before:top-[60px] sm:before:bottom-[86px] sm:before:left-[44px]">
          {reasons.items.map((reason, index) => {
            const Icon = iconMap[reason.icon];
            const image = reasonImages[index];
            return (
              <Reveal
                key={reason.title}
                delay={index * 50}
              >
                <article
                  className={`group relative grid min-h-[112px] grid-cols-[44px_32px_minmax(0,1fr)] items-center gap-3 border-l-2 border-transparent px-3 py-5 transition-all duration-300 hover:rounded-r-xl hover:bg-[#dfcef3] sm:min-h-[120px] sm:grid-cols-[60px_52px_minmax(0,1fr)] sm:gap-5 sm:px-5 xl:grid-cols-[60px_52px_minmax(0,1fr)_180px] ${
                    index === 2
                      ? "hover:border-l-[#ff7100]"
                      : "hover:border-l-[#4b1f82]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`relative z-10 grid size-11 shrink-0 place-items-center overflow-hidden rounded-[15px] border border-white bg-white shadow-[0_4px_12px_rgb(74_38_112_/_0.1)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 sm:size-12 ${
                      index === 2 ? "text-accent" : "text-brand"
                    }`}
                  >
                    <span
                      className={`absolute inset-[6px] rounded-full ${
                        index === 2 ? "bg-[#fff0e5]" : "bg-[#f1e8ff]"
                      }`}
                    />
                    <span className="absolute top-1 right-1 size-2 rounded-full bg-[#bd9cff]" />
                    <Icon className="relative z-10 size-[22px]" strokeWidth={1.8} />
                  </span>
                  <span className="text-[1.05rem] leading-none font-black tracking-[-0.04em] text-[#9b87bd] transition-colors duration-300 group-hover:text-[#5b3286]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[1.05rem] leading-tight font-extrabold tracking-[-0.025em] text-[#111111] transition-colors duration-300 group-hover:text-[#3b1768]">
                      {reason.title}
                    </h3>
                    <p className="mt-1.5 text-[0.88rem] leading-[1.45] text-[#8574a8] transition-colors duration-300 group-hover:text-[#604580]">
                      {reason.text}
                    </p>
                  </div>
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={960}
                      height={560}
                      sizes="(max-width: 639px) 100vw, 180px"
                      className="col-start-3 mt-3 h-[100px] w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-[112px] xl:col-start-4 xl:row-start-1 xl:mt-0 xl:h-[100px]"
                    />
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
