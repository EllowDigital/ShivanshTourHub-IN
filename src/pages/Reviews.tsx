import { WHATSAPP_CHAT_URL } from "@/lib/whatsapp";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Star, Quote, Phone, MessageCircle } from "lucide-react";

const allReviews = [
  {
    name: "Rahul Sharma",
    city: "Agra",
    text: "Excellent service! The driver was very professional and the car was spotless. Booked via WhatsApp and it was so easy! Will definitely use again for all my trips.",
    rating: 5,
    trip: "Agra to Delhi",
    date: "Feb 2026",
  },
  {
    name: "Priya Singh",
    city: "Delhi",
    text: "Best taxi service from Agra. Used them for our family trip to Varanasi. Very comfortable Innova and affordable pricing. The driver knew all the best routes.",
    rating: 5,
    trip: "Agra to Varanasi",
    date: "Jan 2026",
  },
  {
    name: "Amit Verma",
    city: "Lucknow",
    text: "Very punctual and affordable. The booking was super easy via WhatsApp. Great experience for our Ayodhya trip! The driver was knowledgeable about all temples.",
    rating: 5,
    trip: "Agra to Ayodhya",
    date: "Dec 2025",
  },
  {
    name: "Sunita Gupta",
    city: "Mathura",
    text: "We booked the Rajasthan tour package and everything was perfectly arranged. Hotel, sightseeing, car — all top notch. The driver was friendly and helpful.",
    rating: 5,
    trip: "Rajasthan Tour",
    date: "Nov 2025",
  },
  {
    name: "Vikash Yadav",
    city: "Noida",
    text: "Booked a cab for airport pickup at 4 AM and the driver was already waiting. Very reliable service. Clean car, smooth ride. Highly recommended!",
    rating: 5,
    trip: "Airport Pickup",
    date: "Jan 2026",
  },
  {
    name: "Meena Devi",
    city: "Jaipur",
    text: "Used Shivansh Travels for our pilgrimage tour covering Mathura, Vrindavan, and Ayodhya. The driver was patient at every temple stop. Excellent experience.",
    rating: 5,
    trip: "Pilgrimage Tour",
    date: "Oct 2025",
  },
  {
    name: "Rajesh Kumar",
    city: "Kanpur",
    text: "Best outstation taxi service I've used. The Ertiga was clean and comfortable for our family of 6. Very reasonable pricing with no hidden charges.",
    rating: 4,
    trip: "Agra to Kanpur",
    date: "Feb 2026",
  },
  {
    name: "Anita Patel",
    city: "Gurgaon",
    text: "Corporate travel for our team to Agra. Professional drivers, well-maintained cars, and the billing was transparent. Now our regular travel partner.",
    rating: 5,
    trip: "Corporate Trip",
    date: "Dec 2025",
  },
  {
    name: "Mohit Agarwal",
    city: "Agra",
    text: "Booked Tempo Traveller for our group trip to Manali. Amazing experience! The vehicle was comfortable even on hilly roads. Driver was very experienced.",
    rating: 5,
    trip: "Agra to Manali",
    date: "Sep 2025",
  },
  {
    name: "Kavita Sharma",
    city: "Delhi",
    text: "Family trip to Shimla-Manali. Everything from pickup to drop was smooth. The driver recommended great local food spots. Will book again!",
    rating: 5,
    trip: "Shimla Manali Tour",
    date: "Oct 2025",
  },
  {
    name: "Deepak Tiwari",
    city: "Prayagraj",
    text: "Very affordable and reliable. The Swift Dzire was perfect for our couple trip. No hidden charges — exactly what was quoted. 5 star service!",
    rating: 5,
    trip: "Agra to Prayagraj",
    date: "Nov 2025",
  },
  {
    name: "Neha Rastogi",
    city: "Agra",
    text: "I've been using Shivansh for over a year now. Whether it's a quick local ride or an outstation trip, they never disappoint. Truly the best in Agra.",
    rating: 5,
    trip: "Regular Customer",
    date: "Ongoing",
  },
];

const avgRating = (
  allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length
).toFixed(1);

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Shivansh Tour and Travels",
  image: "https://shivansh-tour-hub.netlify.app/og-image.jpg",
  url: "https://shivansh-tour-hub.netlify.app/reviews",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Ganga Enclave Phase-2, Near Khel Gaon Khel Road, Dayal Bagh",
    addressLocality: "Agra",
    addressRegion: "Uttar Pradesh",
    postalCode: "282005",
    addressCountry: "IN",
  },
  telephone: "+918865038345",
};

const Reviews = () => (
  <div className="pt-14 sm:pt-16 lg:pt-[88px]">
    <SEO
      title="Customer Reviews | Shivansh Tour & Travels | Rated 4.9★ Taxi Service Agra"
      description={`Read ${allReviews.length}+ genuine reviews from happy customers. Shivansh Tour & Travels rated ${avgRating}/5 for taxi service in Agra, outstation cabs, airport transfers & tour packages.`}
      keywords="shivansh travels reviews, agra taxi reviews, best taxi service agra reviews, customer testimonials taxi agra, cab booking reviews agra"
      canonical="https://shivansh-tour-hub.netlify.app/reviews"
      schema={localBusinessSchema}
    />

    <section className="page-header">
      <div className="container mx-auto text-center">
        <h1 className="page-header-title">Customer Reviews</h1>
        <p className="page-header-subtitle">
          Don't just take our word for it — hear from our happy customers.
        </p>
      </div>
    </section>

    {/* Rating Summary */}
    <section className="bg-accent py-8 sm:py-10">
      <div className="container mx-auto text-center">
        <div className="inline-flex flex-col items-center bg-card rounded-2xl px-8 py-6 shadow-md border border-border/50">
          <p className="font-heading text-4xl sm:text-5xl font-extrabold text-foreground">
            {avgRating}
          </p>
          <div className="flex gap-0.5 mt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-5 w-5 ${s <= Math.round(Number(avgRating)) ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Based on {allReviews.length}+ verified reviews
          </p>
        </div>
      </div>
    </section>

    {/* All Reviews */}
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {allReviews.map((r, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-5 sm:p-6 border border-border/50 shadow-sm hover-lift relative"
            >
              <Quote className="absolute top-4 right-4 h-6 w-6 text-secondary/15" />
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-3.5 w-3.5 ${s <= r.rating ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed italic">
                "{r.text}"
              </p>
              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center text-secondary font-bold text-xs">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-xs sm:text-sm">
                      {r.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {r.city}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                    {r.trip}
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {r.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-primary text-center">
      <div className="container mx-auto">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary-foreground">
          Join Our Happy Customers
        </h2>
        <p className="mt-2 text-primary-foreground/80 text-sm sm:text-base max-w-lg mx-auto">
          Book your ride today and experience why thousands trust Shivansh
          Travels.
        </p>
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <Link to="/contact">
            <Button
              variant="hero"
              size="lg"
              className="gap-2 text-sm sm:text-base"
            >
              Book Now
            </Button>
          </Link>
          <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer">
            <Button
              variant="hero-outline"
              size="lg"
              className="gap-2 text-sm sm:text-base"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  </div>
);

export default Reviews;
