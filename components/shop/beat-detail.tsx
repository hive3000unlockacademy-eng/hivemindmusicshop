import Image from "next/image";
import Link from "next/link";
import { addToCartAction } from "@/app/actions/cart";
import { BeatDetailPlayer } from "@/components/player/beat-detail-player";
import type { BeatRow } from "@/lib/data/beats";
import { formatDuration } from "@/lib/format";
import { Container } from "@/components/ui/container";
import { siteImageUrl } from "@/lib/images/site";
import { getPublicMediaUrl } from "@/lib/storage";

type TierOption = { slug: string; name: string; price_cents: number };

export function BeatDetail({
  beat,
  licenseTiers,
  cartError,
}: {
  beat: BeatRow;
  licenseTiers: TierOption[];
  cartError?: string;
}) {
  const tags = beat.mood ?? [];
  const previewUrl = getPublicMediaUrl(beat.preview_path);
  const coverUrl = siteImageUrl(beat.artwork_path);

  return (
    <div className="py-16">
      <Container>
        <p className="text-sm text-[#A1A1AA]">
          <Link href="/beats" className="hover:text-[#016b28]">
            ← Beats
          </Link>
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
          <div
            className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A]"
            role="img"
            aria-label={beat.title}
          >
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 320px"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#050505]" />
            )}
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-beats-hero)] text-4xl font-semibold tracking-tight text-white lg:text-5xl">
              {beat.title}
            </h1>
            <p className="mt-4 text-[#A1A1AA]">
              {beat.genre ?? "Instrumental"}
              {beat.bpm != null ? ` · ${beat.bpm} BPM` : ""}
              {beat.musical_key ? ` · ${beat.musical_key}` : ""}
              {beat.duration_seconds != null
                ? ` · ${formatDuration(beat.duration_seconds)}`
                : ""}
            </p>
            {tags.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#A1A1AA]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            {beat.description ? (
              <p className="mt-8 max-w-2xl leading-relaxed text-[#A1A1AA]">
                {beat.description}
              </p>
            ) : null}
            <BeatDetailPlayer
              slug={beat.slug}
              title={beat.title}
              previewUrl={previewUrl}
            />
            {licenseTiers.length === 0 ? (
              <p className="mt-10 text-sm text-amber-400/90">
                License tiers are not loaded. Seed Supabase or check connection.
              </p>
            ) : (
              <form
                action={addToCartAction}
                className="mt-10 flex flex-col gap-4"
              >
                {cartError ? (
                  <p className="text-sm text-red-400/90" role="alert">
                    {cartError}
                  </p>
                ) : null}
                <div className="flex flex-wrap items-end gap-4">
                <input type="hidden" name="beat_slug" value={beat.slug} />
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="license_tier_slug"
                    className="text-xs text-[#A1A1AA]"
                  >
                    License tier
                  </label>
                  <select
                    id="license_tier_slug"
                    name="license_tier_slug"
                    required
                    className="rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-sm text-white focus:border-[#002400] focus:outline-none"
                    defaultValue={licenseTiers[0]?.slug ?? ""}
                  >
                    {licenseTiers.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.name} — {(t.price_cents / 100).toFixed(2)} USD
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="inline-flex rounded-md bg-[#016b28] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(1,107,40,0.28)] transition-shadow duration-200 hover:shadow-[0_0_40px_rgba(1,107,40,0.55),0_0_72px_rgba(1,107,40,0.2)]"
                >
                  Add to cart
                </button>
                <Link
                  href="/#licensing"
                  className="inline-flex rounded-md border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:border-[#002400]/50"
                >
                  View licenses
                </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
