import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import anniversaryBadge from "@assets/generated_images/25_Year_Anniversary_badge_15fdd4ba.png";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/what-we-do", label: "What We Do" },
    { href: "/who-we-serve", label: "Who We Serve" },
    { href: "/articles", label: "Articles" },
    { href: "/contact", label: "Contact Us" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">
                  Shall's Construction
                </h1>
              </div>
              <img
                src={anniversaryBadge}
                alt="25 Years Anniversary"
                className="h-12 w-12 md:h-14 md:w-14"
                data-testid="img-25-anniversary"
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    isActive(link.href)
                      ? "text-primary font-semibold"
                      : "text-gray-700 hover:text-primary"
                  }`}
                  data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <a
              href="tel:3019336277"
              className="flex items-center gap-2 text-primary font-semibold"
              data-testid="link-phone"
            >
              <Phone className="h-4 w-4" />
              <span>(301) 933-6277</span>
            </a>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-900" />
            ) : (
              <Menu className="h-6 w-6 text-gray-900" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200" data-testid="menu-mobile">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`block py-3 text-base font-medium cursor-pointer ${
                    isActive(link.href)
                      ? "text-primary font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <a
              href="tel:3019336277"
              className="flex items-center gap-2 py-3 text-primary font-semibold"
              data-testid="link-mobile-phone"
            >
              <Phone className="h-5 w-5" />
              <span>(301) 933-6277</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
