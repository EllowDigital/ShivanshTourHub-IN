import PageCta from "@/components/PageCta";
import BookingActions from "@/components/BookingActions";
import {
  BUSINESS_PHONE,
  BUSINESS_PHONE_LABEL,
  BUSINESS_CALL_URL,
} from "@/lib/contact";
import { WHATSAPP_CHAT_URL } from "@/lib/whatsapp";
import BookingForm from "@/components/BookingForm";
import SEO from "@/components/SEO";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: BUSINESS_PHONE_LABEL,
    href: BUSINESS_CALL_URL,
  },
  {
    icon: Phone,
    title: "Alternate Phone",
    content: "+91 7505075626",
    href: "tel:+917505075626",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    content: "Chat on WhatsApp",
    href: WHATSAPP_CHAT_URL,
  },
  {
    icon: Mail,
    title: "Email",
    content: "shivanshtourandtravel.in@gmail.com",
    href: "mailto:shivanshtourandtravel.in@gmail.com",
  },
  {
    icon: MapPin,
    title: "Address",
    content:
      "Ganga Enclave Phase-2, Near Khel Gaon Khel Road, Dayal Bagh, Agra, Uttar Pradesh - 282005",
  },
  { icon: Clock, title: "Working Hours", content: "24/7 — Always Available" },
];

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Shivansh Tour and Travels",
  url: "https://shivansh-tour-hub.netlify.app/contact",
  image: "https://shivansh-tour-hub.netlify.app/og-image.jpg",
  telephone: BUSINESS_PHONE,
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
      telephone: BUSINESS_PHONE,
      contactType: "customer service",
    },
    {
      "@type": "ContactPoint",
      telephone: "+917505075626",
      contactType: "customer service",
    },
  ],
  openingHours: "Mo-Su 00:00-23:59",
  areaServed: [
    "Agra",
    "Delhi",
    "Noida",
    "Gurgaon",
    "Mathura",
    "Jaipur",
    "Lucknow",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://shivansh-tour-hub.netlify.app",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: "https://shivansh-tour-hub.netlify.app/contact",
    },
  ],
};

const Contact = () => (
  <div>
    <SEO
      title="Contact Us | Book Taxi in Agra | Call +91 8865038345 / +91 7505075626"
      description="Contact Shivansh Tour & Travels for taxi bookings, tour packages & custom quotes. Call +91 8865038345 or +91 7505075626, WhatsApp on +91 8865038345, or email us. 24/7 service from Agra."
      keywords="contact taxi agra, book cab agra, taxi booking phone number agra, whatsapp taxi booking, agra travel agency contact"
      canonical="https://shivansh-tour-hub.netlify.app/contact"
      schema={[contactSchema, breadcrumbSchema]}
    />
    <section className="page-header">
      <div className="container mx-auto text-center">
        <h1 className="page-header-title">Contact Us</h1>
        <p className="page-header-subtitle">
          Get in touch for bookings, queries, or custom tour packages.
        </p>
        <div className="mt-6">
          <BookingActions onDark />
        </div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 sm:gap-12 items-start">
        <div>
          <p className="travel-eyebrow mb-3">Your Agra travel desk</p>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-5 sm:mb-6">
            Get In Touch
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {contactInfo.map((c, i) => (
              <div key={i} className="travel-card flex items-start gap-3 p-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <c.icon className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">
                    {c.title}
                  </h3>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-secondary transition-colors text-sm break-words [overflow-wrap:anywhere] min-h-11 inline-flex items-center"
                    >
                      {c.content}
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {c.content}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 sm:mt-8 rounded-lg overflow-hidden shadow-md border border-border/50">
            <iframe
              title="Shivansh Tour and Travels Location in Agra"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.38256437284!2d78.0081!3d27.1767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747121d702ff6d%3A0xdd2ae4803f767dde!2sAgra%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="220"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="min-w-0">
          <p className="travel-eyebrow mb-3">Tell us where you're headed</p>
          <h2 className="mb-5 text-2xl font-bold">Plan your pickup</h2>
          <BookingForm />
        </div>
      </div>
    </section>
    <PageCta
      title="Prefer a quick chat?"
      text="Message us on WhatsApp or call — we reply 24/7."
    />
  </div>
);

export default Contact;
