import type { Metadata } from "next";
import Image from "next/image";
import { specialsPageData } from "@/data/swach-site-data";

export const metadata: Metadata = {
  title: specialsPageData.seo.title,
  description: specialsPageData.seo.description,
};

export default function SpecialsPage() {
  const { heading, subheading, featuredItems, seasonalNote, chefNote } =
    specialsPageData;

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-900">{heading}</h1>
        <p className="text-foreground/60 mt-2 max-w-xl mx-auto">{subheading}</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-10 text-amber-800 text-sm font-medium">
        {seasonalNote}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {featuredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-200 hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.imageFallback}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-brand-900 mb-1">{item.name}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed mb-3 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-brand-600">₹{item.price}</span>
                {item.tags && item.tags.length > 0 && (
                  <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium">
                    {item.tags[0]}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-brand-50 border-l-4 border-brand-500 rounded-xl p-6 max-w-2xl mx-auto">
        <p className="text-brand-800 italic text-lg leading-relaxed">{chefNote}</p>
      </div>
    </main>
  );
}
