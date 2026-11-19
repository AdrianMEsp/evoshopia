import type { Metadata } from "next";
import { Suspense } from "react";

import { Container } from "@/components/ui/Container";
import { PaymentResultView } from "@/components/views/PaymentResultView";

export const metadata: Metadata = {
  title: "Resultado del pago | Evosophia",
  description: "Estado del pago de tu curso.",
};

function PaymentResultFallback() {
  return (
    <div className="mx-auto max-w-[640px]">
      <div
        aria-busy="true"
        aria-live="polite"
        className="h-56 animate-pulse rounded-[24px] border border-line bg-surface"
      />
      <span className="sr-only">Cargando resultado del pago</span>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Container className="py-[62px] lg:py-[82px]">
      <Suspense fallback={<PaymentResultFallback />}>
        <PaymentResultView />
      </Suspense>
    </Container>
  );
}
