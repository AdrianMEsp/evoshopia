import { iconMap } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reasons } from "@/content/site";

export function WhyEvosistencia() {
  return (
    <section id="por-que" className="py-[62px] lg:py-[82px]">
      <Container>
        <SectionHeading
          eyebrow={reasons.eyebrow}
          title={reasons.title}
        />

        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-5">
          {reasons.items.map((reason, index) => {
            const Icon = iconMap[reason.icon];
            return (
              <Reveal
                key={reason.title}
                delay={index * 60}
                className="h-full"
              >
                <article className="h-full rounded-[22px] border border-line bg-surface p-[26px] text-center shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1.5 hover:shadow-[var(--shadow)]">
                  <div className="mx-auto mb-[18px] grid size-12 place-items-center rounded-2xl bg-brand/10">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-[1.25rem] leading-none font-bold tracking-[-0.045em]">
                    {reason.title}
                  </h3>
                  <p className="mt-2.5 text-[0.96rem] text-muted">
                    {reason.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
