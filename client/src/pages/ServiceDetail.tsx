import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import type { Service } from "@shared/schema";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/schema";
import { trackServiceView } from "@/lib/analytics";
import constructionImg from "@assets/generated_images/Construction_and_Remodeling_service_1aebcbea.png";
import handymanImg from "@assets/generated_images/Handyman_Services_worker_984f13b6.png";
import exteriorImg from "@assets/generated_images/Exterior_Building_Services_work_4ebd45e5.png";
import parkingImg from "@assets/generated_images/Parking_Lot_Services_result_327aebfc.png";
import paintingImg from "@assets/generated_images/Painting_Services_work_beb0461c.png";
import snowImg from "@assets/generated_images/Snow_Removal_service_e0dba011.png";

const SERVICE_IMAGES: Record<string, string> = {
  "construction-remodeling": constructionImg,
  "handyman-services": handymanImg,
  "exterior-building-services": exteriorImg,
  "parking-lot-services": parkingImg,
  "painting-services": paintingImg,
  "snow-removal": snowImg,
};


export default function ServiceDetail() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug || "";

  const { data: service, isLoading, error } = useQuery<Service>({
    queryKey: ["/api/services", slug],
    enabled: !!slug,
  });

  const { data: allServices } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  useEffect(() => {
    if (service) {
      trackServiceView(service.title);
    }
  }, [service]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-40 w-full mb-8" />
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-40 w-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-white">
        <SEO
          title="Service Not Found"
          description="The requested service could not be found."
          noindex={true}
        />
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4" data-testid="text-not-found">
            Service Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            The service you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <a className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors" data-testid="button-view-all-services">
              Back to Home
            </a>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const serviceImage = SERVICE_IMAGES[service.slug] || constructionImg;

  const tagline = service.tagline || "Professional commercial construction services";
  const philosophy = service.philosophy || service.fullDescription;
  const servicesInclude = service.servicesInclude && service.servicesInclude.length > 0 
    ? service.servicesInclude 
    : service.benefits;

  let relatedServicesList: Service[] = [];
  if (service.relatedServices && service.relatedServices.length > 0 && allServices) {
    relatedServicesList = service.relatedServices
      .map(slug => allServices.find(s => s.slug === slug))
      .filter((s): s is Service => s !== undefined);
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/" },
    { name: service.title, url: `/services/${service.slug}` },
  ];

  const schemas = [
    generateServiceSchema(service),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  const metaDescription = `${service.title} for commercial properties in MD VA DC DE — ${service.shortDescription.substring(0, 70)} — 30+ years experience.`;

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${service.title} | Commercial Property Services | Shall's`}
        description={metaDescription.length > 160 ? metaDescription.substring(0, 157) + '...' : metaDescription}
        schemas={schemas}
        canonical={`https://shallsconstruction.com/services/${service.slug}`}
      />
      <Navigation />

      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${serviceImage})`,
        }}
        role="img"
        aria-label={`${service.title} commercial property services Maryland Virginia DC`}
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight" data-testid="text-service-title">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Services</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{service.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="py-12 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900" data-testid="text-service-tagline">
            {tagline}
          </h2>
        </div>
      </section>

      {/* Philosophy/Intro */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed" data-testid="text-service-philosophy">
            {philosophy}
          </p>
        </div>
      </section>

      {/* Services Include - Large Bullets */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8" data-testid="text-services-include-heading">
            {service.title} Services Include:
          </h2>
          <ul className="space-y-6" data-testid="list-services-include">
            {servicesInclude?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4" data-testid={`service-include-${idx}`}>
                <span className="text-primary font-bold text-2xl flex-shrink-0 mt-1" aria-hidden="true">•</span>
                <h3 className="text-xl font-semibold text-gray-800">{item}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonial Block */}
      {service.testimonialQuote && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-primary" data-testid="testimonial-block">
              <p className="text-lg text-gray-700 italic mb-4" data-testid="text-testimonial-quote">
                "{service.testimonialQuote}"
              </p>
              <p className="text-gray-900 font-semibold" data-testid="text-testimonial-author">
                {service.testimonialAuthor}
                {service.testimonialRole && `, ${service.testimonialRole}`}
              </p>
              {service.testimonialCompany && (
                <p className="text-gray-600 text-sm" data-testid="text-testimonial-company">
                  {service.testimonialCompany}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700" data-testid="text-cta-section">
            For questions regarding our {service.title} services, please contact{" "}
            <a 
              href="mailto:shallsconstructionllc@aol.com" 
              className="text-primary hover:underline font-semibold"
              data-testid="link-email"
              aria-label="Email Shall's Construction"
            >
              shallsconstructionllc@aol.com
            </a>
            {" "}or call{" "}
            <a 
              href="tel:+13019336277" 
              className="text-primary hover:underline font-semibold"
              data-testid="link-phone"
              aria-label="Call Shall's Construction at (301) 933-6277"
            >
              (301) 933-6277
            </a>
          </p>
        </div>
      </section>

      {/* Related Services */}
      {relatedServicesList.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8" data-testid="text-related-services-heading">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="grid-related-services">
              {relatedServicesList.map((relatedService) => (
                <Link key={relatedService.id} href={`/services/${relatedService.slug}`}>
                  <div
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full"
                    data-testid={`related-service-${relatedService.slug}`}
                    role="link"
                    aria-label={`Learn more about ${relatedService.title}`}
                  >
                    <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">
                      {relatedService.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {relatedService.shortDescription}
                    </p>
                    <span className="text-primary font-semibold text-sm">
                      Learn More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
