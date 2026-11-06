import BookingActions from "@/components/BookingActions";

type Props = { title?: string; text?: string; message?: string };

const PageCta = ({
  title = "Ready to travel? Chalo, let's plan it.",
  text = "Share your trip on WhatsApp or call us — we reply quickly, 24/7.",
  message = "Namaste! I would like to plan a trip with Shivansh Tour and Travels.",
}: Props) => (
  <section className="section-padding bg-primary text-primary-foreground relative">
    <div className="heritage-rule absolute inset-x-0 top-0" aria-hidden="true" />
    <div className="container mx-auto">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm opacity-90 sm:text-base">{text}</p>
        <div className="mt-6"><BookingActions onDark message={message} /></div>
      </div>
    </div>
  </section>
);

export default PageCta;
