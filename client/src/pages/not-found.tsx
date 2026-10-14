import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { COMPANY, telHref } from "@shared/company";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO title="Page not found" description="The page you requested could not be found." noindex />
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4" data-testid="text-page-title">Page not found</h1>
          <p className="text-lg text-gray-600 mb-8">
            The page you requested does not exist or has moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/"><Button>Home</Button></Link>
            <Link href="/#services"><Button variant="outline">Services</Button></Link>
            <Link href="/contact"><Button variant="outline">Contact</Button></Link>
          </div>
          <p className="text-gray-600">
            Or call{" "}
            <a href={telHref()} className="text-primary font-semibold hover:underline">{COMPANY.phone}</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
