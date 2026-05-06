"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
};

const statusSteps = ["pending", "confirmed", "preparing", "ready", "collected"];

const statusLabels: Record<string, string> = {
  pending: "Order Placed",
  confirmed: "Confirmed",
  preparing: "Preparing",
  ready: "Ready for Pickup",
  collected: "Collected",
  completed: "Completed",
  expired: "Expired",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-orange-100 text-orange-700",
  ready: "bg-leaf-100 text-leaf-700",
  collected: "bg-gray-100 text-gray-600",
  completed: "bg-leaf-100 text-leaf-700",
  expired: "bg-red-100 text-red-600",
};

export default function OrderStatus({ orderId }: { orderId?: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputId, setInputId] = useState(orderId ?? "");
  const [error, setError] = useState("");

  async function fetchOrder(id: string) {
    if (!id) return;
    setLoading(true);
    setError("");
    const { data, error: err } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (err || !data) {
      setError("Order not found. Please check your order ID.");
      setOrder(null);
    } else {
      setOrder(data as Order);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (orderId) fetchOrder(orderId);
  }, [orderId]);

  useEffect(() => {
    if (!order) return;
    const channel = supabase
      .channel(`order-${order.id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders", filter: `id=eq.${order.id}` },
        (payload) => setOrder(payload.new as Order)
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [order?.id]);

  const currentStepIndex = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <div>
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Enter your Order ID"
          className="flex-1 border border-cream-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
        <button
          onClick={() => fetchOrder(inputId)}
          disabled={loading}
          className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors disabled:opacity-60"
        >
          {loading ? "..." : "Track"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm mb-4">
          {error}
        </div>
      )}

      {order && (
        <div className="bg-white rounded-2xl shadow-sm border border-cream-200 overflow-hidden">
          <div className="p-6 border-b border-cream-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-foreground/50 font-mono">{order.id}</span>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[order.status] ?? "bg-gray-100 text-gray-600"}`}
              >
                {statusLabels[order.status] ?? order.status}
              </span>
            </div>
            <p className="text-xs text-foreground/40">
              {new Date(order.created_at).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="p-6 border-b border-cream-100">
            <h3 className="font-semibold text-brand-900 mb-3 text-sm">Order Progress</h3>
            <div className="flex items-center gap-0">
              {statusSteps.map((step, i) => (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      i <= currentStepIndex
                        ? "bg-brand-500 text-white"
                        : "bg-cream-200 text-foreground/40"
                    }`}
                  >
                    {i < currentStepIndex ? "✓" : i + 1}
                  </div>
                  {i < statusSteps.length - 1 && (
                    <div
                      className={`h-1 flex-1 ${
                        i < currentStepIndex ? "bg-brand-500" : "bg-cream-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {statusSteps.map((step) => (
                <span key={step} className="text-xs text-foreground/50 text-center w-8">
                  {statusLabels[step]}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-semibold text-brand-900 mb-3 text-sm">Items Ordered</h3>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-foreground/70">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold text-brand-700">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-cream-100 mt-3 pt-3 flex justify-between">
              <span className="font-bold text-brand-900">Total</span>
              <span className="font-bold text-brand-600 text-lg">
                ₹{order.total_amount}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
