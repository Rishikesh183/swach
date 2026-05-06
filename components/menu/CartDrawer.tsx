"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/cart-store";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, clearCart } =
    useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const cartTotal = total();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={closeCart}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200">
          <h2 className="text-xl font-bold text-brand-900">Your Cart 🛒</h2>
          <button
            onClick={closeCart}
            className="text-foreground/60 hover:text-foreground text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <span className="text-6xl mb-4">🍽️</span>
            <p className="text-foreground/60 font-medium">Your cart is empty</p>
            <p className="text-foreground/40 text-sm mt-1">
              Add items from the menu to get started
            </p>
            <button
              onClick={closeCart}
              className="mt-6 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-cream-50 rounded-xl p-3"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-brand-900 text-sm">{item.name}</p>
                    <p className="text-brand-600 font-bold text-sm">
                      ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-brand-100 hover:bg-brand-200 text-brand-700 font-bold flex items-center justify-center transition-colors"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-semibold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-brand-100 hover:bg-brand-200 text-brand-700 font-bold flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-600 text-lg transition-colors"
                    title="Remove"
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-cream-200 px-5 py-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-foreground/70 font-medium">Subtotal</span>
                <span className="text-2xl font-bold text-brand-700">₹{cartTotal}</span>
              </div>
              <CheckoutButton total={cartTotal} />
              <button
                onClick={clearCart}
                className="w-full text-sm text-foreground/40 hover:text-red-500 transition-colors py-1"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function CheckoutButton({ total }: { total: number }) {
  const { items } = useCartStore();

  async function handleCheckout() {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, total }),
    });

    if (!res.ok) {
      alert("Failed to create order. Please try again.");
      return;
    }

    const { razorpayOrderId, dbOrderId } = await res.json();

    const rzp = new (window as any).Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: total * 100,
      currency: "INR",
      name: "Swach South Indian Cafe",
      description: "Order from Swach",
      order_id: razorpayOrderId,
      handler: async (response: any) => {
        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            dbOrderId,
          }),
        });

        if (verifyRes.ok) {
          useCartStore.getState().clearCart();
          useCartStore.getState().closeCart();
          window.location.href = `/orders?id=${dbOrderId}`;
        } else {
          alert("Payment verification failed. Contact support.");
        }
      },
      prefill: { name: "", email: "", contact: "" },
      theme: { color: "#f97c17" },
    });

    rzp.open();
  }

  return (
    <button
      onClick={handleCheckout}
      className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 rounded-full text-lg transition-colors shadow-sm"
    >
      Proceed to Pay — ₹{total}
    </button>
  );
}
