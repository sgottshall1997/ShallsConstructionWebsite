import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import SEO from "@/components/SEO";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <SEO title="Page Not Found" description="The page you requested could not be found." canonical="/404" noindex />
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 — Page Not Found</h1>
          </div>
          <p className="mt-4 text-sm text-gray-600 mb-6">
            That page isn't on this site. Try the home page or get in touch.
          </p>
          <div className="flex gap-3">
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
