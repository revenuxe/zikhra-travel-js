"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Minus, Plus, SlidersHorizontal, Users } from "lucide-react";
import HeroBackdrop from "@/components/HeroBackdrop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { travellerSummary, type Travellers } from "@/lib/travel-packages";
import { useTravelCatalogue, flightSchema, type CmsCategory, type CmsPackage, type FlightOption, type TravelCatalogueData } from "@/lib/travel-cms";
type Category = string;
const money = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const dateLabel = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const field = "mt-1 w-full rounded-xl border border-black/10 bg-white p-2.5 text-sm text-[#171717] focus:ring-2 focus:ring-gold/40";
function FlightOptions({ options, selected, onSelect }: { options: FlightOption[]; selected: string; onSelect: (id: string) => void }) {
  const row = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  useEffect(() => {
    const element = row.current;
    if (!element) return;
    const update = () => setEdges({ left: element.scrollLeft > 2, right: element.scrollWidth - element.clientWidth - element.scrollLeft > 2 });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); element.removeEventListener("scroll", update); };
  }, [options.length]);
  return <div className="relative mb-3">
    <div ref={row} className="hide-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto" aria-label="Airline options">
      {options.map(o => <button key={o.id} aria-pressed={selected === o.id} onClick={event => { onSelect(o.id); event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" }); }} className={`min-w-[160px] flex-1 shrink-0 snap-start rounded-xl border px-3 py-2 text-left ${selected === o.id ? "border-[#b59a62] bg-[#f3efe6]" : "border-black/10"}`}><span className="flex items-center justify-between gap-1 text-xs">{o.airline}{selected === o.id && <Check size={13} />}</span><span className="mt-1 block text-sm font-semibold">{money(o.rate)}</span></button>)}
    </div>
    {edges.left && <div className="pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center bg-gradient-to-r from-white to-transparent"><button aria-label="Previous flight options" onClick={() => row.current?.scrollBy({ left: -180, behavior: "smooth" })} className="pointer-events-auto -ml-2 rounded-full border border-black/10 bg-white p-1.5 shadow-sm"><ChevronLeft size={14} /></button></div>}
    {edges.right && <div className="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-end bg-gradient-to-l from-white to-transparent"><button aria-label="More flight options" onClick={() => row.current?.scrollBy({ left: 180, behavior: "smooth" })} className="pointer-events-auto -mr-2 rounded-full border border-black/10 bg-white p-1.5 shadow-sm"><ChevronRight size={14} /></button></div>}
  </div>;
}
export default function PackageExplorer({ initialCategory = "all", initialPackageId = "", initialPackageSlug = "", initialCatalogue }: { initialCategory?: Category; initialPackageId?: string; initialPackageSlug?: string; initialCatalogue?: TravelCatalogueData }) {
  const catalogue = useTravelCatalogue(initialCatalogue);
  if (catalogue.loading || catalogue.error) return <><Header /><main className="min-h-[60vh] px-6 pt-32 text-center"><p>{catalogue.loading ? "Loading packages…" : catalogue.error}</p>{catalogue.error && <button className="mt-4 underline" onClick={() => window.location.reload()}>Retry</button>}</main><Footer /><BottomNav /></>;
  const requested = initialPackageSlug ? catalogue.packages.find(pkg => pkg.slug === initialPackageSlug) : undefined;
  if (initialPackageSlug && !requested) return <><Header /><main className="min-h-[60vh] px-6 pt-32 text-center"><h1 className="text-2xl">Package unavailable</h1><p className="mt-3">This package is no longer published. Explore our current options.</p><Link href="/bangalore/packages" className="mt-4 inline-block underline">Explore Packages</Link></main><Footer /><BottomNav /></>;
  const category = requested ? catalogue.categories.find(c => c.id === requested.category_id)?.slug || initialCategory : initialCategory;
  return <CatalogueExplorer initialCategory={category} initialPackageId={requested?.id || initialPackageId} categories={catalogue.categories} packages={catalogue.packages} />;
}
function CatalogueExplorer({initialCategory, initialPackageId, categories, packages}: {initialCategory: Category; initialPackageId: string; categories: CmsCategory[]; packages: CmsPackage[]}) {
  const packageCategories = [{id:"all", label:"All packages", image:"/travel/makkah.webp"}, ...categories.map(c => ({id:c.slug,label:c.name,image:c.image_url}))];
  const [selectedId,setSelectedId]=useState(initialPackageId);
  const [category, setCategory] = useState<Category>(initialCategory);
  const [travellers, setTravellers] = useState<Travellers>({ adults: 2, children: 0, infants: 0, seniors: 0 });
  const [optionId, setOptionId] = useState("express");
  const [departure, setDeparture] = useState("");

  const [city, setCity] = useState("Bangalore");
  const [airlineFilter, setAirlineFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const showPackageLoader = () => {
    window.dispatchEvent(new Event("zikhra:page-loading"));
    window.setTimeout(() => window.dispatchEvent(new Event("zikhra:page-loaded")), 450);
  };
  useEffect(() => {
    const read = () => { const id = new URLSearchParams(window.location.search).get("journey"); setCategory(packageCategories.some(c => c.id === id) ? id as Category : initialCategory); };
    read(); window.addEventListener("popstate", read); return () => window.removeEventListener("popstate", read);
  }, [initialCategory]);
  const matches = packages.filter(p => category === "all" || categories.find(c => c.id === p.category_id)?.slug === category);
  const selected = matches.find(p=>p.id===selectedId) ?? matches[0];
  const pkg = selected ? { ...selected, image:selected.image_url, hotels:selected.hotel_details, options:flightSchema.parse(selected.options) } : { name:"Your journey", image:"/travel/makkah.webp", image_alt:"Makkah", hotels:"", inclusions:[], exclusions:[], itinerary:[], options:[] as FlightOption[], sharing:"", terms:"", destinations:"", description:"", duration_days:null };
  const room = pkg.sharing;
  useEffect(()=>{if(selected)setCity(selected.departure_city);},[selected?.id]);
  useEffect(()=>{const slug=new URLSearchParams(window.location.search).get("package");const item=packages.find(p=>p.slug===slug);if(item)setSelectedId(item.id);},[packages]);
  const choose = (id: Category) => { if (id === category) return; showPackageLoader(); setCategory(id); const url = new URL(window.location.href); if (id === "all") url.searchParams.delete("journey"); else url.searchParams.set("journey", id); window.history.replaceState(null, "", url); };
  const options = pkg.options.filter(o => (airlineFilter === "all" || o.id === airlineFilter) && (!dateFilter || o.dates.includes(dateFilter)));
  const option = options.find(o => o.id === optionId) ?? options[0] ?? pkg.options[0] ?? {id:"",airline:"",rate:0,dates:[]};
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const dates = option.dates.filter(d => d >= today && (!dateFilter || d === dateFilter)).sort();
  const selectedDate = dates.includes(departure) ? departure : dates[0];
  const journeyCategories = category === "all" ? packageCategories : packageCategories.filter(item => item.id === category);
  const journeyTitle = category === "all" ? "Your next journey" : category === "classic" ? "Umrah Tour Package" : packageCategories.find(item => item.id === category)?.label ?? "Your journey";
  const available = Boolean(selected) && options.length > 0;
  const filterCount = Number(airlineFilter !== "all") + Number(Boolean(dateFilter));
  const reset = () => { setAirlineFilter("all"); setDateFilter(""); };
  const message = `Assalamu alaikum, I am interested in Zikhra's ${pkg.name}, ${option.airline} at ${money(option.rate)} per adult, ${room}. Departure: ${selectedDate ? dateLabel(selectedDate) : "To discuss"}, from ${city.trim() || "To discuss"}. Travellers: ${travellerSummary(travellers)} (${travellers.seniors} seniors included in adults). Adult subtotal: ${money(option.rate * travellers.adults)}. Please confirm availability, duration, hotels, flight routing, child/infant prices, exclusions and final booking terms.`;
  const contact = `/contact?${new URLSearchParams({ package: `${pkg.name} · ${option.airline}`, packageId: selected?.id || "", packageName: pkg.name, journey: /umrah/i.test(categories.find(c => c.id === selected?.category_id)?.name || "") || categories.find(c => c.id === selected?.category_id)?.slug === "family" ? "Umrah" : categories.find(c => c.id === selected?.category_id)?.name || "Travel enquiry", flightId: option.id, airline: option.airline, sharing: room, rate: String(option.rate), message, departure: selectedDate ?? "", travellers: String(travellers.adults + travellers.children + travellers.infants), city: city.trim() })}`;
  const update = (key: keyof Travellers, change: number) => setTravellers(t => { const next = { ...t, [key]: Math.max(key === "adults" ? 1 : 0, Math.min(20, t[key] + change)) }; next.seniors = Math.min(next.seniors, next.adults); return next; });
  return <><Header /><main className="bg-[#f8f8f6] pb-24 pt-24 text-[#171717] md:pt-28"><div className="mx-auto max-w-6xl space-y-5 px-4 sm:px-6">
    <section className="relative isolate overflow-hidden rounded-3xl bg-[#f8f8f7] px-5 py-5 text-[#171717] sm:px-8 sm:py-6">
      <HeroBackdrop image={pkg.image} />
      <div className="relative"><Link href="/" className="inline-flex items-center gap-2 text-xs text-[#525252]"><ArrowLeft size={13} />Back to Zikhra</Link><h1 className="mb-1 mt-3 font-display text-4xl sm:text-5xl">{journeyTitle}</h1><p className="text-sm text-[#525252]">{category === "all" || category === "classic" || category === "family" ? "Makkah & Madinah. Thoughtfully arranged." : "Your dates, your preferences. Thoughtfully planned."}</p>
      <Sheet><SheetTrigger asChild><button className="mt-4 inline-flex items-center gap-2 rounded-full border border-black/20 px-3 py-2 text-xs"><Users size={15} />{travellerSummary(travellers)}<span className="text-[#65512b]">Edit</span></button></SheetTrigger><SheetContent className="w-full overflow-y-auto sm:max-w-md"><SheetTitle>Your travellers</SheetTitle><SheetDescription>Seniors are included in the adult count.</SheetDescription><div className="my-6 space-y-5">{([ ["adults", "Adults", "12 years and above"], ["children", "Children", "2–11 years"], ["infants", "Infants", "Under 2 years"], ["seniors", "Senior adults", "Included in adults"] ] as const).map(([key, title, hint]) => <div key={key} className="flex items-center justify-between gap-3"><div><p className="text-sm font-medium">{title}</p><p className="text-xs text-black/50">{hint}</p></div><div className="flex items-center gap-3"><button aria-label={`Remove ${title}`} disabled={travellers[key] <= (key === "adults" ? 1 : 0)} onClick={() => update(key, -1)} className="rounded-full border p-2 disabled:opacity-30"><Minus size={14} /></button><span className="w-5 text-center">{travellers[key]}</span><button aria-label={`Add ${title}`} disabled={travellers[key] >= (key === "seniors" ? travellers.adults : 20)} onClick={() => update(key, 1)} className="rounded-full border p-2 disabled:opacity-30"><Plus size={14} /></button></div></div>)}</div><SheetClose asChild><button className="w-full rounded-xl bg-[#171717] p-3 text-sm text-white">Done</button></SheetClose></SheetContent></Sheet></div>
    </section>
    <section aria-label="Choose your journey"><h2 className="mb-3 text-sm font-medium">Choose your journey</h2><div className="hide-scrollbar flex snap-x gap-3 overflow-x-auto pb-2" data-testid="journey-scroll">{journeyCategories.map((c, i) => <button key={c.id} onClick={() => choose(c.id)} aria-pressed={category === c.id} className={`flex shrink-0 snap-start items-center gap-3 rounded-2xl border px-3 py-3 text-left ${category === c.id ? "border-[#b59a62] bg-[#ede8dd]" : "border-black/10 bg-white"}`}><img src={c.image || "/travel/makkah.webp"} alt="" className="h-10 w-10 rounded-xl object-cover" /><span className="text-sm">{c.label}<span className="mt-0.5 block text-[11px] text-black/50">{(() => { const count=packages.filter(p=>c.id==="all"||categories.find(cat=>cat.id===p.category_id)?.slug===c.id).length;return count ? `${count} package${count===1?"":"s"}` : "Enquire with us"; })()}</span></span></button>)}</div></section>
    <section aria-label="Available packages"><div className="mb-3 flex items-center justify-between"><h2 className="font-display text-2xl">{available ? "Choose your package" : "Plan your journey"}</h2>
      <Sheet><SheetTrigger asChild><button aria-label="Filter packages" className="relative rounded-full border border-black/10 bg-white p-3"><SlidersHorizontal size={18} />{filterCount > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-[#171717] px-1.5 text-[10px] text-white">{filterCount}</span>}</button></SheetTrigger><SheetContent className="w-full overflow-y-auto sm:max-w-md"><SheetTitle>Filter packages</SheetTitle><SheetDescription>Choose an airline and departure date.</SheetDescription><div className="my-6 space-y-5"><label className="block text-sm">Airline<select aria-label="Airline" className={field} value={airlineFilter} onChange={e => setAirlineFilter(e.target.value)}><option value="all">All airlines</option>{pkg.options.map(o => <option key={o.id} value={o.id}>{o.airline}</option>)}</select></label><label className="block text-sm">Departure date<select aria-label="Departure date" className={field} value={dateFilter} onChange={e => setDateFilter(e.target.value)}><option value="">Any departure</option>{Array.from(new Set(pkg.options.flatMap(o => o.dates))).sort().map(d => <option key={d} value={d}>{dateLabel(d)}</option>)}</select></label><label className="block text-sm">Your departure city<input maxLength={80} className={field} value={city} onChange={e => setCity(e.target.value)} /></label></div><button onClick={reset} className="mb-3 w-full p-2 text-sm underline">Clear filters</button><SheetClose asChild><button className="w-full rounded-xl bg-[#171717] p-3 text-sm text-white">Show results</button></SheetClose></SheetContent></Sheet>
    </div>
    {matches.length > 1 && <div className="hide-scrollbar mb-4 flex gap-2 overflow-x-auto" aria-label="Package selection">{matches.map(item=><button key={item.id} aria-pressed={selected?.id===item.id} onClick={()=>{if(selected?.id===item.id)return;showPackageLoader();setSelectedId(item.id);setOptionId("");setDeparture("");setAirlineFilter("all");setDateFilter("");setCity(item.departure_city);const url=new URL(window.location.href);url.searchParams.set("package",item.slug);window.history.replaceState(null,"",url);}} className={`shrink-0 rounded-xl border px-4 py-2 text-sm ${selected?.id===item.id?"border-[#b59a62] bg-[#f3efe6]":"bg-white"}`}>{item.name}</button>)}</div>}
    {available ? <article className="overflow-hidden rounded-3xl border border-black/10 bg-white md:grid md:grid-cols-[0.75fr_1.25fr]">
      <div className="relative h-24 md:h-auto md:min-h-80"><img src={pkg.image} alt={pkg.image_alt} className="h-full w-full object-cover" /><span className="absolute bottom-3 left-4 rounded-full bg-white/95 px-3 py-1 text-xs">{pkg.destinations}</span></div>
      <div className="p-4 sm:p-6"><div className="mb-3 flex items-start justify-between gap-3"><div><h3 className="font-display text-2xl sm:text-3xl">{pkg.name}</h3><p className="mt-1 text-xs text-black/55">{pkg.description}</p></div><div className="shrink-0 text-right"><p className="text-xl font-semibold">{money(option.rate)}</p><p className="text-[11px] text-black/55">per adult · sharing</p></div></div>
      <FlightOptions options={options} selected={option.id} onSelect={id => { setOptionId(id); setDeparture(""); }} />
      <div><label className="block text-[11px] text-black/55">Departure<select aria-label="Package departure" className={field} value={selectedDate ?? ""} onChange={e => setDeparture(e.target.value)}>{dates.map(d => <option key={d} value={d}>{dateLabel(d)}</option>)}</select></label></div>
      <details className="my-3 border-y border-black/10 py-3"><summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-xs"><span>Inclusions & hotel details</span><span className="flex shrink-0 items-center gap-2"><span className="rounded-full bg-[#f3efe6] px-2 py-1 text-[10px] font-medium text-[#65512b]">{pkg.sharing}</span><ChevronDown size={15} /></span></summary><div className="pt-3 text-xs leading-relaxed text-black/60"><ul className="grid gap-2 sm:grid-cols-2">{pkg.inclusions.map(text => <li key={text} className="flex gap-2"><Check size={13} className="mt-0.5 shrink-0 text-[#9c7f43]" />{text}</li>)}</ul><p className="mt-3">{pkg.hotels}</p>{pkg.duration_days && <p className="mt-2">Duration: {pkg.duration_days} days</p>}{pkg.exclusions.length > 0 && <div className="mt-3"><strong>Exclusions</strong><ul>{pkg.exclusions.map(text=><li key={text}>{text}</li>)}</ul></div>}{pkg.itinerary.length > 0 && <div className="mt-3"><strong>Itinerary</strong><ol>{pkg.itinerary.map((text,i)=><li key={i}>{i+1}. {text}</li>)}</ol></div>}<p className="mt-2">{pkg.sharing}. {pkg.terms}</p></div></details>
      <div className="mb-3 flex items-center justify-between gap-2 text-xs"><span className="text-black/55">{travellers.adults} {travellers.adults === 1 ? "adult" : "adults"} · adult subtotal</span><strong>{money(option.rate * travellers.adults)}</strong></div>
      <div className="flex gap-2"><Link href={contact} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#171717] px-3 py-3 text-sm text-white">Enquire now<ArrowUpRight size={15} /></Link><a href={getWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer" aria-label="Enquire about this package on WhatsApp" className="flex items-center rounded-xl border border-black/15 px-3 text-xs">WhatsApp</a></div><p className="mt-2 text-[10px] text-black/50">Availability & final price confirmed before booking.{travellers.children || travellers.infants ? " Child / infant fares extra." : ""}</p></div>
    </article> : <div className="rounded-3xl border border-black/10 bg-white p-6"><h3 className="font-display text-2xl">{selected && options.length === 0 ? "No matching departure" : "Let’s tailor your journey"}</h3><p className="my-3 text-sm text-black/60">{selected && options.length === 0 ? "Try another date or airline for this package." : "Speak with Zikhra about dates and arrangements for this journey."}</p>{selected && options.length === 0 ? <button className="text-sm underline" onClick={reset}>Reset filters</button> : <Link className="inline-flex rounded-xl bg-[#171717] px-4 py-3 text-sm text-white" href={`/contact?${new URLSearchParams({ package: packageCategories.find(c => c.id === category)?.label ?? "Travel enquiry", message: `Please help me plan ${packageCategories.find(c => c.id === category)?.label}. Travellers: ${travellerSummary(travellers)}. Departure city: ${city}.` })}`}>Discuss your journey</Link>}</div>}
    </section></div></main><Footer /><BottomNav /></>;
}








