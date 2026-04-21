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

type UploadRow = {
  id: string;
  file: File;
  title: string;
  genre: string;
  bpm: string;
  prices: Record<string, string>;
};

function titleFromFilename(name: string) {
  return name
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function BulkBeatUploadForm({ tiers }: { tiers: Tier[] }) {
  const router = useRouter();
  const [rows, setRows] = useState<UploadRow[]>([]);
  const [publish, setPublish] = useState(true);
  const [state, setState] = useState<{
    pending: boolean;
    error?: string;
    success?: string;
    progress?: string;
  }>({ pending: false });

  function updateRow(id: string, patch: Partial<UploadRow>) {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rows.length) {
      setState({ pending: false, error: "Choose one or more audio files." });
      return;
    }

    setState({ pending: true, progress: `Uploading 0/${rows.length}` });
    const supabase = createBrowserClient();

    try {
      for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];
        setState({
          pending: true,
          progress: `Uploading ${i + 1}/${rows.length}: ${row.title}`,
        });

        await uploadBeatRecord(supabase, {
          title: row.title,
          genre: row.genre.trim() || null,
          bpm: row.bpm ? Number(row.bpm) : null,
          audioFile: row.file,
          publish,
          licensePrices: tiers.map((tier) => ({
            licenseTierId: tier.id,
            priceCents: Number(row.prices[tier.id] ?? tier.price_cents),
          })),
        });
      }

      setRows([]);
      setState({
        pending: false,
        success: `Uploaded ${rows.length} beat${rows.length === 1 ? "" : "s"}.`,
      });
      router.refresh();
    } catch (error) {
      setState({
        pending: false,
        error: error instanceof Error ? error.message : "Bulk upload failed.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-white/10 p-5">
        <h2 className="font-[family-name:var(--font-beats-hero)] text-xl text-white">
          Add files
        </h2>
        <input
          className="mt-4 block w-full text-sm text-[#A1A1AA]"
          type="file"
          accept="audio/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            setRows(
              files.map((file, idx) => ({
                id: `${file.name}-${idx}-${file.size}`,
                file,
                title: titleFromFilename(file.name),
                genre: "",
                bpm: "",
                prices: Object.fromEntries(
                  tiers.map((tier) => [tier.id, String(tier.price_cents)]),
                ),
              })),
            );
          }}
        />
        <label className="mt-4 flex items-center gap-3 text-sm text-white">
          <input
            type="checkbox"
            checked={publish}
            onChange={(e) => setPublish(e.target.checked)}
          />
          Publish all uploaded beats immediately
        </label>
      </div>

      {rows.length ? (
        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row.id} className="rounded-xl border border-white/10 p-5">
              <p className="text-sm text-[#A1A1AA]">{row.file.name}</p>
              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <label className="block text-sm text-[#A1A1AA]">
                  Title
                  <input
                    value={row.title}
                    onChange={(e) => updateRow(row.id, { title: e.target.value })}
                    className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white"
                  />
                </label>
                <label className="block text-sm text-[#A1A1AA]">
                  Genre
                  <input
                    value={row.genre}
                    onChange={(e) => updateRow(row.id, { genre: e.target.value })}
                    className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white"
                  />
                </label>
                <label className="block text-sm text-[#A1A1AA]">
                  BPM
                  <input
                    inputMode="numeric"
                    value={row.bpm}
                    onChange={(e) => updateRow(row.id, { bpm: e.target.value })}
                    className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white"
                  />
                </label>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {tiers.map((tier) => (
                  <label key={tier.id} className="block text-sm text-[#A1A1AA]">
                    {tier.name}
                    <input
                      inputMode="numeric"
                      value={row.prices[tier.id] ?? ""}
                      onChange={(e) =>
                        updateRow(row.id, {
                          prices: { ...row.prices, [tier.id]: e.target.value },
                        })
                      }
                      className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white"
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

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
      {state.progress ? (
        <p className="text-sm text-[#A1A1AA]">{state.progress}</p>
      ) : null}

      <button
        type="submit"
        disabled={state.pending || rows.length === 0}
        className="rounded-md bg-[#016b28] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {state.pending ? "Uploading..." : "Bulk upload beats"}
      </button>
    </form>
  );
}
