"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import { getErrorMessage } from "@/lib/api";
import { canPurchaseCourses } from "@/lib/auth";
import {
  EMPTY_CART,
  addCartItem,
  getCart,
  removeCartItem,
  type Cart,
} from "@/lib/cart";

interface CartContextValue {
  cart: Cart;
  loading: boolean;
  error: string | null;
  itemCount: number;
  isInCart: (courseDocumentId: string) => boolean;
  isPending: (courseDocumentId: string) => boolean;
  addItem: (courseDocumentId: string) => Promise<void>;
  removeItem: (courseDocumentId: string) => Promise<void>;
  refresh: () => Promise<void>;
  clear: () => void;
}

interface CartState {
  key: string;
  cart: Cart;
  loading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

function initialCartState(): CartState {
  return { key: "none", cart: EMPTY_CART, loading: false, error: null };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, status } = useAuth();
  const canPurchase = canPurchaseCourses(user);
  const sessionKey =
    status === "authenticated" && canPurchase
      ? `session:${user?.documentId ?? user?.id ?? ""}`
      : "none";
  const [state, setState] = useState<CartState>(initialCartState);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const isCurrentSession = state.key === sessionKey;
  const cart = isCurrentSession ? state.cart : EMPTY_CART;
  const loading =
    sessionKey !== "none" && (!isCurrentSession || state.loading);
  const error = isCurrentSession ? state.error : null;

  useEffect(() => {
    if (sessionKey === "none") return;

    let cancelled = false;

    getCart()
      .then((data) => {
        if (cancelled) return;
        setState({ key: sessionKey, cart: data, loading: false, error: null });
      })
      .catch((loadError) => {
        if (cancelled) return;
        setState({
          key: sessionKey,
          cart: EMPTY_CART,
          loading: false,
          error: getErrorMessage(loadError),
        });
      });

    return () => {
      cancelled = true;
    };
  }, [sessionKey]);

  const addItem = useCallback(
    async (courseDocumentId: string) => {
      setPendingIds((ids) => [...ids, courseDocumentId]);

      try {
        const updated = await addCartItem(courseDocumentId);
        setState({ key: sessionKey, cart: updated, loading: false, error: null });
      } finally {
        setPendingIds((ids) => ids.filter((id) => id !== courseDocumentId));
      }
    },
    [sessionKey],
  );

  const removeItem = useCallback(
    async (courseDocumentId: string) => {
      setPendingIds((ids) => [...ids, courseDocumentId]);

      try {
        const updated = await removeCartItem(courseDocumentId);
        setState({ key: sessionKey, cart: updated, loading: false, error: null });
      } finally {
        setPendingIds((ids) => ids.filter((id) => id !== courseDocumentId));
      }
    },
    [sessionKey],
  );

  const refresh = useCallback(async () => {
    if (sessionKey === "none") return;

    const updated = await getCart();
    setState({ key: sessionKey, cart: updated, loading: false, error: null });
  }, [sessionKey]);

  const clear = useCallback(() => {
    setState({
      key: sessionKey,
      cart: EMPTY_CART,
      loading: false,
      error: null,
    });
  }, [sessionKey]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      loading,
      error,
      itemCount: cart.items.length,
      isInCart: (courseDocumentId) =>
        cart.items.some((item) => item.course.documentId === courseDocumentId),
      isPending: (courseDocumentId) => pendingIds.includes(courseDocumentId),
      addItem,
      removeItem,
      refresh,
      clear,
    }),
    [cart, loading, error, pendingIds, addItem, removeItem, refresh, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe utilizarse dentro de CartProvider");
  }

  return context;
}
