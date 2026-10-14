import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { COMPANY, mailto } from "@shared/company";
import { generateBreadcrumbSchema } from "@/lib/schema";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Privacy Policy"
        description={`How ${COMPANY.legalName} collects and uses information submitted through this website.`}
        canonical="/privacy"
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Privacy Policy", url: "/privacy" },
          ]),
        ]}
      />
      <Navigation />
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            {COMPANY.legalName} ("we", "us") operates {COMPANY.url}. This page explains what happens to information you send us through the contact form or by email.
          </p>
          <h2 className="text-2xl font-heading font-semibold text-gray-900 mt-8 mb-3">What we collect</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            When you submit the contact form we collect the name, email, phone number, company, and message you provide, plus basic technical data such as your IP address and the time of submission (used to prevent spam).
          </p>
          <h2 className="text-2xl font-heading font-semibold text-gray-900 mt-8 mb-3">How we use it</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We use that information only to respond to your inquiry and to keep a record of the request. We do not sell it or share it with third parties for marketing.
          </p>
          <h2 className="text-2xl font-heading font-semibold text-gray-900 mt-8 mb-3">Email delivery</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Form submissions are delivered to us by email through our email provider. Message content is processed by that provider solely to deliver the email.
          </p>
          <h2 className="text-2xl font-heading font-semibold text-gray-900 mt-8 mb-3">Contact</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Questions about this policy:{" "}
            <a href={mailto()} className="text-primary hover:underline">
              {COMPANY.email}
            </a>
            .
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
