import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_CALL_URL, BUSINESS_PHONE_LABEL } from "@/lib/contact";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/fleet", label: "Our Cars" },
  { to: "/tours", label: "Tours" },
  { to: "/routes", label: "Routes" },
  { to: "/service-areas", label: "Service Areas" },
  { to: "/reviews", label: "Reviews" },
  { to: "/blog", label: "Blog" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card shadow-md" : "bg-card shadow-sm"
      }`}
    >
      <div className="heritage-rule" />
      {/* Top bar with phone */}
      <div className="bg-primary text-primary-foreground text-xs py-1.5 px-4 hidden lg:block">
        <div className="container mx-auto flex items-center justify-between">
          <span>Namaste! Your journey starts in Agra.</span>
          <div className="flex items-center gap-4">
            <a
              href="mailto:shivanshtourandtravel.in@gmail.com"
              className="hover:text-secondary transition-colors"
            >
              ✉ shivanshtourandtravel.in@gmail.com
            </a>
            <a
              href={BUSINESS_CALL_URL}
              className="hover:text-secondary transition-colors font-medium"
            >
              📞 {BUSINESS_PHONE_LABEL}
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
          {navLinks
            .filter((l) =>
              [
                "/",
                "/services",
                "/fleet",
                "/tours",
                "/routes",
                "/contact",
              ].includes(l.to),
            )
            .map((l) => (
              <Link
                key={l.to}
                to={l.to}
                aria-current={location.pathname === l.to ? "page" : undefined}
                className={`px-3 py-3 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-accent ${
                  location.pathname === l.to
                    ? "text-secondary bg-accent"
                    : "text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          <div className="relative">
            <Button
              variant="ghost"
              aria-expanded={open}
              aria-controls="desktop-more-menu"
              onClick={() => setOpen(!open)}
            >
              More {open ? <X /> : <Menu />}
            </Button>
            {open && (
              <div
                id="desktop-more-menu"
                className="absolute right-0 top-full mt-3 w-52 rounded-lg border border-border bg-card p-2 shadow-lg"
              >
                {navLinks
                  .filter((l) =>
                    [
                      "/service-areas",
                      "/reviews",
                      "/blog",
                      "/gallery",
                      "/about",
                    ].includes(l.to),
                  )
                  .map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="block rounded-md px-3 py-3 text-sm hover:bg-accent"
                      aria-current={
                        location.pathname === l.to ? "page" : undefined
                      }
                    >
                      {l.label}
                    </Link>
                  ))}
              </div>
            )}
          </div>
          <Button asChild variant="hero" className="ml-2 h-11">
            <a href={BUSINESS_CALL_URL}>
              <Phone className="h-3.5 w-3.5" /> Call Now
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 xl:hidden">
          <a
            href={BUSINESS_CALL_URL}
            aria-label="Call Shivansh Travels"
            className="p-2 text-secondary"
          >
            <Phone className="h-5 w-5" />
          </a>
          <Button
            variant="ghost"
            size="icon"
            aria-expanded={open}
            aria-controls="mobile-navigation"
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
        id="mobile-navigation"
        aria-hidden={!open}
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
              tabIndex={open ? 0 : -1}
              aria-current={location.pathname === l.to ? "page" : undefined}
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
              <Button
                asChild
                tabIndex={open ? 0 : -1}
                size="sm"
                variant="hero"
                className="w-full gap-1.5"
              >
                <a href={BUSINESS_CALL_URL} tabIndex={open ? 0 : -1}><Phone className="h-3.5 w-3.5" /> Call Now</a>
              </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
