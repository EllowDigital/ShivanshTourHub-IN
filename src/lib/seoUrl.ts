import { SITE_ORIGIN } from "./sitemap";

/** Route identity belongs to this site even when older callers supply a legacy origin. */
export function canonicalPageUrl(value: string): string {
  const url = new URL(value, SITE_ORIGIN);
  return new URL(url.pathname, SITE_ORIGIN).href;
}