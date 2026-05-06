import Image from "next/image";
import { homePageData } from "@/data/swach-site-data";

export default function About() {
  const { about } = homePageData;
  return (
    <section className="py-20 bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={about.imageFallback}
            alt="Inside Swach South Indian Cafe"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <p className="text-brand-600 font-semibold uppercase tracking-widest text-sm mb-2">
            {about.subheading}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
            {about.heading}
          </h2>
          <div className="space-y-4">
            {about.body.map((para, i) => (
              <p key={i} className="text-foreground/70 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-4 text-center shadow-sm border border-cream-200"
              >
                <p className="text-2xl font-bold text-brand-600">{stat.value}</p>
                <p className="text-xs text-foreground/60 mt-1 leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
