// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

export const runtime = "nodejs";

const WHATSAPP_NUMBER = "254783069010";
const CURRENCY = "KSh";

type LineInput = { itemId: string; qty: number; variant: Record<string, string> };

type Body = {
  customer: {
    name: string;
    phone: string;
    location?: string;
    notes?: string;
  };
  lines: LineInput[];
  paymentMethod: "mpesa" | "on_delivery";
};

const formatKsh = (n: number) => `${CURRENCY} ${n.toLocaleString()}`;

function makeReference() {
  const d = new Date();
  const stamp =
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `QM-${stamp}-${rand}`;
}

function normalizePhone(phone: string): string | null {
  const cleaned = phone.replace(/\s+/g, "").replace(/-/g, "");
  if (/^254[17]\d{8}$/.test(cleaned)) return cleaned;
  if (/^0[17]\d{8}$/.test(cleaned)) return "254" + cleaned.slice(1);
  if (/^\+254[17]\d{8}$/.test(cleaned)) return cleaned.slice(1);
  return null;
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { customer, lines, paymentMethod } = body;

  // ── Validate ────────────────────────────────────────────────
  if (!customer?.name?.trim() || !customer?.phone?.trim()) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }
  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }
  if (paymentMethod !== "mpesa" && paymentMethod !== "on_delivery") {
    return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
  }

  const phone = normalizePhone(customer.phone);
  if (paymentMethod === "mpesa" && !phone) {
    return NextResponse.json(
      { error: "Enter a valid Safaricom number (07… / 01… / +254…)" },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();

  // ── Re-price every line from the DB ─────────────────────────
  const itemIds = [...new Set(lines.map((l) => l.itemId))];
  const { data: dbItems, error: itemsErr } = await supabase
    .from("merch_items")
    .select("id,name,price,image_url,in_stock")
    .in("id", itemIds);

  if (itemsErr) {
    console.error("merch_items fetch failed:", itemsErr);
    return NextResponse.json({ error: "Could not verify items" }, { status: 500 });
  }
  if (!dbItems || dbItems.length === 0) {
    return NextResponse.json({ error: "No valid items in cart" }, { status: 400 });
  }

  const itemMap = new Map(dbItems.map((i) => [i.id, i]));

  const resolvedLines = lines
    .map((l) => {
      const dbItem = itemMap.get(l.itemId);
      if (!dbItem || dbItem.in_stock === false) return null;
      const qty = Math.max(1, Math.floor(l.qty));
      return {
        item_id: dbItem.id,
        name: dbItem.name,
        price: dbItem.price as number,
        qty,
        variant: l.variant ?? {},
        image_url: dbItem.image_url,
      };
    })
    .filter(Boolean) as Array<{
      item_id: string;
      name: string;
      price: number;
      qty: number;
      variant: Record<string, string>;
      image_url: string | null;
    }>;

  if (resolvedLines.length === 0) {
    return NextResponse.json({ error: "All items in cart are unavailable" }, { status: 400 });
  }

  const subtotal = resolvedLines.reduce((s, l) => s + l.price * l.qty, 0);
  const reference = makeReference();

  // ── Insert order + line items ───────────────────────────────
  const { data: order, error: orderErr } = await supabase
    .from("merch_orders")
    .insert({
      reference,
      customer_name: customer.name.trim(),
      customer_phone: phone ?? customer.phone.trim(),
      customer_location: customer.location?.trim() || null,
      customer_notes: customer.notes?.trim() || null,
      subtotal,
      payment_method: paymentMethod,
      payment_status: "pending",
      status: "new",
    })
    .select("id, reference, subtotal")
    .single();

  if (orderErr || !order) {
    console.error("Order insert failed:", orderErr);
    return NextResponse.json({ error: "Could not save order" }, { status: 500 });
  }

  const { error: lineErr } = await supabase
    .from("merch_order_items")
    .insert(resolvedLines.map((l) => ({ ...l, order_id: order.id })));

  if (lineErr) {
    console.error("Order items insert failed:", lineErr);
    // Roll back the orphan order
    await supabase.from("merch_orders").delete().eq("id", order.id);
    return NextResponse.json({ error: "Could not save order items" }, { status: 500 });
  }

  // ── WhatsApp summary ────────────────────────────────────────
  const summary = resolvedLines
    .map((l) => {
      const variants = Object.entries(l.variant)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      return `• ${l.qty} × ${l.name}${variants ? ` (${variants})` : ""} — ${formatKsh(l.price * l.qty)}`;
    })
    .join("\n");

  const paymentLine =
    paymentMethod === "mpesa"
      ? `Payment: Paying now via M-Pesa`
      : `Payment: Pay on delivery`;

  const message =
    `Hi QASHUP! Order ${reference}\n\n` +
    `${summary}\n\nSubtotal: ${formatKsh(subtotal)}\n${paymentLine}\n\n` +
    `Name: ${customer.name}\nPhone: ${phone ?? customer.phone}\n` +
    `Location: ${customer.location || "—"}\n` +
    `${customer.notes ? `Notes: ${customer.notes}\n` : ""}`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  // ── Fire-and-forget email notification ──────────────────────
  void sendOrderEmail({
    reference,
    subtotal,
    paymentMethod,
    customer,
    lines: resolvedLines,
  });

  // ── Pay Now → kick off STK push ─────────────────────────────
  if (paymentMethod === "mpesa") {
    const stk = await initiateStkPush({
      orderId: order.id,
      reference,
      phone: phone!,
      amount: subtotal,
    });

    if (!stk.ok) {
      // Order is saved; we just couldn't prompt the phone.
      return NextResponse.json(
        {
          reference,
          subtotal,
          whatsappUrl,
          paymentInitiated: false,
          paymentError: stk.error,
        },
        { status: 200 },
      );
    }

    return NextResponse.json({
      reference,
      subtotal,
      whatsappUrl,
      paymentInitiated: true,
      checkoutRequestId: stk.checkoutRequestId,
      customerMessage: stk.customerMessage,
    });
  }

  // ── Pay on Delivery ─────────────────────────────────────────
  return NextResponse.json({
    reference,
    subtotal,
    whatsappUrl,
    paymentInitiated: false,
  });
}

/* ------------------------------------------------------------------ */
/*  STK push via Supabase edge function                                */
/* ------------------------------------------------------------------ */
async function initiateStkPush(opts: {
  orderId: string;
  reference: string;
  phone: string;
  amount: number;
}): Promise<
  | { ok: true; checkoutRequestId: string; customerMessage?: string }
  | { ok: false; error: string }
> {
  const fnUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/merch-stk-push`;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!fnUrl || !anon) return { ok: false, error: "Supabase not configured" };

  try {
    const res = await fetch(fnUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${anon}`,
      },
      body: JSON.stringify(opts),
    });
    const data = await res.json();
    if (!res.ok || !data?.success) {
      return { ok: false, error: data?.error ?? "STK push failed" };
    }
    return {
      ok: true,
      checkoutRequestId: data.checkoutRequestId,
      customerMessage: data.customerMessage,
    };
  } catch (err) {
    console.error("STK push network error:", err);
    return { ok: false, error: "Could not reach payment service" };
  }
}

/* ------------------------------------------------------------------ */
/*  Email notification                                                 */
/* ------------------------------------------------------------------ */
async function sendOrderEmail(opts: {
  reference: string;
  subtotal: number;
  paymentMethod: "mpesa" | "on_delivery";
  customer: { name: string; phone: string; location?: string; notes?: string };
  lines: Array<{ name: string; qty: number; price: number; variant: Record<string, string> }>;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  const from = process.env.ORDER_FROM_EMAIL || "QASHUP <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.warn("[orders] RESEND_API_KEY / ORDER_NOTIFY_EMAIL not set — skipping email");
    return;
  }

  const resend = new Resend(apiKey);

  const rows = opts.lines
    .map((l) => {
      const variants = Object.entries(l.variant)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee">
          ${l.name}${variants ? `<br><span style="color:#666;font-size:12px">${variants}</span>` : ""}
        </td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center">${l.qty}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">
          ${formatKsh(l.price * l.qty)}
        </td>
      </tr>`;
    })
    .join("");

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:auto">
      <h2 style="margin:0 0 4px">New merch order</h2>
      <p style="color:#666;margin:0 0 20px">
        Ref <strong>${opts.reference}</strong> · ${opts.paymentMethod === "mpesa" ? "Paying now (M-Pesa)" : "Pay on delivery"}
      </p>

      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:8px;overflow:hidden">
        <thead style="background:#fafafa">
          <tr>
            <th style="padding:10px 12px;text-align:left;font-size:13px">Item</th>
            <th style="padding:10px 12px;text-align:center;font-size:13px">Qty</th>
            <th style="padding:10px 12px;text-align:right;font-size:13px">Total</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding:12px;text-align:right;font-weight:600">Subtotal</td>
            <td style="padding:12px;text-align:right;font-weight:700">${formatKsh(opts.subtotal)}</td>
          </tr>
        </tfoot>
      </table>

      <h3 style="margin:24px 0 8px;font-size:14px">Customer</h3>
      <p style="margin:0;line-height:1.6">
        <strong>${opts.customer.name}</strong><br>
        ${opts.customer.phone}<br>
        ${opts.customer.location || "—"}
        ${opts.customer.notes ? `<br><em>${opts.customer.notes}</em>` : ""}
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from,
      to,
      subject: `New merch order ${opts.reference} — ${formatKsh(opts.subtotal)}`,
      html,
    });
  } catch (err) {
    console.error("[orders] email send failed:", err);
  }
}