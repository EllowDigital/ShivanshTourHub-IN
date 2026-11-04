import PageCta from "@/components/PageCta";
﻿import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { cities, routePages } from "@/lib/routeSeo";

const ServiceAreas = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Shivansh Tour and Travels",
    url: "https://shivansh-tour-hub.netlify.app/service-areas",
    image: "https://shivansh-tour-hub.netlify.app/og-image.jpg",
    telephone: "+91 8865038345",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Ganga Enclave Phase-2, Near Khel Gaon Khel Road, Dayal Bagh",
      addressLocality: "Agra",
      addressRegion: "Uttar Pradesh",
      postalCode: "282005",
      addressCountry: "IN",
    },
    areaServed: cities.map((city) => city.name),
  };

  return (
    <div className="pt-14 sm:pt-16 lg:pt-[88px]">
      <SEO
        title="Taxi Service Areas | Agra, Delhi, Noida, Gurgaon, Jaipur, Lucknow"
        description="Explore all service areas covered by Shivansh Tour and Travels. Outstation taxi and local cab booking for Agra, Delhi, Noida, Gurgaon, Jaipur, Lucknow, Haridwar, Rishikesh, and more."
        keywords="agra taxi service, delhi to agra cab, noida taxi service, gurgaon taxi booking, jaipur outstation taxi, lucknow cab service"
        canonical="https://shivansh-tour-hub.netlify.app/service-areas"
        schema={schema}
      />

      <section className="page-header">
        <div className="container mx-auto text-center">
          <h1 className="page-header-title">Taxi Service Areas</h1>
          <p className="page-header-subtitle">
            Local and outstation cab coverage across major cities in North
            India.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {cities.map((city) => {
              const outgoing = routePages
                .filter((route) => route.from.slug === city.slug)
                .slice(0, 6);
              return (
                <article
                  key={city.slug}
                  className="bg-card rounded-xl border border-border/50 p-5"
                >
                  <h2 className="font-heading text-lg font-bold text-foreground">
                    {city.name} Taxi Service
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Book local and outstation taxi from {city.name} with
                    transparent fare and verified drivers.
                  </p>
                  <h3 className="font-heading text-sm font-semibold text-foreground mt-4">
                    Popular routes from {city.name}
                  </h3>
                  <div className="mt-2 space-y-1.5">
                    {outgoing.map((route) => (
                      <Link
                        key={route.slug}
                        to={`/${route.slug}`}
                        className="block text-sm text-secondary hover:underline"
                      >
                        {route.from.name} to {route.to.name} taxi
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Get Route-Specific Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <PageCta title="Travelling from your city?" text="We cover Agra, Delhi, Mathura, Jaipur and many more cities. Ask for your route fare." />
    </div>
  );
};

export default ServiceAreas;
