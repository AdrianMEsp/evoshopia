"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthAlert from "@/components/auth/AuthAlert";
import AuthButton from "@/components/auth/AuthButton";
import AuthInput from "@/components/auth/AuthInput";
import { useAuth } from "@/components/auth/AuthProvider";
import { getErrorMessage, resolveMediaUrl } from "@/lib/api";
import {
  getUserDisplayName,
  getUserInitials,
  getUserRoleLabel,
} from "@/lib/auth";

const cardClassName =
  "rounded-[22px] border border-line bg-surface p-6 shadow-[var(--shadow-soft)] max-sm:p-5";
const maxAvatarSizeBytes = 3 * 1024 * 1024;
const allowedAvatarTypes = ["image/jpeg", "image/png", "image/webp"];

export function AccountView() {
  const router = useRouter();
  const {
    user,
    saveProfile,
    changePassword,
    uploadAvatar,
    removeAvatar,
    signOut,
  } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name ?? "");
  const [lastname, setLastname] = useState(user?.lastname ?? "");
  const [profilePending, setProfilePending] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  const [avatarPending, setAvatarPending] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [avatarMessage, setAvatarMessage] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordPending, setPasswordPending] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(user);
  const avatarUrl = resolveMediaUrl(user?.profileImg?.url);

  const handleProfileSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      setProfileError("Ingresa tu nombre.");
      return;
    }

    setProfilePending(true);
    setProfileError(null);
    setProfileMessage(null);

    try {
      const updatedUser = await saveProfile({ name, lastname });
      setName(updatedUser.name ?? "");
      setLastname(updatedUser.lastname ?? "");
      setProfileMessage("Tus datos se actualizaron correctamente.");
    } catch (error) {
      setProfileError(getErrorMessage(error));
    } finally {
      setProfilePending(false);
    }
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!allowedAvatarTypes.includes(file.type)) {
      setAvatarError("Formato no permitido. Usa JPG, PNG o WEBP.");
      setAvatarMessage(null);
      return;
    }

    if (file.size > maxAvatarSizeBytes) {
      setAvatarError("La imagen no puede superar los 3 MB.");
      setAvatarMessage(null);
      return;
    }

    setAvatarPending(true);
    setAvatarError(null);
    setAvatarMessage(null);

    try {
      await uploadAvatar(file);
      setAvatarMessage("Tu foto de perfil se actualizó correctamente.");
    } catch (error) {
      setAvatarError(getErrorMessage(error));
    } finally {
      setAvatarPending(false);
    }
  };

  const handleAvatarRemove = async () => {
    setAvatarPending(true);
    setAvatarError(null);
    setAvatarMessage(null);

    try {
      await removeAvatar();
      setAvatarMessage("Tu foto de perfil fue eliminada.");
    } catch (error) {
      setAvatarError(getErrorMessage(error));
    } finally {
      setAvatarPending(false);
    }
  };

  const handlePasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!currentPassword) {
      setPasswordError("Ingresa tu contraseña actual.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      setPasswordError("La nueva contraseña debe incluir al menos una mayúscula.");
      return;
    }

    if (newPassword !== passwordConfirmation) {
      setPasswordError("La confirmación de la nueva contraseña no coincide.");
      return;
    }

    if (newPassword === currentPassword) {
      setPasswordError("La nueva contraseña debe ser diferente a la actual.");
      return;
    }

    setPasswordPending(true);
    setPasswordError(null);
    setPasswordMessage(null);

    try {
      await changePassword(currentPassword, newPassword, passwordConfirmation);
      setCurrentPassword("");
      setNewPassword("");
      setPasswordConfirmation("");
      setPasswordMessage("Tu contraseña se actualizó correctamente.");
    } catch (error) {
      setPasswordError(getErrorMessage(error));
    } finally {
      setPasswordPending(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/login");
    router.refresh();
  };

  return (
    <div className="space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.76rem] font-extrabold tracking-[0.08em] text-brand uppercase">
            Mi cuenta
          </p>
          <h1 className="mt-2 text-[clamp(1.9rem,3vw,2.6rem)] leading-none font-bold tracking-[-0.04em]">
            Hola, {displayName}
          </h1>
          <p className="mt-2 text-[0.96rem] text-muted">
            Administra tus datos personales, seguridad y sesión.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-bold text-brand shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-brand/40"
        >
          Volver al dashboard
        </Link>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className={cardClassName}>
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={`Foto de perfil de ${displayName}`}
                className="size-20 rounded-full border border-line object-cover"
              />
            ) : (
              <span className="brand-gradient grid size-20 shrink-0 place-items-center rounded-full text-xl font-bold text-white">
                {initials}
              </span>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-xl font-bold">{displayName}</h2>
              <p className="mt-1 truncate text-sm text-muted">{user?.email}</p>
              <p className="mt-1 truncate text-[0.78rem] font-semibold text-brand">
                {getUserRoleLabel(user)}
              </p>
            </div>
          </div>

          {user?.institution ? (
            <p className="mt-4 rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-muted">
              Institución:{" "}
              <strong className="font-bold text-ink">
                {user.institution.name}
              </strong>
              {user.institution.isActive ? " · Activa" : " · Inactiva"}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2">
            <label
              className={`inline-flex cursor-pointer items-center justify-center rounded-full border border-line bg-surface px-4 py-2 text-sm font-bold text-brand transition hover:border-brand/40 ${
                avatarPending ? "pointer-events-none opacity-60" : ""
              }`}
            >
              {avatarPending ? "Subiendo..." : "Cambiar foto"}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={handleAvatarChange}
                disabled={avatarPending}
              />
            </label>

            {avatarUrl ? (
              <button
                type="button"
                onClick={handleAvatarRemove}
                disabled={avatarPending}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-bold text-muted transition hover:cursor-pointer hover:border-red-200 hover:text-red-600 disabled:opacity-60"
              >
                Quitar foto
              </button>
            ) : null}
          </div>

          {avatarError ? (
            <div className="mt-4">
              <AuthAlert>{avatarError}</AuthAlert>
            </div>
          ) : null}

          {avatarMessage ? (
            <div className="mt-4">
              <AuthAlert tone="success">{avatarMessage}</AuthAlert>
            </div>
          ) : null}

          <form
            onSubmit={handleProfileSubmit}
            className="mt-6 space-y-4 border-t border-line pt-6"
            noValidate
          >
            <h3 className="text-lg font-bold">Datos personales</h3>

            {profileError ? <AuthAlert>{profileError}</AuthAlert> : null}
            {profileMessage ? (
              <AuthAlert tone="success">{profileMessage}</AuthAlert>
            ) : null}

            <AuthInput
              name="name"
              placeholder="Nombre"
              autoComplete="given-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <AuthInput
              name="lastname"
              placeholder="Apellido"
              autoComplete="family-name"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
            />

            <AuthInput
              type="email"
              name="email"
              value={user?.email ?? ""}
              readOnly
              disabled
              aria-label="Correo electrónico"
            />

            <p className="text-[0.78rem] text-muted">
              El correo electrónico no se puede modificar desde aquí.
            </p>

            <AuthButton type="submit" loading={profilePending}>
              Guardar cambios
            </AuthButton>
          </form>
        </section>

        <div className="space-y-6">
          <section className={cardClassName}>
            <h2 className="text-lg font-bold">Seguridad</h2>
            <p className="mt-1 text-sm text-muted">
              Cambia tu contraseña cuando lo necesites.
            </p>

            <form
              onSubmit={handlePasswordSubmit}
              className="mt-5 space-y-4"
              noValidate
            >
              {passwordError ? <AuthAlert>{passwordError}</AuthAlert> : null}
              {passwordMessage ? (
                <AuthAlert tone="success">{passwordMessage}</AuthAlert>
              ) : null}

              <AuthInput
                type="password"
                name="currentPassword"
                placeholder="Contraseña actual"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                required
              />

              <AuthInput
                type="password"
                name="newPassword"
                placeholder="Nueva contraseña"
                autoComplete="new-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />

              <AuthInput
                type="password"
                name="passwordConfirmation"
                placeholder="Confirmar nueva contraseña"
                autoComplete="new-password"
                value={passwordConfirmation}
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
                required
              />

              <p className="text-[0.78rem] text-muted">
                Mínimo 6 caracteres e incluye al menos una mayúscula.
              </p>

              <AuthButton type="submit" loading={passwordPending}>
                Actualizar contraseña
              </AuthButton>
            </form>
          </section>

          <section className={cardClassName}>
            <h2 className="text-lg font-bold">Sesión</h2>
            <p className="mt-1 text-sm text-muted">
              Cierra tu sesión en este dispositivo cuando termines.
            </p>

            <button
              type="button"
              onClick={handleSignOut}
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:cursor-pointer hover:bg-red-100"
            >
              Cerrar sesión
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
