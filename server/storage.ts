import { type Article, type InsertArticle, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private articles: Map<string, Article>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.articles = new Map();
    this.contactSubmissions = new Map();
    this.seedArticles();
  }

  private seedArticles() {
    const sampleArticles: InsertArticle[] = [
      {
        title: "Your Property Maintenance Checklist for the Winter",
        excerpt: "Winter is on the way, and many of us are preparing for freezing temperatures, ice, sleet, hail, snow, and strong winds. For single-family property managers across the United States, these conditions pose a threat to the efficiency of your home—and homes that are ill-prepared for winter are less appealing to renters.",
        imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&auto=format&fit=crop",
        slug: "winter-maintenance-checklist",
        category: "article",
      },
      {
        title: "Landlords and Tenants: Tips on Avoiding Disputes",
        excerpt: "This article provides information about Maryland landlord/tenant laws. It covers topics dealing with applications, leases, security deposits, rent escrow, lead paint hazards, eviction, and where to seek help if problems arise. Understanding these regulations can help prevent common disputes between landlords and tenants.",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop",
        slug: "avoiding-disputes",
        category: "article",
      },
      {
        title: "The Good, The Bad, and The Ugly: Making the Most Out of Customer Feedback",
        excerpt: "Customer feedback is invaluable for property managers looking to improve their services and maintain high tenant satisfaction. Learn how to effectively gather, analyze, and implement feedback to enhance your property management operations and build stronger relationships with your tenants.",
        imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop",
        slug: "customer-feedback",
        category: "article",
      },
    ];

    sampleArticles.forEach(article => {
      const id = randomUUID();
      const fullArticle: Article = {
        ...article,
        id,
        createdAt: new Date(),
      };
      this.articles.set(id, fullArticle);
    });
  }

  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(
      (article) => article.slug === slug
    );
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const article: Article = {
      ...insertArticle,
      id,
      createdAt: new Date(),
    };
    this.articles.set(id, article);
    return article;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...insertSubmission,
      id,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
