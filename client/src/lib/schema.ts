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

/**
 * Generate Organization JSON-LD schema
 */
export function generateOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_DATA.name,
    url: COMPANY_DATA.url,
    logo: `${COMPANY_DATA.url}/logo.png`,
    description: "Professional commercial construction and property maintenance services for property managers in Maryland, Virginia, and DC. Over 30 years of experience with 100% in-house staff.",
    telephone: COMPANY_DATA.telephone,
    email: COMPANY_DATA.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_DATA.address.streetAddress,
      addressLocality: COMPANY_DATA.address.addressLocality,
      addressRegion: COMPANY_DATA.address.addressRegion,
      postalCode: COMPANY_DATA.address.postalCode,
      addressCountry: COMPANY_DATA.address.addressCountry,
    },
    areaServed: COMPANY_DATA.areaServed?.map((area) => ({
      "@type": "City",
      name: area,
    })),
    sameAs: [
      // Social media links can be added here
    ],
    founder: {
      "@type": "Person",
      name: "Shall's Construction Founders",
    },
    foundingDate: "1990",
  };
}

/**
 * Generate Service JSON-LD schema
 */
export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
}

export function generateServiceSchema(service: ServiceData): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.fullDescription || service.shortDescription,
    serviceType: service.category,
    provider: {
      "@type": "Organization",
      name: COMPANY_DATA.name,
      url: COMPANY_DATA.url,
      telephone: COMPANY_DATA.telephone,
      address: {
        "@type": "PostalAddress",
        addressLocality: COMPANY_DATA.address.addressLocality,
        addressRegion: COMPANY_DATA.address.addressRegion,
        addressCountry: COMPANY_DATA.address.addressCountry,
      },
    },
    areaServed: COMPANY_DATA.areaServed?.map((area) => ({
      "@type": "City",
      name: area,
    })),
    url: `${COMPANY_DATA.url}/services/${service.slug}`,
    category: service.category,
  };
}

/**
 * Generate Project/CreativeWork JSON-LD schema
 */
export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  client: string;
  location: string;
  category: string;
  description: string;
  completionDate: string | Date;
}

export function generateProjectSchema(project: ProjectData): object {
  const completionDate = typeof project.completionDate === 'string' 
    ? project.completionDate 
    : new Date(project.completionDate).toISOString().split('T')[0];

  return {
    "@context": "https://schema.org",
    "@type": "Project",
    name: project.title,
    description: project.description,
    dateCompleted: completionDate,
    location: {
      "@type": "Place",
      name: project.location,
    },
    category: project.category,
    creator: {
      "@type": "Organization",
      name: COMPANY_DATA.name,
      url: COMPANY_DATA.url,
    },
    url: `${COMPANY_DATA.url}/projects/${project.slug}`,
  };
}

/**
 * Generate Review JSON-LD schema
 */
export interface TestimonialData {
  id: string;
  clientName: string;
  company: string;
  role: string;
  rating: number;
  comment: string;
  serviceType: string;
  location: string;
  createdAt: string | Date;
}

export function generateReviewSchema(testimonial: TestimonialData): object {
  const reviewDate = typeof testimonial.createdAt === 'string'
    ? testimonial.createdAt
    : new Date(testimonial.createdAt).toISOString().split('T')[0];

  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "LocalBusiness",
      name: COMPANY_DATA.name,
      url: COMPANY_DATA.url,
      telephone: COMPANY_DATA.telephone,
      address: {
        "@type": "PostalAddress",
        addressLocality: COMPANY_DATA.address.addressLocality,
        addressRegion: COMPANY_DATA.address.addressRegion,
        addressCountry: COMPANY_DATA.address.addressCountry,
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      "@type": "Person",
      name: testimonial.clientName,
      jobTitle: testimonial.role,
      worksFor: {
        "@type": "Organization",
        name: testimonial.company,
      },
    },
    datePublished: reviewDate,
    reviewBody: testimonial.comment,
    publisher: {
      "@type": "Organization",
      name: COMPANY_DATA.name,
    },
  };
}

/**
 * Generate AggregateRating JSON-LD schema for collections of reviews
 */
export interface AggregateRatingData {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export function generateAggregateRatingSchema(data: AggregateRatingData): object {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_DATA.name,
    url: COMPANY_DATA.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: data.ratingValue,
      reviewCount: data.reviewCount,
      bestRating: data.bestRating || 5,
      worstRating: data.worstRating || 1,
    },
  };
}
