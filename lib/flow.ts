import { apiFetch } from "@/lib/api";

export interface FlowCheckoutResult {
  url?: string;
  alreadyOwned?: boolean;
  courseSlug?: string | null;
  orderId?: string | null;
  commerceOrder?: string;
}

export type FlowPaymentStatus =
  | "created"
  | "pending"
  | "paid"
  | "rejected"
  | "cancelled"
  | "failed";

export interface FlowPaymentStatusResult {
  status: FlowPaymentStatus;
  paid: boolean;
  courseSlug: string | null;
  courseName: string | null;
  amount: number | null;
}

export async function startCourseCheckout(
  courseDocumentId: string,
): Promise<FlowCheckoutResult> {
  return apiFetch<FlowCheckoutResult>("/flow-order/checkout", {
    method: "POST",
    body: { courseDocumentId },
  });
}

export async function getFlowPaymentStatus(
  token: string,
): Promise<FlowPaymentStatusResult> {
  return apiFetch<FlowPaymentStatusResult>(
    `/flow-order/status?token=${encodeURIComponent(token)}`,
  );
}
