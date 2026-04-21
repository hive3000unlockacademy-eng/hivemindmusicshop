"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadBeatRecord } from "@/lib/admin/beat-upload";
import { createBrowserClient } from "@/lib/supabase/client";

type Tier = {
  id: string;
  slug: string;
  name: string;
  price_cents: number;
};

export function SingleBeatUploadForm({ tiers }: { tiers: Tier[] }) {
  const router = useRouter();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [bpm, setBpm] = useState("");
  const [publish, setPublish] = useState(true);
  const [prices, setPrices] = useState<Record<string, string>>(
    Object.fromEntries(tiers.map((tier) => [tier.id, String(tier.price_cents)])),
  );
  const [state, setState] = useState<{
    pending: boolean;
    error?: string;
    success?: string;
  }>({ pending: false });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!audioFile) {
      setState({ pending: false, error: "Audio file is required." });
      return;
    }

    setState({ pending: true });

    try {
      const supabase = createBrowserClient();
      const result = await uploadBeatRecord(supabase, {
        title,
        genre: genre.trim() || null,
        bpm: bpm ? Number(bpm) : null,
        audioFile,
        artworkFile,
        publish,
        licensePrices: tiers.map((tier) => ({
          licenseTierId: tier.id,
          priceCents: Number(prices[tier.id] ?? tier.price_cents),
        })),
      });

      setState({
        pending: false,
        success: `Uploaded ${title} and published it to the store as ${result.slug}.`,
      });
      setTitle("");
      setGenre("");
      setBpm("");
      setAudioFile(null);
      setArtworkFile(null);
      setPrices(
        Object.fromEntries(tiers.map((tier) => [tier.id, String(tier.price_cents)])),
      );
      router.refresh();
    } catch (error) {
      setState({
        pending: false,
        error: error instanceof Error ? error.message : "Upload failed.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-white/10 p-5">
          <h2 className="font-[family-name:var(--font-beats-hero)] text-xl text-white">
            Beat details
          </h2>
          <label className="block text-sm text-[#A1A1AA]">
            Title
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white"
            />
          </label>
          <label className="block text-sm text-[#A1A1AA]">
            Genre
            <input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white"
            />
          </label>
          <label className="block text-sm text-[#A1A1AA]">
            BPM
            <input
              inputMode="numeric"
              value={bpm}
              onChange={(e) => setBpm(e.target.value)}
              className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white"
            />
          </label>
          <label className="block text-sm text-[#A1A1AA]">
            Beat file
            <input
              required
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
              className="mt-2 block w-full text-sm text-[#A1A1AA]"
            />
          </label>
          <label className="block text-sm text-[#A1A1AA]">
            Artwork (optional)
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setArtworkFile(e.target.files?.[0] ?? null)}
              className="mt-2 block w-full text-sm text-[#A1A1AA]"
            />
          </label>
          <label className="flex items-center gap-3 text-sm text-white">
            <input
              type="checkbox"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
            />
            Publish immediately
          </label>
        </div>

        <div className="space-y-4 rounded-xl border border-white/10 p-5">
          <h2 className="font-[family-name:var(--font-beats-hero)] text-xl text-white">
            License pricing
          </h2>
          <p className="text-sm text-[#A1A1AA]">
            Every beat is sold under all four license options.
          </p>
          <div className="space-y-4">
            {tiers.map((tier) => (
              <label key={tier.id} className="block text-sm text-[#A1A1AA]">
                {tier.name}
                <input
                  inputMode="numeric"
                  value={prices[tier.id] ?? ""}
                  onChange={(e) =>
                    setPrices((prev) => ({ ...prev, [tier.id]: e.target.value }))
                  }
                  className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      {state.error ? (
        <p className="text-sm text-red-400/90" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-[#16a34a]" role="status">
          {state.success}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={state.pending}
        className="rounded-md bg-[#016b28] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {state.pending ? "Uploading..." : "Upload beat"}
      </button>
    </form>
  );
}
