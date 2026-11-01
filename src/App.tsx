import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Fleet from "./pages/Fleet";
import Tours from "./pages/Tours";
import TaxiRoutes from "./pages/Routes";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import RouteLanding from "./pages/RouteLanding";
import ServiceAreas from "./pages/ServiceAreas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
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
            <Route
              path="/:fromSlug-to-:toSlug-taxi"
              element={<RouteLanding />}
            />
            <Route
              path="/:fromSlug-to-:toSlug-cab-service"
              element={<RouteLanding />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
