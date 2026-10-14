import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import { useAnalytics } from "@/hooks/useAnalytics";
import { hasProjects, hasSafety } from "@shared/company";

// Keep in sync with shared/routes.ts (sitemap + verification read that file).
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const WhoWeServe = lazy(() => import("@/pages/WhoWeServe"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Safety = lazy(() => import("@/pages/Safety"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const NotFound = lazy(() => import("@/pages/not-found"));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

function Router() {
  useAnalytics();
  const showProjects = hasProjects();
  const showSafety = hasSafety();

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/who-we-serve" component={WhoWeServe} />
          {showProjects && <Route path="/projects" component={Projects} />}
          {showProjects && <Route path="/projects/:slug" component={ProjectDetail} />}
          <Route path="/services/:slug" component={ServiceDetail} />
          {showSafety && <Route path="/safety" component={Safety} />}
          <Route path="/contact" component={Contact} />
          <Route path="/privacy-policy" component={Privacy} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
