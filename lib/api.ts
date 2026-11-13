const rawStrapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export const STRAPI_URL = rawStrapiUrl.replace(/\/+$/, "");
export const API_URL = `${STRAPI_URL}/api`;
export const TOKEN_STORAGE_KEY = "evosophia.jwt";

const errorTranslations: Record<string, string> = {
  "Invalid identifier or password": "Correo o contraseña incorrectos.",
  "Email or Username are already taken": "El correo ya está registrado.",
  "Register action is currently disabled":
    "El registro de nuevas cuentas está deshabilitado.",
  "Incorrect code provided": "El código es inválido o ya expiró.",
  "Passwords do not match": "Las contraseñas no coinciden.",
  "Your new password must be different than your current password":
    "La nueva contraseña debe ser diferente a la actual.",
  "The provided current password is invalid":
    "La contraseña actual es incorrecta.",
  "You must be authenticated to reset your password":
    "Debes iniciar sesión para cambiar la contraseña.",
  "Invalid token": "El enlace o código no es válido.",
  "Missing authentication": "Debes iniciar sesión para continuar.",
  "Too many requests": "Demasiados intentos. Inténtalo más tarde.",
};

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function readMessage(payload: unknown): string | null {
  if (!payload) return null;

  if (typeof payload === "string") {
    return payload.trim() || null;
  }

  if (typeof payload !== "object") return null;

  const record = payload as Record<string, unknown>;
  const error = record.error;

  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object") {
    const errorRecord = error as Record<string, unknown>;

    if (typeof errorRecord.message === "string") {
      return errorRecord.message;
    }

    const details = errorRecord.details;
    if (details && typeof details === "object") {
      const errors = (details as Record<string, unknown>).errors;
      if (Array.isArray(errors) && errors.length > 0) {
        const firstError = errors[0] as Record<string, unknown>;
        if (typeof firstError.message === "string") {
          return firstError.message;
        }
      }
    }
  }

  if (typeof record.message === "string") {
    return record.message;
  }

  return null;
}

function translateMessage(message: string): string {
  if (errorTranslations[message]) {
    return errorTranslations[message];
  }

  if (/must be at least 6 characters/i.test(message)) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }

  if (/Invalid parameters/i.test(message)) {
    return "Algunos datos enviados no son válidos.";
  }

  return message;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    if (/failed to fetch|networkerror|load failed/i.test(error.message)) {
      return "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo nuevamente.";
    }

    return error.message;
  }

  return "Ocurrió un error inesperado. Inténtalo nuevamente.";
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function storeToken(token: string): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch {
    // Si el navegador bloquea el almacenamiento, la sesión no persiste.
  }
}

export function clearStoredToken(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // Sin almacenamiento disponible no hay nada que limpiar.
  }
}

interface ApiFetchOptions {
  method?: string;
  body?: unknown;
  formData?: FormData;
  auth?: boolean;
  retryOnUnauthorized?: boolean;
  headers?: Record<string, string>;
}

let refreshPromise: Promise<string | null> | null = null;

export function refreshAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: "{}",
        });

        const payload = (await response.json().catch(() => null)) as {
          jwt?: string;
        } | null;

        if (response.ok && typeof payload?.jwt === "string") {
          storeToken(payload.jwt);
          return payload.jwt;
        }

        return null;
      } catch {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    formData,
    auth = true,
    retryOnUnauthorized = true,
    headers,
  } = options;

  const send = (token: string | null) => {
    const requestHeaders = new Headers(headers);

    if (body !== undefined && !formData) {
      requestHeaders.set("Content-Type", "application/json");
    }

    if (auth && token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }

    return fetch(`${API_URL}${path}`, {
      method,
      headers: requestHeaders,
      body:
        formData ??
        (body !== undefined ? JSON.stringify(body) : undefined),
      credentials: "include",
      cache: "no-store",
    });
  };

  let token = auth ? getStoredToken() : null;
  let response = await send(token);

  if (response.status === 401 && auth && retryOnUnauthorized) {
    const refreshedToken = await refreshAccessToken();

    if (refreshedToken) {
      token = refreshedToken;
      response = await send(token);
    }
  }

  const responseText = await response.text();
  let payload: unknown = null;

  if (responseText) {
    try {
      payload = JSON.parse(responseText);
    } catch {
      payload = responseText;
    }
  }

  if (!response.ok) {
    if (response.status === 401 && auth) {
      clearStoredToken();
    }

    const message = translateMessage(
      readMessage(payload) ?? `Error ${response.status}`,
    );

    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}

export function resolveMediaUrl(url?: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;

  return `${STRAPI_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}
