import { homePageData } from "@/data/swach-site-data";

export default function WhyUs() {
  const { whyChooseUs } = homePageData;
  return (
    <section className="py-20 bg-cream-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900">
            {whyChooseUs.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.points.map((point) => (
            <div
              key={point.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-cream-200 hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-3 block">{point.icon}</span>
              <h3 className="font-bold text-brand-900 text-lg mb-2">{point.title}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
