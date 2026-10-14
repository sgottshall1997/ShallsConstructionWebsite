import { COMPANY, yearsText, inHouseText } from "@shared/company";

export interface FAQItem { question: string; answer: string }
export interface BreadcrumbItem { name: string; url: string }

const postalAddress = () => ({
  "@type": "PostalAddress",
  ...(COMPANY.address.street ? { streetAddress: COMPANY.address.street } : {}),
  addressLocality: COMPANY.address.city,
  addressRegion: COMPANY.address.state,
  postalCode: COMPANY.address.zip,
  addressCountry: "US",
});

const areaServed = () => COMPANY.serviceAreas.map((name) => ({ "@type": "City", name }));

const sameAs = () => [COMPANY.social.linkedin].filter(Boolean);

/** Exactly one LocalBusiness. No openingHours, no AggregateRating, no founder. */
export function generateLocalBusinessSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    name: COMPANY.legalName,
    url: COMPANY.url,
    telephone: COMPANY.phoneE164,
    email: COMPANY.email,
    address: postalAddress(),
    areaServed: areaServed(),
    description: `Commercial construction and property maintenance for property managers in ${COMPANY.regionShort}. ${yearsText()} of experience. ${inHouseText()}.`,
    image: `${COMPANY.url}/logo.png`,
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
  };
}

/** Exactly one Organization. */
export function generateOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.legalName,
    url: COMPANY.url,
    logo: `${COMPANY.url}/logo.png`,
    description: `Commercial construction and property maintenance for property managers in ${COMPANY.regionShort}.`,
    telephone: COMPANY.phoneE164,
    email: COMPANY.email,
    address: postalAddress(),
    areaServed: areaServed(),
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
  };
}

export function generateFAQSchema(faqs: FAQItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${COMPANY.url}${item.url}`,
    })),
  };
}

export interface ServiceData {
  id: string; slug: string; title: string; shortDescription: string; fullDescription: string; category: string;
}

export function generateServiceSchema(service: ServiceData): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.fullDescription || service.shortDescription,
    serviceType: service.category,
    provider: { "@type": "Organization", name: COMPANY.legalName, url: COMPANY.url, telephone: COMPANY.phoneE164 },
    areaServed: areaServed(),
    url: `${COMPANY.url}/services/${service.slug}`,
  };
}
