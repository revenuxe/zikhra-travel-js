import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { MarketId } from "@/lib/market-types";

const packages = [
  {
    "name": "Umrah Packages",
    "href": "/umrah-package-guide-bangalore",
    "price": "Request a quote",
    "desc": "A considered journey to Makkah and Madinah. Plan your Umrah around your dates, budget, and pace. Compare accommodation, transport, and practical support before choosing the itinerary that suits you."
  },
  {
    "name": "Family Umrah",
    "href": "/family-umrah-package-guide-bangalore",
    "price": "Request a quote",
    "desc": "Travel together with thoughtful planning. Plan a family Umrah with room arrangements, manageable transfers, and a pace suited to children and older relatives. Tell us about your group so the practical details can be discussed early."
  },
  {
    "name": "Private Umrah",
    "href": "/bangalore/travel-package-guide",
    "price": "Request a quote",
    "desc": "A journey planned around your pace. Discuss a private itinerary for your household or small group, with flexible travel dates and preferred accommodation. Each requested service is checked for availability before confirmation."
  }
];

type Props = { market?: MarketId };

export default function PricingPreview({ market = "bangalore" }: Props) {
  void market;
  const city = "Bangalore";

  return (
    <section className="section-padding bg-[#f3f3f1]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl md:mb-14">
          <p className="mb-4 font-sans text-[10px] font-medium uppercase tracking-[0.27em] text-[#5e5e5e]">Pricing</p>
          <h2 className="font-sans text-4xl font-light leading-[1.03] tracking-[-0.055em] text-[#171717] md:text-6xl">Travel Packages from {city}</h2>
          <p className="mt-5 font-sans text-sm leading-relaxed text-muted-foreground md:text-base">Compare Umrah options for individuals, families, and private groups. Your travel dates, hotel preferences, and room arrangements shape the final quote.</p>
        </div>

        <div className="grid gap-3 md:grid-cols-3 md:gap-4">
          {packages.map((item, index) => (
            <Link href={item.href} key={item.name} className={`group flex min-h-[17rem] flex-col rounded-[1.35rem] border p-6 transition-transform duration-300 hover:-translate-y-1 ${index === 1 ? "border-[#171717] bg-[#171717] text-white shadow-[0_18px_40px_rgba(0,0,0,0.16)]" : "border-black/10 bg-white shadow-[0_10px_26px_rgba(0,0,0,0.055)]"}`}>
              <div className="flex items-start justify-between gap-4">
                <p className={`font-sans text-[10px] font-medium uppercase tracking-[0.25em] ${index === 1 ? "text-white/55" : "text-[#666]"}`}>0{index + 1} · {item.name}</p>
                <ArrowUpRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${index === 1 ? "text-white/80" : "text-black/60"}`} />
              </div>
              <h3 className={`mt-9 font-sans text-[1.7rem] font-light leading-[1.05] tracking-[-0.045em] ${index === 1 ? "text-white" : "text-[#171717]"}`}>{item.price}</h3>
              <p className={`mt-auto pt-8 font-sans text-sm leading-relaxed ${index === 1 ? "text-white/65" : "text-muted-foreground"}`}>{item.desc}</p>
            </Link>
          ))}
        </div>

        <p className="mt-5 text-center font-sans text-xs leading-relaxed text-muted-foreground">Prices and inclusions depend on travel dates, airline availability, hotel selection, room sharing, and applicable approvals. Your written quotation confirms what is included.</p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Link
            href="/bangalore/travel-package-guide"
            className="inline-flex min-w-0 items-center justify-center gap-2 rounded-lg border border-black/15 bg-white px-3 py-3.5 text-center font-sans text-xs font-medium text-[#171717] transition-colors hover:border-black/40 sm:px-5 sm:text-sm"
          >
            View Package Guide <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-w-0 items-center justify-center gap-2 rounded-lg bg-[#171717] px-3 py-3.5 text-center font-sans text-xs font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_10px_22px_rgba(0,0,0,0.16)] sm:px-5 sm:text-sm"
          >
            Request Travel Quote <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
