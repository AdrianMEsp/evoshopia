import type { Metadata } from "next";

import { AccountView } from "@/components/account/AccountView";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Mi cuenta | ${site.name}`,
  description: "Administra tus datos personales y la seguridad de tu cuenta.",
};

export default function AccountPage() {
  return (
    <RequireAuth>
      <Container className="py-10 max-sm:py-6">
        <AccountView />
      </Container>
    </RequireAuth>
  );
}
