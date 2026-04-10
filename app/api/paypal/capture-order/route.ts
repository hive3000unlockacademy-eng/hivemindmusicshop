import { NextResponse } from "next/server";
import { getCartFromCookie, setCartCookie } from "@/lib/cart/cookie";
import { resolveCart } from "@/lib/cart/resolve";
import { sendPurchaseEmails } from "@/lib/email/order-confirmation";
import { fulfillPaidOrder } from "@/lib/orders/fulfill";
import { capturePayPalOrder } from "@/lib/paypal/client";

type CapturePayload = {
  id?: string;
  payer?: { email_address?: string };
  purchase_units?: Array<{
    payments?: {
      captures?: Array<{ id?: string; amount?: { value?: string } }>;
    };
  }>;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { orderID?: string };
    const orderID = body.orderID;
    if (!orderID) {
      return NextResponse.json({ error: "orderID required" }, { status: 400 });
    }

    const raw = await getCartFromCookie();
    const { lines, subtotal_cents, error } = await resolveCart(raw);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
    if (!lines.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const capturePayload = (await capturePayPalOrder(
      orderID,
    )) as CapturePayload;

    const capturedValue =
      capturePayload.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value;
    if (!capturedValue) {
      return NextResponse.json({ error: "Capture amount missing" }, { status: 400 });
    }
    const capturedCents = Math.round(parseFloat(capturedValue) * 100);
    if (capturedCents !== subtotal_cents) {
      return NextResponse.json(
        { error: "Payment amount does not match cart" },
        { status: 400 },
      );
    }

    const result = await fulfillPaidOrder({
      paypalOrderId: orderID,
      resolvedLines: lines,
      subtotal_cents,
      capturePayload,
    });

    const linesHtml = `<ul>${lines
      .map(
        (l) =>
          `<li>${l.beat_title} — ${l.license_name} × ${l.quantity} (${(l.line_total_cents / 100).toFixed(2)} USD)</li>`,
      )
      .join("")}</ul>`;

    const email =
      capturePayload.payer?.email_address ?? "customer@example.com";
    if (!result.duplicate) {
      await sendPurchaseEmails({
        customerEmail: email,
        orderId: result.orderId,
        linesHtml,
        downloadLinks: result.downloadLinks,
      });
    }

    await setCartCookie([]);

    return NextResponse.json({ ok: true, orderId: result.orderId });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Capture failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
