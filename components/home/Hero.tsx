import Link from "next/link";
import { homePageData } from "@/data/swach-site-data";

export default function Hero() {
  const { hero } = homePageData;
  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${hero.backgroundImageFallback})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-brand-950/65" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <p className="text-brand-300 font-medium uppercase tracking-widest text-sm mb-3">
          Madhapur, Hyderabad
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          {hero.heading}
        </h1>
        <p className="text-xl md:text-2xl font-light text-brand-200 mb-4">
          {hero.subheading}
        </p>
        <p className="text-base md:text-lg text-brand-100/80 max-w-xl mx-auto mb-8 leading-relaxed">
          {hero.body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={hero.cta.href}
            className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg"
          >
            {hero.cta.label}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="border-2 border-white text-white hover:bg-white hover:text-brand-900 font-bold px-8 py-4 rounded-full text-lg transition-colors"
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
