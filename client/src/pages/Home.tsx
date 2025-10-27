import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Award, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";
import heroImage from "@assets/generated_images/Homepage_hero_construction_scene_4f48bae9.png";
import constructionImg from "@assets/generated_images/Construction_and_Remodeling_service_1aebcbea.png";
import handymanImg from "@assets/generated_images/Handyman_Services_worker_984f13b6.png";
import exteriorImg from "@assets/generated_images/Exterior_Building_Services_work_4ebd45e5.png";
import parkingImg from "@assets/generated_images/Parking_Lot_Services_result_327aebfc.png";
import paintingImg from "@assets/generated_images/Painting_Services_work_beb0461c.png";
import snowImg from "@assets/generated_images/Snow_Removal_service_e0dba011.png";

export default function Home() {
  const services = [
    {
      title: "Construction & Remodeling",
      image: constructionImg,
      description: "Commercial interiors, office remodeling, retail construction, tenant build out, and 24/7 emergency construction services.",
      link: "/what-we-do#construction",
    },
    {
      title: "Handyman Services",
      image: handymanImg,
      description: "Repair and maintenance needs both large and small with high quality work. Carpentry, drywall, doors, and more.",
      link: "/what-we-do#handyman",
    },
    {
      title: "Exterior Building Services",
      image: exteriorImg,
      description: "Waterproofing restoration, power washing, masonry, caulking, crack repair, and leak investigation services.",
      link: "/what-we-do#exterior",
    },
    {
      title: "Parking Lot Asphalt & Concrete",
      image: parkingImg,
      description: "Complete parking lot maintenance, striping, sealcoating, ADA upgrades, and asphalt repair services.",
      link: "/what-we-do#asphalt",
    },
    {
      title: "Painting Services",
      image: paintingImg,
      description: "Interior and exterior commercial painting with expert precision. Professional surface prep and specialty finishes.",
      link: "/what-we-do#painting",
    },
    {
      title: "Snow Removal",
      image: snowImg,
      description: "Prompt snow and ice management with minimal disruptions. Professional winter property maintenance services.",
      link: "/what-we-do#snow",
    },
  ];

  const stats = [
    { icon: Award, label: "25+ Years", sublabel: "In Business" },
    { icon: Clock, label: "24/7", sublabel: "Emergency Response" },
    { icon: Users, label: "100% In-House", sublabel: "Staff" },
    { icon: MapPin, label: "MD/VA/DC", sublabel: "Coverage" },
  ];

  const faqs = [
    {
      question: "What areas do you serve in Maryland, Virginia, and DC?",
      answer: "We serve property managers throughout the MD/VA/DC region, including Baltimore, Bethesda, Rockville, Silver Spring, Gaithersburg, Arlington, Fairfax, and Washington DC. With over 25 years of experience, we understand the unique requirements of each jurisdiction.",
    },
    {
      question: "Do you provide 24/7 emergency services for property managers?",
      answer: "Yes, we provide dedicated 24/7 emergency response for construction and maintenance emergencies. Our in-house team is always ready to handle urgent repairs, ensuring minimal disruption to your tenants.",
    },
    {
      question: "How much of the work is self-performed?",
      answer: "100% of our work is performed by our full-time, in-house staff using our own equipment. This ensures consistent quality, reliability, and direct accountability on every project.",
    },
    {
      question: "What makes Shall's Construction different from other contractors?",
      answer: "We were built specifically to serve property managers' needs. We understand the challenges of managing multiple projects, budgets, and schedules. Our comprehensive services, in-house team, and 25+ years of experience make us your single point of contact for all commercial property needs.",
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
  ];

  const schemas = [
    generateFAQSchema(faqs),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Commercial Construction & Property Maintenance | Shall's Construction"
        description="Professional commercial construction and maintenance services for property managers in MD, VA, and DC. Over 25 years serving Baltimore, Bethesda, Rockville, Silver Spring, and DC Metro. 24/7 emergency response."
        schemas={schemas}
      />
      <Navigation />

      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight" data-testid="text-hero-title">
            We make your life easier while enhancing your tenants' experience.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200" data-testid="text-hero-subtitle">
            For property managers with countless projects, there's one name to remember:
            <span className="block font-heading font-bold mt-2 text-primary">Shall's Construction</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/what-we-do">
              <Button size="lg" className="text-base px-8 py-6" data-testid="button-learn-more">
                Learn More About Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 bg-white/10 backdrop-blur-md border-white text-white hover:bg-white hover:text-gray-900"
                data-testid="button-contact-us"
              >
                Contact Us Today
              </Button>
            </Link>
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

      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4" data-testid="text-services-heading">
              Our Construction Services
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              When it comes to repairing and maintaining your commercial property, we're a property manager's greatest resource.
            </p>
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
                    alt={service.title}
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
                  <Link href={service.link}>
                    <span
                      className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors cursor-pointer"
                      data-testid={`link-service-${index}`}
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

      <section className="py-20 md:py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6" data-testid="text-cta-heading">
            Make Shall's Your Greatest Resource
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Call for consultation, or try us out on your next work order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:3019336277"
              className="text-2xl md:text-3xl font-heading font-bold hover:text-white/90 transition-colors"
              data-testid="link-cta-phone"
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
