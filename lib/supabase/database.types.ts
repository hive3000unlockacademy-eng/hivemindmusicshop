/**
 * Minimal Supabase typings for admin RPC and tables used in the admin UI.
 * Regenerate with: npx supabase gen types typescript --project-id <ref> > lib/supabase/database.types.ts
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      beat_store_events: {
        Row: {
          id: number;
          event_type: string;
          beat_slug: string;
          session_id: string | null;
          page_path: string | null;
          user_agent: string | null;
          metadata: Json | null;
          created_at: string;
        };
      };
      beat_license_prices: {
        Row: {
          beat_id: string;
          license_tier_id: string;
          price_cents: number;
          created_at: string;
          updated_at: string;
        };
      };
      beats: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          bpm: number | null;
          musical_key: string | null;
          genre: string | null;
          mood: string[] | null;
          is_active: boolean;
          is_featured: boolean;
          artwork_path: string | null;
          source_audio_path: string | null;
          preview_path: string | null;
          preview_start_seconds: number;
          preview_duration_seconds: number;
          duration_seconds: number | null;
          created_at: string;
          updated_at: string;
        };
      };
      license_tiers: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          price_cents: number;
          rights_json: Json;
          sort_order: number;
          is_highlighted: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_email: string;
          paypal_order_id: string;
          paypal_capture_id: string | null;
          payment_status: string;
          fulfillment_status: string;
          total_cents: number;
          currency: string;
          raw_paypal_payload: Json;
          created_at: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          beat_id: string;
          license_tier_id: string | null;
          unit_price_cents: number;
          title_snapshot: string | null;
          tier_name_snapshot: string | null;
          quantity: number;
          created_at: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      current_is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
