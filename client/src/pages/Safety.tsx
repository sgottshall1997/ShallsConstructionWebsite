import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import LogoGrid from "@/components/ui/logo-grid";
import StatCounter from "@/components/ui/stat-counter";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Shield, Award, FileCheck, Users } from "lucide-react";

export default function Safety() {
  const certifications = [
    {
      icon: Shield,
      title: "OSHA Compliant",
      description: "[Add OSHA certification details - training programs, compliance record]",
    },
    {
      icon: FileCheck,
      title: "Fully Insured & Bonded",
      description: "[Add insurance and bonding details - coverage amounts, carrier information]",
    },
    {
      icon: Award,
      title: "Licensed in MD/VA/DC/DE",
      description: "[Add license numbers and details for each state]",
    },
    {
      icon: Users,
      title: "Certified Team Members",
      description: "[Add details about team certifications and training programs]",
    },
  ];

  // Industry awards - user will replace with actual awards
  const awards = [
    { name: "[Award Name 1]", altText: "Award 1" },
    { name: "[Award Name 2]", altText: "Award 2" },
    { name: "[Award Name 3]", altText: "Award 3" },
    { name: "[Award Name 4]", altText: "Award 4" },
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Safety & Certifications", url: "/safety" },
  ];

  const schemas = [generateBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Safety & Certifications MD VA DC | Shall's Construction"
        description="OSHA compliant, fully insured and bonded in MD, VA, DC, and DE. Licensed in all regions. Safety is our top priority on every commercial construction project."
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

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-page-title">
            Safety & Certifications
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Your project's safety and our team's well-being are our highest priorities. We maintain rigorous safety standards and hold all necessary certifications.
          </p>
        </div>
      </section>

      {/* Safety Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCounter number="[ADD]" label="Years Without Major Incident" />
            <StatCounter number="[ADD]" label="Safety Training Hours Annually" suffix="K+" />
            <StatCounter number="100" label="OSHA Compliance Rate" suffix="%" />
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              Our Certifications
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                  data-testid={`certification-${index}`}
                >
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{cert.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* License Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              State Licenses
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Maryland</h3>
                <p className="text-gray-600">License #: [ADD LICENSE NUMBER]</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Virginia</h3>
                <p className="text-gray-600">License #: [ADD LICENSE NUMBER]</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Washington DC</h3>
                <p className="text-gray-600">License #: [ADD LICENSE NUMBER]</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Delaware</h3>
                <p className="text-gray-600">License #: [ADD LICENSE NUMBER]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Awards */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <LogoGrid
            logos={awards}
            columns={4}
            title="Industry Recognition"
            description="[Add description of awards and recognition received by the company]"
          />
        </div>
      </section>

      {/* Insurance & Bonding Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              Insurance & Bonding
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600 leading-relaxed mb-6">
              [Add insurance and bonding details - General Liability coverage, Workers' Compensation, Bonding capacity, etc.]
            </p>
            <p className="text-gray-600 leading-relaxed">
              Certificates of insurance available upon request. Contact us for specific coverage information.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
