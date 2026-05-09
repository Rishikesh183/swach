import type { Metadata } from "next";
import MenuGrid from "@/components/menu/MenuGrid";
import FadeIn from "@/components/animations/FadeIn";
import { restaurantInfo } from "@/data/swach-site-data";

export const metadata: Metadata = {
  title: `Menu | ${restaurantInfo.name}`,
  description:
    "Browse the full menu at Swach South Indian Cafe — dosas, idlis, vadas, filter coffee, thali and more. Fresh every day.",
};

export default function MenuPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <FadeIn direction="up" className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-4">Our Menu</h1>
        <div className="w-24 h-1 bg-brand-500 mx-auto rounded-full mb-6"></div>
        <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
          {restaurantInfo.priceRange} · All items are vegetarian · Fresh every day
        </p>
      </FadeIn>
      <FadeIn delay={0.2} direction="up">
        <MenuGrid />
      </FadeIn>
    </main>
  );
}
