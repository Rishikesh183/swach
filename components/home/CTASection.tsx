"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { homePageData } from "@/data/swach-site-data";

export default function CTASection() {
  const { cta } = homePageData;
  return (
    <section
      className="relative py-24 text-white text-center"
      style={{
        backgroundImage: `url(${cta.backgroundFallback})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-brand-950/75" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl mx-auto px-4"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{cta.heading}</h2>
        <p className="text-brand-200 text-lg mb-8">{cta.subheading}</p>
        <Link
          href={cta.buttonHref}
          className="inline-block bg-brand-500 hover:bg-brand-600 text-white font-bold px-10 py-4 rounded-full text-lg transition-colors shadow-lg"
        >
          {cta.buttonLabel}
        </Link>
      </motion.div>
    </section>
  );
}
