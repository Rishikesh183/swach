import Razorpay from "razorpay";
import { createAdminClient } from "@/lib/supabase";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  const { items, total, customer_name, user_id } = await request.json();

  if (!items || !Array.isArray(items) || items.length === 0) {
    return Response.json({ error: "No items in cart" }, { status: 400 });
  }
  if (!customer_name?.trim()) {
    return Response.json({ error: "Customer name is required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Daily order number: count orders from start of today (UTC)
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .gte("created_at", todayStart.toISOString());

  const order_number = (count ?? 0) + 1;

  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(total * 100),
    currency: "INR",
    receipt: `swach_${Date.now()}`,
  });

  const { data: dbOrder, error } = await supabase
    .from("orders")
    .insert({
      items: items.map((i: { name: string; quantity: number; price: number }) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      total_amount: total,
      status: "pending",
      payment_status: "pending",
      customer_name: customer_name.trim(),
      order_number,
      user_id: user_id || null,
    })
    .select("id")
    .single();

  if (error || !dbOrder) {
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }

  return Response.json({
    razorpayOrderId: razorpayOrder.id,
    dbOrderId: dbOrder.id,
  });
}
