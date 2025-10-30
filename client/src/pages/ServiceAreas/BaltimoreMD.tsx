import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateFAQSchema, generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, MapPin, Phone, ArrowRight, Building2 } from "lucide-react";

type Location = {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  mapEmbedUrl: string;
  serviceArea: string[];
  description: string;
};

type Service = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  icon: string;
};

export default function BaltimoreMD() {
  const locationSlug = "baltimore-md";
  
  const { data: location, isLoading: locationLoading, error: locationError } = useQuery<Location>({
    queryKey: ["/api/locations", locationSlug],
    queryFn: async () => {
      const response = await fetch(`/api/locations/${locationSlug}`);
      if (!response.ok) throw new Error("Failed to fetch location");
      return response.json();
    },
  });

  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const faqs = [
    {
      question: "Do you work in both Baltimore City and Baltimore County?",
      answer: "Yes, we serve commercial properties throughout Baltimore City and Baltimore County. Our team is experienced with both jurisdictions' requirements and has worked on projects across the greater Baltimore area.",
    },
    {
      question: "What types of commercial properties do you service in Baltimore?",
      answer: "We serve all types of commercial properties in Baltimore including office buildings, retail centers, medical facilities, multi-family housing, schools, and government buildings. Our diverse experience ensures we can handle any project.",
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/service-areas" },
    { name: location?.name || "Baltimore, MD", url: "/service-areas/baltimore-md" },
  ];

  const schemas = location ? [
    generateLocalBusinessSchema({
      areaServed: location.serviceArea,
    }),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema(breadcrumbs),
  ] : [];

  const companyName = "Shall's Construction";
  const defaultPhone = location?.phone || "(301) 490-2119";

  if (locationError) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center" data-testid="error-message">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Location Not Found</h1>
            <p className="text-gray-600 mb-8">We couldn't find information for this location.</p>
            <Link href="/service-areas">
              <Button data-testid="button-back-to-service-areas">Back to Service Areas</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`Commercial Construction in ${location?.city || "Baltimore"}, ${location?.state || "MD"} | Shall's Construction`}
        description={`Professional commercial construction and maintenance services for property managers in ${location?.city || "Baltimore"}, ${location?.state || "MD"}. Over 30+ years serving the region. Licensed in MD/VA/DC/DE. Call ${defaultPhone} for reliable service.`}
        schemas={schemas}
      />
      <Navigation />

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {locationLoading ? (
            <>
              <Skeleton className="h-8 w-48 mx-auto mb-4" data-testid="skeleton-location-badge" />
              <Skeleton className="h-12 w-full max-w-2xl mx-auto mb-6" data-testid="skeleton-title" />
              <Skeleton className="h-24 w-full max-w-3xl mx-auto" data-testid="skeleton-description" />
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 text-primary mb-4" data-testid="location-badge">
                <MapPin className="h-6 w-6" />
                <span className="text-lg font-semibold">{location?.city}, {location?.state}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6 text-center" data-testid="heading-title">
                {location?.city} Commercial Property Services
              </h1>
              <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center max-w-3xl mx-auto" data-testid="text-intro">
                {location?.description}
              </p>
            </>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6" data-testid="heading-nap">
                Contact & Location
              </h2>
              
              <div className="bg-primary/5 rounded-lg p-8 mb-8" data-testid="card-nap">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-start gap-3">
                      <Building2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1" data-testid="text-company-name">{companyName}</h3>
                        {locationLoading ? (
                          <Skeleton className="h-4 w-48" data-testid="skeleton-address" />
                        ) : (
                          <p className="text-gray-700" data-testid="text-address">{location?.address}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Phone</p>
                        <a 
                          href={`tel:${defaultPhone.replace(/\D/g, '')}`} 
                          className="text-xl font-semibold text-primary hover:underline"
                          data-testid="link-phone"
                        >
                          {defaultPhone}
                        </a>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 ml-8" data-testid="text-emergency-notice">24/7 Emergency Response Available</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3" data-testid="heading-service-area">Service Area Coverage</h4>
                  {locationLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2" data-testid="list-service-areas">
                      {location?.serviceArea.map((city, index) => (
                        <span 
                          key={index} 
                          className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200"
                          data-testid={`badge-service-area-${index}`}
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="flex-1">
                  <Button size="lg" className="w-full" data-testid="button-request-quote">
                    Request a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href={`tel:${defaultPhone.replace(/\D/g, '')}`} className="flex-1">
                  <Button size="lg" variant="outline" className="w-full" data-testid="button-call-now">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us Now
                  </Button>
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6" data-testid="heading-map">
                Find Us on the Map
              </h2>
              {locationLoading ? (
                <Skeleton className="w-full h-[450px] rounded-lg" data-testid="skeleton-map" />
              ) : location?.mapEmbedUrl ? (
                <div className="rounded-lg overflow-hidden shadow-lg" data-testid="container-map">
                  <iframe
                    src={location.mapEmbedUrl}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${location.name}`}
                    data-testid="iframe-google-map"
                  ></iframe>
                </div>
              ) : (
                <div className="w-full h-[450px] bg-gray-100 rounded-lg flex items-center justify-center" data-testid="placeholder-no-map">
                  <p className="text-gray-500">Map not available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4 text-center" data-testid="heading-services">
            Services Available in {location?.city}
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Professional commercial property services tailored to {location?.city} businesses and property managers
          </p>
          
          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-48 rounded-lg" data-testid={`skeleton-service-${i}`} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-services">
              {services?.map((service) => (
                <Link key={service.id} href={`/services/${service.slug}`}>
                  <div 
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full"
                    data-testid={`card-service-${service.slug}`}
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-testid={`text-service-title-${service.slug}`}>
                          {service.title} in {location?.city}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed" data-testid={`text-service-description-${service.slug}`}>
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-primary font-medium text-sm mt-4">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6" data-testid="heading-why-choose">
                Why {location?.city} Property Managers Choose Us
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {location?.city}'s diverse commercial landscape requires a contractor who understands local regulations, tenant expectations, and the unique needs of the area's business district.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We've worked on countless properties throughout {location?.city}, delivering quality workmanship with our 100% in-house team. This ensures consistent results and minimal disruption to your tenants.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">30+ years serving the region</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Licensed in MD/VA/DC/DE</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">100% in-house staff - no subcontractors</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">24/7 emergency response</span>
                </li>
              </ul>
            </div>
            <div className="bg-primary/5 rounded-lg p-8">
              <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6" data-testid="heading-local-projects">
                Recent Projects in {location?.city}
              </h3>
              <p className="text-gray-600 mb-6">
                From commercial office renovations to retail build-outs and property maintenance, we've successfully completed numerous projects throughout {location?.city}.
              </p>
              <Link href="/projects">
                <Button variant="outline" size="lg" className="w-full" data-testid="button-view-projects">
                  View Our Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-12 text-center" data-testid="heading-faqs">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6" data-testid="list-faqs">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm" data-testid={`card-faq-${index}`}>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" data-testid={`text-faq-question-${index}`}>
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed" data-testid={`text-faq-answer-${index}`}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6" data-testid="heading-cta">
            Ready to Start Your {location?.city} Project?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Contact us today for a free consultation and quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="min-w-[200px]" data-testid="button-cta-contact">
                Get a Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href={`tel:${defaultPhone.replace(/\D/g, '')}`}>
              <Button size="lg" variant="outline" className="min-w-[200px] bg-transparent border-white text-white hover:bg-white hover:text-primary" data-testid="button-cta-call">
                <Phone className="mr-2 h-5 w-5" />
                {defaultPhone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
