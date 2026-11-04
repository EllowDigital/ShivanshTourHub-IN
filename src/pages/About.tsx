import PageCta from "@/components/PageCta";
﻿import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import { ShieldCheck, Heart, Users, Award, Target, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const values = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    desc: "All vehicles regularly serviced and drivers fully verified.",
  },
  {
    icon: Heart,
    title: "Customer Focused",
    desc: "Your comfort and satisfaction is our top priority.",
  },
  {
    icon: Users,
    title: "Family Friendly",
    desc: "Catering to families, tourists, pilgrims, and corporates.",
  },
  {
    icon: Award,
    title: "Experience",
    desc: "Years of trusted service across Uttar Pradesh and beyond.",
  },
];

const About = () => (
  <div className="pt-14 sm:pt-16 lg:pt-[88px]">
    <SEO
      title="About Shivansh Tour & Travels | Trusted Taxi Service in Agra Since Years"
      description="Shivansh Tour and Travels is Agra's trusted taxi and tour service provider. Professional drivers, well-maintained fleet, 24/7 support. Serving 50+ cities across India."
      keywords="about shivansh travels, taxi company agra, trusted cab service agra, travel agency agra, tour operator uttar pradesh"
      canonical="https://shivansh-tour-hub.netlify.app/about"
    />
    <section className="page-header">
      <div className="container mx-auto text-center">
        <h1 className="page-header-title">About Shivansh Tour & Travels</h1>
        <p className="page-header-subtitle">
          Agra's trusted taxi and tour service — serving thousands of happy
          customers across India.
        </p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-4">
            Who We Are
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            <strong className="text-foreground">
              Shivansh Tour and Travels
            </strong>{" "}
            is a leading taxi and tour service provider based in{" "}
            <strong>Agra, Uttar Pradesh</strong>. We specialize in airport
            pickups, outstation trips, local city rides, and curated tour
            packages across India. With a fleet of well-maintained vehicles and
            professional drivers, we ensure every journey is safe, comfortable,
            and memorable.
          </p>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Whether you're a family heading to a pilgrimage, a tourist exploring
            India's heritage, or a corporate traveler needing reliable transport
            — we are here for you, 24 hours a day, 7 days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-12 max-w-3xl mx-auto">
          <div className="bg-card rounded-xl p-5 sm:p-6 border border-border/50 shadow-sm text-center">
            <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Target className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground text-sm sm:text-base">
              Our Mission
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              To provide safe, reliable, and affordable travel services that
              exceed customer expectations every single time.
            </p>
          </div>
          <div className="bg-card rounded-xl p-5 sm:p-6 border border-border/50 shadow-sm text-center">
            <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Globe className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground text-sm sm:text-base">
              Our Vision
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              To become India's most trusted travel partner by connecting people
              to their dream destinations.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-muted">
      <div className="container mx-auto">
        <SectionHeading title="Our Values" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-5 sm:p-6 text-center hover-lift shadow-sm border border-border/50"
            >
              <div className="mx-auto mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent flex items-center justify-center">
                <v.icon className="h-6 w-6 sm:h-7 sm:w-7 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-sm sm:text-base">
                {v.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary text-center">
      <div className="container mx-auto">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-secondary-foreground">
          Let's Plan Your Next Trip
        </h2>
        <p className="mt-2 text-secondary-foreground/90 text-sm sm:text-base">
          Contact us today for bookings and custom tour packages.
        </p>
        <div className="mt-6">
          <Link to="/contact">
            <Button
              variant="default"
              size="lg"
              className="text-sm sm:text-base"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
    <PageCta title="Travel with a family-run Agra team" text="Tell us your plan and we will suggest the right car, route and fare." />
  </div>
);

export default About;
