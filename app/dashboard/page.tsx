import type { Metadata } from "next";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Mi espacio | ${site.name}`,
  description: "Dashboard de formación de Evosistencia con datos reales.",
};

export default function DashboardPage() {
  return (
    <RequireAuth>
      <Container className="py-8 max-sm:py-5 lg:py-10">
        <DashboardContent />
      </Container>
    </RequireAuth>
  );
}
