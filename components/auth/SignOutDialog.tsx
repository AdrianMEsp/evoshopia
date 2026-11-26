"use client";

import { useEffect, useId, useRef } from "react";

interface SignOutDialogProps {
  open: boolean;
  pending: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function SignOutDialog({
  open,
  pending,
  onCancel,
  onConfirm,
}: SignOutDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${dialogId}-title`}
      aria-describedby={`${dialogId}-description`}
      onCancel={(event) => {
        event.preventDefault();
        if (!pending) onCancel();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !pending) onCancel();
      }}
      style={{ display: open ? "flex" : "none" }}
      className="fixed inset-0 m-0 flex h-full w-full max-w-none items-center justify-center bg-transparent p-4 text-ink backdrop:bg-slate-950/55"
    >
      <section className="w-full max-w-md rounded-[24px] border border-line bg-surface p-6 shadow-[var(--shadow)] max-sm:p-5">
        <h2 id={`${dialogId}-title`} className="text-xl font-bold">
          ¿Cerrar sesión?
        </h2>
        <p
          id={`${dialogId}-description`}
          className="mt-2 text-sm text-muted"
        >
          Se cerrará tu sesión en este dispositivo.
        </p>
        <div className="mt-6 flex justify-end gap-3 max-sm:flex-col-reverse">
          <button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-surface px-5 text-sm font-bold text-muted transition hover:cursor-pointer hover:border-brand/40 hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-red-600 px-5 text-sm font-bold text-white transition hover:cursor-pointer hover:bg-red-700 disabled:cursor-wait disabled:opacity-70"
          >
            {pending ? "Cerrando sesión..." : "Sí, cerrar sesión"}
          </button>
        </div>
      </section>
    </dialog>
  );
}
