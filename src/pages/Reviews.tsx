import PageCta from "@/components/PageCta";
import BookingActions from "@/components/BookingActions";
import { useState } from "react";

import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Star, Quote, MapPin } from "lucide-react";

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

const Reviews = () => {
  const [filter, setFilter] = useState("All trips");
  const filters = ["All trips", "Taxi rides", "Tours"];
  const isTour = (trip: string) => /tour|manali/i.test(trip);
  const shown = allReviews.filter(r => filter === "All trips" || (filter === "Tours" ? isTour(r.trip) : !isTour(r.trip)));
  return (
  <div>
    <SEO title="Customer Reviews | Shivansh Tour & Travels" description="Read traveller feedback on taxi rides and tour packages with Shivansh Tour and Travels in Agra." canonical="https://shivansh-tour-hub.netlify.app/reviews" schema={localBusinessSchema} />
    <section className="page-header">
      <div className="container mx-auto text-center">
        <h1 className="page-header-title">Customer Reviews</h1>
        <p className="page-header-subtitle">Journeys to remember, in our travellers' own words.</p>
        <div className="mt-6"><BookingActions onDark /></div>
      </div>
    </section>
    <section className="bg-muted px-4 py-8 sm:px-6">
      <div className="container mx-auto flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10">
        <div className="flex items-center gap-4">
          <p className="font-heading text-5xl font-bold">{avgRating}<span className="ml-1 text-lg text-muted-foreground">/5</span></p>
          <div><div className="flex gap-1" aria-label={`${avgRating} out of 5 stars`}>{[1,2,3,4,5].map(s => <Star key={s} className="h-5 w-5 fill-secondary text-secondary" aria-hidden="true" />)}</div><p className="mt-2 text-sm text-muted-foreground">Across {allReviews.length} displayed reviews</p></div>
        </div>
        <div className="border-t border-border pt-4 text-center sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0 sm:text-left"><h2 className="text-lg font-semibold">Every trip has a story</h2><p className="mt-1 text-sm text-muted-foreground">Family holidays, temple visits and everyday rides.</p></div>
      </div>
    </section>
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="travel-toolbar" role="group" aria-label="Filter reviews by trip">
          {filters.map(f => <Button key={f} variant={filter === f ? "default" : "outline"} className="h-11" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</Button>)}
          <p className="text-sm text-muted-foreground sm:ml-auto" role="status">{shown.length} reviews</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map(r => <article key={r.name} className="travel-card flex flex-col p-5 sm:p-6">
            <div className="flex items-center justify-between"><div className="flex gap-1" aria-label={`${r.rating} out of 5 stars`}>{[1,2,3,4,5].map(s => <Star key={s} aria-hidden="true" className={`h-4 w-4 ${s <= r.rating ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`} />)}</div><Quote className="h-6 w-6 text-secondary/40" aria-hidden="true" /></div>
            <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">“{r.text}”</p>
            <div className="mt-6 border-t border-border pt-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground" aria-hidden="true">{r.name[0]}</span><div className="min-w-0"><h2 className="font-body text-sm font-semibold">{r.name}</h2><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{r.city}</p></div></div><div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs"><span className="font-medium text-primary">{r.trip}</span><span className="text-muted-foreground">{r.date}</span></div></div>
          </article>)}
        </div>
      </div>
    </section>
    <PageCta title="Your next travel story starts here" text="Discuss your taxi or tour plans with our team." />
  </div>
  );
};
export default Reviews;
