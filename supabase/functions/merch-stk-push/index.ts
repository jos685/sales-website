// supabase/functions/merch-stk-push/index.ts
// @ts-nocheck
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MPESA_BASE_URL = "https://api.safaricom.co.ke";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const { orderId, reference, phone, amount } = await req.json();

    if (!orderId || !phone || !amount || amount <= 0) {
      return json({ error: "orderId, phone and amount are required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Sanity: the order must exist and still be pending
    const { data: order, error: orderErr } = await supabase
      .from("merch_orders")
      .select("id, reference, subtotal, payment_status")
      .eq("id", orderId)
      .single();

    if (orderErr || !order) return json({ error: "Order not found" }, 404);
    if (order.payment_status === "paid") {
      return json({ error: "This order has already been paid" }, 409);
    }
    if (Number(order.subtotal) !== Number(amount)) {
      return json({ error: "Amount mismatch" }, 400);
    }

    const normalizedPhone = normalizePhone(phone);
    if (!normalizedPhone) return json({ error: "Invalid phone number" }, 400);

    const token = await getMpesaToken();

    const shortcode   = Deno.env.get("MPESA_SHORTCODE");
    const tillNumber  = Deno.env.get("MPESA_TILL_NUMBER");
    const passkey     = Deno.env.get("MPESA_PASSKEY");
    const callbackUrl = Deno.env.get("MERCH_MPESA_CALLBACK_URL");
    const txType      = Deno.env.get("MPESA_TRANSACTION_TYPE") || "CustomerBuyGoodsOnline";

    const missing = [
      !Deno.env.get("MPESA_CONSUMER_KEY")    && "MPESA_CONSUMER_KEY",
      !Deno.env.get("MPESA_CONSUMER_SECRET") && "MPESA_CONSUMER_SECRET",
      !shortcode  && "MPESA_SHORTCODE",
      !tillNumber && "MPESA_TILL_NUMBER",
      !passkey    && "MPESA_PASSKEY",
      !callbackUrl && "MERCH_MPESA_CALLBACK_URL",
    ].filter(Boolean);
    if (missing.length) return json({ error: `Missing secrets: ${missing.join(", ")}` }, 500);

    const timestamp = getTimestamp();
    const password  = btoa(`${shortcode}${passkey}${timestamp}`);

    const payload = {
      BusinessShortCode: shortcode,
      Password:          password,
      Timestamp:         timestamp,
      TransactionType:   txType,
      Amount:            Math.round(Number(amount)),
      PartyA:            normalizedPhone,
      PartyB:            tillNumber,
      PhoneNumber:       normalizedPhone,
      CallBackURL:       callbackUrl,
      AccountReference:  "QASHUP",                                 
      TransactionDesc:   "Merch Order",                         
    };

    const stkRes = await fetch(`${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const stkData = await stkRes.json();

    console.log("STK payload  →", JSON.stringify(payload));
    console.log("STK response →", JSON.stringify(stkData));

    if (stkData.ResponseCode !== "0") {
      return json({
        error: stkData.ResponseDescription || "STK push failed",
        details: stkData,
      }, 400);
    }

    await supabase
      .from("merch_orders")
      .update({ mpesa_checkout_request_id: stkData.CheckoutRequestID })
      .eq("id", orderId);

    return json({
      success:           true,
      checkoutRequestId: stkData.CheckoutRequestID,
      customerMessage:   stkData.CustomerMessage,
    });
  } catch (err: any) {
    console.error("merch-stk-push error:", err);
    return json({ error: err?.message ?? "Internal error" }, 500);
  }
});

async function getMpesaToken(): Promise<string> {
  const key    = Deno.env.get("MPESA_CONSUMER_KEY")!;
  const secret = Deno.env.get("MPESA_CONSUMER_SECRET")!;
  const creds  = btoa(`${key}:${secret}`);
  const res = await fetch(
    `${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${creds}` } },
  );
  const data = await res.json();
  if (!data.access_token) throw new Error(`M-Pesa token failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

function getTimestamp(): string {
  // Nairobi = UTC+3, format YYYYMMDDHHMMSS
  const now = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    now.getUTCFullYear().toString() +
    p(now.getUTCMonth() + 1) +
    p(now.getUTCDate()) +
    p(now.getUTCHours()) +
    p(now.getUTCMinutes()) +
    p(now.getUTCSeconds())
  );
}

function normalizePhone(phone: string): string | null {
  const c = phone.replace(/\s+/g, "").replace(/-/g, "");
  if (/^254[17]\d{8}$/.test(c)) return c;
  if (/^0[17]\d{8}$/.test(c)) return "254" + c.slice(1);
  if (/^\+254[17]\d{8}$/.test(c)) return c.slice(1);
  return null;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}