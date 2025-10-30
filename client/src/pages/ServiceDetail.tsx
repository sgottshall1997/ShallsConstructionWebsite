import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ArrowLeft, CheckCircle, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Service } from "@shared/schema";
import { generateBreadcrumbSchema } from "@/lib/schema";
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
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4" data-testid="text-not-found">
            Service Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The service you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/what-we-do">
            <Button data-testid="button-view-all-services">
              View All Services
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedServices = allServices?.filter(
    (s) => s.id !== service.id && s.category === service.category
  ).slice(0, 3) || [];

  const otherServices = allServices?.filter(
    (s) => s.id !== service.id && s.category !== service.category
  ).slice(0, 3) || [];

  const servicesToShow = relatedServices.length > 0 ? relatedServices : otherServices;

  const serviceImage = SERVICE_IMAGES[service.slug] || constructionImg;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/what-we-do" },
    { name: service.title, url: `/services/${service.slug}` },
  ];

  const schemas = [generateBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${service.title} | Commercial Property Services`}
        description={`${service.shortDescription} Professional ${service.title.toLowerCase()} services in Maryland, Virginia, DC, and Delaware. Over 30 years of experience serving property managers.`}
        schemas={schemas}
      />
      <Navigation />

      <section
        className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${serviceImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 to-gray-900/70"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight" data-testid="text-service-title">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl" data-testid="text-service-short-description">
            {service.shortDescription}
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-4 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/what-we-do">
            <button
              className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              data-testid="button-back-to-services"
            >
              <ArrowLeft className="h-4 w-4" /> Back to All Services
            </button>
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">About This Service</h2>
                <p className="text-gray-600 leading-relaxed" data-testid="text-service-description">
                  {service.fullDescription}
                </p>
              </div>

              {service.benefits && service.benefits.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg"
                        data-testid={`benefit-${index}`}
                      >
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.processSteps && service.processSteps.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Our Process</h2>
                  <div className="space-y-4">
                    {service.processSteps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 bg-white border border-gray-200 p-6 rounded-lg shadow-sm"
                        data-testid={`process-step-${index}`}
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-8 md:p-12 rounded-lg mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-lg mb-6 text-gray-100">
                  Contact us today for a free consultation and quote for your {service.title.toLowerCase()} needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact?type=quote">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white text-primary hover:bg-gray-100 border-white w-full sm:w-auto"
                      data-testid="button-request-quote"
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      Request a Quote
                    </Button>
                  </Link>
                  <Link href="/contact?type=emergency">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/10 backdrop-blur-md border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
                      data-testid="button-emergency-service"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      24/7 Emergency Service
                    </Button>
                  </Link>
                </div>
              </div>

              {servicesToShow.length > 0 && (
                <div>
                  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                    Related Services
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {servicesToShow.map((relatedService) => (
                      <Link key={relatedService.id} href={`/services/${relatedService.slug}`}>
                        <div
                          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                          data-testid={`related-service-${relatedService.slug}`}
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
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">
                  Quick Contact
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="border-b border-gray-200 pb-4">
                    <p className="text-sm text-gray-600 mb-2">Phone</p>
                    <a
                      href="tel:3019336277"
                      className="text-lg font-semibold text-primary hover:underline"
                      data-testid="link-phone"
                    >
                      (301) 933-6277
                    </a>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <p className="text-sm text-gray-600 mb-2">Email</p>
                    <a
                      href="mailto:shallsconstructionllc@aol.com"
                      className="text-sm text-primary hover:underline break-all"
                      data-testid="link-email"
                    >
                      shallsconstructionllc@aol.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Service Areas</p>
                    <p className="text-sm text-gray-900">
                      Maryland • Virginia • DC • Delaware
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/contact?type=quote">
                    <Button className="w-full" size="lg" data-testid="button-sidebar-quote">
                      Request a Quote
                    </Button>
                  </Link>
                  <Link href="/what-we-do">
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                      data-testid="button-view-all-services"
                    >
                      View All Services
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>30+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>100% In-House Staff</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>24/7 Emergency Response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
