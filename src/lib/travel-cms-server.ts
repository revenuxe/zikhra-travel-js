import { cache } from "react";
import { optimizeCategoryImage } from "@/lib/travel-images";
import { flightSchema, type CmsCategory, type CmsPackage, type TravelCatalogueData } from "@/lib/travel-cms-model";

let lastSuccessful: { value: TravelCatalogueData; fetchedAt: number } | undefined;
const recentCatalogue = () => lastSuccessful && Date.now() - lastSuccessful.fetchedAt < 5 * 60_000 ? lastSuccessful.value : undefined;

/** Public RLS reads only; no admin/session credentials are used during rendering. */
export const getPublicTravelCatalogue = cache(async (): Promise<TravelCatalogueData | undefined> => {
  const base = "https://plfpezgkkrmwknaqffux.supabase.co/rest/v1";
  const headers = { apikey: "sb_publishable_iz7GcucAgm5DPvw8pu458w_12zeNQ4W" };
  try {
    const responses = await Promise.all(["travel_categories", "travel_packages"].map(table => fetch(`${base}/${table}?select=*&published=eq.true&order=sort_order.asc,name.asc`, { headers, next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) })));
    if (responses.some(response => !response.ok)) return recentCatalogue();
    const [categories, packages] = await Promise.all(responses.map(response => response.json())) as [CmsCategory[], CmsPackage[]];
    if (!Array.isArray(categories) || !Array.isArray(packages)) return recentCatalogue();
    const visibleCategories = categories.filter(category => category.published).map(optimizeCategoryImage);
    const value = { categories: visibleCategories, packages: packages.filter(pkg => pkg.published && visibleCategories.some(category => category.id === pkg.category_id) && flightSchema.safeParse(pkg.options).success) };
    lastSuccessful = { value, fetchedAt: Date.now() };
    return value;
  } catch {
    // The client can retry if public catalogue fetching is temporarily unavailable.
    return recentCatalogue();
  }
});
