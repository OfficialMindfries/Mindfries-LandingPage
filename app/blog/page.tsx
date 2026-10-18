import type { Metadata } from "next";
import Link from "next/link";
import BlogShell from "@/components/blog/BlogShell";
import BlogIndex from "@/components/blog/BlogIndex";
import { sanityFetch } from "@/sanity/client";
import { CATEGORIES_QUERY, POSTS_QUERY, type Category, type PostCard } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on engineering hiring, assessments and the future of work from the Mindfries team.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    sanityFetch<PostCard[]>(POSTS_QUERY, {}, []),
    sanityFetch<Category[]>(CATEGORIES_QUERY, {}, []),
  ]);

  return (
    <BlogShell>
      {posts.length ? (
        <BlogIndex posts={posts} categories={categories} />
      ) : (
        <section className="px-6 pb-24 pt-36 text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-hair bg-white/70 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ink/70">Blog</span>
          </span>
          <h1 className="mx-auto mt-6 max-w-2xl text-[clamp(2.4rem,5vw,4rem)] !font-serif !font-semibold !leading-[1.05] !tracking-[-0.02em] text-[#1e1b4b]">
            Articles are{" "}
            <em className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text pr-1 italic text-transparent">on their way.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-dim">
            We&rsquo;re writing about engineering hiring, assessments and what we learn from our design partners.
          </p>
          <Link
            href="/#access"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-6 py-3.5 text-[15px] font-medium text-white shadow-[0_16px_34px_-14px_rgba(76,29,149,0.6)]"
          >
            Get early access
          </Link>
        </section>
      )}
    </BlogShell>
  );
}
