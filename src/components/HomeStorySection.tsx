import Link from "next/link";
import type { MarketId } from "@/lib/market-types";
import { projectsIndexPath, servicesIndexPath } from "@/lib/marketing-paths";

type Props = {
  market?: MarketId;
  /** When set, localises the story heading for area SEO pages. */
  areaName?: string;
};

/** Editorial copy: reinforces the hero H1 and adds depth for SEO without changing the hero layout. */
const HomeStorySection = ({ market = "bangalore", areaName }: Props) => {
  void market;

  return (
    <section className="section-padding bg-luxury-dark/30 border-y border-border/40">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <p className="text-xs font-sans tracking-[0.3em] uppercase text-gold mb-4 text-center">Our Approach</p>
        <h2 className="font-serif text-2xl md:text-3xl gold-text text-center mb-8">
          {areaName
            ? `Planning meaningful journeys in ${areaName}, Bangalore`
            : "Planning meaningful journeys from Bangalore"}
        </h2>

        <div className="space-y-5 font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
          <p>At Zikhra, <strong className="text-foreground font-medium">meaningful journeys begin with thoughtful planning</strong>. We help you discuss Umrah, Hajj enquiries, and Muslim-friendly travel from <strong className="text-foreground font-medium">Bangalore</strong>, with attention to the practical details that let you focus on your journey.</p>
          <p>Whether you are in <strong className="text-foreground font-medium">Koramangala</strong>, <strong className="text-foreground font-medium">Indiranagar</strong>, <strong className="text-foreground font-medium">Whitefield</strong>, <strong className="text-foreground font-medium">HSR Layout</strong>, or along <strong className="text-foreground font-medium">Sarjapur Road</strong>, start by sharing your preferred dates, departure city, group size, and budget.</p>
          <p>Your time in <strong className="text-foreground font-medium">Makkah and Madinah</strong> deserves a considered plan. Discuss accommodation locations, walking distances, room sharing, meals, and transport before choosing a package. Families can raise questions about children, older relatives, and mobility needs early.</p>
          <p>For <strong className="text-foreground font-medium">Hajj enquiries</strong>, ask about the current season and authorised booking route. Places and arrangements depend on official eligibility, quota, permits, and approvals. A travel enquiry does not confirm a Hajj booking or visa.</p>
          <p>Explore our <Link href={projectsIndexPath("bangalore")} className="text-gold hover:underline">illustrative itineraries</Link>, review <Link href={servicesIndexPath("bangalore")} className="text-gold hover:underline">Umrah and travel services</Link>, return to the <Link href="/" className="text-gold hover:underline">Zikhra homepage</Link>, or <Link href="/contact" className="text-gold hover:underline">send your enquiry</Link> for a personalised written quotation.</p>
        </div>
      </div>
    </section>
  );
};

export default HomeStorySection;
