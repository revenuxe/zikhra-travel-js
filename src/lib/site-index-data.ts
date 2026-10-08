import { bangaloreAreas } from "@/lib/bangalore-areas-data";
import { portfolioItems } from "@/lib/portfolio-data";
import { projectTypes } from "@/lib/project-types-data";
import { projects } from "@/lib/projects-data";
import { services } from "@/lib/services-data";

export type SiteIndexLink = { label: string; href: string };

export type SiteIndexSection = { title: string; description?: string; links: SiteIndexLink[] };

const mainPages: SiteIndexLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Bangalore services", href: "/bangalore/services" },
  { label: "Umrah & Hajj packages", href: "/bangalore/packages" },
  { label: "Bangalore travel package costs", href: "/bangalore/travel-package-guide" },
  { label: "Umrah travel package costs Bangalore", href: "/umrah-package-guide-bangalore" },
  { label: "Family Umrah travel package costs Bangalore", href: "/family-umrah-package-guide-bangalore" },
  { label: "Bangalore journeys", href: "/bangalore/journeys" },
  { label: "Blog", href: "/blog" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

export function getStaticSiteIndexSections(): SiteIndexSection[] {
  return [
    {
      title: "Main pages",
      description: "Core pages across the Zikhra website.",
      links: mainPages,
    },
    {
      title: "Bangalore areas",
      description: "Local travel planning landing pages in Bangalore.",
      links: [
        { label: "Zikhra homepage", href: "/" },
        ...bangaloreAreas.map((a) => ({ label: `${a.name}, Bangalore`, href: `/bangalore/${a.slug}` })),
      ],
    },
    {
      title: "Bangalore services",
      description: "Premium Umrah travel services for Bangalore travellers.",
      links: [
        { label: "Bangalore services overview", href: "/bangalore/services" },
        ...services.map((s) => ({ label: `${s.title} in Bangalore`, href: `/bangalore/services/${s.id}` })),
      ],
    },
    {
      title: "Bangalore package types",
      description: "Umrah package options for individuals, families, and groups.",
      links: projectTypes.map((p) => ({ label: `${p.title} in Bangalore`, href: `/bangalore/packages/${p.slug}` })),
    },
    {
      title: "Travel destinations",
      description: "Destination and travel preparation guides.",
      links: portfolioItems.map((p) => ({ label: `${p.title} in Bangalore`, href: `/bangalore/destinations/${p.slug}` })),
    },
    {
      title: "Featured travel itineraries",
      description: "Illustrative itineraries for your travel planning.",
      links: projects.map((p) => ({ label: `${p.title} in Bangalore`, href: `/bangalore/journeys/${p.slug}` })),
    },
  ];
}
