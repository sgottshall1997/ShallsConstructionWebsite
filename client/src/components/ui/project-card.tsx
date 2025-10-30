import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  title: string;
  category: string;
  location: string;
  imageUrl?: string;
  description: string;
  featured?: boolean;
}

export default function ProjectCard({
  slug,
  title,
  category,
  location,
  imageUrl,
  description,
  featured = false,
}: ProjectCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow ${
        featured ? "border-2 border-primary" : ""
      }`}
      data-testid={`project-card-${slug}`}
    >
      <div className="relative h-64 bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p className="text-sm font-semibold">[Project Photo]</p>
              <p className="text-xs mt-1">{title}</p>
            </div>
          </div>
        )}
        {featured && (
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
          {category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">{location}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
        <Link href={`/projects/${slug}`}>
          <button
            className="flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
            data-testid={`button-view-project-${slug}`}
          >
            View Project <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}
