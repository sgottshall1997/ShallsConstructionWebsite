import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateFAQSchema, generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, Phone, ArrowRight } from "lucide-react";

export default function RockvilleMD() {
  const services = [
    "Commercial Construction & Remodeling",
    "Handyman & Maintenance Services",
    "Interior & Exterior Painting",
    "Building Exterior Repairs",
    "Parking Lot Maintenance",
    "Snow & Ice Management",
  ];

  const faqs = [
    {
      question: "Are you familiar with Rockville's building codes and permit requirements?",
      answer: "Absolutely. We've been serving Rockville property managers for over 25 years and have extensive experience with City of Rockville and Montgomery County permit processes, building codes, and inspection requirements.",
    },
    {
      question: "Can you handle projects in Rockville Town Center and King Farm?",
      answer: "Yes, we've completed numerous projects in Rockville Town Center, King Farm, and throughout Rockville's commercial districts. Our team understands the specific requirements and standards expected in these premium developments.",
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/" },
    { name: "Rockville, MD", url: "/service-areas/rockville-md" },
  ];

  const schemas = [
    generateLocalBusinessSchema({
      areaServed: ["Rockville, MD"],
    }),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Commercial Construction in Rockville, MD | Property Management Services"
        description="Professional commercial construction and maintenance for property managers in Rockville, MD. Serving Rockville Town Center, King Farm, and all of Montgomery County. Call (301) 933-6277."
        schemas={schemas}
      />
      <Navigation />

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <MapPin className="h-6 w-6" />
            <span className="text-lg font-semibold">Rockville, Maryland</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6 text-center">
            Commercial Construction Services in Rockville, MD
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
            Shall's Construction has served Rockville property managers for over 25 years, from Rockville Town Center to
            King Farm and beyond. We're your local partner for all commercial construction and maintenance needs.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
                Trusted by Rockville Property Managers
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                As one of Montgomery County's largest cities, Rockville demands reliable commercial contractors who
                understand both the City's unique requirements and the diverse needs of its property management
                community.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                From office complexes to retail centers and multi-family properties, our in-house team delivers
                consistent, quality work with minimal disruption to your tenants. We handle everything from routine
                maintenance to major renovations.
              </p>
              <Link href="/contact">
                <Button size="lg" className="mt-4">
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="bg-primary/5 rounded-lg p-8">
              <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
                Services in Rockville, MD
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3 text-primary">
                  <Phone className="h-5 w-5" />
                  <a href="tel:3019336277" className="text-xl font-semibold hover:underline">
                    (301) 933-6277
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-2">24/7 Emergency Response Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8 text-center">
            Our Commercial Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/what-we-do#construction">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Construction & Remodeling</h3>
                <p className="text-gray-600 text-sm">
                  Commercial interiors, office remodeling, tenant build-outs, and emergency services.
                </p>
              </div>
            </Link>
            <Link href="/what-we-do#handyman">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Handyman Services</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive repair and maintenance for all your commercial property needs.
                </p>
              </div>
            </Link>
            <Link href="/what-we-do#exterior">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Exterior Building Services</h3>
                <p className="text-gray-600 text-sm">
                  Waterproofing, masonry, power washing, and complete building envelope maintenance.
                </p>
              </div>
            </Link>
            <Link href="/what-we-do#snow">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Snow Removal</h3>
                <p className="text-gray-600 text-sm">
                  Professional winter maintenance keeping your properties safe and accessible.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
