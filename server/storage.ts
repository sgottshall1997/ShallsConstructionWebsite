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
    const sampleServices: InsertService[] = [
      {
        slug: "construction-remodeling",
        title: "Commercial Construction & Remodeling",
        shortDescription: "Full-service commercial construction, remodeling, and renovation for properties across MD, VA, and DC.",
        fullDescription: "Transform your commercial property with our comprehensive construction and remodeling services. From complete renovations to tenant build-outs, we deliver high-quality results on time and within budget. Our experienced team handles everything from initial planning through final inspection.",
        benefits: [
          "30+ years of commercial construction experience",
          "100% in-house staff and crews",
          "Licensed in MD, VA, DC, and DE",
          "Full project management from start to finish",
          "Minimal disruption to your operations"
        ],
        processSteps: [
          "Initial consultation and site assessment",
          "Design development and budgeting",
          "Permitting and approvals",
          "Construction execution",
          "Final inspection and handover"
        ],
        category: "Construction",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop",
        icon: "Building2",
        featured: true,
        tagline: "Expert commercial construction with safety protocols and minimal tenant disruption",
        philosophy: "When it comes to commercial construction and remodeling, Shall's Construction serves as a property manager's most trusted resource. With over 30 years of experience managing every facet of commercial construction across Montgomery County, Bethesda, and Kensington, Maryland, our team delivers white box spaces, tenant build-outs, office remodeling, and common area upgrades with unwavering quality standards.\n\nOur approach prioritizes safety, clear communication, and operational efficiency. With 95% in-house staff, we maintain direct control over every phase of your project—from initial planning through final execution. Licensed and insured in MD, VA, DC, and DE, we serve commercial retail and office properties, schools, universities, hospitals, medical suites, apartments, HOAs, and government facilities.\n\nWe understand the importance of minimizing disruptions to in-place tenants. Our systematic protocols and experienced project managers ensure your construction project stays on schedule and on budget while your property remains operational. Emergency construction services are available 24/7/365 because we know that urgent needs don't follow business hours.",
        servicesInclude: [
          "White box space preparation for lease",
          "Commercial interior buildout and remodeling",
          "Office renovation and workspace modernization",
          "Retail construction and store fit-outs",
          "Tenant improvement and customization projects",
          "Common area upgrades and modernization",
          "Emergency construction repair services (24/7/365)",
          "ADA compliance upgrades and accessibility improvements",
          "Commercial kitchen and restroom renovations",
          "Lobby and reception area renovations",
          "Conference room and meeting space buildouts",
          "HVAC coordination and mechanical system integration"
        ],
        testimonialQuote: "Shall's Construction completed our 12,000 sq ft office renovation ahead of schedule with zero complaints from tenants. Their project manager communicated daily progress, and the quality exceeded our expectations. They're now our go-to contractor for all construction projects.",
        testimonialAuthor: "Michael Chen",
        testimonialRole: "Senior Property Manager",
        testimonialCompany: "Bethesda Commercial Properties",
        relatedServices: ["interior-fit-out", "tenant-improvements", "demolition", "drywall-services"],
        seoKeywords: [
          "commercial construction Montgomery County MD",
          "office remodeling Bethesda Maryland",
          "tenant build out contractor Kensington",
          "white box construction services Maryland",
          "commercial renovation property manager",
          "retail construction Montgomery County",
          "emergency construction services MD VA DC",
          "licensed commercial contractor Bethesda",
          "common area renovation Kensington MD",
          "commercial interior construction Maryland",
          "property manager construction partner",
          "office renovation contractor DC metro"
        ],
      },
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
      {
        slug: "handyman-services",
        title: "Commercial Handyman Services",
        shortDescription: "Professional commercial handyman services with rapid response and reliable execution for property managers.",
        fullDescription: "Property managers throughout Montgomery County, Bethesda, and Kensington rely on Shall's Construction for comprehensive commercial handyman services that keep their properties operating smoothly. With over 30 years of experience, we handle everything from minor repairs to complex installations with the same level of professionalism and attention to detail.\n\nOur 95% in-house staff model ensures you work with the same skilled technicians who understand your property's unique needs. Licensed in MD, VA, DC, and DE, we provide consistent, high-quality service across your entire portfolio. Our handyman professionals arrive prepared with proper equipment, safety protocols in place, and clear communication about the work scope.\n\nWe specialize in minimizing disruption to tenants while executing repairs efficiently. Whether it's a routine maintenance call or an urgent repair, our systematic approach ensures quality workmanship and timely completion. Emergency handyman services are available 24/7/365 because we understand that building issues don't wait for convenient timing. From office buildings to retail centers, schools to medical facilities, we're the commercial handyman partner property managers trust.",
        benefits: [
          "Door and hardware repair and replacement",
          "Drywall repair and patch work",
          "Fixture installation and mounting services",
          "Light carpentry and trim work",
          "Shelving and storage installation",
          "Window and blind repair",
          "Lock replacement and rekeying coordination",
          "Ceiling tile replacement and grid repair",
          "Minor plumbing repairs and fixture replacement",
          "Electrical outlet and switch replacement",
          "Signage installation and mounting",
          "Emergency handyman response (24/7/365)",
          "Routine maintenance and preventive repairs"
        ],
        processSteps: [
          "Service request and assessment",
          "Scheduling and coordination",
          "Professional repair execution",
          "Quality inspection and testing",
          "Completion and follow-up"
        ],
        category: "Maintenance",
        imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop",
        icon: "Wrench",
        featured: true,
        tagline: "Professional commercial handyman services with rapid response and reliable execution",
        philosophy: "Property managers throughout Montgomery County, Bethesda, and Kensington rely on Shall's Construction for comprehensive commercial handyman services that keep their properties operating smoothly. With over 30 years of experience, we handle everything from minor repairs to complex installations with the same level of professionalism and attention to detail.\n\nOur 95% in-house staff model ensures you work with the same skilled technicians who understand your property's unique needs. Licensed in MD, VA, DC, and DE, we provide consistent, high-quality service across your entire portfolio. Our handyman professionals arrive prepared with proper equipment, safety protocols in place, and clear communication about the work scope.\n\nWe specialize in minimizing disruption to tenants while executing repairs efficiently. Whether it's a routine maintenance call or an urgent repair, our systematic approach ensures quality workmanship and timely completion. Emergency handyman services are available 24/7/365 because we understand that building issues don't wait for convenient timing. From office buildings to retail centers, schools to medical facilities, we're the commercial handyman partner property managers trust.",
        servicesInclude: [
          "Door and hardware repair and replacement",
          "Drywall repair and patch work",
          "Fixture installation and mounting services",
          "Light carpentry and trim work",
          "Shelving and storage installation",
          "Window and blind repair",
          "Lock replacement and rekeying coordination",
          "Ceiling tile replacement and grid repair",
          "Minor plumbing repairs and fixture replacement",
          "Electrical outlet and switch replacement",
          "Signage installation and mounting",
          "Emergency handyman response (24/7/365)",
          "Routine maintenance and preventive repairs"
        ],
        testimonialQuote: "We manage 15 commercial properties, and Shall's handyman team responds faster and more professionally than any contractor we've used. They fixed a critical door lock issue within two hours and followed up to ensure everything worked perfectly. Reliable, skilled, and always professional.",
        testimonialAuthor: "Jennifer Martinez",
        testimonialRole: "Facilities Director",
        testimonialCompany: "Montgomery Property Group",
        relatedServices: ["facility-maintenance", "emergency-services", "drywall-services"],
        seoKeywords: [
          "commercial handyman services Montgomery County",
          "property manager handyman Maryland",
          "commercial maintenance Bethesda MD",
          "handyman contractor Kensington Maryland",
          "office building handyman services",
          "commercial repair services MD VA DC",
          "property maintenance handyman Montgomery County",
          "licensed handyman contractor Bethesda",
          "emergency handyman services Maryland",
          "commercial property repair Kensington",
          "reliable handyman property managers",
          "commercial facility repairs DC metro"
        ],
      },
      {
        slug: "exterior-building-services",
        title: "Exterior Building Services",
        shortDescription: "Comprehensive building exterior solutions with preventive maintenance and emergency response for commercial properties.",
        fullDescription: "Maintaining commercial building exteriors requires specialized expertise and a proactive approach. Since 1992, Shall's Construction has provided property managers in Montgomery County, Bethesda, and Kensington with comprehensive exterior building services that protect their most valuable assets. Our waterproofing contractors and skilled tradesmen understand the intricacies of preserving and repairing building facades, preventing costly water damage, and extending the life of your property's exterior systems.\n\nWith over 30 years of experience across commercial, industrial, retail, healthcare, educational, and multi-family properties, we deliver cost-effective, long-term solutions. Our 95% in-house staff ensures consistent quality and direct accountability on every project. Licensed in MD, VA, DC, and DE, we bring deep technical knowledge to every building exterior challenge.\n\nOur services are designed to work around in-place tenants with minimal disruption through careful planning and efficient execution. We conduct thorough leak investigations, implement proper waterproofing protocols, and use quality materials that stand the test of time. Emergency exterior services are available 24/7/365 because building envelope failures require immediate attention. Whether you need preventive maintenance or urgent repairs, Shall's delivers reliable exterior building solutions.",
        benefits: [
          "Comprehensive waterproofing and restoration",
          "Masonry repair and repointing",
          "Full system joint-sealant replacement",
          "Window caulking and wet glazing",
          "Facade and sidewalk power washing",
          "Leak investigation and repair",
          "Concrete repair and restoration",
          "Expansion joint replacement and installation",
          "Thru-wall flashing and steel lintel repair",
          "Water repellents and sealers application",
          "Window and glass restoration",
          "Garage repair and waterproofing",
          "Pedestrian and traffic coating systems",
          "Emergency exterior repair services (24/7/365)"
        ],
        processSteps: [
          "Comprehensive exterior assessment",
          "Detailed repair planning",
          "Professional execution with minimal disruption",
          "Quality inspection and testing",
          "Final completion and warranty"
        ],
        category: "Specialty",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
        icon: "Home",
        featured: true,
        tagline: "Comprehensive building exterior solutions with preventive maintenance and emergency response",
        philosophy: "Maintaining commercial building exteriors requires specialized expertise and a proactive approach. Since 1992, Shall's Construction has provided property managers in Montgomery County, Bethesda, and Kensington with comprehensive exterior building services that protect their most valuable assets. Our waterproofing contractors and skilled tradesmen understand the intricacies of preserving and repairing building facades, preventing costly water damage, and extending the life of your property's exterior systems.\n\nWith over 30 years of experience across commercial, industrial, retail, healthcare, educational, and multi-family properties, we deliver cost-effective, long-term solutions. Our 95% in-house staff ensures consistent quality and direct accountability on every project. Licensed in MD, VA, DC, and DE, we bring deep technical knowledge to every building exterior challenge.\n\nOur services are designed to work around in-place tenants with minimal disruption through careful planning and efficient execution. We conduct thorough leak investigations, implement proper waterproofing protocols, and use quality materials that stand the test of time. Emergency exterior services are available 24/7/365 because building envelope failures require immediate attention. Whether you need preventive maintenance or urgent repairs, Shall's delivers reliable exterior building solutions.",
        servicesInclude: [
          "Comprehensive waterproofing and restoration",
          "Masonry repair and repointing",
          "Full system joint-sealant replacement",
          "Window caulking and wet glazing",
          "Facade and sidewalk power washing",
          "Leak investigation and repair",
          "Concrete repair and restoration",
          "Expansion joint replacement and installation",
          "Thru-wall flashing and steel lintel repair",
          "Water repellents and sealers application",
          "Window and glass restoration",
          "Garage repair and waterproofing",
          "Pedestrian and traffic coating systems",
          "Emergency exterior repair services (24/7/365)"
        ],
        testimonialQuote: "After struggling with persistent leaks in our office building, Shall's conducted a thorough investigation and implemented a comprehensive waterproofing solution. The work was completed with zero tenant complaints, and we haven't had a single leak since. Their expertise in building exteriors is exceptional.",
        testimonialAuthor: "David Thompson",
        testimonialRole: "Property Manager",
        testimonialCompany: "Kensington Commercial Realty",
        relatedServices: ["parking-lot-services", "emergency-services", "painting-services"],
        seoKeywords: [
          "commercial waterproofing Montgomery County MD",
          "building exterior repair Bethesda Maryland",
          "masonry contractor Kensington MD",
          "facade restoration services Maryland",
          "commercial caulking services Montgomery County",
          "leak investigation repair Bethesda",
          "power washing commercial building Maryland",
          "exterior building maintenance property manager",
          "waterproofing contractor MD VA DC",
          "commercial masonry repair Kensington",
          "building envelope services Montgomery County",
          "exterior restoration contractor Bethesda MD"
        ],
      },
      {
        slug: "parking-lot-services",
        title: "Parking Lot Services",
        shortDescription: "Professional parking lot maintenance with attention to detail and operational efficiency for commercial properties.",
        fullDescription: "At Shall's Construction, we understand that parking lot maintenance requires precision, proper equipment, and minimal disruption to your business operations. For over 30 years, commercial property managers in Montgomery County, Bethesda, and Kensington have trusted us for comprehensive parking lot services—from asphalt paving and sealcoating to striping and ADA compliance upgrades.\n\nOur expertise spans all aspects of parking lot preservation. We take time to understand your specific needs and budget, then craft an efficient plan executed by our 95% in-house team of professionals with specialized equipment and training. Licensed in MD, VA, DC, and DE, we maintain the highest standards of quality craftsmanship from initial assessment through final striping.\n\nWe excel at working proficiently around in-place tenants, scheduling work during off-hours when necessary to minimize business disruption. Whether your property needs a complete mill and overlay, concrete sidewalk repair, or routine sealcoating, we have the skills and practical experience to execute it right the first time. Our clients in retail, commercial, government, hospital, and education sectors rely on our systematic approach and 24/7/365 emergency response for urgent parking lot issues.",
        benefits: [
          "Asphalt paving and mill-and-overlay",
          "Asphalt patching and pothole repair",
          "Sealcoating and surface protection",
          "Parking lot striping and stenciling",
          "ADA compliance upgrades and accessibility",
          "Concrete sidewalk repair and replacement",
          "Curb and gutter installation and repair",
          "Speed bump installation and traffic control",
          "Storm drain and inlet repair",
          "Loading dock concrete work",
          "Bollard and column installation",
          "Rout and seal crack repair",
          "Stamped concrete and decorative finishes",
          "Emergency parking lot repair (24/7/365)"
        ],
        processSteps: [
          "Site assessment and planning",
          "Scheduling coordination",
          "Professional execution with minimal disruption",
          "Quality inspection",
          "Final completion and cleanup"
        ],
        category: "Specialty",
        imageUrl: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&auto=format&fit=crop",
        icon: "Car",
        featured: true,
        tagline: "Professional parking lot maintenance with attention to detail and operational efficiency",
        philosophy: "At Shall's Construction, we understand that parking lot maintenance requires precision, proper equipment, and minimal disruption to your business operations. For over 30 years, commercial property managers in Montgomery County, Bethesda, and Kensington have trusted us for comprehensive parking lot services—from asphalt paving and sealcoating to striping and ADA compliance upgrades.\n\nOur expertise spans all aspects of parking lot preservation. We take time to understand your specific needs and budget, then craft an efficient plan executed by our 95% in-house team of professionals with specialized equipment and training. Licensed in MD, VA, DC, and DE, we maintain the highest standards of quality craftsmanship from initial assessment through final striping.\n\nWe excel at working proficiently around in-place tenants, scheduling work during off-hours when necessary to minimize business disruption. Whether your property needs a complete mill and overlay, concrete sidewalk repair, or routine sealcoating, we have the skills and practical experience to execute it right the first time. Our clients in retail, commercial, government, hospital, and education sectors rely on our systematic approach and 24/7/365 emergency response for urgent parking lot issues.",
        servicesInclude: [
          "Asphalt paving and mill-and-overlay",
          "Asphalt patching and pothole repair",
          "Sealcoating and surface protection",
          "Parking lot striping and stenciling",
          "ADA compliance upgrades and accessibility",
          "Concrete sidewalk repair and replacement",
          "Curb and gutter installation and repair",
          "Speed bump installation and traffic control",
          "Storm drain and inlet repair",
          "Loading dock concrete work",
          "Bollard and column installation",
          "Rout and seal crack repair",
          "Stamped concrete and decorative finishes",
          "Emergency parking lot repair (24/7/365)"
        ],
        testimonialQuote: "Shall's resurfaced our 200-space parking lot over a weekend with perfect execution. Their crew worked efficiently, communicated clearly, and the lot was ready Monday morning as promised. The striping is flawless and they handled ADA compliance upgrades seamlessly. True professionals.",
        testimonialAuthor: "Robert Kim",
        testimonialRole: "Facilities Manager",
        testimonialCompany: "Bethesda Medical Plaza",
        relatedServices: ["exterior-building-services", "snow-removal", "emergency-services"],
        seoKeywords: [
          "parking lot paving Montgomery County MD",
          "asphalt repair Bethesda Maryland",
          "sealcoating services Kensington MD",
          "parking lot striping Montgomery County",
          "commercial asphalt contractor Bethesda",
          "ADA parking lot compliance Maryland",
          "parking lot maintenance property manager",
          "concrete sidewalk repair Montgomery County",
          "asphalt paving contractor MD VA DC",
          "parking lot resurfacing Kensington",
          "commercial paving services Bethesda MD",
          "parking lot contractor property managers Maryland"
        ],
      },
      {
        slug: "painting-services",
        title: "Commercial Painting Services",
        shortDescription: "Expert commercial painting with precision craftsmanship and minimal tenant disruption for properties across MD, VA, and DC.",
        fullDescription: "Professional commercial painting does more than refresh your building's appearance—it adds long-term value and protects your property investment. Shall's Construction brings over 30 years of specialized experience in interior and exterior commercial painting across Montgomery County, Bethesda, and Kensington, Maryland. Our comprehensive approach includes expert surface preparation, quality materials, and precise application techniques that deliver lasting results.\n\nWith 95% in-house staff, our professional painting team maintains consistent quality standards on every project. Licensed in MD, VA, DC, and DE, we provide integrated commercial painting services including wall coverings, wood treatments, drywall, textured coating systems, specialty finishes, and garage sealing. We excel at working around in-place tenants with carefully planned scheduling and systematic protocols that minimize disruption.\n\nOur experienced team provides expert guidance on materials, finishes, design options, and color schemes to help property managers make informed decisions. From interior common spaces and office renovations to retail shopping centers and parking garage coatings, we deliver full-spectrum commercial painting services. Projects of all sizes benefit from our attention to detail, quality craftsmanship, and commitment to completing work on schedule and within budget.",
        benefits: [
          "Interior commercial painting and wall finishes",
          "Exterior building painting and coatings",
          "Specialty coatings and protective finishes",
          "Parking garage painting and sealing",
          "Surface preparation and repair",
          "Wall covering installation and removal",
          "Wood treatment and staining",
          "Drywall repair and finishing",
          "Textured coating systems application",
          "Common area and lobby painting",
          "Office and retail space painting",
          "Epoxy floor coating and sealing"
        ],
        processSteps: [
          "Color consultation and planning",
          "Surface preparation",
          "Professional painting execution",
          "Quality inspection",
          "Final walkthrough and completion"
        ],
        category: "Specialty",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop",
        icon: "Paintbrush",
        featured: true,
        tagline: "Expert commercial painting with precision craftsmanship and minimal tenant disruption",
        philosophy: "Professional commercial painting does more than refresh your building's appearance—it adds long-term value and protects your property investment. Shall's Construction brings over 30 years of specialized experience in interior and exterior commercial painting across Montgomery County, Bethesda, and Kensington, Maryland. Our comprehensive approach includes expert surface preparation, quality materials, and precise application techniques that deliver lasting results.\n\nWith 95% in-house staff, our professional painting team maintains consistent quality standards on every project. Licensed in MD, VA, DC, and DE, we provide integrated commercial painting services including wall coverings, wood treatments, drywall, textured coating systems, specialty finishes, and garage sealing. We excel at working around in-place tenants with carefully planned scheduling and systematic protocols that minimize disruption.\n\nOur experienced team provides expert guidance on materials, finishes, design options, and color schemes to help property managers make informed decisions. From interior common spaces and office renovations to retail shopping centers and parking garage coatings, we deliver full-spectrum commercial painting services. Projects of all sizes benefit from our attention to detail, quality craftsmanship, and commitment to completing work on schedule and within budget.",
        servicesInclude: [
          "Interior commercial painting and wall finishes",
          "Exterior building painting and coatings",
          "Specialty coatings and protective finishes",
          "Parking garage painting and sealing",
          "Surface preparation and repair",
          "Wall covering installation and removal",
          "Wood treatment and staining",
          "Drywall repair and finishing",
          "Textured coating systems application",
          "Common area and lobby painting",
          "Office and retail space painting",
          "Epoxy floor coating and sealing"
        ],
        testimonialQuote: "We hired Shall's to paint our 50,000 sq ft office building interior and they exceeded expectations. Work was completed in phases with zero disruption to tenants. The attention to detail was remarkable—perfectly straight lines, no overspray, thorough cleanup. Exceptional commercial painters.",
        testimonialAuthor: "Lisa Anderson",
        testimonialRole: "Property Manager",
        testimonialCompany: "Montgomery County Office Properties",
        relatedServices: ["drywall-services", "construction-remodeling", "exterior-building-services"],
        seoKeywords: [
          "commercial painting Montgomery County MD",
          "office painting services Bethesda Maryland",
          "interior painting contractor Kensington MD",
          "exterior commercial painting Maryland",
          "property manager painting services Montgomery County",
          "commercial painter Bethesda MD",
          "garage painting and sealing Kensington",
          "specialty coatings contractor Maryland",
          "commercial painting contractor MD VA DC",
          "office building painting Bethesda",
          "retail painting services Montgomery County",
          "professional commercial painter property managers"
        ],
      },
      {
        slug: "snow-removal",
        title: "Snow Removal Services",
        shortDescription: "Reliable snow and ice management ensuring safe property access with minimal disruption for commercial properties.",
        fullDescription: "Winter weather doesn't wait for convenient timing, and neither do property managers who need reliable snow and ice management. Shall's Construction has provided professional snow removal services throughout Montgomery County, Bethesda, and Kensington, Maryland for over 30 years. Our systematic approach ensures your commercial property remains safely accessible during winter months while minimizing disruption to tenants and operations.\n\nWith 95% in-house staff and specialized snow removal equipment, we respond quickly to winter weather events with pre-planned protocols and efficient execution. Licensed in MD, VA, DC, and DE, we serve commercial properties, retail centers, office buildings, medical facilities, educational institutions, and multi-family communities. Our teams work during off-hours when possible, coordinating carefully to maintain business continuity.\n\nWe pride ourselves on prompt response, thorough snow clearing, and professional ice management using proper de-icing techniques. Our crews plan work efficiently—often completing service before tenants arrive, so they may not even know we were on-site. Emergency snow removal services are available 24/7/365 because we understand that safe property access is critical for your business operations and liability management. From pre-season planning through final spring cleanup, Shall's delivers dependable winter property maintenance.",
        benefits: [
          "Commercial parking lot snow plowing",
          "Sidewalk and walkway snow clearing",
          "Professional ice management and de-icing",
          "Pre-storm preparation and salt application",
          "Loading dock and entrance clearing",
          "Stairway and ramp ice removal",
          "24/7/365 emergency snow response",
          "Post-storm cleanup and hauling",
          "Pre-season planning and contracts",
          "Real-time weather monitoring and coordination",
          "Anti-icing preventive treatments",
          "Seasonal equipment preparation and standby crews"
        ],
        processSteps: [
          "Pre-season planning and contract",
          "Real-time weather monitoring",
          "Rapid snow removal response",
          "Ice management and de-icing",
          "Post-storm inspection and cleanup"
        ],
        category: "Maintenance",
        imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&auto=format&fit=crop",
        icon: "Snowflake",
        featured: true,
        tagline: "Reliable snow and ice management ensuring safe property access with minimal disruption",
        philosophy: "Winter weather doesn't wait for convenient timing, and neither do property managers who need reliable snow and ice management. Shall's Construction has provided professional snow removal services throughout Montgomery County, Bethesda, and Kensington, Maryland for over 30 years. Our systematic approach ensures your commercial property remains safely accessible during winter months while minimizing disruption to tenants and operations.\n\nWith 95% in-house staff and specialized snow removal equipment, we respond quickly to winter weather events with pre-planned protocols and efficient execution. Licensed in MD, VA, DC, and DE, we serve commercial properties, retail centers, office buildings, medical facilities, educational institutions, and multi-family communities. Our teams work during off-hours when possible, coordinating carefully to maintain business continuity.\n\nWe pride ourselves on prompt response, thorough snow clearing, and professional ice management using proper de-icing techniques. Our crews plan work efficiently—often completing service before tenants arrive, so they may not even know we were on-site. Emergency snow removal services are available 24/7/365 because we understand that safe property access is critical for your business operations and liability management. From pre-season planning through final spring cleanup, Shall's delivers dependable winter property maintenance.",
        servicesInclude: [
          "Commercial parking lot snow plowing",
          "Sidewalk and walkway snow clearing",
          "Professional ice management and de-icing",
          "Pre-storm preparation and salt application",
          "Loading dock and entrance clearing",
          "Stairway and ramp ice removal",
          "24/7/365 emergency snow response",
          "Post-storm cleanup and hauling",
          "Pre-season planning and contracts",
          "Real-time weather monitoring and coordination",
          "Anti-icing preventive treatments",
          "Seasonal equipment preparation and standby crews"
        ],
        testimonialQuote: "Shall's snow removal service is outstanding. They respond before the storm hits, clear everything thoroughly, and communicate proactively. Our tenants never complain because the parking lot and sidewalks are always safe and accessible. Worth every penny for the reliability and professionalism.",
        testimonialAuthor: "Patricia Williams",
        testimonialRole: "Senior Property Manager",
        testimonialCompany: "Kensington Retail Properties",
        relatedServices: ["parking-lot-services", "emergency-services", "facility-maintenance"],
        seoKeywords: [
          "commercial snow removal Montgomery County MD",
          "snow plowing services Bethesda Maryland",
          "ice management Kensington MD",
          "winter property maintenance Montgomery County",
          "commercial snow contractor Bethesda",
          "parking lot snow removal Maryland",
          "property manager snow services MD",
          "24/7 snow removal Montgomery County",
          "commercial snow plowing Kensington MD",
          "winter maintenance contractor Bethesda",
          "snow and ice management property managers Maryland",
          "reliable snow removal services MD VA DC"
        ],
      },
    ];

    sampleServices.forEach(service => {
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
    const sampleTestimonials: InsertTestimonial[] = [
      {
        clientName: "Robert Chen",
        company: "Metro Property Group",
        role: "Senior Property Manager",
        rating: 5,
        comment: "Shall's Construction has been our go-to contractor for over 10 years. Their reliability, quality work, and competitive pricing keep us coming back. The Bethesda Metro Plaza project was completed ahead of schedule with exceptional results.",
        serviceType: "Interior Fit-Out",
        location: "Bethesda, MD",
        featured: true,
      },
      {
        clientName: "Amanda Williams",
        company: "HealthFirst Properties",
        role: "Facilities Director",
        rating: 5,
        comment: "The team's expertise in medical facility build-outs is unmatched. They understood our unique requirements and delivered a space that exceeded our expectations. Communication throughout the project was excellent.",
        serviceType: "Tenant Improvements",
        location: "Rockville, MD",
        featured: true,
      },
      {
        clientName: "James Thompson",
        company: "Retail Realty Partners",
        role: "Portfolio Manager",
        rating: 5,
        comment: "We've worked with many contractors over the years, but Shall's stands out for their professionalism and attention to detail. The Silver Spring project transformed our property and increased tenant interest significantly.",
        serviceType: "Exterior Building Services",
        location: "Silver Spring, MD",
        featured: true,
      },
      {
        clientName: "Lisa Rodriguez",
        company: "Commerce Park Management",
        role: "Property Manager",
        rating: 5,
        comment: "Their preventive maintenance program has saved us thousands in emergency repairs. The team is responsive, professional, and always follows through. We've renewed our contract for the third year running.",
        serviceType: "Facility Maintenance",
        location: "Gaithersburg, MD",
        featured: false,
      },
      {
        clientName: "Michael Brown",
        company: "Capital Office Properties",
        role: "Asset Manager",
        rating: 5,
        comment: "The lobby renovation was flawless. They worked evenings and weekends to avoid disrupting our tenants, and the result speaks for itself. Our building now commands higher rental rates thanks to this upgrade.",
        serviceType: "Interior Fit-Out",
        location: "Washington, DC",
        featured: true,
      },
      {
        clientName: "Patricia Davis",
        company: "Urban Development LLC",
        role: "Development Director",
        rating: 5,
        comment: "Converting our historic warehouse was a complex project requiring contractors who understand both preservation and modern construction. Shall's Construction delivered beyond our expectations.",
        serviceType: "Construction",
        location: "Baltimore, MD",
        featured: false,
      },
      {
        clientName: "Kevin Patel",
        company: "Dining Concepts Group",
        role: "Owner",
        rating: 5,
        comment: "They completed our restaurant build-out in just 8 weeks, allowing us to open for the holiday season. Their knowledge of restaurant-specific requirements and code compliance was invaluable.",
        serviceType: "Tenant Improvements",
        location: "Bethesda, MD",
        featured: false,
      },
      {
        clientName: "Susan Martinez",
        company: "City Center Parking LLC",
        role: "Operations Manager",
        rating: 5,
        comment: "The parking garage restoration was a massive undertaking. Shall's phased approach kept us operational while addressing serious structural issues. The project came in on budget and on time.",
        serviceType: "Exterior Building Services",
        location: "Rockville, MD",
        featured: false,
      },
      {
        clientName: "Thomas Anderson",
        company: "Associa Management",
        role: "Regional Manager",
        rating: 5,
        comment: "We manage properties across the DMV area and rely on Shall's for emergency services. Their 24/7 response has saved us from disaster multiple times. Simply the best emergency contractor in the region.",
        serviceType: "Emergency Services",
        location: "Silver Spring, MD",
        featured: true,
      },
      {
        clientName: "Rachel Kim",
        company: "American Community Management",
        role: "Property Manager",
        rating: 5,
        comment: "Professional, reliable, and fairly priced. Their general maintenance team handles everything from minor repairs to major projects with the same level of care and quality. Highly recommended.",
        serviceType: "General Maintenance",
        location: "Gaithersburg, MD",
        featured: false,
      },
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
