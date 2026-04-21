import type { SupabaseClient } from "@supabase/supabase-js";

export type LicensePriceInput = {
  licenseTierId: string;
  priceCents: number;
};

export type UploadBeatInput = {
  title: string;
  bpm: number | null;
  genre: string | null;
  audioFile: File;
  artworkFile?: File | null;
  publish: boolean;
  licensePrices: LicensePriceInput[];
};

type PreviewClip = {
  blob: Blob;
  startSeconds: number;
  durationSeconds: number;
  originalDurationSeconds: number;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function fileExtension(name: string) {
  const match = /\.([a-z0-9]+)$/i.exec(name);
  return match ? `.${match[1].toLowerCase()}` : "";
}

async function ensureUniqueSlug(supabase: SupabaseClient, title: string) {
  const base = slugify(title) || `beat-${Date.now()}`;
  let candidate = base;
  let suffix = 2;

  while (true) {
    const { data, error } = await supabase
      .from("beats")
      .select("slug")
      .eq("slug", candidate)
      .maybeSingle();
    if (error) {
      throw new Error(error.message);
    }
    if (!data) return candidate;
    candidate = `${base}-${suffix++}`;
  }
}

async function createMiddlePreviewClip(file: File): Promise<PreviewClip> {
  const arrayBuffer = await file.arrayBuffer();
  const audioCtx = new AudioContext();

  try {
    const decoded = await audioCtx.decodeAudioData(arrayBuffer.slice(0));
    const clipDuration = Math.min(30, decoded.duration);
    const startSeconds = Math.max(0, (decoded.duration - clipDuration) / 2);
    const sampleRate = decoded.sampleRate;
    const startFrame = Math.floor(startSeconds * sampleRate);
    const frameCount = Math.floor(clipDuration * sampleRate);
    const clip = audioCtx.createBuffer(
      decoded.numberOfChannels,
      frameCount,
      sampleRate,
    );

    for (let channel = 0; channel < decoded.numberOfChannels; channel += 1) {
      const source = decoded.getChannelData(channel);
      clip.copyToChannel(source.subarray(startFrame, startFrame + frameCount), channel);
    }

    return {
      blob: new Blob([encodeWav(clip)], { type: "audio/wav" }),
      startSeconds,
      durationSeconds: clipDuration,
      originalDurationSeconds: decoded.duration,
    };
  } finally {
    await audioCtx.close();
  }
}

function encodeWav(buffer: AudioBuffer) {
  const channelData = Array.from({ length: buffer.numberOfChannels }, (_, i) =>
    buffer.getChannelData(i),
  );
  const sampleCount = buffer.length;
  const bytesPerSample = 2;
  const blockAlign = buffer.numberOfChannels * bytesPerSample;
  const byteRate = buffer.sampleRate * blockAlign;
  const dataSize = sampleCount * blockAlign;
  const output = new ArrayBuffer(44 + dataSize);
  const view = new DataView(output);

  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, buffer.numberOfChannels, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let i = 0; i < sampleCount; i += 1) {
    for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
      const sample = Math.max(-1, Math.min(1, channelData[channel]?.[i] ?? 0));
      view.setInt16(
        offset,
        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
        true,
      );
      offset += 2;
    }
  }

  return output;
}

function writeAscii(view: DataView, offset: number, value: string) {
  for (let i = 0; i < value.length; i += 1) {
    view.setUint8(offset + i, value.charCodeAt(i));
  }
}

export async function uploadBeatRecord(
  supabase: SupabaseClient,
  input: UploadBeatInput,
) {
  const slug = await ensureUniqueSlug(supabase, input.title);
  const stamp = Date.now();
  const audioExt = fileExtension(input.audioFile.name) || ".mp3";
  const sourceAudioPath = `beats/source/${slug}-${stamp}${audioExt}`;
  const previewPath = `beats/previews/${slug}-${stamp}.wav`;

  const preview = await createMiddlePreviewClip(input.audioFile);

  const sourceUpload = await supabase.storage
    .from("private-beats")
    .upload(sourceAudioPath, input.audioFile, {
      contentType: input.audioFile.type || "audio/mpeg",
      upsert: true,
    });
  if (sourceUpload.error) {
    throw new Error(sourceUpload.error.message);
  }

  const previewUpload = await supabase.storage
    .from("public-media")
    .upload(previewPath, preview.blob, {
      contentType: "audio/wav",
      upsert: true,
    });
  if (previewUpload.error) {
    throw new Error(previewUpload.error.message);
  }

  let artworkPath: string | null = null;
  if (input.artworkFile) {
    const artworkExt = fileExtension(input.artworkFile.name) || ".jpg";
    artworkPath = `beats/artwork/${slug}-${stamp}${artworkExt}`;
    const artworkUpload = await supabase.storage
      .from("public-media")
      .upload(artworkPath, input.artworkFile, {
        contentType: input.artworkFile.type || "image/jpeg",
        upsert: true,
      });
    if (artworkUpload.error) {
      throw new Error(artworkUpload.error.message);
    }
  }

  const insertedBeat = await supabase
    .from("beats")
    .insert({
      slug,
      title: input.title.trim(),
      bpm: input.bpm,
      genre: input.genre?.trim() || null,
      is_active: input.publish,
      is_featured: false,
      artwork_path: artworkPath,
      source_audio_path: sourceAudioPath,
      preview_path: previewPath,
      preview_start_seconds: Math.floor(preview.startSeconds),
      preview_duration_seconds: Math.ceil(preview.durationSeconds),
      duration_seconds: Math.ceil(preview.originalDurationSeconds),
    })
    .select("id")
    .single();

  if (insertedBeat.error) {
    throw new Error(insertedBeat.error.message);
  }

  const beatId = insertedBeat.data.id;
  const pricingInsert = await supabase.from("beat_license_prices").insert(
    input.licensePrices.map((entry) => ({
      beat_id: beatId,
      license_tier_id: entry.licenseTierId,
      price_cents: entry.priceCents,
    })),
  );
  if (pricingInsert.error) {
    throw new Error(pricingInsert.error.message);
  }

  return { beatId, slug };
}
