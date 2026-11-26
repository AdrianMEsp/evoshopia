"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  TOKEN_STORAGE_KEY,
  clearStoredToken,
  getStoredToken,
} from "@/lib/api";
import {
  changePassword as changePasswordRequest,
  deleteProfileImage,
  getCurrentUser,
  getUserDisplayName,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  updateProfile as updateProfileRequest,
  uploadProfileImage,
  type AuthUser,
  type RegisterInput,
  type RegisterResult,
} from "@/lib/auth";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  signIn: (identifier: string, password: string) => Promise<AuthUser>;
  signUp: (input: RegisterInput) => Promise<RegisterResult>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<AuthUser | null>;
  saveProfile: (input: {
    name: string;
    lastname: string;
  }) => Promise<AuthUser>;
  changePassword: (
    currentPassword: string,
    password: string,
    passwordConfirmation: string,
  ) => Promise<void>;
  uploadAvatar: (file: File) => Promise<AuthUser>;
  removeAvatar: () => Promise<AuthUser>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const token = getStoredToken();

    if (!token) {
      const timeout = window.setTimeout(() => {
        if (cancelled) return;
        setUser(null);
        setStatus("unauthenticated");
      }, 0);

      return () => {
        cancelled = true;
        window.clearTimeout(timeout);
      };
    }

    void (async () => {
      try {
        const currentUser = await getCurrentUser();

        if (cancelled) return;

        setUser(currentUser);
        setStatus("authenticated");
      } catch {
        clearStoredToken();

        if (cancelled) return;

        setUser(null);
        setStatus("unauthenticated");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== TOKEN_STORAGE_KEY) return;

      void (async () => {
        if (!getStoredToken()) {
          if (!isMountedRef.current) return;
          setUser(null);
          setStatus("unauthenticated");
          return;
        }

        try {
          const currentUser = await getCurrentUser();
          if (!isMountedRef.current) return;
          setUser(currentUser);
          setStatus("authenticated");
        } catch {
          clearStoredToken();
          if (!isMountedRef.current) return;
          setUser(null);
          setStatus("unauthenticated");
        }
      })();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const signIn = useCallback(async (identifier: string, password: string) => {
    const currentUser = await loginRequest(identifier, password);
    setUser(currentUser);
    setStatus("authenticated");
    return currentUser;
  }, []);

  const signUp = useCallback(async (input: RegisterInput) => {
    const result = await registerRequest(input);

    if (result.authenticated) {
      setUser(result.user);
      setStatus("authenticated");
    } else {
      setUser(null);
      setStatus("unauthenticated");
    }

    return result;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (!getStoredToken()) {
      setUser(null);
      setStatus("unauthenticated");
      return null;
    }

    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setStatus("authenticated");
      return currentUser;
    } catch {
      clearStoredToken();
      setUser(null);
      setStatus("unauthenticated");
      return null;
    }
  }, []);

  const saveProfile = useCallback(
    async (input: { name: string; lastname: string }) => {
      await updateProfileRequest(input);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return currentUser;
    },
    [],
  );

  const changePassword = useCallback(
    async (
      currentPassword: string,
      password: string,
      passwordConfirmation: string,
    ) => {
      await changePasswordRequest(
        currentPassword,
        password,
        passwordConfirmation,
      );
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    },
    [],
  );

  const uploadAvatar = useCallback(async (file: File) => {
    await uploadProfileImage(file);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    return currentUser;
  }, []);

  const removeAvatar = useCallback(async () => {
    await deleteProfileImage();
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    return currentUser;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      signIn,
      signUp,
      signOut,
      refreshUser,
      saveProfile,
      changePassword,
      uploadAvatar,
      removeAvatar,
    }),
    [
      user,
      status,
      signIn,
      signUp,
      signOut,
      refreshUser,
      saveProfile,
      changePassword,
      uploadAvatar,
      removeAvatar,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return context;
}

export function useAuthUser(): AuthUser | null {
  return useAuth().user;
}

export function useAuthDisplayName(): string {
  return getUserDisplayName(useAuth().user);
}
