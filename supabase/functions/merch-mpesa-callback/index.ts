// supabase/functions/merch-mpesa-callback/index.ts
// @ts-nocheck
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@3";

serve(async (req) => {
  try {
    const body = await req.json();
    const stk = body?.Body?.stkCallback;
    if (!stk) return json({ ok: true });

    const {
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = stk;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: order } = await supabase
      .from("merch_orders")
      .select("*")
      .eq("mpesa_checkout_request_id", CheckoutRequestID)
      .maybeSingle();

    if (!order) {
      console.warn("No merch order for CheckoutRequestID", CheckoutRequestID);
      return json({ ok: true });
    }

    if (ResultCode === 0) {
      const receipt = CallbackMetadata?.Item?.find((i: any) => i.Name === "MpesaReceiptNumber")?.Value;
      await supabase
        .from("merch_orders")
        .update({
          payment_status: "paid",
          mpesa_receipt: receipt ?? null,
          status: "confirmed",
        })
        .eq("id", order.id);

      void sendPaidEmail({
        reference: order.reference,
        receipt: receipt ?? "—",
        subtotal: order.subtotal,
        name: order.customer_name,
      });
    } else {
      await supabase
        .from("merch_orders")
        .update({ payment_status: "failed" })
        .eq("id", order.id);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("merch-mpesa-callback error:", err);
    return json({ ok: true });
  }
});

async function sendPaidEmail(opts: {
  reference: string; receipt: string; subtotal: number; name: string;
}) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const to     = Deno.env.get("ORDER_NOTIFY_EMAIL");
  const from   = Deno.env.get("ORDER_FROM_EMAIL") || "QASHUP <onboarding@resend.dev>";
  if (!apiKey || !to) return;

  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from, to,
      subject: `Payment received — ${opts.reference}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:520px">
          <h2>M-Pesa payment received ✅</h2>
          <p>Order <strong>${opts.reference}</strong> from ${opts.name} has been paid.</p>
          <p>Receipt: <strong>${opts.receipt}</strong></p>
          <p>Amount: <strong>KSh ${Number(opts.subtotal).toLocaleString()}</strong></p>
        </div>`,
    });
  } catch (err) {
    console.error("paid email failed:", err);
  }
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}