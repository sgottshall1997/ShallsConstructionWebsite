import { useRoute } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ArrowLeft, Calendar, MapPin, Briefcase } from "lucide-react";
import { Link } from "wouter";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const projectId = params?.id;

  // In a real app, you would fetch project data based on projectId
  // For now, this is a placeholder template
  const project = {
    id: projectId,
    title: "[Project Name]",
    category: "[Category]",
    location: "[City, State]",
    completionDate: "[Month Year]",
    client: "[Client Name - Optional]",
    description: "[Add detailed project description here - What was the scope? What were the challenges? What solutions did you provide?]",
    services: ["[Service 1]", "[Service 2]", "[Service 3]"],
    testimonial: {
      quote: "[Add client testimonial about this specific project]",
      author: "[Client Name]",
      role: "[Client Role/Title]",
      company: "[Client Company]",
    },
    stats: [
      { label: "Project Duration", value: "[X months]" },
      { label: "Square Footage", value: "[X,XXX sq ft]" },
      { label: "Budget", value: "[Budget range or 'On Budget']" },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${project.title} | Project Portfolio`}
        description={`${project.title} - ${project.description.substring(0, 150)}...`}
      />
      <Navigation />

      {/* Hero Image */}
      <section className="relative h-96 bg-gray-200">
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          [Add main project photo - wide format, professional quality]
        </div>
      </section>

      {/* Breadcrumb & Back Button */}
      <section className="bg-gray-50 py-4 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects">
            <button className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all" data-testid="button-back-to-projects">
              <ArrowLeft className="h-4 w-4" /> Back to Projects
            </button>
          </Link>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4">
                {project.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-project-title">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Completed: {project.completionDate}</span>
                </div>
                {project.client && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <span>{project.client}</span>
                  </div>
                )}
              </div>

              <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Project Overview</h2>
                <p className="leading-relaxed">{project.description}</p>
                
                <h3 className="text-xl font-heading font-bold text-gray-900 mt-8 mb-4">Services Provided</h3>
                <ul className="list-disc list-inside space-y-2">
                  {project.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>

              {/* Before/After Photos */}
              <div className="mb-12">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Project Photos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">[Before Photo 1]</p>
                  </div>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">[After Photo 1]</p>
                  </div>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">[Before Photo 2]</p>
                  </div>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">[After Photo 2]</p>
                  </div>
                </div>
              </div>

              {/* Client Testimonial */}
              <div className="bg-gray-50 border-l-4 border-primary p-6 rounded">
                <blockquote className="text-lg text-gray-700 italic mb-4">
                  "{project.testimonial.quote}"
                </blockquote>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{project.testimonial.author}</p>
                  <p className="text-gray-600">{project.testimonial.role}</p>
                  <p className="text-primary font-medium">{project.testimonial.company}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Project Stats</h3>
                <div className="space-y-6">
                  {project.stats.map((stat, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Interested in a similar project?</h4>
                  <Link href="/contact">
                    <button className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors" data-testid="button-request-quote">
                      Request a Quote
                    </button>
                  </Link>
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
