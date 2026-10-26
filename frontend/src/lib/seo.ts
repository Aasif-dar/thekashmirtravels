import type { Metadata } from "next";
import { contact } from "@/data/contact";
import { site } from "@/data/site";
import type { Destination, ImageRef, Journey } from "@/lib/types";

// Single place for page metadata and JSON-LD, so every public page gets its own
// canonical URL, Open Graph URL and description instead of the layout defaults.

/** Absolute URL on the production domain for a site path ("/" is the origin). */
export const absoluteUrl = (path: string) =>
  path === "/" ? site.url : `${site.url}${path}`;

const absoluteImage = (src: string) =>
  src.startsWith("/") ? `${site.url}${src}` : src;

/** Collapse whitespace and cut at a word boundary so SERP snippets don't truncate mid-word. */
export function truncate(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const atWord = cut.slice(0, cut.lastIndexOf(" ")) || cut;
  return `${atWord.replace(/[\s,;:.–—-]+$/, "")}…`;
}

/** Descriptive alt text for admin images saved with an empty alt. */
export const altText = (image: ImageRef, fallback: string) =>
  image.alt.trim() || fallback;

type PageMetadataArgs = {
  /** Omit on the homepage to keep the layout's default title. */
  title?: string;
  description: string;
  /** Site path, e.g. "/journeys/my-slug". Also the canonical URL. */
  path: string;
  image?: { url: string; alt?: string; width?: number; height?: number };
  /** Keep the page out of search results (it stays crawlable for links). */
  noindex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  noindex,
}: PageMetadataArgs): Metadata {
  const shareTitle = title ? `${title} | ${site.brandName}` : site.seo.title;
  const shareImage = image ?? site.seo.ogImage;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: site.brandName,
      locale: "en_IN",
      type: "website",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [shareImage.url],
    },
  };
}

// ----------------------------------------------------------------- JSON-LD
// Only facts that exist in the site's own data. No ratings, reviews, opening
// hours or prices that the data doesn't hold.

const stripQuery = (url: string) => {
  const parsed = new URL(url);
  parsed.search = "";
  parsed.hash = "";
  return parsed.toString().replace(/\/$/, "");
};

/** Home page: the business itself and the website. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": `${site.url}/#organization`,
        name: site.brandName,
        url: site.url,
        description: site.about.description,
        image: absoluteImage(site.seo.ogImage.url),
        email: contact.email,
        telephone: contact.phone,
        // Keep in sync with contact.address in src/data/contact.ts.
        address: {
          "@type": "PostalAddress",
          streetAddress: "Budshah Nagar Natipora",
          addressLocality: "Srinagar",
          addressCountry: "IN",
        },
        areaServed: { "@type": "Place", name: "Kashmir" },
        // Instagram only: the Facebook link in contact.ts is a share link, not a profile URL.
        sameAs: [stripQuery(contact.instagramUrl)],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.brandName,
        inLanguage: "en-IN",
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };
}

const provider = {
  "@type": "TravelAgency",
  name: site.brandName,
  url: site.url,
};

export function destinationJsonLd(destination: Destination) {
  const images = [destination.coverImage, ...destination.galleryImages].map(
    (image) => absoluteImage(image.src)
  );

  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.title,
    description: destination.description.replace(/\s+/g, " ").trim(),
    url: absoluteUrl(`/destinations/${destination.slug}`),
    image: images,
    ...(destination.region
      ? { containedInPlace: { "@type": "Place", name: destination.region } }
      : {}),
  };
}

export function journeyJsonLd(journey: Journey) {
  const image = (journey.heroImage ?? journey.coverImage).src;

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: journey.title,
    description: journey.description.replace(/\s+/g, " ").trim(),
    url: absoluteUrl(`/journeys/${journey.slug}`),
    image: [image, ...journey.images.map((item) => item.src)].map(absoluteImage),
    provider,
    ...(journey.forWhom ? { touristType: journey.forWhom } : {}),
    ...(journey.itinerary.length
      ? {
          itinerary: {
            "@type": "ItemList",
            itemListElement: journey.itinerary.map((day, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${day.day}: ${day.title}`,
              ...(day.description ? { description: day.description } : {}),
            })),
          },
        }
      : {}),
    // Only when the admin has entered a price; the site shows it as "From ₹…".
    ...(journey.price
      ? {
          offers: {
            "@type": "Offer",
            url: absoluteUrl(`/journeys/${journey.slug}`),
            priceCurrency: "INR",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: journey.price,
              priceCurrency: "INR",
            },
          },
        }
      : {}),
  };
}
