"use client";

import { useState } from "react";
import { menuCategories, menuItems } from "@/data/swach-site-data";
import MenuCard from "./MenuCard";

export default function MenuGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
        <button
          onClick={() => setActiveCategory("all")}
          className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeCategory === "all"
              ? "bg-brand-500 text-white"
              : "bg-white border border-cream-200 text-foreground/70 hover:border-brand-300"
          }`}
        >
          All Items
        </button>
        {menuCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeCategory === cat.id
                ? "bg-brand-500 text-white"
                : "bg-white border border-cream-200 text-foreground/70 hover:border-brand-300"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {activeCategory === "all" ? (
        menuCategories.map((cat) => {
          const catItems = menuItems.filter((i) => i.category === cat.id);
          if (catItems.length === 0) return null;
          return (
            <div key={cat.id} className="mb-12">
              <h2 className="text-xl font-bold text-brand-900 mb-4 pb-2 border-b border-cream-200">
                {cat.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
