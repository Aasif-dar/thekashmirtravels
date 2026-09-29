import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://thekashmirtravels.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Kashmir Travels | Curated Journeys Through Kashmir",
    template: "%s | The Kashmir Travels",
  },
  description:
    "Discover Kashmir through thoughtfully planned journeys, handpicked stays and authentic local experiences across Srinagar, Gulmarg, Pahalgam and beyond.",
  keywords: [
    "Kashmir travel",
    "Kashmir tour package",
    "Srinagar houseboat",
    "Gulmarg tour",
    "Pahalgam tour",
    "Kashmir honeymoon package",
  ],
  openGraph: {
    title: "The Kashmir Travels | Curated Journeys Through Kashmir",
    description:
      "Discover Kashmir through thoughtfully planned journeys, handpicked stays and authentic local experiences across Srinagar, Gulmarg, Pahalgam and beyond.",
    url: siteUrl,
    siteName: "The Kashmir Travels",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/kashmir/hero-dal-sunset.jpg",
        width: 1920,
        height: 1281,
        alt: "Sunset over Dal Lake, Srinagar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Kashmir Travels | Curated Journeys Through Kashmir",
    description:
      "Discover Kashmir through thoughtfully planned journeys, handpicked stays and authentic local experiences.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
