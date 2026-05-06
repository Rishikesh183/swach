"use client";

import { useEffect, useRef, useState, startTransition } from "react";
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

type CustomerGroup = {
  customer_name: string;
  orders: Order[];
};

const STATUSES = ["preparing", "completed", "collected"] as const;
type Status = (typeof STATUSES)[number];

const statusColors: Record<string, string> = {
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  preparing: "bg-orange-100 text-orange-700 border-orange-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  collected: "bg-gray-100 text-gray-600 border-gray-200",
};

const statusLabels: Record<string, string> = {
  confirmed: "Confirmed",
  preparing: "Preparing",
  completed: "Completed",
  collected: "Collected",
};

function groupByCustomer(orders: Order[]): CustomerGroup[] {
  const map = new Map<string, Order[]>();
  for (const order of orders) {
    const key = order.customer_name ?? "Unknown";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(order);
  }
  return Array.from(map.entries()).map(([customer_name, orders]) => ({
    customer_name,
    orders,
  }));
}

export default function AdminOrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        if (mountedRef.current) {
          startTransition(() => {
            setOrders(Array.isArray(data) ? data : []);
            setLoading(false);
          });
        }
      })
      .catch(() => {
        if (mountedRef.current) setLoading(false);
      });

    const channel = supabase
      .channel("admin-orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          const newOrder = payload.new as Order;
          // Only add when paid (payment_status update comes via UPDATE event)
          if (newOrder.payment_status === "paid") {
            startTransition(() => {
              setOrders((prev) => [newOrder, ...prev]);
            });
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          const updated = payload.new as Order;
          startTransition(() => {
            setOrders((prev) => {
              // If newly paid, add to list
              if (updated.payment_status === "paid") {
                const exists = prev.some((o) => o.id === updated.id);
                if (!exists) return [updated, ...prev];
                return prev.map((o) => (o.id === updated.id ? updated : o));
              }
              // If unpaid/failed, remove from list
              return prev.filter((o) => o.id !== updated.id);
            });
          });
        }
      )
      .subscribe();

    return () => {
      mountedRef.current = false;
      supabase.removeChannel(channel);
    };
  }, []);

  async function updateStatus(id: string, status: Status) {
    setUpdatingId(id);
    await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setUpdatingId(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-foreground/50">
        Loading orders...
      </div>
    );
  }

  const activeOrders = orders.filter(
    (o) => o.status !== "collected" && o.status !== "completed"
  );
  const doneOrders = orders.filter(
    (o) => o.status === "collected" || o.status === "completed"
  );

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-foreground/50">
        No paid orders yet. Waiting for customers...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {activeOrders.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-brand-900 mb-4">
            Active Orders ({activeOrders.length})
          </h2>
          <CustomerGroups
            groups={groupByCustomer(activeOrders)}
            updatingId={updatingId}
            onStatusUpdate={updateStatus}
          />
        </section>
      )}

      {doneOrders.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-foreground/40 mb-4">
            Completed / Collected ({doneOrders.length})
          </h2>
          <CustomerGroups
            groups={groupByCustomer(doneOrders)}
            updatingId={updatingId}
            onStatusUpdate={updateStatus}
            muted
          />
        </section>
      )}
    </div>
  );
}

function CustomerGroups({
  groups,
  updatingId,
  onStatusUpdate,
  muted = false,
}: {
  groups: CustomerGroup[];
  updatingId: string | null;
  onStatusUpdate: (id: string, status: Status) => void;
  muted?: boolean;
}) {
  return (
    <div className="space-y-6">
      {groups.map(({ customer_name, orders }) => (
        <div
          key={customer_name}
          className={`rounded-2xl border overflow-hidden ${
            muted ? "border-cream-100 opacity-60" : "border-cream-200 shadow-sm"
          }`}
        >
          <div className="px-5 py-3 bg-cream-50 border-b border-cream-200 flex items-center gap-3">
            <span className="text-lg">👤</span>
            <span className="font-bold text-brand-900">{customer_name}</span>
            <span className="text-xs text-foreground/40 font-medium">
              {orders.length} order{orders.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="divide-y divide-cream-100">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isUpdating={updatingId === order.id}
                onStatusUpdate={onStatusUpdate}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function OrderCard({
  order,
  isUpdating,
  onStatusUpdate,
}: {
  order: Order;
  isUpdating: boolean;
  onStatusUpdate: (id: string, status: Status) => void;
}) {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between px-5 py-3 border-b border-cream-50">
        <div className="flex items-center gap-3">
          <span className="bg-brand-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            #{order.order_number ?? "—"}
          </span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
              statusColors[order.status] ?? "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            {statusLabels[order.status] ?? order.status}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-foreground/40">
            {new Date(order.created_at).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="font-bold text-brand-700">₹{order.total_amount}</span>
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
        <span className="text-xs font-medium text-foreground/50 mr-1">
          {isUpdating ? "Updating..." : "Set status:"}
        </span>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => onStatusUpdate(order.id, s)}
            disabled={isUpdating}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors capitalize disabled:opacity-50 ${
              order.status === s
                ? (statusColors[s] ?? "bg-gray-100 text-gray-600 border-gray-200") +
                  " ring-2 ring-offset-1 ring-brand-400"
                : "bg-white border-cream-200 text-foreground/60 hover:border-brand-300 hover:text-brand-600"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
