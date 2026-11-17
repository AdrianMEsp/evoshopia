import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogView } from "@/components/views/BlogView";
import { blog, site } from "@/content/site";

export const metadata: Metadata = {
  title: `Blog | ${site.name}`,
  description: blog.description,
};

export default function BlogPage() {
  return (
    <Container className="py-[62px] lg:py-[82px]">
      <SectionHeading
        eyebrow={blog.eyebrow}
        title={blog.title}
        description={blog.description}
      />
      <BlogView />
    </Container>
  );
}
