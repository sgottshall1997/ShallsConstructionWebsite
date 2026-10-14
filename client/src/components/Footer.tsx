import { Link } from "wouter";
import { Mail, Phone, Printer } from "lucide-react";
import shallsLogo from "@assets/shalls-construction-logo.png";
import { COMPANY, currentYear, mailto, telHref, addressLine, hasProjects, hasSafety } from "@shared/company";
import { SERVICE_SLUGS, SERVICE_NAMES } from "@shared/routes";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <div>
            <div className="mb-6">
              <img src={shallsLogo} alt={`${COMPANY.name} logo`} className="h-12" loading="lazy" width="180" height="48" data-testid="img-footer-logo" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">We make your life easier while enhancing your tenants' experience.</p>
            <p className="text-gray-400 text-sm mt-4" data-testid="text-footer-years">{COMPANY.yearsInBusiness}+ years serving property managers</p>
          </div>

          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {SERVICE_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link href={`/services/${slug}`}>
                    <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">{SERVICE_NAMES[slug]}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-lg font-heading font-semibold mt-8 mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                ["/about", "About"],
                ["/who-we-serve", "Who We Serve"],
                ...(hasProjects() ? [["/projects", "Projects"] as const] : []),
                ...(hasSafety() ? [["/safety", "Safety"] as const] : []),
                ["/contact", "Contact"],
                ["/privacy-policy", "Privacy Policy"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer" data-testid={`link-footer-${label.toLowerCase().replace(/\s+/g, "-")}`}>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Contact</h4>
            <address className="space-y-4 text-sm not-italic">
              <div>
                <strong className="text-white block mb-2">{COMPANY.legalName}</strong>
                <div className="text-gray-400">{addressLine()}</div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href={telHref()} className="text-white font-semibold hover:text-primary transition-colors" data-testid="link-footer-phone">{COMPANY.phone}</a>
              </div>
              {COMPANY.fax && (
                <div className="flex items-center gap-3">
                  <Printer className="h-5 w-5 text-primary" />
                  <span className="text-gray-400" data-testid="text-footer-fax">{COMPANY.fax}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href={mailto()} className="text-gray-400 hover:text-white transition-colors break-all" data-testid="link-footer-email">{COMPANY.email}</a>
              </div>
            </address>
          </div>
        </div>

        {COMPANY.associations.length > 0 && (
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <h4 className="text-lg font-heading font-semibold mb-6 text-white">Industry Partnerships</h4>
            <ul className="flex flex-wrap justify-center gap-4">
              {COMPANY.associations.map((a) => (
                <li key={a.name} className="bg-gray-800 rounded-lg px-4 py-3 text-gray-400 text-sm">{a.name}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p data-testid="text-copyright">
            © {currentYear()} {COMPANY.legalName} · {COMPANY.address.city}, {COMPANY.address.state} ·{" "}
            <Link href="/privacy-policy"><span className="hover:text-white cursor-pointer">Privacy Policy</span></Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
