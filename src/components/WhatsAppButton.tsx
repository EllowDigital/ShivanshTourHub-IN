import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Car,
  CheckCircle2,
  Copy,
  ExternalLink,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  RotateCcw,
  Send,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LocationAutocomplete from "@/components/LocationAutocomplete";
import {
  buildWhatsAppUrl,
  copyWhatsAppMessage,
  openWhatsAppMessage,
  WHATSAPP_CHAT_URL,
  WHATSAPP_HANDOFF_EVENT,
  WHATSAPP_NUMBER,
  type WhatsAppHandoff,
} from "@/lib/whatsapp";

const steps = [
  "pickup",
  "drop",
  "car",
  "date",
  "name",
  "phone",
  "confirm",
] as const;
type Step = (typeof steps)[number];
type Booking = {
  pickup: string;
  drop: string;
  car: string;
  date: string;
  time: string;
  passengers: number;
  name: string;
  phone: string;
  note: string;
};
const emptyBooking: Booking = {
  pickup: "",
  drop: "",
  car: "",
  date: "",
  time: "",
  passengers: 1,
  name: "",
  phone: "",
  note: "",
};
const DRAFT_KEY = "shivansh-chat-draft";

const prompts: Record<Step, string> = {
  pickup: "Hi! 👋 Where should we pick you up?",
  drop: "Great. Where are you going?",
  car: "Which car would you like?",
  date: "When do you want to travel?",
  name: "What's the passenger's name?",
  phone: "Your 10-digit mobile number, so we can confirm the fare.",
  confirm: "Here's your booking. Check it and send it on WhatsApp.",
};
const quickPlaces = [
  "Agra",
  "Delhi",
  "Agra Cantt Railway Station",
  "Delhi Airport (IGI)",
  "Mathura",
  "Jaipur",
];
const cars = [
  { name: "Swift Dzire", seats: 4, price: "₹11/km" },
  { name: "Ertiga", seats: 7, price: "₹14/km" },
  { name: "Toyota Innova", seats: 7, price: "₹16/km" },
  { name: "Tempo Traveller", seats: 12, price: "₹22/km" },
];
const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};
const cleanPhone = (v: string) =>
  v.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
export const isValidIndianMobile = (v: string) =>
  /^[6-9]\d{9}$/.test(cleanPhone(v));
const formatDate = (iso: string) =>
  iso
    ? new Date(`${iso}T00:00`).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
const formatTime = (t: string) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

export const buildChatBookingMessage = (b: Booking) =>
  [
    "*TAXI BOOKING REQUEST*",
    "Shivansh Tour & Travels",
    "",
    `*Name:* ${b.name.trim()}`,
    `*Phone:* +91 ${cleanPhone(b.phone)}`,
    `*Pickup:* ${b.pickup.trim()}`,
    `*Drop:* ${b.drop.trim()}`,
    `*Car:* ${b.car}`,
    `*Passengers:* ${b.passengers}`,
    `*Date:* ${formatDate(b.date)}${b.time ? `, ${formatTime(b.time)}` : ""}`,
    ...(b.note.trim() ? [`*Note:* ${b.note.trim()}`] : []),
    "",
    "Please confirm availability and fare.",
  ].join("\n");

const loadDraft = (): Booking => {
  try {
    return {
      ...emptyBooking,
      ...JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}"),
    };
  } catch {
    return emptyBooking;
  }
};

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<Booking>(loadDraft);
  const [returnToConfirm, setReturnToConfirm] = useState(false);
  const [error, setError] = useState("");
  const [handoff, setHandoff] = useState<WhatsAppHandoff | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const step = steps[stepIndex];

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {
      /* storage unavailable */
    }
  }, [data]);
  useEffect(() => {
    const onHandoff = (e: Event) => {
      setHandoff((e as CustomEvent<WhatsAppHandoff>).detail);
      setCopyStatus("");
      setOpen(true);
    };
    window.addEventListener(WHATSAPP_HANDOFF_EVENT, onHandoff);
    return () => window.removeEventListener(WHATSAPP_HANDOFF_EVENT, onHandoff);
  }, []);
  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);
  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "smooth",
    });
    setError("");
  }, [stepIndex, handoff]);

  const set = <K extends keyof Booking>(key: K, value: Booking[K]) =>
    setData((p) => ({ ...p, [key]: value }));
  const goTo = (i: number) => {
    setStepIndex(i);
  };
  const next = () => {
    if (step === "pickup" && data.pickup.trim().length < 2)
      return setError("Please enter a pickup location.");
    if (step === "drop") {
      if (data.drop.trim().length < 2)
        return setError("Please enter a drop location.");
      if (data.drop.trim().toLowerCase() === data.pickup.trim().toLowerCase())
        return setError("Pickup and drop can't be the same place.");
    }
    if (step === "car" && !data.car) return setError("Please choose a car.");
    if (step === "date" && (!data.date || data.date < todayISO()))
      return setError("Please choose today or a future date.");
    if (step === "name" && data.name.trim().length < 2)
      return setError("Please enter the passenger's name.");
    if (step === "phone" && !isValidIndianMobile(data.phone))
      return setError(
        "Enter a valid 10-digit mobile number (starts with 6–9).",
      );
    if (returnToConfirm) {
      setReturnToConfirm(false);
      return goTo(steps.length - 1);
    }
    goTo(stepIndex + 1);
  };
  const edit = (s: Step) => {
    setReturnToConfirm(true);
    goTo(steps.indexOf(s));
  };
  const restart = () => {
    setData(emptyBooking);
    setHandoff(null);
    setCopyStatus("");
    setReturnToConfirm(false);
    goTo(0);
  };
  const message = useMemo(() => buildChatBookingMessage(data), [data]);
  const send = () => openWhatsAppMessage(WHATSAPP_NUMBER, message);
  const copy = async () => {
    if (!handoff) return;
    setCopyStatus(
      (await copyWhatsAppMessage(handoff.message))
        ? "Copied! Paste it in WhatsApp chat."
        : "Select the text below and copy it.",
    );
  };

  const answers: { s: Step; icon: typeof MapPin; text: string }[] = [
    { s: "pickup", icon: MapPin, text: data.pickup },
    { s: "drop", icon: MapPin, text: data.drop },
    {
      s: "car",
      icon: Car,
      text:
        data.car &&
        `${data.car} · ${data.passengers} passenger${data.passengers > 1 ? "s" : ""}`,
    },
    {
      s: "date",
      icon: CalendarDays,
      text:
        data.date &&
        `${formatDate(data.date)}${data.time ? `, ${formatTime(data.time)}` : ""}`,
    },
    { s: "name", icon: User, text: data.name },
    {
      s: "phone",
      icon: Phone,
      text: data.phone && `+91 ${cleanPhone(data.phone)}`,
    },
  ];
  const maxSeats = cars.find((c) => c.name === data.car)?.seats ?? 12;
  const bubble =
    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm";
  const primaryBtn =
    "w-full gap-2 bg-success text-success-foreground hover:bg-success/90 h-11";

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-label="WhatsApp taxi booking"
          className="whatsapp-panel fixed z-[60] flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl outline-none animate-fade-up"
        >
          <header className="flex shrink-0 items-center justify-between gap-3 bg-success px-4 py-3 text-success-foreground">
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-success-foreground/15">
                <MessageCircle className="h-5 w-5" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-success bg-success-foreground" />
              </span>
              <div>
                <p className="text-sm font-semibold">Shivansh Travels</p>
                <p className="text-xs opacity-90">
                  Usually replies in minutes · 24×7
                </p>
              </div>
            </div>
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Start over"
                title="Start over"
                className="text-success-foreground hover:bg-success-foreground/10 hover:text-success-foreground"
                onClick={restart}
              >
                <RotateCcw />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close booking"
                className="text-success-foreground hover:bg-success-foreground/10 hover:text-success-foreground"
                onClick={() => {
                  setOpen(false);
                  launcherRef.current?.focus();
                }}
              >
                <X />
              </Button>
            </div>
          </header>
          {!handoff && (
            <div className="h-1 shrink-0 bg-muted" aria-hidden="true">
              <div
                className="h-full bg-success transition-all duration-300"
                style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>
          )}

          <div
            ref={bodyRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-muted/40 p-4"
          >
            {handoff ? (
              <div className="space-y-3">
                <div className="rounded-xl bg-card p-4 text-center shadow-sm">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
                  <h2 className="mt-2 text-lg font-semibold">Almost done!</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    WhatsApp opened in a new tab with your booking filled in.{" "}
                    <b className="text-foreground">Tap Send there</b>. Your trip
                    is confirmed once we reply.
                  </p>
                </div>
                {handoff.popupBlocked && (
                  <p
                    role="status"
                    className="rounded-lg bg-accent p-3 text-sm text-accent-foreground"
                  >
                    Your browser stopped the new tab. Tap the button below.
                  </p>
                )}
                <Button asChild className={primaryBtn}>
                  <a
                    href={buildWhatsAppUrl(handoff.phone, handoff.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink /> Open WhatsApp again
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full gap-2"
                  onClick={copy}
                >
                  <Copy /> Copy booking details
                </Button>
                <p role="status" className="text-center text-sm text-success">
                  {copyStatus}
                </p>
                <details className="rounded-lg bg-card p-3 text-sm shadow-sm">
                  <summary className="cursor-pointer font-medium">
                    See your message
                  </summary>
                  <textarea
                    aria-label="Booking message"
                    readOnly
                    value={handoff.message}
                    className="mt-2 min-h-44 w-full resize-y rounded-md border border-input bg-muted p-3 text-sm"
                    onFocus={(e) => e.target.select()}
                  />
                </details>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" onClick={() => setHandoff(null)}>
                    <ArrowLeft /> Edit booking
                  </Button>
                  <Button variant="ghost" onClick={restart}>
                    <RotateCcw /> New booking
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {answers.slice(0, stepIndex).map((a) => (
                  <div key={a.s} className="space-y-3">
                    <div className={`${bubble} bg-card`}>{prompts[a.s]}</div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => edit(a.s)}
                        className={`${bubble} group flex items-start gap-2 bg-success/15 text-left text-foreground`}
                        aria-label={`Change ${a.s}`}
                      >
                        <a.icon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="min-w-0 break-words">{a.text}</span>
                        <Pencil className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-50 group-hover:opacity-100" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className={`${bubble} bg-card font-medium`}>
                  {prompts[step]}
                </div>

                <div className="rounded-xl bg-card p-3 shadow-sm">
                  {step === "pickup" || step === "drop" ? (
                    <form
                      className="space-y-3"
                      onSubmit={(e) => {
                        e.preventDefault();
                        next();
                      }}
                    >
                      <LocationAutocomplete
                        value={data[step]}
                        onChange={(v) => set(step, v)}
                        placeholder={
                          step === "pickup"
                            ? "Type pickup area, hotel, station…"
                            : "Type destination city or place…"
                        }
                        variant={step}
                        required
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {quickPlaces
                          .filter((p) => step === "pickup" || p !== data.pickup)
                          .map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => set(step, p)}
                              className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${data[step] === p ? "border-success bg-success/10 text-success" : "border-border hover:border-success"}`}
                            >
                              {p}
                            </button>
                          ))}
                      </div>
                      <Button type="submit" className={primaryBtn}>
                        Continue <ArrowRight />
                      </Button>
                    </form>
                  ) : step === "car" ? (
                    <div className="space-y-2">
                      {cars.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() =>
                            setData((p) => ({
                              ...p,
                              car: c.name,
                              passengers: Math.min(p.passengers, c.seats),
                            }))
                          }
                          className={`flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left transition-colors ${data.car === c.name ? "border-success bg-success/5 ring-1 ring-success" : "border-border hover:border-success"}`}
                        >
                          <span className="flex items-center gap-3">
                            <Car className="h-5 w-5 text-primary" />
                            <span>
                              <span className="block text-sm font-semibold">
                                {c.name}
                              </span>
                              <span className="block text-xs text-muted-foreground">
                                Up to {c.seats} passengers
                              </span>
                            </span>
                          </span>
                          <span className="text-sm font-semibold text-primary">
                            {c.price}
                          </span>
                        </button>
                      ))}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-sm font-medium">Passengers</span>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            aria-label="Fewer passengers"
                            disabled={data.passengers <= 1}
                            onClick={() =>
                              set("passengers", data.passengers - 1)
                            }
                          >
                            −
                          </Button>
                          <span
                            className="w-6 text-center font-semibold"
                            aria-live="polite"
                          >
                            {data.passengers}
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            aria-label="More passengers"
                            disabled={data.passengers >= maxSeats}
                            onClick={() =>
                              set("passengers", data.passengers + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <Button className={primaryBtn} onClick={next}>
                        Continue <ArrowRight />
                      </Button>
                    </div>
                  ) : step === "date" ? (
                    <form
                      className="space-y-3"
                      onSubmit={(e) => {
                        e.preventDefault();
                        next();
                      }}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <label className="text-xs font-medium">
                          Date
                          <Input
                            type="date"
                            min={todayISO()}
                            value={data.date}
                            onChange={(e) => set("date", e.target.value)}
                            className="mt-1 h-11 text-base"
                            required
                          />
                        </label>
                        <label className="text-xs font-medium">
                          Time{" "}
                          <span className="text-muted-foreground">
                            (optional)
                          </span>
                          <Input
                            type="time"
                            value={data.time}
                            onChange={(e) => set("time", e.target.value)}
                            className="mt-1 h-11 text-base"
                          />
                        </label>
                      </div>
                      <div className="flex gap-1.5">
                        {[
                          ["Today", 0],
                          ["Tomorrow", 1],
                        ].map(([l, d]) => {
                          const t = new Date();
                          t.setDate(t.getDate() + Number(d));
                          t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
                          const iso = t.toISOString().slice(0, 10);
                          return (
                            <button
                              key={l}
                              type="button"
                              onClick={() => set("date", iso)}
                              className={`rounded-full border px-3 py-1 text-xs ${data.date === iso ? "border-success bg-success/10 text-success" : "border-border hover:border-success"}`}
                            >
                              {l}
                            </button>
                          );
                        })}
                      </div>
                      <Button type="submit" className={primaryBtn}>
                        Continue <ArrowRight />
                      </Button>
                    </form>
                  ) : step === "name" || step === "phone" ? (
                    <form
                      className="space-y-3"
                      onSubmit={(e) => {
                        e.preventDefault();
                        next();
                      }}
                    >
                      {step === "phone" ? (
                        <div className="flex h-11 items-center overflow-hidden rounded-md border border-input focus-within:ring-2 focus-within:ring-ring">
                          <span className="border-r border-input bg-muted px-3 text-sm">
                            +91
                          </span>
                          <input
                            aria-label="Mobile number"
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            maxLength={14}
                            value={data.phone}
                            onChange={(e) =>
                              set(
                                "phone",
                                e.target.value.replace(/[^\d\s+]/g, ""),
                              )
                            }
                            placeholder="98765 43210"
                            className="h-full min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <Input
                          aria-label="Passenger name"
                          autoComplete="name"
                          value={data.name}
                          onChange={(e) => set("name", e.target.value)}
                          placeholder="Full name"
                          className="h-11 text-base"
                          autoFocus
                        />
                      )}
                      <Button type="submit" className={primaryBtn}>
                        Continue <ArrowRight />
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-3">
                      <textarea
                        aria-label="Note (optional)"
                        value={data.note}
                        onChange={(e) => set("note", e.target.value)}
                        maxLength={300}
                        rows={2}
                        placeholder="Anything else? Round trip, luggage, flight no… (optional)"
                        className="w-full resize-none rounded-md border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                      />
                      <p className="text-xs text-muted-foreground">
                        Tap any of your answers above to change it.
                      </p>
                      <Button className={primaryBtn} onClick={send}>
                        <Send /> Send on WhatsApp
                      </Button>
                    </div>
                  )}
                  {error && (
                    <p role="alert" className="mt-2 text-sm text-destructive">
                      {error}
                    </p>
                  )}
                </div>
                {stepIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 px-1"
                    onClick={() => {
                      setReturnToConfirm(false);
                      goTo(stepIndex - 1);
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                )}
              </>
            )}
          </div>
          <footer className="flex shrink-0 items-center justify-center gap-4 border-t border-border px-3 py-2 text-xs">
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="flex items-center gap-1 font-medium text-primary"
            >
              <Phone className="h-3.5 w-3.5" /> Call +91 88650 38345
            </a>
            <a
              href={WHATSAPP_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-medium text-success"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Just chat
            </a>
          </footer>
        </div>
      )}
      <Button
        ref={launcherRef}
        size="icon"
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        className="whatsapp-launcher fixed z-50 h-14 w-14 rounded-full bg-success text-success-foreground shadow-lg transition-transform hover:scale-105 hover:bg-success/90"
        aria-label={open ? "Minimize WhatsApp booking" : "Book via WhatsApp"}
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </>
  );
};
export default WhatsAppButton;
