interface Logo {
  name: string;
  imagePath?: string;
  altText: string;
}

interface LogoGridProps {
  logos: Logo[];
  columns?: number;
  title?: string;
  description?: string;
}

export default function LogoGrid({ logos, columns = 4, title, description }: LogoGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  }[columns] || "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4 text-center">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          {description}
        </p>
      )}
      <div className={`grid ${gridCols} gap-8 items-center justify-items-center`}>
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow w-full h-32"
            data-testid={`logo-${index}`}
          >
            {logo.imagePath ? (
              <img
                src={logo.imagePath}
                alt={logo.altText}
                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                loading="lazy"
              />
            ) : (
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">{logo.name}</p>
                <p className="text-xs text-gray-400 mt-1">[Logo Placeholder]</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
