import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      description: "One or two sentences shown on cards and under the title.",
      validation: (r) => r.max(240),
    }),
    defineField({ name: "category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({
      name: "mainImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({ name: "featured", type: "boolean", description: "Show in the featured slot at the top of the blog.", initialValue: false }),
    defineField({ name: "editorsPick", title: "Editor's pick", type: "boolean", initialValue: false }),
    defineField({ name: "body", type: "blockContent" }),
  ],
  orderings: [{ title: "Newest", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", author: "author.name", media: "mainImage" },
    prepare: ({ title, author, media }) => ({ title, subtitle: author ? `by ${author}` : undefined, media }),
  },
});
