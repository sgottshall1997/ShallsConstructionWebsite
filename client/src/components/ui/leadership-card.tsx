interface LeadershipCardProps {
  name: string;
  title: string;
  imagePath?: string;
  bio: string;
  quote?: string;
}

export default function LeadershipCard({
  name,
  title,
  imagePath,
  bio,
  quote,
}: LeadershipCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" data-testid={`leadership-card-${name.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="md:flex">
        <div className="md:w-1/3 bg-gray-200">
          {imagePath ? (
            <img
              src={imagePath}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-64 md:h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p className="text-sm font-semibold">[Photo]</p>
                <p className="text-xs mt-1">{name}</p>
              </div>
            </div>
          )}
        </div>
        <div className="md:w-2/3 p-6">
          <h3 className="text-2xl font-heading font-bold text-gray-900 mb-1">{name}</h3>
          <p className="text-primary font-semibold mb-4">{title}</p>
          {quote && (
            <blockquote className="border-l-4 border-primary pl-4 mb-4 italic text-gray-700">
              "{quote}"
            </blockquote>
          )}
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{bio}</p>
        </div>
      </div>
    </div>
  );
}
