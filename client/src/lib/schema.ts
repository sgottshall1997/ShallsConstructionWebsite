import {
  COMPANY,
  stateNamesList,
  yearsPhrase,
  selfPerformedText,
} from "@shared/company";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

const postalAddress = () => ({
  "@type": "PostalAddress",
  ...(COMPANY.address.street ? { streetAddress: COMPANY.address.street } : {}),
  addressLocality: COMPANY.address.locality,
  addressRegion: COMPANY.address.region,
  ...(COMPANY.address.postalCode ? { postalCode: COMPANY.address.postalCode } : {}),
  addressCountry: COMPANY.address.country,
});

const areaServed = () =>
  COMPANY.serviceStates.map((s) => ({ "@type": "AdministrativeArea", name: s.name }));

export function generateLocalBusinessSchema(): object {
  const years = yearsPhrase();
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor", "ProfessionalService"],
    name: COMPANY.legalName,
    url: COMPANY.url,
    telephone: COMPANY.phone.e164,
    email: COMPANY.email,
    address: postalAddress(),
    areaServed: areaServed(),
    openingHoursSpecification: COMPANY.hours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.startsWith("Mo-Fr")
        ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        : [],
      opens: hours.match(/(\d{2}:\d{2})/)?.[0] || "08:00",
      closes: hours.match(/(\d{2}:\d{2})/g)?.[1] || "17:00",
    })),
    description: [
      `Commercial construction and property maintenance for property managers in ${stateNamesList()}.`,
      years ? `${years} of experience.` : "",
    ]
      .filter(Boolean)
      .join(" "),
    image: `${COMPANY.url}/logo.png`,
    sameAs: COMPANY.linkedInUrl ? [COMPANY.linkedInUrl] : [],
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

export function generateOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.legalName,
    url: COMPANY.url,
    logo: `${COMPANY.url}/logo.png`,
    description: `Commercial construction and property maintenance for property managers in ${stateNamesList()}; ${selfPerformedText()}.`,
    telephone: COMPANY.phone.e164,
    email: COMPANY.email,
    address: postalAddress(),
    areaServed: areaServed(),
    sameAs: COMPANY.linkedInUrl ? [COMPANY.linkedInUrl] : [],
    ...(COMPANY.foundingYear ? { foundingDate: String(COMPANY.foundingYear) } : {}),
  };
}

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
      name: COMPANY.legalName,
      url: COMPANY.url,
      telephone: COMPANY.phone.e164,
    },
    areaServed: areaServed(),
    url: `${COMPANY.url}/services/${service.slug}`,
    category: service.category,
  };
}
