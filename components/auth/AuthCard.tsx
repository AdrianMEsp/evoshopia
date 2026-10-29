export default function AuthCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-line
        bg-surface
        p-8
        shadow-lg
      "
    >
      {children}
    </div>
  );
}