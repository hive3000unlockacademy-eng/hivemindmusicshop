import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BeatDetail } from "@/components/shop/beat-detail";
import { getBeatBySlug } from "@/lib/data/beats";
import { getBeatLicenseOptions } from "@/lib/data/license-tiers";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ cartError?: string | string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const beat = await getBeatBySlug(slug);
  if (!beat) {
    return { title: "Beat" };
  }
  return {
    title: beat.title,
    description: beat.description ?? `${beat.title} — HiveMind beat`,
  };
}

export default async function BeatDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const cartErr = sp.cartError;
  const cartError =
    typeof cartErr === "string" ? cartErr : Array.isArray(cartErr) ? cartErr[0] : undefined;

  const beat = await getBeatBySlug(slug);
  if (!beat) {
    notFound();
  }

  const tiers = await getBeatLicenseOptions(beat.id);

  const tierOptions = tiers.map((t) => ({
    slug: t.slug,
    name: t.name,
    price_cents: t.price_cents,
  }));

  return (
    <BeatDetail
      beat={beat}
      licenseTiers={tierOptions}
      cartError={cartError}
    />
  );
}
