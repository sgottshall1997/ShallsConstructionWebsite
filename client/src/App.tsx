import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import { useAnalytics } from "@/hooks/useAnalytics";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const WhatWeDo = lazy(() => import("@/pages/WhatWeDo"));
const WhoWeServe = lazy(() => import("@/pages/WhoWeServe"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Safety = lazy(() => import("@/pages/Safety"));
const ServiceAreas = lazy(() => import("@/pages/ServiceAreas"));
const Articles = lazy(() => import("@/pages/Articles"));
const BlogDetail = lazy(() => import("@/pages/BlogDetail"));
const Testimonials = lazy(() => import("@/pages/Testimonials"));
const Contact = lazy(() => import("@/pages/Contact"));
const BethesdaMD = lazy(() => import("@/pages/ServiceAreas/BethesdaMD"));
const RockvilleMD = lazy(() => import("@/pages/ServiceAreas/RockvilleMD"));
const SilverSpringMD = lazy(() => import("@/pages/ServiceAreas/SilverSpringMD"));
const BaltimoreMD = lazy(() => import("@/pages/ServiceAreas/BaltimoreMD"));
const GaithersburgMD = lazy(() => import("@/pages/ServiceAreas/GaithersburgMD"));
const DCMetro = lazy(() => import("@/pages/ServiceAreas/DCMetro"));
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
  
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/what-we-do" component={WhatWeDo} />
          <Route path="/who-we-serve" component={WhoWeServe} />
          <Route path="/projects" component={Projects} />
          <Route path="/projects/:slug" component={ProjectDetail} />
          <Route path="/services/:slug" component={ServiceDetail} />
          <Route path="/safety" component={Safety} />
          <Route path="/service-areas" component={ServiceAreas} />
          <Route path="/blog" component={Articles} />
          <Route path="/blog/:slug" component={BlogDetail} />
          <Route path="/articles" component={Articles} />
          <Route path="/testimonials" component={Testimonials} />
          <Route path="/contact" component={Contact} />
          <Route path="/service-areas/bethesda-md" component={BethesdaMD} />
          <Route path="/service-areas/rockville-md" component={RockvilleMD} />
          <Route path="/service-areas/silver-spring-md" component={SilverSpringMD} />
          <Route path="/service-areas/baltimore-md" component={BaltimoreMD} />
          <Route path="/service-areas/gaithersburg-md" component={GaithersburgMD} />
          <Route path="/service-areas/dc-metro" component={DCMetro} />
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
