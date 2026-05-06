import { verifyRazorpaySignature } from "@/lib/razorpay";
import { createAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } =
    await request.json();

  const isValid = verifyRazorpaySignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );

  if (!isValid) {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("orders")
    .update({ payment_status: "paid", status: "confirmed" })
    .eq("id", dbOrderId);

  if (error) {
    return Response.json({ error: "Failed to update order" }, { status: 500 });
  }

  return Response.json({ success: true });
}
