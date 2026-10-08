import Link from "next/link";
import { serviceImageSrcSet } from "@/lib/travel-images";
import type { MarketId } from "@/lib/market-types";
import { getMarketCopy } from "@/lib/market-copy";
import { serviceDetailPath } from "@/lib/marketing-paths";

const projectTypes = [
  { name: "Visa Assistance", slug: "visa-assistance", desc: "Help with documents and application steps", image: "/travel/makkah.webp", alt: "The Kaaba at Masjid al-Haram in Makkah" },
  { name: "Hotel Stays", slug: "makkah-madinah-stays", desc: "Accommodation options in Makkah and Madinah", image: "/travel/madinah.webp", alt: "Masjid an-Nabawi in Madinah" },
  { name: "Flights & Transfers", slug: "flights-transfers", desc: "Connect each stage of your journey", image: "/travel/hajj.webp", alt: "The Kaaba and pilgrims in Makkah at night" },
  { name: "Ziyarat Visits", slug: "ziyarat", desc: "Explore places of Islamic heritage", image: "/travel/ramadan.webp", alt: "The Kaaba at Masjid al-Haram in Makkah" },
];

type Props = { market?: MarketId };

const ProjectTypeSection = ({ market = "bangalore" }: Props) => {
  const copy = getMarketCopy(market);
  return (
    <section className="px-5 py-14 md:px-8 md:py-16">
      <div className="text-center mb-10">
        <p className="text-xs font-sans tracking-[0.3em] uppercase text-gold mb-3">Travel Support</p>
        <h2 className="font-serif text-3xl md:text-4xl gold-text">Travel Essentials</h2>
        <p className="font-sans text-muted-foreground text-sm mt-3 max-w-sm mx-auto">{copy.projectTypesSub}</p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {projectTypes.map((pt) => (
          <Link
            key={pt.slug}
            href={serviceDetailPath(market, pt.slug)}
            className="group flex flex-col overflow-hidden rounded-[1.2rem] border border-black/10 bg-white text-left shadow-[0_10px_24px_rgba(0,0,0,0.055)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.1)]"
          >
            <div className="relative w-full aspect-[4/3] max-h-32 overflow-hidden md:max-h-none">
              <img
                src={pt.image}
                srcSet={serviceImageSrcSet(pt.image)}
                sizes="(min-width: 1280px) 300px, (min-width: 768px) 23vw, 46vw"
                alt={pt.alt}
                decoding="async"
                loading="lazy"
                width={640}
                height={480}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
            <div className="relative z-10 -mt-3 w-full rounded-t-[1rem] bg-white p-4 md:p-6">
              <h3 className="mb-1 font-sans text-sm font-medium text-[#171717] md:text-lg">{pt.name}</h3>
              <p className="font-sans text-xs leading-relaxed text-muted-foreground md:text-sm">{pt.desc}</p>
              <div className="mt-3 h-px w-7 bg-black/45 transition-all duration-300 group-hover:w-11" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectTypeSection;
