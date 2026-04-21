import type { ResolvedLine } from "@/lib/cart/resolve";
import { createAdminClient } from "@/lib/supabase/admin";

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

export async function fulfillPaidOrder(params: {
  paypalOrderId: string;
  resolvedLines: ResolvedLine[];
  subtotal_cents: number;
  capturePayload: CapturePayload;
}): Promise<FulfillPaidOrderResult> {
  const supabase = createAdminClient();
  const existing = await supabase
    .from("orders")
    .select("id")
    .eq("paypal_order_id", params.paypalOrderId)
    .maybeSingle();

  if (existing.data?.id) {
    return {
      orderId: existing.data.id,
      duplicate: true,
      downloadLinks: [],
    };
  }

  const capture =
    params.capturePayload.purchase_units?.[0]?.payments?.captures?.[0] ?? null;
  const customerEmail =
    params.capturePayload.payer?.email_address ?? "customer@example.com";

  const insertedOrder = await supabase
    .from("orders")
    .insert({
      customer_email: customerEmail,
      paypal_order_id: params.paypalOrderId,
      paypal_capture_id: capture?.id ?? null,
      payment_status: "paid",
      fulfillment_status: "pending",
      total_cents: params.subtotal_cents,
      currency: "USD",
      raw_paypal_payload: params.capturePayload,
    })
    .select("id")
    .single();

  if (insertedOrder.error) {
    throw new Error(insertedOrder.error.message);
  }

  const orderId = insertedOrder.data.id;
  const lineInsert = await supabase.from("order_items").insert(
    params.resolvedLines.map((line) => ({
      order_id: orderId,
      beat_id: line.beat_id,
      license_tier_id: line.license_tier_id,
      unit_price_cents: line.unit_price_cents,
      title_snapshot: line.beat_title,
      tier_name_snapshot: line.license_name,
      quantity: line.quantity,
    })),
  );

  if (lineInsert.error) {
    throw new Error(lineInsert.error.message);
  }

  return {
    orderId,
    duplicate: false,
    downloadLinks: [],
  };
}
