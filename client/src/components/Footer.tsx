import { Link } from "wouter";
import { Mail, Phone, Printer } from "lucide-react";
import shallsLogo from "@assets/shalls-construction-logo.png";

export default function Footer() {
  const serviceAreasWithLinks = [
    { name: "Maryland", url: null },
    { name: "DC", url: "/service-areas/dc-metro" },
    { name: "Virginia", url: null },
    { name: "Delaware", url: null },
  ];

  const recentPosts = [
    {
      title: "Your Property Maintenance Checklist for the Winter",
      slug: "winter-maintenance-checklist",
    },
    {
      title: "Landlords and Tenants: Tips on Avoiding Disputes",
      slug: "avoiding-disputes",
    },
    {
      title: "The Good, The Bad, and The Ugly: Making the Most Out of Customer Feedback",
      slug: "customer-feedback",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div>
            <div className="mb-6">
              <img
                src={shallsLogo}
                alt="Shall's Construction commercial property services logo"
                className="h-12"
                loading="lazy"
                data-testid="img-footer-logo"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              We make your life easier while enhancing your tenants' experience.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Celebrating 30+ Years in Business
            </p>
          </div>

          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer" data-testid="link-footer-about">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/what-we-do">
                  <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer" data-testid="link-footer-what-we-do">
                    What We Do
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer" data-testid="link-footer-projects">
                    Projects
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/safety">
                  <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer" data-testid="link-footer-safety">
                    Safety & Certifications
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/testimonials">
                  <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer" data-testid="link-footer-testimonials">
                    Testimonials
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/who-we-serve">
                  <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer" data-testid="link-footer-who-we-serve">
                    Who We Serve
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/service-areas">
                  <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer" data-testid="link-footer-service-areas">
                    Service Areas
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/articles">
                  <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer" data-testid="link-footer-articles">
                    Articles
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer" data-testid="link-footer-contact">
                    Contact Us
                  </span>
                </Link>
              </li>
            </ul>

            <h4 className="text-lg font-heading font-semibold mt-8 mb-4">Licensed In</h4>
            <div className="text-gray-400 text-sm space-y-1">
              {serviceAreasWithLinks.map((area) =>
                area.url ? (
                  <Link key={area.name} href={area.url}>
                    <span className="hover:text-white transition-colors cursor-pointer" data-testid={`link-service-area-${area.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      {area.name}
                    </span>
                  </Link>
                ) : (
                  <div key={area.name} data-testid={`text-service-area-${area.name.toLowerCase().replace(/\s+/g, "-")}`}>
                    {area.name}
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Contact Info</h4>
            <address className="space-y-4 text-sm not-italic">
              <div>
                <strong className="text-white block mb-2">Shall's Construction LLC</strong>
                <div className="text-gray-400">
                  Kensington, Maryland
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">24/7 Emergency Hotline</p>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-red-500" />
                  <a href="tel:+13019336277" className="text-white font-semibold text-lg hover:text-primary transition-colors" data-testid="link-footer-phone">
                    (301) 933-6277
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Printer className="h-5 w-5 text-primary" />
                <span className="text-gray-400" data-testid="text-footer-fax">(301) 933-3386</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href="mailto:shallsconstruction@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors break-all"
                  data-testid="link-footer-email"
                >
                  shallsconstruction@gmail.com
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center mb-8">
            <h4 className="text-lg font-heading font-semibold mb-6 text-white">Industry Partnerships</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                "[AGC]",
                "[BOMA]",
                "[Chamber]",
                "[ABC]",
              ].map((org, i) => (
                <div key={i} className="bg-gray-800 rounded-lg h-20 flex items-center justify-center border border-gray-700">
                  <p className="text-gray-500 text-sm">{org} Logo</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-gray-400 text-sm">
            <p data-testid="text-copyright">
              Copyright © 2025 Shall's Construction LLC · Privacy Policy
            </p>
          </div>
        </div>
      </div>

      {/* Global Organization Schema */}
      <script type="application/ld+json" id="org-schema" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Shall's Construction LLC",
          "url": "https://shallsconstruction.replit.app",
          "logo": "https://shallsconstruction.replit.app/shalls-construction-logo-DYaZi169.png",
          "sameAs": [
            "https://www.linkedin.com/company/shallsconstruction",
            "https://www.boma.org",
            "https://www.agc.org"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-301-933-6277",
            "contactType": "customer service",
            "areaServed": ["MD","VA","DC","DE"],
            "availableLanguage": "English"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kensington",
            "addressRegion": "MD",
            "addressCountry": "US"
          }
        })
      }} />

      {/* Local Service Areas for SEO (hidden from users) */}
      <ul hidden>
        <li>Commercial Contractor Bethesda MD</li>
        <li>Commercial Contractor Rockville MD</li>
        <li>Commercial Contractor Silver Spring MD</li>
        <li>Commercial Property Maintenance DC</li>
        <li>Commercial Construction Northern Virginia</li>
      </ul>
    </footer>
  );
}
