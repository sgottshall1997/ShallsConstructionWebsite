import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ProjectCard from "@/components/ui/project-card";
import { generateBreadcrumbSchema } from "@/lib/schema";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Office Buildings", "Retail Centers", "Apartment Complexes", "Medical Facilities", "Government"];

  // Placeholder projects - user will replace with actual project data
  const projects = [
    {
      id: "project-1",
      title: "[Project Name 1]",
      category: "Office Buildings",
      location: "[City, State]",
      imagePath: "",
      description: "[Add project description - scope of work, challenges overcome, client needs addressed]",
      featured: true,
    },
    {
      id: "project-2",
      title: "[Project Name 2]",
      category: "Retail Centers",
      location: "[City, State]",
      imagePath: "",
      description: "[Add project description]",
      featured: false,
    },
    {
      id: "project-3",
      title: "[Project Name 3]",
      category: "Apartment Complexes",
      location: "[City, State]",
      imagePath: "",
      description: "[Add project description]",
      featured: false,
    },
    {
      id: "project-4",
      title: "[Project Name 4]",
      category: "Medical Facilities",
      location: "[City, State]",
      imagePath: "",
      description: "[Add project description]",
      featured: false,
    },
    {
      id: "project-5",
      title: "[Project Name 5]",
      category: "Office Buildings",
      location: "[City, State]",
      imagePath: "",
      description: "[Add project description]",
      featured: false,
    },
    {
      id: "project-6",
      title: "[Project Name 6]",
      category: "Government",
      location: "[City, State]",
      imagePath: "",
      description: "[Add project description]",
      featured: false,
    },
  ];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
  ];

  const schemas = [generateBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Our Projects | Commercial Construction Portfolio"
        description="Explore Shall's Construction portfolio of completed commercial projects across MD/VA/DC/DE. Office buildings, retail centers, medical facilities, and more."
        schemas={schemas}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-page-title">
            Our Projects
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Explore our portfolio of successfully completed commercial construction projects across Maryland, Virginia, DC, and Delaware.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  location={project.location}
                  imagePath={project.imagePath}
                  description={project.description}
                  featured={project.featured}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let's discuss how we can bring your commercial construction vision to life.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            data-testid="button-contact-cta"
          >
            Request a Quote
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
