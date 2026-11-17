import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoursesView } from "@/components/views/CoursesView";
import { courses, site } from "@/content/site";

export const metadata: Metadata = {
  title: `Cursos | ${site.name}`,
  description: courses.description,
};

export default function CoursesPage() {
  return (
    <Container className="py-[62px] lg:py-[82px]">
      <SectionHeading
        eyebrow={courses.eyebrow}
        title={courses.title}
        description={courses.description}
      />
      <CoursesView />
    </Container>
  );
}
