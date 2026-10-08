import type { CmsCategory } from './travel-cms-model';

const categoryImages: Record<string, { image_url: string; image_alt: string }> = {
  classic: { image_url: '/travel/makkah.webp', image_alt: 'The Kaaba at Masjid al-Haram in Makkah' },
  hajj: { image_url: '/travel/hajj.webp', image_alt: 'Pilgrims gathered around the Kaaba in Makkah' },
  ramadan: { image_url: '/travel/ramadan.webp', image_alt: 'The Kaaba surrounded by worshippers at night in Makkah' },
  family: { image_url: '/travel/madinah.webp', image_alt: 'Masjid an-Nabawi and its courtyard in Madinah' },
  private: { image_url: '/travel/private.webp', image_alt: 'The Kaaba and its golden detailing in Makkah' },
};

// Replace the original repeated seed photos while preserving custom CMS uploads.
export function optimizeCategoryImage(category: CmsCategory): CmsCategory {
  const defaults = categoryImages[category.slug];
  return defaults && (!category.image_url || /^\/travel\/(makkah|madinah)\.(jpg|webp)$/.test(category.image_url))
    ? { ...category, ...defaults }
    : category;
}

export function travelImageSrcSet(src: string): string | undefined {
  return /^\/travel\/(makkah|madinah|hajj|ramadan|private)\.webp$/.test(src)
    ? `${src.replace('.webp', '-card-320.webp')} 320w, ${src.replace('.webp', '-card-640.webp')} 640w, ${src.replace('.webp', '-card-1200.webp')} 1200w`
    : undefined;
}

export function serviceImageSrcSet(src: string): string | undefined {
  return /^\/travel\/(makkah|madinah|hajj|ramadan)\.webp$/.test(src)
    ? `${src.replace('.webp', '-320.webp')} 320w, ${src.replace('.webp', '-640.webp')} 640w, ${src} 1200w`
    : undefined;
}
