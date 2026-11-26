import { cn } from "@/lib/cn";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function AuthInput({ className, ...props }: Props) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand/60 focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    />
  );
}
