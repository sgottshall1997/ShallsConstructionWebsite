import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Shield, FileCheck, Award } from "lucide-react";
import { COMPANY, stateNamesList } from "@shared/company";

export default function Safety() {
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Safety & Certifications", url: "/safety" },
    ]),
  ];

  const stateName = (code: string) =>
    COMPANY.serviceStates.find((s) => s.code === code)?.name ?? code;

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Safety & Certifications"
        description={`Jobsite safety, licensing, and insurance information for ${COMPANY.legalName}, serving property managers in ${stateNamesList()}.`}
        canonical="/safety"
        schemas={schemas}
      />
      <Navigation />

      <section className="bg-gray-50 py-4 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Safety</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-page-title">
            Safety & Certifications
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Your tenants, your property, and our crews all need to go home safe. We plan every job around occupied buildings and keep work areas controlled from start to finish.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Occupied-Building Work</h2>
            <p className="text-gray-600 leading-relaxed">
              Work is scheduled and staged around tenants, with clear signage, protected walkways, and clean-up at the end of each shift.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <FileCheck className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Insurance</h2>
            <p className="text-gray-600 leading-relaxed" data-testid="text-insurance">
              {COMPANY.insuranceLine ?? "Contact us to request a certificate of insurance for your property."}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <Award className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Licensing</h2>
            {COMPANY.licenses.length > 0 ? (
              <ul className="text-gray-600 space-y-1" data-testid="list-licenses">
                {COMPANY.licenses.map((l) => (
                  <li key={l.state}>
                    {stateName(l.state)}: License #{l.number}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 leading-relaxed">
                Contact us for license details for your jurisdiction in {stateNamesList()}.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Need Paperwork for a Bid or Vendor Packet?</h2>
          <Link href="/contact">
            <Button size="lg" data-testid="button-safety-contact">Contact Us</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
