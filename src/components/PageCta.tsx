import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openWhatsAppMessage, WHATSAPP_NUMBER } from "@/lib/whatsapp";

type Props = { title?: string; text?: string; message?: string };

const PageCta = ({
  title = "Ready to travel? Chalo, let's plan it.",
  text = "Share your trip on WhatsApp or call us — we reply quickly, 24/7.",
  message = "Namaste! I would like to plan a trip with Shivansh Tour and Travels.",
}: Props) => (
  <section className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="relative overflow-hidden rounded-xl bg-primary px-5 py-8 text-center text-primary-foreground sm:px-10 sm:py-12">
        <div className="heritage-rule absolute inset-x-0 top-0" aria-hidden="true" />
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm opacity-90 sm:text-base">{text}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="hero" size="lg" className="gap-2" onClick={() => openWhatsAppMessage(WHATSAPP_NUMBER, message)}>
            <MessageCircle className="h-5 w-5" /> Enquire on WhatsApp
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <a href="tel:+918865038345"><Phone className="h-5 w-5" /> Call Now</a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default PageCta;
