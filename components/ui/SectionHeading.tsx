import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto mb-[42px] max-w-[760px] text-center max-sm:mb-8",
        className,
      )}
    >
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 text-[clamp(2rem,3vw,3.1rem)] leading-[1.04] font-bold tracking-[-0.045em]">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-[1.08rem] text-muted">{description}</p>
        ) : null}
      </Reveal>
    </div>
  );
}
