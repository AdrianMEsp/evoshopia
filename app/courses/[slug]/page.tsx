import type { Metadata } from "next";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Container } from "@/components/ui/Container";
import { CourseDetailView } from "@/components/views/CourseDetailView";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Detalle del curso | ${site.name}`,
  description: "Revisa la información del curso y gestiona tu compra.",
};

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
      <Container className="py-[62px] lg:py-[82px]">
        <CourseDetailView slug={slug} />
      </Container>
  );
}
