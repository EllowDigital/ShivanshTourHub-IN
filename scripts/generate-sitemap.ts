import { writeFileSync } from "node:fs";
import { buildRobots, buildSitemap, sitemapUrls } from "../src/lib/sitemap";

// Validate everything before replacing either crawler file.
const sitemap = buildSitemap();
const robots = buildRobots();

writeFileSync(
  new URL("../public/sitemap.xml", import.meta.url),
  sitemap,
  "utf8",
);
writeFileSync(new URL("../public/robots.txt", import.meta.url), robots, "utf8");
console.log(
  `Sitemap and robots.txt updated with ${sitemapUrls().length} unique canonical public URLs.`,
);
