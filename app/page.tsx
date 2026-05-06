import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Highlights from "@/components/home/Highlights";
import WhyUs from "@/components/home/WhyUs";
import ReviewsSection from "@/components/home/ReviewsSection";
import CTASection from "@/components/home/CTASection";
import { homePageData } from "@/data/swach-site-data";

export const metadata: Metadata = {
  title: homePageData.seo.title,
  description: homePageData.seo.description,
  keywords: homePageData.seo.keywords,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <WhyUs />
      <ReviewsSection />
      <CTASection />
    </>
  );
}
