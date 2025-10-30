import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { Building2, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
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
    "2-hour emergency response guarantee in Montgomery County",
    "Your same crews on every property—no subcontractor surprises",
    "Three decades serving property managers exclusively",
    "One call handles everything from estimates to cleanup",
    "Tenant-friendly scheduling with after-hours availability",
    "Work order system compatible with your property management software",
  ];

  const faqs = [
    {
      question: "Why do property managers choose Shall's Construction?",
      answer: "We've specialized exclusively in serving property managers since 1992. We understand work orders, COI requirements, tenant coordination, and budget constraints. Plus, our 100% in-house team means you get the same crews every time—no subcontractor variability, no quality inconsistency.",
    },
    {
      question: "What types of properties do you work on?",
      answer: "We serve commercial retail and office buildings, schools and universities, apartments and HOAs, hospitals and medical suites, corporate and government facilities, and multi-family housing throughout Montgomery County, Bethesda, Kensington, and the greater MD/VA/DC region.",
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
        title="Built for Property Managers | Bethesda Commercial Contractor MD"
        description="Built for property managers. Trusted by leading firms across MD, VA, DC, and DE for commercial construction, repairs, and maintenance since 1992."
        canonical="https://shallsconstruction.replit.app/who-we-serve"
        schemas={schemas}
      />
      <Navigation />

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-page-title">
            Built Exclusively for Property Managers
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            For three decades, property managers across Montgomery County have turned to Shall's Construction when they need reliable <Link href="/services/construction-remodeling"><span className="text-primary hover:underline cursor-pointer">commercial construction</span></Link> and maintenance services—because we understand your world and make your job easier.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
                We Get It: Property Management Is Exhausting
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Let's be honest—you're juggling work orders from six different buildings, a tenant is screaming about a broken door, your boss wants the quarterly renovations done under budget, and it's only Tuesday morning. Sound familiar?
              </p>
              <p className="text-gray-600 leading-relaxed">
                That's exactly why we built Shall's Construction specifically for property managers. We understand your world because we've lived it alongside you for three decades. No runaround. No subcontractor surprises. Just reliable results, clear communication, and crews who show up when they say they will.
              </p>
            </div>
            <div className="bg-primary/5 rounded-lg p-8">
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-6">
                Why Property Managers Keep Our Number Saved
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
              Trusted by Leading Property Management Companies
            </h2>
            <p className="text-gray-600">
              Property managers across the region rely on Shall's Construction for commercial services they can count on
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
                    alt={`${client.name} - Property management company served in Montgomery County Maryland`}
                    className={`max-w-full max-h-full object-contain ${client.name === "American Community Management" ? "scale-125" : ""}`}
                    loading="lazy"
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
            Property Types We Serve
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
            Ready to Work With a Contractor Who Understands Your World?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Join the property managers who trust Shall's Construction for all their commercial property needs. Free quotes within 24 hours.
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
