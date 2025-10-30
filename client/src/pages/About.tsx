import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import LeadershipCard from "@/components/ui/leadership-card";
import LogoGrid from "@/components/ui/logo-grid";
import StatCounter from "@/components/ui/stat-counter";
import { generateBreadcrumbSchema, generateFAQSchema, generateOrganizationSchema } from "@/lib/schema";
import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  // Placeholder leadership data - user will replace with actual info
  const leadership = [
    {
      name: "[Owner Name]",
      title: "Owner & CEO",
      imagePath: "", // User will add actual photo
      bio: "[Add owner biography here - Start with: In 1988, [Name] founded Shall's Construction in his garage with one truck and a simple belief: property managers deserve a contractor they can trust completely. After years in commercial construction, he saw how unpredictable subcontractors and missed deadlines created chaos for building managers. So he built a company differently—with in-house crews, clear communication, and a commitment to showing up when we say we will. Today, [X] years later, that same promise guides everything we do.]",
      quote: "[Add inspirational quote from owner - Example: 'We're not just building projects—we're building relationships that last decades.']",
    },
    {
      name: "[Co-Owner/Partner Name]",
      title: "Owner & COO",
      imagePath: "", // User will add actual photo
      bio: "[Add co-owner biography here - Focus on: operational expertise, how they ensure quality control, their role in growing the in-house team, commitment to safety and training]",
      quote: "[Add quote about quality or team - Example: 'Our crews aren't just employees—they're family. That's why property managers get the same quality on every job.']",
    },
  ];

  // Company values
  const values = [
    {
      title: "Your Same Crews, Every Time",
      description: "Our in-house team means you get the same skilled craftsmen on every project—no subcontractor surprises, no quality inconsistency, just reliable results you can count on.",
    },
    {
      title: "Three Generations of Excellence",
      description: "As a family-owned business headquartered in Montgomery County since 1988, we bring personal accountability and long-term commitment to every client relationship.",
    },
    {
      title: "Built for Property Managers",
      description: "We understand work orders, COI requirements, tenant coordination, and budget constraints. We speak your language and solve your specific challenges.",
    },
    {
      title: "Always Available When You Need Us",
      description: "True 24/7 emergency response with a 2-hour on-site guarantee in Montgomery County. Building issues don't wait for business hours—and neither do we.",
    },
  ];

  // Charity logos - user will replace with actual logos
  const charities = [
    { name: "[Charity Name 1]", altText: "Charity 1 Logo" },
    { name: "[Charity Name 2]", altText: "Charity 2 Logo" },
    { name: "[Charity Name 3]", altText: "Charity 3 Logo" },
    { name: "[Charity Name 4]", altText: "Charity 4 Logo" },
    { name: "[Charity Name 5]", altText: "Charity 5 Logo" },
    { name: "[Charity Name 6]", altText: "Charity 6 Logo" },
    { name: "[Charity Name 7]", altText: "Charity 7 Logo" },
    { name: "[Charity Name 8]", altText: "Charity 8 Logo" },
    { name: "[Charity Name 9]", altText: "Charity 9 Logo" },
  ];

  // Industry association logos - user will replace with actual logos
  const associations = [
    { name: "AGC - Associated General Contractors", altText: "AGC Logo" },
    { name: "BOMA - Building Owners & Managers Association", altText: "BOMA Logo" },
    { name: "ABC - Associated Builders and Contractors", altText: "ABC Logo" },
    { name: "ASA - American Subcontractors Association", altText: "ASA Logo" },
    { name: "[Chamber of Commerce]", altText: "Chamber Logo" },
    { name: "[Industry Association 6]", altText: "Association 6 Logo" },
    { name: "[Industry Association 7]", altText: "Association 7 Logo" },
    { name: "[Industry Association 8]", altText: "Association 8 Logo" },
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ];

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Family-Owned Commercial Contractor Since 1988 | Montgomery County MD"
        description="Family-owned commercial contractor in Montgomery County, MD since 1988. 100% in-house team providing construction, renovation, and maintenance for property managers."
        canonical="https://shallsconstruction.replit.app/about"
        schemas={schemas}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70 z-10"></div>
        <div className="absolute inset-0 bg-gray-700">
          {/* Placeholder for hero image - user will add actual team photo */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            [Add hero image: Team photo or company building photo showing Shall's Construction team]
          </div>
        </div>
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6" data-testid="text-page-title">
            Making Property Management Easier Since 1988
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
            Three generations of family-owned excellence serving Maryland, Virginia, DC, and Delaware property managers with reliable commercial construction and maintenance services.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              Family Built. Professionally Driven.
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="leading-relaxed mb-6">
              In 1988, Shall's Construction began with a simple belief: property managers deserve a contractor they can trust completely. After working for years in <Link href="/services/construction-remodeling"><span className="text-primary hover:underline cursor-pointer">commercial construction</span></Link> throughout the region, we saw how unpredictable subcontractors and missed deadlines created chaos for building managers. So we built a company differently—with in-house crews, clear communication, and a commitment to showing up when we say we will.
            </p>
            <p className="leading-relaxed mb-6">
              Three decades later, we're still family-owned, still headquartered in Montgomery County, Maryland, and still guided by that same promise. Many of our crew members have been with us for 20+ years - working alongside each other on hundreds of projects. When you call us, you get the same familiar faces every time. That continuity means better work, faster service, and the kind of trust you can't buy. We are a tight-knit team that treats your properties like our own.
            </p>
            <p className="leading-relaxed">
              Managing multiple properties, tight budgets, and demanding tenants is exhausting. That's why we built our company around responsiveness, clear communication, and quality control you can count on. Whether it's an emergency repair at 2 AM or a major renovation project, Shall's delivers the same reliable service—making your life easier while keeping your tenants satisfied.
            </p>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter number="1988" label="Established" suffix="" />
            <StatCounter number="100" label="In-House Team" suffix="%" />
            <StatCounter number="[ADD]" label="Projects Completed" suffix="+" />
            <StatCounter number="[ADD]" label="Properties Managed" suffix="+" />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              What Property Managers Love About Working With Us
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our mission is simple: deliver reliable, high-quality commercial construction and maintenance services that make property managers' lives easier—performed by our in-house team with exceptional craftsmanship, honest communication, and round-the-clock availability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {values.map((value, index) => (
              <div key={index} className="flex gap-4" data-testid={`value-${index}`}>
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Community Involvement */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              Committed to Our Montgomery County Community
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              Being headquartered in Montgomery County for over 30 years means we're invested in this community. We support local charities, youth sports programs, and community development initiatives because this is our home too. When we succeed, we believe in using our resources to make a positive impact.
            </p>
          </div>

          {/* Community Photos Grid - Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">[Community Photo 1 - Team volunteering]</p>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">[Community Photo 2 - Charity event]</p>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">[Community Photo 3 - Local partnership]</p>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <StatCounter number="[ADD]" label="Local and national charities supported" suffix="+" />
            <StatCounter number="[ADD]" label="Community service hours volunteered" suffix="+" />
          </div>

          {/* Charity Logos */}
          <LogoGrid
            logos={charities}
            columns={3}
            title="Our Charitable Partners"
            description="[Add description - Example: We're proud to partner with local and national organizations that strengthen our community. From supporting youth education to providing disaster relief, we believe in using our resources to make a positive impact.]"
          />
        </div>
      </section>

      {/* Industry Associations */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <LogoGrid
            logos={associations}
            columns={4}
            title="Recognized by the Industry's Leading Organizations"
            description="We're proud members of leading construction and property management associations, demonstrating our commitment to professional excellence, industry standards, and continuous improvement."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}