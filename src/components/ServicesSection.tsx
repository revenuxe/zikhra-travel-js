import { services as travelServices } from "@/lib/services-data";
import { serviceImageSrcSet } from "@/lib/travel-images";
import Link from "next/link";
import type { MarketId } from "@/lib/market-types";
import { getMarketCopy } from "@/lib/market-copy";
import { serviceDetailPath, servicesIndexPath } from "@/lib/marketing-paths";

const services = ["umrah-packages", "hajj-enquiries", "family-umrah", "ramadan-umrah"].map(id => travelServices.find(item => item.id === id)!).map(item => ({ image: item.image, title: item.title, desc: item.subtitle, slug: item.id }));

type Props = { market?: MarketId };

const ServicesSection = ({ market = "bangalore" }: Props) => {
  const copy = getMarketCopy(market);
  const city = "Bangalore";
  const svcBase = servicesIndexPath(market);
  return (
    <section className="px-5 py-14 md:px-8 md:py-16">
      <div className="text-center mb-10">
        <p className="text-xs font-sans tracking-[0.3em] uppercase text-gold mb-3">What We Do</p>
        <h2 className="font-serif text-3xl md:text-4xl gold-text">Our Services</h2>
        <p className="font-sans text-muted-foreground text-sm mt-3 max-w-sm mx-auto">{copy.servicesSub}</p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {services.map((svc) => (
          <Link
            key={svc.title}
            href={serviceDetailPath(market, svc.slug)}
            className="group flex flex-col overflow-hidden rounded-[1.2rem] border border-black/10 bg-white text-left shadow-[0_10px_24px_rgba(0,0,0,0.055)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.1)]"
          >
            <div className="relative w-full aspect-[4/3] max-h-32 overflow-hidden md:max-h-none">
              <img
                src={svc.image}
                srcSet={serviceImageSrcSet(svc.image)}
                sizes="(min-width: 1280px) 300px, (min-width: 768px) 23vw, 46vw"
                decoding="async"
                alt={`${svc.title} in ${city}`}
                loading="lazy"
                width={640}
                height={480}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
            <div className="relative z-10 -mt-3 rounded-t-[1rem] bg-white p-4 md:p-6">
              <h3 className="mb-1 font-sans text-sm font-medium text-[#171717] md:text-lg">{svc.title}</h3>
              <p className="font-sans text-xs leading-relaxed text-muted-foreground md:text-sm">{svc.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
            href={svcBase}
          className="inline-block rounded-lg border border-black/15 bg-white px-5 py-3 font-sans text-sm font-medium text-[#171717] transition-colors hover:border-black/40"
        >
          View All Services
        </Link>
      </div>
    </section>
  );
};

export default ServicesSection;
