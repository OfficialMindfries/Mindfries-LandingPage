import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* robots.txt: crawl everything except the API and the Sanity editor, and
   find the pages through the sitemap. The company and candidate portals
   live on their own subdomains, so their crawling rules belong to them. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/studio"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
