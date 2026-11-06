import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Preloader, { LoadingJourney } from "./components/Preloader";
import Index from "./pages/Index";
import { routePages, getAirportToAgraRoute } from "./lib/routeSeo";
const Services = lazy(() => import("./pages/Services"));
const Fleet = lazy(() => import("./pages/Fleet"));
const Tours = lazy(() => import("./pages/Tours"));
const TaxiRoutes = lazy(() => import("./pages/Routes"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const RouteLanding = lazy(() => import("./pages/RouteLanding"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Preloader />
        <ScrollToTop />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Suspense
            fallback={
              <LoadingJourney compact />
            }
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/routes" element={<TaxiRoutes />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/service-areas" element={<ServiceAreas />} />
              {[...routePages, getAirportToAgraRoute()].flatMap((route) => [
                <Route key={route.slug} path={`/${route.slug}`} element={<RouteLanding />} />,
                <Route key={`${route.slug}-alias`} path={`/${route.slug.replace(/-taxi$/, "-cab-service")}`} element={<RouteLanding />} />,
              ])}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
