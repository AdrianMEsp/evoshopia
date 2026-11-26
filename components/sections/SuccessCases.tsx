import { FolderOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { successCases } from "@/content/site";

export function SuccessCases() {
  return (
    <section
      id="casos"
      className="bg-white pt-[62px] pb-[40px] lg:pt-[82px] lg:pb-[44px]"
    >
      <Container>
        <Reveal className="mx-auto mb-14 max-w-[900px] text-center sm:mb-16">
          <Eyebrow
            tone="neutral"
            className="border-transparent bg-[#f1f1f3] px-3 py-1 text-[0.7rem] tracking-normal"
          >
            {successCases.eyebrow}
          </Eyebrow>
          <h2 className="mx-auto mt-4 max-w-[760px] text-[clamp(2rem,4vw,2.65rem)] leading-[1.02] font-extrabold tracking-[-0.045em] text-[#111111]">
            {successCases.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[850px] text-[0.98rem] leading-[1.45] text-[#8574a8]">
            {successCases.description}
          </p>
        </Reveal>

        <Reveal>
          <div className="group relative mx-auto flex min-h-[158px] items-center gap-5 overflow-hidden rounded-[22px] border border-[#cbb4f2] bg-[#fbfaff] px-6 py-8 shadow-[0_12px_24px_rgb(16_24_40_/_0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow)] sm:gap-7 sm:px-9 sm:py-9">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-[56px] -right-7 size-[104px] rotate-[35deg] rounded-[30px] bg-[#c4a0ff]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[58px] -left-7 size-[104px] -rotate-[35deg] rounded-[30px] bg-[#d7c2ff]"
            />
            <span className="relative z-10 grid size-[62px] shrink-0 place-items-center rounded-[15px] bg-[#f0e7ff] text-[#7134ff] transition-transform duration-300 group-hover:scale-105">
              <FolderOpen className="size-[30px]" strokeWidth={2} />
            </span>
            <p className="relative z-10 text-[0.92rem] leading-[1.45] text-[#8574a8]">
              <strong className="font-extrabold text-[#11133b]">
                {successCases.highlight}
              </strong>{" "}
              <span className="ml-1">{successCases.text}</span>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
