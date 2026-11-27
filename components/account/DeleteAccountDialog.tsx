"use client";

import { useEffect, useId, useRef, type FormEvent } from "react";

import AuthAlert from "@/components/auth/AuthAlert";
import AuthInput from "@/components/auth/AuthInput";

interface DeleteAccountDialogProps {
  open: boolean;
  pending: boolean;
  password: string;
  error: string | null;
  onPasswordChange: (password: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteAccountDialog({
  open,
  pending,
  password,
  error,
  onPasswordChange,
  onCancel,
  onConfirm,
}: DeleteAccountDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLInputElement>('input[type="password"]')?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pending) onConfirm();
  };

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
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-[24px] border border-line bg-surface p-6 shadow-[var(--shadow)] max-sm:p-5"
      >
        <h2 id={`${dialogId}-title`} className="text-xl font-bold">
          ¿Borrar tu cuenta?
        </h2>
        <p id={`${dialogId}-description`} className="mt-2 text-sm text-muted">
          Tu cuenta quedará desactivada y no podrás volver a iniciar sesión.
          Ingresa tu contraseña para confirmar.
        </p>

        <div className="mt-5 space-y-3">
          <AuthInput
            type="password"
            name="password"
            placeholder="Contraseña actual"
            autoComplete="current-password"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            disabled={pending}
            required
          />
          {error ? <AuthAlert>{error}</AuthAlert> : null}
        </div>

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
            type="submit"
            disabled={pending}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-red-600 px-5 text-sm font-bold text-white transition hover:cursor-pointer hover:bg-red-700 disabled:cursor-wait disabled:opacity-70"
          >
            {pending ? "Borrando cuenta..." : "Sí, borrar cuenta"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
