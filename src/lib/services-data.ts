
export type ServiceItem = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  price: string;
};

export const services: ServiceItem[] = [
  {
    "id": "umrah-packages",
    "image": "/travel/makkah.webp",
    "title": "Umrah Packages",
    "subtitle": "A considered journey to Makkah and Madinah",
    "description": "Plan your Umrah around your dates, budget, and pace. Compare accommodation, transport, and practical support before choosing the itinerary that suits you.",
    "features": [
      "Makkah and Madinah itinerary planning",
      "Hotel and room-sharing options",
      "Flight options from your departure city",
      "Airport and intercity transfer options",
      "Pre-departure document checklist",
      "Written inclusions and exclusions"
    ],
    "price": "Request a current quote"
  },
  {
    "id": "hajj-enquiries",
    "image": "/travel/hajj.webp",
    "title": "Hajj Enquiries",
    "subtitle": "Prepare for the journey of a lifetime",
    "description": "Start with a careful discussion of the current Hajj season, eligibility, and authorised arrangements. Places, permits, and services must be confirmed through the applicable official booking route.",
    "features": [
      "Current-season enquiry support",
      "Authorised booking route information",
      "Eligibility and document discussion",
      "Accommodation and transport questions",
      "Preparation and packing guidance",
      "Availability subject to official approvals"
    ],
    "price": "Request a current quote"
  },
  {
    "id": "family-umrah",
    "image": "/travel/madinah.webp",
    "title": "Family Umrah",
    "subtitle": "Travel together with thoughtful planning",
    "description": "Plan a family Umrah with room arrangements, manageable transfers, and a pace suited to children and older relatives. Tell us about your group so the practical details can be discussed early.",
    "features": [
      "Family room enquiries",
      "Child and infant travel requirements",
      "Room-sharing preferences",
      "Transfer planning for the group",
      "Walking-distance discussion",
      "Mobility needs reviewed before booking"
    ],
    "price": "Request a current quote"
  },
  {
    "id": "group-umrah",
    "image": "/travel/madinah.webp",
    "title": "Group Umrah",
    "subtitle": "Shared journeys with a clear itinerary",
    "description": "Explore group travel options with a defined departure plan and shared arrangements. Group size, language support, and any tour leader services are confirmed in your quotation.",
    "features": [
      "Group departure enquiries",
      "Shared accommodation options",
      "Coordinated transfer options",
      "Group itinerary briefing",
      "Meal-plan discussion",
      "Tour leader availability on request"
    ],
    "price": "Request a current quote"
  },
  {
    "id": "private-umrah",
    "image": "/travel/makkah.webp",
    "title": "Private Umrah",
    "subtitle": "A journey planned around your pace",
    "description": "Discuss a private itinerary for your household or small group, with flexible travel dates and preferred accommodation. Each requested service is checked for availability before confirmation.",
    "features": [
      "Flexible date enquiries",
      "Private transfer options",
      "Hotel preference discussion",
      "Room configuration planning",
      "Tailored itinerary requests",
      "Clear service-by-service quotation"
    ],
    "price": "Request a current quote"
  },
  {
    "id": "makkah-madinah-stays",
    "image": "/travel/madinah.webp",
    "title": "Makkah & Madinah Stays",
    "subtitle": "Accommodation choices for your journey",
    "description": "Compare hotel options by location, room type, budget, and accessibility. Exact hotel names, availability, and distance information must be confirmed before you book.",
    "features": [
      "Named hotel options",
      "Room occupancy details",
      "Location and access discussion",
      "Meal-plan options",
      "Check-in and check-out information",
      "Availability confirmed in writing"
    ],
    "price": "Request a current quote"
  },
  {
    "id": "flights-transfers",
    "image": "/travel/hajj.webp",
    "title": "Flights & Transfers",
    "subtitle": "Connect every stage of your itinerary",
    "description": "Coordinate flight options and ground travel for a more organised journey. Review baggage allowances, transit arrangements, and transfer details with the confirmed providers.",
    "features": [
      "Departure city options",
      "Airline and baggage details",
      "Airport transfer enquiries",
      "Makkah–Madinah travel options",
      "Private or shared transport choices",
      "Timings confirmed before departure"
    ],
    "price": "Request a current quote"
  },
  {
    "id": "visa-assistance",
    "image": "/travel/makkah.webp",
    "title": "Visa Assistance",
    "subtitle": "Practical help with the application process",
    "description": "Discuss the documents and application steps relevant to your proposed journey. Assistance does not guarantee approval; visa decisions are made by the relevant authorities.",
    "features": [
      "Application checklist discussion",
      "Passport detail review",
      "Document preparation support",
      "Application route information",
      "Status follow-up where available",
      "Authority approval required"
    ],
    "price": "Request a current quote"
  },
  {
    "id": "ziyarat",
    "image": "/travel/ramadan.webp",
    "title": "Ziyarat Enquiries",
    "subtitle": "Discover places of Islamic heritage",
    "description": "Ask about local ziyarat options in Makkah and Madinah. Visits, transport, guide availability, and access are subject to local conditions and the confirmed itinerary.",
    "features": [
      "Makkah ziyarat options",
      "Madinah ziyarat options",
      "Local transport enquiries",
      "Guide and language enquiries",
      "Visit timings discussed in advance",
      "Access subject to local permissions"
    ],
    "price": "Request a current quote"
  },
  {
    "id": "ramadan-umrah",
    "image": "/travel/ramadan.webp",
    "title": "Ramadan Umrah",
    "subtitle": "Plan ahead for a special time",
    "description": "Enquire early about Ramadan travel dates, hotel preferences, and room arrangements. Busy periods can affect availability, transport, and pricing, so all details are confirmed in writing.",
    "features": [
      "Ramadan date enquiries",
      "Hotel availability checks",
      "Meal-plan discussion",
      "Room-sharing options",
      "Transfer scheduling",
      "Written booking and cancellation terms"
    ],
    "price": "Request a current quote"
  },
  {
    "id": "muslim-friendly-holidays",
    "image": "/travel/makkah.webp",
    "title": "Muslim-Friendly Holidays",
    "subtitle": "Explore with your travel preferences in mind",
    "description": "Discuss leisure travel with halal dining preferences, prayer-time flexibility, and family needs. Destination services and specific facilities are checked as part of itinerary planning.",
    "features": [
      "Destination and budget discussion",
      "Halal dining enquiries",
      "Prayer facility enquiries",
      "Family accommodation options",
      "Private itinerary requests",
      "Local service availability checks"
    ],
    "price": "Request a current quote"
  }
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.id === slug) ?? null;
}
