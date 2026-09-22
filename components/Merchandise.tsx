"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const CURRENCY = "KSh";

type Variant = { label: string; values: string[] };

type Item = {
  id: string;
  name: string;
  category: "Shirts" | "Caps" | "Hoodies" | "Accessories";
  price: number;
  image: string;
  description?: string;
  variants?: Variant[];
  inStock?: boolean;
};

/** Shape of the raw row returned by Supabase — fixes implicit-any errors. */
type MerchRow = {
  id: string;
  name: string;
  category: Item["category"];
  price: number;
  image_url: string | null;
  description: string | null;
  variants: Variant[] | null;
  in_stock: boolean;
};

type CartLine = {
  key: string;
  itemId: string;
  name: string;
  price: number;
  image: string;
  variant: Record<string, string>;
  qty: number;
};

type PaymentMethod = "mpesa" | "on_delivery";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const variantSignature = (v: Record<string, string>) =>
  Object.entries(v)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, val]) => `${k}:${val}`)
    .join("|");

const formatPrice = (n: number) => `${CURRENCY} ${n.toLocaleString()}`;

const CART_KEY = "qashup-merch-cart-v1";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Merchandise() {
  const supabase = useMemo(() => createClient(), []);

  const [items, setItems] = useState<Item[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<Record<string, Record<string, string>>>({});
  const [toast, setToast] = useState<string | null>(null);

  const [customer, setCustomer] = useState({ name: "", phone: "", location: "", notes: "" });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [submitting, setSubmitting] = useState(false);
  const [awaitingPayment, setAwaitingPayment] = useState<{ reference: string } | null>(null);

/* ---- load catalogue ---- */
   const loadItems = useCallback(async () => {
    const { data, error } = await supabase
    .from("merch_items")
    .select("id,name,category,price,image_url,description,variants,in_stock")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

    if (error) {
    setLoadError("Could not load merch right now. Please refresh.");
    setLoadingItems(false);
    return;
    }

    const rows = (data ?? []) as MerchRow[];
    setItems(rows.map((row) => ({
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price,
    image: row.image_url ?? "",
    description: row.description ?? undefined,
    variants: row.variants ?? [],
    inStock: row.in_stock,
  })));
  setLoadingItems(false);
}, [supabase]);

useEffect(() => {
  loadItems();
}, [loadItems]);

/* ---- live updates ---- */
useEffect(() => {
  const channel = supabase
    .channel("storefront-merch-items")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "merch_items" },
      () => loadItems(),
    )
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, [supabase, loadItems]);

  /* ---- hydrate from localStorage ---- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setCart(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  /* ---- re-price / prune cart once catalogue is known ---- */
  useEffect(() => {
    if (loadingItems || items.length === 0) return;
    setCart((prev) =>
      prev.flatMap((line) => {
        const item = items.find((i) => i.id === line.itemId);
        if (!item || item.inStock === false) return [];
        return [{ ...line, name: item.name, price: item.price, image: item.image }];
      }),
    );
  }, [loadingItems, items]);

  /* ---- persist ---- */
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  /* ---- lock scroll when cart open ---- */
  useEffect(() => {
    if (!cartOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [cartOpen]);

  /* ---- escape closes ---- */
  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen]);

  const totalCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((s, l) => s + l.qty * l.price, 0), [cart]);

  const getSelection = (item: Item): Record<string, string> => {
    if (selected[item.id]) return selected[item.id];
    const init: Record<string, string> = {};
    item.variants?.forEach((v) => {
      init[v.label] = v.values[0];
    });
    return init;
  };

  const setVariant = (itemId: string, label: string, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [itemId]: { ...(prev[itemId] ?? {}), [label]: value },
    }));
  };

  const addToCart = (item: Item) => {
    const variant = getSelection(item);
    const sig = variantSignature(variant);
    const key = `${item.id}::${sig}`;

    setCart((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
      }
      return [
        ...prev,
        {
          key,
          itemId: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          variant,
          qty: 1,
        },
      ];
    });

    setToast(`${item.name} added to cart`);
    window.setTimeout(() => setToast(null), 2200);
  };

  const changeQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) => (l.key === key ? { ...l, qty: Math.max(1, l.qty + delta) } : l))
        .filter((l) => l.qty > 0),
    );
  };

  const removeLine = (key: string) => setCart((prev) => prev.filter((l) => l.key !== key));

  /* ---- checkout: save order + (if mpesa) trigger STK ---- */
  const placeOrder = async () => {
    if (cart.length === 0) return;

    if (!customer.name.trim() || !customer.phone.trim()) {
      setToast("Please add your name and phone number");
      window.setTimeout(() => setToast(null), 2500);
      return;
    }

    if (paymentMethod === "mpesa" && !/^(\+?254|0)[17]\d{8}$/.test(customer.phone.replace(/\s+/g, ""))) {
      setToast("Enter a valid Safaricom number for M-Pesa");
      window.setTimeout(() => setToast(null), 2500);
      return;
    }

    setSubmitting(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 30000); // 30s
    try {
      const res = await fetch("/api/orders", {
        signal: controller.signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          paymentMethod,
          lines: cart.map((l) => ({ itemId: l.itemId, qty: l.qty, variant: l.variant })),
        }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) {
        throw new Error(
          data?.error || `Could not place order (HTTP ${res.status})`,
        );
      }

      // Clear cart + form immediately
      setCart([]);
      setCartOpen(false);
      setCustomer({ name: "", phone: "", location: "", notes: "" });

      // Open WhatsApp confirmation in a new tab
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      }

      // Show "check your phone" modal if STK was triggered
      if (paymentMethod === "mpesa" && data.paymentInitiated) {
        setAwaitingPayment({ reference: data.reference });
      } else if (paymentMethod === "mpesa" && !data.paymentInitiated) {
        setToast(data.paymentError || "Order saved — confirm and pay on WhatsApp");
        window.setTimeout(() => setToast(null), 5000);
      } else {
        setToast(`Order ${data.reference} placed — confirm on WhatsApp`);
        window.setTimeout(() => setToast(null), 5000);
      }
    } catch (err) {
      setToast(err instanceof Error ? err.message : "Something went wrong");
      window.setTimeout(() => setToast(null), 3500);
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };

  /* ------------------------------------------------------------------ */

  return (
    <section id="merchandise" className="relative bg-[#071530] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Merchandise
            </p>
            <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              Wear the brand.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
              Official QASHUP gear — shipped across Kenya &amp; East Africa. Order here and
              we&apos;ll confirm on WhatsApp.
            </p>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex shrink-0 items-center gap-2 self-start rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:self-auto"
            aria-label="Open cart"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M2.5 3h2.2l2.3 12.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21.5 7H5.2" />
            </svg>
            Cart
            {totalCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-white">
                {totalCount}
              </span>
            )}
          </button>
        </div>

        {/* States */}
        {loadError && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center text-sm text-rose-200">
            {loadError}
          </div>
        )}

        {!loadError && loadingItems && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="aspect-square w-full bg-white/5" />
                <div className="space-y-3 p-4">
                  <div className="h-3 w-3/4 rounded bg-white/10" />
                  <div className="h-3 w-1/2 rounded bg-white/10" />
                  <div className="h-9 w-full rounded-xl bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loadError && !loadingItems && items.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <p className="text-sm font-semibold text-white">No merch listed yet</p>
            <p className="mt-1 text-xs text-slate-400">Check back soon.</p>
          </div>
        )}

        {/* Grid */}
        {!loadError && !loadingItems && items.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => {
              const sel = getSelection(item);
              const out = item.inStock === false;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-[#0a1f44]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                    <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                      {item.category}
                    </span>
                    {out && (
                      <span className="absolute right-3 top-3 rounded-full bg-rose-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        Sold out
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-sm font-bold leading-snug text-white sm:text-base">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                        {item.description}
                      </p>
                    )}

                    <p className="mt-3 text-lg font-black text-white">
                      {formatPrice(item.price)}
                    </p>

                    {item.variants?.map((v) => (
                      <div key={v.label} className="mt-3">
                        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          {v.label}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {v.values.map((val) => {
                            const isActive = sel[v.label] === val;
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => setVariant(item.id, v.label, val)}
                                className={`min-w-9 rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors ${
                                  isActive
                                    ? "border-accent bg-accent text-white"
                                    : "border-white/15 text-slate-300 hover:border-white/30 hover:text-white"
                                }`}
                              >
                                {val}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      disabled={out}
                      onClick={() => addToCart(item)}
                      className="mt-4 w-full rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white shadow-md shadow-accent/25 transition-all hover:opacity-90 hover:shadow-lg hover:shadow-accent/40 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-500 disabled:shadow-none"
                    >
                      {out ? "Sold out" : "Add to cart"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* --------------------------- Cart drawer --------------------------- */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              key="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              key="cart-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#071530] shadow-2xl"
              role="dialog"
              aria-label="Shopping cart"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <h3 className="text-base font-bold text-white">Your cart</h3>
                  <p className="text-xs text-slate-400">
                    {totalCount} item{totalCount === 1 ? "" : "s"}
                  </p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  aria-label="Close cart"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                    strokeLinecap="round"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-6 w-6 text-slate-500"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="20" r="1.5" />
                        <circle cx="18" cy="20" r="1.5" />
                        <path d="M2.5 3h2.2l2.3 12.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21.5 7H5.2" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-white">Your cart is empty</p>
                    <p className="mt-1 text-xs text-slate-400">Add some merch to get started.</p>
                  </div>
                ) : (
                  <ul className="flex flex-col gap-4">
                    <AnimatePresence initial={false}>
                      {cart.map((line) => (
                        <motion.li
                          key={line.key}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40, transition: { duration: 0.18 } }}
                          className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                        >
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#0a1f44]">
                            {line.image ? (
                              <Image
                                src={line.image}
                                alt={line.name}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            ) : null}
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-semibold leading-snug text-white">
                                {line.name}
                              </p>
                              <button
                                onClick={() => removeLine(line.key)}
                                aria-label={`Remove ${line.name}`}
                                className="shrink-0 text-slate-500 transition-colors hover:text-rose-400"
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="h-4 w-4"
                                  strokeLinecap="round"
                                >
                                  <path d="M6 6l12 12M18 6L6 18" />
                                </svg>
                              </button>
                            </div>
                            {Object.keys(line.variant).length > 0 && (
                              <p className="mt-0.5 text-[11px] text-slate-400">
                                {Object.entries(line.variant)
                                  .map(([k, v]) => `${k}: ${v}`)
                                  .join(" · ")}
                              </p>
                            )}
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="flex items-center rounded-lg border border-white/15">
                                <button
                                  onClick={() => changeQty(line.key, -1)}
                                  className="flex h-7 w-7 items-center justify-center text-slate-300 transition-colors hover:text-white"
                                  aria-label="Decrease quantity"
                                >
                                  −
                                </button>
                                <span className="w-7 text-center text-sm font-bold text-white">
                                  {line.qty}
                                </span>
                                <button
                                  onClick={() => changeQty(line.key, 1)}
                                  className="flex h-7 w-7 items-center justify-center text-slate-300 transition-colors hover:text-white"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>
                              <p className="text-sm font-bold text-white">
                                {formatPrice(line.price * line.qty)}
                              </p>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-white/10 bg-[#0a1f44] px-5 py-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-slate-300">Subtotal</span>
                    <span className="text-lg font-black text-white">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  {/* Payment method */}
                  <div className="mb-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("mpesa")}
                      disabled={submitting}
                      className={`rounded-xl border px-3 py-2.5 text-left text-xs transition-colors ${
                        paymentMethod === "mpesa"
                          ? "border-accent bg-accent/10 text-white"
                          : "border-white/15 text-slate-300 hover:border-white/30"
                      }`}
                    >
                      <div className="font-bold">Pay now</div>
                      <div className="text-[11px] text-slate-400">M-Pesa prompt</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("on_delivery")}
                      disabled={submitting}
                      className={`rounded-xl border px-3 py-2.5 text-left text-xs transition-colors ${
                        paymentMethod === "on_delivery"
                          ? "border-accent bg-accent/10 text-white"
                          : "border-white/15 text-slate-300 hover:border-white/30"
                      }`}
                    >
                      <div className="font-bold">Pay on delivery</div>
                      <div className="text-[11px] text-slate-400">Cash / M-Pesa</div>
                    </button>
                  </div>

                  
                                    {/* Delivery details */}
                  <div className="mb-3 space-y-2">
                    <input
                      value={customer.name}
                      onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                      placeholder="Your name *"
                      disabled={submitting}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none disabled:opacity-60"
                    />
                    <input
                      value={customer.phone}
                      onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                      placeholder={
                        paymentMethod === "mpesa" ? "M-Pesa phone (07…) *" : "Phone number *"
                      }
                      inputMode="tel"
                      disabled={submitting}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none disabled:opacity-60"
                    />
                    <input
                      value={customer.location}
                      onChange={(e) => setCustomer((c) => ({ ...c, location: e.target.value }))}
                      placeholder="Delivery location"
                      disabled={submitting}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none disabled:opacity-60"
                    />
                    <input
                      value={customer.notes}
                      onChange={(e) => setCustomer((c) => ({ ...c, notes: e.target.value }))}
                      placeholder="Notes (optional)"
                      disabled={submitting}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none disabled:opacity-60"
                    />
                  </div>

                  <p className="mb-3 text-[11px] text-slate-400">
                    {paymentMethod === "mpesa"
                      ? "You'll receive an M-Pesa prompt on your phone to approve payment."
                      : "Delivery fee confirmed on WhatsApp. Pay when your order arrives."}
                  </p>

                  <button
                    type="button"
                    onClick={placeOrder}
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-accent/30 transition-all hover:opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting && (
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="opacity-25"
                        />
                        <path
                          d="M4 12a8 8 0 0 1 8-8"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          className="opacity-90"
                        />
                      </svg>
                    )}
                    {submitting
                      ? paymentMethod === "mpesa"
                        ? "Sending M-Pesa prompt…"
                        : "Placing order…"
                      : paymentMethod === "mpesa"
                        ? `Pay ${formatPrice(totalPrice)} with M-Pesa`
                        : "Place order — Pay on delivery"}
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
  {totalCount > 0 && !cartOpen && (
    <motion.button
    key="floating-cart"
    type="button"
    onClick={() => setCartOpen(true)}
    aria-label={`Open cart, ${totalCount} item${totalCount === 1 ? "" : "s"}`}
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.9 }}
    transition={{ type: "spring", stiffness: 320, damping: 28 }}
    className="fixed bottom-[72px] right-4 z-[75] flex h-11 items-center gap-2 rounded-full bg-accent px-3.5 text-sm font-bold text-white shadow-xl shadow-accent/40 transition-transform hover:scale-105 active:scale-95 sm:bottom-[96px] sm:right-6 sm:h-14 sm:gap-3 sm:px-5 sm:text-base sm:shadow-2xl"
  >
    <span className="relative">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5 sm:h-6 sm:w-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M2.5 3h2.2l2.3 12.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21.5 7H5.2" />
      </svg>
      <motion.span
        key={totalCount}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-black text-accent shadow-md sm:-right-2 sm:-top-2 sm:h-5 sm:min-w-5 sm:px-1.5 sm:text-[11px]"
      >
        {totalCount}
      </motion.span>
    </span>
    <span className="text-xs sm:text-sm">{formatPrice(totalPrice)}</span>
  </motion.button>
  )}
</AnimatePresence>

      {/* --------------------------- Awaiting payment modal --------------------------- */}
      <AnimatePresence>
        {awaitingPayment && (
          <motion.div
            key="awaiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur"
            onClick={() => setAwaitingPayment(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-sm rounded-2xl border border-white/10 bg-[#071530] p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-7 w-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="6" y="2" width="12" height="20" rx="3" />
                  <path d="M11 18h2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Check your phone</h3>
              <p className="mt-2 text-sm text-slate-300">
                We sent an M-Pesa prompt to your phone. Enter your PIN to complete payment for{" "}
                <strong>{awaitingPayment.reference}</strong>.
              </p>
              <button
                onClick={() => setAwaitingPayment(null)}
                className="mt-5 w-full rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white hover:opacity-90"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --------------------------- Toast --------------------------- */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-white/10 bg-[#0a1f44] px-4 py-2.5 text-sm font-medium text-white shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}