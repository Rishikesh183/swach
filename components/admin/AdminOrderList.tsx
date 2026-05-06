"use client";

import { useEffect, useRef, useState, startTransition } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
};

const allStatuses = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "collected",
  "completed",
  "expired",
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  preparing: "bg-orange-100 text-orange-700 border-orange-200",
  ready: "bg-leaf-100 text-leaf-700 border-leaf-200",
  collected: "bg-gray-100 text-gray-600 border-gray-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  expired: "bg-red-100 text-red-600 border-red-200",
};

export default function AdminOrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (mountedRef.current) {
          startTransition(() => {
            setOrders((data as Order[]) ?? []);
            setLoading(false);
          });
        }
      });

    const channel = supabase
      .channel("admin-orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          startTransition(() => {
            setOrders((prev) => [payload.new as Order, ...prev]);
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          startTransition(() => {
            setOrders((prev) =>
              prev.map((o) =>
                o.id === (payload.new as Order).id ? (payload.new as Order) : o
              )
            );
          });
        }
      )
      .subscribe();

    return () => {
      mountedRef.current = false;
      supabase.removeChannel(channel);
    };
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-foreground/50">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-foreground/50">
        No orders yet. Waiting for customers...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-cream-100">
            <div>
              <p className="font-mono text-xs text-foreground/50">{order.id}</p>
              <p className="text-xs text-foreground/40">
                {new Date(order.created_at).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[order.payment_status] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}
              >
                💳 {order.payment_status}
              </span>
              <span className="font-bold text-brand-700 text-lg">
                ₹{order.total_amount}
              </span>
            </div>
          </div>

          <div className="px-5 py-3 flex flex-wrap gap-1.5">
            {order.items.map((item, i) => (
              <span
                key={i}
                className="text-xs bg-cream-50 border border-cream-200 px-2 py-0.5 rounded-full text-foreground/70"
              >
                {item.name} ×{item.quantity}
              </span>
            ))}
          </div>

          <div className="px-5 py-3 bg-cream-50 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-medium text-foreground/60 mr-1">
              Update status:
            </span>
            {allStatuses.map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(order.id, s)}
                className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
                  order.status === s
                    ? (statusColors[s] ??
                        "bg-gray-100 text-gray-600 border-gray-200") +
                      " ring-2 ring-offset-1 ring-brand-400"
                    : "bg-white border-cream-200 text-foreground/60 hover:border-brand-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
