import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import { getSupabasePublishableKey, getSupabaseUrl } from "@/lib/supabase/env";

/** Supabase client for Client Components and browser-only code. */
export function createBrowserClient() {
  return createSupabaseBrowserClient(
    getSupabaseUrl(),
    getSupabasePublishableKey(),
  );
}
