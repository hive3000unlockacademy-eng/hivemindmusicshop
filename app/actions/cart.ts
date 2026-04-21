"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getCartFromCookie,
  setCartCookie,
} from "@/lib/cart/cookie";
import type { CartLine } from "@/lib/cart/types";
import { getBeatBySlug } from "@/lib/data/beats";
import { getBeatLicenseOptions } from "@/lib/data/license-tiers";

function redirectCartError(beatSlug: string, message: string): never {
  redirect(
    `/beats/${encodeURIComponent(beatSlug)}?cartError=${encodeURIComponent(message)}`,
  );
}

export async function addToCartAction(formData: FormData) {
  const beatSlug = String(formData.get("beat_slug") ?? "");
  const tierSlug = String(formData.get("license_tier_slug") ?? "");
  if (!beatSlug || !tierSlug) {
    if (beatSlug) redirectCartError(beatSlug, "Missing beat or license");
    redirect("/beats");
  }

  const beat = await getBeatBySlug(beatSlug);
  const tier = beat
    ? (await getBeatLicenseOptions(beat.id)).find((t) => t.slug === tierSlug)
    : null;

  if (!beat || !tier) {
    redirectCartError(beatSlug, "Invalid selection");
  }

  const prev = await getCartFromCookie();
  const existing = prev.findIndex(
    (l) => l.beat_slug === beatSlug && l.license_tier_slug === tierSlug,
  );
  const next: CartLine[] = [...prev];
  if (existing >= 0) {
    next[existing] = {
      ...next[existing],
      quantity: next[existing].quantity + 1,
    };
  } else {
    next.push({ beat_slug: beatSlug, license_tier_slug: tierSlug, quantity: 1 });
  }

  await setCartCookie(next);
  revalidatePath("/cart");
  redirect("/cart");
}

export async function removeLineAction(formData: FormData) {
  const beatSlug = String(formData.get("beat_slug") ?? "");
  const tierSlug = String(formData.get("license_tier_slug") ?? "");
  const prev = await getCartFromCookie();
  const next = prev.filter(
    (l) => !(l.beat_slug === beatSlug && l.license_tier_slug === tierSlug),
  );
  await setCartCookie(next);
  revalidatePath("/cart");
}

export async function clearCartAction() {
  await setCartCookie([]);
  revalidatePath("/cart");
}
