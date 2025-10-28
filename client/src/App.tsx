import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import About from "@/pages/About";
import WhatWeDo from "@/pages/WhatWeDo";
import WhoWeServe from "@/pages/WhoWeServe";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Safety from "@/pages/Safety";
import ServiceAreas from "@/pages/ServiceAreas";
import Articles from "@/pages/Articles";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import BethesdaMD from "@/pages/ServiceAreas/BethesdaMD";
import RockvilleMD from "@/pages/ServiceAreas/RockvilleMD";
import SilverSpringMD from "@/pages/ServiceAreas/SilverSpringMD";
import BaltimoreMD from "@/pages/ServiceAreas/BaltimoreMD";
import GaithersburgMD from "@/pages/ServiceAreas/GaithersburgMD";
import DCMetro from "@/pages/ServiceAreas/DCMetro";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/what-we-do" component={WhatWeDo} />
        <Route path="/who-we-serve" component={WhoWeServe} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:id" component={ProjectDetail} />
        <Route path="/safety" component={Safety} />
        <Route path="/service-areas" component={ServiceAreas} />
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
