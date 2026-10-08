import { seoTitle } from "@/lib/seo";
import type { Metadata } from "next";
import CityLandingPage from "@/views/marketing/CityLandingPage";
import SeoJsonLd from "@/components/SeoJsonLd";
import { bangaloreAreas } from "@/lib/bangalore-areas-data";
import {
  absoluteUrl,
  breadcrumbSchema,
  DEFAULT_OG_IMAGE_PATH,
  localBusinessSchema,
  organizationSchema,
  pageOpenGraph,
  toJsonLd,
  twitterSummaryLarge,
  websiteSchema,
  webPageSchema,
} from "@/lib/seo";
import {
  BANGALORE_CORE_KEYWORDS,
  BANGALORE_COST_KEYWORDS,
  BANGALORE_NEIGHBOURHOODS,
  BANGALORE_SERVICE_KEYWORDS,
  uniqueKeywords,
} from "@/lib/seo-keywords";

export const dynamic = "force-static";
export const revalidate = 86400;

const title = "Umrah & Hajj Packages | Zikhra Tours & Travels";
const description =
  "Explore Umrah packages, Hajj guidance and family travel with Zikhra Tours and Travels in RT Nagar, Bangalore. Compare flights, prices and departure batches.";

const keywords = uniqueKeywords(
  BANGALORE_CORE_KEYWORDS,
  BANGALORE_SERVICE_KEYWORDS,
  BANGALORE_COST_KEYWORDS,
  BANGALORE_NEIGHBOURHOODS.map((area) => `${area} travel planners`),
);

export const metadata: Metadata = {
  title: seoTitle(title),
  description,
  keywords,
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({
    title,
    description,
    path: "/bangalore",
    imageUrl: DEFAULT_OG_IMAGE_PATH,
    imageAlt: "Umrah & travel enquiries from Bangalore - Zikhra",
  }),
  twitter: twitterSummaryLarge(title, description, DEFAULT_OG_IMAGE_PATH),
};

export default function BangaloreHubPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bangalore neighbourhoods - Zikhra Tours & Travels",
    itemListElement: bangaloreAreas.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `Umrah & Hajj Tours from ${area.name}, Bangalore`,
      item: absoluteUrl(`/bangalore/${area.slug}`),
    })),
  };

  return (
    <>
      <SeoJsonLd id="bangalore-org-schema" json={toJsonLd(organizationSchema())} />
      <SeoJsonLd id="bangalore-local-schema" json={toJsonLd(localBusinessSchema())} />
      <SeoJsonLd id="bangalore-website-schema" json={toJsonLd(websiteSchema())} />
      <SeoJsonLd id="bangalore-webpage-schema" json={toJsonLd(webPageSchema({ name: title, description, path: "/bangalore", keywords }))} />
      <SeoJsonLd
        id="bangalore-breadcrumb"
        json={toJsonLd(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Bangalore", path: "/bangalore" }]))}
      />
      <SeoJsonLd id="bangalore-area-itemlist" json={toJsonLd(itemList)} />
      <CityLandingPage market="bangalore" />
    </>
  );
}
