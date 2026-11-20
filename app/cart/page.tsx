import type { Metadata } from "next";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CartView } from "@/components/views/CartView";
import { cart, site } from "@/content/site";

export const metadata: Metadata = {
  title: `Carrito | ${site.name}`,
  description: cart.description,
};

export default function CartPage() {
  return (
    <RequireAuth>
      <Container className="py-[62px] lg:py-[82px]">
        <SectionHeading
          eyebrow={cart.eyebrow}
          title={cart.title}
          description={cart.description}
        />
        <CartView />
      </Container>
    </RequireAuth>
  );
}
