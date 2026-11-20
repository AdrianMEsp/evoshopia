import { apiFetch } from "@/lib/api";

export interface CheckoutResult {
  orderDocumentId: string;
  paymentUrl: string;
}

export type OrderStatus = "pendiente" | "pagado" | "cancelado";

export type PaymentStatus = "pendiente" | "pagado" | "rechazado" | "anulado";

export interface OrderItem {
  courseName: string | null;
  price: number;
}

export interface Order {
  documentId: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  paymentStatus: PaymentStatus;
  paidAt: string | null;
  items: OrderItem[];
}

export const LAST_ORDER_STORAGE_KEY = "evosophia.lastOrder";

export function saveLastOrder(orderDocumentId: string): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(LAST_ORDER_STORAGE_KEY, orderDocumentId);
  } catch {
    return;
  }
}

export function getLastOrder(): string | null {
  if (typeof window === "undefined") return null;

  try {
    return window.sessionStorage.getItem(LAST_ORDER_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function clearLastOrder(): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.removeItem(LAST_ORDER_STORAGE_KEY);
  } catch {
    return;
  }
}

function normalizeCheckout(payload: unknown): CheckoutResult {
  if (!payload || typeof payload !== "object") {
    throw new Error("No se pudo iniciar el pago.");
  }

  const record = payload as Record<string, unknown>;
  const orderDocumentId = record.orderDocumentId;
  const paymentUrl = record.paymentUrl;

  if (typeof orderDocumentId !== "string" || typeof paymentUrl !== "string") {
    throw new Error("No se pudo iniciar el pago.");
  }

  return { orderDocumentId, paymentUrl };
}

export async function startCartCheckout(): Promise<CheckoutResult> {
  const payload = await apiFetch<unknown>("/orders/checkout", {
    method: "POST",
  });
  return normalizeCheckout(payload);
}

function normalizeOrders(payload: unknown): Order[] {
  if (!payload || typeof payload !== "object") return [];

  const data = (payload as Record<string, unknown>).data;
  if (!Array.isArray(data)) return [];

  return data.flatMap((value) => {
    if (!value || typeof value !== "object") return [];

    const order = value as Record<string, unknown>;
    if (typeof order.documentId !== "string") return [];

    const items = Array.isArray(order.items) ? order.items : [];
    const payment = order.paymentStatus;

    return [
      {
        documentId: order.documentId,
        status:
          order.status === "pagado" || order.status === "cancelado"
            ? order.status
            : "pendiente",
        totalAmount:
          typeof order.totalAmount === "number" &&
          Number.isFinite(order.totalAmount)
            ? order.totalAmount
            : 0,
        createdAt:
          typeof order.createdAt === "string" ? order.createdAt : "",
        paymentStatus:
          payment === "pagado" ||
          payment === "rechazado" ||
          payment === "anulado"
            ? payment
            : "pendiente",
        paidAt: typeof order.paidAt === "string" ? order.paidAt : null,
        items: items.flatMap((itemValue) => {
          if (!itemValue || typeof itemValue !== "object") return [];

          const item = itemValue as Record<string, unknown>;
          return [
            {
              courseName:
                typeof item.courseName === "string" ? item.courseName : null,
              price:
                typeof item.price === "number" && Number.isFinite(item.price)
                  ? item.price
                  : 0,
            },
          ];
        }),
      },
    ];
  });
}

export async function getMyOrders(): Promise<Order[]> {
  return normalizeOrders(await apiFetch<unknown>("/orders/me"));
}
