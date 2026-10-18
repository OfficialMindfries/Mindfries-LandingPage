import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "role", title: "Role", type: "string", description: "e.g. Founder @ Mindfries" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", type: "text", rows: 4 }),
    defineField({ name: "x", title: "X profile URL", type: "url" }),
    defineField({ name: "linkedin", title: "LinkedIn profile URL", type: "url" }),
    defineField({ name: "website", title: "Website", type: "url" }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});
