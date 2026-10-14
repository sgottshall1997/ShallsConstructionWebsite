import {
  type ContactSubmission,
  type InsertContactSubmission,
  type Service,
  type InsertService,
  type Testimonial,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import {
  COMPANY,
  fillCompanyTokens,
} from "@shared/company";
import { SERVICE_NAMES } from "@shared/routes";
import { SERVICE_SLUGS } from "@shared/routes";

function fillTokensDeep<T>(value: T): T {
  if (typeof value === "string") return fillCompanyTokens(value) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => fillTokensDeep(v)) as unknown as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, fillTokensDeep(v)]),
    ) as T;
  }
  return value;
}

/** Resolve SERVICE_CONTENT_PRIMARY.json independent of the working directory. */
function resolveServiceContentPath(): string {
  const here = typeof import.meta.dirname === "string" ? import.meta.dirname : process.cwd();
  const candidates = [
    join(here, "SERVICE_CONTENT_PRIMARY.json"), // dist/index.js -> dist/SERVICE_CONTENT_PRIMARY.json
    join(here, "..", "SERVICE_CONTENT_PRIMARY.json"), // server/storage.ts (dev) -> repo root
  ];
  const found = candidates.find((c) => existsSync(c));
  if (!found) throw new Error(`SERVICE_CONTENT_PRIMARY.json not found in: ${candidates.join(", ")}`);
  return found;
}

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  getAllTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
}

export class MemStorage implements IStorage {
  private contactSubmissions = new Map<string, ContactSubmission>();
  private services = new Map<string, Service>();

  constructor() {
    this.seedServices();
  }

  async createContactSubmission(insert: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      id,
      inquiryType: insert.inquiryType ?? "general",
      firstName: insert.firstName,
      lastName: insert.lastName,
      email: insert.email,
      phone: insert.phone ?? null,
      company: insert.company ?? null,
      message: insert.message,
      projectType: insert.projectType ?? null,
      preferredStartDate: insert.preferredStartDate ?? null,
      budgetRange: insert.budgetRange ?? null,
      website: insert.website ?? null,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  private seedServices() {
    const serviceContent = fillTokensDeep(
      JSON.parse(readFileSync(resolveServiceContentPath(), "utf-8")),
    ) as Record<string, any>;

    const serviceMetadata: Record<string, {
      title: string;
      category: string;
      imageUrl: string;
      icon: string;
      featured: boolean;
      shortDescription: string;
      seoTitle?: string;
      seoDescription?: string;
    }> = {
      "construction-remodeling": {
        title: SERVICE_NAMES["construction-remodeling"],
        category: "Construction",
        imageUrl: "/og-image.png",
        icon: "Building2",
        featured: true,
        shortDescription: `Full-service commercial construction, remodeling, and renovation for properties across ${COMPANY.regionShort}.`,
        seoTitle: `Commercial Construction & Remodeling | Shall's Construction | ${COMPANY.regionShort}`,
        seoDescription: `Comprehensive commercial construction and remodeling across ${COMPANY.regionShort}. From tenant build-outs to full office renovations, Shall's Construction delivers precision and reliability.`
      },
      "handyman-services": {
        title: SERVICE_NAMES["handyman-services"],
        category: "Maintenance",
        imageUrl: "/og-image.png",
        icon: "Wrench",
        featured: true,
        shortDescription: "Professional commercial handyman services with rapid response and reliable execution for property managers.",
        seoTitle: `Handyman Services | ${COMPANY.regionShort} | Shall's Construction`,
        seoDescription: `Commercial handyman repairs and maintenance for property managers across ${COMPANY.regionShort}.`
      },
      "exterior-building-services": {
        title: SERVICE_NAMES["exterior-building-services"],
        category: "Specialty",
        imageUrl: "/og-image.png",
        icon: "Home",
        featured: true,
        shortDescription: "Comprehensive building exterior solutions with preventive maintenance for commercial properties.",
        seoTitle: `Exterior Building Services | Waterproofing & Restoration | ${COMPANY.regionShort}`,
        seoDescription: `Comprehensive exterior building maintenance and waterproofing services in ${COMPANY.regionShort}. Protect your property with expert facade repair and restoration.`
      },
      "parking-lot-services": {
        title: SERVICE_NAMES["parking-lot-services"],
        category: "Specialty",
        imageUrl: "/og-image.png",
        icon: "Car",
        featured: true,
        shortDescription: "Professional parking lot maintenance with attention to detail and operational efficiency for commercial properties.",
        seoTitle: `Parking Lot Asphalt & Concrete | ${COMPANY.regionShort} | Shall's Construction`,
        seoDescription: `Professional parking lot paving, sealcoating, and striping services across ${COMPANY.regionShort}. Expert asphalt repair and maintenance for commercial properties.`
      },
      "painting-services": {
        title: SERVICE_NAMES["painting-services"],
        category: "Specialty",
        imageUrl: "/og-image.png",
        icon: "Paintbrush",
        featured: true,
        shortDescription: "Precision commercial painting for interiors and exteriors with meticulous surface preparation and lasting results.",
        seoTitle: `Painting Services | Interior & Exterior | ${COMPANY.regionShort}`,
        seoDescription: `Professional commercial painting services in ${COMPANY.regionShort}. Expert interior and exterior painting with precision application and quality materials.`
      },
      "snow-removal": {
        title: SERVICE_NAMES["snow-removal"],
        category: "Seasonal",
        imageUrl: "/og-image.png",
        icon: "Snowflake",
        featured: true,
        shortDescription: `Commercial snow removal and ice management across ${COMPANY.regionShort}.`,
        seoTitle: `Snow Removal | Ice Management | ${COMPANY.regionShort}`,
        seoDescription: `Reliable commercial snow removal and ice management services across ${COMPANY.regionShort}. ${COMPANY.responsePromise.replace(/^./, (c) => c.toUpperCase())}.`
      }
    };

    const primary = new Set<string>(SERVICE_SLUGS);
    for (const slug of SERVICE_SLUGS) {
      const content = serviceContent[slug];
      const metadata = serviceMetadata[slug];
      if (!content || !metadata) throw new Error(`Missing content/metadata for service: ${slug}`);
      const service: InsertService = {
        slug,
        title: metadata.title,
        shortDescription: metadata.shortDescription,
        fullDescription: content.philosophy || metadata.shortDescription,
        benefits: content.servicesInclude?.slice(0, 5) || [],
        processSteps: [
          "Initial consultation and assessment",
          "Detailed planning and scheduling",
          "Professional execution",
          "Quality inspection",
          "Completion and follow-up",
        ],
        category: metadata.category,
        imageUrl: metadata.imageUrl,
        icon: metadata.icon,
        featured: metadata.featured,
        tagline: content.tagline || null,
        philosophy: content.philosophy || null,
        servicesInclude: content.servicesInclude || null,
        testimonialQuote: null,
        testimonialAuthor: null,
        testimonialRole: null,
        testimonialCompany: null,
        relatedServices: (content.relatedServices || []).filter((s: string) => primary.has(s)),
        seoKeywords: content.seoKeywords || null,
        seoTitle: metadata.seoTitle || null,
        seoDescription: metadata.seoDescription || null,
      };
      this.services.set(slug, { id: randomUUID(), ...service } as Service);
    }
  }

  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return this.services.get(slug);
  }

  /** Only testimonials the owners marked permissionGranted in shared/company.ts */
  async getAllTestimonials(): Promise<Testimonial[]> {
    return COMPANY.testimonials.map((t, i) => ({
      id: String(i),
      quote: t.quote,
      author: t.author,
      company: t.company || "",
      role: t.role || null,
      rating: 5,
      service: null,
      location: null,
      featured: true,
      createdAt: new Date(),
    })) as unknown as Testimonial[];
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return this.getAllTestimonials();
  }
}


export const storage = new MemStorage();
