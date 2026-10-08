
/** Bangalore funnel copy with real neighbourhoods for /bangalore/journeys. */
export type ProjectBangaloreCopy = {
  location: string;
  description: string;
  highlights: string[];
};

export type ProjectItem = {
  slug: string;
  title: string;
  location: string;
  budget: string;
  duration: string;
  heroImage: string;
  description: string;
  highlights: string[];
  scope: string[];
  bangalore?: ProjectBangaloreCopy;
};

export const projects: ProjectItem[] = [
  {
    "slug": "classic-umrah",
    "title": "Classic Umrah Itinerary",
    "location": "Makkah & Madinah, Saudi Arabia",
    "budget": "Request a current quote",
    "duration": "Dates on request",
    "heroImage": "/travel/makkah.webp",
    "description": "Plan your Umrah around your dates, budget, and pace. Compare accommodation, transport, and practical support before choosing the itinerary that suits you. This is an illustrative itinerary, not a record of a completed trip. Dates, length of stay, hotels, and all services are confirmed in your individual quotation.",
    "highlights": [
      "Makkah and Madinah itinerary planning",
      "Hotel and room-sharing options",
      "Flight options from your departure city",
      "Airport and intercity transfer options"
    ],
    "scope": [
      "Makkah and Madinah itinerary planning",
      "Hotel and room-sharing options",
      "Flight options from your departure city",
      "Airport and intercity transfer options",
      "Pre-departure document checklist",
      "Written inclusions and exclusions"
    ],
    "bangalore": {
      "location": "Departures from Bangalore",
      "description": "Plan your Umrah around your dates, budget, and pace. Compare accommodation, transport, and practical support before choosing the itinerary that suits you. This is an illustrative itinerary, not a record of a completed trip. Dates, length of stay, hotels, and all services are confirmed in your individual quotation.",
      "highlights": [
        "Makkah and Madinah itinerary planning",
        "Hotel and room-sharing options",
        "Flight options from your departure city",
        "Airport and intercity transfer options"
      ]
    }
  },
  {
    "slug": "private-family-umrah",
    "title": "Private Family Umrah",
    "location": "Makkah & Madinah, Saudi Arabia",
    "budget": "Request a current quote",
    "duration": "Dates on request",
    "heroImage": "/travel/madinah.webp",
    "description": "Plan a family Umrah with room arrangements, manageable transfers, and a pace suited to children and older relatives. Tell us about your group so the practical details can be discussed early. This is an illustrative itinerary, not a record of a completed trip. Dates, length of stay, hotels, and all services are confirmed in your individual quotation.",
    "highlights": [
      "Family room enquiries",
      "Child and infant travel requirements",
      "Room-sharing preferences",
      "Transfer planning for the group"
    ],
    "scope": [
      "Family room enquiries",
      "Child and infant travel requirements",
      "Room-sharing preferences",
      "Transfer planning for the group",
      "Walking-distance discussion",
      "Mobility needs reviewed before booking"
    ],
    "bangalore": {
      "location": "Departures from Bangalore",
      "description": "Plan a family Umrah with room arrangements, manageable transfers, and a pace suited to children and older relatives. Tell us about your group so the practical details can be discussed early. This is an illustrative itinerary, not a record of a completed trip. Dates, length of stay, hotels, and all services are confirmed in your individual quotation.",
      "highlights": [
        "Family room enquiries",
        "Child and infant travel requirements",
        "Room-sharing preferences",
        "Transfer planning for the group"
      ]
    }
  },
  {
    "slug": "makkah-madinah",
    "title": "Makkah & Madinah Journey",
    "location": "Makkah & Madinah, Saudi Arabia",
    "budget": "Request a current quote",
    "duration": "Dates on request",
    "heroImage": "/travel/makkah.webp",
    "description": "Discuss a private itinerary for your household or small group, with flexible travel dates and preferred accommodation. Each requested service is checked for availability before confirmation. This is an illustrative itinerary, not a record of a completed trip. Dates, length of stay, hotels, and all services are confirmed in your individual quotation.",
    "highlights": [
      "Flexible date enquiries",
      "Private transfer options",
      "Hotel preference discussion",
      "Room configuration planning"
    ],
    "scope": [
      "Flexible date enquiries",
      "Private transfer options",
      "Hotel preference discussion",
      "Room configuration planning",
      "Tailored itinerary requests",
      "Clear service-by-service quotation"
    ],
    "bangalore": {
      "location": "Departures from Bangalore",
      "description": "Discuss a private itinerary for your household or small group, with flexible travel dates and preferred accommodation. Each requested service is checked for availability before confirmation. This is an illustrative itinerary, not a record of a completed trip. Dates, length of stay, hotels, and all services are confirmed in your individual quotation.",
      "highlights": [
        "Flexible date enquiries",
        "Private transfer options",
        "Hotel preference discussion",
        "Room configuration planning"
      ]
    }
  },
  {
    "slug": "ramadan-umrah",
    "title": "Ramadan Umrah Enquiry",
    "location": "Makkah & Madinah, Saudi Arabia",
    "budget": "Request a current quote",
    "duration": "Dates on request",
    "heroImage": "/travel/madinah.webp",
    "description": "Enquire early about Ramadan travel dates, hotel preferences, and room arrangements. Busy periods can affect availability, transport, and pricing, so all details are confirmed in writing. This is an illustrative itinerary, not a record of a completed trip. Dates, length of stay, hotels, and all services are confirmed in your individual quotation.",
    "highlights": [
      "Ramadan date enquiries",
      "Hotel availability checks",
      "Meal-plan discussion",
      "Room-sharing options"
    ],
    "scope": [
      "Ramadan date enquiries",
      "Hotel availability checks",
      "Meal-plan discussion",
      "Room-sharing options",
      "Transfer scheduling",
      "Written booking and cancellation terms"
    ],
    "bangalore": {
      "location": "Departures from Bangalore",
      "description": "Enquire early about Ramadan travel dates, hotel preferences, and room arrangements. Busy periods can affect availability, transport, and pricing, so all details are confirmed in writing. This is an illustrative itinerary, not a record of a completed trip. Dates, length of stay, hotels, and all services are confirmed in your individual quotation.",
      "highlights": [
        "Ramadan date enquiries",
        "Hotel availability checks",
        "Meal-plan discussion",
        "Room-sharing options"
      ]
    }
  },
  {
    "slug": "small-group-umrah",
    "title": "Small Group Umrah",
    "location": "Makkah & Madinah, Saudi Arabia",
    "budget": "Request a current quote",
    "duration": "Dates on request",
    "heroImage": "/travel/makkah.webp",
    "description": "Explore group travel options with a defined departure plan and shared arrangements. Group size, language support, and any tour leader services are confirmed in your quotation. This is an illustrative itinerary, not a record of a completed trip. Dates, length of stay, hotels, and all services are confirmed in your individual quotation.",
    "highlights": [
      "Group departure enquiries",
      "Shared accommodation options",
      "Coordinated transfer options",
      "Group itinerary briefing"
    ],
    "scope": [
      "Group departure enquiries",
      "Shared accommodation options",
      "Coordinated transfer options",
      "Group itinerary briefing",
      "Meal-plan discussion",
      "Tour leader availability on request"
    ],
    "bangalore": {
      "location": "Departures from Bangalore",
      "description": "Explore group travel options with a defined departure plan and shared arrangements. Group size, language support, and any tour leader services are confirmed in your quotation. This is an illustrative itinerary, not a record of a completed trip. Dates, length of stay, hotels, and all services are confirmed in your individual quotation.",
      "highlights": [
        "Group departure enquiries",
        "Shared accommodation options",
        "Coordinated transfer options",
        "Group itinerary briefing"
      ]
    }
  },
  {
    "slug": "muslim-friendly-holiday",
    "title": "Muslim-Friendly Holiday",
    "location": "Destination on request",
    "budget": "Request a current quote",
    "duration": "Dates on request",
    "heroImage": "/travel/madinah.webp",
    "description": "Discuss leisure travel with halal dining preferences, prayer-time flexibility, and family needs. Destination services and specific facilities are checked as part of itinerary planning. This is an illustrative itinerary, not a record of a completed trip. Dates, length of stay, hotels, and all services are confirmed in your individual quotation.",
    "highlights": [
      "Destination and budget discussion",
      "Halal dining enquiries",
      "Prayer facility enquiries",
      "Family accommodation options"
    ],
    "scope": [
      "Destination and budget discussion",
      "Halal dining enquiries",
      "Prayer facility enquiries",
      "Family accommodation options",
      "Private itinerary requests",
      "Local service availability checks"
    ],
    "bangalore": {
      "location": "Departures from Bangalore",
      "description": "Discuss leisure travel with halal dining preferences, prayer-time flexibility, and family needs. Destination services and specific facilities are checked as part of itinerary planning. This is an illustrative itinerary, not a record of a completed trip. Dates, length of stay, hotels, and all services are confirmed in your individual quotation.",
      "highlights": [
        "Destination and budget discussion",
        "Halal dining enquiries",
        "Prayer facility enquiries",
        "Family accommodation options"
      ]
    }
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}
