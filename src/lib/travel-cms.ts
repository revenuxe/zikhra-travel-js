"use client";
import { useEffect, useState } from "react";
import { optimizeCategoryImage } from "@/lib/travel-images";
import { getSupabaseClient } from "@/integrations/supabase/client";
import { flightSchema, type CmsCategory, type CmsPackage, type TravelCatalogueData } from "@/lib/travel-cms-model";
export { flightSchema } from "@/lib/travel-cms-model";
export type { CmsCategory, CmsPackage, FlightOption, TravelCatalogueData } from "@/lib/travel-cms-model";
export const slugify = (s:string)=>s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export function useTravelCatalogue(initial?: TravelCatalogueData) {
 const [categories,setCategories]=useState<CmsCategory[]>(initial?.categories ?? []);const [packages,setPackages]=useState<CmsPackage[]>(initial?.packages ?? []);const [loading,setLoading]=useState(!initial);const [error,setError]=useState('');
 useEffect(()=>{let alive=true;const client=getSupabaseClient();if(!client){setError('Unable to connect to packages.');setLoading(false);return;}
 Promise.all([client.from('travel_categories').select('*').eq('published',true).order('sort_order').order('name'),client.from('travel_packages').select('*').eq('published',true).order('sort_order').order('name')]).then(([c,p])=>{if(!alive)return;if(c.error||p.error){if(!initial)setError('Packages could not be loaded. Please try again.');}else {setCategories(c.data??[]);setPackages((p.data??[]).filter(item=>flightSchema.safeParse(item.options).success));}setLoading(false);}).catch(()=>{if(alive){if(!initial)setError('Packages could not be loaded. Please try again.');setLoading(false);}});return()=>{alive=false;};},[]);
 return {categories: categories.map(optimizeCategoryImage),packages,loading,error};
}

