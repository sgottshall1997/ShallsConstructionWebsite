import { Link } from "wouter";
import { Mail, Phone, Printer } from "lucide-react";
import shallsLogo from "@assets/shalls-construction-logo.png";
import {
  COMPANY,
  currentYear,
  mailto,
  telHref,
  yearsPhrase,
} from "@shared/company";

export default function Footer() {
  const years = yearsPhrase();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div>
            <div className="mb-6">
              <img
                src={shallsLogo}
                alt={`${COMPANY.shortName} logo`}
                className="h-12"
                loading="lazy"
                width="180"
                height="48"
                data-testid="img-footer-logo"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              We make your life easier while enhancing your tenants' experience.
            </p>
            {years && (
              <p className="text-gray-400 text-sm mt-4" data-testid="text-footer-years">
                {years} serving property managers
              </p>
            )}
          </div>

          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {[
                ["/about", "About Us", "about"],
                ["/projects", "Projects", "projects"],
                ["/safety", "Safety & Certifications", "safety"],
                ["/who-we-serve", "Who We Serve", "who-we-serve"],
                ["/contact", "Contact Us", "contact"],
                ["/privacy", "Privacy Policy", "privacy"],
              ].map(([href, label, id]) => (
                <li key={href}>
                  <Link href={href}>
                    <span
                      className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                      data-testid={`link-footer-${id}`}
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                ["/services/construction-remodeling", "Construction & Remodeling"],
                ["/services/handyman-services", "Handyman Services"],
                ["/services/exterior-building-services", "Exterior Building Services"],
                ["/services/parking-lot-services", "Parking Lot Services"],
                ["/services/painting-services", "Painting Services"],
                ["/services/snow-removal", "Snow Removal"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-heading font-semibold mt-8 mb-4">Serving</h4>
            <div className="text-gray-400 text-sm space-y-1">
              {COMPANY.serviceStates.map((s) => (
                <div key={s.code} data-testid={`text-service-area-${s.code.toLowerCase()}`}>
                  {s.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Contact Info</h4>
            <address className="space-y-4 text-sm not-italic">
              <div>
                <strong className="text-white block mb-2">{COMPANY.legalName}</strong>
                <div className="text-gray-400">
                  {COMPANY.address.street ? `${COMPANY.address.street}, ` : ""}
                  {COMPANY.address.locality}, {COMPANY.address.region}
                  {COMPANY.address.postalCode ? ` ${COMPANY.address.postalCode}` : ""}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">24/7 Emergency Hotline</p>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-red-500" />
                  <a
                    href={telHref()}
                    className="text-white font-semibold text-lg hover:text-primary transition-colors"
                    data-testid="link-footer-phone"
                  >
                    {COMPANY.phone.display}
                  </a>
                </div>
              </div>
              {COMPANY.fax && (
                <div className="flex items-center gap-3">
                  <Printer className="h-5 w-5 text-primary" />
                  <span className="text-gray-400" data-testid="text-footer-fax">
                    {COMPANY.fax}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href={mailto()}
                  className="text-gray-400 hover:text-white transition-colors break-all"
                  data-testid="link-footer-email"
                >
                  {COMPANY.email}
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center text-gray-400 text-sm">
            <p data-testid="text-copyright">
              © {currentYear()} {COMPANY.legalName} · {COMPANY.address.locality}, {COMPANY.address.region} ·{" "}
              <Link href="/privacy">
                <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
