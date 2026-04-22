import { createBrowserClient } from "@/lib/supabase/client";

type BeatStoreEventType = "preview" | "add_to_cart";

const SESSION_KEY = "hm_store_session_id";

function getSessionId() {
  if (typeof window === "undefined") return null;
  const existing = window.localStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const generated = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(SESSION_KEY, generated);
  return generated;
}

export function trackBeatStoreEvent(
  eventType: BeatStoreEventType,
  beatSlug: string,
  metadata?: Record<string, unknown>,
) {
  if (!beatSlug) return;
  const supabase = createBrowserClient();
  const pagePath =
    typeof window !== "undefined" ? window.location.pathname : null;
  const userAgent =
    typeof navigator !== "undefined" ? navigator.userAgent : null;
  const sessionId = getSessionId();

  void supabase.from("beat_store_events").insert({
    event_type: eventType,
    beat_slug: beatSlug,
    session_id: sessionId,
    page_path: pagePath,
    user_agent: userAgent,
    metadata: metadata ?? null,
  });
}
