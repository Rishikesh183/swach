"use client";

import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import type { MenuItem } from "@/data/swach-site-data";

const tagColors: Record<string, string> = {
  Bestseller: "bg-brand-100 text-brand-700",
  "Chef's Pick": "bg-amber-100 text-amber-700",
  "Must Try": "bg-leaf-100 text-leaf-700",
  Spicy: "bg-red-100 text-red-600",
  Seasonal: "bg-purple-100 text-purple-700",
  "Fan Favourite": "bg-blue-100 text-blue-700",
  Combo: "bg-orange-100 text-orange-700",
  "Value for Money": "bg-teal-100 text-teal-700",
  "Karnataka Special": "bg-yellow-100 text-yellow-700",
  Sweet: "bg-pink-100 text-pink-700",
  Rare: "bg-indigo-100 text-indigo-700",
  Meal: "bg-green-100 text-green-700",
};

export default function MenuCard({ item }: { item: MenuItem }) {
  const { addItem, openCart } = useCartStore();

  function handleAdd() {
    addItem(item);
    openCart();
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-200 hover:shadow-md transition-shadow flex flex-col">
      <div className="relative aspect-[4/3] bg-cream-100">
        <Image
          src={item.imageFallback}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-foreground/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-brand-900 leading-tight">{item.name}</h3>
          <span className="text-green-600 text-lg flex-shrink-0" title="Vegetarian">
            🌱
          </span>
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColors[tag] ?? "bg-cream-100 text-foreground/60"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-foreground/60 text-xs leading-relaxed flex-1 mb-3">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-brand-600">₹{item.price}</span>
          <button
            onClick={handleAdd}
            disabled={!item.isAvailable}
            className="bg-brand-500 hover:bg-brand-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold px-4 py-1.5 rounded-full text-sm transition-colors"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
