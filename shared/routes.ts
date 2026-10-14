/**
 * Every routed, indexable page. Used by the client router (App.tsx), the
 * Express sitemap generator, and launch verification. Add a page here or it
 * does not exist.
 */
export const SERVICE_SLUGS = [
  "construction-remodeling",
  "handyman-services",
  "exterior-building-services",
  "parking-lot-services",
  "painting-services",
  "snow-removal",
] as const;

export const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/who-we-serve", changefreq: "monthly", priority: "0.8" },
  { path: "/projects", changefreq: "monthly", priority: "0.7" },
  { path: "/safety", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
] as const;

export const ALL_ROUTES: string[] = [
  ...STATIC_ROUTES.map((r) => r.path),
  ...SERVICE_SLUGS.map((s) => `/services/${s}`),
];

/** Old WordPress URLs -> new paths (301). Trailing slashes are normalised. */
export const LEGACY_REDIRECTS: Record<string, string> = {
  "/what-we-do": "/services/construction-remodeling",
  "/construction-services": "/services/construction-remodeling",
  "/handyman-services": "/services/handyman-services",
  "/painting-services": "/services/painting-services",
  "/building-exterior-services": "/services/exterior-building-services",
  "/exterior-building-services": "/services/exterior-building-services",
  "/parking-lot-services": "/services/parking-lot-services",
  "/snow-removal": "/services/snow-removal",
  "/snow-removal-services": "/services/snow-removal",
  "/about-us": "/about",
  "/contact-us": "/contact",
  "/privacy-policy": "/privacy",
  "/testimonials": "/about",
  "/service-areas": "/who-we-serve",
  "/articles": "/",
  "/blog": "/",
};
