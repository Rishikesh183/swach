import { reviewsData } from "@/data/swach-site-data";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

function RatingBar({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-4 text-foreground/70 text-right">{label}</span>
      <div className="flex-1 bg-cream-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-amber-400 h-full rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-foreground/60 w-8">{percent}%</span>
    </div>
  );
}

export default function ReviewsSection() {
  const { averageRating, totalReviews, breakdown, reviews, platform } = reviewsData;

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-brand-600 font-semibold uppercase tracking-widest text-sm mb-2">
            What Customers Say
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900">
            {averageRating}★ on {platform}
          </h2>
          <p className="text-foreground/60 mt-1">{totalReviews.toLocaleString()} reviews</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="bg-cream-50 rounded-2xl p-6 shadow-sm border border-cream-200">
            <div className="text-center mb-6">
              <p className="text-6xl font-bold text-brand-600">{averageRating}</p>
              <StarRating rating={Math.round(averageRating)} />
              <p className="text-foreground/60 text-sm mt-1">
                {totalReviews.toLocaleString()} reviews
              </p>
            </div>
            <div className="space-y-2">
              {([5, 4, 3, 2, 1] as const).map((star) => (
                <RatingBar
                  key={star}
                  label={`${star}★`}
                  percent={breakdown[star]}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-cream-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-900 text-sm">{review.name}</p>
                    <p className="text-xs text-foreground/50">{review.date}</p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed line-clamp-4">
                  {review.text}
                </p>
                <p className="text-xs text-brand-500 mt-2 font-medium">
                  Tried: {review.dish}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
