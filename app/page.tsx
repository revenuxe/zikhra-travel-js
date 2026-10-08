import { seoTitle } from "@/lib/seo";
import type { Metadata } from "next";
import Index from "@/legacy-pages/Index";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  DEFAULT_OG_IMAGE_PATH,
  faqPageSchema,
  localBusinessSchema,
  organizationSchema,
  pageOpenGraph,
  toJsonLd,
  twitterSummaryLarge,
  websiteSchema,
} from "@/lib/seo";
import { BANGALORE_CORE_KEYWORDS, BANGALORE_COST_KEYWORDS, BANGALORE_SERVICE_KEYWORDS, uniqueKeywords } from "@/lib/seo-keywords";

export const dynamic = "force-static";
export const revalidate = 86400;

const homeTitle = "Umrah & Hajj Packages | Zikhra Tours & Travels";
const homeDescription =
  "Explore Umrah packages, Hajj guidance and family travel with Zikhra Tours and Travels in RT Nagar, Bangalore. Compare flights, prices and departure batches.";



export const metadata: Metadata = {
  title: seoTitle(homeTitle),
  description: homeDescription,
  keywords: uniqueKeywords(
    BANGALORE_CORE_KEYWORDS,
    BANGALORE_SERVICE_KEYWORDS,
    BANGALORE_COST_KEYWORDS,
    [
      "Koramangala travel planners",
      "Indiranagar journeys",
      "Whitefield Umrah journeys",
      "HSR Layout journeys",
      "Sarjapur Road journeys",
    ],
  ),
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({
    title: homeTitle,
    description: homeDescription,
    path: "/",
    imageUrl: DEFAULT_OG_IMAGE_PATH,
    imageAlt: "Zikhra - Umrah travel planner in Bangalore",
  }),
  twitter: twitterSummaryLarge(homeTitle, homeDescription, DEFAULT_OG_IMAGE_PATH),
};

export default function HomePage() {
  return (
    <>
      <SeoJsonLd id="home-org-schema" json={toJsonLd(organizationSchema())} />
      <SeoJsonLd id="home-local-schema" json={toJsonLd(localBusinessSchema())} />
      <SeoJsonLd id="home-website-schema" json={toJsonLd(websiteSchema())} />
      <Index />
    </>
  );
}
