"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* Client pieces of the article page: table of contents with scroll-spy,
   share buttons and the newsletter box. */

export type TocItem = { id: string; text: string };

export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page">
      <Link href="/blog" className="inline-flex items-center gap-2 text-[14px] text-dim transition-colors hover:text-accent">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
        All articles
      </Link>
      {items.length > 0 && (
        <>
          <p className="mt-8 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-slate-500">On this page</p>
          <ul className="relative mt-4 space-y-1 border-l border-hair">
            {items.map((i) => {
              const on = i.id === active;
              return (
                <li key={i.id} className="relative">
                  {on && <span className="absolute -left-[4.5px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent" />}
                  <a
                    href={`#${i.id}`}
                    className={`ml-4 block rounded-lg px-3 py-1.5 text-[14px] leading-snug transition-colors ${
                      on ? "bg-violet-50 font-medium text-accent" : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    {i.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </nav>
  );
}

const iconCls =
  "grid h-10 w-10 place-items-center rounded-full border border-hair-bright bg-white text-ink/80 transition-all hover:-translate-y-0.5 hover:text-accent";

export function Share({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const enc = encodeURIComponent;
  return (
    <div>
      <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-slate-500">Share this article</p>
      <div className="mt-4 flex gap-2.5">
        <a
          href={`https://x.com/intent/post?url=${enc(url)}&text=${enc(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          className={iconCls}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="m5 5 14 14M19 5 5 19" />
          </svg>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className={iconCls}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" aria-hidden>
            <path d="M7 10v7M7 7v.01M11 17v-7m0 3.5c0-2 1.2-3.5 3-3.5s3 1.2 3 3.5V17" />
          </svg>
        </a>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            } catch {
              /* clipboard blocked; nothing to do */
            }
          }}
          aria-label="Copy link"
          className={iconCls}
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <path d="m5 12 4.5 4.5L19 7" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setState("error");
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "blog-newsletter" }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="rounded-3xl border border-hair bg-gradient-to-br from-white to-violet-50/70 p-5">
      <div className="flex gap-3.5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-violet-100 text-accent">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="m4 7 8 6 8-6" />
          </svg>
        </span>
        <div>
          <p className="text-[15px] font-semibold text-ink">Get new articles in your inbox</p>
          <p className="mt-0.5 text-[13px] leading-relaxed text-dim">
            Insights on engineering hiring, assessments, and the future of work.
          </p>
        </div>
      </div>
      {state === "done" ? (
        <p className="mt-4 rounded-2xl bg-violet-50 px-4 py-3 text-[13.5px] text-violet-700">You&rsquo;re on the list. Thanks!</p>
      ) : (
        <form onSubmit={submit} className="mt-4 flex gap-2">
          <label className="sr-only" htmlFor="newsletter-email">Email</label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "error") setState("idle");
            }}
            placeholder="you@company.com"
            className={`min-w-0 flex-1 rounded-full border bg-white px-4 py-2.5 text-[13.5px] outline-none transition-colors placeholder:text-faint focus:border-violet-400 ${
              state === "error" ? "border-rose-300" : "border-hair-bright"
            }`}
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="rounded-full bg-gradient-to-r from-violet-600 to-violet-500 px-5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_8px_20px_-8px_rgba(124,58,237,0.7)] disabled:opacity-70"
          >
            {state === "loading" ? "…" : "Subscribe"}
          </button>
        </form>
      )}
    </div>
  );
}
