"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { supabase } from "@/lib/supabase";

type CheckoutStep = "cart" | "details";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, clearCart } =
    useCartStore();
  const [step, setStep] = useState<CheckoutStep>("cart");

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  // Reset to cart step when drawer closes
  useEffect(() => {
    if (!isOpen) setStep("cart");
  }, [isOpen]);

  const cartTotal = total();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={closeCart} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200">
          <h2 className="text-xl font-bold text-brand-900">
            {step === "cart" ? "Your Cart 🛒" : "Order Details"}
          </h2>
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
        ) : step === "cart" ? (
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
              <button
                onClick={() => setStep("details")}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 rounded-full text-lg transition-colors shadow-sm"
              >
                Continue — ₹{cartTotal}
              </button>
              <button
                onClick={clearCart}
                className="w-full text-sm text-foreground/40 hover:text-red-500 transition-colors py-1"
              >
                Clear cart
              </button>
            </div>
          </>
        ) : (
          <DetailsStep
            total={cartTotal}
            onBack={() => setStep("cart")}
          />
        )}
      </div>
    </>
  );
}

function DetailsStep({ total, onBack }: { total: number; onBack: () => void }) {
  const { items, clearCart, closeCart } = useCartStore();
  const [customerName, setCustomerName] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id);
        setUserEmail(data.user.email ?? null);
        const fullName = data.user.user_metadata?.full_name;
        if (fullName) setCustomerName(fullName);
      }
    });
  }, []);

  async function handlePay() {
    if (!customerName.trim()) {
      setError("Please enter your name");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        total,
        customer_name: customerName.trim(),
        user_id: userId,
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Failed to create order. Please try again.");
      setLoading(false);
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
          clearCart();
          closeCart();
          window.location.href = `/orders?id=${dbOrderId}`;
        } else {
          setError("Payment verification failed. Contact support.");
          setLoading(false);
        }
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
      prefill: {
        name: customerName,
        email: userEmail ?? "",
        contact: "",
      },
      theme: { color: "#f97c17" },
    });

    rzp.open();
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-brand-900 mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border border-cream-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            autoFocus
          />
        </div>

        {!userId && (
          <div className="bg-cream-50 rounded-xl p-4 border border-cream-200">
            <p className="text-sm text-foreground/60 font-medium">
              Want to track past orders?
            </p>
            <p className="text-xs text-foreground/40 mt-0.5 mb-3">
              Sign in to save order history to your account.
            </p>
            <Link
              href="/auth"
              onClick={closeCart}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 underline-offset-2 hover:underline"
            >
              Sign in / Create account →
            </Link>
          </div>
        )}

        {userId && (
          <div className="bg-leaf-50 rounded-xl p-3 border border-leaf-200 flex items-center gap-2">
            <span className="text-leaf-600 text-sm">✓</span>
            <p className="text-sm text-leaf-700 font-medium">
              Signed in as {userEmail}
            </p>
          </div>
        )}

        <div className="bg-cream-50 rounded-xl p-4 border border-cream-100">
          <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wide mb-2">
            Order Summary
          </p>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm py-1">
              <span className="text-foreground/70">
                {item.name} × {item.quantity}
              </span>
              <span className="font-semibold text-brand-700">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
          <div className="border-t border-cream-200 mt-2 pt-2 flex justify-between">
            <span className="font-bold text-brand-900 text-sm">Total</span>
            <span className="font-bold text-brand-600">₹{total}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-cream-200 px-5 py-4 space-y-3">
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 rounded-full text-lg transition-colors shadow-sm disabled:opacity-60"
        >
          {loading ? "Processing..." : `Pay ₹${total}`}
        </button>
        <button
          onClick={onBack}
          disabled={loading}
          className="w-full text-sm text-foreground/50 hover:text-foreground/70 transition-colors py-1"
        >
          ← Back to cart
        </button>
      </div>
    </>
  );
}
