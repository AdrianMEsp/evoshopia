import { About } from "@/components/sections/About";
import { AiSolutions } from "@/components/sections/AiSolutions";
import { Blog } from "@/components/sections/Blog";
import { CtaSection } from "@/components/sections/CtaSection";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Hero } from "@/components/sections/Hero";
import { Programs } from "@/components/sections/Programs";
import { Services } from "@/components/sections/Services";
import { SuccessCases } from "@/components/sections/SuccessCases";
import { WhyEvosistencia } from "@/components/sections/WhyEvosistencia";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ecosystem />
      <Services />
      <AiSolutions />
      <Programs />
      <WhyEvosistencia />
      <About />
      <SuccessCases />
      <Blog />
      <CtaSection />
    </>
  );
}
