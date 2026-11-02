import { blogPosts } from "./blogContent";
import { getAirportToAgraRoute, routePages } from "./routeSeo";

export const SITE_ORIGIN = "https://shivansh-tour-hub.netlify.app";
export const publicPagePaths = [
  "/",
  "/services",
  "/fleet",
  "/tours",
  "/routes",
  "/service-areas",
  "/reviews",
  "/gallery",
  "/about",
  "/contact",
  "/blog",
];

export function sitemapPaths() {
  return [
    ...new Set([
      ...publicPagePaths,
      ...blogPosts.map((post) => `/blog/${post.slug}`),
      ...routePages.map((route) => `/${route.slug}`),
      `/${getAirportToAgraRoute().slug}`,
    ]),
  ];
}

export function buildSitemap() {
  // Modification dates require authoritative, page-specific editorial timestamps.
  // Current editorial labels do not establish significant modification dates.
  const entries = sitemapPaths().map(
    (path) => `  <url>\n    <loc>${SITE_ORIGIN}${path}</loc>\n  </url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}
