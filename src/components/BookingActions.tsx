import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_CALL_URL } from "@/lib/contact";
import { openWhatsAppMessage, WHATSAPP_NUMBER } from "@/lib/whatsapp";

type Props = { message?: string; onDark?: boolean; compact?: boolean };

const BookingActions = ({
  message = "Namaste! I would like to book a trip with Shivansh Tour and Travels.",
  onDark = false,
  compact = false,
}: Props) => (
  <div className={`grid gap-3 ${compact ? "grid-cols-1 min-[360px]:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 sm:mx-auto sm:max-w-md"}`}>
    <Button variant="hero" size={compact ? "default" : "lg"} className="h-12 px-3" onClick={() => openWhatsAppMessage(WHATSAPP_NUMBER, message)}>
      <MessageCircle /> {compact ? "Book on WhatsApp" : "Enquire on WhatsApp"}
    </Button>
    <Button asChild variant={onDark ? "hero-outline" : "outline"} size={compact ? "default" : "lg"} className="h-12 px-3">
      <a href={BUSINESS_CALL_URL}><Phone /> Call Now</a>
    </Button>
  </div>
);

export default BookingActions;