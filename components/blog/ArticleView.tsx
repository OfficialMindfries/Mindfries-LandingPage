import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import BlogShell from "./BlogShell";
import { Newsletter, Share, Toc, type TocItem } from "./ArticleAside";
import { AuthorAvatar, Cover, Eyebrow, formatDate, readMins } from "./shared";
import { urlFor } from "@/sanity/image";
import { SITE_URL } from "@/lib/site";
import type { Author, Post, PostCard } from "@/sanity/queries";

/* Headings get stable ids so the table of contents can link to them */
const blockText = (block: PortableTextBlock) =>
  (block.children as { text?: string }[] | undefined)?.map((c) => c.text ?? "").join("") ?? "";
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 64);

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2 id={slugify(blockText(value))} className="mt-12 scroll-mt-28 text-[28px] !font-semibold !leading-tight !tracking-[-0.015em] text-[#1e1b4b]">
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className="mt-8 text-[21px] font-semibold text-[#1e1b4b]">{children}</h3>,
    normal: ({ children }) => <p className="mt-5 text-[17px] leading-[1.75] text-ink/75">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-7 border-l-[3px] border-violet-400 pl-5 font-serif text-[20px] italic leading-relaxed text-[#1e1b4b]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-[17px] leading-[1.7] text-ink/75 marker:text-violet-400">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-[17px] leading-[1.7] text-ink/75 marker:text-violet-500">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href ?? "#";
      const external = /^https?:/.test(href);
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-medium text-accent underline decoration-violet-300 underline-offset-4 hover:decoration-accent"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => <code className="rounded-md bg-violet-50 px-1.5 py-0.5 font-mono text-[0.9em] text-violet-700">{children}</code>,
  },
  types: {
    image: ({ value }) => {
      const v = value as { alt?: string; caption?: string };
      return (
        <figure className="mt-8">
          <Image
            src={urlFor(value).width(1400).url()}
            alt={v.alt ?? ""}
            width={1400}
            height={800}
            sizes="(min-width: 1024px) 680px, 100vw"
            className="h-auto w-full rounded-2xl"
          />
          {v.caption && <figcaption className="mt-2 text-center text-[13px] text-dim">{v.caption}</figcaption>}
        </figure>
      );
    },
  },
};

function AuthorCard({ author }: { author: Author }) {
  const links = [
    { href: author.x, label: "X", d: "m5 5 14 14M19 5 5 19" },
    { href: author.linkedin, label: "LinkedIn", d: "M7 10v7M7 7v.01M11 17v-7m0 3.5c0-2 1.2-3.5 3-3.5s3 1.2 3 3.5V17" },
    { href: author.website, label: "Website", d: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" },
  ].filter((l) => l.href);

  return (
    <div className="rounded-3xl border border-hair bg-white p-6 shadow-[0_24px_50px_-36px_rgba(76,29,149,0.45)]">
      <div className="flex items-center gap-4">
        <AuthorAvatar author={author} size={56} />
        <div>
          <p className="text-[17px] font-semibold text-ink">{author.name}</p>
          {author.role && <p className="text-[13.5px] text-dim">{author.role}</p>}
        </div>
      </div>
      {author.bio && <p className="mt-4 text-[14.5px] leading-relaxed text-ink/70">{author.bio}</p>}
      {links.length > 0 && (
        <div className="mt-5 flex gap-2.5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author.name} on ${l.label}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-hair-bright bg-white text-ink/80 transition-all hover:-translate-y-0.5 hover:text-accent"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d={l.d} />
              </svg>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function Related({ posts }: { posts: PostCard[] }) {
  if (!posts.length) return null;
  return (
    <div>
      <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-slate-500">Related articles</p>
      <ul className="mt-4">
        {posts.map((p) => (
          <li key={p._id} className="border-b border-hair last:border-0">
            <Link href={`/blog/${p.slug}`} className="group flex gap-4 py-3.5">
              <Cover post={p} sizes="112px" className="h-[76px] w-[108px] shrink-0 rounded-xl" />
              <div className="min-w-0">
                {p.category && <Eyebrow>{p.category.title}</Eyebrow>}
                <p className="mt-0.5 line-clamp-2 text-[14.5px] font-semibold leading-snug text-ink transition-colors group-hover:text-accent">{p.title}</p>
                <p className="mt-1 text-[12.5px] text-dim">
                  {formatDate(p.publishedAt)} · {readMins(p.readingTime)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ArticleView({ post, related }: { post: Post; related: PostCard[] }) {
  const toc: TocItem[] = (post.body ?? [])
    .filter((b) => b._type === "block" && b.style === "h2")
    .map((b) => ({ id: slugify(blockText(b)), text: blockText(b) }))
    .filter((t) => t.text);

  return (
    <BlogShell>
      <div className="mx-auto grid max-w-[84rem] gap-10 px-6 pb-20 pt-28 sm:pt-32 lg:grid-cols-[200px_minmax(0,1fr)] lg:px-10 xl:grid-cols-[210px_minmax(0,1fr)_330px]">
        {/* left: contents + share */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-10">
            <Toc items={toc} />
            <div className="border-t border-hair pt-8">
              <Share title={post.title} url={`${SITE_URL}/blog/${post.slug}`} />
            </div>
          </div>
        </aside>

        {/* article */}
        <article className="min-w-0 lg:border-l lg:border-hair lg:pl-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {post.category ? <Eyebrow>{post.category.title}</Eyebrow> : <span />}
            <p className="text-[13.5px] text-dim">
              {formatDate(post.publishedAt)} · {readMins(post.readingTime)}
            </p>
          </div>
          <h1 className="mt-4 text-[clamp(2.2rem,4.4vw,3.4rem)] !font-serif !font-semibold !leading-[1.07] !tracking-[-0.02em] text-[#1e1b4b]">
            {post.title}
          </h1>
          {post.excerpt && <p className="mt-4 text-[19px] leading-relaxed text-dim">{post.excerpt}</p>}
          {post.author && (
            <div className="mt-6 flex items-center gap-3">
              <AuthorAvatar author={post.author} size={44} />
              <div>
                <p className="text-[15px] font-medium text-ink">{post.author.name}</p>
                {post.author.role && <p className="text-[13px] text-dim">{post.author.role}</p>}
              </div>
            </div>
          )}
          <Cover post={post} sizes="(min-width: 1280px) 680px, 100vw" priority className="mt-8 aspect-[16/7] rounded-3xl" />

          <div className="mt-4">{post.body && <PortableText value={post.body} components={components} />}</div>

          <div className="mt-14 border-t border-hair pt-8 lg:hidden">
            <Share title={post.title} url={`${SITE_URL}/blog/${post.slug}`} />
          </div>
        </article>

        {/* right: author, related, newsletter */}
        <aside className="lg:col-span-2 xl:col-span-1">
          <div className="space-y-10 xl:sticky xl:top-28">
            {post.author && <AuthorCard author={post.author} />}
            <Related posts={related} />
            <Newsletter />
          </div>
        </aside>
      </div>
    </BlogShell>
  );
}
