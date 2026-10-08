import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { successCases } from "@/content/site";

export function SuccessCases() {
  return (
    <section id="casos" className="py-[62px] lg:py-[82px]">
      <Container>
        <SectionHeading
          eyebrow={successCases.eyebrow}
          title={successCases.title}
          description={successCases.description}
        />

        <Reveal>
          <div className="rounded-[26px] border border-dashed border-brand/40 bg-brand/5 p-[34px] text-center">
            <strong className="font-bold">{successCases.highlight}</strong>{" "}
            {successCases.text}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
