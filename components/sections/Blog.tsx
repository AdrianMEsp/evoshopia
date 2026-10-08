import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blog } from "@/content/site";

export function Blog() {
  return (
    <section id="blog" className="py-[62px] lg:py-[82px]">
      <Container>
        <SectionHeading eyebrow={blog.eyebrow} title={blog.title} />

        <div className="grid gap-[18px] lg:grid-cols-3">
          {blog.posts.map((post, index) => (
            <Reveal key={post.title} delay={index * 70} className="h-full">
              <article className="h-full rounded-[22px] border border-line bg-surface p-[26px] shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1.5 hover:shadow-[var(--shadow)] max-sm:p-5">
                <h3 className="text-[1.25rem] leading-none font-bold tracking-[-0.045em]">
                  {post.title}
                </h3>
                <p className="mt-2.5 text-[0.96rem] text-muted">{post.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
