"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatUsd } from "@/lib/format";

export function CheckoutClient({ totalCents }: { totalCents: number }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    return (
      <p className="text-amber-400/90">
        Set NEXT_PUBLIC_PAYPAL_CLIENT_ID and PayPal API credentials in
        environment variables to enable checkout.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-lg text-white">
        Total due:{" "}
        <span className="font-semibold text-[#016b28]">
          {formatUsd(totalCents)}
        </span>
      </p>
      {message ? (
        <p className="text-sm text-[#A1A1AA]" role="status">
          {message}
        </p>
      ) : null}
      <PayPalScriptProvider
        options={{
          clientId,
          currency: "USD",
          intent: "capture",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical", color: "gold", shape: "rect" }}
          createOrder={async () => {
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
            });
            const data = (await res.json()) as { id?: string; error?: string };
            if (!res.ok) {
              throw new Error(data.error ?? "Could not create PayPal order");
            }
            if (!data.id) {
              throw new Error("Missing order id");
            }
            return data.id;
          }}
          onApprove={async (data) => {
            setMessage("Completing purchase…");
            const res = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderID: data.orderID }),
            });
            const json = (await res.json()) as {
              ok?: boolean;
              error?: string;
            };
            if (!res.ok) {
              setMessage(json.error ?? "Capture failed");
              return;
            }
            setMessage("Thank you! Confirmation email sent when configured.");
            router.refresh();
          }}
        />
      </PayPalScriptProvider>
      <p className="text-xs text-[#A1A1AA]">
        PayPal is the only payment method. Totals are verified on the server
        before orders and downloads are created.
      </p>
      <Link href="/cart" className="text-sm text-[#016b28] hover:underline">
        ← Back to cart
      </Link>
    </div>
  );
}
