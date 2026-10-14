import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { sendContactNotification } from "./email";
import { LEGACY_REDIRECTS, SERVICE_SLUGS, STATIC_ROUTES } from "@shared/routes";
import { COMPANY } from "@shared/company";
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

  // Public API routes
  app.get("/api/articles", async (_req, res) => {
    try {
      const articles = await storage.getAllArticles();
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/services", async (_req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:slug", async (req, res) => {
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

  app.get("/api/projects/featured", async (_req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      res.status(500).json({ error: "Failed to fetch featured projects" });
    }
  });

  app.get("/api/projects/:slug", async (req, res) => {
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

  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/blog/category/:category", async (req, res) => {
    try {
      const blogPosts = await storage.getBlogPostsByCategory(req.params.category);
      res.json(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts by category:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
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

  app.get("/api/blog", async (_req, res) => {
    try {
      const blogPosts = await storage.getAllBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/testimonials/featured", async (_req, res) => {
    try {
      const testimonials = await storage.getFeaturedTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching featured testimonials:", error);
      res.status(500).json({ error: "Failed to fetch featured testimonials" });
    }
  });

  app.get("/api/testimonials/service/:serviceType", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonialsByService(req.params.serviceType);
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials by service:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/locations/:slug", async (req, res) => {
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

  app.get("/api/locations", async (_req, res) => {
    try {
      const locations = await storage.getAllLocations();
      res.json(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSubmissionSchema.safeParse(req.body);

      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ error: validationError.message });
      }

      // Honeypot: accept and return 200 without storing or emailing
      if (result.data.website && result.data.website.trim().length > 0) {
        return res.status(200).json({ ok: true });
      }

      const submission = await storage.createContactSubmission(result.data);
      try {
        await sendContactNotification(result.data);
      } catch (mailErr) {
        console.error("Contact email failed (submission still stored):", mailErr);
      }
      res.status(201).json({ ok: true, id: submission.id });
    } catch (error) {
      console.error("Error creating contact submission:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Legacy WordPress / trailing-slash redirects (301)
  app.use((req, res, next) => {
    const raw = req.path;
    const query = req.url.slice(raw.length);
    const normalized = raw.length > 1 ? raw.replace(/\/+$/, "") : raw;
    const legacy = LEGACY_REDIRECTS[normalized.toLowerCase()];
    if (legacy) return res.redirect(301, legacy + query);
    if (normalized !== raw) return res.redirect(301, normalized + query);
    next();
  });

  app.get("/api/health", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  app.get("/sitemap.xml", (_req, res) => {
    try {
      const baseUrl = COMPANY.url;
      const lastmod = "2026-10-14";
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      for (const route of STATIC_ROUTES) {
        xml += "  <url>\n";
        xml += `    <loc>${baseUrl}${route.path === "/" ? "/" : route.path}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += "  </url>\n";
      }

      for (const slug of SERVICE_SLUGS) {
        xml += "  <url>\n";
        xml += `    <loc>${baseUrl}/services/${slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += "    <changefreq>monthly</changefreq>\n";
        xml += "    <priority>0.8</priority>\n";
        xml += "  </url>\n";
      }

      for (const project of COMPANY.projects) {
        xml += "  <url>\n";
        xml += `    <loc>${baseUrl}/projects/${project.slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += "    <changefreq>monthly</changefreq>\n";
        xml += "    <priority>0.6</priority>\n";
        xml += "  </url>\n";
      }

      xml += "</urlset>";
      res.set("Content-Type", "application/xml");
      res.send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  app.get("/robots.txt", (_req, res) => {
    const candidates = [
      path.resolve(import.meta.dirname, "public", "robots.txt"),
      path.resolve(import.meta.dirname, "..", "public", "robots.txt"),
    ];
    const robotsPath = candidates.find((c) => fs.existsSync(c));
    if (robotsPath) {
      res.type("text/plain");
      res.sendFile(robotsPath);
    } else {
      res
        .type("text/plain")
        .send(`User-agent: *\nAllow: /\n\nSitemap: ${COMPANY.url}/sitemap.xml\n`);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
