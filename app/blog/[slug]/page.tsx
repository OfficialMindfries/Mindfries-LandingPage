import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleView from "@/components/blog/ArticleView";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { POST_QUERY, RELATED_QUERY, SLUGS_QUERY, type Post, type PostCard } from "@/sanity/queries";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

const getPost = (slug: string) => sanityFetch<Post | null>(POST_QUERY, { slug }, null);

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(SLUGS_QUERY, {}, []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: "Article not found" };
  const image = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.publishedAt, images: image ? [image] : undefined },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: image ? [image] : undefined },
  };
}

export default async function ArticlePage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const related = await sanityFetch<PostCard[]>(RELATED_QUERY, { id: post._id, categoryId: post.category?._id ?? "" }, []);

  return <ArticleView post={post} related={related} />;
}
