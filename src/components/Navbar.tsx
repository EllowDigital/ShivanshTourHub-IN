import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/fleet", label: "Our Cars" },
  { to: "/tours", label: "Tours" },
  { to: "/routes", label: "Routes" },
  { to: "/service-areas", label: "Service Areas" },
  { to: "/reviews", label: "Reviews" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/98 backdrop-blur-lg shadow-md"
          : "bg-card/95 backdrop-blur-md shadow-sm"
      }`}
    >
      {/* Top bar with phone */}
      <div className="bg-primary text-primary-foreground text-xs py-1.5 px-4 hidden lg:block">
        <div className="container mx-auto flex items-center justify-between">
          <span>📍 Serving across India from Agra, UP</span>
          <div className="flex items-center gap-4">
            <a
              href="mailto:shivanshtourandtravel.in@gmail.com"
              className="hover:text-secondary transition-colors"
            >
              ✉ shivanshtourandtravel.in@gmail.com
            </a>
            <a
              href="tel:+918865038345"
              className="hover:text-secondary transition-colors font-medium"
            >
              📞 +91 8865038345
            </a>
            <a
              href="tel:+917505075626"
              className="hover:text-secondary transition-colors font-medium"
            >
              📞 +91 7505075626
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex items-center justify-between h-14 sm:h-16 px-4">
        <Link
          to="/"
          className="shrink-0"
          aria-label="Shivansh Tour and Travels home"
        >
          <img
            src="/logo.svg"
            alt="Shivansh Tour and Travels"
            className="h-11 sm:h-12 w-auto"
            loading="eager"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden xl:flex items-center gap-0 2xl:gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-2 py-2 rounded-md text-xs 2xl:text-sm font-medium transition-colors hover:text-secondary hover:bg-accent ${
                location.pathname === l.to
                  ? "text-secondary bg-accent"
                  : "text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a href="tel:+918865038345" className="ml-2">
            <Button size="sm" variant="hero" className="gap-1.5">
              <Phone className="h-3.5 w-3.5" /> Call Now
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 xl:hidden">
          <a
            href="tel:+918865038345"
            aria-label="Call Shivansh Travels"
            className="p-2 text-secondary"
          >
            <Phone className="h-5 w-5" />
          </a>
          <Button
            variant="ghost"
            size="icon"
            aria-expanded={open}
            className="p-2 -mr-2 text-foreground hover:text-secondary transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ${
          open
            ? "max-h-[calc(100dvh-100px)] overflow-y-auto opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-card border-t border-border px-4 py-3 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "text-secondary bg-accent"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
          <div className="pt-2 pb-1">
            <a href="tel:+918865038345">
              <Button size="sm" variant="hero" className="w-full gap-1.5">
                <Phone className="h-3.5 w-3.5" /> Call Now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
