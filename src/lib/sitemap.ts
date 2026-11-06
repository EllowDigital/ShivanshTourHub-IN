import { articleContent, blogPosts } from "./blogContent";
import { getAirportToAgraRoute, routePages } from "./routeSeo";

export const SITE_ORIGIN = "https://shivansh-travel-trailblazers.lovable.app";
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
  for (const post of blogPosts) {
    if (!articleContent[post.slug]?.sections.length) {
      throw new Error(`Sitemap article has no content: ${post.slug}`);
    }
  }
  return [
    ...new Set([
      ...publicPagePaths,
      ...blogPosts.map((post) => `/blog/${post.slug}`),
      ...routePages.map((route) => `/${route.slug}`),
      `/${getAirportToAgraRoute().slug}`,
    ]),
  ];
}

export function sitemapUrls() {
  return sitemapPaths().map((path) => {
    if (!/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*)?$/.test(path)) {
      throw new Error(`Invalid public sitemap path: ${path}`);
    }
    return new URL(path, SITE_ORIGIN).href;
  });
}

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function buildRobots() {
  return `# Public pages and rendering assets are crawlable.\nUser-agent: *\nAllow: /\n\n# Canonical sitemap; keep this origin until the public domain changes.\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}

export function buildSitemap() {
  // Modification dates require authoritative, page-specific editorial timestamps.
  // Current editorial labels do not establish significant modification dates.
  const entries = sitemapUrls().map(
    (url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}
