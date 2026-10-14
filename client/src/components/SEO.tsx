import { Helmet } from "react-helmet-async";
import { generateLocalBusinessSchema } from "@/lib/schema";
import { COMPANY } from "@shared/company";

interface SEOProps {
  title: string;
  description: string;
  /** Path ("/about") or absolute URL. Always resolved against COMPANY.url. */
  canonical?: string;
  ogImage?: string;
  schemas?: object[];
  noindex?: boolean;
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  schemas = [],
  noindex = false,
}: SEOProps) {
  const siteName = COMPANY.legalName;
  const baseUrl = COMPANY.url;
  const fullTitle =
    title.includes(siteName) || title.includes(COMPANY.shortName) ? title : `${title} | ${siteName}`;
  const path = canonical
    ? canonical.replace(/^https?:\/\/[^/]+/, "") || "/"
    : typeof window !== "undefined"
      ? window.location.pathname
      : "/";
  const canonicalUrl = path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`;
  const imageUrl = ogImage || `${baseUrl}/og-image.png`;
  const gscVerification = import.meta.env.VITE_GSC_VERIFICATION;

  const hasLocalBusiness = schemas.some(
    (schema: any) =>
      schema["@type"] &&
      (schema["@type"] === "LocalBusiness" ||
        (Array.isArray(schema["@type"]) && schema["@type"].includes("LocalBusiness"))),
  );
  const allSchemas = hasLocalBusiness ? schemas : [generateLocalBusinessSchema(), ...schemas];

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
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
