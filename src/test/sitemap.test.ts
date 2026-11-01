import { describe, expect, it } from "vitest";
import generatedXml from "../../public/sitemap.xml?raw";
import { buildSitemap, sitemapPaths, SITE_ORIGIN } from "../lib/sitemap";
import { blogPosts } from "../lib/blogContent";
import { routePages } from "../lib/routeSeo";

describe("public sitemap", () => {
  it("includes every published article and canonical route exactly once", () => {
    const paths = sitemapPaths();
    for (const post of blogPosts) expect(paths).toContain(`/blog/${post.slug}`);
    for (const route of routePages) expect(paths).toContain(`/${route.slug}`);
    expect(paths).toContain("/delhi-airport-to-agra-taxi");
    expect(paths.length).toBe(new Set(paths).size);
    expect(paths.some((path) => path.includes(":") || path.includes("*"))).toBe(false);
  });

  it("keeps the generated file synchronized without artificial lastmod dates", () => {
    const xml = buildSitemap();
    expect(generatedXml).toBe(xml);
    expect(xml).not.toContain("<lastmod>");
    expect(xml).toContain(`<loc>${SITE_ORIGIN}/agra-to-delhi-taxi</loc>`);
  });
});