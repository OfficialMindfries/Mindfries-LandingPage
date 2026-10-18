"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Category, PostCard } from "@/sanity/queries";
import { ArrowIcon, AuthorAvatar, Cover, Eyebrow, formatDate, readMins } from "./shared";

const ease = [0.22, 1, 0.36, 1] as const;
const GRID_PAGE = 8;

type Tab = "latest" | "picks";

function Meta({ post, stacked = false }: { post: PostCard; stacked?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2 text-[12.5px] text-dim">
      <AuthorAvatar author={post.author} size={stacked ? 30 : 26} />
      {stacked ? (
        <span className="min-w-0 leading-snug">
          <span className="block truncate">
            {post.author?.name && <span className="text-ink/75">{post.author.name} · </span>}
            {formatDate(post.publishedAt)}
          </span>
          <span className="block">{readMins(post.readingTime)}</span>
        </span>
      ) : (
        <span className="truncate">
          {post.author?.name && <span className="text-ink/75">{post.author.name}</span>}
          {post.author?.name && " · "}
          {formatDate(post.publishedAt)} · {readMins(post.readingTime)}
        </span>
      )}
    </div>
  );
}

function ArrowButton({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-hair-bright bg-white text-ink transition-all group-hover:border-violet-300 group-hover:text-accent ${className}`}
    >
      <ArrowIcon />
    </span>
  );
}

/* Big featured card with prev/next when there's more than one */
function Featured({ posts }: { posts: PostCard[] }) {
  const [i, setI] = useState(0);
  const post = posts[i];
  const go = (d: number) => setI((n) => (n + d + posts.length) % posts.length);

  return (
    <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(76,29,149,0.45)]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={post._id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Link href={`/blog/${post.slug}`} className="group absolute inset-0 block">
            <div className="absolute inset-0">
              <Cover post={post} sizes="(min-width: 1024px) 60vw, 100vw" priority className="h-full w-full" />
            </div>
            <span className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              {post.category && <Eyebrow>{post.category.title}</Eyebrow>}
              <h2 className="mt-2 max-w-2xl text-[clamp(1.8rem,3.2vw,2.6rem)] !font-serif !font-semibold !leading-[1.08] !tracking-[-0.015em] text-[#1e1b4b] transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              {post.excerpt && <p className="mt-3 line-clamp-3 max-w-xl text-[15.5px] leading-relaxed text-ink/70">{post.excerpt}</p>}
              <div className="mt-5">
                <Meta post={post} />
              </div>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      <span className="absolute left-6 top-6 rounded-full bg-gradient-to-r from-violet-600 to-violet-500 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.7)]">
        Featured
      </span>
      {posts.length > 1 && (
        <div className="absolute right-6 top-6 flex gap-2">
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => go(d)}
              aria-label={d < 0 ? "Previous featured article" : "Next featured article"}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/70 text-ink backdrop-blur transition-colors hover:bg-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <path d={d < 0 ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"} />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SideItem({ post }: { post: PostCard }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex gap-5 border-b border-hair py-4 first:pt-0 last:border-0">
      <Cover post={post} sizes="160px" className="h-[118px] w-[150px] shrink-0 rounded-2xl" />
      <div className="flex min-w-0 flex-1 flex-col">
        {post.category && <Eyebrow>{post.category.title}</Eyebrow>}
        <h3 className="mt-1 line-clamp-2 text-[17px] font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        {post.excerpt && <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-dim">{post.excerpt}</p>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <Meta post={post} />
          <ArrowButton />
        </div>
      </div>
    </Link>
  );
}

function GridCard({ post, index }: { post: PostCard; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.05, ease }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-hair bg-white shadow-[0_20px_40px_-34px_rgba(76,29,149,0.5)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-34px_rgba(76,29,149,0.55)]"
      >
        <Cover post={post} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="aspect-[16/7] m-2 rounded-2xl" />
        <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
          {post.category && <Eyebrow>{post.category.title}</Eyebrow>}
          <h3 className="mt-1.5 line-clamp-2 text-[18px] font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
            {post.title}
          </h3>
          {post.excerpt && <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-dim">{post.excerpt}</p>}
          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <Meta post={post} stacked />
            <ArrowButton />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogIndex({ posts, categories }: { posts: PostCard[]; categories: Category[] }) {
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("latest");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== "all" && p.category?.slug !== category) return false;
      if (!q) return true;
      return [p.title, p.excerpt, p.category?.title, p.author?.name].some((s) => s?.toLowerCase().includes(q));
    });
  }, [posts, category, query]);

  const browsing = category === "all" && !query.trim();
  const featured = browsing ? (posts.some((p) => p.featured) ? posts.filter((p) => p.featured) : posts.slice(0, 1)) : [];
  const side = browsing ? posts.filter((p) => !featured.includes(p)).slice(0, 3) : [];
  const rest = browsing ? filtered.filter((p) => !featured.includes(p) && !side.includes(p)) : filtered;
  const tabbed = tab === "picks" ? rest.filter((p) => p.editorsPick) : rest;
  const grid = showAll ? tabbed : tabbed.slice(0, GRID_PAGE);

  return (
    <div className="mx-auto max-w-[80rem] px-6 pb-16 pt-28 sm:pt-32 lg:px-10">
      {/* filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
          {[{ title: "All", slug: "all" }, ...categories].map((c) => {
            const on = category === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setCategory(c.slug)}
                className={`rounded-full px-4 py-2 text-[13.5px] font-medium transition-all ${
                  on
                    ? "bg-gradient-to-r from-violet-600 to-violet-500 text-white shadow-[0_8px_20px_-8px_rgba(124,58,237,0.7)]"
                    : "border border-hair-bright bg-white text-ink/80 hover:border-violet-300 hover:text-ink"
                }`}
              >
                {c.title}
              </button>
            );
          })}
        </div>
        <label className="relative block lg:w-[360px]">
          <span className="sr-only">Search articles</span>
          <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/50" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, topics, or authors…"
            className="w-full rounded-full border border-hair-bright bg-white py-2.5 pl-11 pr-4 text-[14px] text-ink outline-none transition-colors placeholder:text-faint focus:border-violet-400"
          />
        </label>
      </div>

      {/* featured + side list */}
      {browsing && featured.length > 0 && (
        <div className={`mt-8 grid gap-8 ${side.length ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" : ""}`}>
          <Featured posts={featured} />
          {side.length > 0 && (
            <div className="flex flex-col">
              {side.map((p) => (
                <SideItem key={p._id} post={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* tabs + grid */}
      {(rest.length > 0 || !browsing) && (
        <>
          <div className="mt-12 flex items-end justify-between border-b border-hair">
            <div className="flex gap-7" role="tablist" aria-label="Sort articles">
              {(
                [
                  ["latest", browsing ? "Latest" : `${filtered.length} result${filtered.length === 1 ? "" : "s"}`],
                  ["picks", "Editor's Picks"],
                ] as [Tab, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`relative pb-3 text-[14.5px] font-medium transition-colors ${tab === key ? "text-accent" : "text-ink/60 hover:text-ink"}`}
                >
                  {label}
                  {tab === key && <motion.span layoutId="blog-tab" className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent" />}
                </button>
              ))}
            </div>
            {tabbed.length > GRID_PAGE && (
              <button
                type="button"
                onClick={() => setShowAll((s) => !s)}
                className="mb-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent"
              >
                {showAll ? "Show fewer" : "View all articles"}
                <ArrowIcon size={15} />
              </button>
            )}
          </div>

          {grid.length > 0 ? (
            <motion.div layout className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {grid.map((p, i) => (
                  <GridCard key={p._id} post={p} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <p className="py-16 text-center text-[15px] text-dim">
              {tab === "picks" ? "No editor's picks here yet." : "No articles match that search."}
            </p>
          )}
        </>
      )}
    </div>
  );
}
