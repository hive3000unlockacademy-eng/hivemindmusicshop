"use client";

import Image from "next/image";
import Link from "next/link";
import { useAudio } from "@/components/player/audio-context";
import type { PreviewBeat } from "@/components/home/beat-catalog-preview";

export function BeatCatalogPreviewClient({ beats }: { beats: PreviewBeat[] }) {
  const { current, isPlaying, play } = useAudio();

  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-white/10 md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0A0A0A] text-xs uppercase tracking-wide text-[#A1A1AA]">
            <tr>
              <th className="w-14 px-3 py-3 font-medium">
                <span className="sr-only">Artwork</span>
              </th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Time</th>
              <th className="px-4 py-3 font-medium">BPM</th>
              <th className="px-4 py-3 font-medium">Tags</th>
              <th className="px-4 py-3 text-right font-medium"> </th>
            </tr>
          </thead>
          <tbody>
            {beats.map((b) => {
              const active = current?.slug === b.slug;
              const url = b.previewUrl;
              return (
                <tr
                  key={b.slug}
                  className={`border-t border-white/5 transition hover:bg-[#0A0A0A]/80 ${active ? "bg-[#016b28]/5" : ""}`}
                >
                  <td className="px-3 py-3 align-middle">
                    <div className="relative h-10 w-10 overflow-hidden rounded-md border border-white/10 bg-[#111]">
                      {b.coverUrl ? (
                        <Image
                          src={b.coverUrl}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/beats/${b.slug}`}
                      className="font-medium text-white hover:text-[#016b28]"
                    >
                      {b.title}
                    </Link>
                    <div className="text-xs text-[#A1A1AA]">{b.genre}</div>
                  </td>
                  <td className="px-4 py-4 text-[#A1A1AA]">{b.duration}</td>
                  <td className="px-4 py-4 text-[#A1A1AA]">{b.bpm}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {b.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-[#A1A1AA]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      disabled={!url}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!url) return;
                        play({ slug: b.slug, title: b.title, previewUrl: url });
                      }}
                      className={`inline-flex rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                        active && isPlaying
                          ? "bg-[#016b28] text-white"
                          : "bg-[#016b28]/15 text-[#016b28] hover:bg-[#016b28]/25"
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      {active && isPlaying ? "Playing" : "Preview"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4 md:hidden">
        {beats.map((b) => {
          const url = b.previewUrl;
          const active = current?.slug === b.slug;
          return (
            <div
              key={b.slug}
              className={`flex gap-3 rounded-xl border p-4 transition ${
                active
                  ? "border-[#016b28]/40 bg-[#0A0A0A]"
                  : "border-white/10 bg-[#0A0A0A]/80 hover:border-[#016b28]/40"
              }`}
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#111]">
                {b.coverUrl ? (
                  <Image
                    src={b.coverUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <Link href={`/beats/${b.slug}`}>
                  <div className="font-medium text-white">{b.title}</div>
                </Link>
                <div className="mt-1 text-xs text-[#A1A1AA]">
                  {b.genre} · {b.duration} · {b.bpm} BPM
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {b.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-[#A1A1AA]"
                    >
                      {t}
                    </span>
                  ))}
                  <button
                    type="button"
                    disabled={!url}
                    onClick={() => {
                      if (!url) return;
                      play({ slug: b.slug, title: b.title, previewUrl: url });
                    }}
                    className="ml-auto rounded-md bg-[#016b28]/15 px-3 py-1 text-xs font-semibold text-[#016b28] disabled:opacity-40"
                  >
                    {active && isPlaying ? "Playing" : "Preview"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
