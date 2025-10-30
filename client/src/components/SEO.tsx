import { Helmet } from "react-helmet-async";
import { generateLocalBusinessSchema } from "@/lib/schema";

interface SEOProps {
  title: string;
  description: string;
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
  const siteName = "Shall's Construction LLC";
  const baseUrl = "https://shallsconstruction.replit.app";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const canonicalUrl = canonical || (typeof window !== "undefined" ? `${baseUrl}${window.location.pathname}` : baseUrl);
  const imageUrl = ogImage || `${baseUrl}/og-image.png`;
  
  // Google Search Console verification code from environment variables
  const gscVerification = import.meta.env.VITE_GSC_VERIFICATION;

  // Include LocalBusiness schema only if not already provided in schemas array
  const hasLocalBusiness = schemas.some(
    (schema: any) => schema["@type"] && 
    (schema["@type"] === "LocalBusiness" || 
     (Array.isArray(schema["@type"]) && schema["@type"].includes("LocalBusiness")))
  );
  const allSchemas = hasLocalBusiness ? schemas : [generateLocalBusinessSchema(), ...schemas];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Google Search Console Verification */}
      {gscVerification && <meta name="google-site-verification" content={gscVerification} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />

      {/* JSON-LD Schemas */}
      {allSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
