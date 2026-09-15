"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import ItemForm, { type MerchItemRow } from "./ItemForm";

export default function AdminMerchandisePage() {
  const supabase = createClient();

  const [items, setItems] = useState<MerchItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MerchItemRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("merch_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    setItems((data ?? []) as MerchItemRow[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  async function onDelete(item: MerchItemRow) {
    if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    setBusyId(item.id);

    // Optional: remove image from storage
    if (item.image_url && item.image_url.includes("/merch/")) {
      const path = item.image_url.split("/merch/").pop();
      if (path) await supabase.storage.from("merch").remove([path]);
    }

    await supabase.from("merch_items").delete().eq("id", item.id);
    setBusyId(null);
    load();
  }

  async function toggleStock(item: MerchItemRow) {
    setBusyId(item.id);
    await supabase
      .from("merch_items")
      .update({ in_stock: !item.in_stock })
      .eq("id", item.id);
    setBusyId(null);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black">Merchandise</h1>
          <p className="mt-1 text-sm text-slate-400">
            Add, edit, and manage your shop. Changes appear on the storefront instantly.
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-white hover:opacity-90"
        >
          + New item
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <p className="text-sm font-semibold">No items yet</p>
          <p className="mt-1 text-xs text-slate-400">
            Click “New item” to add your first product.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="relative aspect-square w-full bg-[#0a1f44]">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : null}
                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {item.category}
                </span>
                {!item.in_stock && (
                  <span className="absolute right-3 top-3 rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    Sold out
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-xs text-slate-400">
                    KSh {Number(item.price).toLocaleString()}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  <button
                    onClick={() => setEditing(item)}
                    className="flex-1 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold hover:bg-white/5"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleStock(item)}
                    disabled={busyId === item.id}
                    className="flex-1 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold hover:bg-white/5 disabled:opacity-50"
                  >
                    {item.in_stock ? "Mark sold out" : "Mark in stock"}
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    disabled={busyId === item.id}
                    className="rounded-lg border border-rose-500/30 px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/10 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {(creating || editing) && (
        <ItemForm
          initial={editing ?? undefined}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSaved={() => {
            setCreating(false);
            setEditing(null);
            load();
          }}
        />
      )}
    </div>
  );
}