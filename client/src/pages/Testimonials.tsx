import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import TestimonialCard from "@/components/ui/testimonial-card";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Construction", "Painting", "Handyman", "Emergency Service"];

  // Placeholder testimonials - user will replace with actual client quotes
  const testimonials = [
    {
      quote: "[Add client testimonial here - What did you appreciate about working with Shall's Construction?]",
      author: "[Client Name 1]",
      company: "[Property Management Company 1]",
      role: "Property Manager",
      rating: 5,
      service: "Construction",
    },
    {
      quote: "[Add client testimonial here]",
      author: "[Client Name 2]",
      company: "[Property Management Company 2]",
      role: "Facilities Director",
      rating: 5,
      service: "Painting",
    },
    {
      quote: "[Add client testimonial here]",
      author: "[Client Name 3]",
      company: "[Property Management Company 3]",
      role: "Property Manager",
      rating: 5,
      service: "Handyman",
    },
    {
      quote: "[Add client testimonial here]",
      author: "[Client Name 4]",
      company: "[Property Management Company 4]",
      role: "Regional Manager",
      rating: 5,
      service: "Emergency Service",
    },
    {
      quote: "[Add client testimonial here]",
      author: "[Client Name 5]",
      company: "[Property Management Company 5]",
      role: "Property Manager",
      rating: 5,
      service: "Construction",
    },
    {
      quote: "[Add client testimonial here]",
      author: "[Client Name 6]",
      company: "[Property Management Company 6]",
      role: "Portfolio Manager",
      rating: 5,
      service: "Painting",
    },
  ];

  const filteredTestimonials = activeFilter === "All"
    ? testimonials
    : testimonials.filter((t) => t.service === activeFilter);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Testimonials", url: "/testimonials" },
  ];

  const schemas = [generateBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Client Testimonials | What Property Managers Say"
        description="Read what property managers say about Shall's Construction. Trusted by commercial property managers across MD/VA/DC/DE for 30+ years."
        schemas={schemas}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-page-title">
            What Our Clients Say
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Property managers trust Shall's Construction for reliable, high-quality commercial construction services
          </p>
        </div>
      </section>

      {/* Overall Rating */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-heading font-bold text-primary mb-2">5.0</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-5xl font-heading font-bold text-primary mb-2">[ADD]</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-5xl font-heading font-bold text-primary mb-2">30+</div>
              <div className="text-gray-600">Years in Business</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  activeFilter === filter
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                data-testid={`button-filter-${filter.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  company={testimonial.company}
                  role={testimonial.role}
                  rating={testimonial.rating}
                  service={testimonial.service}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No testimonials found for this service.</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Testimonials Section - Placeholder */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              Video Testimonials
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">[Add Video Testimonial 1]</p>
            </div>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">[Add Video Testimonial 2]</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
            Become Our Next Success Story
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Experience the difference that 30+ years of excellence makes
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            data-testid="button-contact-cta"
          >
            Get Started Today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
