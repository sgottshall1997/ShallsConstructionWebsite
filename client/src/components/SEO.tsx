import { Helmet } from "react-helmet-async";
import { generateLocalBusinessSchema, generateOrganizationSchema } from "@/lib/schema";
import { COMPANY } from "@shared/company";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schemas?: object[];
  noindex?: boolean;
  /** When true, do not auto-inject Organization/LocalBusiness (caller provides them once). */
  skipDefaultSchemas?: boolean;
}

export default function SEO({
  title, description, canonical, ogImage, schemas = [], noindex = false, skipDefaultSchemas = false,
}: SEOProps) {
  const siteName = COMPANY.legalName;
  const fullTitle = title.includes(siteName) || title.includes(COMPANY.name) ? title : `${title} | ${COMPANY.name}`;
  const path = canonical
    ? canonical.replace(/^https?:\/\/[^/]+/, "") || "/"
    : typeof window !== "undefined" ? window.location.pathname : "/";
  const canonicalUrl = path === "/" ? `${COMPANY.url}/` : `${COMPANY.url}${path}`;
  const imageUrl = ogImage || `${COMPANY.url}/og-image.png`;
  const gscVerification = import.meta.env.VITE_GSC_VERIFICATION;

  // Exactly one Organization + one LocalBusiness site-wide; pages may add FAQ/Breadcrumb/Service.
  const hasOrg = schemas.some((s: any) => s["@type"] === "Organization");
  const hasLB = schemas.some((s: any) =>
    s["@type"] === "LocalBusiness" || (Array.isArray(s["@type"]) && s["@type"].includes("LocalBusiness")),
  );
  const allSchemas = skipDefaultSchemas
    ? schemas
    : [
        ...(hasOrg ? [] : [generateOrganizationSchema()]),
        ...(hasLB ? [] : [generateLocalBusinessSchema()]),
        ...schemas,
      ];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      {gscVerification && <meta name="google-site-verification" content={gscVerification} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {allSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
}
