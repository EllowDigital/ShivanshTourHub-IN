export interface City {
  name: string;
  slug: string;
}

export interface RouteSEOData {
  from: City;
  to: City;
  slug: string;
  distanceKm: number;
  travelTimeHours: number;
  oneWayFare: number;
  keywords: string;
}

const CITY_ORDER: City[] = [
  { name: "Agra", slug: "agra" },
  { name: "Delhi", slug: "delhi" },
  { name: "Noida", slug: "noida" },
  { name: "Gurgaon", slug: "gurgaon" },
  { name: "Mathura", slug: "mathura" },
  { name: "Jaipur", slug: "jaipur" },
  { name: "Lucknow", slug: "lucknow" },
  { name: "Chandigarh", slug: "chandigarh" },
  { name: "Haridwar", slug: "haridwar" },
  { name: "Rishikesh", slug: "rishikesh" },
  { name: "Vrindavan", slug: "vrindavan" },
];

const KNOWN_ROUTE_DATA: Record<
  string,
  { distanceKm: number; travelTimeHours: number; oneWayFare: number }
> = {
  "agra-delhi": { distanceKm: 230, travelTimeHours: 4, oneWayFare: 3500 },
  "delhi-agra": { distanceKm: 230, travelTimeHours: 4, oneWayFare: 3500 },
  "agra-jaipur": { distanceKm: 240, travelTimeHours: 4.5, oneWayFare: 3600 },
  "jaipur-agra": { distanceKm: 240, travelTimeHours: 4.5, oneWayFare: 3600 },
  "agra-mathura": { distanceKm: 58, travelTimeHours: 1.5, oneWayFare: 1200 },
  "mathura-agra": { distanceKm: 58, travelTimeHours: 1.5, oneWayFare: 1200 },
  "agra-lucknow": { distanceKm: 370, travelTimeHours: 6.5, oneWayFare: 5500 },
  "lucknow-agra": { distanceKm: 370, travelTimeHours: 6.5, oneWayFare: 5500 },
  "delhi-noida": { distanceKm: 25, travelTimeHours: 1, oneWayFare: 800 },
  "noida-delhi": { distanceKm: 25, travelTimeHours: 1, oneWayFare: 800 },
  "delhi-gurgaon": { distanceKm: 35, travelTimeHours: 1.25, oneWayFare: 900 },
  "gurgaon-delhi": { distanceKm: 35, travelTimeHours: 1.25, oneWayFare: 900 },
  "delhi-chandigarh": { distanceKm: 250, travelTimeHours: 5, oneWayFare: 3800 },
  "chandigarh-delhi": { distanceKm: 250, travelTimeHours: 5, oneWayFare: 3800 },
};

function estimateRoute(
  from: City,
  to: City,
): { distanceKm: number; travelTimeHours: number; oneWayFare: number } {
  const key = `${from.slug}-${to.slug}`;
  const known = KNOWN_ROUTE_DATA[key];
  if (known) return known;

  const fromIdx = CITY_ORDER.findIndex((c) => c.slug === from.slug);
  const toIdx = CITY_ORDER.findIndex((c) => c.slug === to.slug);
  const gap = Math.abs(fromIdx - toIdx) + 1;
  const distanceKm = Math.round(
    70 + gap * 52 + (fromIdx % 3) * 11 + (toIdx % 4) * 9,
  );
  const travelTimeHours = Number((distanceKm / 58).toFixed(1));
  const oneWayFare = Math.max(1200, Math.round(distanceKm * 14));
  return { distanceKm, travelTimeHours, oneWayFare };
}

function formatKeywords(from: string, to: string): string {
  return [
    `${from.toLowerCase()} to ${to.toLowerCase()} taxi`,
    `${from.toLowerCase()} to ${to.toLowerCase()} cab`,
    `${to.toLowerCase()} taxi service`,
    "agra taxi service",
    "outstation taxi booking",
    "delhi airport to agra taxi",
    "cheapest agra taxi service",
    "agra tour taxi",
  ].join(", ");
}

export const cities: City[] = CITY_ORDER;

export const routePages: RouteSEOData[] = CITY_ORDER.flatMap((from) =>
  CITY_ORDER.filter((to) => to.slug !== from.slug).map((to) => {
    const metrics = estimateRoute(from, to);
    return {
      from,
      to,
      slug: `${from.slug}-to-${to.slug}-taxi`,
      distanceKm: metrics.distanceKm,
      travelTimeHours: metrics.travelTimeHours,
      oneWayFare: metrics.oneWayFare,
      keywords: formatKeywords(from.name, to.name),
    };
  }),
);

export function findRouteBySlug(slug: string): RouteSEOData | undefined {
  return routePages.find((route) => route.slug === slug);
}

export function findRouteByCities(
  fromSlug: string,
  toSlug: string,
): RouteSEOData | undefined {
  return routePages.find(
    (route) => route.from.slug === fromSlug && route.to.slug === toSlug,
  );
}

export function getRelatedRoutes(
  route: RouteSEOData,
  limit = 6,
): RouteSEOData[] {
  const sameOrigin = routePages.filter(
    (r) => r.from.slug === route.from.slug && r.to.slug !== route.to.slug,
  );
  const reverse = routePages.find(
    (r) => r.from.slug === route.to.slug && r.to.slug === route.from.slug,
  );
  const priority = reverse ? [reverse, ...sameOrigin] : sameOrigin;
  return priority.slice(0, limit);
}

export function getFareOptions(baseFare: number) {
  return {
    dzire: baseFare,
    ertiga: Math.round(baseFare * 1.2),
    innova: Math.round(baseFare * 1.35),
    tempo: Math.round(baseFare * 2.1),
  };
}

export function getRouteFAQs(route: RouteSEOData) {
  const fare = getFareOptions(route.oneWayFare);
  return [
    {
      question: `What is the ${route.from.name} to ${route.to.name} taxi fare?`,
      answer: `One-way taxi fare starts around Rs ${fare.dzire} for sedan. Ertiga is around Rs ${fare.ertiga}, Innova around Rs ${fare.innova}, and Tempo Traveller around Rs ${fare.tempo}. Final fare depends on date, pickup point, and toll updates.`,
    },
    {
      question: `How long does ${route.from.name} to ${route.to.name} cab travel take?`,
      answer: `Typical travel time is about ${route.travelTimeHours} hours for approximately ${route.distanceKm} km, depending on traffic, weather, and highway conditions.`,
    },
    {
      question: `Is one-way cab available for ${route.from.name} to ${route.to.name}?`,
      answer:
        "Yes, one-way and round-trip cabs are both available, with fixed transparent pricing and no hidden charges.",
    },
    {
      question: "Can I book by WhatsApp for instant confirmation?",
      answer:
        "Yes. Share pickup date, time, and passenger count on WhatsApp and the booking team confirms car availability quickly.",
    },
    {
      question: "Are toll tax, driver allowance, and parking included?",
      answer:
        "Most intercity fare quotes include toll and driver charges. Parking or state tax is shared before booking confirmation to keep billing transparent.",
    },
  ];
}

const cityBookingNotes: Record<string, string> = {
  agra: "For a Taj Mahal visit, share whether your drop is a hotel or a sightseeing stop, and ask the team to confirm the vehicle-access point before travelling.",
  delhi:
    "Specify your Delhi locality rather than only the city name. If the journey connects with a flight or train, include the airport terminal or station and your reporting time.",
  "delhi-airport":
    "Share the arrival flight number, terminal, expected landing time and luggage count. Agree on the meeting point and waiting charges before confirming the pickup.",
  noida:
    "Include the sector, building name and entrance or gate for your Noida pickup or drop so the driver can identify the correct location.",
  gurgaon:
    "Share the hotel, office or residential address and its entrance. Mention a meeting or flight deadline when discussing pickup timing.",
  mathura:
    "If your Mathura journey includes temple visits, list the stops and time you want to spend at each, rather than requesting only a city drop.",
  jaipur:
    "For Jaipur sightseeing, list the monuments you want to visit and ask for a separate quote for waiting time and additional stops.",
  lucknow:
    "For a Lucknow station, airport or hotel transfer, provide the exact drop point and any onward departure time before agreeing on pickup timing.",
  chandigarh:
    "Include the sector and exact address for Chandigarh. If your trip continues beyond the city, request that onward leg in the same enquiry.",
  haridwar:
    "If your Haridwar visit includes an aarti or a temple stop, share your planned arrival time and ask where the car can wait or collect you afterwards.",
  rishikesh:
    "Share the exact Rishikesh hotel, ashram or activity meeting point. Discuss any onward hill journey separately before confirming the itinerary.",
  vrindavan:
    "List your Vrindavan temple stops and ask the team to confirm suitable drop and collection points, particularly when travelling with children or older relatives.",
};

export function getRouteWordySections(
  route: RouteSEOData,
): Array<{ heading: string; body: string }> {
  const pickupNote =
    cityBookingNotes[route.from.slug] ||
    "Share your full pickup address and a nearby landmark.";
  const dropNote =
    cityBookingNotes[route.to.slug] ||
    "Share your full destination address and any onward travel plans.";
  return [
    {
      heading: `Plan your pickup in ${route.from.name}`,
      body: pickupNote,
    },
    {
      heading: `Arrange your arrival in ${route.to.name}`,
      body: dropNote,
    },
    {
      heading: `Confirm your ${route.from.name}–${route.to.name} quote`,
      body: `Request a written quote for the exact pickup and drop addresses on your ${route.from.name} to ${route.to.name} journey. Include the date, passenger count and luggage. Ask whether tolls, parking, driver allowance, waiting time and any extra stops are included. The prices shown on this page are estimates, not a confirmed booking price.`,
    },
    {
      heading: `Stops and return travel on this journey`,
      body: `If you need stops between ${route.from.name} and ${route.to.name}, name each stop when requesting your quote; do not assume it is included in a direct transfer. For a return to ${route.from.name}, share the return date and pickup address in ${route.to.name}. Confirm both legs and any waiting charges with the team before booking.`,
    },
  ];
}

export function getAirportToAgraRoute(): RouteSEOData {
  return {
    from: { name: "Delhi Airport", slug: "delhi-airport" },
    to: { name: "Agra", slug: "agra" },
    slug: "delhi-airport-to-agra-taxi",
    distanceKm: 235,
    travelTimeHours: 4.5,
    oneWayFare: 3900,
    keywords:
      "delhi airport to agra taxi, igi airport to agra cab, agra airport transfer, delhi to agra one way taxi",
  };
}
