"use client";

import Image from "next/image";
import Link from "next/link";
import { homePageData } from "@/data/swach-site-data";
import { useCartStore } from "@/lib/cart-store";
import { menuItems } from "@/data/swach-site-data";

export default function Highlights() {
  const { highlights } = homePageData;
  const { addItem, openCart } = useCartStore();

  function handleAdd(id: string) {
    const item = menuItems.find((m) => m.id === id);
    if (item) {
      addItem(item);
      openCart();
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-brand-600 font-semibold uppercase tracking-widest text-sm mb-2">
            {highlights.subheading}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900">
            {highlights.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-cream-200"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.imageFallback}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-3 left-3 bg-white/90 text-sm font-semibold px-3 py-1 rounded-full shadow">
                  {item.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-900 mb-2">{item.name}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-brand-600">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => handleAdd(item.id)}
                    className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 border-2 border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            View Full Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}
