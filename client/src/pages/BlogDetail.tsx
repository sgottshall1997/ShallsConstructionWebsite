import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Calendar, User, Tag, ArrowLeft, Phone, Mail, Wrench, Building, MapPin } from "lucide-react";
import { type BlogPost } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { trackBlogView, trackCTAClick, trackPhoneClick } from "@/lib/analytics";

const categoryToServicesMap: Record<string, Array<{ name: string; slug: string; description: string }>> = {
  'safety': [
    { name: 'Safety & Certifications', slug: 'safety', description: 'Learn about our safety standards and certifications' },
    { name: 'All Services', slug: 'what-we-do', description: 'Explore our comprehensive service offerings' },
  ],
  'maintenance': [
    { name: 'Exterior Building Services', slug: 'exterior-building-services', description: 'Professional exterior maintenance and repairs' },
    { name: 'Handyman Services', slug: 'handyman-services', description: 'Quick fixes and routine maintenance' },
  ],
  'industry-news': [
    { name: 'What We Do', slug: 'what-we-do', description: 'Comprehensive commercial property services' },
    { name: 'Who We Serve', slug: 'who-we-serve', description: 'Property management solutions' },
  ],
  'tips': [
    { name: 'All Services', slug: 'what-we-do', description: 'Professional services for commercial properties' },
    { name: 'Service Areas', slug: 'service-areas', description: 'Serving MD, VA, DC, and DE' },
  ],
  'case-study': [
    { name: 'Our Projects', slug: 'projects', description: 'See our completed projects and case studies' },
    { name: 'What We Do', slug: 'what-we-do', description: 'Learn about our services' },
  ],
};

export default function BlogDetail() {
  const { slug } = useParams();
  
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      return response.json();
    },
  });

  const { data: relatedPosts } = useQuery<BlogPost[]>({
    queryKey: post ? ["/api/blog/category", post.category] : [],
    queryFn: async () => {
      if (!post) return [];
      const response = await fetch(`/api/blog/category/${post.category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch related posts');
      }
      return response.json();
    },
    enabled: !!post,
  });

  // Track blog post view - must be before any conditional returns
  useEffect(() => {
    if (post) {
      trackBlogView(post.title, post.category);
    }
  }, [post]);

  // Filter out current post and limit to 3
  const filteredRelatedPosts = relatedPosts
    ?.filter(p => p.slug !== slug)
    .slice(0, 3) || [];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post?.title || "Post", url: `/blog/${slug}` },
  ];

  const schemas = post ? [generateBreadcrumbSchema(breadcrumbs)] : [];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'safety': 'bg-red-100 text-red-800',
      'maintenance': 'bg-blue-100 text-blue-800',
      'industry-news': 'bg-green-100 text-green-800',
      'tips': 'bg-purple-100 text-purple-800',
      'case-study': 'bg-orange-100 text-orange-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <SEO
          title="Blog Post Not Found | Shall's Construction"
          description="The blog post you're looking for could not be found."
        />
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4" data-testid="text-error-title">
              Blog Post Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blog">
              <Button data-testid="button-back-to-blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-12 w-32 mb-8" />
          <Skeleton className="w-full h-96 mb-8 rounded-lg" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${post.title} | Shall's Construction Blog`}
        description={post.excerpt.length > 160 ? post.excerpt.substring(0, 157) + '...' : post.excerpt}
        schemas={schemas}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                  <Link href="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section with Featured Image */}
      <article className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Badge */}
          <Badge 
            className={`mb-6 ${getCategoryColor(post.category)}`}
            data-testid="badge-category"
          >
            <Tag className="h-3 w-3 mr-1" />
            {post.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </Badge>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6 leading-tight" data-testid="text-post-title">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-6 text-gray-600 mb-8 flex-wrap" data-testid="container-metadata">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="font-medium" data-testid="text-post-author">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <time data-testid="text-post-date">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video overflow-hidden rounded-lg mb-12 bg-gray-200">
            <img
              src={post.imageUrl}
              alt={`${post.title} commercial property maintenance blog post featured image`}
              className="w-full h-full object-cover"
              width="1200"
              height="675"
              data-testid="img-featured"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12" data-testid="container-content">
            <div className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
              {post.excerpt}
            </div>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline"
                    data-testid={`badge-tag-${index}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4" data-testid="text-cta-title">
                Have Questions About This Topic?
              </h2>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Our team of experts is here to help. Contact us today to discuss your commercial property needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" onClick={() => trackCTAClick('contact_us', 'blog_detail_cta')}>
                  <Button size="lg" data-testid="button-contact">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Us
                  </Button>
                </Link>
                <Button size="lg" variant="outline" asChild data-testid="button-call">
                  <a href="tel:3019336277" onClick={() => trackPhoneClick('blog_detail_cta')}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call (301) 933-6277
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </article>

      {/* Related Resources */}
      {post && categoryToServicesMap[post.category] && (
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4" data-testid="text-resources-title">
              Related Resources
            </h2>
            <p className="text-gray-600 mb-8">
              Explore our services and projects related to this topic.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryToServicesMap[post.category].map((resource, index) => (
                <Link key={index} href={`/${resource.slug}`}>
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50" data-testid={`card-resource-${index}`}>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {resource.slug.includes('project') ? (
                          <Building className="h-6 w-6 text-primary" />
                        ) : resource.slug.includes('service-areas') ? (
                          <MapPin className="h-6 w-6 text-primary" />
                        ) : (
                          <Wrench className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">
                          {resource.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {resource.description}
                        </p>
                        <span className="text-primary font-semibold text-sm">
                          Learn More →
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {filteredRelatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8" data-testid="text-related-title">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredRelatedPosts.map((relatedPost, index) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <article
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer h-full flex flex-col"
                    data-testid={`card-related-${index}`}
                  >
                    <div className="aspect-video overflow-hidden bg-gray-200">
                      <img
                        src={relatedPost.imageUrl}
                        alt={`${relatedPost.title} commercial property management blog article`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        width="800"
                        height="450"
                        data-testid={`img-related-${index}`}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <Badge 
                        className={`mb-3 self-start ${getCategoryColor(relatedPost.category)}`}
                        data-testid={`badge-related-category-${index}`}
                      >
                        {relatedPost.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                      <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors" data-testid={`text-related-title-${index}`}>
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 flex-grow line-clamp-2" data-testid={`text-related-excerpt-${index}`}>
                        {relatedPost.excerpt}
                      </p>
                      <div className="text-sm text-gray-500">
                        {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
