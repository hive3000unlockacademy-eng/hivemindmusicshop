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

  const [beats, orders, recentBeatsRes, recentOrdersRes, orderTotalsRes] =
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
    ]);

  const totalRevenue = formatUsd(
    (orderTotalsRes.data ?? []).reduce(
      (sum, row) => sum + (typeof row.total_cents === "number" ? row.total_cents : 0),
      0,
    ),
  );

  const cards = [
    { label: "Live beats", value: String(beats) },
    { label: "Sales", value: String(orders) },
    { label: "Revenue", value: totalRevenue },
    { label: "License options", value: "4 per beat" },
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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
    </div>
  );
}
