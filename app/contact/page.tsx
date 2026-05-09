import type { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import { contactPageData, restaurantInfo } from "@/data/swach-site-data";

export const metadata: Metadata = {
  title: contactPageData.seo.title,
  description: contactPageData.seo.description,
};

export default function ContactPage() {
  const { heading, subheading, landmarks, parking, nearbyStops, catering } =
    contactPageData;

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <FadeIn direction="up" className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-4">{heading}</h1>
        <div className="w-24 h-1 bg-brand-500 mx-auto rounded-full mb-6"></div>
        <p className="text-foreground/70 text-lg">{subheading}</p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        <div className="space-y-6">
          <FadeIn delay={0.1} direction="right" className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-cream-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-bl-full -z-10 opacity-50"></div>
            <h2 className="font-bold text-brand-900 text-xl mb-4 flex items-center gap-2">📍 Location</h2>
            <address className="not-italic text-foreground/70 leading-relaxed mb-5">
              {restaurantInfo.address.full}
            </address>
            <div className="flex flex-wrap gap-2 mb-6">
              {landmarks.map((l) => (
                <span
                  key={l}
                  className="text-xs bg-brand-50 text-brand-700 font-medium px-4 py-1.5 rounded-full border border-brand-100"
                >
                  {l}
                </span>
              ))}
            </div>
            <a
              href={restaurantInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors shadow-sm"
            >
              Open in Google Maps
            </a>
          </FadeIn>

          <FadeIn delay={0.2} direction="right" className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-cream-200">
            <h2 className="font-bold text-brand-900 text-xl mb-4 flex items-center gap-2">📞 Contact</h2>
            <p className="text-foreground/70 mb-3 flex items-center gap-3">
              <span className="text-brand-500 font-medium">Phone:</span>
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="text-brand-700 font-semibold hover:text-brand-500 transition-colors"
              >
                {restaurantInfo.phone}
              </a>
            </p>
            <p className="text-foreground/70 flex items-center gap-3">
              <span className="text-brand-500 font-medium">Email:</span>
              <a
                href={`mailto:${restaurantInfo.email}`}
                className="text-brand-700 font-semibold hover:text-brand-500 transition-colors"
              >
                {restaurantInfo.email}
              </a>
            </p>
          </FadeIn>

          <FadeIn delay={0.3} direction="right" className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-cream-200">
            <h2 className="font-bold text-brand-900 text-xl mb-4 flex items-center gap-2">🕐 Timings</h2>
            <div className="space-y-4 text-base">
              <div className="flex justify-between items-center border-b border-cream-100 pb-3">
                <span className="text-foreground/70 font-medium">Breakfast</span>
                <span className="font-bold text-brand-800 bg-brand-50 px-3 py-1 rounded-full text-sm">
                  {restaurantInfo.timings.breakfast}
                </span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-foreground/70 font-medium">Evening</span>
                <span className="font-bold text-brand-800 bg-brand-50 px-3 py-1 rounded-full text-sm">
                  {restaurantInfo.timings.evening}
                </span>
              </div>
              <p className="text-brand-600 text-sm pt-2 italic">
                {restaurantInfo.timings.note}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} direction="right" className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-cream-200">
            <h2 className="font-bold text-brand-900 text-xl mb-3 flex items-center gap-2">🚌 Getting Here</h2>
            <p className="text-base text-foreground/70 mb-4">{parking}</p>
            <ul className="text-base text-foreground/70 space-y-2">
              {nearbyStops.map((stop) => (
                <li key={stop} className="flex items-center gap-2">
                  <span className="text-brand-500">•</span> {stop}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <div className="space-y-6">
          <FadeIn delay={0.2} direction="left" className="rounded-3xl overflow-hidden shadow-lg aspect-[4/3] bg-cream-100 border-4 border-white">
            <iframe
              src={restaurantInfo.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Swach South Indian Cafe on Google Maps"
            />
          </FadeIn>

          <FadeIn delay={0.4} direction="left" className="bg-brand-50 border border-brand-200 rounded-3xl p-8 shadow-sm">
            <h2 className="font-bold text-brand-900 text-xl mb-3">
              🍱 {catering.heading}
            </h2>
            <p className="text-foreground/70 text-base leading-relaxed mb-4">
              {catering.description}
            </p>
            <p className="text-brand-700 font-bold bg-white inline-block px-4 py-2 rounded-lg border border-brand-100 shadow-sm">{catering.cta}</p>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
