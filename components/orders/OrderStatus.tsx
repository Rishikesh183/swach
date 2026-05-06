"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type OrderItem = { name: string; quantity: number; price: number };

type Order = {
  id: string;
  order_number: number;
  customer_name: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
};

const STATUS_STEPS = ["confirmed", "preparing", "completed"];

const statusLabels: Record<string, string> = {
  pending: "Pending",
  confirmed: "Order Confirmed",
  preparing: "Preparing",
  completed: "Ready for Pickup",
  collected: "Collected",
  expired: "Expired",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-orange-100 text-orange-700",
  completed: "bg-leaf-100 text-leaf-700",
  collected: "bg-gray-100 text-gray-600",
  expired: "bg-red-100 text-red-600",
};

// ── Single order tracker (used after checkout, or lookup by ID) ──

function SingleOrderView({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single()
      .then(({ data, error: err }) => {
        if (err || !data) {
          setError("Order not found. Please check your Order ID.");
        } else {
          setOrder(data as Order);
        }
        setLoading(false);
      });
  }, [orderId]);

  useEffect(() => {
    if (!order) return;
    const channel = supabase
      .channel(`order-${order.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${order.id}`,
        },
        (payload) => setOrder(payload.new as Order)
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [order?.id]);

  if (loading) return <p className="text-foreground/50 py-8 text-center">Loading...</p>;
  if (error)
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
        {error}
      </div>
    );
  if (!order) return null;

  const stepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-cream-200 overflow-hidden">
      <div className="p-6 border-b border-cream-100">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            {order.order_number && (
              <span className="bg-brand-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                Order #{order.order_number}
              </span>
            )}
            {order.customer_name && (
              <span className="text-sm font-semibold text-brand-900">
                {order.customer_name}
              </span>
            )}
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              statusColors[order.status] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {statusLabels[order.status] ?? order.status}
          </span>
        </div>
        <p className="text-xs text-foreground/40 mt-1">
          {new Date(order.created_at).toLocaleString("en-IN")}
        </p>
      </div>

      {order.status !== "expired" && (
        <div className="p-6 border-b border-cream-100">
          <h3 className="font-semibold text-brand-900 mb-4 text-sm">Order Progress</h3>
          <div className="flex items-center">
            {STATUS_STEPS.map((step, i) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    i <= stepIndex
                      ? "bg-brand-500 text-white"
                      : "bg-cream-200 text-foreground/40"
                  }`}
                >
                  {i < stepIndex ? "✓" : i + 1}
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div
                    className={`h-1 flex-1 transition-colors ${
                      i < stepIndex ? "bg-brand-500" : "bg-cream-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {STATUS_STEPS.map((step) => (
              <span key={step} className="text-xs text-foreground/50 text-center flex-1">
                {statusLabels[step]}
              </span>
            ))}
          </div>
        </div>
      )}

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
          <span className="font-bold text-brand-600 text-lg">₹{order.total_amount}</span>
        </div>
      </div>
    </div>
  );
}

// ── Order history for logged-in users ──

function OrderHistory({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/my-orders?user_id=${userId}`)
      .then((r) => r.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  if (loading) return <p className="text-foreground/50 py-8 text-center">Loading your orders...</p>;

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-foreground/40">
        <span className="text-4xl block mb-3">🍽️</span>
        <p className="font-medium">No orders yet</p>
        <p className="text-sm mt-1">Place your first order from the menu!</p>
        <Link
          href="/menu"
          className="mt-4 inline-block bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-2 rounded-full text-sm transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden"
        >
          <button
            onClick={() => setExpanded(expanded === order.id ? null : order.id)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-cream-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {order.order_number && (
                <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  #{order.order_number}
                </span>
              )}
              <div>
                <p className="text-sm font-semibold text-brand-900">
                  {order.items.map((i) => i.name).join(", ").slice(0, 40)}
                  {order.items.map((i) => i.name).join(", ").length > 40 ? "..." : ""}
                </p>
                <p className="text-xs text-foreground/40 mt-0.5">
                  {new Date(order.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  statusColors[order.status] ?? "bg-gray-100 text-gray-600"
                }`}
              >
                {statusLabels[order.status] ?? order.status}
              </span>
              <span className="font-bold text-brand-600">₹{order.total_amount}</span>
              <span className="text-foreground/30 text-sm">
                {expanded === order.id ? "▲" : "▼"}
              </span>
            </div>
          </button>

          {expanded === order.id && (
            <div className="border-t border-cream-100 px-5 py-4 space-y-2">
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
          )}
        </div>
      ))}
    </div>
  );
}

// ── Guest order lookup ──

function GuestLookup({ defaultId }: { defaultId?: string }) {
  const [inputId, setInputId] = useState(defaultId ?? "");
  const [activeId, setActiveId] = useState(defaultId ?? "");
  const [loading, setLoading] = useState(false);

  function handleTrack() {
    setLoading(true);
    setActiveId(inputId);
    // SingleOrderView handles its own loading, reset after brief delay
    setTimeout(() => setLoading(false), 300);
  }

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Enter your Order ID"
          className="flex-1 border border-cream-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          onKeyDown={(e) => e.key === "Enter" && handleTrack()}
        />
        <button
          onClick={handleTrack}
          disabled={loading || !inputId.trim()}
          className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors disabled:opacity-60"
        >
          Track
        </button>
      </div>
      {activeId && <SingleOrderView orderId={activeId} />}
    </div>
  );
}

// ── Main export ──

export default function OrderStatus({
  orderId,
}: {
  orderId?: string;
}) {
  const [userId, setUserId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, []);

  // Still checking auth
  if (userId === undefined) {
    return <p className="text-foreground/40 py-8 text-center">Loading...</p>;
  }

  // Logged-in: show history. If orderId also provided, show it at top.
  if (userId) {
    return (
      <div className="space-y-8">
        {orderId && (
          <div>
            <h2 className="text-lg font-bold text-brand-900 mb-4">Your Order</h2>
            <SingleOrderView orderId={orderId} />
          </div>
        )}
        <div>
          <h2 className="text-lg font-bold text-brand-900 mb-4">Order History</h2>
          <OrderHistory userId={userId} />
        </div>
      </div>
    );
  }

  // Guest: show lookup (with pre-filled ID if redirected from checkout)
  return <GuestLookup defaultId={orderId} />;
}
