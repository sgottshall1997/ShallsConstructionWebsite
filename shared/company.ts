/**
 * FILL IN BEFORE LAUNCH — see FILL_IN_FACTS.md
 *
 * SINGLE SOURCE OF TRUTH for every company fact on the site. Nothing else may
 * hardcode a phone, email, years figure, region, self-performed %, response
 * promise, license, project, testimonial or association. An empty array means
 * the section that depends on it is NOT rendered (no heading, no empty state).
 */

export interface CompanyProject { slug: string; name: string; city: string; scope: string; photo: string; category?: string }
export interface CompanyTestimonial { quote: string; author: string; role?: string; company?: string }
export interface CompanyLicense { state: string; number: string }
export interface CompanyAssociation { name: string; url?: string; logo?: string }
export interface CompanyCharity { name: string; url?: string; logo?: string }
export interface CompanyLeader { name: string; title: string; bio: string; photo?: string }
export interface CompanyStat { value: string; label: string }
export interface CompanyAward { name: string; year?: number }
export interface CompanyClient { name: string; logo: string }

export const COMPANY = {
  name: "Shall's Construction", // CONFIRM WITH PARENTS
  legalName: "Shall's Construction, LLC", // CONFIRM WITH PARENTS
  url: "https://shallsconstruction.com",
  tagline: "One Call Does It All",
  yearsInBusiness: 25, // CONFIRM WITH PARENTS
  foundedYear: null as number | null, // CONFIRM WITH PARENTS — never render "since YEAR"
  selfPerformedPercent: 95, // CONFIRM WITH PARENTS
  phone: "(301) 933-6277", // CONFIRM WITH PARENTS
  phoneE164: "+13019336277", // CONFIRM WITH PARENTS
  fax: "(301) 933-3386", // CONFIRM WITH PARENTS
  email: "shallsconstructionllc@aol.com", // CONFIRM WITH PARENTS — only email site-wide
  address: { street: "", city: "Kensington", state: "MD", zip: "20895" }, // CONFIRM WITH PARENTS
  serviceStates: ["MD", "VA", "DC"], // CONFIRM WITH PARENTS
  serviceAreas: [
    "Annapolis", "Arlington", "Baltimore", "Bethesda", "Bowie", "Chevy Chase", "Clarksburg",
    "Columbia", "Fairfax", "Frederick", "Gaithersburg", "Germantown", "Laurel", "Rockville",
    "Silver Spring", "Washington DC",
  ], // CONFIRM WITH PARENTS
  regionShort: "MD, VA & DC", // CONFIRM WITH PARENTS
  licenses: [] as CompanyLicense[], // CONFIRM WITH PARENTS
  insuranceLine: "Certificates of insurance available upon request.", // CONFIRM WITH PARENTS
  responsePromise: "We respond to all inquiries within one business day.", // CONFIRM WITH PARENTS
  familyBusinessClaim: false, // CONFIRM WITH PARENTS
  projects: [] as CompanyProject[], // CONFIRM WITH PARENTS
  testimonials: [] as CompanyTestimonial[], // CONFIRM WITH PARENTS
  associations: [] as CompanyAssociation[], // CONFIRM WITH PARENTS
  charities: [] as CompanyCharity[], // CONFIRM WITH PARENTS
  leadership: [] as CompanyLeader[], // CONFIRM WITH PARENTS
  safetyStats: [] as CompanyStat[], // CONFIRM WITH PARENTS
  awards: [] as CompanyAward[], // CONFIRM WITH PARENTS
  clients: [
    { name: "Associa", logo: "associa" },
    { name: "Comsource", logo: "comsource" },
    { name: "American Community Management", logo: "acm" },
    { name: "Majerle Management", logo: "mmi" },
  ] as CompanyClient[], // CONFIRM WITH PARENTS
  social: { linkedin: "" }, // CONFIRM WITH PARENTS
};

/* ---------- derived helpers (no new facts below) ---------- */
export const yearsText = () => `${COMPANY.yearsInBusiness}+ years`;
export const inHouseText = () => `${COMPANY.selfPerformedPercent}% of our work is self-performed by our own crews`;
export const telHref = () => `tel:${COMPANY.phoneE164}`;
export const mailto = () => `mailto:${COMPANY.email}`;
export const addressLine = () =>
  [COMPANY.address.street, `${COMPANY.address.city}, ${COMPANY.address.state} ${COMPANY.address.zip}`]
    .filter(Boolean)
    .join(", ");
export const hasProjects = () => COMPANY.projects.length > 0;
export const hasSafety = () =>
  COMPANY.licenses.length > 0 || COMPANY.safetyStats.length > 0 || COMPANY.awards.length > 0;
export const currentYear = () => new Date().getFullYear();

/** {{years}} {{region}} {{inHouse}} interpolation for SERVICE_CONTENT_PRIMARY.json */
export function fillCompanyTokens(text: string): string {
  return text
    .split("{{years}}").join(yearsText())
    .split("{{region}}").join(COMPANY.regionShort)
    .split("{{inHouse}}").join(inHouseText());
}
