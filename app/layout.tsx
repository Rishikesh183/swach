import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/menu/CartDrawer";
import { globalSEO, restaurantInfo } from "@/data/swach-site-data";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: {
    default: restaurantInfo.name,
    template: `%s | ${restaurantInfo.name}`,
  },
  description: restaurantInfo.description,
  keywords: restaurantInfo.keywords,
  metadataBase: new URL(globalSEO.siteUrl),
  openGraph: {
    type: "website",
    siteName: globalSEO.siteName,
    images: [{ url: globalSEO.defaultOgImage }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalSEO.structuredData),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
