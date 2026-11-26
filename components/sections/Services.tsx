import { iconMap } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/site";

export function Services() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-[#fbfbfd] py-[62px] lg:py-[82px]"
    >
      <Container>
        <Reveal className="mx-auto mb-14 max-w-[680px] text-center sm:mb-16">
          <Eyebrow tone="neutral">{services.eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-[620px] text-[clamp(2rem,3.8vw,2.7rem)] leading-[1.04] font-bold tracking-[-0.045em] text-[#111111]">
            {services.title}
          </h2>
        </Reveal>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-12">
          {services.items.map((service, index) => {
            const Icon = iconMap[service.icon];
            const isOrange = index === 2 || index === 4;

            return (
              <Reveal
                key={service.title}
                delay={index * 50}
                className="h-full"
              >
                <article
                  className={`services-scroll-drift group flex h-full min-h-[144px] items-center gap-5 border-l-2 py-4 pl-6 pr-3 transition duration-300 hover:-translate-y-1 hover:bg-white/70 ${isOrange ? "border-accent" : "border-brand"}`}
                >
                  <div
                    className={`grid size-[54px] shrink-0 place-items-center ${isOrange ? "bg-[#fff0e5] text-accent" : "bg-[#f1e8ff] text-brand"}`}
                  >
                    <Icon className="size-[26px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[1.05rem] leading-tight font-extrabold tracking-[-0.025em] text-[#111111]">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-[0.88rem] leading-[1.45] text-[#374268]">
                      {service.text}
                    </p>
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
