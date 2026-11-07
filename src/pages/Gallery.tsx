import PageCta from "@/components/PageCta";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import tajMahal from "@/assets/gallery/taj-mahal.jpg?w=1200&format=webp";
import happyFamily from "@/assets/gallery/happy-family.jpg?w=1200&format=webp";
import varanasiGhats from "@/assets/gallery/varanasi-ghats.jpg?w=1200&format=webp";
import jaipurHawaMahal from "@/assets/gallery/jaipur-hawa-mahal.jpg?w=1200&format=webp";
import manaliMountains from "@/assets/gallery/manali-mountains.jpg?w=1200&format=webp";
import ayodhyaTemple from "@/assets/gallery/ayodhya-temple.jpg?w=1200&format=webp";
import innovaTrip from "@/assets/gallery/innova-trip.jpg?w=1200&format=webp";
import rishikeshBridge from "@/assets/gallery/rishikesh-bridge.jpg?w=1200&format=webp";

const galleryItems = [
  {
    img: tajMahal,
    title: "Taj Mahal, Agra",
    category: "Destinations",
    desc: "Sunrise at the iconic Taj Mahal",
    alt: "Taj Mahal Agra sightseeing by taxi service",
  },
  {
    img: happyFamily,
    title: "Happy Customers",
    category: "Customers",
    desc: "Family trip to a heritage site with our sedan",
    alt: "Happy family on Agra outstation cab tour",
  },
  {
    img: varanasiGhats,
    title: "Varanasi Ghats",
    category: "Destinations",
    desc: "Evening aarti at the sacred ghats of Varanasi",
    alt: "Varanasi ghat tour from Agra by taxi",
  },
  {
    img: jaipurHawaMahal,
    title: "Hawa Mahal, Jaipur",
    category: "Destinations",
    desc: "The stunning Palace of Winds in Jaipur",
    alt: "Jaipur Hawa Mahal road trip taxi from Agra",
  },
  {
    img: manaliMountains,
    title: "Road to Manali",
    category: "Road Trips",
    desc: "Scenic mountain road to Manali",
    alt: "Manali road trip with Delhi and Agra cab service",
  },
  {
    img: ayodhyaTemple,
    title: "Ayodhya Temple",
    category: "Destinations",
    desc: "Grand temple architecture in Ayodhya",
    alt: "Ayodhya temple darshan taxi tour package",
  },
  {
    img: innovaTrip,
    title: "Our Innova on Tour",
    category: "Fleet",
    desc: "Toyota Innova ready for an outstation trip",
    alt: "Toyota Innova outstation taxi in Agra",
  },
  {
    img: rishikeshBridge,
    title: "Rishikesh Bridge",
    category: "Road Trips",
    desc: "Iconic suspension bridge at sunset in Rishikesh",
    alt: "Rishikesh trip from Agra and Delhi by cab",
  },
];

const categories = ["All", "Destinations", "Road Trips", "Customers", "Fleet"];

const Gallery = () => {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered =
    active === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === active);

  return (
    <div className="pt-14 sm:pt-16 lg:pt-[88px]">
      <SEO
        title="Photo Gallery | Shivansh Tour & Travels | Trip Photos & Destinations"
        description="Browse photos from our trips to Taj Mahal, Varanasi, Jaipur, Manali, Rishikesh & more. See our fleet and happy customer moments."
        keywords="travel photos india, taxi trip gallery, agra trip photos, varanasi tour photos, jaipur photos, travel agency gallery"
        canonical="https://shivansh-tour-hub.netlify.app/gallery"
      />
      <section className="page-header">
        <div className="container mx-auto text-center">
          <h1 className="page-header-title">Photo Gallery</h1>
          <p className="page-header-subtitle">
            Explore photos from our trips, destinations, and happy customers
            across India.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
            {categories.map((cat) => (
              <Button
                variant="ghost"
                key={cat}
                aria-pressed={active === cat}
                onClick={() => setActive(cat)}
                className={`h-11 px-4 rounded-md text-sm font-medium transition-colors ${active === cat ? "bg-secondary text-secondary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"}`}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((g, i) => (
              <Button
                variant="ghost"
                key={i}
                aria-label={`View ${g.title} photo`}
                className="group h-auto block p-0 whitespace-normal text-left rounded-lg overflow-hidden hover-lift border border-border bg-card"
                onClick={() => setLightbox(galleryItems.indexOf(g))}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={g.img}
                    alt={g.alt}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={900}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-muted-foreground">
                    {g.category}
                  </span>
                  <h3 className="font-heading font-semibold text-foreground text-base mt-1">
                    {g.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{g.desc}</p>
                </div>
              </Button>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Camera className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-secondary text-center">
        <div className="container mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-secondary-foreground">
            Want to Create Your Own Travel Memories?
          </h2>
          <p className="mt-2 text-secondary-foreground/90 text-sm sm:text-base">
            Book a trip with us and explore India's best destinations.
          </p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <Link to="/tours">
              <Button
                variant="default"
                size="lg"
                className="text-sm sm:text-base"
              >
                View Tour Packages
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="hero-outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 text-sm sm:text-base"
              >
                Book a Taxi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <Dialog
          open
          onOpenChange={(value) => {
            if (!value) setLightbox(null);
          }}
        >
          <DialogContent className="z-[100] w-[calc(100%-2rem)] max-w-4xl max-h-[90dvh] overflow-y-auto p-4 pt-12">
            <img
              src={galleryItems[lightbox].img}
              alt={galleryItems[lightbox].alt}
              className="w-full max-h-[60dvh] object-contain rounded-lg"
              loading="lazy"
            />
            <div className="text-center mt-4">
              <DialogTitle className="font-heading font-bold text-foreground text-lg">
                {galleryItems[lightbox].title}
              </DialogTitle>
              <DialogDescription className="mt-2 text-muted-foreground text-sm">
                {galleryItems[lightbox].desc}
              </DialogDescription>
            </div>
            <div className="flex justify-center gap-3 mt-4">
              <Button
                variant="outline"
                className="h-11"
                disabled={lightbox === 0}
                onClick={() =>
                  setLightbox((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : prev,
                  )
                }
              >
                <ArrowLeft /> Previous
              </Button>
              <Button
                variant="outline"
                className="h-11"
                disabled={lightbox === galleryItems.length - 1}
                onClick={() =>
                  setLightbox((prev) =>
                    prev !== null && prev < galleryItems.length - 1
                      ? prev + 1
                      : prev,
                  )
                }
              >
                Next <ArrowRight />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <PageCta
        title="Want memories like these?"
        text="Plan your own Indian journey with a trusted driver and comfortable car."
      />
    </div>
  );
};

export default Gallery;
