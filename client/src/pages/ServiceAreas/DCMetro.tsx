import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateFAQSchema, generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, Phone, ArrowRight } from "lucide-react";

export default function DCMetro() {
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
      question: "Do you work in Washington DC, Northern Virginia, and Maryland?",
      answer: "Yes, we serve the entire DC Metro region including Washington DC, Northern Virginia (Arlington, Fairfax, Alexandria), and Maryland suburbs (Montgomery County, Prince George's County). Our regional experience means we understand diverse jurisdictional requirements.",
    },
    {
      question: "Can you handle projects requiring federal contractor compliance?",
      answer: "Yes, we have experience working on federal government and government-adjacent properties. We understand security requirements, compliance standards, and documentation needed for these projects.",
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/" },
    { name: "DC Metro", url: "/service-areas/dc-metro" },
  ];

  const schemas = [
    generateLocalBusinessSchema({
      areaServed: ["Washington, DC", "Arlington, VA", "Fairfax, VA", "Montgomery County, MD"],
    }),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Commercial Construction in DC Metro | Washington DC, MD & VA Services"
        description="Professional commercial construction for DC Metro property managers. Serving Washington DC, Northern Virginia, Maryland, and Delaware. 30+ years experience. Licensed in MD/VA/DC/DE. Call (301) 933-6277."
        schemas={schemas}
      />
      <Navigation />

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <MapPin className="h-6 w-6" />
            <span className="text-lg font-semibold">DC Metro Region</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6 text-center">
            Commercial Construction Services in the DC Metro Area
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
            For over 30+ years, Shall's Construction has served property managers throughout the DC Metro region.
            From Washington DC to Northern Virginia and Maryland suburbs, we're your regional construction partner.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
                Your Regional Commercial Construction Partner
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The DC Metro area's complex regulatory environment across multiple jurisdictions requires a contractor
                with broad regional experience. We navigate DC, Maryland, and Virginia requirements seamlessly.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                From Class A office buildings downtown to suburban corporate campuses and everything in between, our
                100% in-house team delivers consistent quality across the region. We understand the high standards
                expected in the nation's capital area.
              </p>
              <Link href="/contact">
                <Button size="lg" className="mt-4">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="bg-primary/5 rounded-lg p-8">
              <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
                Services Across DC Metro
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8 text-center">
            Areas We Serve in the DC Metro Region
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {[
              "Washington, DC",
              "Arlington, VA",
              "Fairfax, VA",
              "Alexandria, VA",
              "Bethesda, MD",
              "Rockville, MD",
              "Silver Spring, MD",
              "Gaithersburg, MD",
              "Baltimore, MD",
            ].map((area, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-gray-900 font-medium">{area}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8 text-center mt-16">
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
                  Professional winter maintenance keeping properties safe across the DC Metro region.
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
