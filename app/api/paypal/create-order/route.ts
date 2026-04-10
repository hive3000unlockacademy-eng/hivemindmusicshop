import { NextResponse } from "next/server";
import { getCartFromCookie } from "@/lib/cart/cookie";
import { resolveCart } from "@/lib/cart/resolve";
import { createPayPalOrder } from "@/lib/paypal/client";

export async function POST() {
  try {
    const raw = await getCartFromCookie();
    const { lines, subtotal_cents, error } = await resolveCart(raw);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
    if (!lines.length || subtotal_cents <= 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const valueUsd = (subtotal_cents / 100).toFixed(2);
    const order = await createPayPalOrder({
      valueUsd,
      customId: "hivemind-cart",
    });

    return NextResponse.json({ id: order.id });
  } catch (e) {
    const message = e instanceof Error ? e.message : "PayPal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
