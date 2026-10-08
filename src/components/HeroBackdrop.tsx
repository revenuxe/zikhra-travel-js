/** Shared decorative photo treatment for public-page heroes. */
export default function HeroBackdrop({ image = "/travel/makkah.webp" }: { image?: string }) {
  return <>
    <img src={image} alt="" width={1600} height={1200} fetchPriority="high" decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.58] sm:opacity-[0.54]" />
    <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(248,248,247,0.82)_0%,rgba(248,248,247,0.72)_45%,rgba(248,248,247,0.48)_100%)]" />
    <div className="absolute -right-32 top-1/3 -z-10 h-80 w-80 rounded-full bg-white/40 blur-3xl" />
  </>;
}
