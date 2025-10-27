import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Phone, Printer, Mail, MapPin } from "lucide-react";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ];

  const schemas = [generateBreadcrumbSchema(breadcrumbs)];

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      website: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    submitMutation.mutate(data);
  };

  const serviceAreas = [
    "Baltimore",
    "Bethesda",
    "Bowie",
    "Chevy Chase",
    "Clarksburg",
    "Columbia",
    "Frederick",
    "Gaithersburg",
    "Germantown",
    "Laurel",
    "Rockville",
    "Silver Spring",
    "Arlington",
    "Fairfax",
    "Annapolis",
    "Washington D.C.",
    "DC Metro",
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Contact Us | Get a Quote"
        description="Contact Shall's Construction for commercial construction and maintenance services in MD, VA, and DC. Call (301) 933-6277 or fill out our form. 24/7 emergency response available."
        schemas={schemas}
      />
      <Navigation />

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-page-title">
            Contact Us
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Please fill out the form below with your questions or comments. We appreciate the connection.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h2>

                {isSubmitted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-800 font-medium">
                      Thank you! Your message has been sent successfully.
                    </p>
                  </div>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="John"
                                data-testid="input-first-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Doe"
                                data-testid="input-last-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="john.doe@example.com"
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Comment or Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell us about your project or inquiry..."
                              rows={6}
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://yourwebsite.com"
                              data-testid="input-website"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto px-8"
                      disabled={submitMutation.isPending}
                      data-testid="button-submit"
                    >
                      {submitMutation.isPending ? "Sending..." : "Submit"}
                    </Button>

                    <p className="text-sm text-gray-600 italic">
                      We guarantee 100% privacy.
                    </p>
                  </form>
                </Form>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <a
                        href="tel:3019336277"
                        className="text-primary hover:text-primary/80"
                        data-testid="link-contact-phone"
                      >
                        (301) 933-6277
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Printer className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Fax</p>
                      <p className="text-gray-600" data-testid="text-contact-fax">(301) 933-3386</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a
                        href="mailto:shallsconstructionllc@aol.com"
                        className="text-primary hover:text-primary/80 break-all"
                        data-testid="link-contact-email"
                      >
                        shallsconstructionllc@aol.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">
                  Service Areas
                </h3>
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="text-sm text-gray-600 space-y-1">
                    {serviceAreas.map((area, index) => (
                      <div key={index} data-testid={`text-service-area-${index}`}>{area}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-primary text-white rounded-lg p-6">
                <h3 className="text-xl font-heading font-semibold mb-3">
                  24/7 Emergency Service
                </h3>
                <p className="text-sm text-white/90 mb-4">
                  We provide round-the-clock emergency response for urgent construction and maintenance needs.
                </p>
                <a
                  href="tel:3019336277"
                  className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                  data-testid="button-emergency-call"
                >
                  Call Now: (301) 933-6277
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
