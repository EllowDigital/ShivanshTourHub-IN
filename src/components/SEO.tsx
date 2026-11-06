import { useEffect } from "react";
import { canonicalPageUrl } from "@/lib/seoUrl";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  schema?: object | object[];
}

const SEO = ({ title, description, keywords, canonical, schema }: SEOProps) => {
  useEffect(() => {
    document.title = title;
    const pageUrl = canonicalPageUrl(canonical || window.location.pathname);

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(
        `meta[${attr}="${name}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", pageUrl, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta(
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    setMeta(
      "googlebot",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );

    // Canonical
    let link = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (pageUrl) {
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", pageUrl);
    }

    // JSON-LD Schema
    document
      .querySelectorAll("script[data-seo-schema]")
      .forEach((node) => node.remove());
    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemas.forEach((schemaItem) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-schema", "true");
        script.textContent = JSON.stringify(schemaItem);
        document.head.appendChild(script);
      });
    }
  }, [title, description, keywords, canonical, schema]);

  return null;
};

export default SEO;
