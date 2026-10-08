import type { Metadata } from "next";
import { COMPANY, OFFICE_MAP_URL } from "@/lib/company";

/**
 * Must match the final URL after hosting redirects. Apex zikhra.com 301s to www on Vercel — canonicals must use www
 * or Ahrefs/Google flag "canonical points to redirect".
 */
function resolveSiteUrl(): string {
  const raw = typeof process.env.NEXT_PUBLIC_SITE_URL === "string" ? process.env.NEXT_PUBLIC_SITE_URL.trim() : "";
  const fallback = "https://www.zikhra.com";
  if (!raw || !/^https?:\/\//i.test(raw)) return fallback;

  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase();
    // Keep one canonical host for SEO consistency.
    if (host === "zikhra.com" || host === "www.zikhra.com") {
      return "https://www.zikhra.com";
    }
    if (url.protocol === "http:") url.protocol = "https:";
    return url.origin;
  } catch {
    return fallback;
  }
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "Zikhra Tours & Travels";
/** Served from `/public` for reliable social previews. */
export const DEFAULT_OG_IMAGE_PATH = "/travel/makkah.webp";

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export const DEFAULT_OG_IMAGE = absoluteUrl(DEFAULT_OG_IMAGE_PATH);

export function resolveShareImageUrl(pathOrUrl: string | null | undefined): string {
  if (!pathOrUrl) return DEFAULT_OG_IMAGE;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  return absoluteUrl(pathOrUrl);
}

export function pageOpenGraph(input: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  imageUrl?: string | null;
  imageAlt?: string;
}): NonNullable<Metadata["openGraph"]> {
  const image = resolveShareImageUrl(input.imageUrl ?? DEFAULT_OG_IMAGE_PATH);
  const alt = input.imageAlt ?? input.title;
  return {
    type: input.type ?? "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    title: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    images: [{ url: image, alt }],
  };
}

export function twitterSummaryLarge(
  title: string,
  description: string,
  imageUrl?: string | null,
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [resolveShareImageUrl(imageUrl ?? DEFAULT_OG_IMAGE_PATH)],
  };
}

export function toJsonLd<T>(data: T): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Use an absolute title to avoid applying the brand suffix twice. */
export function seoTitle(title: string): { absolute: string } {
  const clean = title.replace(/(?:\s*\|\s*Zikhra(?: Tours & Travels)?)+$/i, "");
  return { absolute: /zikhra/i.test(clean) ? clean : `${clean} | ${SITE_NAME}` };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/travel/zikhra-travel-logo.svg"),
    email: COMPANY.email,
    telephone: COMPANY.phone,
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": absoluteUrl("/#travel-agency"),
    name: SITE_NAME,
    url: SITE_URL,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    logo: absoluteUrl("/travel/zikhra-travel-logo.svg"),
    hasMap: OFFICE_MAP_URL,
    image: DEFAULT_OG_IMAGE,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.streetAddress,
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.region,
      postalCode: COMPANY.postalCode,
      addressCountry: "IN",
    },
    areaServed: [
      "Bangalore",
      "RT Nagar",
      "Koramangala",
      "Indiranagar",
      "Whitefield",
      "HSR Layout",
      "Electronic City",
      "Sarjapur Road",
      "Hebbal",
      "Bellandur",
      "JP Nagar",
    ],
  };
}

export function webPageSchema(input: { name: string; description: string; path: string; keywords?: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    keywords: input.keywords?.join(", "),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function localServiceSchema(input: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType ?? "Umrah and travel planning",
    description: input.description,
    url: absoluteUrl(input.path),
    areaServed: (input.areaServed ?? ["Bangalore", "Bengaluru"]).map((name) => ({
      "@type": "Place",
      name,
    })),
    provider: {
      "@type": "TravelAgency",
      "@id": absoluteUrl("/#travel-agency"),
      name: SITE_NAME,
      url: SITE_URL,
      telephone: COMPANY.phone,
      email: COMPANY.email,
    },
  };
}

export function serviceCatalogSchema(items: Array<{ name: string; path: string; description?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Zikhra Umrah and Travel Services",
    itemListElement: items.map((item) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: item.name,
        description: item.description,
        url: absoluteUrl(item.path),
        provider: {
          "@type": "TravelAgency",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
