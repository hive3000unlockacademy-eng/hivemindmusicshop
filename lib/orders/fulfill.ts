import type { ResolvedLine } from "@/lib/cart/resolve";

type CapturePayload = {
  id?: string;
  payer?: { email_address?: string };
  purchase_units?: Array<{
    payments?: {
      captures?: Array<{ id?: string; amount?: { value?: string } }>;
    };
  }>;
};

export type FulfillPaidOrderResult =
  | {
      orderId: string;
      duplicate: true;
      downloadLinks: { label: string; token: string }[];
    }
  | {
      orderId: string;
      duplicate: false;
      downloadLinks: { label: string; token: string }[];
    };

/** Checkout persistence requires a database; orders and download grants are not stored locally. */
export async function fulfillPaidOrder(params: {
  paypalOrderId: string;
  resolvedLines: ResolvedLine[];
  subtotal_cents: number;
  capturePayload: CapturePayload;
}): Promise<FulfillPaidOrderResult> {
  void params;
  throw new Error(
    "Checkout fulfillment is disabled: connect a database (e.g. Supabase) to store orders and downloads.",
  );
}
