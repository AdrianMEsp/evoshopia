import {
  apiFetch,
  clearStoredToken,
  getStoredToken,
  storeToken,
} from "@/lib/api";

export interface AuthRole {
  type: string;
  name: string;
}

export interface AuthInstitution {
  name: string;
  isActive: boolean;
}

export interface AuthProfileImage {
  id: number;
  url: string;
  mime?: string;
  size?: number;
}

export interface AuthUser {
  id: number;
  documentId?: string;
  username?: string;
  email: string;
  name?: string | null;
  lastname?: string | null;
  confirmed?: boolean;
  blocked?: boolean;
  role?: AuthRole | null;
  institution?: AuthInstitution | null;
  profileImg?: AuthProfileImage | null;
}

export interface RegisterInput {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface RegisterResult {
  user: AuthUser;
  authenticated: boolean;
}

interface AuthResponse {
  jwt: string;
  user: AuthUser;
}

interface RegisterResponse {
  jwt?: string;
  user: AuthUser;
}

function normalizeRole(role: unknown): AuthRole | null {
  if (!role || typeof role !== "object") return null;

  const record = role as Record<string, unknown>;
  const type = typeof record.type === "string" ? record.type : "";
  const name = typeof record.name === "string" ? record.name : "";

  if (!type && !name) return null;
  return { type, name };
}

function normalizeInstitution(institution: unknown): AuthInstitution | null {
  if (!institution || typeof institution !== "object") return null;

  const record = institution as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name : "";

  if (!name) return null;

  return {
    name,
    isActive: Boolean(record.isActive),
  };
}

function normalizeProfileImage(image: unknown): AuthProfileImage | null {
  if (!image || typeof image !== "object") return null;

  const record = image as Record<string, unknown>;
  const url = typeof record.url === "string" ? record.url : "";
  const id = typeof record.id === "number" ? record.id : Number(record.id);

  if (!url || !Number.isFinite(id)) return null;

  return {
    id,
    url,
    mime: typeof record.mime === "string" ? record.mime : undefined,
    size: typeof record.size === "number" ? record.size : undefined,
  };
}

export function normalizeUser(user: AuthUser): AuthUser {
  return {
    ...user,
    email: user.email ?? "",
    role: normalizeRole(user.role),
    institution: normalizeInstitution(user.institution),
    profileImg: normalizeProfileImage(user.profileImg),
  };
}

export function hasStoredSession(): boolean {
  return Boolean(getStoredToken());
}

export async function login(
  identifier: string,
  password: string,
): Promise<AuthUser> {
  const response = await apiFetch<AuthResponse>("/auth/local", {
    method: "POST",
    auth: false,
    body: {
      identifier: identifier.trim(),
      password,
    },
  });

  if (!response?.jwt) {
    throw new Error("No pudimos iniciar tu sesión. Inténtalo nuevamente.");
  }

  storeToken(response.jwt);

  try {
    return await getCurrentUser();
  } catch {
    return normalizeUser(response.user);
  }
}

export async function register(input: RegisterInput): Promise<RegisterResult> {
  const email = input.email.trim().toLowerCase();

  const response = await apiFetch<RegisterResponse>("/auth/local/register", {
    method: "POST",
    auth: false,
    body: {
      username: email,
      email,
      password: input.password,
      name: input.name.trim(),
      lastname: input.lastname.trim(),
    },
  });

  if (!response?.user) {
    throw new Error("No pudimos crear tu cuenta. Inténtalo nuevamente.");
  }

  if (!response.jwt) {
    return {
      user: normalizeUser(response.user),
      authenticated: false,
    };
  }

  storeToken(response.jwt);

  try {
    await updateProfile({
      name: input.name.trim(),
      lastname: input.lastname.trim(),
    });
  } catch {
    // El registro ya se completó; el perfil se puede corregir en la cuenta.
  }

  try {
    return { user: await getCurrentUser(), authenticated: true };
  } catch {
    return { user: normalizeUser(response.user), authenticated: true };
  }
}

export async function logout(): Promise<void> {
  try {
    if (getStoredToken()) {
      await apiFetch("/auth/logout", {
        method: "POST",
        body: {},
      });
    }
  } catch {
    // Aunque falle la revocación remota, cerramos la sesión local.
  } finally {
    clearStoredToken();
  }
}

export async function getCurrentUser(): Promise<AuthUser> {
  const user = await apiFetch<AuthUser>("/users/me");
  return normalizeUser(user);
}

export async function forgotPassword(email: string): Promise<void> {
  await apiFetch("/auth/forgot-password", {
    method: "POST",
    auth: false,
    body: { email: email.trim().toLowerCase() },
  });
}

export async function resetPassword(
  code: string,
  password: string,
  passwordConfirmation: string,
): Promise<void> {
  await apiFetch("/auth/reset-password", {
    method: "POST",
    auth: false,
    body: {
      code: code.trim(),
      password,
      passwordConfirmation,
    },
  });

  clearStoredToken();
}

export async function changePassword(
  currentPassword: string,
  password: string,
  passwordConfirmation: string,
): Promise<void> {
  const response = await apiFetch<{ jwt?: string }>("/auth/change-password", {
    method: "POST",
    body: {
      currentPassword,
      password,
      passwordConfirmation,
    },
  });

  if (response?.jwt) {
    storeToken(response.jwt);
  }
}

export async function updateProfile(input: {
  name: string;
  lastname: string;
}): Promise<AuthUser> {
  const user = await apiFetch<AuthUser>("/users/me/profile", {
    method: "PUT",
    body: {
      name: input.name.trim(),
      lastname: input.lastname.trim(),
    },
  });

  return normalizeUser(user);
}

export async function uploadProfileImage(file: File): Promise<void> {
  const formData = new FormData();
  formData.append("files", file);

  await apiFetch("/users/me/profile-image", {
    method: "POST",
    formData,
  });
}

export async function deleteProfileImage(): Promise<void> {
  await apiFetch("/users/me/profile-image", {
    method: "DELETE",
  });
}

export function getUserDisplayName(user?: AuthUser | null): string {
  if (!user) return "Usuario";

  const fullName = [user.name, user.lastname]
    .filter((part): part is string => Boolean(part?.trim()))
    .join(" ")
    .trim();

  return fullName || user.username || user.email || "Usuario";
}

export function getUserFirstName(user?: AuthUser | null): string {
  if (!user) return "";

  if (user.name?.trim()) {
    return user.name.trim().split(/\s+/)[0];
  }

  const displayName = getUserDisplayName(user);
  return displayName.split(/\s+/)[0];
}

export function getUserInitials(user?: AuthUser | null): string {
  if (!user) return "EV";

  const nameInitial = user.name?.trim().charAt(0) ?? "";
  const lastnameInitial = user.lastname?.trim().charAt(0) ?? "";

  if (nameInitial || lastnameInitial) {
    return `${nameInitial}${lastnameInitial}`.toUpperCase();
  }

  const displayName = getUserDisplayName(user);
  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");

  return initials.toUpperCase() || "EV";
}

export function getUserRoleLabel(user?: AuthUser | null): string {
  if (!user) return "Participante";

  if (user.institution?.name) {
    return user.institution.name;
  }

  if (user.role?.type === "institution") {
    return user.role.name || "Institución";
  }

  return user.role?.name || "Participante";
}
