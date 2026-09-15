"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type OrderRow = {
  id: string;
  reference: string;
  customer_name: string;
  customer_phone: string;
  customer_location: string | null;
  customer_notes: string | null;
  subtotal: number;
  payment_method: "mpesa" | "on_delivery";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  mpesa_receipt: string | null;
  status: "new" | "confirmed" | "shipped" | "delivered" | "cancelled";
  created_at: string;
};

type OrderItemRow = {
  id: string;
  order_id: string;
  name: string;
  price: number;
  qty: number;
  variant: Record<string, string>;
};

const STATUSES: OrderRow["status"][] = [
  "new",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrdersPage() {
  const supabase = createClient();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [items, setItems] = useState<Record<string, OrderItemRow[]>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | OrderRow["status"]>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data: orderRows, error } = await supabase
      .from("merch_orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const ids = (orderRows ?? []).map((o) => o.id);
    let itemRows: OrderItemRow[] = [];
    if (ids.length) {
      const { data: iRows } = await supabase
        .from("merch_order_items")
        .select("*")
        .in("order_id", ids);
      itemRows = (iRows ?? []) as OrderItemRow[];
    }

    const grouped: Record<string, OrderItemRow[]> = {};
    itemRows.forEach((it) => {
      (grouped[it.order_id] ??= []).push(it);
    });

    setOrders((orderRows ?? []) as OrderRow[]);
    setItems(grouped);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();

    // Live updates when new orders arrive or status changes
    const channel = supabase
      .channel("admin-merch-orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "merch_orders" },
        () => load(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "merch_order_items" },
        () => load(),
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [supabase, load]);

  async function setStatus(order: OrderRow, status: OrderRow["status"]) {
    await supabase.from("merch_orders").update({ status }).eq("id", order.id);
    load();
  }

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black">Orders</h1>
        <p className="mt-1 text-sm text-slate-400">
          Live view. New orders appear automatically.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
              filter === s
                ? "bg-accent text-white"
                : "border border-white/15 text-slate-300 hover:bg-white/5"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <p className="text-sm font-semibold">No orders yet</p>
          <p className="mt-1 text-xs text-slate-400">
            Orders placed on the storefront will show up here.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((o) => {
            const isOpen = expanded === o.id;
            const orderItems = items[o.id] ?? [];

            return (
              <li
                key={o.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : o.id)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-white/[0.02]"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-400">{o.reference}</span>
                      <PaymentBadge method={o.payment_method} status={o.payment_status} />
                      <StatusBadge status={o.status} />
                    </div>
                    <p className="mt-1 truncate text-sm font-semibold">
                      {o.customer_name} · {o.customer_phone}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black">
                      KSh {Number(o.subtotal).toLocaleString()}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {new Date(o.created_at).toLocaleString()}
                    </p>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-white/10 px-4 py-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Items
                        </h3>
                        <ul className="space-y-2">
                          {orderItems.map((it) => (
                            <li key={it.id} className="text-sm">
                              <span className="font-semibold">
                                {it.qty}× {it.name}
                              </span>
                              {Object.keys(it.variant).length > 0 && (
                                <span className="ml-2 text-xs text-slate-400">
                                  ({Object.entries(it.variant)
                                    .map(([k, v]) => `${k}: ${v}`)
                                    .join(", ")})
                                </span>
                              )}
                              <span className="ml-2 text-xs text-slate-500">
                                KSh {(it.price * it.qty).toLocaleString()}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Customer
                        </h3>
                        <div className="space-y-1 text-sm">
                          <p>{o.customer_name}</p>
                          <p className="text-slate-400">{o.customer_phone}</p>
                          {o.customer_location && (
                            <p className="text-slate-400">{o.customer_location}</p>
                          )}
                          {o.customer_notes && (
                            <p className="mt-2 rounded-lg bg-white/5 p-2 text-xs italic text-slate-300">
                              {o.customer_notes}
                            </p>
                          )}
                          {o.mpesa_receipt && (
                            <p className="mt-2 text-xs">
                              M-Pesa receipt:{" "}
                              <span className="font-mono text-emerald-400">
                                {o.mpesa_receipt}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                      <span className="text-xs text-slate-400">Set status:</span>
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatus(o, s)}
                          disabled={o.status === s}
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            o.status === s
                              ? "bg-white/10 text-slate-500"
                              : "border border-white/15 text-slate-300 hover:bg-white/5"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: OrderRow["status"] }) {
  const colors: Record<OrderRow["status"], string> = {
    new: "bg-blue-500/15 text-blue-300",
    confirmed: "bg-amber-500/15 text-amber-300",
    shipped: "bg-indigo-500/15 text-indigo-300",
    delivered: "bg-emerald-500/15 text-emerald-300",
    cancelled: "bg-rose-500/15 text-rose-300",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${colors[status]}`}>
      {status}
    </span>
  );
}

function PaymentBadge({
  method,
  status,
}: {
  method: OrderRow["payment_method"];
  status: OrderRow["payment_status"];
}) {
  if (method === "on_delivery") {
    return (
      <span className="rounded-full bg-slate-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-300">
        Pay on delivery
      </span>
    );
  }
  const map: Record<OrderRow["payment_status"], string> = {
    pending: "bg-amber-500/15 text-amber-300",
    paid: "bg-emerald-500/15 text-emerald-300",
    failed: "bg-rose-500/15 text-rose-300",
    refunded: "bg-slate-500/15 text-slate-300",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${map[status]}`}>
      M-Pesa · {status}
    </span>
  );
}