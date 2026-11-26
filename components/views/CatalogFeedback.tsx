export function CatalogSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-72 animate-pulse rounded-[20px] border border-line bg-surface"
        />
      ))}
      <span className="sr-only">Cargando contenidos</span>
    </div>
  );
}

export function CatalogError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-4 rounded-[20px] border border-red-200 bg-red-50 px-5 py-4 text-[0.9rem] text-red-700 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="font-semibold">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="shrink-0 rounded-full border border-red-300 bg-white px-4 py-2 text-[0.82rem] font-bold text-red-700 transition hover:cursor-pointer hover:bg-red-100"
      >
        Reintentar
      </button>
    </div>
  );
}

export function CatalogEmpty({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[20px] border border-dashed border-line bg-surface px-6 py-12 text-center">
      <h3 className="text-[1.15rem] font-bold tracking-[-0.03em]">{title}</h3>
      <p className="mx-auto mt-2 max-w-[520px] text-[0.94rem] text-muted">
        {text}
      </p>
    </div>
  );
}
