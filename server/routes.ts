import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import path from "path";
import fs from "fs";

// Authentication middleware
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes (public)
  app.post("/api/auth/login", (req, res) => {
    const { password } = req.body;
    const sitePassword = process.env.SITE_PASSWORD;
    
    if (!sitePassword) {
      // If no password is set, allow access
      req.session.authenticated = true;
      return res.json({ success: true });
    }
    
    if (password === sitePassword) {
      req.session.authenticated = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Failed to logout" });
      } else {
        res.json({ success: true });
      }
    });
  });

  app.get("/api/auth/check", (req, res) => {
    const sitePassword = process.env.SITE_PASSWORD;
    res.json({ 
      authenticated: req.session.authenticated || !sitePassword,
      passwordRequired: !!sitePassword
    });
  });

  // Protected routes
  app.get("/api/articles", requireAuth, async (_req, res) => {
    try {
      const articles = await storage.getAllArticles();
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/services", requireAuth, async (_req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:slug", requireAuth, async (req, res) => {
    try {
      const service = await storage.getServiceBySlug(req.params.slug);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ error: "Failed to fetch service" });
    }
  });

  app.get("/api/projects/featured", requireAuth, async (_req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      res.status(500).json({ error: "Failed to fetch featured projects" });
    }
  });

  app.get("/api/projects/:slug", requireAuth, async (req, res) => {
    try {
      const project = await storage.getProjectBySlug(req.params.slug);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.get("/api/projects", requireAuth, async (_req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/blog/category/:category", requireAuth, async (req, res) => {
    try {
      const blogPosts = await storage.getBlogPostsByCategory(req.params.category);
      res.json(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts by category:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", requireAuth, async (req, res) => {
    try {
      const blogPost = await storage.getBlogPostBySlug(req.params.slug);
      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.get("/api/blog", requireAuth, async (_req, res) => {
    try {
      const blogPosts = await storage.getAllBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/testimonials/featured", requireAuth, async (_req, res) => {
    try {
      const testimonials = await storage.getFeaturedTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching featured testimonials:", error);
      res.status(500).json({ error: "Failed to fetch featured testimonials" });
    }
  });

  app.get("/api/testimonials/service/:serviceType", requireAuth, async (req, res) => {
    try {
      const testimonials = await storage.getTestimonialsByService(req.params.serviceType);
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials by service:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/testimonials", requireAuth, async (_req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/locations/:slug", requireAuth, async (req, res) => {
    try {
      const location = await storage.getLocationBySlug(req.params.slug);
      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }
      res.json(location);
    } catch (error) {
      console.error("Error fetching location:", error);
      res.status(500).json({ error: "Failed to fetch location" });
    }
  });

  app.get("/api/locations", requireAuth, async (_req, res) => {
    try {
      const locations = await storage.getAllLocations();
      res.json(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  });

  app.post("/api/contact", requireAuth, async (req, res) => {
    try {
      const result = insertContactSubmissionSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ error: validationError.message });
      }

      const submission = await storage.createContactSubmission(result.data);
      res.status(201).json(submission);
    } catch (error) {
      console.error("Error creating contact submission:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const [services, projects, blogPosts] = await Promise.all([
        storage.getAllServices(),
        storage.getAllProjects(),
        storage.getAllBlogPosts()
      ]);

      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://shallsconstruction.com'
        : `http://localhost:5000`;

      const today = new Date().toISOString().split('T')[0];

      const staticRoutes = [
        { loc: '/', priority: '1.0', changefreq: 'weekly' },
        { loc: '/about', priority: '0.8', changefreq: 'monthly' },
        { loc: '/what-we-do', priority: '0.8', changefreq: 'monthly' },
        { loc: '/who-we-serve', priority: '0.8', changefreq: 'monthly' },
        { loc: '/projects', priority: '0.8', changefreq: 'monthly' },
        { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
        { loc: '/service-areas', priority: '0.8', changefreq: 'monthly' },
        { loc: '/service-areas/bethesda-md', priority: '0.7', changefreq: 'yearly' },
        { loc: '/service-areas/rockville-md', priority: '0.7', changefreq: 'yearly' },
        { loc: '/service-areas/silver-spring-md', priority: '0.7', changefreq: 'yearly' },
        { loc: '/service-areas/baltimore-md', priority: '0.7', changefreq: 'yearly' },
        { loc: '/service-areas/gaithersburg-md', priority: '0.7', changefreq: 'yearly' },
        { loc: '/service-areas/dc-metro', priority: '0.7', changefreq: 'yearly' },
        { loc: '/safety', priority: '0.8', changefreq: 'monthly' },
        { loc: '/testimonials', priority: '0.8', changefreq: 'monthly' },
        { loc: '/contact', priority: '0.8', changefreq: 'monthly' }
      ];

      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      staticRoutes.forEach(route => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}${route.loc}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += '  </url>\n';
      });

      services.forEach(service => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/services/${service.slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += '  </url>\n';
      });

      projects.forEach(project => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/projects/${project.slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += '  </url>\n';
      });

      blogPosts.forEach(post => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += '  </url>\n';
      });

      xml += '</urlset>';

      res.set('Content-Type', 'application/xml');
      res.send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  app.get("/robots.txt", (_req, res) => {
    const robotsPath = path.resolve(import.meta.dirname, "..", "public", "robots.txt");
    if (fs.existsSync(robotsPath)) {
      res.type("text/plain");
      res.sendFile(robotsPath);
    } else {
      res.status(404).send("Robots.txt not found");
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
