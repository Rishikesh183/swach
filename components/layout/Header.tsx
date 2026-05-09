"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { supabase } from "@/lib/supabase";
import { restaurantInfo } from "@/data/swach-site-data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/orders", label: "My Orders" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { itemCount, openCart } = useCartStore();
  const count = itemCount();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-brand-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <span className="font-bold text-lg text-brand-800 leading-tight">
            {restaurantInfo.name} 
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-brand-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {!authLoading && (
            userEmail ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-xs text-foreground/50 max-w-32 truncate">
                  {userEmail}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-xs font-semibold text-foreground/50 hover:text-red-500 transition-colors px-2 py-1"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="hidden md:inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors px-3 py-1.5 rounded-full hover:bg-brand-50"
              >
                Sign in
              </Link>
            )
          )}

          <button
            onClick={openCart}
            className="relative flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            🛒 Cart
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-leaf-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </button>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-brand-100 bg-white px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-brand-600 py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-cream-100 pt-3">
            {userEmail ? (
              <>
                <p className="text-xs text-foreground/40 mb-2">{userEmail}</p>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-semibold text-red-500 hover:text-red-600 py-1"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold text-brand-600 hover:text-brand-700 py-1"
              >
                Sign in / Create account
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
