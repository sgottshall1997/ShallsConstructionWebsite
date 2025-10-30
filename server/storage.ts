import { 
  type Article, 
  type InsertArticle, 
  type ContactSubmission, 
  type InsertContactSubmission,
  type Service,
  type InsertService,
  type Project,
  type InsertProject,
  type BlogPost,
  type InsertBlogPost,
  type Testimonial,
  type InsertTestimonial,
  type Location,
  type InsertLocation
} from "@shared/schema";
import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import { join } from "path";

export interface IStorage {
  getAllArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  
  getAllServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  
  getAllProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  getFeaturedProjects(): Promise<Project[]>;
  
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonialsByService(serviceType: string): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  
  getAllLocations(): Promise<Location[]>;
  getLocationBySlug(slug: string): Promise<Location | undefined>;
}

export class MemStorage implements IStorage {
  private articles: Map<string, Article>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private services: Map<string, Service>;
  private projects: Map<string, Project>;
  private blogPosts: Map<string, BlogPost>;
  private testimonials: Map<string, Testimonial>;
  private locations: Map<string, Location>;

  constructor() {
    this.articles = new Map();
    this.contactSubmissions = new Map();
    this.services = new Map();
    this.projects = new Map();
    this.blogPosts = new Map();
    this.testimonials = new Map();
    this.locations = new Map();
    this.seedArticles();
    this.seedServices();
    this.seedProjects();
    this.seedBlogPosts();
    this.seedTestimonials();
    this.seedLocations();
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
        category: article.category ?? 'article',
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
      category: insertArticle.category ?? 'article',
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
      phone: insertSubmission.phone ?? null,
      company: insertSubmission.company ?? null,
      projectType: insertSubmission.projectType ?? null,
      preferredStartDate: insertSubmission.preferredStartDate ?? null,
      budgetRange: insertSubmission.budgetRange ?? null,
      website: insertSubmission.website ?? null,
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

  private seedServices() {
    // Load service content from SERVICE_CONTENT_PRIMARY.json
    const serviceContentPath = join(process.cwd(), 'SERVICE_CONTENT_PRIMARY.json');
    const serviceContent = JSON.parse(readFileSync(serviceContentPath, 'utf-8'));

    // Service metadata (images, icons, categories, titles)
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
        title: "Commercial Construction & Remodeling",
        category: "Construction",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop",
        icon: "Building2",
        featured: true,
        shortDescription: "Full-service commercial construction, remodeling, and renovation for properties across MD, VA, and DC.",
        seoTitle: "Commercial Construction & Remodeling | Shall's Construction | MD, VA, DC",
        seoDescription: "Comprehensive commercial construction and remodeling across Maryland, DC, and Virginia. From tenant build-outs to full office renovations, Shall's Construction delivers precision and reliability."
      },
      "handyman-services": {
        title: "Commercial Handyman Services",
        category: "Maintenance",
        imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop",
        icon: "Wrench",
        featured: true,
        shortDescription: "Professional commercial handyman services with rapid response and reliable execution for property managers.",
        seoTitle: "Commercial Handyman Services | Montgomery County, MD | Shall's Construction",
        seoDescription: "Professional commercial handyman services in Montgomery County, Bethesda, and Kensington. Trusted by property managers for repairs, maintenance, and 24/7 emergency support."
      },
      "exterior-building-services": {
        title: "Exterior Building Services",
        category: "Specialty",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
        icon: "Home",
        featured: true,
        shortDescription: "Comprehensive building exterior solutions with preventive maintenance and emergency response for commercial properties.",
        seoTitle: "Exterior Building Services | Waterproofing & Restoration | Shall's Construction",
        seoDescription: "Comprehensive exterior building maintenance and waterproofing services in Maryland, DC, and Virginia. Protect your property with expert facade repair and restoration."
      },
      "parking-lot-services": {
        title: "Parking Lot Services",
        category: "Specialty",
        imageUrl: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&auto=format&fit=crop",
        icon: "Car",
        featured: true,
        shortDescription: "Professional parking lot maintenance with attention to detail and operational efficiency for commercial properties.",
        seoTitle: "Parking Lot Services | Asphalt & Maintenance | Shall's Construction",
        seoDescription: "Professional parking lot paving, sealcoating, and striping services across Maryland, DC, and Virginia. Expert asphalt repair and maintenance for commercial properties."
      },
      "painting-services": {
        title: "Commercial Painting Services",
        category: "Specialty",
        imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&auto=format&fit=crop",
        icon: "Paintbrush",
        featured: true,
        shortDescription: "Precision commercial painting for interiors and exteriors with meticulous surface preparation and lasting results.",
        seoTitle: "Commercial Painting Services | Interior & Exterior | Shall's Construction",
        seoDescription: "Professional commercial painting services in Maryland, DC, and Virginia. Expert interior and exterior painting with precision application and quality materials."
      },
      "snow-removal": {
        title: "Snow Removal & Ice Management",
        category: "Seasonal",
        imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&auto=format&fit=crop",
        icon: "Snowflake",
        featured: true,
        shortDescription: "24/7 commercial snow removal and ice management with proactive monitoring and rapid response across the Mid-Atlantic.",
        seoTitle: "Commercial Snow Removal | 24/7 Ice Management | Shall's Construction",
        seoDescription: "Reliable commercial snow removal and ice management services across MD, VA, DC, and DE. 24/7 emergency response with proactive storm monitoring."
      }
    };

    const sampleServices: InsertService[] = Object.keys(serviceContent).map(slug => {
      const content = serviceContent[slug];
      const metadata = serviceMetadata[slug];
      
      if (!metadata) {
        throw new Error(`Missing metadata for service: ${slug}`);
      }

      return {
        slug: content.slug,
        title: metadata.title,
        shortDescription: metadata.shortDescription,
        fullDescription: content.philosophy || metadata.shortDescription,
        benefits: content.servicesInclude?.slice(0, 5) || [],
        processSteps: [
          "Initial consultation and assessment",
          "Detailed planning and scheduling",
          "Professional execution",
          "Quality inspection",
          "Completion and follow-up"
        ],
        category: metadata.category,
        imageUrl: metadata.imageUrl,
        icon: metadata.icon,
        featured: metadata.featured,
        tagline: content.tagline || null,
        philosophy: content.philosophy || null,
        servicesInclude: content.servicesInclude || null,
        testimonialQuote: content.testimonial?.quote || null,
        testimonialAuthor: content.testimonial?.author || null,
        testimonialRole: content.testimonial?.role || null,
        testimonialCompany: content.testimonial?.company || null,
        relatedServices: content.relatedServices || null,
        seoKeywords: content.seoKeywords || null,
        seoTitle: metadata.seoTitle || null,
        seoDescription: metadata.seoDescription || null,
      };
    });

    // Keep secondary services (demolition, interior-fit-out, etc.) for backwards compatibility
    const secondaryServices: InsertService[] = [
      {
        slug: "demolition",
        title: "Demolition",
        shortDescription: "Professional demolition services for commercial properties with 24/7 emergency response.",
        fullDescription: "Our expert demolition team handles selective demolition, full building teardowns, and emergency structural removal. We prioritize safety, efficiency, and proper debris disposal for all commercial properties across MD, VA, and DC.",
        benefits: [
          "Licensed and insured demolition crew",
          "Proper debris removal and disposal",
          "Minimal disruption to surrounding areas",
          "24/7 emergency demolition services",
          "Environmentally responsible practices"
        ],
        processSteps: [
          "Site assessment and safety planning",
          "Permit acquisition and documentation",
          "Utility disconnection coordination",
          "Controlled demolition execution",
          "Debris removal and site cleanup"
        ],
        category: "Construction",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop",
        icon: "Hammer",
        featured: false,
      },
      {
        slug: "interior-fit-out",
        title: "Interior Fit-Out",
        shortDescription: "Complete interior buildout services for commercial spaces, offices, and retail locations.",
        fullDescription: "Transform your commercial space with our comprehensive interior fit-out services. From office layouts to retail spaces, we handle everything from framing and drywall to final finishes and fixtures.",
        benefits: [
          "Complete turnkey solutions",
          "Experienced commercial contractors",
          "Quality materials and craftsmanship",
          "On-time project completion",
          "Competitive pricing"
        ],
        processSteps: [
          "Initial consultation and space planning",
          "Design review and material selection",
          "Structural work and MEP coordination",
          "Finish installation",
          "Final walkthrough and punch list"
        ],
        category: "Construction",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop",
        icon: "Building2",
        featured: true,
      },
      {
        slug: "tenant-improvements",
        title: "Tenant Improvements",
        shortDescription: "Customized tenant improvement services to meet specific lease requirements and business needs.",
        fullDescription: "We specialize in tenant improvement projects that enhance commercial spaces to meet tenant specifications. Our team works efficiently to minimize downtime while delivering high-quality results.",
        benefits: [
          "Fast turnaround times",
          "Minimal business disruption",
          "Code compliance expertise",
          "Flexible scheduling",
          "Proven track record with property managers"
        ],
        processSteps: [
          "Review tenant requirements and lease terms",
          "Develop scope and timeline",
          "Coordinate with landlord and tenant",
          "Execute improvements",
          "Final inspection and handover"
        ],
        category: "Construction",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
        icon: "Wrench",
        featured: true,
      },
      {
        slug: "facility-maintenance",
        title: "Facility Maintenance",
        shortDescription: "Comprehensive facility maintenance programs to keep your commercial properties in top condition.",
        fullDescription: "Our preventive and reactive maintenance services ensure your commercial facilities operate smoothly year-round. From routine inspections to urgent repairs, we're your reliable maintenance partner.",
        benefits: [
          "Preventive maintenance programs",
          "95% in-house staff",
          "Rapid response times",
          "Comprehensive service coverage",
          "Detailed maintenance reporting"
        ],
        processSteps: [
          "Property assessment",
          "Maintenance schedule development",
          "Regular inspections and service",
          "Issue documentation and tracking",
          "Continuous improvement recommendations"
        ],
        category: "Maintenance",
        imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop",
        icon: "Settings",
        featured: false,
      },
      {
        slug: "emergency-services",
        title: "Emergency Services",
        shortDescription: "24/7/365 emergency response for urgent commercial property issues across MD, VA, and DC.",
        fullDescription: "When emergencies strike, Shall's Construction responds immediately. Our emergency response team is available around the clock to handle urgent repairs, water damage, structural issues, and more.",
        benefits: [
          "24/7/365 availability",
          "Rapid response guarantee",
          "Experienced emergency crews",
          "Direct insurance coordination",
          "Full-service emergency repairs"
        ],
        processSteps: [
          "Emergency call intake",
          "Immediate dispatch",
          "On-site assessment",
          "Emergency stabilization",
          "Follow-up permanent repairs"
        ],
        category: "Emergency",
        imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&auto=format&fit=crop",
        icon: "AlertTriangle",
        featured: true,
      },
      {
        slug: "general-maintenance",
        title: "General Maintenance",
        shortDescription: "Reliable general maintenance and handyman services for commercial properties of all sizes.",
        fullDescription: "From minor repairs to routine maintenance tasks, our skilled technicians handle a wide range of general maintenance needs to keep your properties looking and functioning their best.",
        benefits: [
          "Skilled maintenance technicians",
          "Wide range of services",
          "Flexible scheduling",
          "Competitive rates",
          "Quality workmanship"
        ],
        processSteps: [
          "Service request submission",
          "Technician assignment",
          "On-site service",
          "Quality verification",
          "Service completion report"
        ],
        category: "Maintenance",
        imageUrl: "https://images.unsplash.com/photo-1590856029620-23e7b02a00e0?w=800&auto=format&fit=crop",
        icon: "Tool",
        featured: false,
      },
    ];

    // Combine primary services from JSON with secondary services
    const allServices = [...sampleServices, ...secondaryServices];

    allServices.forEach(service => {
      const id = randomUUID();
      const fullService: Service = {
        ...service,
        featured: service.featured ?? false,
        id,
        tagline: service.tagline ?? null,
        philosophy: service.philosophy ?? null,
        servicesInclude: service.servicesInclude ?? null,
        testimonialQuote: service.testimonialQuote ?? null,
        testimonialAuthor: service.testimonialAuthor ?? null,
        testimonialRole: service.testimonialRole ?? null,
        testimonialCompany: service.testimonialCompany ?? null,
        relatedServices: service.relatedServices ?? null,
        seoKeywords: service.seoKeywords ?? null,
        seoTitle: service.seoTitle ?? null,
        seoDescription: service.seoDescription ?? null,
      };
      this.services.set(id, fullService);
    });
  }

  private seedProjects() {
    const sampleProjects: InsertProject[] = [
      {
        slug: "bethesda-metro-plaza-renovation",
        title: "Bethesda Metro Plaza Renovation",
        client: "Metro Property Group",
        location: "Bethesda, MD",
        category: "Interior Fit-Out",
        description: "Complete interior renovation of 15,000 sq ft commercial office space in downtown Bethesda.",
        scope: "Full interior demolition, new HVAC installation, modern office build-out with open floor plan, conference rooms, and break areas. Included new flooring, lighting, paint, and millwork throughout.",
        results: [
          "Completed 2 weeks ahead of schedule",
          "Zero safety incidents",
          "Client rated 5/5 stars",
          "Tenant move-in on target date"
        ],
        imageUrls: [
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop"
        ],
        featured: true,
        completionDate: new Date('2024-09-15'),
      },
      {
        slug: "rockville-medical-center-tenant-improvement",
        title: "Rockville Medical Center Tenant Improvement",
        client: "HealthFirst Properties",
        location: "Rockville, MD",
        category: "Tenant Improvements",
        description: "Specialized tenant improvements for medical practice including exam rooms and lab space.",
        scope: "Built out 8,000 sq ft medical suite with 12 exam rooms, lab area, reception, and administrative offices. Specialized electrical and plumbing for medical equipment.",
        results: [
          "Met all healthcare compliance requirements",
          "Completed during off-hours to minimize disruption",
          "Passed all inspections first time",
          "Practice opened on schedule"
        ],
        imageUrls: [
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop"
        ],
        featured: true,
        completionDate: new Date('2024-07-22'),
      },
      {
        slug: "silver-spring-retail-center-exterior-restoration",
        title: "Silver Spring Retail Center Exterior Restoration",
        client: "Retail Realty Partners",
        location: "Silver Spring, MD",
        category: "Exterior Building Services",
        description: "Comprehensive exterior restoration of aging retail center including facade and waterproofing.",
        scope: "Complete facade restoration, waterproofing, new storefront entrances, parking lot repaving and restriping, and landscape improvements.",
        results: [
          "Enhanced curb appeal increased tenant interest",
          "Resolved long-standing water infiltration issues",
          "Improved property value by 15%",
          "All work completed within budget"
        ],
        imageUrls: [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop"
        ],
        featured: true,
        completionDate: new Date('2024-06-30'),
      },
      {
        slug: "baltimore-warehouse-conversion",
        title: "Baltimore Warehouse Conversion",
        client: "Urban Development LLC",
        location: "Baltimore, MD",
        category: "Construction",
        description: "Conversion of historic warehouse into modern flex office/retail space.",
        scope: "Selective demolition preserving historic elements, new MEP systems, creation of 25,000 sq ft multi-tenant space with modern amenities while maintaining industrial aesthetic.",
        results: [
          "Successfully preserved historic character",
          "LEED certification achieved",
          "100% leased within 3 months of completion",
          "Featured in local architecture magazine"
        ],
        imageUrls: [
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop"
        ],
        featured: false,
        completionDate: new Date('2024-05-10'),
      },
      {
        slug: "gaithersburg-business-park-maintenance",
        title: "Gaithersburg Business Park Ongoing Maintenance",
        client: "Commerce Park Management",
        location: "Gaithersburg, MD",
        category: "Facility Maintenance",
        description: "Comprehensive facilities maintenance contract for 200,000 sq ft business park.",
        scope: "Ongoing preventive maintenance, emergency repairs, HVAC servicing, parking lot maintenance, snow removal, and landscaping coordination for multi-building campus.",
        results: [
          "98% tenant satisfaction rating",
          "30% reduction in emergency calls",
          "Extended equipment life through preventive care",
          "Contract renewed for 3rd consecutive year"
        ],
        imageUrls: [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop"
        ],
        featured: false,
        completionDate: new Date('2024-10-01'),
      },
      {
        slug: "dc-metro-office-lobby-renovation",
        title: "DC Metro Office Lobby Renovation",
        client: "Capital Office Properties",
        location: "Washington, DC",
        category: "Interior Fit-Out",
        description: "High-end lobby renovation for Class A office building in downtown DC.",
        scope: "Complete lobby transformation including new marble flooring, millwork reception desk, upgraded lighting, modern seating area, and digital directory system.",
        results: [
          "Increased building prestige and rental rates",
          "Work completed during evenings and weekends",
          "Zero disruption to existing tenants",
          "Featured in commercial real estate publication"
        ],
        imageUrls: [
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop"
        ],
        featured: true,
        completionDate: new Date('2024-08-20'),
      },
      {
        slug: "bethesda-row-restaurant-buildout",
        title: "Bethesda Row Restaurant Build-Out",
        client: "Dining Concepts Group",
        location: "Bethesda, MD",
        category: "Tenant Improvements",
        description: "Fast-track restaurant build-out in premier Bethesda Row location.",
        scope: "Complete restaurant build-out including commercial kitchen, dining area, bar, restrooms, and outdoor patio. Specialized ventilation, grease trap installation, and code compliance for restaurant operations.",
        results: [
          "Completed in 8 weeks start to finish",
          "Passed health department inspection first time",
          "Restaurant opened for holiday season",
          "Client planning second location"
        ],
        imageUrls: [
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop"
        ],
        featured: false,
        completionDate: new Date('2024-11-15'),
      },
      {
        slug: "rockville-parking-garage-restoration",
        title: "Rockville Parking Garage Restoration",
        client: "City Center Parking LLC",
        location: "Rockville, MD",
        category: "Exterior Building Services",
        description: "Structural repair and waterproofing of 5-level parking garage.",
        scope: "Concrete restoration, waterproofing membrane installation, new traffic coating, LED lighting upgrade, and improved drainage system throughout 500-space parking structure.",
        results: [
          "Extended garage life by 20+ years",
          "Improved safety with better lighting",
          "Resolved chronic water damage issues",
          "Maintained 80% capacity during phased work"
        ],
        imageUrls: [
          "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&auto=format&fit=crop"
        ],
        featured: false,
        completionDate: new Date('2024-04-12'),
      },
    ];

    sampleProjects.forEach(project => {
      const id = randomUUID();
      const fullProject: Project = {
        ...project,
        featured: project.featured ?? false,
        id,
      };
      this.projects.set(id, fullProject);
    });
  }

  private seedBlogPosts() {
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        slug: "commercial-property-winter-preparation-checklist",
        title: "Commercial Property Winter Preparation: Your Essential Checklist",
        excerpt: "Winter weather can wreak havoc on commercial properties. Follow this comprehensive checklist to protect your investment and keep tenants comfortable.",
        content: "As temperatures drop across Maryland, Virginia, and DC, commercial property managers must prepare their buildings for harsh winter conditions. From HVAC system checks to roof inspections, proper preparation prevents costly emergency repairs and keeps tenants satisfied. Our 25 years of experience has taught us that preventive maintenance in fall saves thousands in winter emergency calls.",
        category: "Maintenance Tips",
        author: "Michael Shall",
        imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&auto=format&fit=crop",
        tags: ["winter maintenance", "preventive care", "property management", "HVAC"],
        featured: true,
      },
      {
        slug: "tenant-improvement-trends-2024",
        title: "Top Tenant Improvement Trends for 2024",
        excerpt: "Modern tenants expect more from their commercial spaces. Learn about the latest tenant improvement trends that attract and retain quality tenants.",
        content: "The commercial real estate landscape is evolving rapidly. Today's tenants prioritize flexible workspaces, wellness amenities, and sustainable features. We're seeing increased demand for open floor plans with adaptable configurations, upgraded HVAC systems with improved air quality, and enhanced technology infrastructure. Smart property managers invest in these improvements to maintain competitive advantage in the MD/VA/DC market.",
        category: "Industry Insights",
        author: "Sarah Johnson",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
        tags: ["tenant improvements", "commercial trends", "workspace design", "property value"],
        featured: true,
      },
      {
        slug: "bethesda-metro-plaza-case-study",
        title: "Case Study: Transforming Bethesda Metro Plaza",
        excerpt: "How we completed a 15,000 sq ft office renovation 2 weeks ahead of schedule with zero safety incidents.",
        content: "When Metro Property Group needed to transform an outdated office space into a modern workplace, they turned to Shall's Construction. The project required complete interior demolition and rebuild while minimizing disruption to neighboring tenants. Through careful planning, weekend work scheduling, and expert project management, we delivered a stunning result ahead of schedule. The space now features an open floor plan, collaborative work areas, and modern finishes that attracted top-tier tenants immediately.",
        category: "Case Studies",
        author: "Michael Shall",
        imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop",
        tags: ["case study", "office renovation", "Bethesda", "project success"],
        featured: false,
      },
      {
        slug: "emergency-response-importance",
        title: "Why 24/7 Emergency Response Matters for Commercial Properties",
        excerpt: "Unexpected building emergencies don't wait for business hours. Learn why immediate response is critical for property managers.",
        content: "A burst pipe at 2 AM. Roof damage during a weekend storm. Electrical failure on a holiday. These emergencies can cause tens of thousands in damage if not addressed immediately. Our 24/7/365 emergency response team has saved clients millions in potential damage over our 25-year history. When you have a reliable emergency partner, you protect your property investment and maintain tenant trust even during crises.",
        category: "Emergency Services",
        author: "David Martinez",
        imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&auto=format&fit=crop",
        tags: ["emergency services", "property management", "risk management", "24/7 response"],
        featured: true,
      },
      {
        slug: "rockville-commercial-real-estate-market-2024",
        title: "Rockville Commercial Real Estate: Market Insights for 2024",
        excerpt: "What property managers need to know about the Rockville commercial market and tenant expectations in 2024.",
        content: "Rockville's commercial real estate market remains strong in 2024, driven by its proximity to major employers and excellent transportation access. Property managers are finding that well-maintained buildings with modern amenities command premium rents. Tenant improvement allowances are trending higher as competition for quality tenants increases. Smart property owners are investing in facility upgrades and preventive maintenance to differentiate their properties in this competitive market.",
        category: "Local Spotlight",
        author: "Jennifer Lee",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
        tags: ["Rockville", "market trends", "commercial real estate", "local market"],
        featured: false,
      },
    ];

    sampleBlogPosts.forEach(post => {
      const id = randomUUID();
      const fullPost: BlogPost = {
        ...post,
        featured: post.featured ?? false,
        id,
        publishedAt: new Date(),
      };
      this.blogPosts.set(id, fullPost);
    });
  }

  private seedTestimonials() {
    // Empty array - ready for real testimonials to be added
    const sampleTestimonials: InsertTestimonial[] = [
      /*
      // Template for adding testimonials:
      {
        clientName: "Client Name",
        company: "Company Name",
        role: "Job Title",
        rating: 5,
        comment: "Testimonial text here...",
        serviceType: "Service Type",
        location: "City, State",
        featured: true/false,
      },
      */
    ];

    sampleTestimonials.forEach(testimonial => {
      const id = randomUUID();
      const fullTestimonial: Testimonial = {
        ...testimonial,
        featured: testimonial.featured ?? false,
        id,
        createdAt: new Date(),
      };
      this.testimonials.set(id, fullTestimonial);
    });
  }

  private seedLocations() {
    const sampleLocations: InsertLocation[] = [
      {
        slug: "bethesda-md",
        name: "Bethesda Service Area",
        city: "Bethesda",
        state: "MD",
        address: "Serving Bethesda and surrounding areas",
        phone: "(301) 555-0100",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49428.01234567890!2d-77.094!3d38.984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU5JzAyLjQiTiA3N8KwMDUnMzguNCJX!5e0!3m2!1sen!2sus!4v1234567890",
        serviceArea: ["Bethesda", "Chevy Chase", "Potomac", "North Bethesda", "Cabin John"],
        description: "Shall's Construction has been serving Bethesda commercial properties for over 25 years. From office buildings to retail centers, we provide comprehensive construction and maintenance services throughout the Bethesda area.",
      },
      {
        slug: "rockville-md",
        name: "Rockville Service Area",
        city: "Rockville",
        state: "MD",
        address: "Serving Rockville and surrounding areas",
        phone: "(301) 555-0100",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49428.01234567890!2d-77.152!3d39.084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDA1JzAyLjQiTiA3N8KwMDknMzguNCJX!5e0!3m2!1sen!2sus!4v1234567890",
        serviceArea: ["Rockville", "North Potomac", "Derwood", "Garrett Park", "Twinbrook"],
        description: "Our Rockville service area includes comprehensive commercial construction and facility maintenance. We specialize in medical office build-outs and professional office spaces throughout Rockville and North Potomac.",
      },
      {
        slug: "silver-spring-md",
        name: "Silver Spring Service Area",
        city: "Silver Spring",
        state: "MD",
        address: "Serving Silver Spring and surrounding areas",
        phone: "(301) 555-0100",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49428.01234567890!2d-77.026!3d38.991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU5JzI3LjYiTiA3N8KwMDEnMzMuNiJX!5e0!3m2!1sen!2sus!4v1234567890",
        serviceArea: ["Silver Spring", "Takoma Park", "Wheaton", "Kensington", "Four Corners"],
        description: "Silver Spring commercial properties trust Shall's Construction for reliable service and quality workmanship. From retail centers to office complexes, we handle projects of all sizes.",
      },
      {
        slug: "baltimore-md",
        name: "Baltimore Service Area",
        city: "Baltimore",
        state: "MD",
        address: "Serving Baltimore and surrounding areas",
        phone: "(410) 555-0100",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49428.01234567890!2d-76.612!3d39.290!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDE3JzI0LjAiTiA3NsKwMzYnNDMuMiJX!5e0!3m2!1sen!2sus!4v1234567890",
        serviceArea: ["Baltimore City", "Towson", "Dundalk", "Catonsville", "Pikesville"],
        description: "Shall's Construction brings 25 years of commercial expertise to Baltimore area properties. Our team specializes in urban commercial projects, warehouse conversions, and historic building renovations.",
      },
      {
        slug: "gaithersburg-md",
        name: "Gaithersburg Service Area",
        city: "Gaithersburg",
        state: "MD",
        address: "Serving Gaithersburg and surrounding areas",
        phone: "(301) 555-0100",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49428.01234567890!2d-77.201!3d39.143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDA4JzM0LjgiTiA3N8KwMTInMDMuNiJX!5e0!3m2!1sen!2sus!4v1234567890",
        serviceArea: ["Gaithersburg", "Germantown", "Montgomery Village", "Redland", "Washington Grove"],
        description: "Gaithersburg's growing business community relies on Shall's Construction for comprehensive facility maintenance and commercial construction services. We serve business parks, office buildings, and retail properties throughout the area.",
      },
      {
        slug: "dc-metro",
        name: "DC Metro Service Area",
        city: "Washington",
        state: "DC",
        address: "Serving Washington DC and Metro area",
        phone: "(202) 555-0100",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49428.01234567890!2d-77.036!3d38.907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU0JzI1LjIiTiA3N8KwMDInMDkuNiJX!5e0!3m2!1sen!2sus!4v1234567890",
        serviceArea: ["Washington DC", "Arlington VA", "Alexandria VA", "Falls Church VA", "McLean VA"],
        description: "Our DC Metro service area encompasses commercial properties throughout Washington DC and Northern Virginia. We specialize in high-end office buildings, government facilities, and Class A commercial properties.",
      },
    ];

    sampleLocations.forEach(location => {
      const id = randomUUID();
      const fullLocation: Location = {
        ...location,
        id,
      };
      this.locations.set(id, fullLocation);
    });
  }

  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.services.values()).find(
      (service) => service.slug === slug
    );
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      b.completionDate.getTime() - a.completionDate.getTime()
    );
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return Array.from(this.projects.values()).find(
      (project) => project.slug === slug
    );
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter((project) => project.featured)
      .sort((a, b) => b.completionDate.getTime() - a.completionDate.getTime());
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter((post) => post.category === category)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getTestimonialsByService(serviceType: string): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values())
      .filter((testimonial) => testimonial.serviceType === serviceType)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values())
      .filter((testimonial) => testimonial.featured)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getAllLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }

  async getLocationBySlug(slug: string): Promise<Location | undefined> {
    return Array.from(this.locations.values()).find(
      (location) => location.slug === slug
    );
  }
}

export const storage = new MemStorage();
