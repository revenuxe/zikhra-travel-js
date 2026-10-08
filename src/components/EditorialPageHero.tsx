import HeroBackdrop from "@/components/HeroBackdrop";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  description?: string;
  meta?: ReactNode;
  showCta?: boolean;
  image?: string;
  titleClassName?: string;
};

/** Shared light editorial hero for detail pages. */
export default function EditorialPageHero({ title, description, meta, showCta = true, image, titleClassName }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-[#f8f8f7] pb-12 pt-28 sm:pb-16 sm:pt-32">
      <HeroBackdrop image={image} />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <h1 className={titleClassName ?? "max-w-[11ch] font-sans text-[3.35rem] font-light leading-[0.97] tracking-[-0.07em] text-[#171717] sm:text-6xl md:max-w-[13ch] md:text-7xl lg:text-[5.8rem]"}>
            {title}
          </h1>
          {description ? <p className="mt-8 max-w-xl font-sans text-[1.03rem] font-light leading-[1.72] tracking-[-0.02em] text-[#525252] md:text-[1.15rem]">{description}</p> : null}
          {meta ? <div className="mt-5 font-sans text-sm text-[#5b5b5b]">{meta}</div> : null}
          {showCta ? <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center"><Link href="/contact" className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg bg-[#171717] px-2 py-3.5 text-center font-sans text-xs font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_24px_rgba(0,0,0,0.16)] active:translate-y-0 sm:gap-2 sm:px-5 sm:text-sm">
            Get Free Consultation <ArrowUpRight className="h-4 w-4" />
          </Link><Link href="/bangalore/packages" className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-black/20 bg-white/60 px-2 py-3.5 text-center font-sans text-xs font-medium text-[#171717] transition-colors hover:bg-white sm:gap-2 sm:px-4 sm:text-sm">Explore Packages<ArrowUpRight size={16}/></Link></div> : null}
        </div>
      </div>
    </section>
  );
}
