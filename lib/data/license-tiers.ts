import { createClient } from "@/lib/supabase/server";
import type { BeatLicenseOption, LicenseTierRow } from "@/lib/data/types";

export type { LicenseTierRow };

export async function getLicenseTiers(): Promise<LicenseTierRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("license_tiers")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data as LicenseTierRow[];
}

export async function getBeatLicenseOptions(
  beatId: string,
): Promise<BeatLicenseOption[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("beat_license_prices")
    .select(
      "price_cents, license_tiers!inner(id, slug, name, description, sort_order, is_highlighted)",
    )
    .eq("beat_id", beatId);
  if (error || !data) return [];

  return (data as Array<Record<string, unknown>>)
    .map((row) => {
      const tier = row.license_tiers as Record<string, unknown>;
      return {
        id: String(tier.id),
        slug: String(tier.slug),
        name: String(tier.name),
        description:
          tier.description == null ? null : String(tier.description),
        sort_order:
          typeof tier.sort_order === "number" ? tier.sort_order : Number.MAX_SAFE_INTEGER,
        is_highlighted: Boolean(tier.is_highlighted),
        price_cents: typeof row.price_cents === "number" ? row.price_cents : 0,
      };
    })
    .sort((a, b) => a.sort_order - b.sort_order);
}
