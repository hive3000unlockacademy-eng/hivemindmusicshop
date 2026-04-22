import { createClient } from "@/lib/supabase/server";
import { formatUsd } from "@/lib/format";

async function count(supabase: Awaited<ReturnType<typeof createClient>>, table: string) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  if (error) return "—";
  return count ?? 0;
}

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const [
    beats,
    orders,
    recentBeatsRes,
    recentOrdersRes,
    orderTotalsRes,
    previewCountRes,
    addToCartCountRes,
    activityRes,
  ] =
    await Promise.all([
    count(supabase, "beats"),
    count(supabase, "orders"),
      supabase
        .from("beats")
        .select("id, title, genre, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("orders")
        .select("id, customer_email, total_cents, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase.from("orders").select("total_cents"),
      supabase
        .from("beat_store_events")
        .select("id", { count: "exact", head: true })
        .eq("event_type", "preview")
        .gte("created_at", since24h),
      supabase
        .from("beat_store_events")
        .select("id", { count: "exact", head: true })
        .eq("event_type", "add_to_cart")
        .gte("created_at", since24h),
      supabase
        .from("beat_store_events")
        .select("beat_slug, event_type, created_at")
        .gte("created_at", since24h)
        .order("created_at", { ascending: false })
        .limit(500),
    ]);

  const totalRevenue = formatUsd(
    (orderTotalsRes.data ?? []).reduce(
      (sum, row) => sum + (typeof row.total_cents === "number" ? row.total_cents : 0),
      0,
    ),
  );

  const preview24h = previewCountRes.count ?? 0;
  const addToCart24h = addToCartCountRes.count ?? 0;

  const activityByBeat = new Map<string, { previews: number; adds: number }>();
  for (const row of activityRes.data ?? []) {
    const key = row.beat_slug;
    const current = activityByBeat.get(key) ?? { previews: 0, adds: 0 };
    if (row.event_type === "preview") current.previews += 1;
    if (row.event_type === "add_to_cart") current.adds += 1;
    activityByBeat.set(key, current);
  }

  const topActivity = [...activityByBeat.entries()]
    .map(([beatSlug, value]) => ({ beatSlug, ...value }))
    .sort((a, b) => b.previews + b.adds - (a.previews + a.adds))
    .slice(0, 8);

  const cards = [
    { label: "Live beats", value: String(beats) },
    { label: "Sales", value: String(orders) },
    { label: "Revenue", value: totalRevenue },
    { label: "Previews (24h)", value: String(preview24h) },
    { label: "Add to cart (24h)", value: String(addToCart24h) },
    { label: "License options", value: "per selected tier" },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-beats-hero)] text-2xl font-semibold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="mt-2 max-w-xl text-[#A1A1AA]">
          Manage uploads, watch sales, and keep the beat store current.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-sm text-[#A1A1AA]">{card.label}</p>
            <p className="mt-2 font-[family-name:var(--font-beats-hero)] text-3xl text-white">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-xl border border-white/10 p-5">
          <h2 className="font-[family-name:var(--font-beats-hero)] text-xl text-white">
            Recent uploads
          </h2>
          <ul className="mt-4 space-y-3">
            {(recentBeatsRes.data ?? []).map((beat) => (
              <li key={beat.id} className="flex items-center justify-between gap-4 text-sm">
                <div>
                  <p className="text-white">{beat.title}</p>
                  <p className="text-[#A1A1AA]">{beat.genre ?? "Instrumental"}</p>
                </div>
                <p className="text-[#A1A1AA]">
                  {new Date(beat.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
            {!recentBeatsRes.data?.length ? (
              <li className="text-sm text-[#A1A1AA]">No beats uploaded yet.</li>
            ) : null}
          </ul>
        </section>

        <section className="rounded-xl border border-white/10 p-5">
          <h2 className="font-[family-name:var(--font-beats-hero)] text-xl text-white">
            Recent sales
          </h2>
          <ul className="mt-4 space-y-3">
            {(recentOrdersRes.data ?? []).map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-4 text-sm">
                <div>
                  <p className="text-white">{order.customer_email}</p>
                  <p className="text-[#A1A1AA]">{formatUsd(order.total_cents ?? 0)}</p>
                </div>
                <p className="text-[#A1A1AA]">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
            {!recentOrdersRes.data?.length ? (
              <li className="text-sm text-[#A1A1AA]">No sales yet.</li>
            ) : null}
          </ul>
        </section>
      </div>

      <section className="rounded-xl border border-white/10 p-5">
        <h2 className="font-[family-name:var(--font-beats-hero)] text-xl text-white">
          Beat store activity (24h)
        </h2>
        <p className="mt-2 text-sm text-[#A1A1AA]">
          Preview starts and add-to-cart actions tracked from the beat pages.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="text-[#A1A1AA]">
              <tr>
                <th className="pb-2 pr-4 font-medium">Beat slug</th>
                <th className="pb-2 pr-4 font-medium">Previews</th>
                <th className="pb-2 font-medium">Adds to cart</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {topActivity.map((row) => (
                <tr key={row.beatSlug}>
                  <td className="py-2 pr-4 text-white">{row.beatSlug}</td>
                  <td className="py-2 pr-4 text-[#A1A1AA]">{row.previews}</td>
                  <td className="py-2 text-[#A1A1AA]">{row.adds}</td>
                </tr>
              ))}
              {!topActivity.length ? (
                <tr>
                  <td className="py-2 text-[#A1A1AA]" colSpan={3}>
                    No beat store activity recorded in the last 24 hours.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
