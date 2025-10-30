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
            Client Testimonials
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
      description: "Tenant buildouts, office renovations, and common-area upgrades delivered with precision and reliability across Maryland.",
      link: "/services/construction-remodeling",
    },
    {
      title: "Handyman Services",
      image: handymanImg,
      description: "Carpentry, drywall, and small repairs for commercial facilities throughout Virginia.",
      link: "/services/handyman-services",
    },
    {
      title: "Exterior Building Services",
      image: exteriorImg,
      description: "Masonry, waterproofing, and facade restoration to protect your property envelope in DC.",
      link: "/services/exterior-building-services",
    },
    {
      title: "Parking Lot Asphalt & Concrete",
      image: parkingImg,
      description: "Asphalt repair, striping, and sealcoating for safe, professional curb appeal throughout Virginia.",
      link: "/services/parking-lot-services",
    },
    {
      title: "Painting Services",
      image: paintingImg,
      description: "Interior and exterior painting with attention to surface preparation for Maryland properties.",
      link: "/services/painting-services",
    },
    {
      title: "Snow Removal",
      image: snowImg,
      description: "24/7 snow and ice management for commercial properties in DC, Maryland, and Virginia.",
      link: "/services/snow-removal",
    },
  ];

  const stats = [
    { icon: Award, label: "30+ Years", sublabel: "In Business" },
    { icon: Clock, label: "24/7/365", sublabel: "Emergency Response" },
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
      answer: "We serve property managers throughout the MD/VA/DC/DE region, including Baltimore, Bethesda, Rockville, Silver Spring, Gaithersburg, Arlington, Fairfax, and Washington DC. With over 30+ years of experience, we understand the unique requirements of each jurisdiction.",
    },
    {
      question: "Do you provide 24/7/365 emergency services for property managers?",
      answer: "Yes, we provide dedicated 24/7 emergency response for construction and maintenance emergencies. Our in-house team is always ready to handle urgent repairs, ensuring minimal disruption to your tenants.",
    },
    {
      question: "How much of the work is self-performed?",
      answer: "100% of our work is performed by our full-time, in-house staff using our own equipment. This ensures consistent quality, reliability, and direct accountability on every project.",
    },
    {
      question: "What makes Shall's Construction different from other contractors?",
      answer: "We were built specifically to serve property managers' needs. We understand the challenges of managing multiple projects, budgets, and schedules. Our comprehensive services, in-house team, and 30+ years of experience make us your single point of contact for all commercial property needs.",
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
  ];

  const schemas = [
    generateOrganizationSchema(),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Commercial Construction & Property Services | MD, VA, DC, DE | Shall's Construction"
        description="Commercial construction, property maintenance, and 24/7 emergency response across MD, VA, DC, and DE. Family-owned for 30+ years."
        canonical="https://shallsconstruction.com/"
        schemas={schemas}
      />
      <Navigation />

      <section className="relative min-h-[450px] md:min-h-[500px] flex items-center justify-center py-12 md:py-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Commercial construction site workers building renovation Maryland Virginia DC"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold mb-5 leading-tight" data-testid="hero-headline">
            Commercial Construction & Property Maintenance
          </h1>
          <h2 className="text-lg md:text-xl mb-7 text-gray-200 font-normal" data-testid="hero-subheadline">
            Family Owned & Operated - Serving the DMV for 30+ years
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?type=quote" onClick={() => trackQuoteClick('homepage_hero')}>
              <Button size="lg" className="text-base px-8 py-6" data-testid="button-quote" aria-label="Request a quote for commercial construction services">
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="tel:3019336277" onClick={() => trackEmergencyClick('homepage_hero')}>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 bg-white/10 backdrop-blur-md border-white text-white hover:bg-white hover:text-gray-900"
                data-testid="button-emergency"
                aria-label="Call for emergency 24/7 commercial construction service"
              >
                Emergency Service 24/7
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <stat.icon className="h-12 w-12 md:h-16 md:w-16 mx-auto text-primary mb-4" />
                <div className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
                  {stat.label}
                </div>
                <div className="text-sm md:text-base text-gray-600 mt-2">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Shall's Construction provides commercial renovation, maintenance, and repair services for property managers across Maryland, Virginia, DC, and Delaware. With over 30 years of experience and 24/7 emergency response, we deliver reliable results every time.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4" data-testid="text-services-heading">
              Our Services
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
                    alt={`${service.title} commercial property services Maryland Virginia DC Delaware`}
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
                      Read More
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
            Contact Shall's Construction
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Call for consultation or submit a work order request today.
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
                Contact Us Today
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
