import type { Metadata } from "next";
import OrderStatus from "@/components/orders/OrderStatus";

export const metadata: Metadata = {
  title: "My Order | Swach South Indian Cafe",
  description: "Track your order status at Swach South Indian Cafe.",
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-900 mb-8">Order Status</h1>
      <OrderStatus orderId={id} />
    </main>
  );
}
