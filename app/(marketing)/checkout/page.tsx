import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckoutClient } from "@/components/checkout/checkout-client";
import { Container } from "@/components/ui/container";
import { getCartFromCookie } from "@/lib/cart/cookie";
import { resolveCart } from "@/lib/cart/resolve";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage() {
  const raw = await getCartFromCookie();
  const { lines, subtotal_cents, error } = await resolveCart(raw);

  if (error && raw.length > 0) {
    return (
      <div className="py-16">
        <Container>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
            Checkout
          </h1>
          <p className="mt-4 text-amber-400/90">{error}</p>
          <Link href="/cart" className="mt-6 inline-block text-[#016b28] hover:underline">
            ← Cart
          </Link>
        </Container>
      </div>
    );
  }

  if (!lines.length) {
    redirect("/cart");
  }

  return (
    <div className="py-16">
      <Container>
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
          Checkout
        </h1>
        <p className="mt-4 text-[#A1A1AA]">
          Secure checkout with PayPal. Amounts are validated against the cart on
          the server before capture.
        </p>
        <div className="mt-10 max-w-md">
          <CheckoutClient totalCents={subtotal_cents} />
        </div>
      </Container>
    </div>
  );
}
