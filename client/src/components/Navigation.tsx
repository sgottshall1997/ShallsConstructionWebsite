import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import shallsLogo from "@assets/shalls-construction-logo.png";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    {
      label: "About",
      dropdown: [
        { href: "/about", label: "About Us" },
        { href: "/safety", label: "Safety & Certifications" },
      ],
    },
    {
      label: "Services",
      dropdown: [
        { href: "/services/construction-remodeling", label: "Construction & Remodeling" },
        { href: "/services/handyman-services", label: "Handyman Services" },
        { href: "/services/exterior-building-services", label: "Exterior Building Services" },
        { href: "/services/parking-lot-services", label: "Parking Lot Services" },
        { href: "/services/painting-services", label: "Painting Services" },
        { href: "/services/snow-removal", label: "Snow Removal" },
      ],
    },
    { href: "/what-we-do", label: "What We Do" },
    { href: "/who-we-serve", label: "Who We Serve" },
    { href: "/projects", label: "Projects" },
    { href: "/service-areas", label: "Service Areas" },
    { href: "/blog", label: "Blog" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact Us" },
  ];

  const isActive = (href: string) => location === href;
  const isAboutActive = () => location === "/about" || location === "/safety";
  const isServicesActive = () => location.startsWith("/services/");

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" data-testid="link-logo">
            <div className="flex items-center cursor-pointer">
              <img
                src={shallsLogo}
                alt="Shall's Construction commercial property services logo"
                className="h-12 md:h-16"
                data-testid="img-shalls-logo"
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, index) => {
              if ('dropdown' in link) {
                const isAboutMenu = link.label === "About";
                const isServicesMenu = link.label === "Services";
                const dropdownOpen = isAboutMenu ? aboutDropdownOpen : servicesDropdownOpen;
                const setDropdownOpen = isAboutMenu ? setAboutDropdownOpen : setServicesDropdownOpen;
                const isMenuActive = isAboutMenu ? isAboutActive() : isServicesActive();
                
                return (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                        isMenuActive
                          ? "text-primary font-semibold"
                          : "text-gray-700 hover:text-primary"
                      }`}
                      data-testid={`button-${link.label.toLowerCase()}-dropdown`}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 py-2 w-56 z-50">
                        {link.dropdown?.map((item) => (
                          <Link key={item.href} href={item.href}>
                            <span
                              className={`block px-4 py-2 text-sm cursor-pointer ${
                                isActive(item.href)
                                  ? "text-primary font-semibold bg-gray-50"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                              }`}
                              data-testid={`link-dropdown-${item.label.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                            >
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
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
              );
            })}
            <a
              href="tel:3019336277"
              className="flex items-center gap-2 text-primary font-semibold"
              data-testid="link-phone"
              aria-label="Call Shall's Construction at (301) 933-6277"
            >
              <Phone className="h-4 w-4" />
              <span>(301) 933-6277</span>
            </a>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
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
            {navLinks.map((link, index) => {
              if ('dropdown' in link) {
                return (
                  <div key={index}>
                    <div className="font-semibold text-gray-900 py-2 text-sm">
                      {link.label}
                    </div>
                    <div className="pl-4 space-y-2">
                      {link.dropdown?.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <span
                            className={`block py-2 text-base font-medium cursor-pointer ${
                              isActive(item.href)
                                ? "text-primary font-semibold"
                                : "text-gray-700"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                          >
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
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
              );
            })}
            <a
              href="tel:3019336277"
              className="flex items-center gap-2 py-3 text-primary font-semibold"
              data-testid="link-mobile-phone"
              aria-label="Call Shall's Construction at (301) 933-6277"
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
