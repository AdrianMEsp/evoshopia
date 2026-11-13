import { cn } from "@/lib/cn";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

export default function AuthButton({
  children,
  className,
  loading = false,
  disabled,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "brand-gradient w-full rounded-xl py-3 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgb(91_34_232_/_0.24)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none",
        className,
      )}
    >
      {loading ? "Procesando..." : children}
    </button>
  );
}
