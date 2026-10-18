import { defineQuery } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

/* Reading time ≈ characters / 5 per word / 200 words a minute (min. 1). */
const card = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  editorsPick,
  mainImage,
  "category": category->{ _id, title, "slug": slug.current },
  "author": author->{ name, role, image },
  "readingTime": round(length(pt::text(body)) / 5 / 200)
`;

const published = `_type == "post" && defined(slug.current) && publishedAt <= now()`;

export const POSTS_QUERY = defineQuery(`*[${published}] | order(publishedAt desc) { ${card} }`);

export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0] | order(title asc) { title, "slug": slug.current }`,
);

export const POST_QUERY = defineQuery(`*[${published} && slug.current == $slug][0] {
  ${card},
  body,
  "author": author->{ name, role, image, bio, x, linkedin, website }
}`);

export const RELATED_QUERY = defineQuery(`*[${published} && _id != $id] | order(
  (category._ref == $categoryId) desc, publishedAt desc
)[0...4] { ${card} }`);

export const SLUGS_QUERY = defineQuery(`*[${published}].slug.current`);

export type Author = {
  name: string;
  role?: string;
  image?: SanityImageSource;
  bio?: string;
  x?: string;
  linkedin?: string;
  website?: string;
};

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  featured?: boolean;
  editorsPick?: boolean;
  mainImage?: SanityImageSource & { alt?: string };
  category?: { _id: string; title: string; slug: string } | null;
  author?: Author | null;
  readingTime?: number | null;
};

export type Post = PostCard & { body?: PortableTextBlock[] };

export type Category = { title: string; slug: string };
