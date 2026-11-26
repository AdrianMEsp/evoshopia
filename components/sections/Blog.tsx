import { iconMap } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { blog } from "@/content/site";

export function Blog() {
  return (
    <section
      id="blog"
      className="bg-white pt-[40px] pb-[62px] lg:pt-[44px] lg:pb-[82px]"
    >
      <Container>
        <Reveal className="mx-auto mb-14 max-w-[900px] text-center sm:mb-16">
          <Eyebrow
            tone="neutral"
            className="border-transparent bg-[#f1f1f3] px-3 py-1 text-[0.7rem] tracking-normal"
          >
            {blog.eyebrow}
          </Eyebrow>
          <h2 className="mx-auto mt-4 max-w-[760px] text-[clamp(2rem,4vw,2.65rem)] leading-[1.02] font-extrabold tracking-[-0.045em] text-[#111111]">
            {blog.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[850px] text-[0.98rem] leading-[1.45] text-[#8574a8]">
            {blog.description}
          </p>
        </Reveal>

        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {blog.posts.map((post, index) => {
            const Icon = iconMap[post.icon];
            return (
              <Reveal key={post.title} delay={index * 70} className="h-full">
                <article className="group flex h-full min-h-[250px] flex-col rounded-[22px] border border-[#eee8f8] bg-white p-7 shadow-[0_10px_22px_rgb(16_24_40_/_0.07)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow)] max-sm:p-6">
                  <span
                    className={`mb-4 grid size-[74px] place-items-center rounded-full shadow-[0_6px_18px_rgb(112_52_255_/_0.14)] transition-transform duration-300 group-hover:scale-105 ${
                      index === 1
                        ? "bg-[#fff0e5] text-[#ff7100] shadow-[0_6px_18px_rgb(255_113_0_/_0.12)]"
                        : "bg-[#f1e8ff] text-[#7134ff]"
                    }`}
                  >
                    <Icon className="size-[30px]" strokeWidth={1.6} />
                  </span>
                  <h3 className="text-[1.08rem] leading-[1.2] font-extrabold tracking-[-0.025em] text-[#111111]">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-[0.94rem] leading-[1.45] text-[#8574a8]">
                    {post.text}
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
