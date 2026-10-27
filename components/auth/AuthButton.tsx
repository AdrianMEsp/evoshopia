interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function AuthButton({
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className="
        w-full
        py-3
        rounded-lg
        text-white
        font-medium
        bg-gradient-to-r
        from-violet-600
        to-orange-400
      "
    >
      {children}
    </button>
  );
}