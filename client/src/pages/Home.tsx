import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Award, MapPin, Quote, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";
import TestimonialCard from "@/components/ui/testimonial-card";
import ProjectCard from "@/components/ui/project-card";
import { trackQuoteClick, trackPhoneClick, trackNavigationClick } from "@/lib/analytics";
import heroImage from "@assets/generated_images/Homepage_hero_construction_scene_4f48bae9.webp";
import constructionImg from "@assets/generated_images/Construction_and_Remodeling_service_1aebcbea.webp";
import handymanImg from "@assets/generated_images/Handyman_Services_worker_984f13b6.webp";
import exteriorImg from "@assets/generated_images/Exterior_Building_Services_work_4ebd45e5.webp";
import parkingImg from "@assets/generated_images/Parking_Lot_Services_result_327aebfc.webp";
import paintingImg from "@assets/generated_images/Painting_Services_work_beb0461c.webp";
import snowImg from "@assets/generated_images/Snow_Removal_service_e0dba011.webp";
import { COMPANY, yearsText, telHref } from "@shared/company";
import { SERVICE_NAMES } from "@shared/routes";

export default function Home() {
  const services = [
    { slug: "construction-remodeling", image: constructionImg, alt: "Crew framing an interior office build-out", description: "Tenant build-outs and office renovations delivered on schedule and within budget." },
    { slug: "handyman-services", image: handymanImg, alt: "Technician repairing a commercial door fixture", description: "Repairs, carpentry, and day-to-day maintenance handled by skilled craftsmen." },
    { slug: "exterior-building-services", image: exteriorImg, alt: "Worker repointing brick on a building facade", description: "Masonry, waterproofing, and facade restoration that protect your building envelope." },
    { slug: "parking-lot-services", image: parkingImg, alt: "Freshly sealed and striped parking lot", description: "Asphalt repair, concrete work, sealcoating, and striping." },
    { slug: "painting-services", image: paintingImg, alt: "Painter rolling a commercial interior wall", description: "Interior and exterior painting designed to work around in-place tenants with minimal disruptions." },
    { slug: "snow-removal", image: snowImg, alt: "Plow clearing snow from a commercial lot", description: "Snow and ice management that keeps your property accessible all winter." },
  ] as const;

  const stats = [
    { icon: Award, label: `${COMPANY.yearsInBusiness}+`, sublabel: "Years in Business" },
    { icon: Users, label: `${COMPANY.selfPerformedPercent}%`, sublabel: "Self-Performed Work" },
    { icon: MapPin, label: COMPANY.regionShort, sublabel: "Service Area" },
  ];

  const faqs = [
    {
      question: `What areas do you serve?`,
      answer: `We serve property managers across ${COMPANY.regionShort}, including ${COMPANY.serviceAreas.join(", ")}.`,
    },
    {
      question: "How quickly do you respond?",
      answer: COMPANY.responsePromise,
    },
    {
      question: `What makes ${COMPANY.name} different?`,
      answer: `We specialize in commercial property work and understand COI requirements, tenant coordination, and budget constraints.`,
    },
  ];

  const schemas = [generateBreadcrumbSchema([{ name: "Home", url: "/" }]), generateFAQSchema(faqs)];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`Commercial Contractor for Property Managers | ${COMPANY.regionShort}`}
        description={`Commercial construction, renovation, and property maintenance for property managers in ${COMPANY.regionShort}. ${yearsText()} of experience.`}
        canonical="/"
        schemas={schemas}
      />
      <Navigation />

      <section className="relative bg-gray-900 text-white min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/70 z-10"></div>
        <div className="absolute inset-0">
          <img src={heroImage} alt="Construction crew working on a commercial building site" className="w-full h-full object-cover" loading="eager" fetchPriority="high" width="1920" height="1080" />
        </div>
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight" data-testid="text-page-title">
            Commercial Construction &amp; Property Maintenance for Property Managers in {COMPANY.regionShort}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
            Property managers across {COMPANY.regionShort} rely on Shall's because we show up, deliver, and finish the job right — one call does it all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button size="lg" className="text-lg px-8 w-full sm:w-auto" onClick={() => trackQuoteClick("hero_get_quote")} data-testid="button-hero-quote">
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href={telHref()} onClick={() => trackPhoneClick("hero_call")}>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto" data-testid="button-hero-call">
                <Phone className="mr-2 h-5 w-5" />
                Call {COMPANY.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-why-heading">
            Why Property Managers Keep Shall's on Speed Dial
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
            Managing work orders, tenants, and budgets is hard enough. For {yearsText()}, we've delivered reliable, no-excuses property maintenance.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {COMPANY.selfPerformedPercent}% of our work is performed by our own crews, so the team on your property already knows commercial standards.
          </p>
        </div>
      </section>

      <section id="services" className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4" data-testid="text-services-heading">
              Everything Your Property Needs, One Reliable Partner
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.slug} className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid={`card-service-${index}`}>
                <div className="aspect-video overflow-hidden">
                  <img src={service.image} alt={service.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" width="1200" height="675" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-gray-900 mb-3">{SERVICE_NAMES[service.slug]}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  <Link href={`/services/${service.slug}`} onClick={() => trackNavigationClick("service_card_read_more", `/services/${service.slug}`)}>
                    <span className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors cursor-pointer">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {COMPANY.testimonials.length > 0 && (
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Quote className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900">What Property Managers Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {COMPANY.testimonials.slice(0, 3).map((t, i) => (
                <TestimonialCard key={i} quote={t.quote} author={t.author} company={t.company || ""} role={t.role || ""} {...("rating" in t && typeof (t as any).rating === "number" ? { rating: (t as any).rating } : {})} service="" location="" featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {COMPANY.projects.length > 0 && (
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-12 text-center">Recent Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {COMPANY.projects.slice(0, 3).map((p) => (
                <ProjectCard key={p.slug} slug={p.slug} title={p.name} category={p.category || "Commercial"} location={p.city} imageUrl={p.photo} description={p.scope} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6" data-testid="text-cta-heading">Ready to Work With a Contractor You Can Trust?</h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">Submit a work order or quote request today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white text-primary border-white hover:bg-white/90" data-testid="button-cta-quote">Request a Quote</Button>
            </Link>
            <a href={telHref()}>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" data-testid="button-cta-call">Call {COMPANY.phone}</Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
