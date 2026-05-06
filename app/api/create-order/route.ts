import Razorpay from "razorpay";
import { createAdminClient } from "@/lib/supabase";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  const { items, total } = await request.json();

  if (!items || !Array.isArray(items) || items.length === 0) {
    return Response.json({ error: "No items in cart" }, { status: 400 });
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(total * 100),
    currency: "INR",
    receipt: `swach_${Date.now()}`,
  });

  const supabase = createAdminClient();
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
