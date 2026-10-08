import Image from "next/image";
import { ArrowDownIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ecosystem } from "@/content/site";

export function Ecosystem() {
  const { items } = ecosystem;

  return (
    <section id="ecosistema" className="py-[62px] lg:py-[82px]">
      <Container>
        <SectionHeading
          eyebrow={ecosystem.eyebrow}
          title={ecosystem.title}
          description={ecosystem.description}
        />

        <div className="grid gap-[18px] lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal
              key={item.name}
              delay={index * 70}
              className="relative h-full"
            >
              <article className="flex h-full min-h-[260px] flex-col rounded-[24px] border border-line bg-surface p-7 shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1.5 hover:shadow-[var(--shadow)]">
                <div className="mb-4 flex h-[92px] items-center justify-center">
                  <Image
                    src={item.logo}
                    alt={item.alt}
                    width={82}
                    height={82}
                    loading="lazy"
                    className="h-[82px] w-auto max-w-[180px] object-contain"
                  />
                </div>
                <h3 className="text-center text-[1.35rem] leading-none font-bold tracking-[-0.045em]">
                  {item.name}
                </h3>
                <p className="mt-3 text-center text-[0.96rem] text-muted">
                  {item.text}
                </p>
              </article>

              {index < items.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-7 left-1/2 grid size-[38px] -translate-x-1/2 place-items-center rounded-full border border-line bg-surface text-brand lg:hidden"
                >
                  <ArrowDownIcon className="size-5" />
                </span>
              ) : null}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
