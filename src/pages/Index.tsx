import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BookingForm from "@/components/BookingForm";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import { heroSlides } from "@/lib/heroSlides";
import swiftDzire from "@/assets/swift-dzire.jpg";
import ertiga from "@/assets/ertiga.png";
import innova from "@/assets/innova.png";
import tempoTraveller from "@/assets/tempo-traveller.png";
import {
  Plane,
  Car,
  MapPin,
  ShieldCheck,
  Clock,
  Star,
  Users as UsersIcon,
  Phone,
  ArrowRight,
  Headphones,
  BadgeCheck,
  IndianRupee,
  Zap,
  Users,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useEffect, useState } from "react";

const services = [
  {
    icon: Plane,
    title: "Airport Transfers",
    desc: "Timely airport pickups & drops across India.",
  },
  {
    icon: Car,
    title: "Outstation Taxi",
    desc: "Affordable one-way & round trip cabs.",
  },
  {
    icon: MapPin,
    title: "Local City Taxi",
    desc: "Comfortable rides within your city.",
  },
  {
    icon: UsersIcon,
    title: "Tour Packages",
    desc: "Curated religious & leisure tours.",
  },
];

const fleetCars = [
  {
    name: "Swift Dzire",
    img: swiftDzire,
    seats: "4 Seater",
    price: "₹11/km",
    type: "Sedan",
    extraFare: "₹11/km after 230 kms",
  },
  {
    name: "Ertiga",
    img: ertiga,
    seats: "7 Seater",
    price: "₹14/km",
    type: "MPV",
    extraFare: "₹14/km after 230 kms",
  },
  {
    name: "Toyota Innova",
    img: innova,
    seats: "7 Seater",
    price: "₹16/km",
    type: "Premium",
    extraFare: "₹16/km after 230 kms",
  },
  {
    name: "Tempo Traveller",
    img: tempoTraveller,
    seats: "12 Seater",
    price: "₹22/km",
    type: "Group",
    extraFare: "₹22/km after 230 kms",
  },
];

const destinations = [
  { name: "Ayodhya", tag: "Religious", price: "From ₹4,999", days: "2D/1N" },
  { name: "Varanasi", tag: "Spiritual", price: "From ₹6,999", days: "3D/2N" },
  { name: "Prayagraj", tag: "Heritage", price: "From ₹3,999", days: "2D/1N" },
  {
    name: "Mathura Vrindavan",
    tag: "Pilgrimage",
    price: "From ₹4,499",
    days: "2D/1N",
  },
  {
    name: "Uttarakhand",
    tag: "Hill Station",
    price: "From ₹14,999",
    days: "5D/4N",
  },
  {
    name: "Rajasthan",
    tag: "Royal Tour",
    price: "From ₹19,999",
    days: "6D/5N",
  },
];

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "50+", label: "Cities Covered" },
  { value: "24/7", label: "Support Available" },
  { value: "100%", label: "Safe Journeys" },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: "Verified Drivers",
    desc: "Background-checked, experienced professionals.",
  },
  {
    icon: IndianRupee,
    title: "No Hidden Charges",
    desc: "Transparent pricing — what you see is what you pay.",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    desc: "Book in seconds via WhatsApp. No app needed.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Round the clock customer service for any help.",
  },
  {
    icon: BadgeCheck,
    title: "Clean & Hygienic Cars",
    desc: "Sanitized vehicles maintained to high standards.",
  },
  {
    icon: Clock,
    title: "On-Time Guarantee",
    desc: "Punctual pickups — we value your time.",
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    city: "Agra",
    text: "Excellent service! The driver was very professional and the car was spotless. Booked via WhatsApp and it was so easy!",
    rating: 5,
    trip: "Agra to Delhi",
  },
  {
    name: "Priya Singh",
    city: "Delhi",
    text: "Best taxi service. Used them for our family trip to Varanasi. Very comfortable and affordable. Highly recommended!",
    rating: 5,
    trip: "Agra to Varanasi",
  },
  {
    name: "Amit Verma",
    city: "Lucknow",
    text: "Very punctual and affordable. The booking was super easy. Great experience for our Ayodhya trip!",
    rating: 5,
    trip: "Agra to Ayodhya",
  },
  {
    name: "Sunita Gupta",
    city: "Mathura",
    text: "We booked for Rajasthan tour and everything was perfectly arranged. The driver was knowledgeable and friendly.",
    rating: 5,
    trip: "Rajasthan Tour",
  },
];

const popularRoutes = [
  { from: "Agra", to: "Delhi", price: "₹3,500", slug: "/agra-to-delhi-taxi" },
  {
    from: "Agra",
    to: "Jaipur",
    price: "₹3,600",
    slug: "/agra-to-jaipur-taxi",
  },
  { from: "Delhi", to: "Agra", price: "₹3,500", slug: "/delhi-to-agra-taxi" },
  {
    from: "Agra",
    to: "Mathura",
    price: "₹1,200",
    slug: "/agra-to-mathura-taxi",
  },
  {
    from: "Delhi Airport",
    to: "Agra",
    price: "₹3,900",
    slug: "/delhi-airport-to-agra-taxi",
  },
  {
    from: "Agra",
    to: "Lucknow",
    price: "₹5,500",
    slug: "/agra-to-lucknow-taxi",
  },
];

const faqs = [
  {
    q: "How do I book a taxi from Agra to Delhi?",
    a: "You can book instantly via WhatsApp at +91 8865038345 or call us. We offer one-way and round-trip taxis from Agra to Delhi starting at ₹3,500 in Swift Dzire.",
  },
  {
    q: "What is the fare for Agra to Delhi taxi?",
    a: "Agra to Delhi taxi fare starts at ₹3,500 for a sedan (Swift Dzire). Ertiga costs ₹4,200 and Innova costs ₹4,800. Prices include toll and driver charges.",
  },
  {
    q: "Do you provide airport pickup and drop?",
    a: "Yes! We provide 24/7 airport pickup and drop services at all major airports including Delhi IGI Airport, Jaipur Airport, Lucknow Airport, and Varanasi Airport.",
  },
  {
    q: "Are your drivers verified?",
    a: "Absolutely. All our drivers are background-verified, experienced professionals with valid licenses. Your safety is our top priority.",
  },
  {
    q: "Can I book a round-trip outstation taxi?",
    a: "Yes, we offer both one-way and round-trip outstation taxi services. Round trips get special discounted rates. Contact us for a custom quote.",
  },
  {
    q: "What types of cars are available?",
    a: "We have Swift Dzire (4-seater), Ertiga (7-seater), Toyota Innova (7-seater premium), and Tempo Traveller (12-seater) for group travel.",
  },
  {
    q: "Do you offer tour packages?",
    a: "Yes! We offer curated tour packages to Ayodhya, Varanasi, Rajasthan, Shimla-Manali, Uttarakhand, and more. All packages include car, hotel, and sightseeing.",
  },
  {
    q: "Is there any hidden charge?",
    a: "No hidden charges at all. The price quoted includes toll, parking, and driver allowance. You pay exactly what we quote — complete transparency.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "Shivansh Tour and Travels",
  description:
    "Book affordable taxi & cab services from Agra to Delhi, Jaipur, Varanasi, Ayodhya & all major cities. Airport pickup, outstation trips, tour packages. Call +91 8865038345.",
  url: "https://shivansh-tour-hub.netlify.app",
  telephone: "+918865038345",
  email: "shivanshtourandtravel.in@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Ganga Enclave Phase-2, Near Khel Gaon Khel Road, Dayal Bagh",
    addressLocality: "Agra",
    addressRegion: "Uttar Pradesh",
    postalCode: "282005",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+918865038345",
      contactType: "customer service",
    },
    {
      "@type": "ContactPoint",
      telephone: "+917505075626",
      contactType: "customer service",
    },
  ],
  areaServed: { "@type": "Country", name: "India" },
  priceRange: "₹₹",
  openingHours: "Mo-Su 00:00-23:59",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Taxi Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Agra to Delhi Taxi",
          description:
            "One-way & round-trip taxi from Agra to Delhi starting ₹3,500",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Agra to Jaipur Taxi",
          description:
            "Affordable cab service from Agra to Jaipur starting ₹3,600",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Airport Pickup & Drop",
          description: "24/7 airport transfer service at all major airports",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tour Packages",
          description:
            "All-inclusive tour packages to Ayodhya, Varanasi, Rajasthan & more",
        },
      },
    ],
  },
};

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/50 rounded-lg overflow-hidden bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-accent/50 transition-colors"
      >
        <span className="font-heading font-semibold text-foreground text-xs sm:text-sm pr-4">
          {q}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-secondary shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            {a}
          </p>
        </div>
      )}
    </div>
  );
};

const Index = () => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intervalId = window.setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="homepage">
      <SEO
        title="Shivansh Tour & Travels | Best Taxi Service in Agra | Book Cab Online"
        description="Book affordable taxi & cab services from Agra to Delhi, Jaipur, Varanasi, Ayodhya & 50+ cities. Agra to Delhi one-way taxi service, airport pickup, outstation trips, and tour packages. ₹11/km onwards. Call +91 8865038345."
        keywords="taxi service agra, cab booking agra, agra to delhi taxi, agra to jaipur taxi, outstation taxi agra, airport taxi agra, tour packages from agra, agra to varanasi cab, agra to ayodhya taxi, cheap taxi agra, best taxi service agra, taxi near me agra, cab service uttar pradesh, book taxi online agra, agra to mathura taxi"
        canonical="https://shivansh-tour-hub.netlify.app"
        schema={homeSchema}
      />

      {/* Image-led introduction with a compact, separate booking band. */}
      <section className="relative overflow-hidden bg-primary pt-14 sm:pt-16 lg:pt-24">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <picture
              key={slide.title}
              className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${index === currentHeroSlide ? "opacity-100" : "opacity-0"}`}
              aria-hidden={index !== currentHeroSlide}
            >
              <source media="(min-width: 1024px)" srcSet={slide.desktopImage} />
              <source media="(min-width: 640px)" srcSet={slide.tabletImage} />
              <img
                src={slide.mobileImage}
                alt={slide.alt}
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </picture>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/65 to-primary/25" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:py-20">
          <div className="max-w-2xl text-primary-foreground">
            <p className="mb-4 text-sm font-semibold text-secondary">
              AGRA · AIRPORT · OUTSTATION · TOURS
            </p>
            <h1 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Shivansh Tour
              <br />
              &amp; Travels
            </h1>
            <p className="mt-4 text-lg font-medium sm:text-xl">
              Reliable Taxi &amp; Tour Services Across India
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
              Comfortable rides, affordable prices, and trusted service.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg" className="px-5">
                <a href="#home-booking">
                  Book Taxi <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="hero-outline" size="lg" className="px-5">
                <a href="tel:+918865038345">
                  <Phone /> Call Now
                </a>
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-primary-foreground/90 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-secondary" /> Verified
                drivers
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-secondary" /> Clean cars
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-secondary" /> 24/7 assistance
              </span>
            </div>
            <div className="mt-6 flex items-center gap-2">
              {heroSlides.map((slide, index) => (
                <Button
                  key={slide.title}
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-primary-foreground/10"
                  aria-label={`Show hero image ${index + 1}: ${slide.title}`}
                  aria-pressed={index === currentHeroSlide}
                  onClick={() => setCurrentHeroSlide(index)}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${index === currentHeroSlide ? "bg-secondary" : "bg-primary-foreground/60"}`}
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="home-booking"
        className="scroll-mt-28 bg-background px-4 py-8 sm:px-8 sm:py-12"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="mb-3 text-sm font-semibold text-primary">
              A RIDE FOR EVERY JOURNEY
            </p>
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
              Your plans.
              <br />
              Our wheels.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              From a quick airport drop to a family holiday, find a car that
              fits your journey.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Car className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">
                Sedans, SUVs &amp; group travel
              </span>
            </div>
            <img
              src={swiftDzire}
              alt="Swift Dzire taxi available with Shivansh Tour and Travels"
              className="mt-5 hidden max-h-56 w-full max-w-md object-contain md:block"
              loading="lazy"
            />
          </div>
          <div className="min-w-0">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-secondary py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-secondary-foreground">
                  {s.value}
                </p>
                <p className="text-xs sm:text-sm text-secondary-foreground/80 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <SectionHeading
            title="Our Services"
            subtitle="Comprehensive taxi & tour services to make your travel hassle-free."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-card rounded-lg p-4 sm:p-6 text-center hover-lift shadow-md border border-border/50 group"
              >
                <div className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <s.icon className="h-6 w-6 sm:h-7 sm:w-7 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-xs sm:text-base">
                  {s.title}
                </h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link to="/services">
              <Button variant="outline" className="gap-2 text-sm">
                View All Services <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Fleet */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading
            title="Choose Your Ride"
            subtitle="Well-maintained cars for every type of journey."
          />
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {fleetCars.map((c, i) => (
              <Link
                to="/fleet"
                key={i}
                className="bg-card rounded-lg overflow-hidden shadow-md hover-lift border border-border/50 group"
              >
                <div className="bg-gradient-to-b from-accent/50 to-muted p-3 sm:p-4 flex items-center justify-center h-44 sm:h-40">
                  <img
                    src={c.img}
                    alt={`${c.name} taxi for hire in Agra`}
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 sm:p-4 text-center">
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    <span className="text-[10px] sm:text-xs font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                      {c.type}
                    </span>
                    <span className="text-[10px] sm:text-xs font-medium text-muted-foreground bg-accent px-2 py-0.5 rounded-full">
                      AC
                    </span>
                    <span className="text-[10px] sm:text-xs font-medium text-muted-foreground bg-accent px-2 py-0.5 rounded-full">
                      {c.seats.replace(" Seater", " Seat")}
                    </span>
                  </div>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-foreground mt-1.5">
                    {c.name}
                  </h3>
                  <p className="mt-1.5 text-base sm:text-lg font-bold text-secondary">
                    {c.price}
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground">
                    Extra km fare : {c.extraFare}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-center text-xs sm:text-sm text-foreground">
            Cancellation : Free till 1 hour of departure
          </p>
          <div className="text-center mt-6 sm:mt-8">
            <Link to="/fleet">
              <Button variant="outline" className="gap-2 text-sm">
                View Full Fleet <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="section-padding bg-accent/50">
        <div className="container mx-auto">
          <SectionHeading
            title="Popular Routes"
            subtitle="Most booked taxi routes with transparent pricing."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {popularRoutes.map((r, i) => (
              <Link
                to={r.slug}
                key={i}
                className="bg-card rounded-lg p-4 text-center hover-lift shadow-sm border border-border/50 group"
              >
                <div className="text-xs text-muted-foreground">{r.from}</div>
                <ArrowRight className="h-3 w-3 mx-auto my-1 text-secondary" />
                <div className="font-heading font-semibold text-foreground text-sm">
                  {r.to}
                </div>
                <div className="mt-2 text-secondary font-bold text-sm">
                  {r.price}
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link to="/routes">
              <Button variant="outline" className="gap-2 text-sm">
                View All Routes <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tour Packages */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading
            title="Popular Tour Packages"
            subtitle="All-inclusive tour packages with hotel, car, and sightseeing."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {destinations.map((d, i) => (
              <div
                key={i}
                className="bg-card rounded-lg overflow-hidden hover-lift shadow-sm border border-border/50 group"
              >
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-secondary/15 flex items-center justify-center shrink-0 group-hover:bg-secondary/25 transition-colors">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-foreground text-sm sm:text-base">
                          {d.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] sm:text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            {d.tag}
                          </span>
                          <span className="text-[10px] sm:text-xs text-muted-foreground">
                            {d.days}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm sm:text-base font-bold text-secondary">
                        {d.price}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-4 sm:px-5 py-3 flex items-center justify-between border-t border-border/50">
                  <span className="text-[10px] sm:text-xs text-muted-foreground">
                    ✅ Hotel + Car + Sightseeing
                  </span>
                  <Link to="/tours">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[10px] sm:text-xs h-7 px-3"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link to="/tours">
              <Button variant="outline" className="gap-2 text-sm">
                View All Packages <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <SectionHeading
            title="Why Choose Shivansh Travels?"
            subtitle="Thousands of happy customers trust us for their travel needs."
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {whyUs.map((w, i) => (
              <div
                key={i}
                className="text-center p-4 sm:p-6 rounded-lg bg-card border border-border/50 shadow-sm"
              >
                <div className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent flex items-center justify-center">
                  <w.icon className="h-6 w-6 sm:h-7 sm:w-7 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-xs sm:text-base">
                  {w.title}
                </h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with link to Reviews */}
      <section className="section-padding bg-primary">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">
              What Our Customers Say
            </h2>
            <div className="mt-3 sm:mt-4 mx-auto w-16 sm:w-20 h-1 bg-secondary rounded-full" />
            <p className="mt-3 text-primary-foreground/70 text-sm">
              Rated <strong className="text-secondary">4.9★</strong> by 500+
              happy customers
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-primary-foreground/10"
              >
                <div className="flex gap-0.5 mb-2">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-3.5 w-3.5 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="text-primary-foreground/90 text-xs sm:text-sm italic leading-relaxed">
                  "{t.text}"
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center text-secondary font-bold text-xs">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-secondary text-xs sm:text-sm">
                        {t.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-primary-foreground/60">
                        {t.city}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">
                    {t.trip}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link to="/reviews">
              <Button variant="hero" className="gap-2 text-sm">
                Read All Reviews <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions about our taxi services."
          />
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
          {/* Hidden FAQ schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            style={{ display: "none" }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-secondary to-secondary/80 text-center">
        <div className="container mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-secondary-foreground">
            Ready to Travel?
          </h2>
          <p className="mt-2 text-secondary-foreground/90 text-sm sm:text-base max-w-lg mx-auto">
            Book your ride in seconds via WhatsApp. No app download needed!
          </p>
          <div className="mt-6 flex justify-center gap-3 sm:gap-4 flex-wrap">
            <Link to="/contact">
              <Button
                variant="default"
                size="lg"
                className="text-sm sm:text-base"
              >
                Book Now
              </Button>
            </Link>
            <a href="tel:+918865038345">
              <Button
                variant="hero-outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 gap-2 text-sm sm:text-base"
              >
                <Phone className="h-4 w-4" /> Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
