import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Phone, Printer, Mail, MapPin, Clock, FileText } from "lucide-react";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { trackContactFormSubmit, trackCTAClick, trackPhoneClick } from "@/lib/analytics";
import { COMPANY, mailto, telHref, emergencyLine } from "@shared/company";
import { SERVICE_SLUGS, SERVICE_NAMES } from "@shared/routes";

type InquiryType = "quote" | "general";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState<InquiryType>("general");

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ];

  const schemas = [generateBreadcrumbSchema(breadcrumbs)];

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      inquiryType: "general",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      projectType: "",
      preferredStartDate: "",
      budgetRange: "",
      website: "",
    },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const type = new URLSearchParams(window.location.search).get("type");
    if (type && (SERVICE_SLUGS as readonly string[]).includes(type)) {
      setInquiryType("quote");
      form.setValue("inquiryType", "quote");
      form.setValue("projectType", type);
    }
  }, []);

    const submitMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      // Track successful form submission
      trackContactFormSubmit(inquiryType);
      
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: inquiryType === "quote" 
          ? `Thank you for requesting a quote. ${COMPANY.responsePromise}`
          : `Thank you for contacting us. ${COMPANY.responsePromise}`,
      });
      form.reset({
        inquiryType: inquiryType,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        projectType: "",
        preferredStartDate: "",
        budgetRange: "",
        website: "",
      });
      setTimeout(() => setIsSubmitted(false), 8000);
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

  const handleInquiryTypeChange = (type: InquiryType) => {
    setInquiryType(type);
    form.setValue("inquiryType", type);
    
    // Track inquiry type selection
    trackCTAClick(`inquiry_type_${type}`, 'contact_page_selector');
  };

  const serviceAreas = COMPANY.serviceAreas;

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`Contact ${COMPANY.name}`}
        description={`Request a quote for commercial construction and maintenance in ${COMPANY.regionShort}. Call ${COMPANY.phone}.`}
        canonical="/contact"
        schemas={schemas}
      />
      <Navigation />

      <section className="bg-gray-50 py-4 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Contact</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6" data-testid="text-page-title">
            Contact Us
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          
          {/* Response Time Promise Banner */}
          <div className="bg-primary/10 border-2 border-primary rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Clock className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-heading font-bold text-gray-900">
                {COMPANY.responsePromise}
              </h2>
            </div>
            {COMPANY.emergencyService && (
              <p className="text-gray-900 font-semibold mb-2" data-testid="text-emergency-line">{emergencyLine()}</p>
            )}
            <p className="text-gray-700">
              Call us or send a work order or quote request below.
            </p>
          </div>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Whether you need a project quote or have general questions, we're here to help.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                {/* Inquiry Type Selector */}
                <div className="mb-8">
                  <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                    How Can We Help You?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleInquiryTypeChange("quote")}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        inquiryType === "quote"
                          ? "border-primary bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-primary hover:bg-blue-50/50"
                      }`}
                      data-testid="button-inquiry-quote"
                      aria-label="Select quote request inquiry type"
                    >
                      <FileText className={`h-8 w-8 mb-3 ${inquiryType === "quote" ? "text-primary" : "text-gray-400"}`} />
                      <h3 className="font-heading font-bold text-lg mb-2">Request a Quote</h3>
                      <p className="text-sm text-gray-600">Get pricing for your project</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInquiryTypeChange("general")}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        inquiryType === "general"
                          ? "border-primary bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-primary hover:bg-blue-50/50"
                      }`}
                      data-testid="button-inquiry-general"
                      aria-label="Select general inquiry type"
                    >
                      <Mail className={`h-8 w-8 mb-3 ${inquiryType === "general" ? "text-primary" : "text-gray-400"}`} />
                      <h3 className="font-heading font-bold text-lg mb-2">General Inquiry</h3>
                      <p className="text-sm text-gray-600">Ask a question</p>
                    </button>
                  </div>
                </div>

                {isSubmitted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-800 font-medium">
                      Thank you! Your {inquiryType === "quote" ? "quote request" : "message"} has been sent successfully.
                    </p>
                  </div>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <input type="hidden" {...form.register("inquiryType")} value={inquiryType} />
                    {/* Honeypot: hidden from people, bots fill it. Server drops filled submissions. */}
                    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
                      <label htmlFor="website">Website</label>
                      <input id="website" type="text" tabIndex={-1} autoComplete="off" {...form.register("website")} />
                    </div>

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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Phone {inquiryType === "quote" && "*"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                placeholder="Your phone number"
                                data-testid="input-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {inquiryType === "quote" && (
                      <>
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company/Property Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="ABC Property Management"
                                  data-testid="input-company"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="projectType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Type</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  data-testid="select-project-type"
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select service needed" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {SERVICE_SLUGS.map((slug) => (
                                      <SelectItem key={slug} value={slug}>{SERVICE_NAMES[slug]}</SelectItem>
                                    ))}
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="budgetRange"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Budget Range</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  data-testid="select-budget-range"
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select budget range" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="under-5k">Under $5,000</SelectItem>
                                    <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                                    <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                                    <SelectItem value="over-100k">Over $100,000</SelectItem>
                                    <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="preferredStartDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Start Date</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                data-testid="select-start-date"
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Preferred start date" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="asap">As Soon As Possible</SelectItem>
                                  <SelectItem value="1-month">Within 1 Month</SelectItem>
                                  <SelectItem value="1-3-months">1-3 Months</SelectItem>
                                  <SelectItem value="3-6-months">3-6 Months</SelectItem>
                                  <SelectItem value="flexible">Flexible Timeline</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {inquiryType === "quote" ? "Project Details *" : "Comment or Message *"}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder={
                                inquiryType === "quote"
                                  ? "Please describe your project needs, location, and any specific requirements..."
                                  : "Tell us about your inquiry..."
                              }
                              rows={6}
                              data-testid="input-message"
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
                      aria-label="Submit contact form"
                    >
                      {submitMutation.isPending
                        ? "Sending..."
                        : inquiryType === "quote"
                        ? "Request a Quote"
                        : "Submit"}
                    </Button>

                    <p className="text-sm text-gray-600 italic">
                      Your information is only used to respond to your inquiry.
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
                        href={telHref()}
                        className="text-primary hover:text-primary/80"
                        data-testid="link-contact-phone"
                        aria-label={`Call Shall's Construction at ${COMPANY.phone}`}
                      >
                        {COMPANY.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Printer className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Fax</p>
                      <p className="text-gray-600" data-testid="text-contact-fax">{COMPANY.fax}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a
                        href={mailto()}
                        className="text-primary hover:text-primary/80 break-all"
                        data-testid="link-contact-email"
                        aria-label="Email Shall's Construction"
                      >
                        {COMPANY.email}
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

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
