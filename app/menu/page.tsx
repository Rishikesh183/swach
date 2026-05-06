import type { Metadata } from "next";
import MenuGrid from "@/components/menu/MenuGrid";
import { restaurantInfo } from "@/data/swach-site-data";

export const metadata: Metadata = {
  title: `Menu | ${restaurantInfo.name}`,
  description:
    "Browse the full menu at Swach South Indian Cafe — dosas, idlis, vadas, filter coffee, thali and more. Fresh every day.",
};

export default function MenuPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-900">Our Menu</h1>
        <p className="text-foreground/60 mt-2">
          {restaurantInfo.priceRange} · All items are vegetarian · Fresh every day
        </p>
      </div>
      <MenuGrid />
    </main>
  );
}
