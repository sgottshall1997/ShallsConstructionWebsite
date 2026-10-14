import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { COMPANY, currentYear, mailto } from "@shared/company";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Privacy Policy"
        description={`Privacy policy for ${COMPANY.legalName}.`}
        canonical="/privacy-policy"
        noindex
      />
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-8" data-testid="text-page-title">Privacy Policy</h1>
        <div className="prose prose-lg text-gray-600 space-y-6">
          <p>Last updated: {currentYear()}.</p>
          <p>
            {COMPANY.legalName} ("we", "us") operates {COMPANY.url}. This page describes how we handle information submitted through our website contact form.
          </p>
          <h2 className="text-2xl font-heading font-semibold text-gray-900">Information we collect</h2>
          <p>
            When you submit the contact form, we collect the name, email, phone number, company name, inquiry type, and message you provide. We also receive your IP address for abuse prevention.
          </p>
          <h2 className="text-2xl font-heading font-semibold text-gray-900">How we use it</h2>
          <p>
            We use form submissions only to respond to your inquiry and to operate our business. We do not sell personal information.
          </p>
          <h2 className="text-2xl font-heading font-semibold text-gray-900">Contact</h2>
          <p>
            Questions about this policy: <a href={mailto()} className="text-primary hover:underline">{COMPANY.email}</a> or {COMPANY.phone}.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
