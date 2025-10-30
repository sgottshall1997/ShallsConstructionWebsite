import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { Building2, CheckCircle2 } from "lucide-react";
import associaLogo from "@assets/Associa_1761838352452.png";
import comsourceLogo from "@assets/comsource_1761838352453.png";
import acmLogo from "@assets/american community management_1761838352452.png";
import mmiLogo from "@assets/mmi logo_1761838352451.png";

export default function WhoWeServe() {
  const clients = [
    { name: "Associa", logo: associaLogo },
    { name: "Comsource", logo: comsourceLogo },
    { name: "American Community Management", logo: acmLogo },
    { name: "Majerle Management Inc", logo: mmiLogo },
  ];

  const benefits = [
    "24/7 emergency response",
    "100% of work performed by in-house staff",
    "Over 30+ years of industry experience",
    "Comprehensive commercial services",
    "Minimal disruption to tenants",
    "Quality craftsmanship guaranteed",
  ];

  const faqs = [
    {
      question: "Why do property managers choose Shall's Construction?",
      answer: "Property managers choose us because we were built specifically for their needs. We understand the challenges of managing multiple projects, budgets, and schedules. With 100% in-house staff and 30+ years of experience, we provide reliable, consistent service.",
    },
    {
      question: "What types of properties do you work on?",
      answer: "We serve commercial retail & office, schools & universities, apartments & HOAs, hospitals & medical suites, corporate & government facilities, and multi-family housing throughout the MD/VA/DC/DE region.",
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Who We Serve", url: "/who-we-serve" },
  ];

  const schemas = [
    generateFAQSchema(faqs),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Property Management Services MD VA DC | Shall's Construction"
        description="Partner to property managers across MD, VA, DC, and DE for renovation, maintenance, and 24/7 emergency work."
        canonical="https://shallsconstruction.com/who-we-serve"
        schemas={schemas}
      />
      <Navigation />

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-page-title">
            We Serve Property Managers
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            For over 30+ years, Shall's Construction has earned a reputation for helping property managers
            with their commercial renovation, repair, and maintenance needs — both large and small.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
                Your Property Management Partner
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We understand the unique challenges property managers face. From juggling multiple projects to
                managing tight budgets and demanding schedules, you need a partner you can trust to deliver
                exceptional results every time.
              </p>
              <p className="text-gray-600 leading-relaxed">
                That's why Shall's Construction was built specifically to serve your needs. We're not just
                another contractor—we're your dedicated resource for all commercial construction, repair, and
                maintenance needs across the MD/VA/DC/DE region.
              </p>
            </div>
            <div className="bg-primary/5 rounded-lg p-8">
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-6">
                Why Property Managers Choose Shall's
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`benefit-${index}`}>
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Some of Our Esteemed Clients
            </h2>
            <p className="text-gray-600">
              Trusted by leading property management companies across the region
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-xl transition-shadow duration-300"
                data-testid={`card-client-${index}`}
              >
                <div className="w-full h-24 flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className={`max-w-full max-h-full object-contain ${client.name === "American Community Management" ? "scale-125" : ""}`}
                    data-testid={`img-client-logo-${index}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
            Industries We Serve
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-12">
            {[
              "Commercial Retail & Office",
              "Schools & Universities",
              "Apartments & HOAs",
              "Hospitals & Medical Suites",
              "Corporate & Government",
              "Multi-Family Housing",
            ].map((industry, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                data-testid={`industry-${index}`}
              >
                <Building2 className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="text-gray-900 font-medium text-sm md:text-base">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Experience the Shall's Difference?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Join the property managers who trust Shall's Construction for all their commercial property needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:3019336277"
              className="text-2xl md:text-3xl font-heading font-bold hover:text-white/90 transition-colors"
              data-testid="link-phone"
            >
              (301) 933-6277
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}