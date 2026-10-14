import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ProjectCard from "@/components/ui/project-card";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { COMPANY, stateNamesList } from "@shared/company";

export default function Projects() {
  const projects = COMPANY.projects;

  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
    ]),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Projects"
        description={`Commercial construction projects by ${COMPANY.shortName} across ${stateNamesList()}.`}
        canonical="/projects"
        schemas={schemas}
      />
      <Navigation />

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
                <BreadcrumbPage>Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-page-title">
            Our Projects
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {projects.length > 0
              ? `Selected commercial work across ${stateNamesList()}.`
              : `Project case studies will appear here once the owners add them. In the meantime, ask us about work near your properties in ${stateNamesList()}.`}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  slug={project.slug}
                  title={project.name}
                  category={project.category || "Commercial"}
                  location={project.city}
                  imageUrl={project.photo}
                  description={project.scope}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12" data-testid="no-projects-message">
              <p className="text-gray-500 text-lg mb-6">No public project case studies yet.</p>
              <Link href="/contact">
                <span className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors cursor-pointer" data-testid="button-contact-cta">
                  Request a Quote
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
