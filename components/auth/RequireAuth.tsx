"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/AuthProvider";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status !== "unauthenticated") return;

    const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
    router.replace(`/login${next}`);
  }, [pathname, router, status]);

  if (status !== "authenticated") {
    return (
      <div
        role="status"
        className="flex min-h-[50vh] items-center justify-center"
      >
        <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-brand/20 border-t-brand" />
        <span className="sr-only">Cargando tu sesión</span>
      </div>
    );
  }

  return <>{children}</>;
}
