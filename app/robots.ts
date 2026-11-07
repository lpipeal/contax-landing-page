import type { MetadataRoute } from "next";
export const dynamic = "force-static";
// Review release: enable indexing with the final domain and approved content.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
