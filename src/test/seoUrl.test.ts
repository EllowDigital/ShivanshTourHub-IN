import { describe, expect, it } from "vitest";
import { canonicalPageUrl } from "@/lib/seoUrl";

describe("canonical page identity", () => {
  it("uses the project domain for a legacy route URL", () => {
    expect(
      canonicalPageUrl("https://shivansh-tour-hub.netlify.app/tours"),
    ).toBe("https://shivansh-tour-hub.netlify.app//tours");
  });
  it("excludes search parameters and fragments from canonical routes", () => {
    expect(canonicalPageUrl("/blog?campaign=taxi#guides")).toBe(
      "https://shivansh-tour-hub.netlify.app//blog",
    );
  });
});
