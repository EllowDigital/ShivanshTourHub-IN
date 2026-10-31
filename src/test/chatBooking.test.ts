import { describe, expect, it } from "vitest";
import { buildChatBookingMessage, emptyBooking, isValidIndianMobile, readBookingDraft, validateBookingStep } from "@/lib/chatBooking";

describe("booking reliability", () => {
  it("accepts manual locations without a suggestion", () => {
    expect(validateBookingStep("pickup", { ...emptyBooking, pickup: "My village near Agra" })).toBe("");
  });
  it("rejects identical pickup and drop locations", () => {
    expect(validateBookingStep("drop", { ...emptyBooking, pickup: "Agra", drop: " agra " })).not.toBe("");
  });
  it("rejects a past travel date", () => {
    expect(validateBookingStep("date", { ...emptyBooking, date: "2000-01-01" })).not.toBe("");
  });
  it("accepts Indian mobile numbers with country code", () => {
    expect(isValidIndianMobile("+91 88650 38345")).toBe(true);
    expect(isValidIndianMobile("1234567890")).toBe(false);
  });
  it("enforces selected car capacity", () => {
    expect(validateBookingStep("car", { ...emptyBooking, car: "Swift Dzire", passengers: 5 })).not.toBe("");
    expect(validateBookingStep("car", { ...emptyBooking, car: "Swift Dzire", passengers: 4 })).toBe("");
  });
  it("safely restores malformed drafts and clamps passengers", () => {
    expect(readBookingDraft('{"pickup":null,"name":22}').pickup).toBe("");
    expect(readBookingDraft('{"car":"Swift Dzire","passengers":12}').passengers).toBe(4);
    expect(readBookingDraft("bad json")).toEqual(emptyBooking);
  });
  it("includes all trip details and the optional note in the message", () => {
    const message = buildChatBookingMessage({ pickup: "Agra hotel", drop: "Delhi airport", car: "Ertiga", passengers: 3, date: "2027-01-10", time: "14:30", name: "Test Guest", phone: "8865038345", note: "Two bags" });
    for (const value of ["Agra hotel", "Delhi airport", "Ertiga", "3", "2027", "2:30 PM", "Test Guest", "+91 8865038345", "Two bags"]) expect(message).toContain(value);
  });
});