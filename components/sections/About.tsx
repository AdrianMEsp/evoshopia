import { CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/content/site";

export function About() {
  return (
    <section id="nosotros" className="py-[62px] lg:py-[82px] text-center">
      <Container>
        <Reveal className="mx-auto max-w-[860px]">
          <div>
            <Eyebrow>{about.eyebrow}</Eyebrow>
          </div>
          <h2 className="mt-3.5 text-[clamp(2rem,3vw,3.2rem)] leading-[1.04] font-bold tracking-[-0.045em]">
            {about.title} 
          </h2>
          <p className="mt-4 text-[1.08rem] text-muted">
            {about.description}
          </p>

          <ul className="my-[22px]  grid gap-2.5">
            {about.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2.5 max-sm:text-left">
                <span className="brand-gradient grid size-6 shrink-0 place-items-center rounded-full text-white">
                  <CheckIcon className="size-3.5" />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <Button
            href={about.cta.href}
            variant="secondary"
            className="max-sm:w-full"
          >
            {about.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
