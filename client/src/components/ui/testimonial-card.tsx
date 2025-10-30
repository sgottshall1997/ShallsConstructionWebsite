import { Star, Quote, MapPin } from "lucide-react";
import { Badge } from "./badge";

interface TestimonialCardProps {
  quote: string;
  author: string;
  company: string;
  role?: string;
  rating?: number;
  service?: string;
  location?: string;
  featured?: boolean;
}

export default function TestimonialCard({
  quote,
  author,
  company,
  role,
  rating = 5,
  service,
  location,
  featured = false,
}: TestimonialCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200 hover:shadow-lg transition-shadow relative" 
      data-testid={`testimonial-${author.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <Quote className="h-10 w-10 text-primary/20 absolute top-4 right-4" aria-hidden="true" />
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-1" data-testid={`rating-${author.toLowerCase().replace(/\s+/g, "-")}`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
              aria-label={i < rating ? "filled star" : "empty star"}
            />
          ))}
        </div>
        {featured && (
          <Badge variant="secondary" className="text-xs">Featured</Badge>
        )}
      </div>

      <blockquote className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg" data-testid={`quote-${author.toLowerCase().replace(/\s+/g, "-")}`}>
        "{quote}"
      </blockquote>

      <div className="border-t pt-4 space-y-2">
        <div>
          <p className="font-semibold text-gray-900 text-lg" data-testid={`author-${author.toLowerCase().replace(/\s+/g, "-")}`}>
            {author}
          </p>
          {role && (
            <p className="text-sm text-gray-600" data-testid={`role-${author.toLowerCase().replace(/\s+/g, "-")}`}>
              {role}
            </p>
          )}
          <p className="text-sm text-primary font-medium" data-testid={`company-${author.toLowerCase().replace(/\s+/g, "-")}`}>
            {company}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center pt-2">
          {service && (
            <Badge variant="outline" className="text-xs" data-testid={`service-badge-${author.toLowerCase().replace(/\s+/g, "-")}`}>
              {service}
            </Badge>
          )}
          {location && (
            <div className="flex items-center text-xs text-gray-500" data-testid={`location-${author.toLowerCase().replace(/\s+/g, "-")}`}>
              <MapPin className="h-3 w-3 mr-1" />
              {location}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
