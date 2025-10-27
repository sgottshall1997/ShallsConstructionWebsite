// JSON-LD Schema generation utilities for SEO

export interface LocalBusinessData {
  name: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: string;
    longitude: string;
  };
  areaServed?: string[];
  priceRange?: string;
  openingHours?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

// Company NAP (Name, Address, Phone) data
export const COMPANY_DATA: LocalBusinessData = {
  name: "Shall's Construction LLC",
  url: "https://shallsconstruction.com",
  telephone: "+1-301-933-6277",
  email: "shallsconstructionllc@aol.com",
  address: {
    streetAddress: "Serving Montgomery County and Surrounding Areas",
    addressLocality: "Montgomery County",
    addressRegion: "MD",
    postalCode: "20895",
    addressCountry: "US",
  },
  areaServed: [
    "Baltimore, MD",
    "Bethesda, MD",
    "Bowie, MD",
    "Chevy Chase, MD",
    "Clarksburg, MD",
    "Columbia, MD",
    "Frederick, MD",
    "Gaithersburg, MD",
    "Germantown, MD",
    "Laurel, MD",
    "Rockville, MD",
    "Silver Spring, MD",
    "Arlington, VA",
    "Fairfax, VA",
    "Annapolis, MD",
    "Washington, DC",
  ],
  priceRange: "$$$",
  openingHours: ["Mo-Fr 08:00-17:00"],
};

/**
 * Generate LocalBusiness JSON-LD schema
 */
export function generateLocalBusinessSchema(
  overrides?: Partial<LocalBusinessData>
): object {
  const data = { ...COMPANY_DATA, ...overrides };

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor", "ProfessionalService"],
    name: data.name,
    url: data.url,
    telephone: data.telephone,
    email: data.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    geo: data.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: data.geo.latitude,
          longitude: data.geo.longitude,
        }
      : undefined,
    areaServed: data.areaServed?.map((area) => ({
      "@type": "City",
      name: area,
    })),
    priceRange: data.priceRange,
    openingHoursSpecification: data.openingHours?.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.startsWith("Mo-Fr")
        ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        : [],
      opens: hours.match(/(\d{2}:\d{2})/)?.[0] || "08:00",
      closes: hours.match(/(\d{2}:\d{2})/g)?.[1] || "17:00",
    })),
    description:
      "Professional commercial construction and property maintenance services for property managers in Maryland, Virginia, and DC. Over 25 years of experience.",
    image: `${data.url}/logo.png`,
    sameAs: [],
  };
}

/**
 * Generate FAQPage JSON-LD schema
 */
export function generateFAQSchema(faqs: FAQItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList JSON-LD schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
