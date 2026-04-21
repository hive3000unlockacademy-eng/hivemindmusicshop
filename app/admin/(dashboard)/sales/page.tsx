import { createClient } from "@/lib/supabase/server";
import { formatUsd } from "@/lib/format";

type OrderItem = {
  id: string;
  quantity: number | null;
  title_snapshot: string | null;
  tier_name_snapshot: string | null;
  unit_price_cents: number;
};

export default async function SalesPage() {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      customer_email,
      payment_status,
      fulfillment_status,
      total_cents,
      currency,
      created_at,
      order_items (
        id,
        quantity,
        title_snapshot,
        tier_name_snapshot,
        unit_price_cents
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="text-red-400/90">{error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-beats-hero)] text-2xl font-semibold text-white">
          Sales
        </h1>
        <p className="mt-2 text-[#A1A1AA]">
          All completed PayPal captures stored in Supabase.
        </p>
      </div>

      {!orders?.length ? (
        <p className="text-sm text-[#A1A1AA]">No sales recorded yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => {
            const items = (order.order_items ?? []) as unknown as OrderItem[];
            return (
              <li key={order.id} className="rounded-xl border border-white/10 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-white">{order.customer_email}</p>
                    <p className="text-sm text-[#A1A1AA]">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">
                      {formatUsd(order.total_cents ?? 0)}
                    </p>
                    <p className="text-sm text-[#A1A1AA]">
                      {order.payment_status} · {order.fulfillment_status}
                    </p>
                  </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead className="text-[#A1A1AA]">
                      <tr>
                        <th className="pb-2 pr-4 font-medium">Beat</th>
                        <th className="pb-2 pr-4 font-medium">License</th>
                        <th className="pb-2 pr-4 font-medium">Qty</th>
                        <th className="pb-2 font-medium">Unit price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="py-2 pr-4 text-white">
                            {item.title_snapshot ?? "Beat"}
                          </td>
                          <td className="py-2 pr-4 text-[#A1A1AA]">
                            {item.tier_name_snapshot ?? "License"}
                          </td>
                          <td className="py-2 pr-4 text-[#A1A1AA]">
                            {item.quantity ?? 1}
                          </td>
                          <td className="py-2 text-[#A1A1AA]">
                            {formatUsd(item.unit_price_cents)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
