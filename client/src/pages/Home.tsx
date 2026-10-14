import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Award, MapPin, Quote } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateFAQSchema, generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/schema";
import TestimonialCard from "@/components/ui/testimonial-card";
import ProjectCard from "@/components/ui/project-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Testimonial } from "@shared/schema";
import { trackQuoteClick, trackEmergencyClick, trackNavigationClick } from "@/lib/analytics";
import heroImage from "@assets/generated_images/Homepage_hero_construction_scene_4f48bae9.png";
import constructionImg from "@assets/generated_images/Construction_and_Remodeling_service_1aebcbea.png";
import handymanImg from "@assets/generated_images/Handyman_Services_worker_984f13b6.png";
import exteriorImg from "@assets/generated_images/Exterior_Building_Services_work_4ebd45e5.png";
import parkingImg from "@assets/generated_images/Parking_Lot_Services_result_327aebfc.png";
import paintingImg from "@assets/generated_images/Painting_Services_work_beb0461c.png";
import snowImg from "@assets/generated_images/Snow_Removal_service_e0dba011.png";
import {
  COMPANY,
  stateNamesList,
  stateCodesSlash,
  selfPerformedText,
  yearsPhrase,
  telHref,
  publishableTestimonials,
} from "@shared/company";

function TestimonialsSection() {
  const fromCompany = publishableTestimonials();
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials/featured"],
    enabled: fromCompany.length === 0,
  });

  const cards =
    fromCompany.length > 0
      ? fromCompany.slice(0, 3).map((t, i) => ({
          key: `c-${i}`,
          quote: t.quote,
          author: t.author,
          company: t.company || "",
          role: t.role || "",
          rating: 5,
          service: "",
          location: "",
          featured: true,
        }))
      : testimonials.slice(0, 3).map((t) => ({
          key: t.id,
          quote: t.comment.length > 150 ? `${t.comment.substring(0, 150)}...` : t.comment,
          author: t.clientName,
          company: t.company,
          role: t.role,
          rating: t.rating,
          service: t.serviceType,
          location: t.location,
          featured: t.featured,
        }));

  if (!isLoading && cards.length === 0) return null;

  return (
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Quote className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4" data-testid="text-testimonials-heading">
            What Property Managers Say About Us
          </h2>
        </div>
        {isLoading && fromCompany.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
                <Skeleton className="h-5 w-32 mb-4" />
                <Skeleton className="h-16 w-full mb-6" />
                <Skeleton className="h-6 w-48 mb-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" data-testid="featured-testimonials-grid">
            {cards.map((c) => (
              <TestimonialCard key={c.key} quote={c.quote} author={c.author} company={c.company} role={c.role} rating={c.rating} service={c.service} location={c.location} featured={c.featured} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const years = yearsPhrase();
  const services = [
    { title: "Construction & Remodeling", image: constructionImg, description: "Tenant build-outs and office renovations delivered on schedule and within budget.", link: "/services/construction-remodeling" },
    { title: "Handyman Services", image: handymanImg, description: "From minor repairs to skilled carpentry, our craftsmen handle commercial maintenance work efficiently.", link: "/services/handyman-services" },
    { title: "Exterior Building Services", image: exteriorImg, description: "Masonry, waterproofing, and facade restoration that protect your building envelope.", link: "/services/exterior-building-services" },
    { title: "Parking Lot Asphalt & Concrete", image: parkingImg, description: "Asphalt repair, striping, and sealcoating that keep your property looking sharp.", link: "/services/parking-lot-services" },
    { title: "Painting Services", image: paintingImg, description: "Interior and exterior painting with careful surface preparation, designed to work around in-place tenants with minimal disruptions.", link: "/services/painting-services" },
    { title: "Snow Removal", image: snowImg, description: "Round-the-clock snow and ice management so tenants can reach your property safely.", link: "/services/snow-removal" },
  ];

  const stats = [
    years ? { icon: Award, label: years, sublabel: "Experience" } : null,
    { icon: Clock, label: "24/7", sublabel: "Emergency Service" },
    { icon: Users, label: "Own Crews", sublabel: "Self-Performed Work" },
    { icon: MapPin, label: stateCodesSlash(), sublabel: "Coverage" },
  ].filter(Boolean) as { icon: typeof Award; label: string; sublabel: string }[];

  const faqs = [
    {
      question: `What areas do you serve in ${stateNamesList()}?`,
      answer: `We're based in ${COMPANY.address.locality}, ${COMPANY.address.region}, and serve property managers throughout ${stateNamesList()}, including Bethesda, Rockville, Silver Spring, Gaithersburg, Kensington, Arlington, Fairfax, and Washington, DC.`,
    },
    {
      question: "Do you provide emergency services for property managers?",
      answer: `Yes. ${COMPANY.responsePromise.replace(/^./, (c) => c.toUpperCase())} for urgent construction and maintenance needs, with work planned around your tenants.`,
    },
    {
      question: "How much of the work is self-performed?",
      answer: `${selfPerformedText().replace(/^./, (c) => c.toUpperCase())}. That means consistent crews, no subcontractor surprises, and direct accountability from estimate to completion.`,
    },
    {
      question: `What makes ${COMPANY.shortName} different from other contractors?`,
      answer: `We specialize in serving property managers. We understand work orders, COI requirements, tenant coordination, and budget constraints — and ${COMPANY.tagline.toLowerCase()} covers construction through snow removal.`,
    },
  ];

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([{ name: "Home", url: "/" }]),
    generateFAQSchema(faqs),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`Commercial Contractor for Property Managers | ${stateCodesSlash()}`}
        description={`Commercial construction, renovation, and property maintenance for property managers across ${stateNamesList()}. ${COMPANY.responsePromise}.`}
        canonical="/"
        schemas={schemas}
      />
      <Navigation />

      <section className="relative bg-gray-900 text-white min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/70 z-10"></div>
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Commercial construction crew at work on a building site"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
          />
        </div>
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight" data-testid="text-page-title">
            The DMV's Trusted Commercial Contractor for Property Managers
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
            Property managers across the Mid-Atlantic rely on Shall's for one reason: we show up, we deliver, and we don't leave until the job is done right. {COMPANY.tagline}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={telHref()} onClick={() => trackEmergencyClick("hero_emergency_call")}>
              <Button size="lg" className="text-lg px-8 w-full sm:w-auto" data-testid="button-hero-emergency" aria-label="Call for 24/7 emergency services">
                <Clock className="mr-2 h-5 w-5" />
                24/7 Emergency: {COMPANY.phone.display}
              </Button>
            </a>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto"
                onClick={() => trackQuoteClick("hero_get_quote")}
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
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12`}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <stat.icon className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-why-heading">
            Why Property Managers Keep Shall's on Speed Dial
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
            Managing work orders, tenants, and budgets is hard enough. The last thing you need is a contractor who wastes your time.
            {years ? ` For ${years},` : " For years,"} we've specialized in reliable, no-excuses property maintenance.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Our difference: consistency. {selfPerformedText().replace(/^./, (c) => c.toUpperCase())}, so when you call about your Bethesda property, you get crews who already know commercial standards.
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
              <div key={index} className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid={`card-service-${index}`}>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} work by ${COMPANY.shortName}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width="1200"
                    height="675"
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
                  <Link href={service.link} onClick={() => trackNavigationClick("service_card_read_more", service.link)}>
                    <span className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors cursor-pointer" data-testid={`link-service-${index}`} aria-label={`Learn more about ${service.title}`}>
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

      {COMPANY.projects.length > 0 && (
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Recent Work</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {COMPANY.projects.slice(0, 3).map((p) => (
                <ProjectCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.name}
                  category={p.category || "Commercial"}
                  location={p.city}
                  imageUrl={p.photo}
                  description={p.scope}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6" data-testid="text-cta-heading">
            Ready to Work With a Contractor You Can Trust?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Call for a consultation or submit a work order request today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={telHref()} className="text-2xl md:text-3xl font-heading font-bold hover:text-white/90 transition-colors" data-testid="link-cta-phone" aria-label={`Call ${COMPANY.shortName} at ${COMPANY.phone.display}`}>
              {COMPANY.phone.display}
            </a>
            <span className="hidden sm:block text-white/50">|</span>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white text-primary border-white hover:bg-white/90" data-testid="button-cta-contact" aria-label={`Contact ${COMPANY.shortName}`}>
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
