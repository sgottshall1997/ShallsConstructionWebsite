import { Link, useRoute } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ServiceCTA from "@/components/ServiceCTA";
import NotFound from "@/pages/not-found";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { MapPin } from "lucide-react";
import { COMPANY } from "@shared/company";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const project = COMPANY.projects.find((p) => p.slug === params?.slug);
  if (!project) return <NotFound />;

  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
      { name: project.name, url: `/projects/${project.slug}` },
    ]),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${project.name} — ${project.city}`}
        description={project.scope.slice(0, 155)}
        canonical={`/projects/${project.slug}`}
        ogImage={project.photo.startsWith("http") ? project.photo : undefined}
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
                <BreadcrumbLink asChild>
                  <Link href="/projects">Projects</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{project.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4" data-testid="text-page-title">
            {project.name}
          </h1>
          <p className="flex items-center gap-2 text-gray-600 mb-8">
            <MapPin className="h-5 w-5 text-primary" /> {project.city}
          </p>
          <img
            src={project.photo}
            alt={`${project.name} in ${project.city}`}
            className="w-full rounded-lg mb-8"
            loading="lazy"
            width="1200"
            height="675"
          />
          <p className="text-lg text-gray-700 leading-relaxed">{project.scope}</p>
          <ServiceCTA />
        </div>
      </section>
      <Footer />
    </div>
  );
}
