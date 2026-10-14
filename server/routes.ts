import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { sendContactNotification } from "./email";
import { LEGACY_REDIRECTS, GONE_PATTERNS, SERVICE_SLUGS, STATIC_ROUTES, BUILD_DATE } from "@shared/routes";
import { COMPANY } from "@shared/company";
import path from "path";
import fs from "fs";

const contactLimiter = rateLimit({
  windowMs: 60_000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again shortly." },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Public API routes

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







  app.get("/api/testimonials/featured", async (_req, res) => {
    try {
      const testimonials = await storage.getFeaturedTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching featured testimonials:", error);
      res.status(500).json({ error: "Failed to fetch featured testimonials" });
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



  app.post("/api/contact", contactLimiter, async (req, res) => {
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

      const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip;
      const mail = await sendContactNotification(result.data, { ip });
      if (!mail.ok) {
        return res.status(500).json({ error: mail.error });
      }

      const submission = await storage.createContactSubmission(result.data);
      res.status(201).json({ ok: true, id: submission.id });
    } catch (error) {
      console.error("Error creating contact submission:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Legacy WordPress / trailing-slash redirects (301) and Gone (410)
  app.use((req, res, next) => {
    const raw = req.path;
    const query = req.url.slice(raw.length);
    const lower = raw.toLowerCase();
    if (GONE_PATTERNS.some((re) => re.test(lower))) {
      return res.status(410).type("text/plain").send("Gone");
    }
    const legacyExact = LEGACY_REDIRECTS[lower] ?? LEGACY_REDIRECTS[raw];
    if (legacyExact) return res.redirect(301, legacyExact + query);
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
      const lastmod = BUILD_DATE;
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
