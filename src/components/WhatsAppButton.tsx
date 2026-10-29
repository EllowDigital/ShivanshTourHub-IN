import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Car, Check, CheckCircle2, Copy, ExternalLink, MapPin, MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LocationAutocomplete from "@/components/LocationAutocomplete";
import { buildWhatsAppUrl, copyWhatsAppMessage, openWhatsAppMessage, WHATSAPP_HANDOFF_EVENT, WHATSAPP_NUMBER, type WhatsAppHandoff } from "@/lib/whatsapp";

const steps = ["pickup", "drop", "car", "date", "name", "phone", "confirm"] as const;
type Step = typeof steps[number];
const emptyBooking = { pickup: "", drop: "", car: "", date: "", name: "", phone: "" };
const questions: Record<Step, { title: string; label: string }> = {
  pickup: { title: "Where should we pick you up?", label: "Pickup location" },
  drop: { title: "Where are you heading?", label: "Drop location" },
  car: { title: "Choose your ride", label: "Car type" },
  date: { title: "When are you travelling?", label: "Travel date and time" },
  name: { title: "Who are we picking up?", label: "Passenger name" },
  phone: { title: "Your contact number", label: "Phone number" },
  confirm: { title: "Your trip, at a glance", label: "Booking summary" },
};
const cars = [
  { name: "Swift Dzire", seats: "4 Seater", price: "₹11/km" },
  { name: "Ertiga", seats: "7 Seater", price: "₹14/km" },
  { name: "Toyota Innova", seats: "7 Seater Premium", price: "₹16/km" },
  { name: "Tempo Traveller", seats: "12 Seater", price: "₹22/km" },
];

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState(emptyBooking);
  const [handoff, setHandoff] = useState<WhatsAppHandoff | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const step = steps[stepIndex];

  useEffect(() => {
    const handleHandoff = (event: Event) => {
      setHandoff((event as CustomEvent<WhatsAppHandoff>).detail);
      setCopyStatus("");
      setOpen(true);
    };
    window.addEventListener(WHATSAPP_HANDOFF_EVENT, handleHandoff);
    return () => window.removeEventListener(WHATSAPP_HANDOFF_EVENT, handleHandoff);
  }, []);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); launcherRef.current?.focus(); }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);

  const update = (value: string) => setData(previous => ({ ...previous, [step]: value }));
  const restart = () => {
    setData(emptyBooking); setStepIndex(0); setStarted(true); setHandoff(null); setCopyStatus("");
  };
  const send = () => {
    const message = [
      "*TAXI BOOKING REQUEST*", "Shivansh Tour & Travels", "",
      `*Name:* ${data.name.trim()}`, `*Phone:* ${data.phone.trim()}`,
      `*Pickup:* ${data.pickup.trim()}`, `*Drop:* ${data.drop.trim()}`,
      `*Car:* ${data.car}`, `*Travel date & time:* ${data.date.trim()}`, "",
      "Please confirm availability and fare.",
    ].join("\n");
    openWhatsAppMessage(WHATSAPP_NUMBER, message);
  };
  const copy = async () => {
    if (!handoff) return;
    const copied = await copyWhatsAppMessage(handoff.message);
    setCopyStatus(copied ? "Booking details copied." : "Select and copy the booking details below.");
  };

  return <>
    {open && <div ref={panelRef} tabIndex={-1} role="dialog" aria-label="WhatsApp taxi booking" className="whatsapp-panel fixed z-[60] flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2xl outline-none animate-fade-up">
      <header className="flex shrink-0 items-center justify-between gap-3 bg-success p-4 text-success-foreground">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-6 w-6" />
          <div><p className="text-sm font-semibold">Shivansh Travels</p><p className="text-xs opacity-90">Taxi booking enquiry</p></div>
        </div>
        <Button variant="ghost" size="icon" aria-label="Close booking" className="shrink-0 text-success-foreground hover:bg-success-foreground/10 hover:text-success-foreground" onClick={() => { setOpen(false); launcherRef.current?.focus(); }}><X /></Button>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5">
        {handoff ? <div className="space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success"><CheckCircle2 className="h-6 w-6" /></div>
          <h2 className="text-xl font-semibold">Your enquiry is ready</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">Tap Send in WhatsApp to share your booking. Your trip is confirmed after our reply.</p>
          {handoff.popupBlocked && <p role="status" className="rounded-md bg-accent p-3 text-sm text-accent-foreground">The browser blocked the new window. Try the link below or copy your details.</p>}
          <Button asChild className="w-full gap-2 bg-success text-success-foreground hover:bg-success/90"><a href={buildWhatsAppUrl(handoff.phone, handoff.message)} target="_blank" rel="noopener noreferrer"><ExternalLink /> Open WhatsApp</a></Button>
          <Button variant="outline" className="w-full" onClick={copy}><Copy /> Copy booking details</Button>
          <p className="text-xs text-muted-foreground">WhatsApp not opening? Your message is saved here.</p>
          <textarea aria-label="Booking message" readOnly value={handoff.message} className="min-h-40 w-full resize-y rounded-md border border-input bg-muted p-3 text-sm leading-relaxed text-foreground" onFocus={event => event.target.select()} />
          <p role="status" className="text-sm text-success">{copyStatus}</p>
          <Button variant="ghost" className="w-full" onClick={restart}><RotateCcw /> New enquiry</Button>
        </div> : !started ? <div className="space-y-5 py-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success"><Car className="h-7 w-7" /></div>
          <h2 className="text-2xl font-semibold">Let's plan your ride.</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">A city ride, airport transfer or a journey further afield — where are you going?</p>
          <Button className="w-full bg-success text-success-foreground hover:bg-success/90" onClick={() => setStarted(true)}>Start Booking <ArrowRight /></Button>
          <a className="block text-center text-sm font-medium text-primary underline underline-offset-4" href={`tel:+${WHATSAPP_NUMBER}`}>Prefer to call? +91 88650 38345</a>
        </div> : <div className="space-y-5">
          <div className="flex items-center justify-between"><p className="text-xs font-medium text-muted-foreground">STEP {stepIndex + 1} OF {steps.length}</p><Button variant="ghost" size="icon" aria-label="Start over" title="Start over" onClick={restart}><RotateCcw /></Button></div>
          <div className="flex gap-1.5" aria-hidden="true">{steps.map((key, index) => <span key={key} className={`h-1 flex-1 rounded-full ${index <= stepIndex ? "bg-success" : "bg-muted"}`} />)}</div>
          {(data.pickup || data.drop) && <div className="space-y-2 border-b border-border pb-4 text-sm">
            {data.pickup && <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-success" /><span className="min-w-0 break-words">{data.pickup}</span></p>}
            {data.drop && <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" /><span className="min-w-0 break-words">{data.drop}</span></p>}
          </div>}
          <h2 className="text-xl font-semibold">{questions[step].title}</h2>
          {step === "car" ? <div className="space-y-2">{cars.map(car => <Button key={car.name} variant="outline" className={`h-auto w-full justify-between gap-3 p-3 text-left ${data.car === car.name ? "border-success bg-success/5" : ""}`} onClick={() => { setData(previous => ({ ...previous, car: car.name })); setStepIndex(3); }}>
            <span className="min-w-0 whitespace-normal"><span className="block font-semibold">{car.name}</span><span className="block text-xs font-normal text-muted-foreground">{car.seats}</span></span><span className="shrink-0 text-primary">{car.price}</span>
          </Button>)}</div> : step === "confirm" ? <div className="space-y-4">
            <dl className="space-y-3 text-sm">{steps.filter(key => key !== "confirm").map(key => <div key={key} className="grid grid-cols-[100px_minmax(0,1fr)] gap-3"><dt className="text-muted-foreground">{questions[key].label}</dt><dd className="break-words font-medium">{data[key as keyof typeof data]}</dd></div>)}</dl>
            <Button className="w-full bg-success text-success-foreground hover:bg-success/90" onClick={send}><Send /> Continue to WhatsApp</Button>
          </div> : <form className="space-y-4" onSubmit={event => { event.preventDefault(); if (data[step].trim()) setStepIndex(index => index + 1); }}>
            <label className="block text-sm font-medium" htmlFor="chat-booking-input">{questions[step].label}</label>
            {step === "pickup" || step === "drop" ? <LocationAutocomplete value={data[step]} onChange={update} placeholder={`Enter ${step} location`} variant={step === "pickup" ? "pickup" : "drop"} required /> : <Input id="chat-booking-input" aria-label={questions[step].label} value={data[step]} onChange={event => update(event.target.value)} type={step === "phone" ? "tel" : "text"} autoComplete={step === "name" ? "name" : step === "phone" ? "tel" : "off"} placeholder={step === "date" ? "e.g. 30 October 2026, 8 AM" : questions[step].label} required className="h-12 min-w-0 text-base" />}
            <Button type="submit" disabled={!data[step].trim()} className="w-full bg-success text-success-foreground hover:bg-success/90">Continue <ArrowRight /></Button>
          </form>}
          <Button variant="ghost" className="gap-2 px-0" onClick={() => stepIndex > 0 ? setStepIndex(index => index - 1) : setStarted(false)}><ArrowLeft /> Back</Button>
        </div>}
      </div>
    </div>}
    <Button ref={launcherRef} size="icon" aria-expanded={open} onClick={() => setOpen(previous => !previous)} className="whatsapp-launcher fixed z-50 h-14 w-14 rounded-full bg-success text-success-foreground shadow-lg transition-transform hover:scale-105 hover:bg-success/90" aria-label={open ? "Minimize WhatsApp booking" : "Book via WhatsApp"}>{open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}</Button>
  </>;
};
export default WhatsAppButton;
