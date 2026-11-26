import Image from "next/image";
import { ArrowRight, Cpu, GraduationCap, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/content/site";

const bulletIcons = [GraduationCap, Cpu, UsersRound];

export function About() {
  return (
    <section id="nosotros" className="overflow-hidden bg-white py-[62px] lg:py-[82px]">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
        <Reveal className="max-w-[510px]">
          <Eyebrow
            tone="neutral"
            className="border-transparent bg-[#f1f1f3] px-3 py-1 text-[0.7rem] tracking-normal"
          >
            {about.eyebrow}
          </Eyebrow>
          <h2 className="mt-4 max-w-[470px] text-[clamp(2.4rem,4.2vw,3rem)] leading-[0.99] font-extrabold tracking-[-0.045em] text-[#111111]">
            {about.title}
          </h2>
          <p className="mt-5 text-[0.98rem] leading-[1.55] text-[#9296aa]">
            {about.description}
          </p>

          <ul className="mt-7 grid gap-6">
            {about.bullets.map((bullet, index) => {
              const Icon = bulletIcons[index];
              return (
                <li key={bullet.title} className="flex items-center gap-4">
                  <span className="grid size-[58px] shrink-0 place-items-center bg-[#f1edf6] text-[#742cff]">
                    <Icon className="size-[27px]" strokeWidth={1.8} />
                  </span>
                  <span>
                    <strong className="block text-[0.98rem] font-extrabold leading-tight text-[#17171c]">
                      {bullet.title}
                    </strong>
                    <span className="mt-2 block text-[0.93rem] leading-[1.4] text-[#9296aa]">
                      {bullet.text}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          <Button
            href={about.cta.href}
            className="mt-7 gap-3 px-6 py-[11px] text-[0.9rem] shadow-none"
          >
            {about.cta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </Reveal>

        <Reveal delay={100} className="mx-auto w-full max-w-[500px]">
          <div className="relative mx-auto aspect-square w-full max-w-[460px]">
            <div className="absolute inset-[9%] rounded-full border border-[#c9a8ff]" />
            <span className="absolute left-[9%] top-1/2 size-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff7100]" />
            <span className="absolute left-1/2 top-[9%] size-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7134ff]" />
            <span className="absolute right-[13%] top-[68%] size-[14px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#7134ff]" />

            <div className="motion-float absolute left-[4%] top-[13%] grid size-[78px] place-items-center bg-[#f1edf6] text-[#ff7100] sm:size-[84px]">
              <GraduationCap className="size-9" strokeWidth={1.6} />
            </div>
            <div className="motion-float-slow absolute right-[3%] top-[38%] grid size-[78px] place-items-center bg-[#f1edf6] text-[#742cff] sm:size-[84px]">
              <Cpu className="size-9" strokeWidth={1.6} />
            </div>
            <div className="motion-float absolute bottom-[4%] left-[18%] grid size-[78px] place-items-center bg-[#f1edf6] text-[#742cff] sm:size-[84px]">
              <UsersRound className="size-9" strokeWidth={1.6} />
            </div>

            <div className="absolute inset-0 grid place-items-center">
              <div className="relative h-[108px] w-[170px] overflow-hidden sm:h-[120px] sm:w-[190px]">
                <Image
                  src="/images/brand/evosistencia.png"
                  alt="Emblema de Evosistencia"
                  width={190}
                  height={188}
                  sizes="190px"
                  className="absolute inset-x-0 top-0 h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
