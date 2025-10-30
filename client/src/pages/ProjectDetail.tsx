import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowLeft, Calendar, MapPin, Briefcase, CheckCircle, X } from "lucide-react";
import { generateBreadcrumbSchema, generateProjectSchema } from "@/lib/schema";
import type { Project } from "@shared/schema";
import { trackProjectView, trackCTAClick } from "@/lib/analytics";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const slug = params?.slug;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["/api/projects", slug],
    enabled: !!slug,
  });

  // Track project page view - must be before any conditional returns
  useEffect(() => {
    if (project) {
      trackProjectView(project.title, project.category);
    }
  }, [project]);

  const categoryToServiceMap: Record<string, string> = {
    "Office Buildings": "construction-remodeling",
    "Retail Centers": "construction-remodeling",
    "Apartment Complexes": "construction-remodeling",
    "Medical Facilities": "construction-remodeling",
    "Government": "construction-remodeling",
    "Parking Lot": "parking-lot-services",
    "Exterior": "exterior-building-services",
  };

  const locationToSlugMap: Record<string, string> = {
    "Bethesda": "bethesda-md",
    "Rockville": "rockville-md",
    "Silver Spring": "silver-spring-md",
    "Baltimore": "baltimore-md",
    "Gaithersburg": "gaithersburg-md",
    "Washington DC": "dc-metro",
  };

  const getLocationSlug = (location: string) => {
    for (const [city, slug] of Object.entries(locationToSlugMap)) {
      if (location.includes(city)) {
        return slug;
      }
    }
    return null;
  };

  const getLocationName = (location: string) => {
    for (const city of Object.keys(locationToSlugMap)) {
      if (location.includes(city)) {
        return city;
      }
    }
    return location;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <Skeleton className="h-96 w-full rounded-none" />
        
        <section className="bg-gray-50 py-4 border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-6 w-40" />
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6">Project Not Found</h2>
            <p className="text-lg text-gray-600 mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/projects">
              <button className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors" data-testid="button-back-to-projects-404">
                View All Projects
              </button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const completionDate = new Date(project.completionDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const relatedServiceSlug = categoryToServiceMap[project.category] || "construction-remodeling";
  const locationSlug = getLocationSlug(project.location);
  const locationName = getLocationName(project.location);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: project.title, url: `/projects/${project.slug}` },
  ];

  const schemas = [
    generateProjectSchema(project),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  const metaDescription = `${project.category} project in ${project.location}. ${project.description.substring(0, 110 - project.category.length - project.location.length)}`;

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${project.title} - ${project.category} | Shall's`}
        description={metaDescription.length > 160 ? metaDescription.substring(0, 157) + '...' : metaDescription}
        schemas={schemas}
      />
      <Navigation />

      {/* Hero Image */}
      <section className="relative h-96 bg-gray-200">
        {project.imageUrls[0] ? (
          <img
            src={project.imageUrls[0]}
            alt={`${project.title} ${project.category} commercial construction project ${project.location}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <p className="text-lg">No image available</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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
                  <Link href="/projects">Projects</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{project.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4" data-testid="text-project-category">
                {project.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-project-title">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-gray-600 mb-8">
                <div className="flex items-center gap-2" data-testid="text-project-location">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2" data-testid="text-project-completion-date">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Completed: {completionDate}</span>
                </div>
                <div className="flex items-center gap-2" data-testid="text-project-client">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span>{project.client}</span>
                </div>
              </div>

              {/* Project Description */}
              <div className="mb-12">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">About This Project</h2>
                <p className="text-gray-600 leading-relaxed mb-6" data-testid="text-project-description">
                  {project.description}
                </p>
                
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Project Scope</h3>
                <p className="text-gray-600 leading-relaxed" data-testid="text-project-scope">
                  {project.scope}
                </p>
              </div>

              {/* Results Section */}
              {project.results && project.results.length > 0 && (
                <div className="mb-12 bg-gray-50 rounded-lg p-6">
                  <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Key Results & Achievements</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.results.map((result, index) => (
                      <div key={index} className="flex items-start gap-3" data-testid={`result-item-${index}`}>
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Gallery */}
              {project.imageUrls && project.imageUrls.length > 1 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.imageUrls.map((imageUrl, index) => (
                      <Dialog key={index}>
                        <DialogTrigger asChild>
                          <button
                            className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
                            data-testid={`gallery-image-${index}`}
                            onClick={() => setSelectedImage(imageUrl)}
                          >
                            <img
                              src={imageUrl}
                              alt={`${project.title} ${project.category} project ${project.location} view ${index + 1}`}
                              className="w-full h-full object-cover transition-transform group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0">
                          <div className="relative">
                            <img
                              src={imageUrl}
                              alt={`${project.title} ${project.category} project ${project.location} view ${index + 1}`}
                              className="w-full h-auto"
                              loading="lazy"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Services */}
              <div className="mb-12 bg-primary/5 rounded-lg p-6">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Related Services</h2>
                <p className="text-gray-600 mb-4">
                  This project showcases our expertise in {project.category.toLowerCase()}. Learn more about our related services:
                </p>
                <Link href={`/services/${relatedServiceSlug}`}>
                  <button className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors" data-testid="button-view-related-service">
                    View {project.category} Services
                  </button>
                </Link>
              </div>

              {/* Related Location */}
              {locationSlug && (
                <div className="mb-12 border-l-4 border-primary pl-6">
                  <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Service Area</h2>
                  <p className="text-gray-600 mb-4">
                    This project was completed in {locationName}. We provide comprehensive construction and maintenance services throughout this area.
                  </p>
                  <Link href={`/service-areas/${locationSlug}`}>
                    <button className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all" data-testid="button-view-location">
                      Learn About Our Services in {locationName} <ArrowLeft className="h-4 w-4 rotate-180" />
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Project Information</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <p className="text-sm text-gray-600 mb-1">Category</p>
                    <p className="text-base font-semibold text-gray-900" data-testid="sidebar-category">{project.category}</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <p className="text-sm text-gray-600 mb-1">Location</p>
                    <p className="text-base font-semibold text-gray-900" data-testid="sidebar-location">{project.location}</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <p className="text-sm text-gray-600 mb-1">Client</p>
                    <p className="text-base font-semibold text-gray-900" data-testid="sidebar-client">{project.client}</p>
                  </div>
                  <div className="pb-4">
                    <p className="text-sm text-gray-600 mb-1">Completion Date</p>
                    <p className="text-base font-semibold text-gray-900" data-testid="sidebar-completion-date">{completionDate}</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Start Your Project</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Interested in a similar project? Get in touch with our team today.
                  </p>
                  <Link href="/contact" onClick={() => trackCTAClick('request_quote', 'project_detail_sidebar')}>
                    <button className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors" data-testid="button-start-your-project">
                      Request a Quote
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let's discuss how we can bring your vision to life with the same level of excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" onClick={() => trackCTAClick('get_started', 'project_detail_bottom_cta')}>
              <button className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors" data-testid="button-contact-cta">
                Get Started
              </button>
            </Link>
            <Link href="/projects">
              <button className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition-colors" data-testid="button-view-all-projects">
                View All Projects
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
