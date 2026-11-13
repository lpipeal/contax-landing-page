import type { MetadataRoute } from "next";
import { siteConfig } from "./site-config";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteConfig.url;
  return ["", "/en"].map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: "monthly",
    priority: path ? 0.8 : 1,
    alternates: { languages: { es: origin, en: `${origin}/en` } },
  }));
}
