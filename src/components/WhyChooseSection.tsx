import { Shield, Zap, Gem, BadgeCheck } from "lucide-react";
import type { MarketId } from "@/lib/market-types";
import { getMarketCopy } from "@/lib/market-copy";

const icons = [Shield, Zap, Gem, BadgeCheck] as const;

type Props = { market?: MarketId };

const WhyChooseSection = ({ market = "bangalore" }: Props) => {
  const copy = getMarketCopy(market);
  const points = copy.whyPoints.map((pt, i) => ({ ...pt, icon: icons[i] ?? Shield }));
  return (
    <section className="section-padding bg-luxury-dark">
      <div className="text-center mb-10">
        <p className="text-xs font-sans tracking-[0.3em] uppercase text-gold mb-3">Why Us</p>
        <h2 className="font-serif text-3xl md:text-4xl gold-text">{copy.whyTitle}</h2>
      </div>

      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        {points.map((pt) => (
          <div key={pt.title} className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border/50">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
              <pt.icon className="w-4 h-4 text-primary-foreground" aria-hidden />
            </div>
            <div>
              <h3 className="font-serif text-base text-foreground mb-1">{pt.title}</h3>
              <p className="text-sm font-sans text-muted-foreground">{pt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseSection;
