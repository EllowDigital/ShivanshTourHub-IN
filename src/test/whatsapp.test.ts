import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, WHATSAPP_CHAT_URL } from "@/lib/whatsapp";

describe("WhatsApp booking links", () => {
  it("uses wa.me with digits-only number and full encoded booking text", () => {
    expect(
      buildWhatsAppUrl("+91 88650 38345", "Pickup: Agra & Delhi\nCar: Ertiga"),
    ).toBe(
      "https://wa.me/918865038345?text=Pickup%3A%20Agra%20%26%20Delhi%0ACar%3A%20Ertiga",
    );
  });
  it("uses the single wa.me chat link for every page", () => {
    expect(WHATSAPP_CHAT_URL).toBe("https://wa.me/918865038345");
  });
});

describe("whatsapp encoding round-trip", () => {
  it("preserves Hindi, newlines, ampersands, apostrophes and formatting exactly", () => {
    const msg =
      "*नई बुकिंग* 🚕\nPickup: Agra, UP & Taj\nName: Ram's family\n_Note_: 50% advance?";
    const url = buildWhatsAppUrl("918865038345", msg);
    expect(url.startsWith("https://wa.me/918865038345?text=")).toBe(true);
    expect(new URL(url).searchParams.get("text")).toBe(msg);
    expect(decodeURIComponent(url.split("?text=")[1])).toBe(msg);
  });
});
