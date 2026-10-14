import { COMPANY, hasProjects, hasSafety } from "./company";

export const SERVICE_SLUGS = [
  "construction-remodeling",
  "handyman-services",
  "exterior-building-services",
  "parking-lot-services",
  "painting-services",
  "snow-removal",
] as const;

export const SERVICE_NAMES: Record<(typeof SERVICE_SLUGS)[number], string> = {
  "construction-remodeling": "Construction & Remodeling",
  "handyman-services": "Handyman Services",
  "exterior-building-services": "Exterior Building Services",
  "parking-lot-services": "Parking Lot Asphalt & Concrete",
  "painting-services": "Painting Services",
  "snow-removal": "Snow Removal",
};

/** Build-date constant used as sitemap lastmod. */
export const BUILD_DATE = "2026-10-14";

export type StaticRoute = { path: string; changefreq: string; priority: string };

/** Routed pages. Drives App.tsx and the sitemap. Projects/Safety only when facts exist. */
export const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/who-we-serve", changefreq: "monthly", priority: "0.8" },
  ...(hasProjects() ? [{ path: "/projects", changefreq: "monthly", priority: "0.7" }] : []),
  ...(hasSafety() ? [{ path: "/safety", changefreq: "monthly", priority: "0.7" }] : []),
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
];

export const SERVICE_ROUTES = SERVICE_SLUGS.map((s) => `/services/${s}`);
export const PROJECT_ROUTES = COMPANY.projects.map((p) => `/projects/${p.slug}`);
export const ALL_ROUTES: string[] = [...STATIC_ROUTES.map((r) => r.path), ...SERVICE_ROUTES, ...PROJECT_ROUTES];

/** Exact legacy redirects (301). Generic trailing-slash strip handles the rest. */
export const LEGACY_REDIRECTS: Record<string, string> = {
  "/what-we-do": "/services/construction-remodeling",
  "/what-we-do/": "/services/construction-remodeling",
  "/who-we-serve/": "/who-we-serve",
  "/contact/": "/contact",
  "/privacy-policy/": "/privacy-policy",
  "/category/article": "/",
  "/category/article/": "/",
  "/your-property-maintenance-checklist-for-the-winter/": "/",
  "/seasonal-checklist/": "/",
  "/hello-world/": "/",
};

/** Gone (410). */
export const GONE_PATTERNS: RegExp[] = [/^\/wp-login\.php$/, /^\/wp-admin(\/.*)?$/];
