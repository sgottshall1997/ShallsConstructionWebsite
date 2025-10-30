import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface ServiceCTAProps {
  serviceSlug?: string;
  serviceTitle?: string;
}

export default function ServiceCTA({ serviceSlug, serviceTitle }: ServiceCTAProps) {
  const queryParam = serviceSlug ? `?type=${serviceSlug}` : "";
  
  return (
    <section className="bg-gray-50 rounded-lg p-8 my-12" id="cta-standard">
      <h2 className="text-3xl font-heading font-bold text-center mb-6">
        Ready to Start Your Project?
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <Link href={`/contact${queryParam}`}>
          <Button size="lg" className="btn-primary" data-testid="button-request-quote">
            Request a Quote
          </Button>
        </Link>
        <a href="tel:+13019336277" aria-label="Call for emergency 24/7 commercial service">
          <Button size="lg" variant="outline" data-testid="button-emergency-help">
            Emergency Help 24/7
          </Button>
        </a>
      </div>
      <p className="text-center text-gray-600">
        <a href="tel:+13019336277" className="hover:text-primary" data-testid="link-phone-cta">
          (301) 933-6277
        </a>
        {" · "}
        <a 
          href="mailto:shallsconstructionllc@aol.com" 
          className="hover:text-primary"
          data-testid="link-email-cta"
        >
          shallsconstructionllc@aol.com
        </a>
      </p>
    </section>
  );
}
