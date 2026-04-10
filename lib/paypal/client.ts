import { randomUUID } from "node:crypto";

function apiBase() {
  return process.env.PAYPAL_API_BASE ?? "https://api-m.sandbox.paypal.com";
}

export async function getPayPalAccessToken(): Promise<string> {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) {
    throw new Error("Missing PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET");
  }
  const res = await fetch(`${apiBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const json = (await res.json()) as { access_token?: string; error_description?: string };
  if (!res.ok) {
    throw new Error(json.error_description ?? "PayPal token request failed");
  }
  if (!json.access_token) {
    throw new Error("PayPal token missing");
  }
  return json.access_token;
}

export async function createPayPalOrder(params: {
  valueUsd: string;
  customId: string;
}): Promise<{ id: string }> {
  const token = await getPayPalAccessToken();
  const res = await fetch(`${apiBase()}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": randomUUID(),
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: params.valueUsd,
          },
          custom_id: params.customId,
          description: "HiveMindMusic.Shop",
        },
      ],
    }),
  });
  const json = (await res.json()) as { id?: string; message?: string };
  if (!res.ok) {
    throw new Error(json.message ?? "PayPal create order failed");
  }
  if (!json.id) {
    throw new Error("PayPal order id missing");
  }
  return { id: json.id };
}

export async function capturePayPalOrder(orderId: string): Promise<unknown> {
  const token = await getPayPalAccessToken();
  const res = await fetch(
    `${apiBase()}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  const json = await res.json();
  if (!res.ok) {
    throw new Error(
      (json as { message?: string }).message ?? "PayPal capture failed",
    );
  }
  return json;
}
