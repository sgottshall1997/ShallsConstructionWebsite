import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StatCounter from "@/components/ui/stat-counter";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import aboutHeroImg from "@assets/generated_images/Professional_construction_team_photo_9128835a.webp";
import { COMPANY, yearsText, inHouseText, emergencyLine } from "@shared/company";

export default function About() {
  const values = [
    {
      title: "Your Own Crews, Not a Chain of Subs",
      description: "Quality and accountability stay with one team from estimate to final walkthrough.",
    },
    {
      title: "Made for How Property Managers Work",
      description:
        "We understand work orders, insurance paperwork, and occupied buildings, and we schedule around your tenants.",
    },
    ...(COMPANY.emergencyService ? [{ title: "Always Reachable", description: emergencyLine() }] : []),
    {
      title: "Construction to Snow Removal",
      description:
        "Construction, handyman work, building exteriors, parking lots, painting, and snow removal from one contractor.",
    },
  ];

  const stats = [
    { number: `${COMPANY.yearsInBusiness}+`, label: "Years in Business" },
    { number: `${COMPANY.selfPerformedPercent}%`, label: "Self-Performed" },
    { number: COMPANY.regionShort, label: "Service Area" },
  ];

  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "About Us", url: "/about" },
    ]),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`About Us | Commercial Contractor in ${COMPANY.address.city}, ${COMPANY.address.state}`}
        description={`${COMPANY.legalName} is a commercial contractor in ${COMPANY.address.city}, ${COMPANY.address.state} serving property managers across ${COMPANY.regionShort}.`}
        canonical="/about"
        schemas={schemas}
      />
      <Navigation />

      <section
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutHeroImg})` }}
        role="img"
        aria-label="Construction crew in safety gear reviewing plans on a job site"
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-white" data-testid="text-page-title">
              Making Property Management Easier
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Commercial construction and maintenance for property managers across {COMPANY.regionShort}.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              A Property Manager's Greatest Resource
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="leading-relaxed mb-6">
              {COMPANY.name} is based in {COMPANY.address.city}, {COMPANY.address.state}, and works for the people who keep commercial buildings running: property managers.
              For {yearsText()}, we've handled{" "}
              <Link href="/services/construction-remodeling">
                <span className="text-primary hover:underline cursor-pointer">commercial construction</span>
              </Link>
              , repairs, exterior work, parking lots, painting, and snow removal for retail and office buildings, schools, apartments and HOAs, medical suites, and government clients.
            </p>
            <p className="leading-relaxed mb-6">
              After working for years alongside property managers, {COMPANY.name} built its approach around how they actually work: clear communication, reliable scheduling, and crews that understand occupied buildings.
            </p>
            <p className="leading-relaxed">
              Because {inHouseText()}, you deal with one accountable team. We focus on responsiveness, clear communication, and quality control so your tenants stay satisfied.
            </p>
            {COMPANY.insuranceLine && (
              <p className="leading-relaxed mt-6 text-gray-700 font-medium" data-testid="text-insurance">
                {COMPANY.insuranceLine}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((s) => (
              <StatCounter key={s.label} number={s.number} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              What Property Managers Get Working With Us
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {values.map((value, index) => (
              <div key={index} className="flex gap-4" data-testid={`value-${index}`}>
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {COMPANY.associations.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8">Memberships</h2>
            <ul className="flex flex-wrap justify-center gap-4">
              {COMPANY.associations.map((a) => (
                <li key={a.name} className="bg-white border border-gray-200 rounded-lg px-6 py-4 text-gray-700 font-semibold">
                  {a.url ? (
                    <a href={a.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{a.name}</a>
                  ) : (
                    a.name
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
