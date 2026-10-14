import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { COMPANY, telHref } from "@shared/company";

interface ServiceCTAProps { serviceSlug?: string; serviceTitle?: string }

export default function ServiceCTA({ serviceSlug }: ServiceCTAProps) {
  const queryParam = serviceSlug ? `?type=${serviceSlug}` : "";
  return (
    <section className="bg-gray-50 rounded-lg p-8 my-12" id="cta-standard">
      <h2 className="text-3xl font-heading font-bold text-center mb-6">Ready to Start Your Project?</h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={`/contact${queryParam}`}>
          <Button size="lg" className="btn-primary" data-testid="button-request-quote">Request a Quote</Button>
        </Link>
        <a href={telHref()} aria-label={`Call ${COMPANY.name} at ${COMPANY.phone}`}>
          <Button size="lg" variant="outline" data-testid="button-call">Call {COMPANY.phone}</Button>
        </a>
      </div>
    </section>
  );
}
