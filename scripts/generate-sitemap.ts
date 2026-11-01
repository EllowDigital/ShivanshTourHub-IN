import { writeFileSync } from "node:fs";
import { buildSitemap } from "../src/lib/sitemap";

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), buildSitemap(), "utf8");
console.log("Sitemap updated from public pages, blog articles, and canonical taxi routes.");