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
