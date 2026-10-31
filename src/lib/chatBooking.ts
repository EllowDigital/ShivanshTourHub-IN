export const bookingSteps = ["pickup", "drop", "car", "date", "name", "phone", "confirm"] as const;
export type BookingStep = (typeof bookingSteps)[number];
export type ChatBooking = {
  pickup: string; drop: string; car: string; date: string; time: string;
  passengers: number; name: string; phone: string; note: string;
};
export const emptyBooking: ChatBooking = {
  pickup: "", drop: "", car: "", date: "", time: "", passengers: 1, name: "", phone: "", note: "",
};
export const bookingCars = [
  { name: "Swift Dzire", seats: 4, price: "₹11/km" },
  { name: "Ertiga", seats: 7, price: "₹14/km" },
  { name: "Toyota Innova", seats: 7, price: "₹16/km" },
  { name: "Tempo Traveller", seats: 12, price: "₹22/km" },
];
export const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};
export const cleanPhone = (v: string) => v.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
export const isValidIndianMobile = (v: string) => /^[6-9]\d{9}$/.test(cleanPhone(v));
export const formatDate = (iso: string) => iso ? new Date(`${iso}T00:00`).toLocaleDateString("en-IN", {
  weekday: "short", day: "numeric", month: "short", year: "numeric",
}) : "";
export const formatTime = (t: string) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};
export const validateBookingStep = (step: BookingStep, b: ChatBooking): string => {
  if (step === "pickup" && b.pickup.trim().length < 2) return "Please enter a pickup location.";
  if (step === "drop") {
    if (b.drop.trim().length < 2) return "Please enter a drop location.";
    if (b.drop.trim().toLowerCase() === b.pickup.trim().toLowerCase()) return "Pickup and drop can't be the same place.";
  }
  if (step === "car") {
    const car = bookingCars.find(c => c.name === b.car);
    if (!car) return "Please choose a car.";
    if (!Number.isInteger(b.passengers) || b.passengers < 1 || b.passengers > car.seats) return "Please choose a passenger count within your car's capacity.";
  }
  if (step === "date") {
    const parsed = new Date(`${b.date}T00:00`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(b.date) || !Number.isFinite(parsed.getTime()) || b.date < todayISO()) return "Please choose today or a future date.";
    if (b.time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(b.time)) return "Please choose a valid pickup time.";
  }
  if (step === "name" && b.name.trim().length < 2) return "Please enter the passenger's name.";
  if (step === "phone" && !isValidIndianMobile(b.phone)) return "Enter a valid 10-digit mobile number (starts with 6–9).";
  return "";
};
export const buildChatBookingMessage = (b: ChatBooking) => [
  "*TAXI BOOKING REQUEST*", "Shivansh Tour & Travels", "",
  `*Name:* ${b.name.trim()}`, `*Phone:* +91 ${cleanPhone(b.phone)}`,
  `*Pickup:* ${b.pickup.trim()}`, `*Drop:* ${b.drop.trim()}`, `*Car:* ${b.car}`,
  `*Passengers:* ${b.passengers}`, `*Date:* ${formatDate(b.date)}${b.time ? `, ${formatTime(b.time)}` : ""}`,
  ...(b.note.trim() ? [`*Note:* ${b.note.trim()}`] : []), "", "Please confirm availability and fare.",
].join("\n");
export const readBookingDraft = (raw: string | null): ChatBooking => {
  try {
    const value: unknown = JSON.parse(raw || "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return { ...emptyBooking };
    const draft = { ...emptyBooking };
    for (const key of ["pickup", "drop", "car", "date", "time", "name", "phone", "note"] as const) {
      const entry = (value as Record<string, unknown>)[key];
      if (typeof entry === "string") draft[key] = entry.slice(0, key === "note" ? 300 : 200);
    }
    const car = bookingCars.find(c => c.name === draft.car);
    const passengers = (value as Record<string, unknown>).passengers;
    if (typeof passengers === "number" && Number.isInteger(passengers)) draft.passengers = Math.max(1, Math.min(passengers, car?.seats ?? 12));
    return draft;
  } catch { return { ...emptyBooking }; }
};