import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import TestimonialCard from "@/components/ui/testimonial-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { generateBreadcrumbSchema, generateReviewSchema, generateAggregateRatingSchema } from "@/lib/schema";
import { Quote, ExternalLink } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Construction", "Painting", "Handyman", "Emergency Service"];

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const filteredTestimonials = activeFilter === "All"
    ? testimonials
    : testimonials.filter((t) => t.serviceType === activeFilter);

  const averageRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : "5.0";

  const happyClients = testimonials.length;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Testimonials", url: "/testimonials" },
  ];

  const reviewSchemas = testimonials.slice(0, 10).map(testimonial => 
    generateReviewSchema(testimonial)
  );

  const schemas = [
    generateAggregateRatingSchema({
      ratingValue: parseFloat(averageRating),
      reviewCount: happyClients,
    }),
    ...reviewSchemas,
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Client Testimonials MD VA DC | Shall's Construction"
        description="Read what property managers say about Shall's Construction. Trusted across MD, VA, DC, and DE for 30+ years. See our 5-star reviews and success stories."
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
              <div className="text-5xl font-heading font-bold text-primary mb-2" data-testid="stat-average-rating">
                {isLoading ? <Skeleton className="h-12 w-20 mx-auto" /> : averageRating}
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-5xl font-heading font-bold text-primary mb-2" data-testid="stat-happy-clients">
                {isLoading ? <Skeleton className="h-12 w-20 mx-auto" /> : happyClients}
              </div>
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
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-testid="testimonials-loading">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
                  <Skeleton className="h-5 w-32 mb-4" />
                  <Skeleton className="h-20 w-full mb-6" />
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          ) : filteredTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-testid="testimonials-grid">
              {filteredTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  quote={testimonial.comment}
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
            <div className="text-center py-12" data-testid="no-testimonials">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="px-8"
              data-testid="button-contact-cta"
            >
              <a href="/contact">
                Get Started Today
              </a>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="px-8"
              data-testid="button-leave-review"
            >
              <a 
                href="https://www.google.com/search?q=shall%27s+construction+reviews" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Leave a Review
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
