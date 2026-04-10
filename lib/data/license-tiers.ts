import { STATIC_LICENSE_TIERS } from "@/lib/catalog/static-data";
import type { LicenseTierRow } from "@/lib/data/types";

export type { LicenseTierRow };

export async function getLicenseTiers(): Promise<LicenseTierRow[]> {
  return [...STATIC_LICENSE_TIERS].sort((a, b) => a.sort_order - b.sort_order);
}
