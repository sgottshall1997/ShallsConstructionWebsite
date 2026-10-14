import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building2, School, Home, Stethoscope, Landmark, ArrowRight } from "lucide-react";
import { COMPANY, yearsText, telHref } from "@shared/company";
import associaLogo from "@assets/Associa_1761838352452.png";
import comsourceLogo from "@assets/comsource_1761838352453.png";
import acmLogo from "@assets/american community management_1761838352452.png";
import mmiLogo from "@assets/mmi logo_1761838352451.png";

const CLIENT_LOGOS: Record<string, string> = {
  associa: associaLogo,
  comsource: comsourceLogo,
  acm: acmLogo,
  mmi: mmiLogo,
};

const audiences = [
  { icon: Building2, title: "Retail & Office Buildings", description: "Tenant turnovers, common-area refreshes, and exterior work that keep leasing strong." },
  { icon: School, title: "Schools & Institutions", description: "Scheduled renovations and maintenance planned around academic calendars." },
  { icon: Home, title: "Apartments & HOAs", description: "Unit turns, amenities, and exterior projects coordinated with residents in place." },
  { icon: Stethoscope, title: "Medical Suites", description: "Fit-outs and repairs that respect clinical schedules." },
  { icon: Landmark, title: "Government Clients", description: "Commercial work for municipal and agency facilities." },
];

export default function WhoWeServe() {
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Who We Serve", url: "/who-we-serve" },
    ]),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`Who We Serve | Property Managers in ${COMPANY.regionShort}`}
        description={`${COMPANY.name} works with property managers of retail and office buildings, schools and universities, apartments and HOAs, hospitals and medical suites, and corporate and government clients across ${COMPANY.regionShort}.`}
        canonical="/who-we-serve"
        schemas={schemas}
      />
      <Navigation />

      <section className="bg-gray-900 text-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6" data-testid="text-page-title">
            Built for Property Managers
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            For {yearsText()}, {COMPANY.name} has specialized in serving property managers across {COMPANY.regionShort}.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <p className="text-lg text-gray-600 leading-relaxed">
            We understand work orders and occupied buildings.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {audiences.map((a) => (
              <div key={a.title} className="bg-gray-50 rounded-lg p-8" data-testid={`card-${a.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <a.icon className="h-10 w-10 text-primary mb-4" />
                <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">{a.title}</h2>
                <p className="text-gray-600 leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {COMPANY.clients.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8">Clients We Work With</h2>
            <ul className="flex flex-wrap justify-center gap-6">
              {COMPANY.clients.map((c) => (
                <li key={c.name} className="bg-white border border-gray-200 rounded-lg px-6 py-4 flex items-center" data-testid={`client-${c.logo}`}>
                  {CLIENT_LOGOS[c.logo] ? (
                    <img src={CLIENT_LOGOS[c.logo]} alt={`${c.name} logo`} className="h-12 w-auto object-contain" loading="lazy" width="160" height="48" />
                  ) : (
                    <span className="text-gray-800 font-semibold">{c.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Partner With Us?</h2>
          <p className="text-lg mb-8 text-white/90">Tell us about your property and what it needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white text-primary border-white hover:bg-white/90">
                Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href={telHref()}>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                Call {COMPANY.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
