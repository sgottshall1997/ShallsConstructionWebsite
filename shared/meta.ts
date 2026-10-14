import { COMPANY, yearsText } from "./company";

/**
 * One meta description per routed page (max 155 chars), written only from that
 * page's H1 and first paragraph. Passed to <SEO description>.
 */
export const META_DESCRIPTIONS: Record<string, string> = {
  "/": `Commercial construction & property maintenance for property managers in ${COMPANY.regionShort}. We show up, deliver, and finish the job right.`,
  "/about": `Making property management easier: ${COMPANY.name}, based in ${COMPANY.address.city}, ${COMPANY.address.state}, has served property managers for ${yearsText()}.`,
  "/who-we-serve": `Built for property managers. For ${yearsText()}, ${COMPANY.name} has served property managers across ${COMPANY.regionShort}.`,
  "/contact": `Contact ${COMPANY.name}. Call for a consultation, or send a work order or quote request.`,
  "/privacy-policy": `Privacy policy: how ${COMPANY.legalName} handles information submitted through the shallsconstruction.com contact form.`,
  "/services/construction-remodeling": `Construction & remodeling for property managers: tenant buildouts, office remodels, and lobby renovations done right and on time.`,
  "/services/handyman-services": `Handyman services for property managers: drywall patches, door repairs, ceiling tiles, and fixtures, handled efficiently without the runaround.`,
  "/services/exterior-building-services": `Exterior building services: our waterproofing and masonry crews investigate leaks, repair the building envelope, and restore facades.`,
  "/services/parking-lot-services": `Parking lot asphalt & concrete: crack sealing, sealcoating, resurfacing, and fresh striping for ADA compliance, scheduled to minimize disruption.`,
  "/services/painting-services": `Commercial painting services across ${COMPANY.regionShort}: proper surface prep, quality paints, careful application, and complete cleanup.`,
  "/services/snow-removal": `Snow removal and ice management for property managers in ${COMPANY.regionShort}, with pre-season planning and lots cleared early.`,
};
