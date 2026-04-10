import type { CartLine } from "@/lib/cart/types";
import { STATIC_BEATS, STATIC_LICENSE_TIERS } from "@/lib/catalog/static-data";
import { formatUsd } from "@/lib/format";

export type ResolvedLine = {
  beat_id: string;
  beat_slug: string;
  beat_title: string;
  license_tier_id: string;
  license_tier_slug: string;
  license_name: string;
  unit_price_cents: number;
  quantity: number;
  line_total_cents: number;
};

export async function resolveCart(
  lines: CartLine[],
): Promise<{ lines: ResolvedLine[]; subtotal_cents: number; error?: string }> {
  const resolved: ResolvedLine[] = [];

  for (const line of lines) {
    const qty = Math.min(99, Math.max(1, Math.floor(line.quantity || 1)));
    const beat = STATIC_BEATS.find(
      (b) => b.slug === line.beat_slug && b.is_active,
    );
    if (!beat) {
      return { lines: [], subtotal_cents: 0, error: "Invalid beat in cart" };
    }

    const tier = STATIC_LICENSE_TIERS.find((t) => t.slug === line.license_tier_slug);
    if (!tier) {
      return { lines: [], subtotal_cents: 0, error: "Invalid license tier" };
    }

    const unit = tier.price_cents;
    resolved.push({
      beat_id: beat.id,
      beat_slug: beat.slug,
      beat_title: beat.title,
      license_tier_id: tier.id,
      license_tier_slug: tier.slug,
      license_name: tier.name,
      unit_price_cents: unit,
      quantity: qty,
      line_total_cents: unit * qty,
    });
  }

  const subtotal_cents = resolved.reduce((s, l) => s + l.line_total_cents, 0);
  return { lines: resolved, subtotal_cents };
}

export function formatLinePrice(line: ResolvedLine) {
  return {
    unit: formatUsd(line.unit_price_cents),
    line: formatUsd(line.line_total_cents),
  };
}
