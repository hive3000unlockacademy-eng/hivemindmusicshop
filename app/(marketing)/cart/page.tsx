import type { Metadata } from "next";
import Link from "next/link";
import { clearCartAction, removeLineAction } from "@/app/actions/cart";
import { Container } from "@/components/ui/container";
import { getCartFromCookie } from "@/lib/cart/cookie";
import { formatLinePrice, resolveCart } from "@/lib/cart/resolve";
import { formatUsd } from "@/lib/format";

export const metadata: Metadata = {
  title: "Cart",
};

export default async function CartPage() {
  const raw = await getCartFromCookie();
  const { lines, subtotal_cents, error } = await resolveCart(raw);

  return (
    <div className="py-16">
      <Container>
        <h1 className="text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
          Cart
        </h1>
        <div className="mx-auto mt-6 max-w-xl text-center">
          <p className="rounded-lg border border-white/10 bg-white/[0.04] px-5 py-4 text-sm leading-relaxed text-[#D4D4D8] sm:text-base">
            Checkout will be available soon. We&apos;re finishing secure payments—your
            selections stay in this cart until then.
          </p>
        </div>
        {error ? (
          <p className="mt-4 text-center text-amber-400/90">{error}</p>
        ) : null}

        {lines.length === 0 ? (
          <p className="mt-8 text-center text-[#A1A1AA]">
            Your cart is empty.{" "}
            <Link href="/beats" className="text-[#016b28] hover:underline">
              Browse beats
            </Link>
          </p>
        ) : (
          <div className="mt-10 space-y-6">
            <ul className="divide-y divide-white/10 rounded-xl border border-white/10">
              {lines.map((line) => {
                const p = formatLinePrice(line);
                return (
                  <li
                    key={`${line.beat_slug}-${line.license_tier_slug}`}
                    className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium text-white">{line.beat_title}</p>
                      <p className="text-sm text-[#A1A1AA]">
                        {line.license_name} · Qty {line.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-white">{p.line}</span>
                      <form action={removeLineAction}>
                        <input type="hidden" name="beat_slug" value={line.beat_slug} />
                        <input
                          type="hidden"
                          name="license_tier_slug"
                          value={line.license_tier_slug}
                        />
                        <button
                          type="submit"
                          className="text-sm text-[#A1A1AA] hover:text-red-400"
                        >
                          Remove
                        </button>
                      </form>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-between">
              <p className="text-center text-lg text-white sm:text-left">
                Subtotal:{" "}
                <span className="font-semibold text-[#016b28]">
                  {formatUsd(subtotal_cents)}
                </span>
              </p>
              <form action={clearCartAction}>
                <button
                  type="submit"
                  className="text-sm text-[#A1A1AA] hover:text-white"
                >
                  Clear cart
                </button>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
