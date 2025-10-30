import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import LeadershipCard from "@/components/ui/leadership-card";
import LogoGrid from "@/components/ui/logo-grid";
import StatCounter from "@/components/ui/stat-counter";
import { generateBreadcrumbSchema, generateFAQSchema, generateOrganizationSchema } from "@/lib/schema";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  // Placeholder leadership data - user will replace with actual info
  const leadership = [
    {
      name: "[Owner Name]",
      title: "Owner & CEO",
      imagePath: "", // User will add actual photo
      bio: `For property managers with countless projects, there's one name to remember: Shall's Construction

There are many companies that serve commercial property managers and owners—but none are quite like Shall's. From our inception, Shall's was built to serve property managers' needs. We understand the challenges you face in managing multiple projects, schedules, and budgets. Today, we provide an even greater depth and breadth of expertise to make your life easier. One Call Does It All!

At Shall's Construction, our in-house team provides a wide range of commercial renovation, repair & maintenance, and commercial construction services, providing both short and long-term solutions for your property's needs. Whether to make an urgent repair or take on a capital project, Shall's will respond.

For more than 30+ years, we've earned a reputation for helping property managers with their commercial renovation, repair, and maintenance needs both large and small — with professional, high quality work and seamless, 24/7/365 responsiveness to emergency situations. Because 100% of our work is done by our full-time staff using our own equipment, you always get consistent, high-quality results. The bottom line: we make your life easier, while enhancing your tenants' experience.

When you need a commercial construction services firm that not only understands your challenges, but also solves them quickly and efficiently - Shall's Construction is your best choice.`,
      quote: "[Add inspirational quote from owner about company values or commitment to excellence]",
    },
    {
      name: "[Co-Owner/Partner Name]",
      title: "Owner & COO",
      imagePath: "", // User will add actual photo
      bio: "[Add co-owner biography here - background, expertise, role in company growth]",
      quote: "[Add quote about company culture or client relationships]",
    },
  ];

  // Company values
  const values = [
    {
      title: "Quality Craftsmanship",
      description: "100% in-house staff ensures consistent, high-quality results on every project",
    },
    {
      title: "24/7 Responsiveness",
      description: "Always available when you need us, with rapid response to emergencies",
    },
    {
      title: "Integrity & Trust",
      description: "Building lasting relationships through honest communication and reliable service",
    },
    {
      title: "Property Manager Focus",
      description: "We understand your unique challenges and work to make your life easier",
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
        title="About Shall's Construction | Our Story & Leadership"
        description="Learn the story, leadership, and values behind Shall's Construction — trusted by property managers for three decades across MD VA DC and DE."
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
            [Add hero image: Team photo or company building photo]
          </div>
        </div>
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6" data-testid="text-page-title">
            Who We Are
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
            Our commitment to excellence extends beyond the project sites.
          </p>
        </div>
      </section>

      {/* Property Manager Introduction */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-lg md:text-xl mb-2 font-medium">
              For property managers with countless projects, there's one name to remember:
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">
              Shall's Construction
            </h2>
          </div>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/95 leading-relaxed mb-6">
              There are many companies that serve commercial property managers and owners—but none are quite like Shall's. From our inception, Shall's was built to serve property managers' needs. We understand the challenges you face in managing multiple projects, schedules, and budgets. Today, we provide an even greater depth and breadth of expertise to make your life easier. <strong>One Call Does It All!</strong>
            </p>
            <p className="text-white/95 leading-relaxed mb-6">
              At Shall's Construction, our in-house team provides a wide range of commercial renovation, repair & maintenance, and commercial construction services, providing both short and long-term solutions for your property's needs. Whether to make an urgent repair or take on a capital project, Shall's will respond.
            </p>
            <p className="text-white/95 leading-relaxed mb-6">
              For more than 30+ years, we've earned a reputation for helping property managers with their commercial renovation, repair, and maintenance needs both large and small — with professional, high quality work and seamless, 24/7/365 responsiveness to emergency situations. Because 100% of our work is done by our full-time staff using our own equipment, you always get consistent, high-quality results. The bottom line: we make your life easier, while enhancing your tenants' experience.
            </p>
            <p className="text-white/95 leading-relaxed">
              When you need a commercial construction services firm that not only understands your challenges, but also solves them quickly and efficiently - Shall's Construction is your best choice.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="leading-relaxed mb-6">
              [Add company founding story here - When was the company started? What inspired the founders? How did the business grow over 30+ years?]
            </p>
            <p className="leading-relaxed mb-6">
              [Add details about company evolution - Key milestones, major projects, expansion into new services, growth in team size]
            </p>
            <p className="leading-relaxed">
              [Add current company positioning - What makes Shall's Construction unique today? What's the vision for the future?]
            </p>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter number="30" label="Years in Business" suffix="+" />
            <StatCounter number="100" label="In-House Staff" suffix="%" />
            <StatCounter number="[ADD]" label="Projects Completed" suffix="+" />
            <StatCounter number="[ADD]" label="Square Feet Managed" suffix="M+" />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              [Add mission statement here - What is the company's core mission? What drives your team every day?]
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

      {/* Leadership Team */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              Leadership Team
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals who guide Shall's Construction with integrity and expertise.
            </p>
          </div>
          <div className="space-y-8">
            {leadership.map((leader, index) => (
              <LeadershipCard
                key={index}
                name={leader.name}
                title={leader.title}
                imagePath={leader.imagePath}
                bio={leader.bio}
                quote={leader.quote}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              Commitment to Community
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              [Add description of community involvement - Why is giving back important to your company? What types of organizations do you support?]
            </p>
          </div>

          {/* Community Photos Grid - Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">[Community Photo 1]</p>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">[Community Photo 2]</p>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">[Community Photo 3]</p>
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
            description="[Add description of your charitable partnerships and community impact]"
          />
        </div>
      </section>

      {/* Industry Associations */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <LogoGrid
            logos={associations}
            columns={4}
            title="Industry Partnerships"
            description="We are proud members of leading construction and property management associations, demonstrating our commitment to industry standards and professional excellence."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
