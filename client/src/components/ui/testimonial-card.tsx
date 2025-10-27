import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  company: string;
  role?: string;
  rating?: number;
  service?: string;
}

export default function TestimonialCard({
  quote,
  author,
  company,
  role,
  rating = 5,
  service,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200" data-testid={`testimonial-${author.toLowerCase().replace(/\s+/g, "-")}`}>
      {rating && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      )}
      <blockquote className="text-gray-700 leading-relaxed mb-4 italic">
        "{quote}"
      </blockquote>
      <div className="border-t pt-4">
        <p className="font-semibold text-gray-900">{author}</p>
        {role && <p className="text-sm text-gray-600">{role}</p>}
        <p className="text-sm text-primary font-medium">{company}</p>
        {service && (
          <p className="text-xs text-gray-500 mt-2">Service: {service}</p>
        )}
      </div>
    </div>
  );
}
