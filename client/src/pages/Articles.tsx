import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Calendar, ArrowRight } from "lucide-react";
import { type Article } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Articles() {
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Articles", url: "/articles" },
  ];

  const schemas = [generateBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Property Management Articles & Tips"
        description="Helpful articles for property managers covering maintenance, regulations, tips, and trends. Stay informed about best practices for managing your commercial properties."
        schemas={schemas}
      />
      <Navigation />

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-page-title">
            Articles Helpful to Property Managers
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Stay in the know concerning new rules, regulations, tips and trends regarding your properties and tenants.
            We've put together articles that we think offer the most value.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton className="w-full h-56" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.map((article, index) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  data-testid={`card-article-${index}`}
                >
                  <div className="aspect-video overflow-hidden bg-gray-200">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width="800"
                      height="450"
                      data-testid={`img-article-${index}`}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4" />
                      <time data-testid={`text-article-date-${index}`}>
                        {new Date(article.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <h2 className="text-xl md:text-2xl font-heading font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors" data-testid={`text-article-title-${index}`}>
                      {article.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4" data-testid={`text-article-excerpt-${index}`}>
                      {article.excerpt}
                    </p>
                    <div className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors cursor-pointer" data-testid={`link-article-${index}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-lg p-12 max-w-2xl mx-auto">
                <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
                  No Articles Yet
                </h3>
                <p className="text-gray-600">
                  Check back soon for helpful tips and insights for property managers.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
