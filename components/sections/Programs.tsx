import { iconMap } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { programs } from "@/content/site";

export function Programs() {
  return (
    <section id="programas" className="py-[62px] lg:py-[82px]">
      <Container>
        <SectionHeading
          eyebrow={programs.eyebrow}
          title={programs.title}
        />

        <div className="grid gap-[18px] lg:grid-cols-3">
          {programs.items.map((program, index) => {
            const Icon = iconMap[program.icon];
            return (
              <Reveal
                key={program.title}
                delay={index * 70}
                className="h-full"
              >
                <article className="h-full rounded-[22px] border border-line bg-surface p-[26px] shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1.5 hover:shadow-[var(--shadow)] max-sm:p-5">
                  <div className="mb-[18px] grid size-12 place-items-center rounded-2xl bg-brand/10">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-[1.25rem] leading-none font-bold tracking-[-0.045em]">
                    {program.title}
                  </h3>
                  <p className="mt-2.5 text-[0.96rem] text-muted">
                    {program.text}
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
