import { WHATSAPP_CHAT_URL } from "@/lib/whatsapp";
import { Link, useParams } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  findRouteByCities,
  getAirportToAgraRoute,
  getFareOptions,
  getRelatedRoutes,
  getRouteFAQs,
  getRouteWordySections,
} from "@/lib/routeSeo";
import {
  ArrowRight,
  Clock,
  IndianRupee,
  MapPin,
  Phone,
  Route as RouteIcon,
} from "lucide-react";

const NAP = {
  name: "Shivansh Tour and Travels",
  address:
    "Ganga Enclave Phase-2, Near Khel Gaon Khel Road, Dayal Bagh, Agra, Uttar Pradesh - 282005",
  phone: "+91 8865038345",
  url: "https://shivansh-tour-hub.netlify.app",
};

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const RouteLanding = () => {
  const { fromSlug, toSlug } = useParams<{
    fromSlug: string;
    toSlug: string;
  }>();

  const route =
    fromSlug === "delhi-airport" && toSlug === "agra"
      ? getAirportToAgraRoute()
      : fromSlug && toSlug
        ? findRouteByCities(fromSlug, toSlug)
        : undefined;

  if (!route) {
    return (
      <div className="pt-14 sm:pt-16 lg:pt-[88px] section-padding text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Route Not Found
        </h1>
        <p className="mt-2 text-muted-foreground text-sm">
          The requested taxi route page is not available.
        </p>
        <Link to="/routes">
          <Button variant="outline" className="mt-5">
            Back to Routes
          </Button>
        </Link>
      </div>
    );
  }

  const fare = getFareOptions(route.oneWayFare);
  const faqs = getRouteFAQs(route);
  const sections = getRouteWordySections(route);
  const related = getRelatedRoutes(route, 8);
  const pageUrl = `${NAP.url}/${route.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: NAP.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Routes",
        item: `${NAP.url}/routes`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${route.from.name} to ${route.to.name} Taxi`,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const taxiServiceSchema = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: `${route.from.name} to ${route.to.name} Taxi Service`,
    provider: { "@type": "LocalBusiness", name: NAP.name },
    areaServed: [route.from.name, route.to.name],
    serviceType: `${route.from.name} to ${route.to.name} cab service`,
    telephone: NAP.phone,
    url: pageUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: String(fare.dzire),
      availability: "https://schema.org/InStock",
      description: `One-way sedan fare estimate for ${route.from.name} to ${route.to.name}`,
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: NAP.name,
    image: `${NAP.url}/og-image.jpg`,
    telephone: NAP.phone,
    url: NAP.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Agra",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    areaServed: [
      "Agra",
      "Delhi",
      "Noida",
      "Gurgaon",
      "Mathura",
      "Jaipur",
      "Lucknow",
      "Chandigarh",
      "Haridwar",
      "Rishikesh",
      "Vrindavan",
    ],
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "INR",
  };

  return (
    <div className="pt-14 sm:pt-16 lg:pt-[88px]">
      <SEO
        title={`${route.from.name} to ${route.to.name} Taxi | Fare Rs ${fare.dzire} | Cab Booking 24/7`}
        description={`Book ${route.from.name} to ${route.to.name} taxi service with verified drivers. Distance ${route.distanceKm} km, travel time ${route.travelTimeHours} hours, one-way fare starts Rs ${fare.dzire}. Call ${NAP.phone}.`}
        keywords={route.keywords}
        canonical={pageUrl}
        schema={[
          taxiServiceSchema,
          localBusinessSchema,
          faqSchema,
          breadcrumbSchema,
        ]}
      />

      <section className="page-header">
        <div className="container mx-auto text-center">
          <h1 className="page-header-title">
            {route.from.name} to {route.to.name} Taxi Service
          </h1>
          <p className="page-header-subtitle">
            Trusted one-way and round-trip cab booking with transparent fare,
            safe cars, and 24/7 support.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          <div className="bg-card rounded-xl p-5 border border-border/50">
            <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
              <RouteIcon className="h-4 w-4 text-secondary" /> Route Details
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {route.from.name} to {route.to.name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" /> {route.distanceKm} km
            </p>
            <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" /> {route.travelTimeHours} hrs
              (approx)
            </p>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border/50">
            <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-secondary" /> Taxi Fare
              Estimate
            </h2>
            <ul className="mt-3 text-sm text-muted-foreground space-y-1.5">
              <li>Swift Dzire: Rs {fare.dzire}</li>
              <li>Ertiga: Rs {fare.ertiga}</li>
              <li>Innova: Rs {fare.innova}</li>
              <li>Tempo Traveller: Rs {fare.tempo}</li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border/50">
            <h2 className="font-heading text-lg font-bold text-foreground">
              Book Instantly
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Call or WhatsApp for immediate fare confirmation and car
              availability.
            </p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <a
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="hero">Book on WhatsApp</Button>
              </a>
              <a href="tel:+918865038345">
                <Button variant="outline" className="gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container mx-auto max-w-5xl space-y-7">
          {sections.map((section) => (
            <article key={section.heading}>
              <h2 className="font-heading text-xl font-bold text-foreground">
                {section.heading}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Google Map and Pickup Support
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use this map as your service area reference. Live pickup landmarks
              are confirmed on call before dispatch.
            </p>
            <div className="mt-4 rounded-xl overflow-hidden border border-border/50 shadow-sm">
              <iframe
                title={`${route.from.name} to ${route.to.name} taxi service area map`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.38256437284!2d78.0081!3d27.1767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747121d702ff6d%3A0xdd2ae4803f767dde!2sAgra%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Business NAP Details
            </h2>
            <div className="mt-4 bg-card rounded-xl p-5 border border-border/50 text-sm text-muted-foreground space-y-1.5">
              <p>
                <span className="font-semibold text-foreground">Name:</span>{" "}
                {NAP.name}
              </p>
              <p>
                <span className="font-semibold text-foreground">Address:</span>{" "}
                {NAP.address}
              </p>
              <p>
                <span className="font-semibold text-foreground">Phone:</span>{" "}
                <a href="tel:+918865038345" className="text-secondary">
                  {NAP.phone}
                </a>
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  Service Route:
                </span>{" "}
                {route.from.name} to {route.to.name}
              </p>
            </div>

            <h3 className="font-heading text-lg font-bold text-foreground mt-6">
              Related Taxi Routes
            </h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/${item.slug}`}
                  className="rounded-lg border border-border/50 bg-card p-3 text-sm hover:bg-accent transition-colors flex items-center justify-between"
                >
                  <span>
                    {item.from.name} to {item.to.name}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-secondary" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-5 space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-card rounded-xl p-4 border border-border/50"
              >
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RouteLanding;
