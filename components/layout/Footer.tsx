import Link from "next/link";
import { restaurantInfo } from "@/data/swach-site-data";

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🍽️</span>
            <span className="font-bold text-white">{restaurantInfo.name}</span>
          </div>
          <p className="text-sm text-brand-300 leading-relaxed">
            {restaurantInfo.shortTagline}
          </p>
          <p className="text-sm text-brand-400 mt-2">
            Instagram:{" "}
            <a
              href={`https://instagram.com/${restaurantInfo.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-200 transition-colors"
            >
              {restaurantInfo.instagram}
            </a>
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-brand-300">
            {[
              { href: "/menu", label: "Menu" },
              { href: "/specials", label: "Today's Specials" },
              { href: "/orders", label: "My Orders" },
              { href: "/contact", label: "Contact & Location" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand-100 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Visit Us</h3>
          <address className="text-sm text-brand-300 not-italic leading-relaxed">
            {restaurantInfo.address.line1},<br />
            {restaurantInfo.address.line2},<br />
            {restaurantInfo.address.area},<br />
            {restaurantInfo.address.city} – {restaurantInfo.address.pincode}
          </address>
          <p className="text-sm text-brand-300 mt-2">
            📞{" "}
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="hover:text-brand-100 transition-colors"
            >
              {restaurantInfo.phone}
            </a>
          </p>
          <p className="text-xs text-brand-400 mt-2">
            Breakfast: {restaurantInfo.timings.breakfast}
            <br />
            Evening: {restaurantInfo.timings.evening}
          </p>
        </div>
      </div>

      <div className="border-t border-brand-800 text-center text-xs text-brand-500 py-4">
        © {new Date().getFullYear()} {restaurantInfo.name}. All rights reserved.
      </div>
    </footer>
  );
}
