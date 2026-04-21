import { BulkBeatUploadForm } from "@/components/admin/bulk-beat-upload-form";
import { getLicenseTiers } from "@/lib/data/license-tiers";

export default async function BulkUploadPage() {
  const tiers = await getLicenseTiers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-beats-hero)] text-2xl font-semibold text-white">
          Bulk upload
        </h1>
        <p className="mt-2 max-w-2xl text-[#A1A1AA]">
          Drop in multiple beat files, tune each title/BPM/genre, and upload a
          full pricing grid for every beat in one run.
        </p>
      </div>
      <BulkBeatUploadForm
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
