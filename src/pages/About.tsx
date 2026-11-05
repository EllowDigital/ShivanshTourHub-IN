import PageCta from "@/components/PageCta";
import BookingActions from "@/components/BookingActions";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import {
  ShieldCheck,
  Heart,
  Users,
  Award,
  MapPin,
  ArrowRight,
} from "lucide-react";
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
  <div>
    <SEO
      title="About Shivansh Tour & Travels | Trusted Taxi Service in Agra"
      description="Meet Shivansh Tour and Travels, an Agra-based taxi and tour team for local rides, airport transfers and journeys across India."
      canonical="https://shivansh-tour-hub.netlify.app/about"
    />
    <section className="page-header">
      <div className="container mx-auto text-center">
        <h1 className="page-header-title">About Shivansh Tour & Travels</h1>
        <p className="page-header-subtitle">
          Rooted in Agra. Ready for your next journey across India.
        </p>
        <div className="mt-6">
          <BookingActions onDark />
        </div>
      </div>
    </section>
    <section className="section-padding bg-background">
      <div className="container mx-auto grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-lg">
          <img
            src="/hero/agra-taj-tablet.webp"
            alt="The Taj Mahal in Agra, our home city"
            width="1024"
            height="576"
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="travel-eyebrow flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Agra, Uttar Pradesh
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Your journey, our responsibility
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Shivansh Tour and Travels connects travellers with local city rides,
            airport pickups, outstation taxis and curated tours across India.
            Our home is Agra; our journeys take you much further.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            From a family pilgrimage to a heritage holiday or a business trip,
            we help match your route and group size with the right vehicle.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="h-12">
              <Link to="/fleet">
                Explore our cars <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12">
              <Link to="/tours">
                Discover our tours <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
    <section className="section-padding bg-muted">
      <div className="container mx-auto">
        <SectionHeading title="What Matters on Every Journey" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <article key={v.title} className="travel-card p-6">
              <div className="mb-5 inline-flex rounded-lg bg-accent p-3">
                <v.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {v.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <SectionHeading title="From Your First Message to Your Pickup" />
        <ol className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Share your plans",
              text: "Tell us your pickup, destination, dates and passenger count.",
            },
            {
              title: "Choose your ride",
              text: "Discuss the vehicle, itinerary and fare inclusions with our team.",
            },
            {
              title: "Confirm your journey",
              text: "Agree on the trip details with us before your travel day.",
            },
          ].map((step, i) => (
            <li key={step.title} className="border-l-2 border-secondary pl-5">
              <p className="travel-eyebrow">0{i + 1}</p>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
    <PageCta
      title="Chalo, let's plan your next journey"
      text="Share your route and travel dates with our Agra team."
    />
  </div>
);
export default About;
