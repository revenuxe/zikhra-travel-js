"use client";

import { useRef, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { MarketId } from "@/lib/market-types";
import { getMarketCopy } from "@/lib/market-copy";
import { bangaloreAreas } from "@/lib/bangalore-areas-data";

type Props = { market?: MarketId };

const AreasWeServe = ({ market = "bangalore" }: Props) => {
  const copy = getMarketCopy(market);
  const scrollRef = useRef<HTMLDivElement>(null);

  const displayAreas = useMemo(
    () =>
      bangaloreAreas.map((a) => ({ name: a.name, slug: a.slug, hrefBase: "/bangalore" as const })),
    [],
  );

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <section className="section-padding">
      <div className="text-center mb-8">
        <p className="text-xs font-sans tracking-[0.3em] uppercase text-gold mb-3">Locations</p>
        <h2 className="font-serif text-3xl md:text-4xl gold-text mb-3">Areas We Serve</h2>
        <p className="font-sans text-muted-foreground text-sm">{copy.areasSectionSub}</p>
        <p className="font-sans text-muted-foreground text-xs mt-3 max-w-md mx-auto leading-relaxed">
          Compare{" "}
          <Link href="/bangalore/travel-package-guide" className="text-gold hover:underline">
            Bangalore travel package costs
          </Link>{" "}
          or explore{" "}
          <Link href="/" className="text-gold hover:underline">
            travel planning in Bangalore
          </Link>
          , including Koramangala, Whitefield, Indiranagar, and more.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-5 py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayAreas.map((area) => (
            <Link
              key={`${area.hrefBase}-${area.slug}`}
              href={`${area.hrefBase}/${area.slug}`}
              className="flex h-14 min-w-36 flex-shrink-0 items-center justify-center rounded-xl border border-black/12 bg-white px-5 font-sans text-sm font-medium text-[#303030] shadow-[0_6px_16px_rgba(0,0,0,0.045)] transition-all duration-300 hover:-translate-y-0.5 hover:border-black/35 hover:bg-[#171717] hover:text-white"
            >
              {area.name}
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/12 bg-white shadow-[0_5px_14px_rgba(0,0,0,0.12)]"
        >
          <ChevronLeft className="w-4 h-4 text-gold" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/12 bg-white shadow-[0_5px_14px_rgba(0,0,0,0.12)]"
        >
          <ChevronRight className="w-4 h-4 text-gold" />
        </button>
      </div>
      <div className="mt-7 text-center">
        <Link href="/bangalore/locations" className="inline-flex items-center gap-2 rounded-[1rem] bg-[#171717] px-6 py-4 font-sans text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_24px_rgba(0,0,0,0.16)]">
          Explore more locations <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default AreasWeServe;
