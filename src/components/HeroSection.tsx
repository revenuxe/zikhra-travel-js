import HeroBackdrop from "@/components/HeroBackdrop";
﻿import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { MarketId } from "@/lib/market-types";
import { getMarketCopy } from "@/lib/market-copy";

type Props = { market?: MarketId };

const HeroSection = ({ market = "bangalore" }: Props) => {
  const copy = getMarketCopy(market);
  const heroTitle =
    market === "bangalore"
      ? "Umrah & Hajj Tours and Travels from Bangalore"
      : "Umrah, Hajj & Meaningful Journeys";

  return (
    <section className="relative isolate overflow-hidden bg-[#f8f8f7] pb-12 pt-28 sm:pb-16 sm:pt-32">
      <HeroBackdrop />
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-[52rem] text-left">
          <h1 className="mb-8 font-sans text-[3.15rem] font-light leading-[0.98] tracking-[-0.07em] text-[#171717] animate-fade-in-up sm:text-6xl lg:text-[5.5rem]">
            {market === "bangalore" ? (
              <>
                <span className="block md:whitespace-nowrap">Umrah &amp; Hajj</span>
                <span className="block md:whitespace-nowrap">Tours and Travels</span>
                <span className="block md:whitespace-nowrap">from Bangalore</span>
              </>
            ) : heroTitle}
          </h1>
          <div
            className="mb-10 max-w-xl font-sans text-[1.03rem] font-light leading-[1.72] tracking-[-0.02em] text-[#525252] animate-fade-in-up md:text-[1.15rem]"
            style={{ animationDelay: "0.2s" }}
          >
            <p>Discover Umrah packages with flights, comfortable stays, meals, and guided ziyarat. Choose the departure that suits your journey.</p>
          </div>

          <div className="flex flex-row items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-[#171717] px-5 py-3.5 font-sans text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_24px_rgba(0,0,0,0.16)] active:translate-y-0"
          >
            Plan Your Journey
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/bangalore/packages"
            className="inline-flex items-center gap-2 px-1 py-3.5 font-sans text-sm font-medium text-[#171717] transition-colors duration-300 hover:text-gold"
          >
            View Packages
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
