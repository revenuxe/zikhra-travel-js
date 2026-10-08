
export type PortfolioItem = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  features: string[];
  process: { step: string; desc: string }[];
};

export const portfolioItems: PortfolioItem[] = [
  {
    "slug": "makkah",
    "title": "Makkah",
    "tagline": "Plan your stay near Masjid al-Haram",
    "description": "Plan your Umrah around your dates, budget, and pace. Compare accommodation, transport, and practical support before choosing the itinerary that suits you.",
    "heroImage": "/travel/makkah.webp",
    "galleryImages": [
      "/travel/makkah.webp",
      "/travel/madinah.webp"
    ],
    "features": [
      "Makkah and Madinah itinerary planning",
      "Hotel and room-sharing options",
      "Flight options from your departure city",
      "Airport and intercity transfer options",
      "Pre-departure document checklist",
      "Written inclusions and exclusions"
    ],
    "process": [
      {
        "step": "Discuss",
        "desc": "Share your dates, departure city, group size, and preferences."
      },
      {
        "step": "Compare",
        "desc": "Review itinerary options, accommodation, transport, and costs."
      },
      {
        "step": "Confirm",
        "desc": "Check the written inclusions, exclusions, and booking terms."
      },
      {
        "step": "Prepare",
        "desc": "Review your documents, confirmed travel details, and packing checklist."
      }
    ]
  },
  {
    "slug": "madinah",
    "title": "Madinah",
    "tagline": "Time for reflection in Madinah",
    "description": "Compare hotel options by location, room type, budget, and accessibility. Exact hotel names, availability, and distance information must be confirmed before you book.",
    "heroImage": "/travel/madinah.webp",
    "galleryImages": [
      "/travel/makkah.webp",
      "/travel/madinah.webp"
    ],
    "features": [
      "Named hotel options",
      "Room occupancy details",
      "Location and access discussion",
      "Meal-plan options",
      "Check-in and check-out information",
      "Availability confirmed in writing"
    ],
    "process": [
      {
        "step": "Discuss",
        "desc": "Share your dates, departure city, group size, and preferences."
      },
      {
        "step": "Compare",
        "desc": "Review itinerary options, accommodation, transport, and costs."
      },
      {
        "step": "Confirm",
        "desc": "Check the written inclusions, exclusions, and booking terms."
      },
      {
        "step": "Prepare",
        "desc": "Review your documents, confirmed travel details, and packing checklist."
      }
    ]
  },
  {
    "slug": "umrah-journeys",
    "title": "Umrah Journeys",
    "tagline": "A clear plan from departure to return",
    "description": "Discuss a private itinerary for your household or small group, with flexible travel dates and preferred accommodation. Each requested service is checked for availability before confirmation.",
    "heroImage": "/travel/makkah.webp",
    "galleryImages": [
      "/travel/makkah.webp",
      "/travel/madinah.webp"
    ],
    "features": [
      "Flexible date enquiries",
      "Private transfer options",
      "Hotel preference discussion",
      "Room configuration planning",
      "Tailored itinerary requests",
      "Clear service-by-service quotation"
    ],
    "process": [
      {
        "step": "Discuss",
        "desc": "Share your dates, departure city, group size, and preferences."
      },
      {
        "step": "Compare",
        "desc": "Review itinerary options, accommodation, transport, and costs."
      },
      {
        "step": "Confirm",
        "desc": "Check the written inclusions, exclusions, and booking terms."
      },
      {
        "step": "Prepare",
        "desc": "Review your documents, confirmed travel details, and packing checklist."
      }
    ]
  },
  {
    "slug": "family-travel",
    "title": "Family Travel",
    "tagline": "Thoughtful arrangements for every generation",
    "description": "Plan a family Umrah with room arrangements, manageable transfers, and a pace suited to children and older relatives. Tell us about your group so the practical details can be discussed early.",
    "heroImage": "/travel/madinah.webp",
    "galleryImages": [
      "/travel/makkah.webp",
      "/travel/madinah.webp"
    ],
    "features": [
      "Family room enquiries",
      "Child and infant travel requirements",
      "Room-sharing preferences",
      "Transfer planning for the group",
      "Walking-distance discussion",
      "Mobility needs reviewed before booking"
    ],
    "process": [
      {
        "step": "Discuss",
        "desc": "Share your dates, departure city, group size, and preferences."
      },
      {
        "step": "Compare",
        "desc": "Review itinerary options, accommodation, transport, and costs."
      },
      {
        "step": "Confirm",
        "desc": "Check the written inclusions, exclusions, and booking terms."
      },
      {
        "step": "Prepare",
        "desc": "Review your documents, confirmed travel details, and packing checklist."
      }
    ]
  },
  {
    "slug": "ziyarat-visits",
    "title": "Ziyarat Visits",
    "tagline": "Enquire about local heritage visits",
    "description": "Ask about local ziyarat options in Makkah and Madinah. Visits, transport, guide availability, and access are subject to local conditions and the confirmed itinerary.",
    "heroImage": "/travel/makkah.webp",
    "galleryImages": [
      "/travel/makkah.webp",
      "/travel/madinah.webp"
    ],
    "features": [
      "Makkah ziyarat options",
      "Madinah ziyarat options",
      "Local transport enquiries",
      "Guide and language enquiries",
      "Visit timings discussed in advance",
      "Access subject to local permissions"
    ],
    "process": [
      {
        "step": "Discuss",
        "desc": "Share your dates, departure city, group size, and preferences."
      },
      {
        "step": "Compare",
        "desc": "Review itinerary options, accommodation, transport, and costs."
      },
      {
        "step": "Confirm",
        "desc": "Check the written inclusions, exclusions, and booking terms."
      },
      {
        "step": "Prepare",
        "desc": "Review your documents, confirmed travel details, and packing checklist."
      }
    ]
  },
  {
    "slug": "travel-preparation",
    "title": "Travel Preparation",
    "tagline": "Prepare with confidence",
    "description": "Discuss the documents and application steps relevant to your proposed journey. Assistance does not guarantee approval; visa decisions are made by the relevant authorities.",
    "heroImage": "/travel/madinah.webp",
    "galleryImages": [
      "/travel/makkah.webp",
      "/travel/madinah.webp"
    ],
    "features": [
      "Application checklist discussion",
      "Passport detail review",
      "Document preparation support",
      "Application route information",
      "Status follow-up where available",
      "Authority approval required"
    ],
    "process": [
      {
        "step": "Discuss",
        "desc": "Share your dates, departure city, group size, and preferences."
      },
      {
        "step": "Compare",
        "desc": "Review itinerary options, accommodation, transport, and costs."
      },
      {
        "step": "Confirm",
        "desc": "Check the written inclusions, exclusions, and booking terms."
      },
      {
        "step": "Prepare",
        "desc": "Review your documents, confirmed travel details, and packing checklist."
      }
    ]
  }
];

export function getPortfolioBySlug(slug: string) {
  return portfolioItems.find((p) => p.slug === slug) ?? null;
}

