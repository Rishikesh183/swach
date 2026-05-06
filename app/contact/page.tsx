import type { Metadata } from "next";
import { contactPageData, restaurantInfo } from "@/data/swach-site-data";

export const metadata: Metadata = {
  title: contactPageData.seo.title,
  description: contactPageData.seo.description,
};

export default function ContactPage() {
  const { heading, subheading, landmarks, parking, nearbyStops, catering } =
    contactPageData;

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-900">{heading}</h1>
        <p className="text-foreground/60 mt-2">{subheading}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-200">
            <h2 className="font-bold text-brand-900 text-lg mb-4">📍 Location</h2>
            <address className="not-italic text-foreground/70 leading-relaxed mb-4">
              {restaurantInfo.address.full}
            </address>
            <div className="flex flex-wrap gap-2">
              {landmarks.map((l) => (
                <span
                  key={l}
                  className="text-xs bg-cream-100 text-foreground/60 px-3 py-1 rounded-full"
                >
                  {l}
                </span>
              ))}
            </div>
            <a
              href={restaurantInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
            >
              Open in Google Maps
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-200">
            <h2 className="font-bold text-brand-900 text-lg mb-4">📞 Contact</h2>
            <p className="text-foreground/70 mb-2">
              Phone:{" "}
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="text-brand-600 font-semibold hover:underline"
              >
                {restaurantInfo.phone}
              </a>
            </p>
            <p className="text-foreground/70">
              Email:{" "}
              <a
                href={`mailto:${restaurantInfo.email}`}
                className="text-brand-600 hover:underline"
              >
                {restaurantInfo.email}
              </a>
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-200">
            <h2 className="font-bold text-brand-900 text-lg mb-4">🕐 Timings</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/60">Breakfast</span>
                <span className="font-semibold text-brand-800">
                  {restaurantInfo.timings.breakfast}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Evening</span>
                <span className="font-semibold text-brand-800">
                  {restaurantInfo.timings.evening}
                </span>
              </div>
              <p className="text-foreground/50 text-xs pt-1">
                {restaurantInfo.timings.note}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-200">
            <h2 className="font-bold text-brand-900 text-lg mb-3">🚌 Getting Here</h2>
            <p className="text-sm text-foreground/60 mb-2">{parking}</p>
            <ul className="text-sm text-foreground/60 space-y-1">
              {nearbyStops.map((stop) => (
                <li key={stop}>📍 {stop}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-cream-100">
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
          </div>

          <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6">
            <h2 className="font-bold text-brand-900 text-lg mb-2">
              🍱 {catering.heading}
            </h2>
            <p className="text-foreground/70 text-sm leading-relaxed mb-3">
              {catering.description}
            </p>
            <p className="text-brand-700 font-semibold text-sm">{catering.cta}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
