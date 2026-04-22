import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BeatDetail } from "@/components/shop/beat-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { getBeatBySlug } from "@/lib/data/beats";
import { getBeatLicenseOptions } from "@/lib/data/license-tiers";
import { buildBeatProductJsonLd } from "@/lib/seo/json-ld-builders";
import { beatDetailMetadata } from "@/lib/seo/marketing-metadata";

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
  const tiers = await getBeatLicenseOptions(beat.id);
  return beatDetailMetadata(beat, tiers);
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
    <>
      <JsonLd data={buildBeatProductJsonLd(beat, tiers)} />
      <BeatDetail
        beat={beat}
        licenseTiers={tierOptions}
        cartError={cartError}
      />
    </>
  );
}
