import { useEffect } from "react";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { CheckCircle2 } from "lucide-react";
import constructionImg from "@assets/generated_images/Construction_and_Remodeling_service_1aebcbea.png";
import handymanImg from "@assets/generated_images/Handyman_Services_worker_984f13b6.png";
import exteriorImg from "@assets/generated_images/Exterior_Building_Services_work_4ebd45e5.png";
import parkingImg from "@assets/generated_images/Parking_Lot_Services_result_327aebfc.png";
import paintingImg from "@assets/generated_images/Painting_Services_work_beb0461c.png";
import snowImg from "@assets/generated_images/Snow_Removal_service_e0dba011.png";

export default function WhatWeDo() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const keyBenefits = [
    "Self-Performed, Quality Work",
    "Exceptional Customer Service",
    "Minimal Disruptions",
    "Over 25 Years Experience",
  ];

  const faqs = [
    {
      question: "What commercial construction services do you provide?",
      answer: "We provide comprehensive commercial services including construction & remodeling, handyman services, painting, exterior building services, parking lot maintenance, and snow removal. All work is performed by our in-house team.",
    },
    {
      question: "Do you work around occupied tenants?",
      answer: "Yes, we specialize in working around in-place tenants with minimal disruptions. We plan our work efficiently so tenants may not even know we're on-site. This is essential for property managers who can't afford downtime.",
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "What We Do", url: "/what-we-do" },
  ];

  const schemas = [
    generateFAQSchema(faqs),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Commercial Construction Services | What We Do"
        description="Comprehensive commercial construction and maintenance services for property managers. Construction, handyman, painting, exterior services, parking lots, and snow removal across MD, VA, and DC."
        schemas={schemas}
      />
      <Navigation />

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-page-title">
            We make your life easier while enhancing your tenants' experience
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            When it comes to repairing and maintaining your commercial property, we're a property manager's greatest resource.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
            {keyBenefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center" data-testid={`benefit-${index}`}>
                <CheckCircle2 className="h-10 w-10 text-primary mb-2" />
                <span className="text-sm md:text-base font-semibold text-gray-900 text-center">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              For property managers with countless projects, there's one name to remember:
            </h2>
            <p className="text-2xl md:text-3xl font-heading font-bold text-primary">
              Shall's Construction
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="leading-relaxed mb-6">
              There are many companies that serve commercial property managers and owners—but none are quite like Shall's.
              From our inception, Shall's was built to serve property managers' needs. We understand the challenges you face
              in managing multiple projects, schedules, and budgets. Today, we provide an even greater depth and breadth of
              expertise to make your life easier. <span className="font-bold text-gray-900">One Call Does It All!</span>
            </p>
            <p className="leading-relaxed">
              For more than 25 years, we've earned a reputation for helping property managers with their commercial renovation,
              repair, and maintenance needs both large and small — with professional, high quality work. Because 100% of our work
              is done by our full-time staff using our own equipment, you always get consistent, high-quality results. The bottom
              line: we make your life easier, while enhancing your tenants' experience.
            </p>
          </div>
        </div>
      </section>

      <section id="construction" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={constructionImg}
                alt="Construction and Remodeling"
                className="rounded-lg shadow-lg w-full"
                data-testid="img-construction"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6" data-testid="text-construction-title">
                Construction & Remodeling
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                When it comes to the complex, fast-paced world of commercial construction, we are a property manager's greatest
                resource and biggest ally. Our construction expertise includes commercial interiors, office remodeling, retail
                construction, tenant build out, common area upgrades, and emergency construction services.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We provide dedicated, on-call 24/7 response to emergencies to ensure your project is efficiently managed and
                executed, no matter what. With over 25 years of experience managing every facet of commercial construction,
                Shall's Construction can provide valuable guidance on how to maximize the use of existing spaces.
              </p>
              <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
                <p className="text-primary font-semibold">24/7 Emergency Response Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="handyman" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6" data-testid="text-handyman-title">
                Handyman Services
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Offering repair and maintenance needs both large and small — with high quality work. Our comprehensive handyman
                services include carpentry, ceiling repair, ceramic tile repair, drywall repair, door and lock repair, and more.
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Carpentry and ceiling repair</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Ceramic tile and drywall repair</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Door and lock repair</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>General maintenance and repairs</span>
                </li>
              </ul>
              <p className="text-gray-600 italic">
                You always get consistent, high-quality results. The bottom line: we make your life easier.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={handymanImg}
                alt="Handyman Services"
                className="rounded-lg shadow-lg w-full"
                data-testid="img-handyman"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="painting" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={paintingImg}
                alt="Painting Services"
                className="rounded-lg shadow-lg w-full"
                data-testid="img-painting"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6" data-testid="text-painting-title">
                Painting Services
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                A fresh coat of professionally-applied, expertly detailed paint can do more than just perk-up your building;
                it can add long-term value to your property. Shall's Construction are specialists at interior and exterior
                painting services and commercial painting.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our comprehensive experience and on-site, professional team ensures your project is worry-free and executed
                with the highest quality precision and craftsmanship. We offer:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Interior and exterior paint projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Specialty coatings and finishes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Garage painting and sealing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="exterior" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6" data-testid="text-exterior-title">
                Exterior Building Services
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Maintaining the exterior of your commercial building requires practical expertise as well as a cost-effective,
                long-term approach. With over two decades of experience, Shall's offers high-quality solutions for all building
                exterior needs.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our building exterior services include:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Waterproofing & Caulking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Masonry Repair</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Power Washing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Leak Investigation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Concrete Repair</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Garage Repair</span>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={exteriorImg}
                alt="Exterior Building Services"
                className="rounded-lg shadow-lg w-full"
                data-testid="img-exterior"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="asphalt" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={parkingImg}
                alt="Parking Lot Services"
                className="rounded-lg shadow-lg w-full"
                data-testid="img-parking"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6" data-testid="text-parking-title">
                Parking Lot Asphalt & Concrete
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Experts in all aspects of parking lot maintenance and preservation. From any asphalt project, parking lot
                striping, stenciling, sealcoating, and even ADA upgrades, our team takes the time to understand your job and
                craft an efficient, professional plan that meets your needs and budget.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our parking lot services include:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Asphalt patching and paving</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Concrete repair and installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Sealcoating and striping</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>ADA compliance upgrades</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="snow" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6" data-testid="text-snow-title">
                Snow Removal
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                During winter months, we ensure your property can be safely accessed with prompt snow and ice management and
                removal. We pride ourselves on causing minimal disruptions to your in-place tenants, and plan our work so
                efficiently; they may not even know we are on-site.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                For full-service, cost-effective, professional snow removal services in the MD/DC/VA region that you can rely on!
              </p>
              <div className="bg-gray-100 border-l-4 border-primary p-4 rounded">
                <p className="font-semibold text-gray-900">Yearly Contracts Available</p>
                <p className="text-sm text-gray-600 mt-1">Plan ahead for winter with our seasonal packages</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={snowImg}
                alt="Snow Removal"
                className="rounded-lg shadow-lg w-full"
                data-testid="img-snow"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
