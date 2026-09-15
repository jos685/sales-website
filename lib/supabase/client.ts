// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createBrowserClient(url, key);
}

// ── Types matching the merch schema ─────────────────────────
export type MerchCategory = "Shirts" | "Caps" | "Hoodies" | "Accessories";

export type MerchVariant = { label: string; values: string[] };

export interface MerchItem {
  id: string;
  name: string;
  category: MerchCategory;
  price: number;
  image_url: string | null;
  description: string | null;
  variants: MerchVariant[];
  in_stock: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface MerchOrder {
  id: string;
  reference: string;
  customer_name: string;
  customer_phone: string;
  customer_location: string | null;
  customer_notes: string | null;
  subtotal: number;
  payment_method: "mpesa" | "on_delivery";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  mpesa_checkout_request_id: string | null;
  mpesa_receipt: string | null;
  status: "new" | "confirmed" | "shipped" | "delivered" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface MerchOrderItem {
  id: string;
  order_id: string;
  item_id: string | null;
  name: string;
  price: number;
  qty: number;
  variant: Record<string, string>;
  image_url: string | null;
}