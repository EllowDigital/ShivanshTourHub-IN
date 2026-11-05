import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RouteLanding from "../pages/RouteLanding";

afterEach(cleanup);

describe("canonical taxi pages", () => {
  it.each(["/agra-to-delhi-taxi", "/agra-to-delhi-cab-service"])(
    "resolves %s to the Agra–Delhi page and its canonical taxi URL",
    async (path) => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <RouteLanding />
        </MemoryRouter>,
      );
      expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
        "Agra to Delhi Taxi Service",
      );
      await waitFor(() =>
        expect(
          document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
        ).toBe("https://shivansh-tour-hub.netlify.app/agra-to-delhi-taxi"),
      );
    },
  );

  it("resolves the special Delhi Airport–Agra route", () => {
    render(
      <MemoryRouter initialEntries={["/delhi-airport-to-agra-taxi"]}>
        <RouteLanding />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
      "Delhi Airport to Agra Taxi Service",
    );
  });
});
