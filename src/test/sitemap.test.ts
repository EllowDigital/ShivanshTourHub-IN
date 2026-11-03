import { describe, expect, it } from "vitest";
import generatedXml from "../../public/sitemap.xml?raw";
import generatedRobots from "../../public/robots.txt?raw";
import appSource from "../App.tsx?raw";
import { buildRobots, buildSitemap, publicPagePaths, sitemapPaths, sitemapUrls, SITE_ORIGIN } from "../lib/sitemap";
import { blogPosts } from "../lib/blogContent";
import { routePages } from "../lib/routeSeo";

describe("public sitemap", () => {
  it("includes every published article and canonical route exactly once", () => {
    const paths = sitemapPaths();
    for (const post of blogPosts) expect(paths).toContain(`/blog/${post.slug}`);
    for (const route of routePages) expect(paths).toContain(`/${route.slug}`);
    expect(paths).toContain("/delhi-airport-to-agra-taxi");
    expect(paths.length).toBe(new Set(paths).size);
    expect(paths.some((path) => path.includes(":") || path.includes("*"))).toBe(
      false,
    );
  });

  it("keeps the generated file synchronized without artificial lastmod dates", () => {
    const xml = buildSitemap();
    expect(generatedXml).toBe(xml);
    expect(xml).not.toContain("<lastmod>");
    expect(xml).toContain(`<loc>${SITE_ORIGIN}/agra-to-delhi-taxi</loc>`);
  });

  it("includes all fixed public application routes", () => {
    const fixedRoutes = [...appSource.matchAll(/path="([^":*]+)"/g)].map((match) => match[1]);
    expect([...publicPagePaths].sort()).toEqual(fixedRoutes.sort());
  });

  it("contains absolute canonical HTTPS URLs without aliases or URL parameters", () => {
    for (const value of sitemapUrls()) {
      const url = new URL(value);
      expect(url.origin).toBe(SITE_ORIGIN);
      expect(url.protocol).toBe("https:");
      expect(url.search).toBe("");
      expect(url.hash).toBe("");
      expect(url.pathname).not.toContain("-cab-service");
      expect(url.pathname === "/" || !url.pathname.endsWith("/")).toBe(true);
    }
  });

  it("keeps wildcard crawler access open and points at the canonical sitemap", () => {
    expect(generatedRobots).toBe(buildRobots());
    const directives = generatedRobots.split("\n").filter((line) => line && !line.startsWith("#"));
    expect(directives).toContain("User-agent: *");
    expect(directives).toContain("Allow: /");
    expect(directives.filter((line) => line.startsWith("Disallow:")).length).toBe(0);
    expect(directives.filter((line) => line.startsWith("Sitemap:"))).toEqual([`Sitemap: ${SITE_ORIGIN}/sitemap.xml`]);
  });
});
