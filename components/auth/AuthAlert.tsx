import { cn } from "@/lib/cn";

type AlertTone = "error" | "success" | "info";

const toneClasses: Record<AlertTone, string> = {
  error: "border-red-200 bg-red-50 text-red-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  info: "border-brand/20 bg-brand/5 text-ink",
};

export default function AuthAlert({
  tone = "error",
  children,
}: {
  tone?: AlertTone;
  children: React.ReactNode;
}) {
  if (!children) return null;

  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-xl border px-4 py-3 text-[0.88rem] font-semibold",
        toneClasses[tone],
      )}
    >
      {children}
    </p>
  );
}
