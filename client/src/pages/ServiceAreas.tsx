import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { MapPin, Phone } from "lucide-react";
import { Link } from "wouter";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function ServiceAreas() {
  const regions = [
    {
      state: "Maryland",
      counties: [
        "Baltimore City",
        "Baltimore County",
        "Montgomery County",
        "Prince George's County",
        "Howard County",
        "Anne Arundel County",
        "Frederick County",
      ],
      cities: [
        "Baltimore",
        "Bethesda",
        "Rockville",
        "Silver Spring",
        "Gaithersburg",
        "Columbia",
        "Frederick",
        "Germantown",
        "Laurel",
        "Bowie",
        "Annapolis",
      ],
    },
    {
      state: "Virginia",
      counties: [
        "Arlington County",
        "Fairfax County",
        "Loudoun County",
        "Prince William County",
      ],
      cities: ["Arlington", "Fairfax", "Alexandria", "Reston", "Tysons"],
    },
    {
      state: "Washington DC",
      counties: ["District of Columbia"],
      cities: ["All DC Neighborhoods"],
    },
    {
      state: "Delaware",
      counties: ["New Castle County", "Kent County", "Sussex County"],
      cities: ["Wilmington", "Dover", "Newark"],
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/service-areas" },
  ];

  const schemas = [generateBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Service Areas MD VA DC DE | Shall's Construction Coverage"
        description="Commercial construction and maintenance serving Maryland, Virginia, DC, and Delaware — find your local contractor. 30+ years serving property managers."
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
                <BreadcrumbPage>Service Areas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-page-title">
            Service Areas
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Proudly serving commercial property managers across Maryland, Virginia, Washington DC, and Delaware
          </p>
        </div>
      </section>

      {/* Map Section - Placeholder */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-12">
            <div className="text-center text-gray-500">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-primary" />
              <p className="text-lg font-semibold">[Add Interactive Map Here]</p>
              <p className="text-sm mt-2">Showing MD/VA/DC/DE coverage area</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              Our Coverage Area
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are fully licensed and insured to serve commercial properties throughout the Mid-Atlantic region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {regions.map((region, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6"
                data-testid={`region-${index}`}
              >
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  {region.state}
                </h3>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Counties</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {region.counties.map((county, idx) => (
                      <li key={idx}>{county}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Major Cities</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {region.cities.map((city, idx) => (
                      <li key={idx}>{city}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Service Area Pages */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              Featured Service Areas
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Bethesda, MD", url: "/service-areas/bethesda-md" },
              { name: "Rockville, MD", url: "/service-areas/rockville-md" },
              { name: "Silver Spring, MD", url: "/service-areas/silver-spring-md" },
              { name: "Baltimore, MD", url: "/service-areas/baltimore-md" },
              { name: "Gaithersburg, MD", url: "/service-areas/gaithersburg-md" },
              { name: "DC Metro", url: "/service-areas/dc-metro" },
            ].map((area, index) => (
              <Link key={index} href={area.url}>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-primary hover:shadow-md transition-all cursor-pointer" data-testid={`link-area-${index}`}>
                  <MapPin className="h-6 w-6 text-primary mb-3" />
                  <h3 className="text-lg font-heading font-semibold text-gray-900">
                    {area.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Learn more about our services in this area →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Serving Your Area?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Don't see your specific location listed? Give us a call - we may still be able to serve you!
          </p>
          <a
            href="tel:3019336277"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            data-testid="button-call-cta"
          >
            <Phone className="h-5 w-5" />
            (301) 933-6277
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
