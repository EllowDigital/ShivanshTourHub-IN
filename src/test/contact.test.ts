import { describe, expect, it } from "vitest";
import { BUSINESS_PHONE, BUSINESS_CALL_URL } from "@/lib/contact";

describe("business call destination", () => {
  it("calls the user's correct business phone number", () => {
    expect(BUSINESS_PHONE).toBe("+918865038345");
    expect(BUSINESS_CALL_URL).toBe("tel:+918865038345");
  });
});
