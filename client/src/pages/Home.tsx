import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Award, MapPin, Building2, Quote } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateFAQSchema, generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/schema";
import ProjectCard from "@/components/ui/project-card";
import TestimonialCard from "@/components/ui/testimonial-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Testimonial } from "@shared/schema";
import { trackQuoteClick, trackEmergencyClick, trackCTAClick, trackNavigationClick } from "@/lib/analytics";
import heroImage from "@assets/generated_images/Homepage_hero_construction_scene_4f48bae9.png";
import constructionImg from "@assets/generated_images/Construction_and_Remodeling_service_1aebcbea.png";
import handymanImg from "@assets/generated_images/Handyman_Services_worker_984f13b6.png";
import exteriorImg from "@assets/generated_images/Exterior_Building_Services_work_4ebd45e5.png";
import parkingImg from "@assets/generated_images/Parking_Lot_Services_result_327aebfc.png";
import paintingImg from "@assets/generated_images/Painting_Services_work_beb0461c.png";
import snowImg from "@assets/generated_images/Snow_Removal_service_e0dba011.png";

function TestimonialsSection() {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials/featured"],
  });

  return (
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Quote className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4" data-testid="text-testimonials-heading">
            What Property Managers Say About Us
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
                <Skeleton className="h-5 w-32 mb-4" />
                <Skeleton className="h-16 w-full mb-6" />
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" data-testid="featured-testimonials-grid">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.comment.length > 150 ? `${testimonial.comment.substring(0, 150)}...` : testimonial.comment}
                author={testimonial.clientName}
                company={testimonial.company}
                role={testimonial.role}
                rating={testimonial.rating}
                service={testimonial.serviceType}
                location={testimonial.location}
                featured={testimonial.featured}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No featured testimonials available.</p>
          </div>
        )}

      </div>
    </section>
  );
}

export default function Home() {
  const services = [
    {
      title: "Construction & Remodeling",
      image: constructionImg,
      description: "Complete tenant buildouts and office renovations delivered on schedule and within budget across Montgomery County and Bethesda.",
      link: "/services/construction-remodeling",
    },
    {
      title: "Handyman Services",
      image: handymanImg,
      description: "From minor repairs to skilled carpentry, our craftsmen handle commercial maintenance work efficiently throughout Northern Virginia.",
      link: "/services/handyman-services",
    },
    {
      title: "Exterior Building Services",
      image: exteriorImg,
      description: "Protect your building envelope with expert masonry, waterproofing, and facade restoration services in the DC metro area.",
      link: "/services/exterior-building-services",
    },
    {
      title: "Parking Lot Asphalt & Concrete",
      image: parkingImg,
      description: "Professional asphalt repair, striping, and sealcoating that keeps your property looking sharp across Maryland and Virginia.",
      link: "/services/parking-lot-services",
    },
    {
      title: "Painting Services",
      image: paintingImg,
      description: "Precision interior and exterior painting with meticulous surface preparation for lasting results on Maryland properties.",
      link: "/services/painting-services",
    },
    {
      title: "Snow Removal",
      image: snowImg,
      description: "Round-the-clock snow and ice management ensuring safe property access throughout the DC, Maryland, and Virginia region.",
      link: "/services/snow-removal",
    },
  ];

  const stats = [
    { icon: Award, label: "Since 1988", sublabel: "Family-Owned" },
    { icon: Clock, label: "24/7", sublabel: "Emergency Service" },
    { icon: Users, label: "100% In-House", sublabel: "Staff" },
    { icon: MapPin, label: "MD/VA/DC/DE", sublabel: "Coverage" },
  ];

  const featuredProjects = [
    {
      id: "project-1",
      slug: "featured-project-1",
      title: "[Featured Project 1]",
      category: "Office Buildings",
      location: "[City, State]",
      description: "[Add project description - scope of work and results achieved]",
      featured: true,
    },
    {
      id: "project-2",
      slug: "featured-project-2",
      title: "[Featured Project 2]",
      category: "Retail Centers",
      location: "[City, State]",
      description: "[Add project description]",
      featured: false,
    },
    {
      id: "project-3",
      slug: "featured-project-3",
      title: "[Featured Project 3]",
      category: "Apartment Complexes",
      location: "[City, State]",
      description: "[Add project description]",
      featured: false,
    },
  ];

  const faqs = [
    {
      question: "What areas do you serve in Maryland, Virginia, DC, and Delaware?",
      answer: "We're based in Montgomery County and serve property managers throughout the region, including Bethesda, Rockville, Silver Spring, Gaithersburg, Kensington, Arlington, Fairfax, and Washington DC. With three decades in the area, we know every building inspector, jurisdiction code, and rush permit process.",
    },
    {
      question: "Do you provide emergency services for property managers?",
      answer: "Yes, we provide dedicated 24/7 emergency response with a 2-hour on-site guarantee for clients in Montgomery County. Our in-house team is always ready to handle urgent construction and maintenance emergencies with minimal disruption to your tenants.",
    },
    {
      question: "How much of the work is self-performed?",
      answer: "One hundred percent of our work is performed by our full-time, in-house staff using our own equipment. This means your same crews every time, no subcontractor surprises, and direct accountability from estimate to completion on every project.",
    },
    {
      question: "What makes Shall's Construction different from other contractors?",
      answer: "We've specialized exclusively in serving property managers since 1988. We understand work orders, COI requirements, tenant coordination, and budget constraints. Plus, as a three-generation family business headquartered in Montgomery County, we're invested in this community for the long term.",
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
  ];

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema(breadcrumbs),
    generateFAQSchema(faqs),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Montgomery County Commercial Contractor - 30+ Years Serving Property Managers"
        description="Commercial construction, renovation, and property maintenance experts serving Maryland, Virginia, DC, and Delaware. Family-owned since 1988. 24/7 emergency service."
        canonical="https://shallsconstruction.replit.app"
        schemas={schemas}
      />
      <Navigation />

      <section className="relative bg-gray-900 text-white min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/70 z-10"></div>
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Shall's Construction commercial project in Montgomery County Maryland"
            className="w-full h-full object-cover"
            loading="eager"
            width="1920"
            height="1080"
          />
        </div>
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight" data-testid="text-page-title">
           The DMV's Trusted Commercial Contractor for Property Managers
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
            Since 1988, property managers across the Mid-Atlantic have relied on Shall's for one simple reason: we show up, we deliver, and we don't leave until the job is done right.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:3019336277"
              onClick={() => trackEmergencyClick('hero_emergency_call')}
            >
              <Button size="lg" className="text-lg px-8 w-full sm:w-auto" data-testid="button-hero-emergency" aria-label="Call for 24/7 emergency services">
                <Clock className="mr-2 h-5 w-5" />
                24/7 Emergency: (301) 933-6277
              </Button>
            </a>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto"
                onClick={() => trackQuoteClick('hero_get_quote')}
                data-testid="button-hero-quote"
                aria-label="Request a free quote"
              >
                Request Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <stat.icon className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-medium">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-why-heading">
            Why Property Managers Keep Shalls on Speed Dial
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
                Managing work orders, tenants, and budgets is hard enough. The last thing you need is a contractor who wastes your time. For over 30 years, we’ve specialized in reliable, no-excuses property maintenance
              </p>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Our difference: consistency. Many of our crew have been with us 25+ years. When you call for a Bethesda property, it’s the same team who handled your Rockville building — people who already know your standards and deliver quality that doesn’t slip.
              </p>
            </div>
          </section>

      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4" data-testid="text-services-heading">
              Everything Your Property Needs, One Reliable Partner
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                data-testid={`card-service-${index}`}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} for commercial properties in Montgomery County Maryland`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width="800"
                    height="450"
                    data-testid={`img-service-${index}`}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-gray-900 mb-3" data-testid={`text-service-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed" data-testid={`text-service-description-${index}`}>
                    {service.description}
                  </p>
                  <Link 
                    href={service.link}
                    onClick={() => trackNavigationClick('service_card_read_more', service.link)}
                  >
                    <span
                      className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors cursor-pointer"
                      data-testid={`link-service-${index}`}
                      aria-label={`Learn more about ${service.title}`}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Hidden - Latest Insights & News section - can be re-enabled in the future */}
      {/* <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4" data-testid="text-blog-heading">
              Latest Insights & News
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Expert tips, industry news, and best practices for commercial property management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Link href="/blog">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-lg p-8 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1" data-testid="card-blog-safety">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                  Safety & Compliance
                </h3>
                <p className="text-gray-600 mb-4">
                  Stay updated on safety standards, certifications, and best practices for commercial properties
                </p>
                <span className="text-primary font-semibold">
                  Read Articles →
                </span>
              </div>
            </Link>

            <Link href="/blog">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-lg p-8 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1" data-testid="card-blog-maintenance">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                  Maintenance Tips
                </h3>
                <p className="text-gray-600 mb-4">
                  Expert advice on preventive maintenance and property care to protect your investment
                </p>
                <span className="text-primary font-semibold">
                  Read Articles →
                </span>
              </div>
            </Link>

            <Link href="/blog">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-lg p-8 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1" data-testid="card-blog-case-studies">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                  Case Studies
                </h3>
                <p className="text-gray-600 mb-4">
                  Real-world examples of our commercial property services and success stories
                </p>
                <span className="text-primary font-semibold">
                  Read Articles →
                </span>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link href="/blog">
              <Button size="lg" className="px-8" data-testid="button-view-all-articles" aria-label="View all blog articles">
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section> */}

      <section className="py-20 md:py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6" data-testid="text-cta-heading">
            Ready to Work With a Contractor You Can Trust?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Call for a consultation or submit a work order request today. We respond to all inquiries within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:3019336277"
              className="text-2xl md:text-3xl font-heading font-bold hover:text-white/90 transition-colors"
              data-testid="link-cta-phone"
              aria-label="Call Shall's Construction at (301) 933-6277"
            >
              (301) 933-6277
            </a>
            <span className="hidden sm:block text-white/50">|</span>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary border-white hover:bg-white/90"
                data-testid="button-cta-contact"
                aria-label="Contact Shall's Construction"
              >
                Get Your Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
