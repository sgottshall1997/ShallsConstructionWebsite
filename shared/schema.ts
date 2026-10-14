import { z } from "zod";

/* Types and validation only. There is no database: contact leads are emailed. */

export const insertContactSubmissionSchema = z.object({
  inquiryType: z.enum(["quote", "general"]).default("general"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  projectType: z.string().optional(),
  preferredStartDate: z.string().optional(),
  budgetRange: z.string().optional(),
  /** Honeypot. Real users never fill this. */
  website: z.string().optional(),
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;

export interface ContactSubmission {
  id: string;
  inquiryType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  projectType: string | null;
  preferredStartDate: string | null;
  budgetRange: string | null;
  website: string | null;
  createdAt: Date;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  processSteps: string[];
  category: string;
  imageUrl: string;
  icon: string;
  featured: boolean;
  tagline: string | null;
  philosophy: string | null;
  servicesInclude: string[] | null;
  testimonialQuote: string | null;
  testimonialAuthor: string | null;
  testimonialRole: string | null;
  testimonialCompany: string | null;
  relatedServices: string[] | null;
  seoKeywords: string[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
}

export type InsertService = Omit<Service, "id">;

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  rating: number;
  comment: string;
  serviceType: string;
  location: string;
  featured: boolean;
  createdAt: Date;
}
