"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { restaurantInfo } from "@/data/swach-site-data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  // { href: "/specials", label: "Specials" },
  { href: "/orders", label: "My Orders" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCartStore();
  const count = itemCount();

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

        <div className="flex items-center gap-3">
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
        </div>
      )}
    </header>
  );
}
