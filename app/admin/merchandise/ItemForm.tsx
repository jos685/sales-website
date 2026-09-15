"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export type MerchItemRow = {
  id: string;
  name: string;
  category: "Shirts" | "Caps" | "Hoodies" | "Accessories";
  price: number;
  image_url: string | null;
  description: string | null;
  variants: { label: string; values: string[] }[];
  in_stock: boolean;
  sort_order: number;
};

type Props = {
  initial?: MerchItemRow;
  onClose: () => void;
  onSaved: () => void;
};

const CATEGORIES: MerchItemRow["category"][] = ["Shirts", "Caps", "Hoodies", "Accessories"];

export default function ItemForm({ initial, onClose, onSaved }: Props) {
  const supabase = createClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: initial?.name ?? "",
    category: initial?.category ?? "Shirts",
    price: initial?.price ?? 0,
    description: initial?.description ?? "",
    image_url: initial?.image_url ?? "",
    in_stock: initial?.in_stock ?? true,
    sort_order: initial?.sort_order ?? 0,
  });

  // Variants as a lightweight JSON editor — simple + powerful.
  const [variantsText, setVariantsText] = useState(
    JSON.stringify(initial?.variants ?? [], null, 2),
  );

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  async function onUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("merch")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;

      const { data } = supabase.storage.from("merch").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    let parsedVariants: unknown;
    try {
      parsedVariants = variantsText.trim() ? JSON.parse(variantsText) : [];
      if (!Array.isArray(parsedVariants)) throw new Error("Variants must be an array");
    } catch (err) {
      setSaving(false);
      setError("Variants JSON is invalid — " + (err as Error).message);
      return;
    }

    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      description: form.description.trim() || null,
      image_url: form.image_url || null,
      in_stock: form.in_stock,
      sort_order: Number(form.sort_order) || 0,
      variants: parsedVariants,
    };

    if (!payload.name) {
      setSaving(false);
      setError("Name is required");
      return;
    }
    if (payload.price < 0) {
      setSaving(false);
      setError("Price must be 0 or more");
      return;
    }

    const { error: saveErr } = initial
      ? await supabase.from("merch_items").update(payload).eq("id", initial.id)
      : await supabase.from("merch_items").insert(payload);

    setSaving(false);
    if (saveErr) {
      setError(saveErr.message);
      return;
    }
    onSaved();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSave}
        className="my-8 w-full max-w-2xl space-y-5 rounded-2xl border border-white/10 bg-[#071530] p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black">
            {initial ? "Edit item" : "New item"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/5"
          >
            Cancel
          </button>
        </div>

        {/* Image */}
        <div className="flex items-center gap-4">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0a1f44]">
            {form.image_url ? (
              <Image src={form.image_url} alt="" fill sizes="112px" className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-[10px] text-slate-500">
                No image
              </div>
            )}
          </div>
          <div className="flex-1">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onUpload(f);
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold hover:bg-white/5 disabled:opacity-50"
            >
              {uploading ? "Uploading…" : form.image_url ? "Replace image" : "Upload image"}
            </button>
            <p className="mt-2 text-[11px] text-slate-500">
              Or paste a URL below.
            </p>
            <input
              value={form.image_url}
              onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
              placeholder="https://…"
              className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        {/* Basic fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Name *">
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="input"
            />
          </Field>

          <Field label="Category">
            <select
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value as MerchItemRow["category"] }))
              }
              className="input"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Price (KSh) *">
            <input
              required
              type="number"
              min={0}
              step={1}
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
              className="input"
            />
          </Field>

          <Field label="Sort order">
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
              className="input"
              placeholder="Lower = first"
            />
          </Field>
        </div>

        <Field label="Description">
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={2}
            className="input resize-none"
          />
        </Field>

        <Field label="Variants (JSON)">
          <textarea
            value={variantsText}
            onChange={(e) => setVariantsText(e.target.value)}
            rows={6}
            spellCheck={false}
            className="input resize-y font-mono text-xs"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Example: <code>{`[{"label":"Size","values":["S","M","L","XL"]}]`}</code> — leave as
            <code> [] </code> for no variants.
          </p>
        </Field>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.in_stock}
            onChange={(e) => setForm((f) => ({ ...f, in_stock: e.target.checked }))}
            className="h-4 w-4 accent-accent"
          />
          In stock
        </label>

        {error && (
          <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || uploading}
            className="rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Saving…" : initial ? "Save changes" : "Create item"}
          </button>
        </div>
      </form>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          color: white;
          outline: none;
        }
        .input:focus {
          border-color: var(--accent, #f97316);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      {children}
    </label>
  );
}