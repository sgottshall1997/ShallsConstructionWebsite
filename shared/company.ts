/**
 * SINGLE SOURCE OF TRUTH for every company fact shown on the site.
 *
 * Nothing else in the codebase may hardcode a phone number, email, years
 * figure, service-area list, self-performed claim, response promise, license,
 * project, testimonial or association. Components, lib/schema.ts, SEO.tsx,
 * server/storage.ts and SERVICE_CONTENT_PRIMARY.json (via {{tokens}}) all read
 * from here.
 *
 * Values below are SAFE DEFAULTS taken only from material the company already
 * published (the old WordPress copy in attached_assets/ShallsServicesOldSite
 * and the phone/fax/email already on the site). Anything not confirmed is
 * null / [] and the UI hides whatever depends on it. See FILL_IN_FACTS.md.
 */

export interface CompanyProject {
  slug: string;
  name: string;
  city: string; // e.g. "Bethesda, MD"
  scope: string;
  /** Path to an image under client/public or an imported asset URL */
  photo: string;
  category?: string;
}

export interface CompanyTestimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  /** Set true only after written permission to publish */
  permissionGranted: boolean;
}

export interface CompanyLicense {
  state: string; // "MD" | "VA" | "DC" ...
  number: string;
}

export interface CompanyAssociation {
  name: string;
  url?: string;
}

export interface Company {
  legalName: string;
  shortName: string;
  tagline: string;
  url: string;
  phone: { display: string; e164: string; tel: string };
  fax: string | null;
  email: string;
  address: {
    street: string | null;
    locality: string;
    region: string;
    postalCode: string | null;
    country: string;
  };
  /** Year founded. null = unknown -> no "Since ####" anywhere */
  foundingYear: number | null;
  /** Display figure such as "25+". null = hide every years claim */
  yearsInBusiness: string | null;
  /** e.g. 100. null = use selfPerformedPhrase only (no percentage) */
  selfPerformedPercent: number | null;
  selfPerformedPhrase: string;
  /** States/jurisdictions served, display order */
  serviceStates: { code: string; name: string }[];
  licenses: CompanyLicense[];
  /** e.g. "Fully insured — certificates of insurance on request". null = hide */
  insuranceLine: string | null;
  /** The one response promise used site-wide */
  responsePromise: string;
  /** true / false / null (unknown -> no family-business claims) */
  familyOwned: boolean | null;
  projects: CompanyProject[];
  testimonials: CompanyTestimonial[];
  associations: CompanyAssociation[];
  linkedInUrl: string | null;
  hours: string[];
}

export const COMPANY: Company = {
  legalName: "Shall's Construction LLC",
  shortName: "Shall's Construction",
  tagline: "One Call Does It All",
  url: "https://shallsconstruction.com",
  phone: { display: "(301) 933-6277", e164: "+1-301-933-6277", tel: "+13019336277" },
  fax: "(301) 933-3386",
  // Default: the address already used on Contact/schema. Recommend a
  // @shallsconstruction.com address once the domain mailbox exists.
  email: "shallsconstructionllc@aol.com",
  address: {
    street: null,
    locality: "Kensington",
    region: "MD",
    postalCode: null,
    country: "US",
  },
  foundingYear: null,
  // Old WordPress site: "With over 25 years of experience"
  yearsInBusiness: "25+",
  selfPerformedPercent: null,
  // Old WordPress site: "performing the majority of work directly"
  selfPerformedPhrase: "the majority of our work is performed by our own crews",
  serviceStates: [
    { code: "MD", name: "Maryland" },
    { code: "VA", name: "Virginia" },
    { code: "DC", name: "Washington, DC" },
  ],
  licenses: [],
  insuranceLine: null,
  // Old WordPress site: "dedicated, on-call 24/7 response to emergencies"
  responsePromise: "24/7 on-call emergency response",
  familyOwned: null,
  projects: [],
  testimonials: [],
  associations: [],
  linkedInUrl: null,
  hours: ["Mo-Fr 08:00-17:00"],
};

/* ---------- derived helpers (no new facts below this line) ---------- */

export const stateCodes = () => COMPANY.serviceStates.map((s) => s.code);
export const stateCodesSlash = () => stateCodes().join("/");
export const stateCodesComma = () => stateCodes().join(", ");
export const stateNamesList = () => {
  const n = COMPANY.serviceStates.map((s) => s.name);
  return n.length <= 1 ? n.join("") : `${n.slice(0, -1).join(", ")}, and ${n[n.length - 1]}`;
};
export const mailto = () => `mailto:${COMPANY.email}`;
export const telHref = () => `tel:${COMPANY.phone.tel}`;
/** "25+ years" or "" when unknown */
export const yearsPhrase = () => (COMPANY.yearsInBusiness ? `${COMPANY.yearsInBusiness} years` : "");
export const selfPerformedText = () =>
  COMPANY.selfPerformedPercent != null
    ? `${COMPANY.selfPerformedPercent}% of our work is performed by our own crews`
    : COMPANY.selfPerformedPhrase;
export const publishableTestimonials = () => COMPANY.testimonials.filter((t) => t.permissionGranted);
export const currentYear = () => new Date().getFullYear();

/**
 * Replace {{token}} placeholders in content strings (used for
 * SERVICE_CONTENT_PRIMARY.json). Sentences containing a token whose fact is
 * unknown are dropped instead of rendering an empty value.
 */
export function fillCompanyTokens(text: string): string {
  const tokens: Record<string, string> = {
    years: COMPANY.yearsInBusiness ?? "",
    yearsPhrase: yearsPhrase(),
    region: stateNamesList(),
    regionCodes: stateCodesComma(),
    selfPerformed: selfPerformedText(),
    responsePromise: COMPANY.responsePromise,
    phone: COMPANY.phone.display,
    name: COMPANY.shortName,
  };
  return text
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => {
      const used = sentence.match(/\{\{(\w+)\}\}/g) || [];
      return used.every((t) => tokens[t.slice(2, -2)]);
    })
    .map((s) => s.replace(/\{\{(\w+)\}\}/g, (_, k) => tokens[k] ?? ""))
    .join(" ");
}
