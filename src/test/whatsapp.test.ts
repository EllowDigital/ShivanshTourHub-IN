import { describe, expect, it } from "vitest";
import { buildWhatsAppDeepLink, buildWhatsAppUrl } from "@/lib/whatsapp";

describe("WhatsApp booking links", () => {
  it("uses wa.me with digits-only number and full encoded booking text", () => {
    expect(buildWhatsAppUrl("+91 88650 38345", "Pickup: Agra & Delhi\nCar: Ertiga")).toBe("https://wa.me/918865038345?text=Pickup%3A%20Agra%20%26%20Delhi%0ACar%3A%20Ertiga");
  });
  it("builds the mobile app link for the same business number", () => {
    expect(buildWhatsAppDeepLink("+91 88650 38345", "Hi")).toBe("whatsapp://send?phone=918865038345&text=Hi");
  });
});

describe("whatsapp encoding round-trip", () => {
  it("preserves Hindi, newlines, ampersands, apostrophes and formatting exactly", () => {
    const msg = "*नई बुकिंग* 🚕\nPickup: Agra, UP & Taj\nName: Ram's family\n_Note_: 50% advance?";
    const url = buildWhatsAppUrl("918865038345", msg);
    expect(url.startsWith("https://wa.me/918865038345?text=")).toBe(true);
    expect(new URL(url).searchParams.get("text")).toBe(msg);
    expect(decodeURIComponent(url.split("?text=")[1])).toBe(msg);
  });
});
