"use client";

import { Star } from "lucide-react";
import { useState, useMemo } from "react";
import type { MarketId } from "@/lib/market-types";
import { getMarketCopy } from "@/lib/market-copy";

type Props = { market?: MarketId };

const Testimonials = ({ market = "bangalore" }: Props) => {
  const copy = getMarketCopy(market);
  const testimonials = useMemo(() => copy.testimonials, [copy.testimonials]);
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding">
      <div className="text-center mb-10">
        <p className="text-xs font-sans tracking-[0.3em] uppercase text-gold mb-3">Travel Notes</p>
        <h2 className="font-serif text-3xl md:text-4xl gold-text">{copy.testimonialsTitle}</h2>
      </div>

      <div className="mx-auto max-w-md text-center md:hidden">
        <div className="flex justify-center gap-1 mb-5">
          {Array.from({ length: testimonials[active].rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-gold text-gold" />
          ))}
        </div>
        <p className="font-sans text-foreground/90 text-base italic leading-relaxed mb-4">
          "{testimonials[active].quote}"
        </p>
        <div className="w-10 h-10 rounded-full gold-gradient mx-auto flex items-center justify-center mb-2">
          <span className="font-serif text-sm text-primary-foreground">{testimonials[active].name[0]}</span>
        </div>
        <p className="font-sans text-sm text-gold">{testimonials[active].name}</p>
        <p className="font-sans text-xs text-muted-foreground mt-0.5">{testimonials[active].location}</p>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Show travel note ${i + 1}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 gold-gradient" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto hidden max-w-6xl grid-cols-3 gap-5 md:grid">
        {testimonials.map((testimonial) => (
          <article key={`${testimonial.name}-${testimonial.location}`} className="flex min-h-64 flex-col rounded-2xl border border-border/50 bg-card p-7 text-center shadow-[0_10px_24px_rgba(0,0,0,0.055)]">
            <div className="mb-5 flex justify-center gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
            </div>
            <p className="font-sans text-base italic leading-relaxed text-foreground/90">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="mt-auto pt-6">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full gold-gradient">
                <span className="font-serif text-sm text-primary-foreground">{testimonial.name[0]}</span>
              </div>
              <p className="font-sans text-sm text-gold">{testimonial.name}</p>
              <p className="mt-0.5 font-sans text-xs text-muted-foreground">{testimonial.location}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
