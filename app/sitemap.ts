import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/client";
import { SLUGS_QUERY } from "@/sanity/queries";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await sanityFetch<string[]>(SLUGS_QUERY, {}, []);
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/docs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...slugs.map((slug) => ({ url: `${SITE_URL}/blog/${slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
