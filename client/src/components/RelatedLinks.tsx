import { Link } from "wouter";

interface RelatedLink {
  label: string;
  href: string;
}

interface RelatedLinksProps {
  links: RelatedLink[];
  title?: string;
}

export default function RelatedLinks({ links, title = "Related Services" }: RelatedLinksProps) {
  if (links.length === 0) return null;
  
  return (
    <nav className="mt-12 border-t pt-8" aria-label="Related services">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>
              <span className="text-primary hover:underline cursor-pointer" data-testid={`link-related-${index}`}>
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
