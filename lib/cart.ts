import { apiFetch } from "@/lib/api";

export interface CartCourse {
  documentId: string;
  name: string;
  price: number;
}

export interface CartItem {
  documentId: string;
  course: CartCourse;
}

export interface Cart {
  documentId: string;
  amount: number;
  items: CartItem[];
}

export const EMPTY_CART: Cart = { documentId: "", amount: 0, items: [] };

function toNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function normalizeCart(payload: unknown): Cart {
  if (!payload || typeof payload !== "object") return EMPTY_CART;

  const record = payload as Record<string, unknown>;
  const items = Array.isArray(record.items) ? record.items : [];

  return {
    documentId:
      typeof record.documentId === "string" ? record.documentId : "",
    amount: toNumber(record.amount),
    items: items.flatMap((value) => {
      if (!value || typeof value !== "object") return [];

      const item = value as Record<string, unknown>;
      if (!item.course || typeof item.course !== "object") return [];

      const course = item.course as Record<string, unknown>;
      if (typeof course.documentId !== "string") return [];

      return [
        {
          documentId:
            typeof item.documentId === "string"
              ? item.documentId
              : course.documentId,
          course: {
            documentId: course.documentId,
            name:
              typeof course.name === "string" ? course.name : "Curso",
            price: toNumber(course.price),
          },
        },
      ];
    }),
  };
}

export async function getCart(): Promise<Cart> {
  return normalizeCart(await apiFetch<unknown>("/cart/me"));
}

export async function addCartItem(courseDocumentId: string): Promise<Cart> {
  return normalizeCart(
    await apiFetch<unknown>("/cart/items", {
      method: "POST",
      body: { courseDocumentId },
    }),
  );
}

export async function removeCartItem(courseDocumentId: string): Promise<Cart> {
  return normalizeCart(
    await apiFetch<unknown>(
      `/cart/items/${encodeURIComponent(courseDocumentId)}`,
      { method: "DELETE" },
    ),
  );
}
