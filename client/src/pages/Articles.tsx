import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Calendar, User, Tag } from "lucide-react";
import { type BlogPost } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: selectedCategory ? ["/api/blog/category", selectedCategory] : ["/api/blog"],
    queryFn: async () => {
      const url = selectedCategory 
        ? `/api/blog/category/${selectedCategory}` 
        : `/api/blog`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return response.json();
    },
  });

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ];

  const schemas = [generateBreadcrumbSchema(breadcrumbs)];

  // Extract unique categories from blog posts
  const categories = blogPosts 
    ? Array.from(new Set(blogPosts.map(post => post.category)))
    : [];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'safety': 'bg-red-100 text-red-800 hover:bg-red-200',
      'maintenance': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      'industry-news': 'bg-green-100 text-green-800 hover:bg-green-200',
      'tips': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      'case-study': 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Commercial Property Tips | Shall's Construction Blog"
        description="Expert commercial property maintenance tips for MD, VA, DC, and DE. Learn strategies from Shall's Construction professionals to protect your investment."
        schemas={schemas}
      />
      <Navigation />

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-page-title">
            News & Insights from Shall's Construction
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Expert advice, industry updates, and practical tips for property managers and building owners. 
            Stay informed about construction, maintenance, safety, and best practices.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="py-8 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Filter by category:</span>
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                data-testid="button-category-all"
              >
                All Posts
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`button-category-${category}`}
                >
                  {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton className="w-full h-56" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-20 mb-3" />
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogPosts && blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer h-full flex flex-col"
                    data-testid={`card-blog-${index}`}
                  >
                    <div className="aspect-video overflow-hidden bg-gray-200 relative">
                      <img
                        src={post.imageUrl}
                        alt={`${post.title} commercial property maintenance tips blog`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        width="800"
                        height="450"
                        data-testid={`img-blog-${index}`}
                      />
                      <Badge 
                        className={`absolute top-4 left-4 ${getCategoryColor(post.category)}`}
                        data-testid={`badge-category-${index}`}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {post.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 flex-wrap">
                        <div className="flex items-center gap-1" data-testid={`text-blog-author-${index}`}>
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <time data-testid={`text-blog-date-${index}`}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                      </div>
                      <h2 className="text-xl md:text-2xl font-heading font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors" data-testid={`text-blog-title-${index}`}>
                        {post.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed mb-4 flex-grow" data-testid={`text-blog-excerpt-${index}`}>
                        {post.excerpt}
                      </p>
                      <div className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors" data-testid={`link-blog-${index}`}>
                        Read Full Article
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-lg p-12 max-w-2xl mx-auto">
                <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
                  {selectedCategory ? 'No Posts in This Category' : 'No Blog Posts Yet'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedCategory 
                    ? 'Try selecting a different category or view all posts.'
                    : 'Check back soon for expert insights and industry news for property managers.'
                  }
                </p>
                {selectedCategory && (
                  <Button onClick={() => setSelectedCategory(null)} data-testid="button-view-all">
                    View All Posts
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
