import { SingleBeatUploadForm } from "@/components/admin/single-beat-upload-form";
import { getLicenseTiers } from "@/lib/data/license-tiers";

export default async function UploadBeatPage() {
  const tiers = await getLicenseTiers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-beats-hero)] text-2xl font-semibold text-white">
          Upload beat
        </h1>
        <p className="mt-2 max-w-2xl text-[#A1A1AA]">
          Upload one beat, generate the middle 30-second preview automatically,
          and publish all four license prices in one step.
        </p>
      </div>
      <SingleBeatUploadForm
        tiers={tiers.map((tier) => ({
          id: tier.id,
          slug: tier.slug,
          name: tier.name,
          price_cents: tier.price_cents,
        }))}
      />
    </div>
  );
}
