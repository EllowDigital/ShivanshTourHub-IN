import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Car } from "lucide-react";

const quickLinks = [
  { to: "/services", label: "Services" },
  { to: "/fleet", label: "Our Cars" },
  { to: "/tours", label: "Tour Packages" },
  { to: "/routes", label: "Taxi Routes" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/blog", label: "Travel Blog" },
  { to: "/service-areas", label: "Service Areas" },
];

const popularRoutes = [
  "Agra to Delhi",
  "Delhi to Jaipur",
  "Agra to Varanasi",
  "Delhi to Manali",
  "Agra to Mathura",
  "Delhi to Shimla",
];

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="heritage-rule" />
    <div className="container mx-auto px-4 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
      <div>
        <Link to="/" className="flex items-center gap-2 mb-3">
          <Car className="h-6 w-6 text-secondary" />
          <span className="font-heading text-lg font-bold">
            Shivansh<span className="text-secondary"> Travels</span>
          </span>
        </Link>
        <p className="text-sm text-primary-foreground/75 leading-relaxed">
          Your trusted partner for comfortable, affordable taxi & tour services
          across India. Available 24/7.
        </p>
      </div>

      <div>
        <h4 className="font-heading font-semibold mb-4 text-secondary text-sm uppercase">
          Quick Links
        </h4>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm text-primary-foreground/80">
          {quickLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="inline-flex min-h-10 items-center hover:text-secondary transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-heading font-semibold mb-4 text-secondary text-sm uppercase">
          Popular Routes
        </h4>
        <ul className="space-y-2 text-sm text-primary-foreground/80">
          {popularRoutes.map((r) => (
            <li key={r}>
              <Link
                to={`/${r.toLowerCase().replace(/ /g, "-")}-taxi`}
                className="hover:text-secondary transition-colors"
              >
                {r}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-heading font-semibold mb-4 text-secondary text-sm uppercase">
          Contact Us
        </h4>
        <ul className="space-y-3 text-sm text-primary-foreground/80">
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-secondary shrink-0" />
            <a
              href="tel:+918865038345"
              className="hover:text-secondary transition-colors"
            >
              +91 8865038345
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-secondary shrink-0" />
            <a
              href="tel:+917505075626"
              className="hover:text-secondary transition-colors"
            >
              +91 7505075626
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-secondary shrink-0" />
            <a
              href="mailto:shivanshtourandtravel.in@gmail.com"
              className="hover:text-secondary transition-colors text-xs sm:text-sm break-all"
            >
              shivanshtourandtravel.in@gmail.com
            </a>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
            <span>
              Ganga Enclave Phase-2, Near Khel Gaon Khel Road, Dayal Bagh, Agra,
              Uttar Pradesh - 282005
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-primary-foreground/15 text-center py-4 px-4 text-xs text-primary-foreground/50">
      © {new Date().getFullYear()} Shivansh Tour and Travels. All rights
      reserved.
    </div>
  </footer>
);

export default Footer;
