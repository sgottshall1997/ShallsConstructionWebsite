import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { COMPANY, mailto, telHref } from "@shared/company";

interface ServiceCTAProps {
  serviceSlug?: string;
  serviceTitle?: string;
}

export default function ServiceCTA({ serviceSlug }: ServiceCTAProps) {
  const queryParam = serviceSlug ? `?type=${serviceSlug}` : "";

  return (
    <section className="bg-gray-50 rounded-lg p-8 my-12" id="cta-standard">
      <h2 className="text-3xl font-heading font-bold text-center mb-6">Ready to Start Your Project?</h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <Link href={`/contact${queryParam}`}>
          <Button size="lg" className="btn-primary" data-testid="button-request-quote">
            Request a Quote
          </Button>
        </Link>
        <a href={telHref()} aria-label={`Call for emergency 24/7 commercial service at ${COMPANY.phone.display}`}>
          <Button size="lg" variant="outline" data-testid="button-emergency-help">
            Emergency Help 24/7
          </Button>
        </a>
      </div>
      <p className="text-center text-gray-600">
        <a href={telHref()} className="hover:text-primary" data-testid="link-phone-cta">
          {COMPANY.phone.display}
        </a>
        {" · "}
        <a href={mailto()} className="hover:text-primary" data-testid="link-email-cta">
          {COMPANY.email}
        </a>
      </p>
    </section>
  );
}
