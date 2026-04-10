import { cookies } from "next/headers";
import type { CartLine } from "@/lib/cart/types";

const CART_COOKIE = "hm_cart";

export async function getCartFromCookie(): Promise<CartLine[]> {
  const jar = await cookies();
  const raw = jar.get(CART_COOKIE)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(
      Buffer.from(decodeURIComponent(raw), "base64url").toString("utf8"),
    ) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is CartLine =>
        typeof x === "object" &&
        x !== null &&
        "beat_slug" in x &&
        "license_tier_slug" in x &&
        typeof (x as CartLine).beat_slug === "string" &&
        typeof (x as CartLine).license_tier_slug === "string",
    );
  } catch {
    return [];
  }
}

export async function setCartCookie(lines: CartLine[]): Promise<void> {
  const jar = await cookies();
  const payload = Buffer.from(JSON.stringify(lines), "utf8").toString(
    "base64url",
  );
  jar.set(CART_COOKIE, encodeURIComponent(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}
