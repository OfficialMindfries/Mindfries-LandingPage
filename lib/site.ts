/* The landing site's public address, used for canonical links, Open Graph,
   robots.txt and sitemap.xml. Set NEXT_PUBLIC_SITE_URL in Vercel (e.g.
   https://mindfries.com) when the site moves to its own domain; until then
   it is the Vercel address. No trailing slash. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://mindfries.vercel.app").replace(/\/+$/, "");

/* The address without the protocol, for display ("mindfries.com") */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");
